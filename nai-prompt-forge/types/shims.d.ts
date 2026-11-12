// Minimal DOM names the NovelAI JSX typings refer to. The script sandbox has no DOM,
// so the full DOM lib is left out (it would also clash with the typings' Path2D/ImageBitmap).
interface Element {}
interface HTMLElement extends Element {}
interface HTMLInputElement extends HTMLElement {}
interface HTMLTextAreaElement extends HTMLElement {}
interface HTMLSelectElement extends HTMLElement {}
interface HTMLOptionElement extends HTMLElement {}
interface HTMLButtonElement extends HTMLElement {}
interface HTMLImageElement extends HTMLElement {}
interface HTMLTableCellElement extends HTMLElement {}
