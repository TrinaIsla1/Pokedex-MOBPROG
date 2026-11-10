import { Text, View } from 'react-native'
import { getTypeColor, readableText } from '../data/typeColors'

export default function TypeBadge({ type, big }) {
  const bg = getTypeColor(type)
  return (
    <View style={{ backgroundColor: bg, borderRadius: 99, paddingHorizontal: big ? 14 : 9, paddingVertical: big ? 5 : 3 }}>
      <Text style={{ color: readableText(bg), fontSize: big ? 13 : 10.5, fontWeight: '800' }}>{type}</Text>
    </View>
  )
}
