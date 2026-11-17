"""Lara Translate round trip for translation/data.zip (RPG Maker MZ).

  python3 translation/lara/lara.py extract [--parts N]
      Writes lara/for_lara.json (every unique player-facing Japanese string, short IDs),
      lara/for_lara_sample.json (a small slice for checking Lara's character count) and
      lara/lara_map.json (where each ID goes back, plus its protected codes and names).

  python3 translation/lara/lara.py apply <file(s) Lara returned> [--width 70] [--out DIR]
      Puts the translations back into copies of the game files under vi_draft/data/,
      writes lara_translation_ledger.csv and updates translation_progress.csv.
      With --out, writes the game files to DIR only and leaves the trackers alone.

  python3 translation/lara/lara.py resend
      Writes lara/for_lara_resend.json: entries whose Japanese broke a line mid-sentence,
      joined up so Lara translates whole sentences. Apply its result after the main file.

  python3 translation/lara/lara.py verify [DIR]
      Checks the translated files against the ZIP: same structure, same event commands,
      same escape codes; counts dialogue still in Japanese and boxes over 4 lines.

The original ZIP is never changed. apply always starts from the ZIP, so it can be rerun
after editing glossary.csv or fixing entries in the returned file, at no Lara cost.
"""
import argparse, collections, copy, csv, json, re, sys, zipfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
ZIP = ROOT / 'data.zip'
LOCATIONS = ROOT / 'scope' / 'text_locations.csv'
GLOSSARY = HERE / 'glossary.csv'
MAP = HERE / 'lara_map.json'
JP = re.compile(r'[\u3040-\u30ff\u3400-\u9fff\uff66-\uff9f]')
PREFIX = {'translate_database': 'B', 'translate_map_display_name': 'M', 'translate_speaker': 'N',
          'translate_plugin_text': 'P', 'translate_choices': 'C', 'translate_dialogue': 'D'}
# System.json was translated by hand in the first batch; Lara does not touch it.
SKIP_CATEGORIES = {'translate_system_ui'}
DATABASE = ['Actors', 'Classes', 'Skills', 'Items', 'Weapons', 'Armors', 'Enemies', 'States']
# RPG Maker escape codes (\C[2], \V[5], \I[15], \vc, \>, \$ ...), runs of them count as one.
CODE = r'(?:\\(?:[A-Za-z]+(?:\[[^\]]*\]|<[^>]*>)?|[{}\\$.|!><^]))+'
OTHER = r'%\d+|(?:if|en)\([^)]*\)|\u3000{2,}| {2,}|\n{2,}'
EDGE = re.compile(r'(?:\s|' + CODE + r')+')
PLACEHOLDER = re.compile(r'\{\s*(\d+)\s*\}')
VISIBLE_CODE = re.compile(CODE)
BOX_LINES = 4


def file_order(name):
    stem = Path(name).stem
    if stem in DATABASE:
        return (0, DATABASE.index(stem), stem)
    return (1 if stem in ('CommonEvents', 'Troops') else 2, 0, stem)


def load_glossary():
    terms = {}
    if GLOSSARY.exists():
        for row in csv.DictReader(GLOSSARY.open(encoding='utf-8-sig')):
            jp = (row.get('japanese') or '').strip('\r\n')
            if jp and (row.get('vietnamese') or '').strip():
                terms[jp] = row['vietnamese'].strip()
    return terms


def token_regex(terms):
    names = '|'.join(re.escape(t) for t in sorted(terms, key=len, reverse=True))
    return re.compile(CODE + '|' + OTHER + ('|' + names if names else ''))


def peel(text):
    """Split leading/trailing whitespace and escape codes off a string."""
    m = re.match(EDGE.pattern, text)
    head = m.group(0) if m else ''
    body = text[len(head):]
    tail = ''
    while True:
        m = re.search('(?:' + EDGE.pattern + r')\Z', body)
        if not m or not m.group(0):
            break
        tail = m.group(0) + tail
        body = body[:m.start()]
    return head, body, tail


def protect(text, rx, terms):
    tokens = []
    def sub(m):
        s = m.group(0)
        tokens.append(['name', s] if s in terms else ['code', s])
        return '{%d}' % (len(tokens) - 1)
    return rx.sub(sub, text), tokens


def resolve(doc, path):
    parts = path.strip('/').split('/')
    x = doc
    for p in parts[:-1]:
        x = x[int(p)] if isinstance(x, list) else x[p]
    last = parts[-1]
    return x, (int(last) if isinstance(x, list) else last)


def extract(args):
    terms = load_glossary()
    rx = token_regex(terms)
    rows = [r for r in csv.DictReader(LOCATIONS.open(encoding='utf-8-sig'))
            if r['japanese_bearing'] == 'True' and r['category'] in PREFIX]
    rows.sort(key=lambda r: file_order(r['file']))  # stable: keeps document order inside a file
    docs, entries, by_core, locations, local = {}, {}, {}, [], {}
    counters = collections.Counter()
    seen_boxes = set()
    with zipfile.ZipFile(ZIP) as z:
        for r in rows:
            f, path, cat = r['file'], r['path'], r['category']
            if f not in docs:
                docs[f] = json.loads(z.read(f))
            if cat == 'translate_dialogue':
                # path = .../list/<i>/parameters/0 ; take the whole run of 401 lines as one box
                list_path, i = path.rsplit('/parameters/0', 1)[0].rsplit('/', 1)
                parent, key = resolve(docs[f], list_path + '/0')
                lst, i = parent, int(i)
                start = i
                while start > 0 and lst[start - 1].get('code') == 401:
                    start -= 1
                end = i
                while end + 1 < len(lst) and lst[end + 1].get('code') == 401:
                    end += 1
                if (f, list_path, start) in seen_boxes:
                    continue
                seen_boxes.add((f, list_path, start))
                source = '\n'.join(lst[k]['parameters'][0] for k in range(start, end + 1))
                loc = {'kind': 'box', 'file': f, 'list': list_path, 'start': start, 'count': end - start + 1,
                       'header': start > 0 and lst[start - 1].get('code') == 101}
            else:
                parent, key = resolve(docs[f], path)
                source = parent[key]
                kind = {'translate_choices': 'choice', 'translate_plugin_text': 'plugin'}.get(cat, 'field')
                loc = {'kind': kind, 'file': f, 'path': path}
            head, body, tail = peel(source)
            core, tokens = protect(body, rx, terms)
            loc.update(head=head, tail=tail, tokens=tokens, source=source, category=cat)
            if core not in by_core:
                if not JP.search(core):  # nothing left to translate once names and codes are protected
                    by_core[core] = 'L%d' % len(local)
                    local[by_core[core]] = core
                else:
                    counters[PREFIX[cat]] += 1
                    eid = '%s%d' % (PREFIX[cat], counters[PREFIX[cat]])
                    by_core[core] = eid
                    entries[eid] = core
            loc['id'] = by_core[core]
            locations.append(loc)
    for old in HERE.glob('for_lara*.json'):
        old.unlink()
    out = HERE / 'for_lara.json'
    out.write_text(dump(entries), encoding='utf-8')
    if args.parts > 1:
        ids = list(entries)
        size = -(-sum(len(v) for v in entries.values()) // args.parts)
        part, chunk, total = 1, {}, 0
        for eid in ids:
            chunk[eid] = entries[eid]
            total += len(entries[eid])
            if total >= size * part and part < args.parts:
                (HERE / ('for_lara_part%d.json' % part)).write_text(dump(chunk), encoding='utf-8')
                part, chunk = part + 1, {}
        (HERE / ('for_lara_part%d.json' % part)).write_text(dump(chunk), encoding='utf-8')
    picks = collections.defaultdict(list)
    for eid in entries:
        picks[eid[0]].append(eid)
    sample = {}
    for p, n in [('B', 12), ('M', 3), ('N', 6), ('P', 5), ('C', 5), ('D', 20)]:
        for eid in picks[p][:n]:
            sample[eid] = entries[eid]
    (HERE / 'for_lara_sample.json').write_text(dump(sample), encoding='utf-8')
    MAP.write_text(json.dumps({'zip': ZIP.name, 'glossary': terms, 'entries': {**entries, **local},
                               'local': local, 'locations': locations},
                              ensure_ascii=False, indent=0), encoding='utf-8')
    value_chars = sum(len(v) for v in entries.values())
    report = {
        'entries': len(entries), 'by_type': {p: counters[p] for p in PREFIX.values()},
        'locations_covered': len(locations), 'resolved_locally_no_japanese_left': len(local), 'glossary_terms_protected': len(terms),
        'characters_in_values': value_chars, 'characters_in_whole_file': len(out.read_text(encoding='utf-8')),
        'sample_entries': len(sample), 'sample_characters_in_values': sum(len(v) for v in sample.values()),
        'sample_characters_in_whole_file': len((HERE / 'for_lara_sample.json').read_text(encoding='utf-8')),
    }
    print(json.dumps(report, indent=1))


def dump(entries):
    """One entry per line, no indentation: small and still readable."""
    return '{\n' + ',\n'.join(json.dumps(k) + ':' + json.dumps(v, ensure_ascii=False)
                              for k, v in entries.items()) + '\n}\n'


MID_SENTENCE_OK = set('。…？！）」』】♡―?!～〜ー♪.')


def resend(args):
    """Entries whose Japanese breaks a line mid-sentence, with that break removed.
    Lara translates each line on its own, so those came back as two half-sentences."""
    data = json.loads(MAP.read_text(encoding='utf-8'))
    out = {}
    for eid, jp in data['entries'].items():
        if eid in data['local']:
            continue
        lines = jp.split('\n')
        if not any(l and l[-1] not in MID_SENTENCE_OK for l in lines[:-1]):
            continue
        text = lines[0]
        for prev, line in zip(lines, lines[1:]):
            text += ('' if prev and prev[-1] not in MID_SENTENCE_OK else '\n') + line
        out[eid] = text
    path = HERE / 'for_lara_resend.json'
    path.write_text(dump(out), encoding='utf-8')
    print(json.dumps({'entries': len(out), 'characters_in_values': sum(len(v) for v in out.values()),
                      'characters_in_whole_file': len(path.read_text(encoding='utf-8')), 'file': str(path)}, indent=1))


def visible_len(s):
    return len(VISIBLE_CODE.sub(lambda m: ' ' * (6 if re.search(r'\\[NnPpVv]\[', m.group(0)) else 0), s))


def wrap(text, width):
    lines = [l.strip() for l in text.split('\n')]
    if all(visible_len(l) <= width for l in lines):
        return lines
    words, out, cur = ' '.join(l for l in lines if l).split(' '), [], ''
    for w in words:
        if not w:
            continue
        if cur and visible_len(cur + ' ' + w) > width:
            out.append(cur)
            cur = w
        else:
            cur = (cur + ' ' + w) if cur else w
    if cur:
        out.append(cur)
    return out


BARE_CODE_END = re.compile(r'\\[A-Za-z]+\Z')


def safe_join(left, right):
    """RPG Maker reads every ASCII letter after a bare code like \\ac as part of the code,
    so Vietnamese starting with a Latin letter would turn \\ac into \\acXyz. Add a space."""
    if BARE_CODE_END.search(left) and right[:1].isascii() and right[:1].isalpha():
        return left + ' ' + right
    return left + right


def restore(text, tokens, terms):
    """Put codes and glossary names back. Returns (text, problem or None)."""
    found = [int(n) for n in PLACEHOLDER.findall(text)]
    if sorted(found) != list(range(len(tokens))):
        expected = '{0}..{%d}' % (len(tokens) - 1) if tokens else 'none'
        return None, 'placeholders %s, expected %s' % (['{%d}' % n for n in found], expected)
    out, pos = '', 0
    for m in PLACEHOLDER.finditer(text):
        out = safe_join(out, text[pos:m.start()])
        kind, value = tokens[int(m.group(1))]
        out = safe_join(out, terms.get(value, value) if kind == 'name' else value)
        pos = m.end()
    return safe_join(out, text[pos:]), None


def apply(args):
    data = json.loads(MAP.read_text(encoding='utf-8'))
    terms = load_glossary()  # current values; edit glossary.csv and rerun apply to rename
    for jp in data['glossary']:
        terms.setdefault(jp, data['glossary'][jp])
    returned = dict(data['local'])
    for path in args.translated:
        returned.update(json.loads(Path(path).read_text(encoding='utf-8-sig')))
    out_dir = Path(args.out) if args.out else ROOT / 'vi_draft' / 'data'
    out_dir.mkdir(parents=True, exist_ok=True)
    docs, status, ledger_rows = {}, {}, {}
    per_file = collections.defaultdict(lambda: [0, 0])
    box_edits = collections.defaultdict(list)
    with zipfile.ZipFile(ZIP) as z:
        for f in sorted({l['file'] for l in data['locations']}):
            docs[f] = json.loads(z.read(f))
    for loc in data['locations']:
        eid, f = loc['id'], loc['file']
        per_file[f][1] += 1
        vi = returned.get(eid)
        problem = None
        if not isinstance(vi, str) or not vi.strip():
            problem = 'missing from Lara output'
        else:
            text, problem = restore(vi.strip(), loc['tokens'], terms)
        row = ledger_rows.setdefault(eid, {'id': eid, 'category': loc['category'].removeprefix('translate_'),
                                           'occurrences': 0, 'first_location': f + (loc.get('path') or '%s/%d' % (loc['list'], loc['start'])),
                                           'japanese': data['entries'][eid], 'vietnamese': vi if isinstance(vi, str) else '',
                                           'status': 'MACHINE_DRAFT_UNREVIEWED', 'problem': ''})
        row['occurrences'] += 1
        if problem:
            row['status'], row['problem'] = 'KEPT_JAPANESE', problem
            continue
        if JP.search(text.replace('・', '').replace('ー', '')):  # ・ and ー alone are just punctuation
            row['status'] = 'MACHINE_DRAFT_CHECK_JAPANESE_LEFT'
        new = safe_join(loc['head'], text) + loc['tail']
        per_file[f][0] += 1
        doc = docs[f]
        if loc['kind'] == 'box':
            box_edits[(f, loc['list'])].append((loc, text))
            continue
        parent, key = resolve(doc, loc['path'])
        parent[key] = new
        if loc['kind'] == 'choice':
            # keep the "When [choice]" branch labels in sync for the editor
            lst, cmd_index = resolve(doc, loc['path'].split('/parameters/')[0])
            indent = lst[cmd_index].get('indent')
            for cmd in lst[cmd_index + 1:]:
                if cmd.get('indent') == indent and cmd['code'] == 404:
                    break
                if cmd.get('indent') == indent and cmd['code'] == 402 and cmd['parameters'][0] == key:
                    cmd['parameters'][1] = new
        elif loc['kind'] == 'plugin':
            base = loc['path'].split('/parameters/')[0]
            lst, cmd_index = resolve(doc, base)
            for cmd in lst[cmd_index + 1:]:
                if cmd.get('code') != 657:
                    break
                for j, s in enumerate(cmd['parameters']):
                    m = re.match(r'(.*? = )(.*)\Z', s, re.S) if isinstance(s, str) else None
                    if not m:
                        continue
                    label, shown = m.groups()
                    if shown == loc['source']:
                        cmd['parameters'][j] = label + new
                    elif shown.endswith('…') and len(shown) > 1 and loc['source'].startswith(shown[:-1]):
                        cmd['parameters'][j] = label + new[:len(shown) - 1] + '…'  # editor preview, truncated
    overflow = []
    for (f, list_path), edits in box_edits.items():
        lst, _ = resolve(docs[f], list_path + '/0')
        for loc, text in sorted(edits, key=lambda e: -e[0]['start']):
            lines = wrap(text, args.width)
            lines[0] = safe_join(loc['head'], lines[0])
            lines[-1] = lines[-1] + loc['tail']
            start, count = loc['start'], loc['count']
            template = lst[start]
            new_cmds = []
            for b in range(0, len(lines), BOX_LINES):
                if b and loc['header']:
                    new_cmds.append(copy.deepcopy(lst[start - 1]))
                for line in lines[b:b + BOX_LINES]:
                    cmd = copy.deepcopy(template)
                    cmd['parameters'] = [line]
                    new_cmds.append(cmd)
            if len(lines) > BOX_LINES:
                overflow.append('%s %s/%d: %d lines, split into %d boxes' % (
                    f, list_path, start, len(lines), -(-len(lines) // BOX_LINES) if loc['header'] else 1))
            lst[start:start + count] = new_cmds
    for f, doc in docs.items():
        (out_dir / Path(f).name).write_text(json.dumps(doc, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
        json.loads((out_dir / Path(f).name).read_text(encoding='utf-8'))
    counts = collections.Counter(r['status'] for r in ledger_rows.values())
    report = {'entries_returned': len(returned) - len(data['local']), 'entries_expected': len(data['entries']) - len(data['local']),
              'ledger_status': dict(counts), 'files_written': len(docs), 'output': str(out_dir),
              'boxes_split_for_length': len(overflow)}
    if args.out:
        print(json.dumps(report, indent=1))
        for o in overflow[:20]:
            print('split:', o)
        return
    with (ROOT / 'lara_translation_ledger.csv').open('w', newline='', encoding='utf-8-sig') as h:
        w = csv.DictWriter(h, fieldnames=list(next(iter(ledger_rows.values()))))
        w.writeheader()
        w.writerows(ledger_rows.values())
    prog_path = ROOT / 'translation_progress.csv'
    prog = list(csv.DictReader(prog_path.open(encoding='utf-8-sig')))
    for r in prog:
        if r['file'] in per_file and not r['file'].endswith('System.json'):
            done, total = per_file[r['file']]
            r['status'] = 'FIRST_PASS_UNREVIEWED' if done == total else ('PARTIAL' if done else r['status'])
            r['draft_output'] = 'vi_draft/data/' + Path(r['file']).name
            r['notes'] = ('Lara Translate machine draft, %d of %d text locations; see lara_translation_ledger.csv. '
                          'Not human reviewed or tested in game.' % (done, total))
    with prog_path.open('w', newline='', encoding='utf-8-sig') as h:
        w = csv.DictWriter(h, fieldnames=list(prog[0]))
        w.writeheader()
        w.writerows(prog)
    print(json.dumps(report, indent=1))
    for o in overflow[:20]:
        print('split:', o)


def verify(args):
    """Compare translated game files with the ZIP: same structure, same escape codes."""
    out_dir = Path(args.dir) if args.dir else ROOT / 'vi_draft' / 'data'
    tok = re.compile(r'%\d+|\\(?:[A-Za-z]+(?:\[[^\]]*\]|<[^>]*>)?|[.!|><^{}$\\])')
    problems, stats = [], collections.Counter()

    def lists(x, p=''):
        if isinstance(x, dict):
            if isinstance(x.get('code'), int):
                return  # a command; nested move-route lists are covered by the code totals
            if isinstance(x.get('list'), list):
                yield p, x['list']
            for k, v in x.items():
                yield from lists(v, p + '/' + k)
        elif isinstance(x, list):
            for i, v in enumerate(x):
                yield from lists(v, '%s/%d' % (p, i))

    def skeleton(lst):  # commands other than text lines and box headers between text lines
        keep = []
        for i, c in enumerate(lst):
            if c.get('code') == 401:
                continue
            if c.get('code') == 101 and i and lst[i - 1].get('code') == 401 and i + 1 < len(lst) and lst[i + 1].get('code') == 401:
                continue
            keep.append((c.get('code'), c.get('indent')))
        return keep

    def shape(x):
        if isinstance(x, dict):
            return {k: shape(v) for k, v in x.items() if k != 'list'}
        if isinstance(x, list):
            return [shape(v) for v in x]
        return type(x).__name__

    with zipfile.ZipFile(ZIP) as z:
        for f in sorted(out_dir.glob('*.json')):
            if f.name == 'System.json':
                continue
            a = json.loads(z.read('data/' + f.name))
            b = json.loads(f.read_text(encoding='utf-8'))
            stats['files'] += 1
            if shape(a) != shape(b):
                problems.append('%s: structure outside event lists changed' % f.name)
            if tok_count(tok, a) != tok_count(tok, b):
                problems.append('%s: escape-code totals differ' % f.name)
            la, lb = dict(lists(a)), dict(lists(b))
            for p in la:
                if skeleton(la[p]) != skeleton(lb.get(p, [])):
                    problems.append('%s%s: event commands changed' % (f.name, p))
                run = 0
                for c in lb.get(p, []):
                    if c.get('code') == 401:
                        run += 1
                        stats['dialogue_lines'] += 1
                        if JP.search(c['parameters'][0]):
                            stats['dialogue_lines_still_japanese'] += 1
                    else:
                        if run > BOX_LINES:
                            stats['boxes_over_%d_lines' % BOX_LINES] += 1
                        run = 0
    print(json.dumps({'checked': dict(stats), 'problems': len(problems)}, indent=1))
    for p in problems[:30]:
        print('PROBLEM:', p)
    sys.exit(1 if problems else 0)


def tok_count(rx, doc):
    c = collections.Counter()
    def walk(x):
        if isinstance(x, str):
            c.update(rx.findall(x))
        elif isinstance(x, dict):
            for k, v in x.items():
                if not (k == 'parameters' and isinstance(x.get('code'), int) and x['code'] == 657):
                    walk(v)
        elif isinstance(x, list):
            for v in x:
                walk(v)
    walk(doc)
    return c


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest='cmd', required=True)
    e = sub.add_parser('extract')
    e.add_argument('--parts', type=int, default=1, help='also split for_lara.json into this many files')
    a = sub.add_parser('apply')
    a.add_argument('translated', nargs='+', help='the file(s) Lara returned; several parts are merged')
    a.add_argument('--width', type=int, default=70, help='max visible characters per dialogue line')
    a.add_argument('--out', help='write game files here instead of vi_draft/data, trackers untouched')
    sub.add_parser('resend')
    v = sub.add_parser('verify')
    v.add_argument('dir', nargs='?', help='folder of translated game files (default vi_draft/data)')
    args = ap.parse_args()
    {'extract': extract, 'apply': apply, 'verify': verify, 'resend': resend}[args.cmd](args)
