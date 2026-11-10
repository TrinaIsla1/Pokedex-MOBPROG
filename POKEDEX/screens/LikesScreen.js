import { useMemo } from 'react'
import { Text, View } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import { useFavorites } from '../context/FavoritesContext'
import PokemonGrid from '../components/PokemonGrid'

export default function LikesScreen({ pokemon, onOpen }) {
  const { colors } = useTheme()
  const { ids } = useFavorites()
  const liked = useMemo(() => pokemon.filter((p) => ids.includes(p.id)), [pokemon, ids])
  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 12 }}>
        <Text style={{ color: colors.text, fontSize: 30, fontWeight: '900' }}>Likes</Text>
        <Text style={{ color: colors.sub }}>{liked.length} favorite{liked.length === 1 ? '' : 's'}</Text>
      </View>
      <PokemonGrid data={liked} onOpen={onOpen} emptyTitle="Nothing liked yet" emptyText="Tap the ♡ on any Pokémon to save it here." />
    </View>
  )
}
