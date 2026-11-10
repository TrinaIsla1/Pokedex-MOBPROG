// Schematic region maps with routes. Tap a spot to see its legendary Pokemon and the routes that lead to it.
import { useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { useTheme } from '../context/ThemeContext'
import { REGIONS } from '../data/regions'
import { getTypeColor } from '../data/typeColors'

function MiniRow({ p, onOpen, colors }) {
  const tint = getTypeColor(p.types[0])
  return (
    <Pressable
      onPress={() => onOpen(p)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: tint + '22',
        borderRadius: 16,
        padding: 8,
        marginTop: 8,
      }}
    >
      <Image
        source={{ uri: p.image }}
        style={{ width: 54, height: 54 }}
        contentFit="contain"
      />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={{ color: colors.text, fontWeight: '800', fontSize: 16 }}>
          {p.name}
        </Text>
        <Text style={{ color: colors.sub, fontSize: 12 }}>
          {p.types.join(' / ')} · {p.rarity}
        </Text>
      </View>
      <Text style={{ color: colors.sub, fontSize: 18 }}>›</Text>
    </Pressable>
  )
}

const ROAD = '#C9A66B'
const routeName = (r) => r.name || `${r.path[0]} → ${r.path[r.path.length - 1]}`

export default function RegionsScreen({ pokemon, onOpen }) {
  const { colors } = useTheme()
  const [index, setIndex] = useState(0)
  const [spot, setSpot] = useState(null)
  const [mapSize, setMapSize] = useState(0)
  const region = REGIONS[index]
  const byId = (id) => pokemon.find((p) => p.id === id)
  const here = spot ? spot.pokemon || [] : []
  // Pokemon of this generation that have no fixed spot on the map (roaming, event, or unknown).
  const mapped = new Set(region.spots.flatMap((sp) => sp.pokemon || []))
  const elsewhere = pokemon.filter(
    (p) => p.generation === region.gen && !mapped.has(p.id),
  )

  // Routes: one straight line per pair of neighbouring spots in each route's path.
  const routes = region.routes || []
  const spotByName = Object.fromEntries(region.spots.map((sp) => [sp.name, sp]))
  const segments = routes
    .flatMap((r, ri) =>
      r.path.slice(1).map((to, i) => ({
        key: `${ri}-${i}`,
        route: r,
        first: i === 0,
        a: spotByName[r.path[i]],
        b: spotByName[to],
      })),
    )
    .filter((g) => g.a && g.b)
  const touching = spot ? routes.filter((r) => r.path.includes(spot.name)) : []

  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 30,
          fontWeight: '900',
          marginTop: 8,
        }}
      >
        Regions
      </Text>
      <Text style={{ color: colors.sub, marginBottom: 14 }}>
        Tap a spot to see its routes · ★ spots have legendary Pokémon
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0, marginBottom: 14, marginHorizontal: -20 }}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
      >
        {REGIONS.map((r, i) => (
          <Pressable
            key={r.name}
            onPress={() => {
              setIndex(i)
              setSpot(null)
            }}
            style={{
              paddingHorizontal: 18,
              paddingVertical: 10,
              borderRadius: 14,
              backgroundColor: i === index ? r.color : colors.input,
            }}
          >
            <Text
              style={{
                color: i === index ? '#fff' : colors.text,
                fontWeight: '800',
              }}
            >
              {r.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View
        onLayout={(e) => setMapSize(e.nativeEvent.layout.width)}
        style={{
          aspectRatio: 1,
          backgroundColor: colors.sea,
          borderRadius: 28,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        {region.land.map((b, i) => (
          <View
            key={i}
            style={{
              position: 'absolute',
              left: `${b.l}%`,
              top: `${b.t}%`,
              width: `${b.w}%`,
              height: `${b.h}%`,
              borderRadius: b.r,
              backgroundColor: colors.land,
            }}
          />
        ))}
        {mapSize > 0
          ? segments.map((g) => {
              const lit = touching.includes(g.route)
              const ax = (g.a.x / 100) * mapSize,
                ay = (g.a.y / 100) * mapSize
              const bx = (g.b.x / 100) * mapSize,
                by = (g.b.y / 100) * mapSize
              const len = Math.hypot(bx - ax, by - ay)
              const th = lit ? 5 : 3
              const mx = (ax + bx) / 2,
                my = (ay + by) / 2
              return (
                <View
                  key={g.key}
                  pointerEvents="none"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                  }}
                >
                  <View
                    style={{
                      position: 'absolute',
                      left: mx - len / 2,
                      top: my - th / 2,
                      width: len,
                      height: th,
                      borderRadius: th / 2,
                      backgroundColor: lit ? region.color : ROAD,
                      opacity: lit ? 1 : 0.7,
                      transform: [
                        { rotate: `${Math.atan2(by - ay, bx - ax)}rad` },
                      ],
                    }}
                  />
                  {lit && g.first && g.route.name ? (
                    <Text
                      style={{
                        position: 'absolute',
                        left: mx - 40,
                        top: my - 16,
                        width: 80,
                        textAlign: 'center',
                        fontSize: 9,
                        fontWeight: '800',
                        color: colors.text,
                      }}
                    >
                      {g.route.name}
                    </Text>
                  ) : null}
                </View>
              )
            })
          : null}
        {region.spots.map((s) => {
          const special = (s.pokemon || []).some((id) => byId(id))
          const selected = spot && spot.name === s.name
          const size = special ? 22 : 10
          return (
            <Pressable
              key={s.name}
              onPress={() => setSpot(s)}
              hitSlop={8}
              style={{
                position: 'absolute',
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: size,
                height: size,
                marginLeft: -size / 2,
                marginTop: -size / 2,
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: special ? region.color : colors.sub,
                  borderWidth: selected ? 3 : 1.5,
                  borderColor: selected ? colors.text : colors.card,
                }}
              >
                {special ? (
                  <Text style={{ color: '#fff', fontSize: 11, lineHeight: 14 }}>
                    ★
                  </Text>
                ) : null}
              </View>
              {special || selected ? (
                <Text
                  numberOfLines={1}
                  style={{
                    position: 'absolute',
                    top: size + 1,
                    width: 90,
                    textAlign: 'center',
                    fontSize: 9,
                    fontWeight: '800',
                    color: colors.text,
                  }}
                >
                  {s.name}
                </Text>
              ) : null}
            </Pressable>
          )
        })}
      </View>
      <Text
        style={{
          color: colors.sub,
          fontSize: 11,
          marginTop: 6,
          textAlign: 'center',
        }}
      >
        Schematic map, not to scale · {region.games}
      </Text>

      <View style={{ marginTop: 14 }}>
        <Text style={{ color: colors.text, fontSize: 18, fontWeight: '800' }}>
          {spot ? spot.name : `${region.name} region`}
        </Text>
        {spot && here.length === 0 ? (
          <Text style={{ color: colors.sub, marginTop: 4 }}>
            No legendary Pokémon here. Try a ★ spot.
          </Text>
        ) : null}
        {here.map((id) =>
          byId(id) ? (
            <MiniRow key={id} p={byId(id)} onOpen={onOpen} colors={colors} />
          ) : null,
        )}

        {spot ? (
          <View style={{ marginTop: 16 }}>
            <Text
              style={{ color: colors.text, fontSize: 16, fontWeight: '800' }}
            >
              Routes
            </Text>
            {touching.length === 0 ? (
              <Text style={{ color: colors.sub, marginTop: 4 }}>
                No routes drawn for this spot.
              </Text>
            ) : null}
            {touching.map((r, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                  backgroundColor: colors.input,
                  borderRadius: 14,
                  padding: 10,
                }}
              >
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: region.color,
                    marginRight: 10,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.text, fontWeight: '800' }}>
                    {routeName(r)}
                  </Text>
                  <Text style={{ color: colors.sub, fontSize: 12 }}>
                    {r.path.join(' → ')}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        <Text
          style={{
            color: colors.text,
            fontSize: 16,
            fontWeight: '800',
            marginTop: 20,
          }}
        >
          Roaming, event & elsewhere
        </Text>
        {elsewhere.map((p) => (
          <MiniRow key={p.id} p={p} onOpen={onOpen} colors={colors} />
        ))}
      </View>
    </ScrollView>
  )
}
