// data/typeColors.js
//
// Central place for "what color represents each Pokemon type."
// Used by TypeBadge (the little pill on each card) and by the
// detail modal. Keeping this as a lookup table means every screen
// that shows a type automatically gets the same color -- change it
// once here and it updates everywhere.

export const TYPE_COLORS = {
  Normal: '#A8A878',
  Fire: '#F08030',
  Water: '#6890F0',
  Electric: '#F8D030',
  Grass: '#78C850',
  Ice: '#98D8D8',
  Fighting: '#C03028',
  Poison: '#A040A0',
  Ground: '#E0C068',
  Flying: '#A890F0',
  Psychic: '#F85888',
  Bug: '#A8B820',
  Rock: '#B8A038',
  Ghost: '#705898',
  Dragon: '#7038F8',
  Dark: '#705848',
  Steel: '#B8B8D0',
  Fairy: '#EE99AC',
}

// A type name is readable on a light background but not always on its
// own color (e.g. Electric yellow is too light for white text). This
// says which types need dark text instead of white.
const LIGHT_BACKGROUND_TYPES = new Set(['Electric', 'Ice', 'Steel', 'Fairy'])

export function getTypeColor(typeName) {
  return TYPE_COLORS[typeName] || '#777777'
}

export function getTypeTextColor(typeName) {
  return LIGHT_BACKGROUND_TYPES.has(typeName) ? '#222222' : '#ffffff'
}

// pokemonData.js stores type as a single string like "Ice/Flying" for
// dual types, or "Psychic" for single types. This splits it into a
// clean array either way.
export function splitTypes(typeString) {
  return typeString.split('/').map((t) => t.trim())
}
