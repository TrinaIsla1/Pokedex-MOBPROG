// data/formatNumber.js
//
// Turns a Pokedex number into text with at least 3 digits, using plain if statements.
// Examples: 6 becomes "006", 25 becomes "025", 144 stays "144".

// Make the function available to other files. "id" is the number we want to format.
export function formatNumber(id) {
  // If the number is a single digit (0-9)...
  if (id < 10) {
    // ...put two zeros in front. Adding text + a number joins them into text.
    return '00' + id
  // End of the if.
  }
  // If the number has two digits (10-99)...
  if (id < 100) {
    // ...put one zero in front.
    return '0' + id
  // End of the if.
  }
  // Otherwise it already has 3 digits. Adding '' turns the number into text.
  return '' + id
// End of the function.
}
