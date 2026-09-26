# Legendary Pokedex

An Expo / React Native app listing every Legendary and Mythical Pokemon
from Generations I-III (#001-#386). No API calls -- just a local data
file rendered to the screen, plus `useState` for navigation, search,
favorites, and a type filter.

## Features

- **Browse by generation** -- tap Generation I/II/III to see that
  region's legendary Pokemon.
- **Search** -- type on the home screen to search every Pokemon by name.
- **Favorites** -- tap the star on any card (or in the detail view) to
  "catch" a Pokemon; the home screen has a toggle to show only your
  favorites.
- **Type filter chips** -- inside a generation's list, tap a type chip
  (e.g. "Fire") to narrow the list to just that type.
- **Detail view** -- tap any card to open a full-screen sheet with its
  base stats (HP/Attack/Defense/Sp. Atk/Sp. Def/Speed) shown as bars,
  height, weight, category, and abilities (including hidden ability).

## Project structure

```
pokedex/
  App.js                       <- entry point, screen navigation + state
  components/
    GenerationCard.js          <- one of the 3 home-screen region boxes
    PokemonCard.js              <- one Pokemon row in a list
    PokemonDetailModal.js        <- full-screen stats/abilities sheet
    SearchBar.js                  <- home-screen search input
    StatBar.js                     <- one labeled stat bar (used in the modal)
    TypeBadge.js                    <- colored pill(s) for a Pokemon's type(s)
  data/
    pokemonData.js                   <- all Pokemon info (stats, height, etc.)
    imageMap.js                       <- maps filenames -> local images
    typeColors.js                      <- color per Pokemon type
  assets/
    pokemon/                            <- Pokemon artwork (already included)
```

## 1. Install and run

```bash
npm install
npx expo start
```

Scan the QR code with the **Expo Go** app on your phone (same Wi-Fi network),
or press `i` / `a` in the terminal for an iOS/Android simulator.

## 2. Adding or replacing artwork

1. Save an image into `assets/pokemon/`, named to match the `image` field in
   `data/pokemonData.js` (e.g. `Mewtwo.png`).
2. Open `data/imageMap.js` and add a `require(...)` line for that filename.
3. Save -- Expo will hot-reload and the image updates automatically.

If a Pokemon's filename isn't in `imageMap.js`, its card shows a gray "?"
placeholder instead of crashing the build.

## Notes

- All 17 entries are Legendary/Mythical Pokemon from Gen I-III only.
- Styling is done with React Native's `StyleSheet` (there's no CSS file --
  React Native doesn't use actual `.css`).
- Safe-area handling uses `react-native-safe-area-context` rather than the
  `SafeAreaView` built into `react-native`, which is deprecated as of the
  React Native version this project is on.
- Favorites are kept in memory only (`useState`) and reset on reload. A
  future step could persist them with `expo-sqlite` or `AsyncStorage`.
