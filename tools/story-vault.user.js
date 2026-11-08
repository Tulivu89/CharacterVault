// ==UserScript==
// @name         Story Vault for Claude
// @namespace    story-vault
// @version      0.1.0
// @description  Command buttons and co-writer bubbles for Story Vault sessions on claude.ai/code
// @match        https://claude.ai/code*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  // ---- Settings -----------------------------------------------------------
  const CO_WRITER = 'Tae';          // label on out-of-character bubbles
  const COLOR = '#8e44ad';          // bubble and button accent
  const AVATAR = '';                // optional image URL for the bubble
  const SEND_AT_ONCE = true;        // send [save], [state]... immediately
  const COMMANDS = [
    { label: 'Save', text: '[save]', send: true },
    { label: 'Rewind', text: '[rewind: ]', send: false },
    { label: 'Tone', text: '[tone: ]', send: false },
    { label: 'State', text: '[state]', send: true },
    { label: 'Cast', text: '[cast]', send: true },
    { label: 'Pitch', text: '[pitch]', send: true },
    { label: 'Help', text: '[help]', send: true },
  ];

  // ---- Styles -------------------------------------------------------------
  const css = `
  #svui-bar { position: fixed; z-index: 2147483000; right: 12px; bottom: 96px;
    display: flex; flex-direction: column; align-items: flex-end; gap: 6px;
    font: 13px/1.2 system-ui, sans-serif; }
  #svui-bar .svui-row { display: none; flex-wrap: wrap; justify-content: flex-end; gap: 6px; max-width: 70vw; }
  #svui-bar.open .svui-row { display: flex; }
  #svui-bar button { border: 1px solid ${COLOR}; color: ${COLOR}; background: rgba(255,255,255,.92);
    border-radius: 999px; padding: 6px 12px; cursor: pointer; }
  #svui-bar button:hover { background: ${COLOR}; color: #fff; }
  #svui-bar .svui-toggle { background: ${COLOR}; color: #fff; font-weight: 700; }
  @media (prefers-color-scheme: dark) { #svui-bar button { background: rgba(30,20,40,.92); } }
  .svui-ooc { border-left: 3px solid ${COLOR}; background: color-mix(in srgb, ${COLOR} 9%, transparent);
    border-radius: 8px; padding: 6px 10px; margin: 4px 0; }
  .svui-ooc-first::before { content: '${CO_WRITER.replace(/'/g, "\\'")}'; display: block; font-weight: 700;
    color: ${COLOR}; margin-bottom: 2px; ${AVATAR ? `padding-left: 26px; background: url("${AVATAR}") left center / 20px 20px no-repeat;` : ''} }
  .svui-ooc + .svui-ooc { margin-top: -4px; border-top-left-radius: 0; border-top-right-radius: 0; }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ---- The composer -------------------------------------------------------
  // claude.ai changes its markup over time; these guesses go from specific to general.
  function composer() {
    return document.querySelector('div.ProseMirror[contenteditable="true"]')
      || document.querySelector('[contenteditable="true"][role="textbox"]')
      || document.querySelector('textarea[placeholder]')
      || document.querySelector('textarea');
  }

  function setText(el, text) {
    el.focus();
    if (el.tagName === 'TEXTAREA') {
      const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
      setter.call(el, text);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      return;
    }
    const sel = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(el);
    sel.removeAllRanges();
    sel.addRange(range);
    // insertText goes through the editor's own input handling (ProseMirror listens for it).
    if (!document.execCommand('insertText', false, text) || el.innerText.trim() !== text.trim()) {
      el.textContent = text;
      el.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: text }));
    }
  }

  function placeCaretBeforeEnd(el) {
    if (el.tagName === 'TEXTAREA') {
      el.selectionStart = el.selectionEnd = Math.max(0, el.value.length - 1);
      return;
    }
    const sel = window.getSelection();
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let last = null;
    while (walker.nextNode()) last = walker.currentNode;
    if (!last || !sel) return;
    const range = document.createRange();
    range.setStart(last, Math.max(0, last.length - 1));
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  function send(el) {
    const button = document.querySelector('button[aria-label*="Send" i], button[type="submit"]');
    if (button && !button.disabled) { button.click(); return; }
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
  }

  function run(cmd) {
    const el = composer();
    if (!el) { alert('Story Vault: no message box found on this page.'); return; }
    setText(el, cmd.text);
    if (cmd.send && SEND_AT_ONCE) setTimeout(() => send(el), 60);
    else placeCaretBeforeEnd(el);
  }

  // ---- The button bar -----------------------------------------------------
  const bar = document.createElement('div');
  bar.id = 'svui-bar';
  const row = document.createElement('div');
  row.className = 'svui-row';
  for (const cmd of COMMANDS) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = cmd.label;
    b.addEventListener('mousedown', e => e.preventDefault()); // keep focus in the message box
    b.addEventListener('click', () => run(cmd));
    row.appendChild(b);
  }
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'svui-toggle';
  toggle.textContent = '[ ]';
  toggle.title = 'Story Vault commands';
  toggle.addEventListener('click', () => bar.classList.toggle('open'));
  bar.append(row, toggle);
  document.body.appendChild(bar);

  // ---- Co-writer bubbles --------------------------------------------------
  // A reply wholly in [brackets] is out of character. Paragraphs from one that opens
  // with "[" through the one that closes with "]" get the bubble style.
  function mark(root) {
    const box = composer();
    const paras = root.querySelectorAll('p');
    let open = false;
    for (const p of paras) {
      if (p.closest('#svui-bar') || (box && box.contains(p))) continue;
      const text = p.textContent.trim();
      const starts = text.startsWith('[') && !text.startsWith('[[');
      if (!open && starts) {
        p.classList.add('svui-ooc', 'svui-ooc-first');
        open = !text.endsWith(']');
        continue;
      }
      if (open) {
        p.classList.add('svui-ooc');
        if (text.endsWith(']')) open = false;
        continue;
      }
    }
  }

  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    setTimeout(() => { queued = false; mark(document.body); }, 250);
  }).observe(document.body, { childList: true, subtree: true, characterData: true });
  mark(document.body);
})();
