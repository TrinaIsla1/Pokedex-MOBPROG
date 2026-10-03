// components/GenerationCard.js
//
// ONE of the big tappable boxes on the home screen
// (for example: "Generation I - Kanto region - 4 Legendary Pokemon").

// Import the React Native pieces we draw with.
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

// "props" is everything App.js sends to this box:
//   props.roman = "I", "II" or "III"      props.region  = the region name
//   props.count = number of Pokemon        props.color   = the accent color
//   props.onPress = the function to run when the box is tapped
export default function GenerationCard(props) {
  // Draw the box.
  return (
    // The whole box is one big button. When tapped, it runs props.onPress.
    <TouchableOpacity style={styles.card} onPress={props.onPress}>
      {/* The colored square on the left. Its style is ONE object holding everything. */}
      <View
        style={{
          width: 58, // square, 58 wide...
          height: 58, // ...and 58 tall
          borderRadius: 14, // rounded corners
          justifyContent: 'center', // center the numeral vertically
          alignItems: 'center', // center the numeral horizontally
          marginRight: 14, // space between the square and the text
          backgroundColor: props.color, // the accent color from App.js
        }}
      >
        {/* The roman numeral inside the square. */}
        <Text style={styles.badgeText}>{props.roman}</Text>
      </View>

      {/* The text on the right side of the square. */}
      <View style={styles.textArea}>
        {/* "Generation I". */}
        <Text style={styles.title}>Generation {props.roman}</Text>
        {/* "Kanto region". */}
        <Text style={styles.subtitle}>{props.region} region</Text>
        {/* The count line. Its style is ONE object, colored with the accent color. */}
        <Text
          style={{
            fontSize: 13, // text size
            fontWeight: '700', // bold
            marginTop: 6, // a little space above
            color: props.color, // the accent color from App.js
          }}
        >
          {props.count} Legendary Pokemon
        </Text>
      </View>
    </TouchableOpacity>
  )
// End of the function.
}

// The styles for this box.
const styles = StyleSheet.create({
  // The whole white box.
  card: {
    flexDirection: 'row', // children side by side (square | text)
    alignItems: 'center', // center the children vertically
    backgroundColor: '#ffffff', // white
    borderRadius: 18, // rounded corners
    padding: 18, // space inside the box, all sides
    marginHorizontal: 16, // space outside, left and right
    marginVertical: 8, // space outside, top and bottom
  },
  // The roman numeral inside the colored square.
  badgeText: {
    color: '#ffffff', // white
    fontSize: 21, // text size
    fontWeight: 'bold', // thick letters
  },
  // The area holding the three lines of text.
  textArea: {
    flex: 1, // take the space left over next to the square
  },
  // "Generation I".
  title: {
    fontSize: 18, // text size
    fontWeight: 'bold', // thick letters
    color: '#222222', // dark grey
  },
  // "Kanto region".
  subtitle: {
    fontSize: 13, // text size
    color: '#888888', // light grey
    marginTop: 2, // a little space above
  },
})
