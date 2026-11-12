"""Read-only RPG Maker MZ text inventory. No source text is exported."""
import collections, csv, hashlib, json, re, sys, zipfile
from pathlib import Path
src=Path(sys.argv[1]) if len(sys.argv)>1 else Path(__file__).resolve().parents[1]/'data.zip'
out=Path(__file__).resolve().parent
jp=re.compile(r'[\u3040-\u30ff\u3400-\u9fff\uff66-\uff9f]')
rows=[]; texts={}; valid=0
visible_db={'Actors':{'name','nickname','profile'},'Classes':{'name'},'Skills':{'name','description','message1','message2'},'Items':{'name','description'},'Weapons':{'name','description'},'Armors':{'name','description'},'Enemies':{'name'},'States':{'name','message1','message2','message3','message4'}}
plugin_fields={('DTextPicture','dText'):{'text'},('DestinationWindow','SET_DESTINATION'):{'destination'},('BattleLogOutput','OUTPUT_LOG'):{'message'}}
def add(f,p,s,cat):
 if not s.strip():return
 h=hashlib.sha256(s.encode()).hexdigest(); texts[h]=s
 rows.append(dict(file=f,path=p,category=cat,japanese_bearing=bool(jp.search(s)),characters=len(s),nonspace_characters=len(re.sub(r'\s','',s)),japanese_characters=len(jp.findall(s)),text_sha256=h))
def leaves(x,p):
 if isinstance(x,str):yield p,x
 elif isinstance(x,list):
  for i,v in enumerate(x):yield from leaves(v,f'{p}/{i}')
 elif isinstance(x,dict):
  for k,v in x.items():yield from leaves(v,f'{p}/{k}')
def walk(x,p,f,base):
 if isinstance(x,dict):
  if isinstance(x.get('code'),int) and isinstance(x.get('parameters'),list):
   code=x['code']; par=x['parameters']
   for q,s in leaves(par,p+'/parameters'):
    tail=q[len(p+'/parameters/'):]; idx=tail.split('/')[0]
    cat='review_event_parameters'
    if code==401:cat='translate_dialogue'
    elif code==405:cat='translate_scrolling_text'
    elif code==102 and idx=='0':cat='translate_choices'
    elif code==101 and idx=='4':cat='translate_speaker'
    elif code in (320,324,325) and idx=='1':cat='translate_actor_changes'
    elif code==357:
     pair=tuple(par[:2]); field=tail.split('/')[-1]
     cat='translate_plugin_text' if idx=='3' and field in plugin_fields.get(pair,set()) else ('review_plugin_arguments' if idx=='3' else 'exclude_plugin_identifiers')
     if pair==('SoR_GabWindow_MZ_Right','PushGab') and idx=='3' and field=='arg1':cat='review_gab_text'
    elif code==657:cat='exclude_plugin_editor_mirror'
    elif code==402:cat='exclude_choice_branch_mirror'
    elif code in (108,408):cat='review_comments'
    elif code in (355,655):cat='review_scripts'
    add(f,q,s,cat)
   for k,v in x.items():
    if k!='parameters':walk(v,f'{p}/{k}',f,base)
   return
  for k,v in x.items():
   q=f'{p}/{k}'
   if isinstance(v,str):
    cat='exclude_internal_or_asset'
    if base in visible_db and k in visible_db[base]:cat='translate_database'
    elif base.startswith('Map') and base!='MapInfos' and k=='displayName':cat='translate_map_display_name'
    elif base=='System' and (k in ('gameTitle','currencyUnit') or '/terms/' in q):cat='translate_system_ui'
    elif k=='note':cat='review_notes_and_tags'
    elif base=='MapInfos' and k=='name':cat='review_editor_map_names'
    add(f,q,v,cat)
   elif base=='System' and k in ('armorTypes','weaponTypes','skillTypes','equipTypes','elements'):
    for a,s in leaves(v,q):add(f,a,s,'translate_system_ui')
   elif base=='System' and k=='terms':
    for a,s in leaves(v,q):add(f,a,s,'translate_system_ui')
   else:walk(v,q,f,base)
 elif isinstance(x,list):
  for i,v in enumerate(x):walk(v,f'{p}/{i}',f,base)
with zipfile.ZipFile(src) as z:
 for info in z.infolist():
  if info.filename.endswith('.json'):
   data=json.loads(z.read(info));valid+=1
   walk(data,'',info.filename,Path(info.filename).stem)
fields=list(rows[0])
with (out/'text_locations.csv').open('w',newline='',encoding='utf-8-sig') as h:
 w=csv.DictWriter(h,fieldnames=fields);w.writeheader();w.writerows(rows)
def stats(rs):
 hashes={r['text_sha256'] for r in rs}
 return dict(occurrences=len(rs),raw_characters=sum(r['characters'] for r in rs),nonspace_characters=sum(r['nonspace_characters'] for r in rs),japanese_characters=sum(r['japanese_characters'] for r in rs),exact_unique_strings=len(hashes),exact_unique_raw_characters=sum(len(texts[h]) for h in hashes),files=len({r['file'] for r in rs}))
jrows=[r for r in rows if r['japanese_bearing']]
core=[r for r in jrows if r['category'].startswith('translate_')]
report={'archive':src.name,'archive_sha256':hashlib.sha256(src.read_bytes()).hexdigest(),'json_files_parsed':valid,'japanese_player_facing_candidates':stats(core),'japanese_candidates_excluding_repeated_speaker_fields':stats([r for r in core if r['category']!='translate_speaker']),'categories':{c:stats([r for r in jrows if r['category']==c]) for c in sorted({r['category'] for r in jrows})},'all_language_player_facing_candidates':stats([r for r in rows if r['category'].startswith('translate_')])}
(out/'summary.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
with (out/'files.csv').open('w',newline='',encoding='utf-8-sig') as h:
 names=['file','category','occurrences','raw_characters','nonspace_characters','japanese_characters','exact_unique_strings','exact_unique_raw_characters','files']
 w=csv.DictWriter(h,fieldnames=names);w.writeheader()
 for f,c in sorted({(r['file'],r['category']) for r in jrows}):w.writerow(dict(file=f,category=c,**stats([r for r in jrows if r['file']==f and r['category']==c])))
print(json.dumps(report,indent=2))
