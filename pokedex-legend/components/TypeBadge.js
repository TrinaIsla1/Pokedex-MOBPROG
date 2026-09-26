// components/TypeBadge.js
//
// Renders a Pokemon's type(s) as small colored pills, e.g. a dual-type
// Pokemon like Latias ("Dragon/Psychic") shows two pills side by side.
// Color per type comes from data/typeColors.js so it's consistent
// everywhere it's used (card list + detail modal).

import { StyleSheet, Text, View } from 'react-native'
import { getTypeColor, getTypeTextColor, splitTypes } from '../data/typeColors'

export default function TypeBadge({ type, size = 'small' }) {
  const types = splitTypes(type)

  return (
    <View style={styles.row}>
      {types.map((t) => (
        <View
          key={t}
          style={[
            styles.pill,
            size === 'large' && styles.pillLarge,
            { backgroundColor: getTypeColor(t) },
          ]}
        >
          <Text
            style={[
              styles.text,
              size === 'large' && styles.textLarge,
              { color: getTypeTextColor(t) },
            ]}
          >
            {t.toUpperCase()}
          </Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  pill: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 20,
  },
  pillLarge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  textLarge: {
    fontSize: 13,
  },
})
