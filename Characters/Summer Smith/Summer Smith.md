---
type: character
aliases: [Summer]
cover:
world: "[[Smith House]]"
species: human
mind:
age: "21"
body_age:
status: draft
rating: sfw
based_on: "Rick and Morty (adult remix)"
tags: [character]
created: 2026-11-28
---
# Summer Smith
> Twenty-one, a college junior with a phone in one hand and a stolen alien sidearm in her bag, the grandkid who found out she's better at Rick's life than anyone expected.

*Essentials only: what holds in every story. Story-specific ages, roles and drift go in profiles.*
*`age` and `body_age` only when they hold in every story; otherwise set them on each profile. `mind` is for nonhumans: how it thinks and communicates.*

## Signature features
- Tall and slim, long orange-red hair in a high ponytail, freckles across the nose.
- Phone always in hand. She narrates her own life to an audience.
- An eye-roll in every sentence, real nerve under it.
- Core drive: to matter. Not the accident, not the extra, not the one nobody worried about.

## Appearance
- **Build:** five-eight, slim, long legs, narrow waist, small chest.
- **Skin:** fair, freckled; burns rather than tans.
- **Hair:** long, straight, orange-red, high ponytail with loose strands at the temples.
- **Eyes:** green, often half-lidded with boredom.
- **Face:** oval, sharp chin, strong straight brows, a resting expression of being unimpressed.
- **Distinguishing marks:** freckles across nose, cheeks and shoulders; a pierced upper ear; a small black star tattoo on her left hip, gotten on a dare.
- **Default outfit:** cropped black graphic tee, high-waisted light-wash jeans, chunky platform sneakers, a green bomber jacket, crossbody bag, phone.

## Personality
- Socially brilliant: reads a room in two seconds and knows who to flatter and who to cut.
- Wants attention and relevance and is honest with herself about it, which is more than most people manage.
- Bored by normal. Danger makes her feel alive; she's quietly addicted to it.
- Cold-blooded in a real crisis: clear-headed, ruthless, faster than Morty.
- Wants Rick's approval and pretends she doesn't.
- Mocks Morty constantly and will end anyone else who tries.
- Knows her mother's life derailed when she happened, and has never been sure Beth wanted her.
- Performative on the surface; underneath, lonely and very smart, and she lets almost no one see either.

## Under pressure
- **Danger:** sharper and more decisive; takes command, often recklessly.
- **Cornered:** bargains with charm, sex appeal, social leverage, or a lie told with total confidence.
- **Real fear:** anger first, then action. Tears only in private, and she'll deny them.
- **Ignored or dismissed:** escalates until she's impossible to ignore.
- **Pushed about Beth:** sarcasm, shutdown, exit.
- **Humiliated in public:** icy calm, then revenge planned with social precision.

## Voice
- Fast and sarcastic: "literally", "okay but", rhetorical questions, one-word verdicts ("Gross." "Iconic." "No."). Slang she half means ironically. Drops all of it and goes flat and serious when it's real.
- **Bored:** "Cool. Love that. Wake me when something's on fire."
- **Mocking Morty:** "Did you just wave at a girl with your whole arm? Like a sailor? Leaving port?"
- **Crisis:** "Morty, shut up. Gun, door, left. Go."
- **Fishing for approval:** "Whatever, it was fine. I mean it worked. Did it — it looked like it worked, right?"
- **Sincere:** "I don't need you to say it. I need you to not leave this time."

## Variants
- **Adult Family** (adult, 21): a junior at the same university as Morty. [[Summer Smith - Adult Family]]

## Core history
- [[Beth Smith]] and [[Jerry Smith]]'s daughter, born when Beth was sixteen. [[Morty Smith]]'s older sister.
- Pulled into Rick's world later than Morty and took to it faster.

## Recurring ties
- [[Rick Sanchez]] — grandfather; the approval she'll never ask for.
- [[Morty Smith]] — little brother; hers to mock and nobody else's.
- [[Beth Smith]] — mother; love, competition, the question she won't ask.
- [[Jerry Smith]] — father; she pities him and is embarrassed by how much.
- [[Space Beth]] — the version of her mother she'd have liked better, which is its own problem.

## Profiles
```base
filters:
  and:
    - 'type == "profile"'
    - file.hasLink(this.file)
views:
  - type: table
    name: Profiles
    order:
      - file.name
      - profile_type
      - stage
      - age
      - rating
```

## Gallery
*Drop images into this character's `images` folder. Adult images go in `images/adult` and stay out of this view.*
```base
formulas:
  pic: 'image(file.path)'
filters:
  and:
    - 'file.inFolder(this.file.folder + "/images")'
    - 'file.ext == "png" || file.ext == "jpg" || file.ext == "jpeg" || file.ext == "webp"'
    - not:
        - 'file.inFolder(this.file.folder + "/images/adult")'
views:
  - type: cards
    name: Gallery
    image: formula.pic
    imageFit: cover
    order:
      - file.name
    sort:
      - property: file.ctime
        direction: DESC
```

## Stories
```base
filters:
  and:
    - 'type == "story"'
    - file.hasLink(this.file)
views:
  - type: list
    name: Stories
    order:
      - file.name
      - status
      - rating
```

## Notes
