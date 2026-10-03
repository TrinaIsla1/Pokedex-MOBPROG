// App.js -- the MAIN file of the app. Everything you see on screen starts here.

// Import "Component", the base class that App builds on (no hooks needed).
import { Component } from 'react'
// Import the basic React Native pieces we draw with.
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// Import the pieces that keep our content away from the phone's notch.
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

// Import our box for one generation on the home screen.
import GenerationCard from './components/GenerationCard'
// Import our card for one Pokemon in the list.
import PokemonCard from './components/PokemonCard'
// Import our popup that shows a Pokemon's full details.
import PokemonDetailModal from './components/PokemonDetailModal'

// Import the list of all Pokemon (it lives in a local file, so no internet is used).
import { pokemonList } from './data/pokemonData'

// A fixed list describing the 3 generations. It never changes.
const GENERATIONS = [
  // Generation 1: its number, the roman numeral shown on screen, its region and its color.
  { number: 1, roman: 'I', region: 'Kanto', color: '#e05a5a' },
  // Generation 2.
  { number: 2, roman: 'II', region: 'Johto', color: '#e0a020' },
  // Generation 3.
  { number: 3, roman: 'III', region: 'Hoenn', color: '#2a9d8f' },
// End of the GENERATIONS list.
]

// App is a class. "export default" means this is the main thing this file provides.
export default class App extends Component {
  // The constructor runs once, when the app starts. React gives it "props".
  constructor(props) {
    // super(props) must come first. It sets up the Component class we extend.
    super(props)
    // this.state is the app's memory. React redraws the screen whenever it changes.
    this.state = {
      // null means "show the HOME screen". 1, 2 or 3 means "show that generation's list".
      selectedGeneration: null,
      // null means "no popup". A Pokemon means "show the popup for that Pokemon".
      selectedPokemon: null,
    // End of the state.
    }
  // End of the constructor.
  }

  // render() runs whenever the screen needs drawing. It returns what to draw.
  render() {
    // Give the app a short name, so the plain functions below can reach setState.
    const app = this
    // Read which generation is selected from the memory.
    const selectedGeneration = this.state.selectedGeneration
    // Read which Pokemon is selected from the memory.
    const selectedPokemon = this.state.selectedPokemon

    // A plain function that runs when "< Back" is tapped.
    const goBack = function () {
      // Set the generation back to null, which shows the HOME screen again.
      app.setState({ selectedGeneration: null })
    // End of the function.
    }

    // A plain function that runs when the popup's "< Close" is tapped.
    const closePopup = function () {
      // Set the Pokemon back to null, which hides the popup.
      app.setState({ selectedPokemon: null })
    // End of the function.
    }

    // "screen" will hold whichever screen we want to show.
    let screen

    // If no generation is selected...
    if (selectedGeneration === null) {
      // ...build the HOME screen. First, an empty list to hold the generation boxes.
      const generationCards = []

      // Loop through GENERATIONS. "i" is the position (0, 1, 2).
      for (let i = 0; i < GENERATIONS.length; i++) {
        // Grab the generation at position i.
        const gen = GENERATIONS[i]

        // Start counting this generation's Pokemon at 0.
        let count = 0

        // Loop through EVERY Pokemon. "j" is the position in pokemonList.
        for (let j = 0; j < pokemonList.length; j++) {
          // If this Pokemon belongs to the current generation...
          if (pokemonList[j].generation === gen.number) {
            // ...add 1 to the count.
            count = count + 1
          // End of the if.
          }
        // End of the Pokemon loop.
        }

        // A plain function that runs when this generation's box is tapped.
        const openGeneration = function () {
          // Remember this generation. React then redraws and shows the LIST screen.
          app.setState({ selectedGeneration: gen.number })
        // End of the function.
        }

        // Make a box for this generation and add it to the end of the list.
        generationCards.push(
          <GenerationCard
            key={gen.number} // React needs a unique key for each item in a list
            roman={gen.roman} // pass "I", "II" or "III" to the card
            region={gen.region} // pass the region name to the card
            color={gen.color} // pass the accent color to the card
            count={count} // pass the number of Pokemon to the card
            onPress={openGeneration} // pass the tap function to the card
          />,
        )
      // End of the generation loop.
      }

      // Put the title, subtitle and boxes together as the HOME screen.
      screen = (
        // A View is a plain box that groups everything below.
        <View>
          {/* The big heading. */}
          <Text style={styles.title}>Legendary Pokedex</Text>
          {/* The small grey text under the heading. */}
          <Text style={styles.subtitle}>Pick a generation</Text>
          {/* Draw the boxes we built in the loop above. */}
          {generationCards}
        </View>
      )
    // Otherwise a generation IS selected...
    } else {
      // ...find its info (we need the region name). Start with nothing found.
      let generation = null

      // Loop through GENERATIONS looking for the one that was tapped.
      for (let i = 0; i < GENERATIONS.length; i++) {
        // If this generation's number matches the selected one...
        if (GENERATIONS[i].number === selectedGeneration) {
          // ...remember it.
          generation = GENERATIONS[i]
        // End of the if.
        }
      // End of the loop.
      }

      // An empty list to hold one card per Pokemon in this generation.
      const pokemonCards = []

      // Loop through EVERY Pokemon. "i" is the position in pokemonList.
      for (let i = 0; i < pokemonList.length; i++) {
        // Grab the Pokemon at position i.
        const pokemon = pokemonList[i]

        // Only continue if it belongs to the selected generation.
        if (pokemon.generation === selectedGeneration) {
          // A plain function that runs when this Pokemon's card is tapped.
          const openPokemon = function () {
            // Remember this Pokemon. That opens the popup.
            app.setState({ selectedPokemon: pokemon })
          // End of the function.
          }

          // Make a card for it and add it to the end of the list.
          pokemonCards.push(
            <PokemonCard
              key={pokemon.id} // unique key for each card
              pokemon={pokemon} // give the card the whole Pokemon
              onPress={openPokemon} // give the card the tap function
            />,
          )
        // End of the if.
        }
      // End of the Pokemon loop.
      }

      // Build the LIST screen.
      screen = (
        // A View is a plain box that groups everything below.
        <View>
          {/* The back button. */}
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            {/* The text inside the back button. */}
            <Text style={styles.backButtonText}>{'< Back'}</Text>
          </TouchableOpacity>
          {/* Heading such as "Generation I". */}
          <Text style={styles.title}>Generation {generation.roman}</Text>
          {/* Region name such as "Kanto". */}
          <Text style={styles.subtitle}>{generation.region}</Text>
          {/* Draw the Pokemon cards we built in the loop above. */}
          {pokemonCards}
        </View>
      )
    // End of the if / else.
    }

    // The final output of render(): what gets drawn on the phone.
    return (
      // These two keep content out of the notch area.
      <SafeAreaProvider>
        {/* edges says which sides to protect. We skip "bottom" so the list scrolls all the way down. */}
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
          {/* "dark-content" makes the clock and battery icons dark. */}
          <StatusBar barStyle="dark-content" />
          {/* Put whichever screen we picked inside a scrollable area. */}
          <ScrollView contentContainerStyle={styles.scrollContent}>{screen}</ScrollView>
          {/* The popup. It draws nothing while selectedPokemon is null. */}
          <PokemonDetailModal pokemon={selectedPokemon} onClose={closePopup} />
        </SafeAreaView>
      </SafeAreaProvider>
    )
  // End of render().
  }
// End of the App class.
}

// Styles are plain objects. StyleSheet.create bundles them; we use them as style={styles.name}.
const styles = StyleSheet.create({
  // The whole screen.
  container: {
    flex: 1, // take up all the available space
    backgroundColor: '#f4f6fb', // light blue-grey background
  },
  // The area inside the ScrollView.
  scrollContent: {
    paddingBottom: 24, // empty space at the bottom so the last item isn't cut off
  },
  // Big heading text.
  title: {
    fontSize: 26, // text size
    fontWeight: 'bold', // thick letters
    textAlign: 'center', // center horizontally
    marginTop: 12, // space above the text
    color: '#222222', // dark grey
  },
  // Smaller grey text under the heading.
  subtitle: {
    fontSize: 14, // text size
    textAlign: 'center', // center horizontally
    color: '#888888', // light grey
    marginBottom: 8, // space below the text
  },
  // The "< Back" button area.
  backButton: {
    paddingHorizontal: 16, // space inside, left and right
    paddingTop: 8, // space inside, top
  },
  // The text inside the back button.
  backButtonText: {
    fontSize: 16, // text size
    color: '#5b7fdb', // blue
    fontWeight: '600', // semi-bold
  },
})
