# Legendary Pokedex (Simple Version)

A small Expo / React Native app listing the Legendary and Mythical Pokemon
from Generations I-III.

- **No hooks.** `App` is a class that remembers things with `this.state` and
  changes them with `this.setState()`.
- **No API.** All the Pokemon info is in a local file, `data/pokemonData.js`.
- **Plain code.** No `.map()`, `.filter()`, `.find()`, `.join()`, `.split()`,
  `.padStart()`, arrow functions, destructuring, fragments or style arrays --
  just `for` loops, `if` statements and plain `function`s.

Every code file is commented line by line.

## What the app does

1. **Home screen** -- three boxes: Generation I, II and III.
2. **List screen** -- tap a box to see that generation's Pokemon. Tap "< Back" to return.
3. **Detail popup** -- tap any Pokemon to see its picture, type, description,
   base stats, abilities, height and weight. Tap "< Close" to dismiss it.

## Where to start reading

```
App.js                          <- START HERE: the two screens + the 2 pieces of state
components/
  GenerationCard.js             <- one of the 3 boxes on the home screen
  PokemonCard.js                <- one Pokemon in the list
  PokemonDetailModal.js         <- the popup with the full details
data/
  pokemonData.js                <- the list of all 17 Pokemon
  imageMap.js                   <- connects image file names to the pictures
  typeColors.js                 <- one color per Pokemon type
  formatNumber.js               <- turns 6 into "006"
assets/pokemon/                 <- the Pokemon pictures
```

## Run it

```
npm install
npx expo start
```

Then press `i` (iOS simulator), `a` (Android emulator), or `w` (web), or scan
the QR code with the Expo Go app.

## The two ideas this app teaches

- **Props** -- App.js hands data and functions *down* to a component
  (`<PokemonCard pokemon={...} onPress={...} />`), and the component
  reads them as `props.pokemon` and `props.onPress`.
- **State** -- `this.state` remembers a value (like which generation is open),
  and `this.setState()` changes it. React then redraws the screen.
