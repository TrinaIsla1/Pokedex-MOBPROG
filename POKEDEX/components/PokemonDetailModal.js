// Full details popup, drawn as a Pokemon trading card (black frame, name pill, art window, bottom bars).
// The round ‹ › buttons on the left and right edges of the card flip the card window between pages: Card, Stats, Evolution, Forms, Where to find.
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import { Image } from 'expo-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useEncounters, useEvolutions, useForms } from '../hooks/usePokemon'
import { getTypeColor, readableText } from '../data/typeColors'
import { formatNumber } from '../data/formatNumber'
import TypeBadge from './TypeBadge'
import HeartButton from './HeartButton'

const PAGES = ['Card', 'Stats', 'Evolution', 'Forms', 'Where to find']
const GOLD = '#D4AF37'
const CARD_RATIO = 0.716 // width / height of a real card
const TYPE_ICONS = {
  Normal: '⭐',
  Fire: '🔥',
  Water: '💧',
  Electric: '⚡',
  Grass: '🌿',
  Ice: '❄️',
  Fighting: '🥊',
  Poison: '☠️',
  Ground: '⛰️',
  Flying: '🕊️',
  Psychic: '🔮',
  Bug: '🐛',
  Rock: '🪨',
  Ghost: '👻',
  Dragon: '🐉',
  Dark: '🌑',
  Steel: '⚙️',
  Fairy: '✨',
}

// Round button that sits on the card's left / right edge.
function SideArrow({ dir, onPress, disabled, color, ring, style }) {
  const left = dir === 'left'
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={8}
      accessibilityLabel={left ? 'Previous page' : 'Next page'}
      style={[
        {
          position: 'absolute',
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: '#fff',
          borderWidth: 2,
          borderColor: ring,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.35 : 1,
          elevation: 16,
          zIndex: 5,
          shadowColor: '#000',
          shadowOpacity: 0.25,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 3 },
        },
        style,
      ]}
    >
      <View
        style={{
          width: 10,
          height: 10,
          marginLeft: left ? 3 : -3,
          borderColor: color,
          borderLeftWidth: left ? 3 : 0,
          borderRightWidth: left ? 0 : 3,
          borderBottomWidth: 3,
          transform: [{ rotate: left ? '45deg' : '-45deg' }],
        }}
      />
    </Pressable>
  )
}

// Darken a #rrggbb color: amt 1 = unchanged, 0 = black.
const shade = (hex, amt) => {
  const n = parseInt(hex.slice(1), 16)
  const c = (v) =>
    Math.round(v * amt)
      .toString(16)
      .padStart(2, '0')
  return `#${c(n >> 16)}${c((n >> 8) & 255)}${c(n & 255)}`
}

// Label on top, value underneath, so long values (like game lists) wrap across the full width.
function Row({ label, value, colors }) {
  return (
    <View
      style={{
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <Text style={{ color: colors.sub, fontSize: 12 }}>{label}</Text>
      <Text
        style={{
          color: colors.text,
          fontWeight: '700',
          fontSize: 14,
          marginTop: 2,
        }}
      >
        {value}
      </Text>
    </View>
  )
}

export default function PokemonDetailModal({ pokemon, onClose }) {
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()
  const { width: sw, height: sh } = useWindowDimensions()
  const enc = useEncounters(pokemon ? pokemon.id : null)
  const evo = useEvolutions(pokemon ? pokemon.id : null)
  const forms = useForms(pokemon ? pokemon.id : null)
  const [page, setPage] = useState(0)
  useEffect(() => setPage(0), [pokemon?.id])
  if (!pokemon) return null

  const mythic = pokemon.rarity === 'Mythical'
  const tint = mythic ? GOLD : getTypeColor(pokemon.types[0])
  const hp = pokemon.stats[0]?.value
  // Card colors follow the Pokemon's type(s): frame = first type, edge = second type (if any). Mythical stays black and gold.
  const second = pokemon.types[1] ? getTypeColor(pokemon.types[1]) : null
  const frame = mythic ? '#0B0B10' : tint
  const panel = mythic ? '#1B1D24' : shade(tint, 0.38)
  const edge = mythic ? GOLD : second || shade(tint, 0.7)
  const ink = mythic ? GOLD : readableText(tint)
  const arrowInk = mythic ? '#0B0B10' : shade(tint, 0.5)
  // Text inside the (light) card window always uses dark ink, whatever the app theme is.
  const win = {
    text: '#14151A',
    sub: '#555A6B',
    border: '#D5D8E2',
    input: '#E8EAF1',
    accent: colors.accent,
  }

  // Size the card so card + arrow bar fit on any screen.
  const arrowsH = 52 // page title + dots under the card
  const maxH = sh - insets.top - insets.bottom - 56 - arrowsH
  const cardW = Math.max(240, Math.min(sw - 44, maxH * CARD_RATIO, 440))
  const cardH = cardW / CARD_RATIO
  const u = cardW / 100 // one "unit" = 1% of the card width, so everything scales with the card
  const fs = (units, min) => Math.max(min, units * u) // font size: scales with the card but never below a readable minimum

  const barCell = (label, value, first) => (
    <View
      key={label}
      style={{
        flex: 1,
        paddingHorizontal: 2 * u,
        borderLeftWidth: first ? 0 : 1,
        borderLeftColor: shade(tint, 0.6),
        justifyContent: 'center',
      }}
    >
      <Text
        style={{ color: '#D3D7E4', fontSize: fs(3.2, 11), fontStyle: 'italic' }}
      >
        {label}
      </Text>
      <Text
        numberOfLines={1}
        style={{ color: '#fff', fontSize: fs(3.8, 13), fontWeight: '800' }}
      >
        {value}
      </Text>
    </View>
  )

  return (
    <Modal visible animationType="slide" onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.bg,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <View
          style={{
            height: 56,
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}
        >
          <Pressable
            onPress={onClose}
            hitSlop={12}
            style={{ alignSelf: 'flex-start' }}
          >
            <Text
              style={{ color: colors.text, fontSize: 26, fontWeight: '300' }}
            >
              ✕
            </Text>
          </Pressable>
        </View>

        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          {/* ---------- THE CARD (full-width wrapper so the side arrows stay tappable) ---------- */}
          <View
            style={{
              width: sw,
              height: cardH,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                width: cardW,
                height: cardH,
                backgroundColor: frame,
                borderRadius: 5 * u,
                padding: 2.5 * u,
                borderWidth: mythic ? 2 : 1.4 * u,
                borderColor: edge,
                shadowColor: tint,
                shadowOpacity: 0.45,
                shadowRadius: 16,
                shadowOffset: { width: 0, height: 8 },
                elevation: 12,
              }}
            >
              {/* Glossy shine + thin inner outline */}
              <View
                pointerEvents="none"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: 5 * u,
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    left: cardW * 0.05,
                    top: -cardH * 0.3,
                    width: cardW * 0.45,
                    height: cardH * 1.6,
                    backgroundColor: '#FFFFFF14',
                    transform: [{ rotate: '22deg' }],
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    left: cardW * 0.62,
                    top: -cardH * 0.3,
                    width: cardW * 0.12,
                    height: cardH * 1.6,
                    backgroundColor: '#FFFFFF10',
                    transform: [{ rotate: '22deg' }],
                  }}
                />
              </View>
              <View
                pointerEvents="none"
                style={{
                  position: 'absolute',
                  left: 0.7 * u,
                  top: 0.7 * u,
                  right: 0.7 * u,
                  bottom: 0.7 * u,
                  borderRadius: 4.3 * u,
                  borderWidth: 1,
                  borderColor: '#FFFFFF38',
                }}
              />

              {/* Top row: rarity tag, name pill (name + HP), type icon */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 9.5 * u,
                }}
              >
                <Text
                  style={{
                    color: ink,
                    fontSize: fs(3.4, 11),
                    fontWeight: '900',
                    fontStyle: 'italic',
                    marginRight: 1.5 * u,
                  }}
                >
                  {mythic ? '✦ MYTHICAL' : '★ LEGENDARY'}
                </Text>
                <View
                  style={{
                    flex: 1,
                    height: 8 * u,
                    borderRadius: 99,
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 3 * u,
                    shadowColor: '#000',
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    shadowOffset: { width: 0, height: 2 },
                    elevation: 3,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.6}
                    style={{
                      flex: 1,
                      color: '#14151A',
                      fontSize: fs(5.2, 17),
                      fontWeight: '900',
                    }}
                  >
                    {pokemon.name}
                  </Text>
                  <Text
                    style={{
                      color: '#14151A',
                      fontSize: fs(3.2, 11),
                      fontWeight: '700',
                      marginLeft: 2 * u,
                    }}
                  >
                    HP{' '}
                    <Text style={{ fontSize: fs(4.8, 16), fontWeight: '900' }}>
                      {hp}
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    width: 8.5 * u,
                    height: 8.5 * u,
                    borderRadius: 4.5 * u,
                    backgroundColor: shade(tint, 0.55),
                    borderWidth: 0.7 * u,
                    borderColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 1.5 * u,
                  }}
                >
                  <Text style={{ fontSize: fs(4.4, 14) }}>
                    {TYPE_ICONS[pokemon.types[0]] || '⭐'}
                  </Text>
                </View>
              </View>

              {/* Art window: changes with the page */}
              <View
                style={{
                  flex: 1,
                  marginTop: 2 * u,
                  borderRadius: 2 * u,
                  backgroundColor: '#fff',
                  overflow: 'hidden',
                  borderWidth: 1.2 * u,
                  borderColor: '#FFFFFFCC',
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    backgroundColor: tint + '3A',
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    right: 2 * u,
                    top: 1.5 * u,
                    zIndex: 2,
                  }}
                >
                  <HeartButton id={pokemon.id} size={6 * u} />
                </View>

                {page === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                      <View
                        key={i}
                        pointerEvents="none"
                        style={{
                          position: 'absolute',
                          left: -30 * u,
                          width: 160 * u,
                          top: i * 17 * u - 14 * u,
                          height: 6 * u,
                          backgroundColor: i % 2 ? '#FFFFFF30' : tint + '22',
                          transform: [{ rotate: '-24deg' }],
                        }}
                      />
                    ))}
                    <Text
                      style={{
                        position: 'absolute',
                        top: 1 * u,
                        left: 3 * u,
                        fontSize: 22 * u,
                        opacity: 0.16,
                      }}
                    >
                      {TYPE_ICONS[pokemon.types[0]] || '⭐'}
                    </Text>
                    <Text
                      style={{
                        position: 'absolute',
                        bottom: -2 * u,
                        right: 2 * u,
                        fontSize: 30 * u,
                        fontWeight: '900',
                        color: tint,
                        opacity: 0.18,
                      }}
                    >
                      {formatNumber(pokemon.id)}
                    </Text>
                    <View
                      style={{
                        position: 'absolute',
                        width: 62 * u,
                        height: 62 * u,
                        borderRadius: 31 * u,
                        backgroundColor: tint + '55',
                      }}
                    />
                    <Image
                      source={{ uri: pokemon.image }}
                      style={{ width: '94%', aspectRatio: 1 }}
                      contentFit="contain"
                      transition={300}
                    />
                    <View
                      pointerEvents="none"
                      style={{
                        position: 'absolute',
                        bottom: 2 * u,
                        left: 2 * u,
                        flexDirection: 'row',
                        gap: 1.5 * u,
                      }}
                    >
                      {pokemon.types.map((t) => (
                        <TypeBadge key={t} type={t} />
                      ))}
                    </View>
                  </View>
                ) : (
                  <ScrollView
                    contentContainerStyle={{
                      padding: 3.5 * u,
                      paddingTop: 9 * u,
                    }}
                    showsVerticalScrollIndicator={false}
                  >
                    {page === 1 ? (
                      <>
                        {pokemon.stats.map((s) => (
                          <View
                            key={s.label}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginVertical: 5,
                            }}
                          >
                            <Text
                              style={{
                                width: 58,
                                color: win.sub,
                                fontSize: 13,
                              }}
                            >
                              {s.label}
                            </Text>
                            <Text
                              style={{
                                width: 34,
                                color: win.text,
                                fontWeight: '800',
                              }}
                            >
                              {s.value}
                            </Text>
                            <View
                              style={{
                                flex: 1,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: win.input,
                              }}
                            >
                              <View
                                style={{
                                  width: `${Math.min(100, (s.value / 200) * 100)}%`,
                                  height: 8,
                                  borderRadius: 4,
                                  backgroundColor: tint,
                                }}
                              />
                            </View>
                          </View>
                        ))}
                        <View style={{ marginTop: 8 }}>
                          <Row
                            label="Abilities"
                            value={pokemon.abilities.join(', ')}
                            colors={win}
                          />
                        </View>
                      </>
                    ) : null}

                    {page === 2 ? (
                      <View>
                        {evo.loading ? (
                          <ActivityIndicator color={colors.accent} />
                        ) : null}
                        {!evo.loading && evo.error ? (
                          <Text style={{ color: win.sub }}>
                            Couldn't load evolutions.
                          </Text>
                        ) : null}
                        {!evo.loading &&
                        !evo.error &&
                        evo.stages.length <= 1 ? (
                          <Text style={{ color: win.sub, textAlign: 'center' }}>
                            {pokemon.name} does not evolve.
                          </Text>
                        ) : null}
                        {!evo.loading && !evo.error && evo.stages.length > 1 ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {evo.stages.map((stage, si) => (
                              <View
                                key={si}
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}
                              >
                                {si > 0 ? (
                                  <Text
                                    style={{
                                      color: win.sub,
                                      fontSize: 20,
                                      marginHorizontal: 2,
                                    }}
                                  >
                                    →
                                  </Text>
                                ) : null}
                                <View style={{ gap: 6 }}>
                                  {stage.map((e) => (
                                    <View
                                      key={e.id}
                                      style={{ alignItems: 'center' }}
                                    >
                                      <Image
                                        source={{ uri: e.image }}
                                        style={{
                                          width: 20 * u,
                                          height: 20 * u,
                                        }}
                                        contentFit="contain"
                                      />
                                      <Text
                                        style={{
                                          color: win.text,
                                          fontWeight: '700',
                                          fontSize: 12,
                                        }}
                                      >
                                        {e.name}
                                      </Text>
                                      {e.how ? (
                                        <Text
                                          style={{
                                            color: win.sub,
                                            fontSize: 11,
                                          }}
                                        >
                                          {e.how}
                                        </Text>
                                      ) : null}
                                    </View>
                                  ))}
                                </View>
                              </View>
                            ))}
                          </View>
                        ) : null}
                      </View>
                    ) : null}

                    {page === 3 ? (
                      <View>
                        {forms.loading ? (
                          <ActivityIndicator color={colors.accent} />
                        ) : null}
                        {!forms.loading && forms.error ? (
                          <Text style={{ color: win.sub }}>
                            Couldn't load forms.
                          </Text>
                        ) : null}
                        {!forms.loading &&
                        !forms.error &&
                        forms.forms.length === 0 ? (
                          <Text style={{ color: win.sub, textAlign: 'center' }}>
                            {pokemon.name} has no alternate forms.
                          </Text>
                        ) : null}
                        <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: 8,
                          }}
                        >
                          {forms.forms.map((f) => (
                            <View
                              key={f.key}
                              style={{
                                width: '47%',
                                alignItems: 'center',
                                backgroundColor: '#ffffffAA',
                                borderRadius: 14,
                                paddingVertical: 8,
                                paddingHorizontal: 6,
                              }}
                            >
                              {f.image ? (
                                <Image
                                  source={{ uri: f.image }}
                                  style={{ width: 22 * u, height: 22 * u }}
                                  contentFit="contain"
                                />
                              ) : (
                                <Text style={{ fontSize: 30 }}>❔</Text>
                              )}
                              <Text
                                style={{
                                  color: win.text,
                                  fontWeight: '700',
                                  fontSize: 12,
                                  textAlign: 'center',
                                  marginTop: 2,
                                }}
                              >
                                {f.name}
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  gap: 4,
                                  marginTop: 4,
                                  flexWrap: 'wrap',
                                  justifyContent: 'center',
                                }}
                              >
                                {f.types.map((t) => (
                                  <TypeBadge key={t} type={t} />
                                ))}
                              </View>
                            </View>
                          ))}
                        </View>
                      </View>
                    ) : null}

                    {page === 4 ? (
                      <View>
                        {enc.loading ? (
                          <ActivityIndicator color={colors.accent} />
                        ) : null}
                        {!enc.loading && enc.error ? (
                          <Text style={{ color: win.sub }}>
                            Couldn't load locations.
                          </Text>
                        ) : null}
                        {!enc.loading &&
                        !enc.error &&
                        enc.items.length === 0 ? (
                          <Text style={{ color: win.sub }}>
                            No fixed wild location: it roams, or is a special
                            event Pokemon.
                          </Text>
                        ) : null}
                        {enc.items.slice(0, 8).map((e) => (
                          <Row
                            key={e.area}
                            label={e.area}
                            value={e.games.join(', ')}
                            colors={win}
                          />
                        ))}
                      </View>
                    ) : null}
                  </ScrollView>
                )}
              </View>

              {/* Bottom bar (like weakness / resistance / retreat) */}
              <View
                style={{
                  flexDirection: 'row',
                  height: 10.5 * u,
                  marginTop: 2 * u,
                  borderRadius: 1.5 * u,
                  backgroundColor: panel,
                  borderTopWidth: 1,
                  borderTopColor: '#FFFFFF2E',
                }}
              >
                {barCell('region', pokemon.region, true)}
                {barCell('height', `${pokemon.height} m`)}
                {barCell('weight', `${pokemon.weight} kg`)}
              </View>

              {/* Footer text (like the V rule box) */}
              <View
                style={{
                  height: 18 * u,
                  marginTop: 1.5 * u,
                  justifyContent: 'center',
                  paddingHorizontal: 2.5 * u,
                  borderRadius: 1.5 * u,
                  backgroundColor: panel,
                  borderTopWidth: 1,
                  borderTopColor: '#FFFFFF2E',
                }}
              >
                <Text
                  numberOfLines={4}
                  style={{
                    color: '#FFFFFF',
                    fontSize: fs(3.4, 11.5),
                    lineHeight: fs(3.4, 11.5) * 1.3,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: '900',
                      fontStyle: 'italic',
                      color: mythic ? GOLD : '#fff',
                    }}
                  >
                    {pokemon.category}.{' '}
                  </Text>
                  {pokemon.description}
                </Text>
              </View>
            </View>

            <SideArrow
              dir="left"
              onPress={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              color={arrowInk}
              ring={edge}
              style={{
                left: Math.max(2, (sw - cardW) / 2 - 22),
                top: cardH / 2 - 18,
              }}
            />
            <SideArrow
              dir="right"
              onPress={() => setPage((p) => Math.min(PAGES.length - 1, p + 1))}
              disabled={page === PAGES.length - 1}
              color={arrowInk}
              ring={edge}
              style={{
                right: Math.max(2, (sw - cardW) / 2 - 22),
                top: cardH / 2 - 18,
              }}
            />
          </View>

          {/* ---------- PAGE TITLE + DOTS ---------- */}
          <View
            style={{
              height: arrowsH,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{ color: colors.text, fontSize: 17, fontWeight: '800' }}
            >
              {PAGES[page]}
            </Text>
            <View style={{ flexDirection: 'row', gap: 6, marginTop: 5 }}>
              {PAGES.map((_, i) => (
                <View
                  key={i}
                  style={{
                    width: i === page ? 18 : 7,
                    height: 7,
                    borderRadius: 4,
                    backgroundColor: i === page ? tint : colors.input,
                  }}
                />
              ))}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}
