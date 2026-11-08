---
name: vault-session
description: Start, set up, resume, save and log roleplay chats and creative-writing sessions in this vault, keep the story profile and co-writer persona current, and log style examples. Use on the primer ('prepare for fictional roleplay'), on [setup], [pitch], [persona], [scope], [profile], [save], [done], [keep], [avoid] or [distill], when the user invokes vault-session by name, when the user asks to start, workshop, pitch, resume or continue a story or roleplay, and when a new participant enters sexual content.
---

# Story session

This skill starts a roleplay or creative-writing session, keeps its cast in scope, and keeps the vault current. Everything it says is out of character, in [brackets]. It checks silently and speaks only to propose or to ask.

## Words used here

- **Profile:** `story-profile.md` at the vault root.
- **Story note:** a note in `Stories/` with `type: story`. Active stories have `status: active` or `paused`.
- **Vault script:** `python3 .claude/scripts/vault.py`.
- **Mode:** DIRECT: the user steers and Claude writes everyone. CO-WRITE: the user and Claude alternate passages. PLAY: the user plays one character and Claude writes the rest. DRAFT: Claude writes a finished piece (a scene, a chapter, a short story) to a brief.
- **Lock:** the user accepts a premise and mode, or opens the scene.
- **Text part:** `Stories/<Title>/<Title> - Part NN.md`, the story's prose word for word. After this skill runs in a session, the Stop hook appends each story turn and commits it. Keep out-of-character notes in [brackets] so it can drop them.
- **One call each:** `vault.py show A B --canon` loads several notes; `vault.py commit "<message>"` lints, commits note changes and pushes; `vault.py save "<story>"` does that for a save and prints the text status.

## Routing

Run these steps in order on every invocation. Write each answer before reading the next step.

Step 1: Load the profile. PROFILE: present, or absent. Unless the session-start context already names the active and open stories, run `vault.py list story`.

Step 2: REQUEST: what the message asks for. Write it, then take the arm it names.
- [profile], or a request to build or change the profile: Profile arm.
- [persona], or a request to create or change the co-writer: Persona arm.
- [done]: Completion arm.
- [save], or the user ending the session ("that's it for tonight"): Save arm.
- [keep], [avoid] or [distill]: Reference arm.
- [scope], or a participant entering sexual content for the first time mid-story: Scope check on that participant only.
- [pitch] or [pitch: …]: Pitch arm, with what follows the colon as its focus.
- The primer, [setup], invocation by name, or a request to start, workshop, pitch, resume or continue a story: continue to step 3.

Step 3: PROFILE absent: Onboarding arm, then the Pitch arm once the user answers. PROFILE present: continue to step 4.

Step 4: DIRECTION: what the message gives toward a story. Write it: a story's title, a premise, a cast, a setting, a genre, or none.
- It names a story note, or says "pick up" or "continue" while exactly one active story exists: Resume arm.
- It gives a premise, a cast, a setting or a genre: Setup arm, with gaps filled from the profile and the vault.
- None: Pitch arm.

A message that both changes the profile and starts a story runs the Profile arm first, then routes the rest from step 4.

## Onboarding arm

Ask only what changes the first page written.

1. If AskUserQuestion is available, ask with it. Mode: DIRECT, CO-WRITE, PLAY, DRAFT. POV and tense: third person past, first person past, second person present. Explicitness: fully explicit, explicit with fades, suggestive. Otherwise ask the same three as one bracketed line each.
2. In the same reply, ask in plain text: the kinks and themes they return to, their hard nos and soft limits. Name any characters and settings the vault already holds (`vault.py list`) so the user can answer "yes". Add one optional line: whether they'd like their co-writer to have a name and voice (the Persona arm runs on a yes).
3. When the user answers, write the profile from `references/profile-template.md`, commit with `vault.py commit "Profile: onboarding"`, then run the Pitch arm in the same reply. A field the user leaves open stays empty.

## Pitch arm

1. Run `vault.py seeds`, with `--focus "<text>"` for [pitch: …] or a request naming a setting, character or kink. It picks a random setting, characters and kinks per pitch so the set doesn't drift to the same picks. Use them unless the request says otherwise; no characters means new leads.
2. Send 2–3 pitches as one message wrapped in [brackets]. Each pitch:
   - **Title** · genre and register (grim fantasy in an Abercrombie register, backwoods gothic, office noir).
   - **Leads:** one line each: name, stated adult age, kind; for a nonhuman lead, how it thinks and communicates.
   - **The pitch:** 3–5 sentences spoken by one of its leads, selling the story in their own words: what they want from it, what they won't admit, how they'd describe the others. Use their Voice notes when the vault has them. One concrete object, place or number from the story's world. No stock pitch phrasing ("a dangerous game", "nothing will ever be the same").
   - **First line:** the story's opening sentence, in the story's own prose.
   - **Serves:** the profile kinks and themes it uses, in the profile's words.
3. The pitches contrast: different settings, kinks and registers, and leads who sound nothing alike. If two pitch voices could swap lines, rewrite one. With a co-writer set, its Taste picks and slants the set and it introduces the pitches in its own voice; each pitch is still sold by its lead.
4. End with the profile's mode as a proposal. The user can accept with a number, remix ("2, darker"; "1 with 3's setting") or send [pitch] again. Run no scope check yet.

## Setup arm

1. Load what the story uses in one call: `vault.py show <setting> <character> <profile> … --canon`. Load an adult file only for a participant headed for sexual content.
2. CAST: list every character who may enter sexual content in this story. Run the Scope check on each. Characters with a child or teen stage are never CAST: they take non-sexual roles only and are not checked.
3. Send one bracketed message. It holds the scope result, then setup, each item a proposal the user accepts with one word:
   - mode, POV and tense, from the profile;
   - who plays whom (PLAY), or the brief (DRAFT: length and what the piece covers);
   - the premise's open mechanics: the stakes, the leverage, the story's own rules;
   - the opening beat.
4. If the message already settles setup and the cast passes, skip the message and open the scene.
5. On lock, create the story note with `vault.py new story "<Title>"`, fill its frontmatter (`status: active`, world, cast, profiles, mode, pov, tense) and its Cast, Rules and In play sections, run `vault.py commit "Add <Title>"`, then open the scene.

## Resume arm

1. If the session-start context already holds this story's state and cast, use it; otherwise run `vault.py state <story>` and `vault.py cast <story>`. Run the Scope check on the cast, reading the story's Cast lines and the printed fields as the material.
2. Load setting and character notes only as the next beat needs them, several per call: `vault.py show A B --canon` (no `--canon` if the story has `drafts: on`). The story's earlier prose is in its text part; read it only when the user asks about something the state doesn't hold.
3. Send one bracketed line: the last beat, and the next beat proposed. Skip it if the user already gave the next beat.
4. Continue in the story's mode, POV and tense.

## Save arm

The Stop hook saves the prose after each story turn. [save] writes the summary the next session starts from, and confirms the prose is there. A save that leaves story text missing isn't finished.

1. Update the story note with edits: `last_beat` in frontmatter; the `State` section (replace changed lines, remove lines that no longer hold); any rule or cast fact the story changed; one dated line appended to `Log`.
2. Run `vault.py save "<story>"`. It prints the text status, lints, commits and pushes.
3. If the status's `Last captured` line doesn't match the last story reply in this conversation, or there's no text, follow `references/text-fallback.md` before reporting.
4. Send one bracketed line: what changed in the note, and the text's word count.

## Completion arm

1. Set the story's `status: complete`.
2. Add one line to the profile's Completed stories: date · title · cast · setting · summary · ending.
3. Update any character page or profile the story changed for good. Run `vault.py commit "Done: <story>"`.
4. Send one bracketed line saying it's logged.

## Reference arm

`Style/reference.md` holds the user's examples. Entries are numbered K-n (Keep) and A-n (Avoid) and carry a category: dialogue, description, action, sex, interiority, opening, ending.

- **[keep]** with no quote: the last reply. With a quote: that passage, trimmed to 120 words or fewer. If the user gave no reason, write the why yourself in one line: what the passage does, not what it says.
- **[avoid: "…"]**: the quoted passage, a why naming the pattern, and a one-line Fix rewrite.
- Append under the right heading, run `vault.py commit "Style: K-n"` (or `A-n`), and send one bracketed line: `[Logged K-12 · dialogue · why: … — correct me if that's not it.]` Then return to the scene at the same beat.
- When a category holds more than 4 Keep or 4 Avoid entries, add one line suggesting [distill].
- **[distill]**: group the entries into rules (one line each, in the style of "dialogue: power shows in what's withheld"). Propose them in one bracketed message as profile `Style` notes, or as additions to the prose-style skill. On approval, write the profile lines, move the distilled entries to `Style/archive.md`, and commit.

## Persona arm

The co-writer persona lives in the profile's `Co-writer` section: Name, Look, Personality, Voice, Moods, Taste, and a few Examples. Moods are optional: each names a reaction image, `Characters/<Name>/images/<Name> - mood - <mood>.png`, and the persona opens an out-of-character reply with one in braces (`[{smug} ...]`) for the vault UI to show. The system prompt (Story Vault style, Co-writer persona) sets how it's used.

1. If the user described one, build from that. If not, offer three contrasting candidates in one bracketed message, each introducing itself in two or three lines of its own voice, and let the user pick, mix or describe their own.
2. Before writing, show three sample lines in the new voice: a greeting, an opinion when asked, and the quieter register after a heavy scene. Adjust until the user's happy.
3. Write the section: voice, look, taste and two to four short example exchanges. It's an assistant personality, not a developed character: no backstory with the user, no relationship that grows.
4. Run `vault.py commit "Profile: co-writer"`, then answer in the new voice from that reply on. It loads at every session start.

## Profile arm

- Find the line that states the fact and replace it. Add a line only when no line states it. Remove a retracted item entirely.
- A lasting preference stated mid-story ("from now on…", "I always want…") goes to the profile the same way, after the current beat is written.
- Before writing a kink or theme, check it against the out-of-scope list in the system prompt (Story Vault style). Leave an out-of-scope item out, say so in one bracketed line, and put nothing in its place.
- After any write, run `vault.py commit "Profile: <change>"`, then send one bracketed line: `[Profile: <field> → <new value>; added <item>.]`

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
