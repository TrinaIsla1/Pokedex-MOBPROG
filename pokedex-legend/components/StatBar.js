// components/StatBar.js
//
// One row in the "base stats" section of the detail modal:
// a label (HP, Attack, ...), the numeric value, and a horizontal
// bar whose fill width represents that value relative to a fixed
// scale. We cap the scale at 200 (rather than the true max of 255)
// because every Pokemon in this app has stats well under that, so
// capping at 200 makes the differences between them easier to see.

import { StyleSheet, Text, View } from 'react-native'

const STAT_SCALE_MAX = 200

const STAT_COLORS = {
  HP: '#FF6B6B',
  Attack: '#F5A623',
  Defense: '#4A90D9',
  'Sp. Atk': '#B368E0',
  'Sp. Def': '#4CB8A3',
  Speed: '#F06BAA',
}

export default function StatBar({ label, value }) {
  const pct = Math.min(100, Math.round((value / STAT_SCALE_MAX) * 100))
  const color = STAT_COLORS[label] || '#5b7fdb'

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  label: {
    width: 62,
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
  },
  track: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#eef0f5',
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
  value: {
    width: 30,
    fontSize: 12,
    fontWeight: '700',
    color: '#222222',
    textAlign: 'right',
  },
})
