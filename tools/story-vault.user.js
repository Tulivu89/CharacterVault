// ==UserScript==
// @name         Story Vault for Claude
// @namespace    story-vault
// @version      0.2.0
// @description  Command buttons, a Vault panel and co-writer bubbles for Story Vault sessions on claude.ai/code
// @match        https://claude.ai/code*
// @run-at       document-idle
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @connect      github.com
// @connect      githubusercontent.com
// ==/UserScript==

// Reads the vault from your GitHub repo using the GitHub login in this browser:
// no token. Claude Code keeps .claude/ui/vault-index.json current with every save.

(() => {
  'use strict';

  // ---- Settings -----------------------------------------------------------
  const REPO = 'Tulivu89/CharacterVault';   // owner/name of your vault on GitHub
  const BRANCH = 'HEAD';                     // HEAD is the repo's default branch
  const COLOR = '#8e44ad';
  const SEND_AT_ONCE = true;
  const QUICK = [
    { label: 'Save', text: '[save]', send: true },
    { label: 'Rewind', text: '[rewind: ]', send: false },
    { label: 'Tone', text: '[tone: ]', send: false },
    { label: 'State', text: '[state]', send: true },
    { label: 'Pitch', text: '[pitch]', send: true },
    { label: 'Help', text: '[help]', send: true },
  ];
  const ALL = [
    ['In a scene', [['Stop', '[stop]'], ['Pause', '[pause]'], ['Resume', '[resume]'], ['Rewind', '[rewind: ]', 0], ['Tone', '[tone: ]', 0], ['Check', '[check]']]],
    ['Story', [['Setup', '[setup]'], ['Pitch', '[pitch]'], ['Save', '[save]'], ['Done', '[done]'], ['Scope', '[scope]'], ['Profile', '[profile]']]],
    ['Co-writer', [['Persona', '[persona]'], ['Persona off', '[persona: off]'], ['Persona on', '[persona: on]']]],
    ['Style library', [['Keep', '[keep]'], ['Avoid', '[avoid: "" — ]', 0], ['Distill', '[distill]']]],
    ['Look things up', [['State', '[state]'], ['Cast', '[cast]'], ['Lint', '[lint]'], ['Help', '[help]']]],
  ];

  // ---- Fetching from the repo --------------------------------------------
  const raw = path => `https://github.com/${REPO}/raw/${BRANCH}/${path.split('/').map(encodeURIComponent).join('/')}`;

  function get(path, type) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: 'GET', url: raw(path) + (type === 'json' ? `?t=${Date.now()}` : ''),
        responseType: type === 'json' ? 'text' : 'blob', anonymous: false,
        onload: r => (r.status >= 200 && r.status < 300 ? resolve(r.response) : reject(new Error(`${r.status} for ${path}`))),
        onerror: () => reject(new Error(`network error for ${path}`)),
      });
    });
  }

  const pics = new Map();
  function picUrl(path) {
    if (!path) return Promise.resolve('');
    if (!pics.has(path)) pics.set(path, get(path, 'blob').then(b => URL.createObjectURL(b)).catch(() => ''));
    return pics.get(path);
  }

  let index = null;
  let indexError = '';
  async function loadIndex() {
    try {
      index = JSON.parse(await get('.claude/ui/vault-index.json', 'json'));
      indexError = '';
    } catch (e) {
      indexError = `Couldn't read the vault from GitHub (${e.message}). Check that this browser is logged in to GitHub with access to ${REPO}.`;
    }
    renderPanel();
    markAll();
  }

  // ---- Styles -------------------------------------------------------------
  const style = document.createElement('style');
  style.textContent = `
  #svui-bar { position: fixed; z-index: 2147483000; right: 12px; bottom: 96px; display: flex; flex-direction: column;
    align-items: flex-end; gap: 6px; font: 13px/1.2 system-ui, sans-serif; }
  #svui-bar .svui-row { display: none; flex-wrap: wrap; justify-content: flex-end; gap: 6px; max-width: 70vw; }
  #svui-bar.open .svui-row { display: flex; }
  .svui-btn { border: 1px solid ${COLOR}; color: ${COLOR}; background: rgba(255,255,255,.94); border-radius: 999px;
    padding: 5px 11px; cursor: pointer; font: inherit; }
  .svui-btn:hover, .svui-btn.on { background: ${COLOR}; color: #fff; }
  .svui-toggle { background: ${COLOR}; color: #fff; font-weight: 700; }
  #svui-panel { position: fixed; z-index: 2147483001; top: 0; right: 0; bottom: 0; width: min(420px, 100vw); display: none;
    flex-direction: column; background: #fbf8fd; color: #221a28; box-shadow: -4px 0 20px rgba(0,0,0,.25);
    font: 14px/1.4 system-ui, sans-serif; }
  #svui-panel.open { display: flex; }
  #svui-panel header { display: flex; flex-wrap: wrap; gap: 6px; padding: 10px; border-bottom: 1px solid #e5dcec; }
  #svui-panel main { overflow-y: auto; padding: 10px 12px 40px; }
  #svui-panel h3 { margin: 12px 0 6px; color: ${COLOR}; font-size: 14px; }
  .svui-card { border: 1px solid #e5dcec; border-radius: 10px; padding: 8px 10px; margin: 6px 0; background: #fff; }
  .svui-person { display: flex; gap: 10px; align-items: center; }
  .svui-person .svui-acts { margin-left: auto; display: flex; gap: 4px; flex-shrink: 0; }
  .svui-avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; flex-shrink: 0; border: 2px solid ${COLOR};
    display: inline-flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; }
  .svui-dim { opacity: .7; font-size: 12px; }
  .svui-beat { border-left: 3px solid ${COLOR}; padding-left: 8px; }
  @media (prefers-color-scheme: dark) {
    .svui-btn { background: rgba(30,20,40,.94); }
    #svui-panel { background: #1c1522; color: #eee4f3; }
    #svui-panel header { border-color: #3a2d44; }
    .svui-card { background: #251c2c; border-color: #3a2d44; }
  }
  .svui-ooc { border-left: 3px solid ${COLOR}; background: color-mix(in srgb, ${COLOR} 9%, transparent);
    border-radius: 8px; padding: 6px 10px; margin: 4px 0; display: flow-root; }
  .svui-ooc-first { min-height: 64px; }
  .svui-ooc-first::before { content: attr(data-svui-name); display: block; font-weight: 700; color: ${COLOR}; margin-bottom: 2px; }
  .svui-face { float: left; width: 56px; height: 56px; border-radius: 50%; margin: 2px 10px 4px 0; object-fit: cover;
    border: 2px solid ${COLOR}; }
  `;
  document.head.appendChild(style);

  // ---- The composer -------------------------------------------------------
  function composer() {
    return document.querySelector('div.ProseMirror[contenteditable="true"]')
      || document.querySelector('[contenteditable="true"][role="textbox"]')
      || document.querySelector('textarea[placeholder]')
      || document.querySelector('textarea');
  }

  function setText(el, text) {
    el.focus();
    if (el.tagName === 'TEXTAREA') {
      Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(el, text);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      return;
    }
    const sel = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(el);
    sel.removeAllRanges();
    sel.addRange(range);
    if (!document.execCommand('insertText', false, text) || el.innerText.trim() !== text.trim()) {
      el.textContent = text;
      el.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: text }));
    }
  }

  function caretBeforeEnd(el) {
    if (el.tagName === 'TEXTAREA') { el.selectionStart = el.selectionEnd = Math.max(0, el.value.length - 1); return; }
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let last = null;
    while (walker.nextNode()) last = walker.currentNode;
    if (!last) return;
    const range = document.createRange();
    range.setStart(last, Math.max(0, last.length - 1));
    range.collapse(true);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  function send(el) {
    const button = document.querySelector('button[aria-label*="Send" i], button[type="submit"]');
    if (button && !button.disabled) { button.click(); return; }
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
  }

  function run(text, sendNow = true) {
    const el = composer();
    if (!el) { alert('Story Vault: no message box found on this page.'); return; }
    setText(el, text);
    if (sendNow && SEND_AT_ONCE) setTimeout(() => send(el), 60);
    else caretBeforeEnd(el);
  }

  // ---- Small DOM helper ---------------------------------------------------
  function h(tag, attrs = {}, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'onclick') el.addEventListener('click', v);
      else if (k === 'class') el.className = v;
      else el.setAttribute(k, v);
    }
    for (const kid of kids.flat(Infinity)) if (kid != null && kid !== false && kid !== 0 && kid !== '') el.append(kid);
    return el;
  }
  const btn = (label, onclick, on) => {
    const b = h('button', { type: 'button', class: 'svui-btn' + (on ? ' on' : ''), onclick }, label);
    b.addEventListener('mousedown', e => e.preventDefault());
    return b;
  };
  const initials = name => name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  function avatar(name, pic) {
    const span = h('span', { class: 'svui-avatar', style: `background:${COLOR}` }, initials(name));
    if (pic && pic.thumb) picUrl(pic.thumb).then(url => {
      if (url) span.replaceWith(h('img', { class: 'svui-avatar', src: url, alt: name }));
    });
    return span;
  }

  // ---- The button bar -----------------------------------------------------
  const bar = h('div', { id: 'svui-bar' },
    h('div', { class: 'svui-row' },
      btn('Vault', () => { panel.classList.toggle('open'); if (panel.classList.contains('open')) loadIndex(); }),
      QUICK.map(c => btn(c.label, () => run(c.text, c.send)))),
    btn('[ ]', () => bar.classList.toggle('open')));
  bar.lastChild.classList.add('svui-toggle');
  document.body.appendChild(bar);

  // ---- The Vault panel ----------------------------------------------------
  const panel = h('div', { id: 'svui-panel' });
  document.body.appendChild(panel);
  let tab = GM_getValue('tab', 'story');

  function renderPanel() {
    const tabs = [['story', 'Story'], ['stories', 'Stories'], ['characters', 'Characters'], ['settings', 'Settings'], ['profile', 'Profile'], ['commands', 'Commands']];
    const header = h('header', {},
      tabs.map(([id, label]) => btn(label, () => { tab = id; GM_setValue('tab', id); renderPanel(); }, tab === id)),
      btn('↻', loadIndex), btn('✕', () => panel.classList.remove('open')));
    const main = h('main');
    if (indexError) main.append(h('p', {}, indexError));
    else if (!index) main.append(h('p', { class: 'svui-dim' }, 'Loading the vault…'));
    else main.append(...body().flat(Infinity).filter(k => k != null && k !== false && k !== 0 && k !== ''));
    panel.replaceChildren(header, main);
  }

  function body() {
    const v = index;
    if (tab === 'story') {
      const a = v.active;
      if (!a) return [h('p', {}, 'No active story. Open Stories to pick one up, or send [pitch].')];
      return [
        h('h2', {}, a.story), h('div', { class: 'svui-dim' }, [a.mode, a.pov].filter(Boolean).join(' · ')),
        a.lastBeat && h('p', { class: 'svui-beat' }, a.lastBeat),
        h('h3', {}, 'Cast'),
        a.cast.map(c => h('div', { class: 'svui-person svui-card' }, avatar(c.name, c.portrait), h('div', {}, c.line))),
        a.state.length && h('h3', {}, 'State'), a.state.length && h('ul', {}, a.state.map(s => h('li', {}, s))),
      ];
    }
    if (tab === 'stories') {
      return v.stories.map(s => h('div', { class: 'svui-card' },
        h('b', {}, s.name), h('div', { class: 'svui-dim' }, [s.status, s.mode, s.world].filter(Boolean).join(' · ')),
        s.lastBeat && h('p', {}, s.lastBeat.length > 200 ? s.lastBeat.slice(0, 199) + '…' : s.lastBeat),
        h('div', {}, btn('Pick up', () => run(`pick up ${s.name}`)), ' ', btn('State', () => run(`[state ${s.name}]`)))));
    }
    if (tab === 'characters') {
      const worlds = [...new Set(v.characters.map(c => c.world))];
      return worlds.map(w => [h('h3', {}, w), v.characters.filter(c => c.world === w).map(c =>
        h('div', { class: 'svui-person svui-card' }, avatar(c.name, c.portrait),
          h('div', {}, h('b', {}, c.name), h('div', { class: 'svui-dim' }, [c.age, c.species].filter(Boolean).join(' · ')),
            c.hook && h('div', { class: 'svui-dim' }, c.hook)),
          h('div', { class: 'svui-acts' }, btn('Show', () => run(`[show ${c.name}]`)), btn('Pitch', () => run(`[pitch: ${c.name}]`)))))]);
    }
    if (tab === 'settings') {
      return v.settings.map(s => h('div', { class: 'svui-card' },
        h('b', {}, s.name), s.world && s.world !== s.name && h('span', { class: 'svui-dim' }, ` · ${s.world}`),
        s.hook && h('div', { class: 'svui-dim' }, s.hook),
        h('div', {}, btn('Show', () => run(`[show ${s.name}]`)), ' ', btn('Pitch here', () => run(`[pitch: ${s.name}]`)))));
    }
    if (tab === 'profile') {
      const p = v.profile;
      const cw = v.coWriter;
      const list = (title, items) => items && items.length ? [h('h3', {}, title), h('ul', {}, items.map(i => h('li', {}, i)))] : [];
      return [
        cw && h('div', { class: 'svui-person svui-card' }, avatar(cw.name, cw.portrait),
          h('div', {}, h('b', {}, `Co-writer: ${cw.name}`),
            h('div', { class: 'svui-dim' }, Object.keys(cw.moods).length ? `Moods: ${Object.keys(cw.moods).join(', ')}` : 'No mood images yet'))),
        list('Defaults', p.defaults), list('Kinks and themes', p.kinks), list('Limits', p.limits), list('Style', p.style),
        h('div', {}, btn('Change profile', () => run('[profile]')), ' ', btn('Change co-writer', () => run('[persona]'))),
      ];
    }
    return ALL.map(([group, items]) => [h('h3', {}, group),
      h('div', {}, items.map(([label, text, sendNow]) => [btn(label, () => run(text, sendNow !== 0)), ' ']))]);
  }

  // ---- Co-writer bubbles --------------------------------------------------
  // Paragraphs from one that opens with "[" to the one that closes with "]" are out of
  // character. "[{smug} ..." drops the tag and shows that mood's face from the repo.
  function addFace(p) {
    const cw = index && index.coWriter;
    if (!cw || p.dataset.svuiFace) return;
    p.dataset.svuiFace = '1';
    let mood = '';
    const first = document.createTreeWalker(p, NodeFilter.SHOW_TEXT).nextNode();
    if (first) {
      const m = first.nodeValue.match(/^(\s*\[)\{([a-z-]+)\}\s*/i);
      if (m) { mood = m[2].toLowerCase(); first.nodeValue = m[1] + first.nodeValue.slice(m[0].length); }
    }
    const pic = (mood && cw.moods[mood]) || cw.portrait;
    if (!pic || !pic.thumb) return;
    picUrl(pic.thumb).then(url => {
      if (url) p.prepend(h('img', { class: 'svui-face', src: url, alt: mood || cw.short }));
    });
  }

  function mark(root) {
    const box = composer();
    let open = false;
    for (const p of root.querySelectorAll('p')) {
      if (p.closest('#svui-bar, #svui-panel') || (box && box.contains(p))) continue;
      const text = p.textContent.trim();
      if (!open && text.startsWith('[') && !text.startsWith('[[')) {
        p.classList.add('svui-ooc', 'svui-ooc-first');
        p.dataset.svuiName = (index && index.coWriter && index.coWriter.short) || 'Out of character';
        addFace(p);
        open = !text.endsWith(']');
      } else if (open) {
        p.classList.add('svui-ooc');
        if (text.endsWith(']')) open = false;
      }
    }
  }
  const markAll = () => mark(document.body);

  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    setTimeout(() => { queued = false; markAll(); }, 250);
  }).observe(document.body, { childList: true, subtree: true, characterData: true });

  loadIndex();
})();
