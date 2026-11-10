// Light / dark / follow-the-phone theme, saved between launches.
import { createContext, useContext, useMemo } from 'react'
import { useColorScheme } from 'react-native'
import usePersistentState from '../hooks/usePersistentState'

const light = { bg: '#F5F6FA', card: '#FFFFFF', text: '#1B1D2A', sub: '#6B7084', border: '#E4E7F0', input: '#E9ECF4', accent: '#E3350D', sea: '#CFE6F7', land: '#DCEFC8' }
const dark = { bg: '#0D0F15', card: '#181B25', text: '#F2F3F8', sub: '#9AA0B5', border: '#272B39', input: '#1E2230', accent: '#FF5A44', sea: '#10263A', land: '#1F3B2B' }

const ThemeContext = createContext({ mode: 'system', setMode() {}, isDark: false, colors: light })

export function ThemeProvider({ children }) {
  const [mode, setMode] = usePersistentState('theme-mode', 'system') // 'system' | 'light' | 'dark'
  const system = useColorScheme()
  const isDark = mode === 'system' ? system === 'dark' : mode === 'dark'
  const value = useMemo(() => ({ mode, setMode, isDark, colors: isDark ? dark : light }), [mode, setMode, isDark])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
