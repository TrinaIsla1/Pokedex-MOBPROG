// components/SearchBar.js
//
// A simple text input for searching Pokemon by name.
// This component holds NO state itself -- it's "controlled" from the
// outside: App.js owns the actual search text (via useState) and just
// hands it to this component as a prop, along with a function to call
// whenever the text changes. This is the standard React pattern for
// form inputs -- the parent is the "source of truth" for the value.

import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.icon}>{'\uD83D\uDD0D'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Search legendary Pokemon..."
        placeholderTextColor="#999999"
        value={value}
        onChangeText={onChangeText}
        // Nice-to-haves for a search field:
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing" // shows an "x" to clear, on iOS
      />
      {/* Android has no built-in clear button on TextInput, so we add
          our own -- only visible once there's something to clear. */}
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')} hitSlop={10}>
          <Text style={styles.clearIcon}>{'\u2715'}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 14,
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  icon: {
    fontSize: 15,
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 11,
    fontSize: 15,
    color: '#222222',
  },
  clearIcon: {
    fontSize: 13,
    color: '#aaaaaa',
    paddingHorizontal: 4,
  },
})
