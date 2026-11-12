"""Reproduce the first Vietnamese UI translation and file progress tracker."""
import collections,csv,hashlib,json,re,zipfile
from pathlib import Path
root=Path(__file__).resolve().parents[1]
out=root/'vi_draft'/'data';out.mkdir(parents=True,exist_ok=True)
translations={
'蒼星のサフィーリア体験版　ver1.0.2':('Saphiria của Ngôi Sao Xanh — Bản chơi thử ver1.0.2','Saphiria of the Blue Star — trial version; provisional title/romanization'),
'Ｃ':('Ｃ','Currency symbol; retained'),
'汎用スキル':('Kỹ năng thông dụng','General-purpose skills'),'怪人':('Quái nhân','Monster person / villain; context-dependent'),'氷':('Băng','Ice'),'雷':('Sét','Lightning'),'水':('Nước','Water'),'追撃':('Đòn đánh bồi','Follow-up attack'),'拘束攻撃':('Đòn trói buộc','Restraint attack'),'属性攻撃':('Đòn nguyên tố','Elemental attack'),'必殺':('Tuyệt kỹ','Finishing move'),
'レベル':('Cấp độ','Level'),'経験値':('Kinh nghiệm','Experience'),
'装備':('Trang bị','Equip'),'最強装備':('Trang bị tối ưu','Optimize equipment'),'全て外す':('Tháo tất cả','Remove all equipment'),'はじめから':('Trò chơi mới','New game'),'つづきから':('Tiếp tục','Continue'),'タイトルへ':('Về màn hình tiêu đề','Return to title'),'やめる':('Hủy','Cancel'),'購入する':('Mua','Buy'),'売却する':('Bán','Sell'),
'battle':('Chiến đấu','Fight'),'escape':('Rút lui','Escape'),'attack':('Tấn công','Attack'),'guard':('Phòng thủ','Guard'),'item':('Vật phẩm','Item'),'skill':('Kỹ năng','Skill'),'equip':('Trang bị','Equipment'),'status':('Trạng thái','Status'),'change':('Đổi đội hình','Formation'),'save':('Lưu','Save'),'shutdown':('Thoát trò chơi','Quit game'),'option':('Tùy chọn','Options'),'weapon':('Vũ khí','Weapon'),'armor':('Giáp','Armor'),'key item':('Vật phẩm quan trọng','Key item'),
'常時ダッシュ':('Luôn chạy','Always dash'),'コマンド記憶':('Nhớ lệnh đã chọn','Remember selected command'),'タッチUI':('Giao diện cảm ứng','Touch UI'),'BGM 音量':('Âm lượng nhạc nền','Background music volume'),'BGS 音量':('Âm lượng âm thanh nền','Background sound volume'),'ME 音量':('Âm lượng nhạc hiệu','Music effect volume'),'SE 音量':('Âm lượng hiệu ứng','Sound effect volume'),'持っている数':('Số lượng đang có','Quantity owned'),'現在の%1':('%1 hiện tại','Current %1'),'次の%1まで':('Còn lại đến %1 tiếp theo','Until next %1'),'どのファイルにセーブしますか？':('Bạn muốn lưu vào tệp nào?','Which file would you like to save to?'),'どのファイルをロードしますか？':('Bạn muốn tải tệp nào?','Which file would you like to load?'),'ファイル':('Tệp','File'),'オートセーブ':('Tự động lưu','Autosave'),'%1たち':('Nhóm của %1',"%1's party"),'%1が現れた！':('%1 xuất hiện!','%1 appeared!'),'%1は先手を取った！':('Nhóm của %1 giành được thế chủ động!','%1 got the initiative!'),'%1は不意をつかれた！':('Nhóm của %1 bị đánh úp!','%1 was caught off guard!'),'戦闘から離脱した':('Đã rút khỏi trận chiến.','Withdrew from battle'),'しかし逃げることはできなかった！':('Nhưng không thể chạy thoát!','But could not escape!'),'戦闘終了！':('Trận chiến kết thúc!','Battle ended!'),'戦いに敗北した…':('Đã bại trận…','Defeated in battle...'),'%1 の%2を獲得！':('Nhận được %1 %2!','Gained %1 %2!'),'お金を %1\\G 手に入れた！':('Nhận được %1\\G!','Obtained %1 currency!'),'%1を手に入れた！':('Nhận được %1!','Obtained %1!'),'LVアップ！　%2%3になった。':('Tăng cấp! Đã đạt %2 %3.','Level up! Reached %2 %3.'),'%1を覚えた！':('Đã học %1!','Learned %1!'),'%1は%2を使った！':('%1 sử dụng %2!','%1 used %2!'),'クリティカル！':('Chí mạng!','Critical hit!'),'%1に %2 ダメージ。':('%1 chịu %2 sát thương.','%1 takes %2 damage.'),'%1の%2が %3 回復した！':('%1 hồi phục %3 %2!','%1 recovered %3 of %2!'),'%1の%2が %3 増加した。':('%2 của %1 tăng %3.','%1 gained %3 of %2.'),'%1の%2が %3 減少した。':('%2 của %1 giảm %3.','%1 lost %3 of %2.'),'%1は%2を %3 奪われた！':('%1 bị hút mất %3 %2!','%1 was drained of %3 %2!'),'%1はダメージをうけなかった。':('%1 không chịu sát thương.','%1 took no damage.'),'%1は攻撃をかわした。':('%1 né được đòn tấn công.','%1 evaded the attack.'),'%1の%2が %3 増えた！':('%2 của %1 tăng %3!','%1 gained %3 of %2!'),'%1の%2が %3 減った！':('%2 của %1 giảm %3!','%1 lost %3 of %2!'),'%1の%2を %3 奪った！':('Hút được %3 %2 từ %1!','Drained %3 %2 from %1!'),'%1にダメージを与えられない。':('Không thể gây sát thương cho %1.','Cannot damage %1.'),'ミス！':('Đánh trượt!','Miss!'),'%1は魔法を打ち消した。':('%1 vô hiệu hóa phép thuật.','%1 nullified the spell.'),'%1は魔法を跳ね返した。':('%1 phản lại phép thuật.','%1 reflected the spell.'),'%1の反撃。':('%1 phản công.','%1 counterattacks.'),'%1が%2をかばった！':('%1 che chắn cho %2!','%1 protected %2!'),'%1の%2が上がった！':('%2 của %1 tăng lên!','%1’s %2 increased!'),'%1の%2が下がった！':('%2 của %1 giảm xuống!','%1’s %2 decreased!'),'%1の%2が元に戻った。':('%2 của %1 trở lại bình thường.','%1’s %2 returned to normal.'),'%1には効かなかった。':('Không có tác dụng với %1.','It had no effect on %1.')}
ledger=[]
with zipfile.ZipFile(root/'data.zip') as z:
 original=json.loads(z.read('data/System.json'));d=json.loads(z.read('data/System.json'))
 def convert(x,path):
  if isinstance(x,str):
   if x in translations:
    vi,en=translations[x];ledger.append({'file':'data/System.json','path':path,'source':x,'vietnamese':vi,'english_meaning':en,'status':'FIRST_PASS_UNREVIEWED'});return vi
   return x
  if isinstance(x,list):return [convert(v,f'{path}/{i}') for i,v in enumerate(x)]
  if isinstance(x,dict):return {k:convert(v,f'{path}/{k}') for k,v in x.items()}
  return x
 for key in ['gameTitle','currencyUnit','elements','terms']:d[key]=convert(d[key],'/'+key)
 # These compact resource/stat abbreviations are retained pending game-specific context.
 (out/'System.json').write_text(json.dumps(d,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
 inv=list(csv.DictReader((root/'scope'/'text_locations.csv').open(encoding='utf-8-sig')))
 byfile=collections.defaultdict(list)
 for r in inv:
  if r['japanese_bearing']=='True':byfile[r['file']].append(r)
 desc={'Actors':'Character names, nicknames and biographies','Animations':'Animation editor names and configuration','Armors':'Armor names and descriptions; plugin notes','Classes':'Class names and configuration','CommonEvents':'Shared event dialogue, choices and plugin text','Enemies':'Enemy names and configuration','Items':'Item names, descriptions and plugin notes','MapInfos':'Map editor index/names; plugin exposure needs review','Skills':'Skill names, descriptions, battle messages and plugin notes','States':'Status names, battle messages and plugin notes','System':'Title, menus, battle messages, type labels and internal settings','Tilesets':'Tileset/asset configuration; no standard displayed text identified','Troops':'Battle-event dialogue and internal encounter setup','Weapons':'Weapon names, descriptions and configuration'}
 tracker=[]
 for f in sorted(z.namelist()):
  if not f.endswith('.json'):continue
  stem=Path(f).stem;rr=byfile[f];core=[r for r in rr if r['category'].startswith('translate_')];review=[r for r in rr if r['category'].startswith('review_')]
  contents=desc.get(stem,'Map location name, event dialogue/choices and plugin commands')
  if re.fullmatch(r'Map\d+',stem):
   c=collections.Counter(r['category'].removeprefix('translate_') for r in core)
   contents+='; candidates: '+(', '.join(f'{k}={v}' for k,v in sorted(c.items())) or 'none detected')
  status='FIRST_PASS_UNREVIEWED' if stem=='System' else ('NOT_STARTED' if core else 'REVIEW_ONLY' if review else 'NO_STANDARD_TEXT_IDENTIFIED')
  tracker.append({'file':f,'status':status,'contains':contents,'japanese_candidate_entries':len(core),'japanese_candidate_characters':sum(int(r['characters']) for r in core),'manual_review_entries':len(review),'draft_output':'vi_draft/data/System.json' if stem=='System' else '', 'notes':'Core UI translated; internal type labels and stat abbreviations retained. Title and terminology provisional. Not tested in game.' if stem=='System' else 'Not translated; structural classification only.'})
for name,records in [('translation_progress.csv',tracker),('system_translation_ledger.csv',ledger)]:
 with (root/name).open('w',newline='',encoding='utf-8-sig') as h:
  w=csv.DictWriter(h,fieldnames=records[0]);w.writeheader();w.writerows(records)
# Verify structure, allowed changes, and every placeholder multiset.
def diff(a,b,p=''):
 assert type(a)==type(b),(p,'type')
 if isinstance(a,dict):
  assert a.keys()==b.keys()
  for k in a:yield from diff(a[k],b[k],p+'/'+k)
 elif isinstance(a,list):
  assert len(a)==len(b)
  for i,(u,v) in enumerate(zip(a,b)):yield from diff(u,v,p+'/'+str(i))
 elif a!=b:yield p,a,b
changes=list(diff(original,json.loads((out/'System.json').read_text())))
token=re.compile(r'%\d+|\\(?:[A-Za-z]+(?:\[[^\]]*\])?|[.!|><^{}$\\])')
for p,a,b in changes:
 assert p.startswith(('/terms/','/elements/')) or p=='/gameTitle'
 assert collections.Counter(token.findall(a))==collections.Counter(token.findall(b)),p
remaining=[r for r in byfile['data/System.json'] if r['category'].startswith('translate_') and r['path'] not in {l['path'] for l in ledger}]
assert not remaining,remaining
print(json.dumps({'ledger_entries':len(ledger),'changed_string_fields':len(changes),'files_tracked':len(tracker),'status_counts':dict(collections.Counter(r['status'] for r in tracker)),'validation':'PASS: JSON structure, allowed paths, placeholder multisets; every Japanese-bearing UI candidate covered'},indent=2))
