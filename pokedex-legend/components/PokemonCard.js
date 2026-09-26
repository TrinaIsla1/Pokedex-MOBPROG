// components/PokemonCard.js
//
// This component renders ONE Pokemon as a card in a list.
// It receives a "pokemon" object as a prop (passed in from App.js),
// plus whether it's currently a favorite and two callbacks: one for
// tapping the card (opens the detail modal) and one for tapping the
// star (toggles favorite without opening the modal).
//
// Still a "dumb" presentational component -- no state of its own,
// no hooks. It just takes data in, renders UI out, and reports taps
// back up to App.js, same pattern as GenerationCard.

import { Image } from 'expo-image'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { getPokemonImage } from '../data/imageMap'
import { totalStats } from '../data/pokemonData'
import { getTypeColor, splitTypes } from '../data/typeColors'
import TypeBadge from './TypeBadge'

// Used to scale the little "power" bar at the bottom of the card.
// The highest total in this dataset is Mewtwo/Rayquaza-tier (~680),
// so 700 gives every Pokemon a bar that's never quite maxed out.
const MAX_TOTAL_STATS = 700

export default function PokemonCard({ pokemon, isFavorite, onPress, onToggleFavorite }) {
  const imageSource = getPokemonImage(pokemon.image)
  const accentColor = getTypeColor(splitTypes(pokemon.type)[0])
  const powerPct = Math.round((totalStats(pokemon.stats) / MAX_TOTAL_STATS) * 100)

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onPress(pokemon)}
    >
      <View style={[styles.accentStripe, { backgroundColor: accentColor }]} />

      {/* --- Image section --- */}
      <View style={styles.imageWrap}>
        {imageSource ? (
          <Image source={imageSource} style={styles.image} contentFit="contain" transition={150} />
        ) : (
          <View style={[styles.image, styles.placeholder]}>
            <Text style={styles.placeholderText}>?</Text>
          </View>
        )}
      </View>

      {/* --- Text info section --- */}
      <View style={styles.info}>
        <View style={styles.headerRow}>
          <Text style={styles.name} numberOfLines={1}>
            {pokemon.name}
          </Text>
          <Text style={styles.dexNumber}>#{String(pokemon.id).padStart(3, '0')}</Text>
        </View>

        <TypeBadge type={pokemon.type} />

        <Text style={styles.description} numberOfLines={2}>
          {pokemon.description}
        </Text>

        <View style={styles.powerTrack}>
          <View style={[styles.powerFill, { width: `${powerPct}%`, backgroundColor: accentColor }]} />
        </View>
      </View>

      {/* --- Favorite toggle --- */}
      <Pressable
        style={styles.favoriteButton}
        hitSlop={10}
        onPress={(e) => {
          e.stopPropagation()
          onToggleFavorite(pokemon.id)
        }}
      >
        <Text style={[styles.favoriteIcon, isFavorite && styles.favoriteIconActive]}>
          {isFavorite ? '\u2605' : '\u2606'}
        </Text>
      </Pressable>
    </Pressable>
  )
}

// All styling lives here since React Native doesn't support .css files.
// Think of this as the equivalent of a CSS class list, but written in JS.
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 7,
    overflow: 'hidden',
    // simple shadow for a bit of depth (iOS)
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    // shadow equivalent for Android
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.85,
  },
  accentStripe: {
    width: 5,
  },
  imageWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 68,
    height: 68,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  placeholderText: {
    fontSize: 26,
    color: '#bbbbbb',
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 8,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222222',
    flexShrink: 1,
  },
  dexNumber: {
    fontSize: 12,
    color: '#bbbbbb',
    fontWeight: '600',
    marginLeft: 6,
  },
  description: {
    fontSize: 12.5,
    color: '#666666',
    marginTop: 6,
    lineHeight: 17,
  },
  powerTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#eef0f5',
    marginTop: 8,
    overflow: 'hidden',
  },
  powerFill: {
    height: '100%',
    borderRadius: 2,
  },
  favoriteButton: {
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 22,
    color: '#d9dce6',
  },
  favoriteIconActive: {
    color: '#f5a623',
  },
})
