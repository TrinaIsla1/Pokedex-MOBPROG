// data/pokemonData.js
//
// This file holds ALL of our Pokemon info as a plain JavaScript list (an "array").
// There is no internet connection or API -- this list IS our database.
// Each { ... } block below is ONE Pokemon, and becomes one card in the app.
//
// Every Pokemon has the same "fields" (named pieces of info). The first
// Pokemon, Articuno, is explained line by line below. All the others
// follow the exact same pattern.
//
// Scope: only LEGENDARY / MYTHICAL Pokemon from Generations 1-3.

// "export" lets other files import this list. "const" means it won't be reassigned.
// The [ starts the list; the matching ] is at the very bottom of the file.
export const pokemonList = [
  // ---------- GENERATION 1 (Kanto) ----------
  // ---- ARTICUNO: every field explained ----
  {
    id: 144, // the official Pokedex number (shown as #144)
    name: 'Articuno', // the name shown on cards and in the popup
    type: 'Ice/Flying', // its type(s); two types are separated by a "/"
    generation: 1, // 1, 2 or 3 -- decides which generation box it appears in
    category: 'Freeze Pokemon', // the little "species" label shown in the popup
    height: 1.7, // height in meters
    weight: 55.4, // weight in kilograms
    // A short description. (It's on its own line only because it's long.)
    description:
      'A legendary bird said to appear before winter travelers, leaving trails of frost from its wings as it flies.',
    // The picture's file name. It must match a name in data/imageMap.js.
    image: 'Articuno.png',
    // Base stats: bigger number = stronger in that area.
    // (hp = health, spAtk = special attack, spDef = special defense)
    stats: { hp: 90, attack: 85, defense: 100, spAtk: 95, spDef: 125, speed: 85 },
    // The list of abilities this Pokemon can have. [ ] = a list.
    abilities: ['Pressure'],
  },
  {
    id: 145,
    name: 'Zapdos',
    type: 'Electric/Flying',
    generation: 1,
    category: 'Electric Pokemon',
    height: 1.6,
    weight: 52.6,
    description:
      'A legendary bird that dwells in thunderclouds, said to descend from storms to release bursts of lightning.',
    image: 'Zapdos.png',
    stats: { hp: 90, attack: 90, defense: 85, spAtk: 125, spDef: 90, speed: 100 },
    abilities: ['Pressure'],
  },
  {
    id: 146,
    name: 'Moltres',
    type: 'Fire/Flying',
    generation: 1,
    category: 'Flame Pokemon',
    height: 2.0,
    weight: 60.0,
    description:
      'A legendary bird whose glowing feathers are said to heal wounds, believed to signal the arrival of spring.',
    image: 'Moltres.png',
    stats: { hp: 90, attack: 100, defense: 90, spAtk: 125, spDef: 85, speed: 90 },
    abilities: ['Pressure'],
  },
  {
    id: 150,
    name: 'Mewtwo',
    type: 'Psychic',
    generation: 1,
    category: 'Genetic Pokemon',
    height: 2.0,
    weight: 122.0,
    description:
      'A Pokemon created through genetic engineering, given immense psychic power far beyond that of natural Pokemon.',
    image: 'Mewtwo.png',
    stats: { hp: 106, attack: 110, defense: 90, spAtk: 154, spDef: 90, speed: 130 },
    abilities: ['Pressure'],
  },

  // ---------- GENERATION 2 (Johto) ----------
  {
    id: 243,
    name: 'Raikou',
    type: 'Electric',
    generation: 2,
    category: 'Thunder Pokemon',
    height: 1.9,
    weight: 178.0,
    description:
      'A legendary beast said to embody the power of lightning, racing across the land faster than thunder.',
    image: 'Raikou.png',
    stats: { hp: 90, attack: 85, defense: 75, spAtk: 115, spDef: 100, speed: 115 },
    abilities: ['Pressure'],
  },
  {
    id: 244,
    name: 'Entei',
    type: 'Fire',
    generation: 2,
    category: 'Volcano Pokemon',
    height: 2.1,
    weight: 198.0,
    description:
      'A legendary beast said to embody the power of magma, its roar shaking the ground like an erupting volcano.',
    image: 'Entei.png',
    stats: { hp: 115, attack: 115, defense: 85, spAtk: 90, spDef: 75, speed: 100 },
    abilities: ['Pressure'],
  },
  {
    id: 245,
    name: 'Suicune',
    type: 'Water',
    generation: 2,
    category: 'Aurora Pokemon',
    height: 2.0,
    weight: 187.0,
    description:
      'A legendary beast said to embody the purity of water, believed to be able to cleanse anything it touches.',
    image: 'Suicune.png',
    stats: { hp: 100, attack: 75, defense: 115, spAtk: 90, spDef: 115, speed: 85 },
    abilities: ['Pressure'],
  },
  {
    id: 249,
    name: 'Lugia',
    type: 'Psychic/Flying',
    generation: 2,
    category: 'Diving Pokemon',
    height: 5.2,
    weight: 216.0,
    description:
      'A guardian said to sleep at the bottom of the sea, so powerful that a single wingbeat can cause storms.',
    image: 'Lugia.png',
    stats: { hp: 106, attack: 90, defense: 130, spAtk: 90, spDef: 154, speed: 110 },
    abilities: ['Pressure'],
  },
  {
    id: 250,
    name: 'Ho-Oh',
    type: 'Fire/Flying',
    generation: 2,
    category: 'Rainbow Pokemon',
    height: 3.8,
    weight: 199.0,
    description:
      'A rainbow-colored guardian of the skies, said to grant eternal happiness to anyone who sees it.',
    image: 'Ho-Oh.png',
    stats: { hp: 106, attack: 130, defense: 90, spAtk: 110, spDef: 154, speed: 90 },
    abilities: ['Pressure'],
  },

  // ---------- GENERATION 3 (Hoenn) ----------
  {
    id: 377,
    name: 'Regirock',
    type: 'Rock',
    generation: 3,
    category: 'Rock Peak Pokemon',
    height: 1.7,
    weight: 230.0,
    description:
      'An ancient Pokemon assembled from countless rocks, said to have been sealed away in a desert cave.',
    image: 'Regirock.png',
    stats: { hp: 80, attack: 100, defense: 200, spAtk: 50, spDef: 100, speed: 50 },
    abilities: ['Clear Body'],
  },
  {
    id: 378,
    name: 'Regice',
    type: 'Ice',
    generation: 3,
    category: 'Iceberg Pokemon',
    height: 1.8,
    weight: 175.0,
    description:
      'An ancient Pokemon formed from glacial ice during an ice age, its body never rising above freezing.',
    image: 'Regice.png',
    stats: { hp: 80, attack: 50, defense: 100, spAtk: 100, spDef: 200, speed: 50 },
    abilities: ['Clear Body'],
  },
  {
    id: 379,
    name: 'Registeel',
    type: 'Steel',
    generation: 3,
    category: 'Iron Pokemon',
    height: 1.9,
    weight: 205.0,
    description:
      'An ancient Pokemon with a body harder than any known metal, said to have slept in a cave for many years.',
    image: 'Registeel.png',
    stats: { hp: 80, attack: 75, defense: 150, spAtk: 75, spDef: 150, speed: 50 },
    abilities: ['Clear Body'],
  },
  {
    id: 380,
    name: 'Latias',
    type: 'Dragon/Psychic',
    generation: 3,
    category: 'Eon Pokemon',
    height: 1.4,
    weight: 40.0,
    description:
      'A gentle Pokemon that can bend light to become invisible, and is said to understand human emotions.',
    image: 'Latias.png',
    stats: { hp: 80, attack: 80, defense: 90, spAtk: 110, spDef: 130, speed: 110 },
    abilities: ['Levitate'],
  },
  {
    id: 381,
    name: 'Latios',
    type: 'Dragon/Psychic',
    generation: 3,
    category: 'Eon Pokemon',
    height: 2.0,
    weight: 60.0,
    description:
      'A Pokemon capable of high-speed flight using telekinesis, fiercely protective of those close to it.',
    image: 'Latios.png',
    stats: { hp: 80, attack: 90, defense: 80, spAtk: 130, spDef: 110, speed: 110 },
    abilities: ['Levitate'],
  },
  {
    id: 382,
    name: 'Kyogre',
    type: 'Water',
    generation: 3,
    category: 'Sea Basin Pokemon',
    height: 4.5,
    weight: 352.0,
    description:
      'A Pokemon said to have expanded the seas, capable of summoning torrential rain across the whole region.',
    image: 'Kyogre.png',
    stats: { hp: 100, attack: 100, defense: 90, spAtk: 150, spDef: 140, speed: 90 },
    abilities: ['Drizzle'],
  },
  {
    id: 383,
    name: 'Groudon',
    type: 'Ground',
    generation: 3,
    category: 'Continent Pokemon',
    height: 3.5,
    weight: 950.0,
    description:
      'A Pokemon said to have raised continents from the sea, capable of causing intense sunlight and drought.',
    image: 'Groudon.png',
    stats: { hp: 100, attack: 150, defense: 140, spAtk: 100, spDef: 90, speed: 90 },
    abilities: ['Drought'],
  },
  {
    id: 384,
    name: 'Rayquaza',
    type: 'Dragon/Flying',
    generation: 3,
    category: 'Sky High Pokemon',
    height: 7.0,
    weight: 206.5,
    description:
      'A Pokemon that lives in the ozone layer, said to descend to earth to stop conflict between Kyogre and Groudon.',
    image: 'Rayquaza.png',
    stats: { hp: 105, attack: 150, defense: 90, spAtk: 150, spDef: 90, speed: 95 },
    abilities: ['Air Lock'],
  },
]
