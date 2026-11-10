// App.js -- providers, bottom tabs and the shared detail popup.
import { useState } from 'react'
import { Pressable, StatusBar, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

import { ThemeProvider, useTheme } from './context/ThemeContext'
import { FavoritesProvider, useFavorites } from './context/FavoritesContext'
import { usePokemonList } from './hooks/usePokemon'
import HomeScreen from './screens/HomeScreen'
import RegionsScreen from './screens/RegionsScreen'
import LikesScreen from './screens/LikesScreen'
import SettingsScreen from './screens/SettingsScreen'
import PokemonDetailModal from './components/PokemonDetailModal'

const TABS = [
  { key: 'dex', icon: '🔎', label: 'Pokédex' },
  { key: 'regions', icon: '🗺️', label: 'Regions' },
  { key: 'likes', icon: '❤️', label: 'Likes' },
  { key: 'settings', icon: '⚙️', label: 'Settings' },
]

function TabBar({ tab, onChange }) {
  const { colors } = useTheme()
  const { ids } = useFavorites()
  const insets = useSafeAreaInsets()
  return (
    <View style={{ flexDirection: 'row', backgroundColor: colors.card, borderTopWidth: 1, borderTopColor: colors.border, paddingBottom: insets.bottom, paddingTop: 8 }}>
      {TABS.map((t) => {
        const on = tab === t.key
        return (
          <Pressable key={t.key} onPress={() => onChange(t.key)} style={{ flex: 1, alignItems: 'center', paddingBottom: 6 }}>
            <Text style={{ fontSize: 20, opacity: on ? 1 : 0.55 }}>{t.icon}</Text>
            <Text style={{ fontSize: 11, fontWeight: '700', color: on ? colors.accent : colors.sub }}>{t.label}</Text>
            {t.key === 'likes' && ids.length > 0 ? (
              <View style={{ position: 'absolute', top: -2, right: '28%', backgroundColor: colors.accent, borderRadius: 8, minWidth: 16, paddingHorizontal: 4, alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 10, fontWeight: '800' }}>{ids.length}</Text>
              </View>
            ) : null}
          </Pressable>
        )
      })}
    </View>
  )
}

function Shell() {
  const { colors, isDark } = useTheme()
  const list = usePokemonList()
  const [tab, setTab] = useState('dex')
  const [selected, setSelected] = useState(null)

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        {tab === 'dex' && <HomeScreen pokemon={list.data} loading={list.loading} error={list.error} reload={list.reload} onOpen={setSelected} />}
        {tab === 'regions' && <RegionsScreen pokemon={list.data} onOpen={setSelected} />}
        {tab === 'likes' && <LikesScreen pokemon={list.data} onOpen={setSelected} />}
        {tab === 'settings' && <SettingsScreen reload={list.reload} loading={list.loading} />}
      </SafeAreaView>
      <TabBar tab={tab} onChange={setTab} />
      <PokemonDetailModal pokemon={selected} onClose={() => setSelected(null)} />
    </View>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <FavoritesProvider>
          <Shell />
        </FavoritesProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
