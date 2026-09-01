import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type ThemePreference = 'system' | 'light' | 'dark'
export type ResolvedTheme = 'light' | 'dark'

const STORAGE_KEY = 'theme-preference'

type ThemeContextValue = {
  preference: ThemePreference
  resolved: ResolvedTheme
  setPreference: (preference: ThemePreference) => void
  cyclePreference: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  return preference === 'system' ? getSystemTheme() : preference
}

function readStoredPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored
    }
  } catch {
    /* ignore */
  }
  return 'system'
}

function applyTheme(preference: ThemePreference, resolved: ResolvedTheme) {
  const root = document.documentElement
  root.dataset.theme = resolved
  root.dataset.themePreference = preference
  root.style.colorScheme = resolved
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(() =>
    typeof window === 'undefined' ? 'system' : readStoredPreference(),
  )
  const [resolved, setResolved] = useState<ResolvedTheme>(() =>
    typeof window === 'undefined' ? 'dark' : resolveTheme(readStoredPreference()),
  )

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next)
    const nextResolved = resolveTheme(next)
    setResolved(nextResolved)
    applyTheme(next, nextResolved)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  const cyclePreference = useCallback(() => {
    const order: ThemePreference[] = ['system', 'light', 'dark']
    const index = order.indexOf(preference)
    setPreference(order[(index + 1) % order.length])
  }, [preference, setPreference])

  useEffect(() => {
    applyTheme(preference, resolveTheme(preference))

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      if (preference === 'system') {
        const next = getSystemTheme()
        setResolved(next)
        applyTheme('system', next)
      }
    }

    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [preference])

  const value = useMemo(
    () => ({ preference, resolved, setPreference, cyclePreference }),
    [preference, resolved, setPreference, cyclePreference],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
