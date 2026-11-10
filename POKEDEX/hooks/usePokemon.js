// All API access lives here. Data comes from https://pokeapi.co (no local database, no local images).
import { useCallback, useEffect, useState } from 'react'

const API = 'https://pokeapi.co/api/v2'

// Legendary + Mythical Pokemon of all 9 generations (only the Pokedex numbers are stored locally).
export const LEGENDARY_IDS = [
  144,
  145,
  146,
  150,
  151, // I   Kanto
  243,
  244,
  245,
  249,
  250,
  251, // II  Johto
  377,
  378,
  379,
  380,
  381,
  382,
  383,
  384,
  385,
  386, // III Hoenn
  480,
  481,
  482,
  483,
  484,
  485,
  486,
  487,
  488,
  490,
  491,
  492,
  493, // IV  Sinnoh
  494,
  638,
  639,
  640,
  641,
  642,
  643,
  644,
  645,
  646,
  647,
  648,
  649, // V   Unova
  716,
  717,
  718,
  719,
  720,
  721, // VI  Kalos
  772,
  773,
  785,
  786,
  787,
  788,
  789,
  790,
  791,
  792,
  800,
  801,
  802,
  807,
  808,
  809, // VII Alola
  888,
  889,
  890,
  891,
  892,
  893,
  894,
  895,
  896,
  897,
  898,
  905, // VIII Galar
  1001,
  1002,
  1003,
  1004,
  1007,
  1008,
  1014,
  1015,
  1016,
  1017,
  1024,
  1025, // IX  Paldea
]
// Mythical Pokemon are included; the app reads the "mythical" flag from the API and draws them as black-and-gold cards.
const GEN = {
  'generation-i': 1,
  'generation-ii': 2,
  'generation-iii': 3,
  'generation-iv': 4,
  'generation-v': 5,
  'generation-vi': 6,
  'generation-vii': 7,
  'generation-viii': 8,
  'generation-ix': 9,
}
export const REGION_BY_GEN = {
  1: 'Kanto',
  2: 'Johto',
  3: 'Hoenn',
  4: 'Sinnoh',
  5: 'Unova',
  6: 'Kalos',
  7: 'Alola',
  8: 'Galar',
  9: 'Paldea',
}
const STAT_LABELS = ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed']

export const titleCase = (s) =>
  s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

async function getJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Request failed (${res.status})`)
  return res.json()
}

// Fetch one Pokemon and reshape it into the object the UI uses.
async function loadPokemon(id) {
  const [p, s] = await Promise.all([
    getJson(`${API}/pokemon/${id}`),
    getJson(`${API}/pokemon-species/${id}`),
  ])
  const english = (list, key) =>
    list.find((e) => e.language.name === 'en')?.[key] ?? ''
  const gen = GEN[s.generation.name]
  return {
    id,
    name: english(s.names, 'name') || titleCase(p.name), // species name: "Ho-Oh", "Type: Null", not form names
    types: p.types.map((t) => titleCase(t.type.name)),
    generation: gen,
    region: REGION_BY_GEN[gen],
    rarity: s.is_mythical ? 'Mythical' : 'Legendary',
    category: english(s.genera, 'genus'),
    description: english(s.flavor_text_entries, 'flavor_text').replace(
      /[\n\f]/g,
      ' ',
    ),
    height: p.height / 10, // decimetres -> metres
    weight: p.weight / 10, // hectograms -> kg
    image:
      p.sprites.other['official-artwork'].front_default ||
      p.sprites.front_default,
    stats: p.stats.map((st, i) => ({
      label: STAT_LABELS[i],
      value: st.base_stat,
    })),
    abilities: p.abilities.map((a) => titleCase(a.ability.name)),
  }
}

// Loads the whole list once. Returns { data, loading, error, reload }.
export function usePokemonList() {
  const [state, setState] = useState({ data: [], loading: true, error: null })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    setState({ data: [], loading: true, error: null })
    ;(async () => {
      let all = []
      try {
        // Load in chunks of 15 so cards appear while the rest is still coming in.
        for (let i = 0; i < LEGENDARY_IDS.length; i += 15) {
          const part = await Promise.all(
            LEGENDARY_IDS.slice(i, i + 15).map(loadPokemon),
          )
          if (cancelled) return
          all = all.concat(part)
          setState({ data: all, loading: true, error: null })
        }
        setState({ data: all, loading: false, error: null })
      } catch (e) {
        if (!cancelled)
          setState({ data: all, loading: false, error: e.message })
      }
    })()
    return () => {
      cancelled = true
    }
  }, [attempt])

  const reload = useCallback(() => setAttempt((n) => n + 1), [])
  return { ...state, reload }
}

// Where a Pokemon can be found in the games (loaded when the detail popup opens).
export function useEncounters(id) {
  const [state, setState] = useState({ items: [], loading: true, error: false })

  useEffect(() => {
    if (id == null) return
    let cancelled = false
    setState({ items: [], loading: true, error: false })
    getJson(`${API}/pokemon/${id}/encounters`)
      .then((rows) => {
        if (cancelled) return
        const items = rows.map((r) => ({
          area: titleCase(r.location_area.name),
          games: [
            ...new Set(r.version_details.map((v) => titleCase(v.version.name))),
          ],
        }))
        // The same area can appear twice; keep one row per area.
        setState({
          items: items.filter(
            (e, i) => items.findIndex((x) => x.area === e.area) === i,
          ),
          loading: false,
          error: false,
        })
      })
      .catch(
        () =>
          !cancelled && setState({ items: [], loading: false, error: true }),
      )
    return () => {
      cancelled = true
    }
  }, [id])

  return state
}

// Evolution chain (loaded when the detail popup opens).
export function useEvolutions(id) {
  const [state, setState] = useState({
    stages: [],
    loading: true,
    error: false,
  })

  useEffect(() => {
    if (id == null) return
    let cancelled = false
    setState({ stages: [], loading: true, error: false })
    ;(async () => {
      try {
        const species = await getJson(`${API}/pokemon-species/${id}`)
        const chain = await getJson(species.evolution_chain.url)
        const stages = []
        let level = [chain.chain]
        while (level.length) {
          stages.push(
            level.map((n) => {
              const sid = Number(n.species.url.split('/').filter(Boolean).pop())
              const d = n.evolution_details[0]
              const how = !d
                ? ''
                : d.min_level
                  ? `Lv. ${d.min_level}`
                  : d.item
                    ? titleCase(d.item.name)
                    : d.min_happiness
                      ? 'Friendship'
                      : titleCase(d.trigger.name)
              return {
                id: sid,
                name: titleCase(n.species.name),
                how,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${sid}.png`,
              }
            }),
          )
          level = level.flatMap((n) => n.evolves_to)
        }
        if (!cancelled) setState({ stages, loading: false, error: false })
      } catch {
        if (!cancelled) setState({ stages: [], loading: false, error: true })
      }
    })()
    return () => {
      cancelled = true
    }
  }, [id])

  return state
}

// Alternate forms (Mega, Primal, Origin, Therian, Black/White...). Loaded when the detail popup opens.
export function useForms(id) {
  const [state, setState] = useState({ forms: [], loading: true, error: false })

  useEffect(() => {
    if (id == null) return
    let cancelled = false
    setState({ forms: [], loading: true, error: false })
    ;(async () => {
      try {
        const species = await getJson(`${API}/pokemon-species/${id}`)
        const others = species.varieties.filter((v) => !v.is_default)
        const forms = await Promise.all(
          others.map(async (v) => {
            const p = await getJson(v.pokemon.url)
            return {
              key: p.name,
              name: titleCase(p.name),
              types: p.types.map((t) => titleCase(t.type.name)),
              image:
                p.sprites.other['official-artwork'].front_default ||
                p.sprites.front_default,
            }
          }),
        )
        if (!cancelled) setState({ forms, loading: false, error: false })
      } catch {
        if (!cancelled) setState({ forms: [], loading: false, error: true })
      }
    })()
    return () => {
      cancelled = true
    }
  }, [id])

  return state
}
