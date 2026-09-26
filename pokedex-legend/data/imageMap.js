// data/imageMap.js
//
// WHY THIS FILE EXISTS:
// In React Native, require('./someImage.png') only works if that file
// ALREADY EXISTS when the app is bundled -- you can't build the path
// dynamically with a variable, and you can't point it at a missing file.
//
// Since the assets/pokemon folder starts out EMPTY (you're adding the
// images yourself later), we can't put 20 require() calls in here yet --
// the app would fail to build because those files don't exist.
//
// HOW TO USE THIS FILE:
// 1. Drop an image into assets/pokemon/, e.g. assets/pokemon/mewtwo.png
// 2. Come to this file and UNCOMMENT (or add) the matching line below.
// 3. Save. The app will hot-reload and the image will appear automatically
//    -- PokemonCard.js already knows how to look it up.
//
// The key on the left (e.g. "mewtwo.png") must exactly match the
// "image" value for that Pokemon in data/pokemonData.js.

export const imageMap = {
  'Articuno.png': require('../assets/pokemon/Articuno.png'),
  'Zapdos.png': require('../assets/pokemon/Zapdos.png'),
  'Moltres.png': require('../assets/pokemon/Moltres.png'),
  'Mewtwo.png': require('../assets/pokemon/Mewtwo.png'),
  'Raikou.png': require('../assets/pokemon/Raikou.png'),
  'Entei.png': require('../assets/pokemon/Entei.png'),
  'Suicune.png': require('../assets/pokemon/Suicune.png'),
  'Lugia.png': require('../assets/pokemon/Lugia.png'),
  'Ho-Oh.png': require('../assets/pokemon/Ho-Oh.png'),
  'Regirock.png': require('../assets/pokemon/Regirock.png'),
  'Regice.png': require('../assets/pokemon/Regice.png'),
  'Registeel.png': require('../assets/pokemon/Registeel.png'),
  'Latias.png': require('../assets/pokemon/Latias.png'),
  'Latios.png': require('../assets/pokemon/Latios.png'),
  'Kyogre.png': require('../assets/pokemon/Kyogre.png'),
  'Groudon.png': require('../assets/pokemon/Groudon.png'),
  'Rayquaza.png': require('../assets/pokemon/Rayquaza.png'),
}

// Small helper function: given a filename string, return the real
// image source if we have it mapped, or "null" if we don't (yet).
// PokemonCard.js uses this to decide whether to show a real image
// or a placeholder box.
export function getPokemonImage(filename) {
  return imageMap[filename] || null
}
