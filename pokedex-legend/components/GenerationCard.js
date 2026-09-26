// components/GenerationCard.js
//
// This is one of the big tappable "boxes" on the home screen
// (Generation I, Generation II, Generation III).
// It's a button -- when pressed, it calls the "onPress" function
// that was passed in from App.js, telling App.js which generation
// was tapped.
//
// This component itself has no state -- it just displays info it
// was given (generationNumber, regionName, count, accentColor) and
// reports taps back up to its parent (App.js). This pattern -- child
// reports events, parent decides what to do -- is very common in React.

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function GenerationCard({
  generationNumber,
  regionName,
  count,
  accentColor,
  onPress,
}) {
  return (
    // TouchableOpacity = a pressable area that fades slightly when tapped.
    // onPress runs whatever function was passed in as a prop.
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
      <View style={[styles.romanBadge, { backgroundColor: accentColor }]}>
        <Text style={styles.romanText}>{toRoman(generationNumber)}</Text>
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.title}>Generation {toRoman(generationNumber)}</Text>
        <Text style={styles.subtitle}>{regionName} region</Text>
        <View style={[styles.countPill, { backgroundColor: `${accentColor}22` }]}>
          <Text style={[styles.count, { color: accentColor }]}>
            {count} Legendary Pokemon
          </Text>
        </View>
      </View>
      {/* Simple ">" arrow to hint that this box is tappable */}
      <Text style={styles.arrow}>{'>'}</Text>
    </TouchableOpacity>
  )
}

// Small helper: converts 1, 2, 3 into "I", "II", "III" for display.
function toRoman(num) {
  const romanNumerals = { 1: 'I', 2: 'II', 3: 'III' }
  return romanNumerals[num] || num.toString()
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 18,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  romanBadge: {
    width: 58,
    height: 58,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  romanText: {
    color: '#ffffff',
    fontSize: 21,
    fontWeight: 'bold',
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222222',
  },
  subtitle: {
    fontSize: 13,
    color: '#888888',
    marginTop: 2,
  },
  countPill: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 6,
  },
  count: {
    fontSize: 12,
    fontWeight: '700',
  },
  arrow: {
    fontSize: 22,
    color: '#cccccc',
    marginLeft: 8,
  },
})
