# Setting up Story Vault

No coding needed. About fifteen minutes the first time.

Story Vault turns Claude into a co-writer for roleplay and fiction that **remembers**. Your characters, worlds and stories live as notes in your own private GitHub repository. Claude reads them before it writes, saves what happened after each turn, and picks up where you left off next time.

## What you need

- **A GitHub account.** Free, at [github.com](https://github.com). Your vault is stored there.
- **A Claude plan that includes Claude Code** (Pro or Max).
- *Optional:* [Obsidian](https://obsidian.md) (free), if you want to browse and edit your notes on your computer.

---

## Step 1: Make your own private copy

1. Sign in to GitHub and open the template: **[github.com/AmbiguousProphet/CiC-Vault](https://github.com/AmbiguousProphet/CiC-Vault)**.
2. Click the green **Use this template** button, then **Create a new repository**.
3. Give it a name, like `my-vault`.
4. Choose **Private**. This matters: your vault will hold your stories, including explicit ones, and only you should see it.
5. Click **Create repository**.

> Don't use **Fork**. A fork of a public repository is public.

## Step 2: Start your first session

Pick **one** of these. A is the easiest and works on a phone too.

### A. In your browser or the Claude app (easiest)

1. Go to **[claude.ai/code](https://claude.ai/code)** and sign in.
2. Connect your GitHub account when it asks, and let Claude see your new vault repository. If you skipped that, connect at [claude.ai/connect-github](https://claude.ai/connect-github).
3. Choose your vault repository and start a session.
4. Type this and send it:

   ```
   prepare for fictional roleplay
   ```

**Important: saving between sessions.** Each browser session saves your story to its own copy (a "branch") and opens a **pull request** on GitHub. Your next session only sees that work once you merge it:

1. Open your repository on GitHub and click **Pull requests**.
2. Open the one Claude made. If it says *Draft*, click **Ready for review**.
3. Click **Merge pull request**, then **Confirm merge**.

Do this when you finish a session. If you forget, the next session tells you there's unmerged work.

### B. On your computer (Windows, Mac or Linux)

This way saves straight to your vault, with no pull requests to merge.

1. Install **Claude Code** by following the official guide: [code.claude.com/docs](https://code.claude.com/docs). It walks you through signing in.
2. Install **Python 3** ([python.org](https://www.python.org/downloads/)) and **Git** ([git-scm.com](https://git-scm.com/downloads)). On Windows, tick *Add Python to PATH* during the install.
3. Get your vault onto the computer. The simplest way is **[GitHub Desktop](https://desktop.github.com)**: *File → Clone repository*, then pick your vault.
4. Open a terminal in the vault folder and type `claude`. In GitHub Desktop: *Repository → Open in Terminal* (*Open in Command Prompt* on Windows).
5. Send `prepare for fictional roleplay`.

### C. On an Android phone, running locally

You can run Claude Code on the phone itself with Termux. It's more fiddly; the full walkthrough is in [GUIDE.md → Running on Android with Termux](GUIDE.md#running-on-android-with-termux). Most phone users should use **A** in the Claude app instead.

---

## Step 3: What happens in your first session

1. **A few questions about you.** These are how you like to play:
   - **Mode:** DIRECT means you steer and Claude writes everyone. PLAY means you play your character and Claude plays the rest.
   - **Point of view and tense.**
   - **How explicit.**
   - **The themes you like, and your hard limits.**

   Claude saves the answers in `story-profile.md`. You can change them any time with `[profile]`.
2. **Pitches.** Claude offers two or three story ideas. Pick one, mix them, or describe your own.
3. **Play.** Claude writes the opening and you reply. Every story reply saves itself automatically.

**A co-writer, if you want one.** Out of the story (pitches, check-ins, saves), Claude talks plainly. Send `[persona]` and it helps you build a co-writer: a named personality with its own voice and taste, optionally with reaction pictures. If you make more than one, each session asks which to use.

The template comes with one sample story, *Harbor Debt*, if you'd rather jump straight in. Send `pick up Harbor Debt`.

## The commands you'll actually use

Type these in square brackets, as the whole message or alongside your direction.

| Command | What it does |
|---|---|
| `[pitch]` | Fresh story ideas. `[pitch: pirates]` steers them. |
| `[save]` | Records where the story stands, so the next session picks it up exactly. Use it before you stop. |
| `[rewind]` | Throws away Claude's last reply and tries again. `[rewind: make him angrier]` says how. |
| `[tone: harsher]` / `[tone: lighter]` | Turns the intensity up or down. |
| `[pause]` / `[resume]` | Step out of the story to talk, then go back in. |
| `[stop]` | Ends the scene right away. |
| `[check]` | A quick out-of-story check-in. |
| `[help]` | The full list. |

To come back to a story in a later session, send `pick up <story name>`.

## Your stories are yours

- Everything lives in your private repository: characters in `Characters/`, worlds in `Settings/`, stories in `Stories/`, and the saved text of each story beside its note.
- What stories may contain is set in one place, the Story Vault style (`.claude/output-styles/story-vault.md`). Read it once so you know where the lines are.
- Want to tweak how Claude writes? Tell it in plain words, or log examples you love with `[keep]` and ones you hate with `[avoid: "…" — why]`.

---

## Optional: see everything at a glance

### The vault app

A browser page that shows your vault as a gallery: stories with their saved text, characters by world with their pictures, worlds and co-writers. Buttons copy a ready message or a picture to paste into Claude.

**On your computer** (setup B): in the vault folder, run this and open the address it prints:

```
python3 .claude/scripts/vault.py app
```

**From anywhere, including your phone:** the app reads your private repository with a **read-only key** that you make once.

1. On GitHub, click your picture (top right) → **Settings** → **Developer settings** (bottom of the left menu) → **Personal access tokens** → **Fine-grained tokens** → **Generate new token**.
2. Name it `Vault app` and pick an expiration.
3. Under **Repository access**, choose **Only select repositories** and pick your vault.
4. Under **Permissions → Repository permissions**, set **Contents** to **Read-only**. Leave everything else alone.
5. Click **Generate token** and copy it. It starts with `github_pat_`, and GitHub shows it only once.
6. Open the app at **[ambiguousprophet.github.io/CiC-Vault/app/](https://ambiguousprophet.github.io/CiC-Vault/app/)**. You can also download `app/index.html` from your vault and open it.
7. Enter your repository as `your-name/my-vault`, paste the key, and press **Save**.

The key stays in that browser and only ever goes to GitHub. It can read your vault but never change it. Adult files and adult pictures stay hidden until you switch them on in the app's settings.

**Adding pictures.** Put a character's images in `Characters/<Name>/images/` (on GitHub: open the folder → **Add file** → **Upload files**). The first image becomes their portrait. Next time you're in a session, ask Claude to "make thumbnails" so the app loads them quickly.

### Obsidian

If your vault is on your computer (setup B), open Obsidian, choose **Open folder as vault**, and pick the vault folder. `Home.md` is a dashboard of your open stories, characters and worlds. In Obsidian's settings, under **Core plugins → Templates**, set the template folder to `Templates`.

---

## If something goes wrong

| What you see | What to do |
|---|---|
| The next session forgot what happened | Merge the pull request from your last browser session (Step 2A). Before you stop, send `[save]`. |
| "Vault work not merged" at the start of a session | Same thing: merge the open pull requests on GitHub. |
| The vault app says the token was rejected | Make a new token. Check that it's for your vault and set to **Contents: Read-only**. |
| The vault app shows old content | Click **Refresh** at the bottom. In its settings, leave **Branch** on *Newest vault*. |
| Commands like `[cast]` do nothing on your computer | Install Python 3 and restart Claude Code. |
| Anything else | Ask Claude in plain words: "the autosave didn't work, can you check?" It can read and fix its own setup. The full manual is [GUIDE.md](GUIDE.md). |
