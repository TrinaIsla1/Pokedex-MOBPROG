// Like useState, but the value is saved to the phone (AsyncStorage) and restored on launch.
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function usePersistentState(key, initial) {
  const [value, setValue] = useState(initial)
  const [ready, setReady] = useState(false)

  // Load the saved value once.
  useEffect(() => {
    AsyncStorage.getItem(key)
      .then((raw) => { if (raw != null) setValue(JSON.parse(raw)) })
      .catch(() => {})
      .finally(() => setReady(true))
  }, [key])

  // Save every change (but only after the first load finished).
  useEffect(() => {
    if (ready) AsyncStorage.setItem(key, JSON.stringify(value)).catch(() => {})
  }, [key, value, ready])

  return [value, setValue, ready]
}
