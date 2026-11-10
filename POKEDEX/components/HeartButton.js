import { Pressable, Text } from 'react-native'
import { useFavorites } from '../context/FavoritesContext'
import { useTheme } from '../context/ThemeContext'

export default function HeartButton({ id, size = 22 }) {
  const { isLiked, toggle } = useFavorites()
  const { colors } = useTheme()
  const liked = isLiked(id)
  return (
    <Pressable onPress={() => toggle(id)} hitSlop={10} accessibilityLabel={liked ? 'Unlike' : 'Like'}>
      <Text style={{ fontSize: size, color: liked ? '#FF3B5C' : colors.sub }}>{liked ? '♥' : '♡'}</Text>
    </Pressable>
  )
}
