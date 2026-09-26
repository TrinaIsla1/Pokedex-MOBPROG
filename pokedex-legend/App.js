// App.js
//
// This app has TWO "screens" even though it's a single file:
//   1. The HOME screen -- three boxes, one per generation (or search
//      results / favorites, when either of those is active).
//   2. The LIST screen -- shows only that generation's legendary
//      Pokemon, with a back button to return to the home screen, and
//      type chips to narrow the list further.
//
// We don't need a navigation library for this -- we just track "which
// screen are we showing" using useState, and render different JSX
// depending on its value. selectedGeneration is either null (meaning:
// show the home screen) or a number like 1, 2, or 3 (meaning: show
// that generation's list).
//
// Tapping any Pokemon card (on either screen) opens a detail modal
// with its full stats -- that's tracked by a separate piece of state,
// selectedPokemon, so the modal can be shown regardless of which
// screen is behind it.

import { useState } from 'react'
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import GenerationCard from './components/GenerationCard'
import PokemonCard from './components/PokemonCard'
import PokemonDetailModal from './components/PokemonDetailModal'
import SearchBar from './components/SearchBar'
import { pokemonList } from './data/pokemonData'
import { splitTypes } from './data/typeColors'

// Static info about each generation -- name of the region, which
// generation number it corresponds to, and a theme color used for
// its badge and card accents. This never changes, so it lives outside
// the component (no need to recreate it on every render).
const GENERATIONS = [
  { number: 1, region: 'Kanto', accentColor: '#e05a5a' },
  { number: 2, region: 'Johto', accentColor: '#e0a020' },
  { number: 3, region: 'Hoenn', accentColor: '#2a9d8f' },
]

export default function App() {
  // Our pieces of state:
  // - selectedGeneration: null -> home screen, 1/2/3 -> that gen's list
  // - searchText: whatever's typed into the search bar (home screen only)
  // - showFavoritesOnly: home screen toggle to show only caught Pokemon
  // - favoriteIds: which Pokemon (by id) have been starred/"caught"
  // - selectedPokemon: which Pokemon's detail modal is open (or null)
  // - activeTypeFilter: on the list screen, narrows to one type (or null)
  const [selectedGeneration, setSelectedGeneration] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [favoriteIds, setFavoriteIds] = useState(new Set())
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [activeTypeFilter, setActiveTypeFilter] = useState(null)

  const isSearching = searchText.trim().length > 0

  function toggleFavorite(pokemonId) {
    setFavoriteIds((current) => {
      const next = new Set(current)
      if (next.has(pokemonId)) {
        next.delete(pokemonId)
      } else {
        next.add(pokemonId)
      }
      return next
    })
  }

  function openGeneration(genNumber) {
    setActiveTypeFilter(null)
    setSelectedGeneration(genNumber)
  }

  function goHome() {
    setActiveTypeFilter(null)
    setSelectedGeneration(null)
  }

  // Count how many legendary Pokemon exist for a given generation number.
  // (Just a small calculation -- not stored anywhere, recalculated each render.)
  function countForGeneration(genNumber) {
    return pokemonList.filter((p) => p.generation === genNumber).length
  }

  // Renders a Pokemon list with our standard row/empty-state/spacing,
  // so the search-results list and the per-generation list don't have
  // to repeat these props.
  function renderPokemonList(data, emptyMessage) {
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={item}
            isFavorite={favoriteIds.has(item.id)}
            onPress={setSelectedPokemon}
            onToggleFavorite={toggleFavorite}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          emptyMessage ? <Text style={styles.emptyText}>{emptyMessage}</Text> : null
        }
      />
    )
  }

  // ---------- LIST SCREEN ----------
  // If a generation is selected, show only that generation's Pokemon,
  // optionally narrowed further by activeTypeFilter.
  if (selectedGeneration !== null) {
    const generationList = pokemonList.filter((p) => p.generation === selectedGeneration)
    const region = GENERATIONS.find((g) => g.number === selectedGeneration)?.region
    const accentColor = GENERATIONS.find((g) => g.number === selectedGeneration)?.accentColor

    // Every distinct type present in this generation, so the filter
    // chips only ever show types that actually apply.
    const typesInGeneration = [
      ...new Set(generationList.flatMap((p) => splitTypes(p.type))),
    ]

    const filteredList = activeTypeFilter
      ? generationList.filter((p) => splitTypes(p.type).includes(activeTypeFilter))
      : generationList

    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
          <StatusBar barStyle="dark-content" />

          {/* Back button -- tapping it resets selectedGeneration to null,
              which makes the app re-render the home screen instead. */}
          <TouchableOpacity style={styles.backButton} onPress={goHome}>
            <Text style={styles.backButtonText}>{'< Back'}</Text>
          </TouchableOpacity>

          <Text style={styles.title}>
            Generation {toRoman(selectedGeneration)}
          </Text>
          <Text style={styles.subtitle}>{region}</Text>

          <View style={styles.chipRow}>
            {typesInGeneration.map((type) => {
              const active = activeTypeFilter === type
              return (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.chip,
                    active && { backgroundColor: accentColor, borderColor: accentColor },
                  ]}
                  onPress={() => setActiveTypeFilter(active ? null : type)}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>

          {renderPokemonList(filteredList, `No Pokemon match this filter`)}

          <PokemonDetailModal
            pokemon={selectedPokemon}
            visible={selectedPokemon !== null}
            onClose={() => setSelectedPokemon(null)}
            isFavorite={selectedPokemon ? favoriteIds.has(selectedPokemon.id) : false}
            onToggleFavorite={toggleFavorite}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    )
  }

  // ---------- HOME SCREEN ----------
  // selectedGeneration is null, so show either search results, the
  // favorites list, or the 3 generation boxes.
  const searchResults = isSearching
    ? pokemonList.filter((p) => p.name.toLowerCase().includes(searchText.trim().toLowerCase()))
    : []
  const favoritesList = pokemonList.filter((p) => favoriteIds.has(p.id))

  let homeContent
  if (isSearching) {
    homeContent = renderPokemonList(searchResults, `No Pokemon match "${searchText}"`)
  } else if (showFavoritesOnly) {
    homeContent = renderPokemonList(
      favoritesList,
      'No favorites yet -- tap the star on any Pokemon to catch it.',
    )
  } else {
    homeContent = (
      <FlatList
        data={GENERATIONS}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => (
          <GenerationCard
            generationNumber={item.number}
            regionName={item.region}
            count={countForGeneration(item.number)}
            accentColor={item.accentColor}
            onPress={() => openGeneration(item.number)}
          />
        )}
        contentContainerStyle={styles.list}
      />
    )
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="dark-content" />

        <Text style={styles.title}>Legendary Pokedex</Text>
        <Text style={styles.subtitle}>
          Generations I - III &middot; {pokemonList.length} Legendary Pokemon
        </Text>

        <SearchBar value={searchText} onChangeText={setSearchText} />

        {!isSearching && (
          <TouchableOpacity
            style={[styles.favoritesToggle, showFavoritesOnly && styles.favoritesToggleActive]}
            onPress={() => setShowFavoritesOnly((current) => !current)}
          >
            <Text
              style={[
                styles.favoritesToggleText,
                showFavoritesOnly && styles.favoritesToggleTextActive,
              ]}
            >
              {'\u2605'} {showFavoritesOnly ? 'Showing favorites' : `Favorites (${favoriteIds.size})`}
            </Text>
          </TouchableOpacity>
        )}

        {homeContent}

        <PokemonDetailModal
          pokemon={selectedPokemon}
          visible={selectedPokemon !== null}
          onClose={() => setSelectedPokemon(null)}
          isFavorite={selectedPokemon ? favoriteIds.has(selectedPokemon.id) : false}
          onToggleFavorite={toggleFavorite}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

// Same helper as in GenerationCard.js -- converts 1/2/3 to I/II/III.
function toRoman(num) {
  const romanNumerals = { 1: 'I', 2: 'II', 3: 'III' }
  return romanNumerals[num] || num.toString()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fb',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
    color: '#222222',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888888',
    marginBottom: 8,
  },
  list: {
    paddingBottom: 24,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999999',
    marginTop: 24,
    marginHorizontal: 32,
    fontSize: 14,
    lineHeight: 20,
  },
  backButton: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#5b7fdb',
    fontWeight: '600',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  chip: {
    borderWidth: 1.5,
    borderColor: '#e0e2ec',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#888888',
  },
  chipTextActive: {
    color: '#ffffff',
  },
  favoritesToggle: {
    alignSelf: 'center',
    borderWidth: 1.5,
    borderColor: '#f0d9a8',
    backgroundColor: '#fdf6e8',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginBottom: 8,
  },
  favoritesToggleActive: {
    backgroundColor: '#f5a623',
    borderColor: '#f5a623',
  },
  favoritesToggleText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#c98a1c',
  },
  favoritesToggleTextActive: {
    color: '#ffffff',
  },
})
