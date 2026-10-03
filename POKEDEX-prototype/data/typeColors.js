// data/typeColors.js
//
// A "lookup table" that says which color goes with each Pokemon type.
// On the left is the type name, on the right is a color written as a
// hex code (a # followed by 6 characters).
// The color is used for the stripe on each card and the border of the popup.
// Make TYPE_COLORS available to other files.
export const TYPE_COLORS = {
  Normal: '#A8A878', // color for Normal type
  Fire: '#e74712', // color for Fire type
  Water: '#6890F0', // color for Water type
  Electric: '#F8D030', // color for Electric type
  Grass: '#78C850', // color for Grass type
  Ice: '#98D8D8', // color for Ice type
  Fighting: '#C03028', // color for Fighting type
  Poison: '#A040A0', // color for Poison type
  Ground: '#E0C068', // color for Ground type
  Flying: '#A890F0', // color for Flying type
  Psychic: '#F85888', // color for Psychic type
  Bug: '#A8B820', // color for Bug type
  Rock: '#B8A038', // color for Rock type
  Ghost: '#705898', // color for Ghost type
  Dragon: '#7038F8', // color for Dragon type
  Dark: '#705848', // color for Dark type
  Steel: '#B8B8D0', // color for Steel type
  Fairy: '#EE99AC', // color for Fairy type
// End of the table.
}

// A function that takes a Pokemon's type text and gives back a color.
//
// Some Pokemon have two types written like "Ice/Flying". We only want the
// FIRST type ("Ice"), so we read the text one letter at a time and stop at the "/".
// For a single type like "Psychic" there is no "/", so we read the whole word.
export function getTypeColor(type) {
  // This will hold the first type as we build it letter by letter. Start empty.
  let firstType = ''

  // Loop through every letter of the type text. "i" is the position of the letter.
  for (let i = 0; i < type.length; i++) {
    // If this letter is a "/", the first type has ended...
    if (type[i] === '/') {
      // ...so stop the loop early.
      break
    // End of the if.
    }
    // Otherwise add this letter to the end of firstType.
    firstType = firstType + type[i]
  // End of the loop.
  }

  // Look up the first type in the table above (for example 'Ice' gives '#98D8D8').
  let color = TYPE_COLORS[firstType]

  // If the type wasn't in the table, nothing was found...
  if (color === undefined) {
    // ...so use grey instead.
    color = '#777777'
  // End of the if.
  }

  // Give the color back to whoever asked for it.
  return color
// End of the function.
}
