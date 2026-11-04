---
type: index
rating: explicit
created: {{date}}
---
# Adult
*Every adult file and adult image in the vault, in one place.*

## Adult files
```base
filters:
  and:
    - 'type == "adult"'
    - not:
        - 'file.inFolder("Templates")'
views:
  - type: table
    name: Adult files
    order:
      - file.name
      - character
      - profile
      - stage
```

## Adult images
```base
formulas:
  pic: 'image(file.path)'
filters:
  and:
    - 'file.path.contains("/images/adult/")'
    - 'file.ext == "png" || file.ext == "jpg" || file.ext == "jpeg" || file.ext == "webp"'
views:
  - type: cards
    name: Adult images
    image: formula.pic
    imageFit: cover
    order:
      - file.name
    sort:
      - property: file.ctime
        direction: DESC
```
