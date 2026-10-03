// components/PokemonCard.js
//
// ONE Pokemon as a card in the list: a small picture on the left,
// and the name, number, type and a short description on the right.

// Import the React Native pieces we draw with. Image shows a picture.
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

// imageMap turns a file name like 'Mewtwo.png' into the actual picture.
import { imageMap } from '../data/imageMap'
// getTypeColor turns a type like 'Fire/Flying' into a color.
import { getTypeColor } from '../data/typeColors'
// formatNumber turns a number like 6 into the text "006".
import { formatNumber } from '../data/formatNumber'

// "props" is everything App.js sends to this card:
//   props.pokemon = the Pokemon to show      props.onPress = run when tapped
export default function PokemonCard(props) {
  // Keep the Pokemon in a short name so the lines below are easier to read.
  const pokemon = props.pokemon

  // Draw the card.
  return (
    // The whole card is a button. When tapped, it runs props.onPress.
    <TouchableOpacity style={styles.card} onPress={props.onPress}>
      {/* A thin colored stripe on the left edge, colored by the Pokemon's type. */}
      <View
        style={{
          width: 5, // 5 wide; it stretches to the full height of the card by itself
          backgroundColor: getTypeColor(pokemon.type), // the color for this type
        }}
      />

      {/* The picture. imageMap[pokemon.image] finds the picture for this Pokemon. */}
      <Image source={imageMap[pokemon.image]} style={styles.image} resizeMode="contain" />

      {/* All the text, stacked top to bottom, on the right of the picture. */}
      <View style={styles.info}>
        {/* The name on the left and the number on the right. */}
        <View style={styles.nameRow}>
          {/* The name. */}
          <Text style={styles.name}>{pokemon.name}</Text>
          {/* The number, like "#144". formatNumber makes 6 into "006". */}
          <Text style={styles.number}>#{formatNumber(pokemon.id)}</Text>
        </View>

        {/* The type, such as "Ice/Flying". */}
        <Text style={styles.type}>{pokemon.type}</Text>

        {/* The description. numberOfLines={2} cuts it off after 2 lines. */}
        <Text style={styles.description} numberOfLines={2}>
          {pokemon.description}
        </Text>
      </View>
    </TouchableOpacity>
  )
// End of the function.
}

// The styles for this card.
const styles = StyleSheet.create({
  // The white card.
  card: {
    flexDirection: 'row', // stripe | picture | text, side by side
    backgroundColor: '#ffffff', // white
    borderRadius: 16, // rounded corners
    marginHorizontal: 16, // space outside, left and right
    marginVertical: 7, // space outside, top and bottom
    overflow: 'hidden', // clip anything that pokes past the rounded corners
  },
  // The Pokemon picture.
  image: {
    width: 68, // picture width
    height: 68, // picture height
    margin: 10, // space around the picture
  },
  // The text area.
  info: {
    flex: 1, // take all the remaining width
    paddingVertical: 12, // space inside, top and bottom
    paddingRight: 12, // space inside, right
    justifyContent: 'center', // center the text vertically
  },
  // The row with the name and the number.
  nameRow: {
    flexDirection: 'row', // name and number side by side
    justifyContent: 'space-between', // push them to opposite ends
    alignItems: 'center', // center them vertically
  },
  // The Pokemon's name.
  name: {
    fontSize: 17, // text size
    fontWeight: 'bold', // thick letters
    color: '#222222', // dark grey
  },
  // The dex number, like "#144".
  number: {
    fontSize: 12, // text size
    color: '#bbbbbb', // faint grey
    fontWeight: '600', // semi-bold
  },
  // The type text.
  type: {
    fontSize: 12.5, // text size
    fontWeight: '700', // bold
    color: '#888888', // light grey
    marginTop: 3, // a little space above
  },
  // The description text.
  description: {
    fontSize: 12.5, // text size
    color: '#666666', // grey
    marginTop: 6, // space above
    lineHeight: 17, // height of each line of text
  },
})
