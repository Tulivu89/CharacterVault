---
type: character
aliases: [Rick]
cover:
world: "[[Smith House]]"
species: human
mind:
age: "72"
body_age:
status: draft
rating: sfw
based_on: "Rick and Morty (adult remix)"
tags: [character]
created: 2026-11-28
---
# Rick Sanchez
> The smartest man in any universe, seventy-two and drinking steadily in his daughter's garage, because every other place he's lived got boring or got people killed.

*Essentials only: what holds in every story. Story-specific ages, roles and drift go in profiles.*
*`age` and `body_age` only when they hold in every story; otherwise set them on each profile. `mind` is for nonhumans: how it thinks and communicates.*

## Signature features
- Tall, gaunt and stooped, a shock of dirty white hair standing straight up, a heavy brow that never unknots.
- The hip flask. It comes out mid-sentence and goes back without a pause.
- Belches and stammers chop up his sentences, and he leans on them hardest when someone gets close to a point.
- Core drive: never be bored, never be caught caring. He fails at the second one constantly.

## Appearance
- **Build:** six-one when he straightens up, which is rarely. Wiry and lean, ropey forearms, big knuckly hands that still don't shake when he's working. Loose skin at the neck and belly.
- **Skin:** pale, liver-spotted across the backs of the hands, solder and nicotine stains on the fingertips.
- **Hair:** short, coarse, dirty white going yellowish at the front, standing up in spikes whatever he does to it.
- **Eyes:** pale grey-blue, red-rimmed, heavy bags. The stare goes flat and measuring when he's interested.
- **Face:** long and deeply lined, hooked nose, thin mouth, white stubble that never becomes a beard.
- **Distinguishing marks:** old burn scars up both forearms, a self-surgery scar along the left ribs, a small steel port behind the right ear.
- **Default outfit:** a stained, scorched lab coat over a faded charcoal henley, brown work trousers, scuffed boots. Flask in the inside pocket, tools in every other one.

## Personality
- Genius isn't his pride, it's his weather: the reason everything is slow and everyone is stupid. Contempt is how he lives with it.
- Nihilism as armor. He'll explain at length that nothing matters, then tear a hole in reality to get a grandkid back.
- Loves this family and experiences that as a leash someone could yank. Being caught at it is the thing he hates most.
- Shows care by doing: he fixes it, kills it, builds it, rewrites it. He doesn't say it. If he says it he's drunk, dying or lying, and he'll take it back by morning.
- Never admits a mistake. He repairs it quietly and retells the story so it was the plan all along.
- Competitive with everyone. Petty with Jerry. Proud of Beth's brain, of the other Beth's nerve and of Summer's ruthlessness. Protective of Morty in ways that keep putting Morty in danger.
- Self-destructive by habit: drinks, picks the dangerous option, carries an undertow of not caring whether he comes back. Getting old has made it worse, and he won't discuss getting old.
- A bored Rick is a hazard. Boredom becomes a project; the project becomes a disaster.

## Under pressure
- **Physical danger:** calmer, faster, meaner. Improvises, cheats, spends pawns. Talks the whole time.
- **Cornered by someone smarter or stronger:** flatters, bargains and stalls while he builds the way out. No way out, and he burns everything down and enjoys the fire.
- **Seen through:** someone says the true thing and he answers with the cruelest accurate thing he can find, then leaves: garage, portal, bottle.
- **Real grief or fear:** shows only alone or very drunk. He goes quiet and precise, sometimes maudlin, and destroys the evidence after.
- **Humiliated:** never forgets. Revenge arrives later and out of all proportion.
- **Pitied:** worse than any threat. He'll take being hated; he can't stand being pitied, and he'll do something ugly to end it.

## Voice
- Rapid and slurred. Sentences start in one place and swerve. He stammers and doubles a word when he's building steam, and belches through a point to undercut it. Jargon used as a club, then translated with an insult. Diminutives for everyone. Monologues drift into accidental honesty and veer off hard.
- **Bored:** "Wake me when somebody in this house invents something. Or dies. I'm not picky."
- **Working:** "Hold that. No, the — the other end. The end that won't take your thumb off. Great. You're a natural. Don't let it go to your head, there's nothing in there to cushion it."
- **Contempt:** "Jerry, you're not a man, you're a participation trophy someone left out in the rain."
- **Cornered:** "Okay, okay, big guy, let's talk margins. You kill me, you get a corpse. You let me walk, you get a corpse that owes you."
- **Caught caring:** "Don't — don't make it a thing. I need a lab assistant who doesn't scream. You scream the least. That's all this is."

## Variants
- **Adult Family** (elder, 72): the grown-up family remix. Morty and Summer at college together, Rick bored in the garage. [[Rick Sanchez - Adult Family]]

## Core history
- Beth's father. Walked out when she was a girl and came back decades later to live in her garage.
- Built the portal gun, so every wall is a door. Nobody can stop him leaving; he keeps choosing to come back, and won't say why.
- Lost a wife and a daughter once, somewhere else. He doesn't talk about it, and everything he does is shaped around not talking about it.

## Recurring ties
- [[Beth Smith]] — daughter. The one person whose disappointment he can't sit through.
- [[Space Beth]] — the daughter who turned out like him. Pride and rivalry in equal measure.
- [[Summer Smith]] — granddaughter; the one with his nerve.
- [[Morty Smith]] — grandson; his sidekick, shield and conscience, none of which he'd admit.
- [[Jerry Smith]] — son-in-law and favorite target.

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
