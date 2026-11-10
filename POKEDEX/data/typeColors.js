// One color per Pokemon type (the API gives the type names).
export const TYPE_COLORS = {
  Normal: '#A8A878', Fire: '#F0642D', Water: '#5C8EF0', Electric: '#F7C927', Grass: '#5DBE3C',
  Ice: '#7FD3D3', Fighting: '#C03028', Poison: '#A040A0', Ground: '#D8B450', Flying: '#9A86F0',
  Psychic: '#F85888', Bug: '#A8B820', Rock: '#B8A038', Ghost: '#705898', Dragon: '#6F3CF8',
  Dark: '#705848', Steel: '#9EA6C4', Fairy: '#EE99AC',
}

export const getTypeColor = (type) => TYPE_COLORS[type] || '#777777'

// Dark text on light colors, white text on dark colors.
export function readableText(hex) {
  const n = parseInt(hex.slice(1), 16)
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255
  return lum > 0.68 ? '#1B1D2A' : '#FFFFFF'
}
