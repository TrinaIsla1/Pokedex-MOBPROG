// components/PokemonDetailModal.js
//
// The popup that slides up when you tap a Pokemon card.
// It shows a big picture, the name, type, description, base stats,
// abilities, height and weight.

// Import the React Native pieces we draw with.
// Modal = a screen on top of everything else. ScrollView = scrolls if content is tall.
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

// imageMap turns a file name like 'Mewtwo.png' into the actual picture.
import { imageMap } from '../data/imageMap'
// getTypeColor turns a type like 'Fire/Flying' into a color.
import { getTypeColor } from '../data/typeColors'
// formatNumber turns a number like 6 into the text "006".
import { formatNumber } from '../data/formatNumber'

// "props" is everything App.js sends to this popup:
//   props.pokemon = the Pokemon to show, or null    props.onClose = run when "Close" is tapped
export default function PokemonDetailModal(props) {
  // If no Pokemon is selected, draw nothing at all. This keeps the popup hidden.
  if (props.pokemon === null) {
    // "return null" means "show nothing".
    return null
    // End of the if.
  }

  // Keep the Pokemon in a short name so the lines below are easier to read.
  const pokemon = props.pokemon

  // The six base stats as a list. "label" is the text shown, "value" is the number.
  const statRows = [
    { label: 'HP', value: pokemon.stats.hp },
    { label: 'Attack', value: pokemon.stats.attack },
    { label: 'Defense', value: pokemon.stats.defense },
    { label: 'Sp. Atk', value: pokemon.stats.spAtk },
    { label: 'Sp. Def', value: pokemon.stats.spDef },
    { label: 'Speed', value: pokemon.stats.speed },
  ]

  // An empty list to hold one drawn row per stat.
  const statViews = []

  // Loop through statRows. "i" is the position (0 to 5).
  for (let i = 0; i < statRows.length; i++) {
    // Grab the stat at position i.
    const stat = statRows[i]

    // Draw one row for it and add it to the end of the list.
    statViews.push(
      <View key={stat.label} style={styles.row}>
        <Text style={styles.rowLabel}>{stat.label}</Text>
        <Text style={styles.rowValue}>{stat.value}</Text>
      </View>,
    )
    // End of the loop.
  }

  // Turn the abilities list (like ['A', 'B']) into text (like "A, B").
  // Start with empty text.
  let abilitiesText = ''

  // Loop through the abilities, one at a time.
  for (let i = 0; i < pokemon.abilities.length; i++) {
    // If this is NOT the first ability...
    if (i > 0) {
      // ...add a comma and a space before it.
      abilitiesText = abilitiesText + ', '
      // End of the if.
    }
    // Add this ability's name to the end of the text.
    abilitiesText = abilitiesText + pokemon.abilities[i]
    // End of the loop.
  }

  // Draw the popup.
  return (
    // visible={true} shows it. animationType="slide" slides it up from the bottom.
    // onRequestClose runs when the Android back button is pressed.
    <Modal visible={true} animationType="slide" onRequestClose={props.onClose}>
      {/* A ScrollView so everything is reachable on small screens. */}
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        {/* The Close button. Tapping it runs props.onClose. */}
        <TouchableOpacity style={styles.closeButton} onPress={props.onClose}>
          {/* The text of the close button. */}
          <Text style={styles.closeButtonText}>{'< Close'}</Text>
        </TouchableOpacity>

        {/* The box around the big picture. Its style is ONE object holding everything. */}
        <View
          style={{
            backgroundColor: '#ffffff', // white box
            borderWidth: 3, // border thickness
            borderRadius: 20, // rounded corners
            alignItems: 'center', // center the picture horizontally
            paddingVertical: 16, // space above and below the picture
            borderColor: getTypeColor(pokemon.type), // border color from the Pokemon's type
          }}
        >
          {/* The big picture. */}
          <Image
            source={imageMap[pokemon.image]}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* The name. */}
        <Text style={styles.name}>{pokemon.name}</Text>
        {/* The number, like "#144". */}
        <Text style={styles.number}>#{formatNumber(pokemon.id)}</Text>
        {/* The type, like "Ice/Flying". */}
        <Text style={styles.type}>{pokemon.type}</Text>
        {/* The category, like "Freeze Pokemon". */}
        <Text style={styles.category}>{pokemon.category}</Text>

        {/* The description. */}
        <Text style={styles.description}>{pokemon.description}</Text>

        {/* The heading for the stats. */}
        <Text style={styles.sectionTitle}>Base Stats</Text>
        {/* Draw the stat rows we built in the loop above. */}
        {statViews}

        {/* The heading for the other info. */}
        <Text style={styles.sectionTitle}>Info</Text>

        {/* The abilities row. */}
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Abilities</Text>
          {/* The abilities text we built in the loop above. */}
          <Text style={styles.rowValue}>{abilitiesText}</Text>
        </View>

        {/* The height row. */}
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Height</Text>
          <Text style={styles.rowValue}>{pokemon.height} m</Text>
        </View>

        {/* The weight row. */}
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Weight</Text>
          <Text style={styles.rowValue}>{pokemon.weight} kg</Text>
        </View>
      </ScrollView>
    </Modal>
  )
  // End of the function.
}

// The styles for the popup.
const styles = StyleSheet.create({
  // The whole popup background.
  screen: {
    flex: 1, // fill the whole popup
    backgroundColor: '#f4f6fb', // light blue-grey
  },
  // The area inside the ScrollView.
  content: {
    padding: 20, // space on all sides
    paddingTop: 50, // extra space on top to clear the phone's notch
    paddingBottom: 40, // extra space at the bottom
  },
  // The close button area.
  closeButton: {
    marginBottom: 12, // space below the button
  },
  // The text of the close button.
  closeButtonText: {
    fontSize: 16, // text size
    color: '#5b7fdb', // blue
    fontWeight: '600', // semi-bold
  },
  // The big picture.
  image: {
    width: 190, // picture width
    height: 190, // picture height
  },
  // The Pokemon's name.
  name: {
    fontSize: 28, // text size
    fontWeight: 'bold', // thick letters
    color: '#222222', // dark grey
    textAlign: 'center', // center horizontally
    marginTop: 16, // space above
  },
  // The dex number.
  number: {
    fontSize: 14, // text size
    color: '#aaaaaa', // faint grey
    textAlign: 'center', // center horizontally
  },
  // The type, like "Ice/Flying".
  type: {
    fontSize: 15, // text size
    fontWeight: '700', // bold
    color: '#555555', // grey
    textAlign: 'center', // center horizontally
    marginTop: 6, // space above
  },
  // The category, like "Freeze Pokemon".
  category: {
    fontSize: 13, // text size
    color: '#999999', // light grey
    textAlign: 'center', // center horizontally
    fontStyle: 'italic', // slanted text
    marginTop: 2, // a little space above
  },
  // The description paragraph.
  description: {
    fontSize: 14, // text size
    lineHeight: 21, // height of each line of text
    color: '#555555', // grey
    marginTop: 16, // space above
  },
  // Headings like "Base Stats" and "Info".
  sectionTitle: {
    fontSize: 18, // text size
    fontWeight: 'bold', // thick letters
    color: '#222222', // dark grey
    marginTop: 24, // space above
    marginBottom: 6, // space below
  },
  // One row, like "HP ........ 90".
  row: {
    flexDirection: 'row', // label and value side by side
    justifyContent: 'space-between', // label on the left, value on the right
    paddingVertical: 8, // space inside, top and bottom
    borderBottomWidth: 1, // a thin line under each row
    borderBottomColor: '#e6e8f0', // color of that line
  },
  // The left side of a row, like "HP".
  rowLabel: {
    fontSize: 14, // text size
    color: '#888888', // light grey
  },
  // The right side of a row, like "90".
  rowValue: {
    fontSize: 14, // text size
    fontWeight: '700', // bold
    color: '#222222', // dark grey
  },
})
