import { FlatList, Text, View } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import PokemonCard from './PokemonCard'

export default function PokemonGrid({ data, onOpen, emptyTitle, emptyText }) {
  const { colors } = useTheme()
  return (
    <FlatList
      data={data}
      numColumns={2}
      keyExtractor={(p) => String(p.id)}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 24, flexGrow: 1 }}
      renderItem={({ item }) => (
        <View style={{ width: '50%', padding: 6 }}>
          <PokemonCard pokemon={item} onPress={() => onOpen(item)} />
        </View>
      )}
      ListEmptyComponent={
        <View style={{ alignItems: 'center', paddingTop: 60, paddingHorizontal: 30 }}>
          <Text style={{ fontSize: 40 }}>🫥</Text>
          <Text style={{ color: colors.text, fontSize: 17, fontWeight: '800', marginTop: 8 }}>{emptyTitle}</Text>
          <Text style={{ color: colors.sub, textAlign: 'center', marginTop: 4 }}>{emptyText}</Text>
        </View>
      }
    />
  )
}
