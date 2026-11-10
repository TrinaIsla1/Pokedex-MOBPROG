// Search bar + generation filter + grid of cards.
import { useMemo, useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useTheme } from '../context/ThemeContext'
import PokemonGrid from '../components/PokemonGrid'
import { REGIONS } from '../data/regions'

const FILTERS = [
  { label: 'All', gen: 0 },
  ...REGIONS.map((r) => ({ label: r.name, gen: r.gen })),
]

export default function HomeScreen({
  pokemon,
  loading,
  error,
  reload,
  onOpen,
}) {
  const { colors } = useTheme()
  const [query, setQuery] = useState('')
  const [gen, setGen] = useState(0)

  // Match name, number, type, region or "legendary"/"mythical".
  const results = useMemo(() => {
    const q = query.trim().toLowerCase().replace('#', '')
    return pokemon.filter((p) => {
      if (gen && p.generation !== gen) return false
      if (!q) return true
      const hay = [p.name, String(p.id), p.region, p.rarity, ...p.types]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [pokemon, query, gen])

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 8 }}>
        <Text style={{ color: colors.text, fontSize: 30, fontWeight: '900' }}>
          Legendary Pokédex
        </Text>
        <Text style={{ color: colors.sub, marginBottom: 14 }}>
          {loading
            ? `Loading… ${pokemon.length} so far`
            : `${results.length} of ${pokemon.length} Pokémon`}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.input,
            borderRadius: 16,
            paddingHorizontal: 14,
          }}
        >
          <Text style={{ fontSize: 16 }}>🔍</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search name, type, #number, region…"
            placeholderTextColor={colors.sub}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
            style={{
              flex: 1,
              color: colors.text,
              paddingVertical: 12,
              paddingHorizontal: 10,
              fontSize: 15,
            }}
          />
          {query ? (
            <Pressable onPress={() => setQuery('')} hitSlop={10}>
              <Text style={{ color: colors.sub, fontSize: 16 }}>✕</Text>
            </Pressable>
          ) : null}
        </View>

        <View style={{ height: 14 }} />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0, flexShrink: 0, marginBottom: 14 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 8,
          alignItems: 'center',
        }}
      >
        {FILTERS.map((f) => {
          const on = gen === f.gen
          return (
            <Pressable
              key={f.label}
              onPress={() => setGen(f.gen)}
              style={{
                minHeight: 40,
                paddingHorizontal: 16,
                justifyContent: 'center',
                borderRadius: 99,
                backgroundColor: on ? colors.accent : colors.input,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  color: on ? '#fff' : colors.text,
                  fontWeight: '700',
                  fontSize: 13,
                }}
              >
                {f.label}
              </Text>
            </Pressable>
          )
        })}
      </ScrollView>

      {loading && pokemon.length === 0 ? (
        <ActivityIndicator
          size="large"
          color={colors.accent}
          style={{ marginTop: 60 }}
        />
      ) : error && pokemon.length === 0 ? (
        <View
          style={{
            alignItems: 'center',
            paddingTop: 60,
            paddingHorizontal: 30,
          }}
        >
          <Text style={{ fontSize: 40 }}>📡</Text>
          <Text
            style={{
              color: colors.text,
              fontSize: 17,
              fontWeight: '800',
              marginTop: 8,
            }}
          >
            Couldn't reach PokéAPI
          </Text>
          <Text
            style={{
              color: colors.sub,
              textAlign: 'center',
              marginVertical: 6,
            }}
          >
            {error}
          </Text>
          <Pressable
            onPress={reload}
            style={{
              backgroundColor: colors.accent,
              borderRadius: 14,
              paddingHorizontal: 22,
              paddingVertical: 10,
              marginTop: 8,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '800' }}>Try again</Text>
          </Pressable>
        </View>
      ) : (
        <PokemonGrid
          data={results}
          onOpen={onOpen}
          emptyTitle="No Pokémon found"
          emptyText="Try a different name, type or region."
        />
      )}
    </View>
  )
}
