// data/imageMap.js
//
// WHY THIS FILE EXISTS:
// In React Native, you load a picture from your project with require('path').
// The path has to be written out in full -- you can't build it from a variable.
// So we write out every picture ONCE here, and give each one a simple name.
//
// HOW IT'S USED:
// Each Pokemon in data/pokemonData.js has an "image" like 'Mewtwo.png'.
// The cards then do imageMap[pokemon.image] to get the matching picture.
//
// TO ADD A NEW POKEMON PICTURE:
//   1. Put the image file in the assets/pokemon folder.
//   2. Add one line below, copying the pattern.
//   3. Use the same file name as the "image" value in pokemonData.js.
// Make imageMap available to other files. Each line pairs a file name with its picture.
export const imageMap = {
  'Articuno.png': require('../assets/pokemon/Articuno.png'), // the picture for Articuno
  'Zapdos.png': require('../assets/pokemon/Zapdos.png'), // the picture for Zapdos
  'Moltres.png': require('../assets/pokemon/Moltres.png'), // the picture for Moltres
  'Mewtwo.png': require('../assets/pokemon/Mewtwo.png'), // the picture for Mewtwo
  'Raikou.png': require('../assets/pokemon/Raikou.png'), // the picture for Raikou
  'Entei.png': require('../assets/pokemon/Entei.png'), // the picture for Entei
  'Suicune.png': require('../assets/pokemon/Suicune.png'), // the picture for Suicune
  'Lugia.png': require('../assets/pokemon/Lugia.png'), // the picture for Lugia
  'Ho-Oh.png': require('../assets/pokemon/Ho-Oh.png'), // the picture for Ho-Oh
  'Regirock.png': require('../assets/pokemon/Regirock.png'), // the picture for Regirock
  'Regice.png': require('../assets/pokemon/Regice.png'), // the picture for Regice
  'Registeel.png': require('../assets/pokemon/Registeel.png'), // the picture for Registeel
  'Latias.png': require('../assets/pokemon/Latias.png'), // the picture for Latias
  'Latios.png': require('../assets/pokemon/Latios.png'), // the picture for Latios
  'Kyogre.png': require('../assets/pokemon/Kyogre.png'), // the picture for Kyogre
  'Groudon.png': require('../assets/pokemon/Groudon.png'), // the picture for Groudon
  'Rayquaza.png': require('../assets/pokemon/Rayquaza.png'), // the picture for Rayquaza
// End of the list.
}
