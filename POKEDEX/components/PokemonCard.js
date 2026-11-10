// One Pokemon as a tinted, rounded grid card with a glow behind the artwork.
import { Pressable, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { useTheme } from '../context/ThemeContext'
import { getTypeColor } from '../data/typeColors'
import { formatNumber } from '../data/formatNumber'
import TypeBadge from './TypeBadge'
import HeartButton from './HeartButton'

export default function PokemonCard({ pokemon, onPress }) {
  const { colors, isDark } = useTheme()
  const mythic = pokemon.rarity === 'Mythical'
  const GOLD = '#D4AF37'
  const tint = mythic ? GOLD : getTypeColor(pokemon.types[0])

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flex: 1,
        transform: [{ scale: pressed ? 0.97 : 1 }],
      })}
    >
      <View
        style={{
          backgroundColor: mythic ? '#0B0B10' : tint + (isDark ? '30' : '22'),
          borderColor: mythic ? GOLD : tint + '55',
          borderWidth: mythic ? 1.5 : 1,
          borderRadius: 26,
          flex: 1,
          padding: 12,
          overflow: 'hidden',
          shadowColor: tint,
          shadowOpacity: isDark ? 0.25 : 0.3,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 4,
        }}
      >
        <Text
          style={{
            position: 'absolute',
            right: -4,
            bottom: -14,
            fontSize: 64,
            fontWeight: '900',
            color: tint,
            opacity: 0.16,
          }}
        >
          {formatNumber(pokemon.id)}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text
              style={{
                color: mythic ? '#B8A468' : colors.sub,
                fontWeight: '800',
                fontSize: 12,
              }}
            >
              #{formatNumber(pokemon.id)}
            </Text>
            {mythic ? (
              <View
                style={{
                  borderRadius: 99,
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  backgroundColor: GOLD,
                }}
              >
                <Text
                  style={{ color: '#0B0B10', fontSize: 9.5, fontWeight: '900' }}
                >
                  ✦ MYTHICAL
                </Text>
              </View>
            ) : null}
          </View>
          <HeartButton id={pokemon.id} size={20} />
        </View>
        <View style={{ alignItems: 'center', marginVertical: 6 }}>
          <View
            style={{
              position: 'absolute',
              top: 12,
              width: 92,
              height: 92,
              borderRadius: 46,
              backgroundColor: tint + '44',
            }}
          />
          <Image
            source={{ uri: pokemon.image }}
            style={{ width: 120, height: 120 }}
            contentFit="contain"
            transition={250}
          />
        </View>
        <Text
          style={{
            color: mythic ? '#F5D77A' : colors.text,
            fontSize: 17,
            fontWeight: '800',
          }}
          numberOfLines={1}
        >
          {pokemon.name}
        </Text>
        <Text
          style={{
            color: mythic ? '#B8A468' : colors.sub,
            fontSize: 11.5,
            marginBottom: 8,
          }}
          numberOfLines={1}
        >
          {pokemon.category}
        </Text>
        <View style={{ flexDirection: 'row', gap: 5, minHeight: 22 }}>
          {pokemon.types.map((t) => (
            <TypeBadge key={t} type={t} />
          ))}
        </View>
      </View>
    </Pressable>
  )
}
