import { Alert, Pressable, Text, View } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import { useFavorites } from '../context/FavoritesContext'

const MODES = [{ key: 'system', label: '📱 System' }, { key: 'light', label: '☀️ Light' }, { key: 'dark', label: '🌙 Dark' }]

export default function SettingsScreen({ reload, loading }) {
  const { colors, mode, setMode } = useTheme()
  const { ids, clear } = useFavorites()
  const card = { backgroundColor: colors.card, borderRadius: 20, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: colors.border }
  const title = { color: colors.text, fontSize: 16, fontWeight: '800', marginBottom: 10 }

  const confirmClear = () =>
    Alert.alert('Clear all likes?', 'This removes every Pokémon from your Likes.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: clear },
    ])

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <Text style={{ color: colors.text, fontSize: 30, fontWeight: '900', marginTop: 8, marginBottom: 16 }}>Settings</Text>

      <View style={card}>
        <Text style={title}>Theme</Text>
        <View style={{ flexDirection: 'row', backgroundColor: colors.input, borderRadius: 14, padding: 4 }}>
          {MODES.map((m) => (
            <Pressable key={m.key} onPress={() => setMode(m.key)}
              style={{ flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: 11, backgroundColor: mode === m.key ? colors.accent : 'transparent' }}>
              <Text style={{ color: mode === m.key ? '#fff' : colors.text, fontWeight: '700', fontSize: 13 }}>{m.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={card}>
        <Text style={title}>Data</Text>
        <Pressable onPress={reload} disabled={loading} style={{ paddingVertical: 8 }}>
          <Text style={{ color: colors.accent, fontWeight: '700' }}>{loading ? 'Refreshing…' : '↻ Refresh from PokéAPI'}</Text>
        </Pressable>
        <Pressable onPress={confirmClear} disabled={ids.length === 0} style={{ paddingVertical: 8 }}>
          <Text style={{ color: ids.length ? '#E5484D' : colors.sub, fontWeight: '700' }}>🗑 Clear likes ({ids.length})</Text>
        </Pressable>
      </View>

      <Text style={{ color: colors.sub, fontSize: 12, textAlign: 'center' }}>Data and artwork from pokeapi.co. Pokémon © Nintendo / Game Freak.</Text>
    </View>
  )
}
