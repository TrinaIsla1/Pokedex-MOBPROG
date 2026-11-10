// The "likes": a saved list of Pokedex numbers, shared by every screen.
import { createContext, useCallback, useContext, useMemo } from 'react'
import usePersistentState from '../hooks/usePersistentState'

const FavoritesContext = createContext({ ids: [], isLiked: () => false, toggle() {}, clear() {} })

export function FavoritesProvider({ children }) {
  const [ids, setIds] = usePersistentState('liked-ids', [])
  const toggle = useCallback((id) => setIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id])), [setIds])
  const clear = useCallback(() => setIds([]), [setIds])
  const value = useMemo(() => ({ ids, isLiked: (id) => ids.includes(id), toggle, clear }), [ids, toggle, clear])
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export const useFavorites = () => useContext(FavoritesContext)
