# Legendary Pokédex

Expo / React Native app for the Legendary and Mythical Pokémon of all nine generations (Kanto to Paldea, Legendary and Mythical, 93 Pokémon).

- **Hooks + API** – data and artwork come live from [PokéAPI](https://pokeapi.co). No local database, no bundled pictures.
- **Search** – name, #number, type, region, "legendary" / "mythical", plus one filter chip per region.
- **Cards** – type-tinted grid cards with glow, watermark number and type badges.
- **Mythical style** – mythical Pokémon get black-and-gold cards.
- **Likes** – tap ♡ on a card or in the details; saved on the device; Likes tab.
- **Regions** – schematic maps for all 9 regions; tap ★ spots to see which legendaries live there.
- **Details** – stats bars, abilities, size, and "Where to find" (live from the API).
- **Settings** – System / Light / Dark theme (remembered), refresh data, clear likes.

## Run it

```
npm install
npx expo install expo@^58.0.0 --fix    # upgrades to Expo SDK 58 and aligns every other package
npx expo install @react-native-async-storage/async-storage
npx expo-doctor@latest                 # optional: checks the project
npx expo start
```

Needs Node.js 22.13+ (or 24.3+ / 26). SDK 58 uses React Native 0.88.

## Structure

```
App.js                  providers, bottom tabs, detail popup
hooks/usePokemon.js     all API calls (usePokemonList, useEncounters)
hooks/usePersistentState.js   useState that survives restarts
context/                ThemeContext, FavoritesContext
screens/                Home, Regions, Likes, Settings
components/             PokemonCard, PokemonGrid, PokemonDetailModal, TypeBadge, HeartButton
data/                   typeColors, regions (map layout), formatNumber
```
