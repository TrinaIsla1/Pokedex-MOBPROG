// components/PokemonDetailModal.js
//
// Slides up when a PokemonCard is tapped. Laid out like an actual
// trading card -- colored frame, name + total-power badge up top,
// a big framed art window, an italic flavor-text strip, stat rows
// styled like a card's attack list, and a footer line with the dex
// number/height/weight. Has its own favorite (star) toggle so you
// don't have to close the modal to catch/un-catch a Pokemon.
//
// This component owns no state of its own -- "which Pokemon is open"
// and "is it favorited" both live in App.js and are passed down, same
// pattern as the rest of the app.

import { Image } from 'expo-image'
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getPokemonImage } from '../data/imageMap'
import { totalStats } from '../data/pokemonData'
import { getTypeColor, splitTypes } from '../data/typeColors'
import StatBar from './StatBar'
import TypeBadge from './TypeBadge'

export default function PokemonDetailModal({
  pokemon,
  visible,
  onClose,
  isFavorite,
  onToggleFavorite,
}) {
  // While the modal is closing, `pokemon` can briefly be null -- guard
  // against rendering with nothing to show.
  if (!pokemon) return null

  const imageSource = getPokemonImage(pokemon.image)
  const frameColor = getTypeColor(splitTypes(pokemon.type)[0])

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        bounces={false}
      >
        <TouchableOpacity style={styles.closeButton} onPress={onClose} hitSlop={10}>
          <Text style={styles.closeButtonText}>{'\u2715'}  Close</Text>
        </TouchableOpacity>

        {/* --- The "trading card" itself --- */}
        <View style={[styles.card, { borderColor: frameColor }]}>
          {/* Card header: name, dex number, total-power badge (the
              trading-card equivalent of the "HP 120" in the corner) */}
          <View style={[styles.cardHeader, { backgroundColor: `${frameColor}1a` }]}>
            <View style={styles.cardHeaderText}>
              <Text style={styles.dexNumber}>#{String(pokemon.id).padStart(3, '0')}</Text>
              <Text style={styles.name} numberOfLines={1}>
                {pokemon.name}
              </Text>
            </View>

            <View style={styles.headerButtons}>
              <TouchableOpacity
                style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
                onPress={() => onToggleFavorite(pokemon.id)}
                hitSlop={8}
              >
                <Text style={[styles.favoriteButtonText, isFavorite && styles.favoriteButtonTextActive]}>
                  {isFavorite ? '\u2605' : '\u2606'}
                </Text>
              </TouchableOpacity>
              <View style={[styles.powerBadge, { backgroundColor: frameColor }]}>
                <Text style={styles.powerBadgeValue}>{totalStats(pokemon.stats)}</Text>
                <Text style={styles.powerBadgeLabel}>POWER</Text>
              </View>
            </View>
          </View>

          {/* Framed artwork window */}
          <View style={[styles.artFrame, { borderColor: frameColor }]}>
            {imageSource ? (
              <Image source={imageSource} style={styles.image} contentFit="contain" />
            ) : (
              <View style={[styles.image, styles.placeholder]}>
                <Text style={styles.placeholderText}>?</Text>
              </View>
            )}
          </View>

          <View style={styles.typesRow}>
            <TypeBadge type={pokemon.type} size="large" />
            <Text style={styles.category}>{pokemon.category}</Text>
          </View>

          {/* Flavor text, like the italic rules-text strip on a real card */}
          <View style={[styles.flavorBox, { borderColor: `${frameColor}55` }]}>
            <Text style={styles.description}>{pokemon.description}</Text>
          </View>

          {/* Stat rows, styled like a card's list of attacks */}
          <View style={styles.statsBlock}>
            <StatBar label="HP" value={pokemon.stats.hp} />
            <StatBar label="Attack" value={pokemon.stats.attack} />
            <StatBar label="Defense" value={pokemon.stats.defense} />
            <StatBar label="Sp. Atk" value={pokemon.stats.spAtk} />
            <StatBar label="Sp. Def" value={pokemon.stats.spDef} />
            <StatBar label="Speed" value={pokemon.stats.speed} />
          </View>

          <View style={styles.abilitiesBlock}>
            {pokemon.abilities.map((ability) => (
              <View key={ability} style={styles.abilityChip}>
                <Text style={styles.abilityText}>{ability}</Text>
              </View>
            ))}
            {pokemon.hiddenAbility && (
              <View style={[styles.abilityChip, styles.hiddenAbilityChip]}>
                <Text style={[styles.abilityText, styles.hiddenAbilityText]}>
                  {pokemon.hiddenAbility} (Hidden)
                </Text>
              </View>
            )}
          </View>

          {/* Card footer -- the small print along the bottom edge of a
              real trading card */}
          <View style={[styles.cardFooter, { borderTopColor: `${frameColor}55` }]}>
            <Text style={styles.footerText}>
              No. {String(pokemon.id).padStart(3, '0')} &middot; Gen {pokemon.generation}
            </Text>
            <Text style={styles.footerText}>
              HT {pokemon.height.toFixed(1)}m &middot; WT {pokemon.weight.toFixed(1)}kg
            </Text>
          </View>
        </View>
      </ScrollView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#eceef5',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginLeft: 4,
  },
  closeButtonText: {
    color: '#5b7fdb',
    fontSize: 15,
    fontWeight: '700',
  },

  // The card itself -- a thick colored frame around a white panel,
  // like a physical trading card viewed straight-on.
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#ffffff',
    borderRadius: 22,
    borderWidth: 3,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
  },
  cardHeaderText: {
    flexShrink: 1,
    paddingRight: 8,
  },
  dexNumber: {
    fontSize: 11,
    fontWeight: '700',
    color: '#999999',
    letterSpacing: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222222',
    marginTop: 1,
  },
  headerButtons: {
    alignItems: 'flex-end',
    gap: 6,
  },
  favoriteButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2fa',
  },
  favoriteButtonActive: {
    backgroundColor: '#fdf1da',
  },
  favoriteButtonText: {
    fontSize: 16,
    color: '#c7cadb',
  },
  favoriteButtonTextActive: {
    color: '#f5a623',
  },
  powerBadge: {
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 4,
    alignItems: 'center',
  },
  powerBadgeValue: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 16,
  },
  powerBadgeLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Framed art window -- a bordered box that echoes the outer card
  // frame, like the picture window on a real trading card.
  artFrame: {
    marginHorizontal: 16,
    borderWidth: 2,
    borderRadius: 16,
    backgroundColor: '#f7f8fc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  image: {
    width: 170,
    height: 170,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 48,
    color: '#c7cadb',
    fontWeight: 'bold',
  },

  typesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 14,
  },
  category: {
    fontSize: 12,
    color: '#999999',
    fontStyle: 'italic',
  },

  // Flavor-text strip -- italic body copy in a thin bordered box,
  // the way rules/flavor text sits on a real card.
  flavorBox: {
    marginHorizontal: 16,
    marginTop: 14,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
    color: '#555555',
    fontStyle: 'italic',
  },

  statsBlock: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  abilitiesBlock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  abilityChip: {
    backgroundColor: '#f0f2fa',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  abilityText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5b7fdb',
  },
  hiddenAbilityChip: {
    backgroundColor: '#fdf3e2',
  },
  hiddenAbilityText: {
    color: '#c98a1c',
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
    paddingTop: 10,
    paddingBottom: 14,
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 10.5,
    color: '#aaaaaa',
    fontWeight: '600',
  },
})
