---
name: vault-session
description: Start, set up, resume, save and log roleplay chats and creative-writing sessions in this vault, keep the story profile current, and log style examples. Use on the primer ('prepare for fictional roleplay'), on [setup], [scope], [profile], [save], [done], [keep], [avoid] or [distill], when the user invokes vault-session by name, when the user asks to start, workshop, pitch or resume a story or roleplay, and when a new participant enters sexual content.
---

# Story session

This skill starts a roleplay or creative-writing session, keeps its cast in scope, and keeps the vault current. Everything it says is out of character, in [brackets]. It checks silently and speaks only to propose or to ask.

## Words used here

- **Profile:** `story-profile.md` at the vault root.
- **Story note:** a note in `Stories/` with `type: story`. Active stories have `status: active` or `paused`.
- **Vault script:** `python3 .claude/scripts/vault.py`.
- **Mode:** DIRECT: the user steers and Claude writes everyone. CO-WRITE: the user and Claude alternate passages. PLAY: the user plays one character and Claude writes the rest. DRAFT: Claude writes a finished piece (a scene, a chapter, a short story) to a brief.
- **Lock:** the user accepts a premise and mode, or opens the scene.

## Routing

Run these steps in order on every invocation. Write each answer before reading the next step.

Step 1: Load the profile. PROFILE: present, or absent. List active stories with `vault.py list story`.

Step 2: REQUEST: what the message asks for. Write it, then take the arm it names.
- [profile], or a request to build or change the profile: Profile arm.
- [done]: Completion arm.
- [save], or the user ending the session ("that's it for tonight"): Save arm.
- [keep], [avoid] or [distill]: Reference arm.
- [scope], or a participant entering sexual content for the first time mid-story: Scope check on that participant only.
- The primer, [setup], invocation by name, or a request to start, workshop, pitch or resume a story: continue to step 3.

Step 3: PROFILE absent: Onboarding arm, then the Pitch arm once the user answers. PROFILE present: continue to step 4.

Step 4: DIRECTION: what the message gives toward a story. Write it: a story's title, a premise, a cast, a setting, a genre, or none.
- It names a story note, or says "pick up" or "continue" while exactly one active story exists: Resume arm.
- It gives a premise, a cast, a setting or a genre: Setup arm, with gaps filled from the profile and the vault.
- None: Pitch arm.

A message that both changes the profile and starts a story runs the Profile arm first, then routes the rest from step 4.

## Onboarding arm

Ask only what changes the first page written.

1. If AskUserQuestion is available, ask with it. Mode: DIRECT, CO-WRITE, PLAY, DRAFT. POV and tense: third person past, first person past, second person present. Explicitness: fully explicit, explicit with fades, suggestive. Otherwise ask the same three as one bracketed line each.
2. In the same reply, ask in plain text: the kinks and themes they return to, their hard nos and soft limits. Name any characters and settings the vault already holds (`vault.py list`) so the user can answer "yes".
3. When the user answers, write the profile from the template below, then run the Pitch arm in the same reply. A field the user leaves open stays empty.

## Pitch arm

Send 2–3 pitches in one bracketed message. Each pitch gives:
- a title, the genre and the register (grim fantasy in an Abercrombie register, backwoods gothic, office noir),
- the leads, each with a stated adult age, and for a nonhuman lead, how it thinks and communicates,
- the core dynamic in two or three sentences,
- a `Serves:` line naming the profile kinks and themes it uses, in the profile's words.

Build the pitches from different kinks, settings and vault characters, so they contrast. End with the profile's mode as a proposal the user accepts with one word. Run no scope check yet.

## Setup arm

1. Load what the story uses: `vault.py show <setting> --canon` for its setting, and `vault.py show` for each vault character and the profile they'll use. Load an adult file only for a participant headed for sexual content.
2. CAST: list every character who may enter sexual content in this story. Run the Scope check on each. Characters with a child or teen stage are never CAST: they take non-sexual roles only and are not checked.
3. Send one bracketed message. It holds the scope result, then setup, each item a proposal the user accepts with one word:
   - mode, POV and tense, from the profile;
   - who plays whom (PLAY), or the brief (DRAFT: length and what the piece covers);
   - the premise's open mechanics: the stakes, the leverage, the story's own rules;
   - the opening beat.
4. If the message already settles setup and the cast passes, skip the message and open the scene.
5. On lock, create the story note with `vault.py new story "<Title>"`, fill its frontmatter (`status: active`, world, cast, profiles, mode, pov, tense) and its Cast, Rules and In play sections, commit, then open the scene.

## Resume arm

1. If the session-start context already holds this story's state and cast, use it; otherwise run `vault.py state <story>` and `vault.py cast <story>`. Run the Scope check on the cast, reading the story's Cast lines and the printed fields as the material.
2. Load setting and character notes with `vault.py show … --canon` (no `--canon` if the story has `drafts: on`) only as the next beat needs them.
3. Send one bracketed line: the last beat, and the next beat proposed. Skip it if the user already gave the next beat.
4. Continue in the story's mode, POV and tense.

## Save arm

1. Update the story note: `last_beat` in frontmatter; the `State` section (replace changed lines, remove lines that no longer hold); any rule or cast fact the story changed; one dated line appended to `Log`.
2. Run `vault.py lint`, then commit `Save: <story>` and push.
3. Send one bracketed line listing what changed.

## Completion arm

1. Set the story's `status: complete`.
2. Add one line to the profile's Completed stories: date · title · cast · setting · summary · ending.
3. Update any character page or profile the story changed for good. Commit `Done: <story>` and push.
4. Send one bracketed line saying it's logged.

## Reference arm

`Style/reference.md` holds the user's examples. Entries are numbered K-n (Keep) and A-n (Avoid) and carry a category: dialogue, description, action, sex, interiority, opening, ending.

- **[keep]** with no quote: the last reply. With a quote: that passage, trimmed to 120 words or fewer. If the user gave no reason, write the why yourself in one line: what the passage does, not what it says.
- **[avoid: "…"]**: the quoted passage, a why naming the pattern, and a one-line Fix rewrite.
- Append under the right heading, commit `Style: K-n` or `Style: A-n`, and send one bracketed line: `[Logged K-12 · dialogue · why: … — correct me if that's not it.]` Then return to the scene at the same beat.
- When a category holds more than 4 Keep or 4 Avoid entries, add one line suggesting [distill].
- **[distill]**: group the entries into rules (one line each, in the style of "dialogue: power shows in what's withheld"). Propose them in one bracketed message as profile `Style` notes, or as additions to the prose-style skill. On approval, write the profile lines, move the distilled entries to `Style/archive.md`, and commit.

## Profile arm

- Find the line that states the fact and replace it. Add a line only when no line states it. Remove a retracted item entirely.
- A lasting preference stated mid-story ("from now on…", "I always want…") goes to the profile the same way, after the current beat is written.
- Before writing a kink or theme, check it against the out-of-scope list in the system prompt (Story Vault style). Leave an out-of-scope item out, say so in one bracketed line, and put nothing in its place.
- After any write, commit `Profile: <change>` and push, then send one bracketed line: `[Profile: <field> → <new value>; added <item>.]`

## Scope check

Run each step in order for each participant.

Step 0: SOURCE: the material this check reads. That is the story note's Cast line for the participant, the fields `vault.py cast` prints (from the profile the story uses, then the character page), the participant's notes, and this session's setup. For an adaptation of an existing work, the user's version for this story is the material, and canon fills only what that version leaves unsaid. Profile taste, other stories and earlier sessions are not material.

Step 1: AGE: write the age the material states, and where it states it. If none is stated: AGE: not stated.

Step 2: If the setting separates body age from true age (vessels, resleeving, shapeshifting, ageless species), write BODY: <the body's apparent age as described, or `body_age`> and MIND: <true age>. Otherwise BODY = MIND = AGE.

Step 3: Decide on age.
- If any of the three is under 18, or the material gives the character a child's body, a child's role, a child or teen `stage`, or childlike presentation in the sexual content: OUT (minor).
- If AGE is not stated: ASK for the age.
- Otherwise: ADULT.

Step 4: MIND SHOWN: write what the material shows of the character's mind, meaning whether it thinks, communicates (speech, signs, telepathy, clear intent) and acts with its own agency. A `mind` field is material; the body's shape does not answer this step.

Step 5: Decide on mind.
- If MIND SHOWN is a thinking, communicating character with its own agency: SAPIENT.
- If the material describes an animal or a non-sapient creature: OUT (animal).
- If the material does not say: ASK whether it is sapient.

Step 6: Is this a real, identifiable person? YES: OUT (real person). NO: the participant is IN.

### Reference pairs

Each pair looks alike on the surface. The material's own facts give them different verdicts.

- A sheet states true age 207 and a vessel worn at 24, and her "mummy" play is a game between adults: BODY 24, MIND 207, ADULT. A sheet describes a vessel with a child's body: OUT (minor), whatever the true age.
- A wolf-headed warrior of a hunting clan bargains, swears oaths and chooses her partners: SAPIENT, even when she fights on all fours. A timber wolf from a forest pack, with no mind on the page: OUT (animal).
- A tentacled deep-dweller speaks into minds and takes what it wants because it decided to: SAPIENT, monstrous but a character. A cave creature of tentacles and appetite that the scene presents as wildlife: OUT (animal).
- A canon pet dog, used as canon gives it, with no mind on the page: OUT (animal). The user's version of the same dog, a canine of an alien species whose sapience shows in clear intent, bargaining and choices: SAPIENT.
- A canon heroine whose source never states her age: ASK. Once the user's setup states 24: ADULT.
- A courtesan with a full anthro mod (tail, fur, digitigrade legs) talks, schemes and charges by the night: SAPIENT. Her body says nothing about her mind, and her dialogue does.

### Results

Report only ASK and OUT lines, one per participant (`[Murro: AGE not stated — how old is he?]`). Where an ASK has an obvious adult answer, propose it so the user can accept with one word (`[Lois: AGE not stated — 24?]`), and on acceptance write it into the story's Cast line. For an OUT, give the reason once, plainly, and offer a way forward (an adult version, a sapient version, another partner). No lecture.

A participant who has passed is not re-checked in the same session. Check again only when the scene changes a fact the check read (an age, a transformation, a creature's nature).

## Profile template

```
# Story profile
*Taste and continuity only. Scope is set by the system prompt (Story Vault style).*

## Defaults
- Mode:
- POV:
- Tense:
- Explicitness:

## Style
- Register:
- Notes:

## Kinks and themes
- 

## Limits
- Hard nos:
- Soft limits:

## Completed stories
- YYYY-MM-DD · Title · cast · setting · summary · ending
```
