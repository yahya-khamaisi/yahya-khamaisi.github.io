import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type FontSize = 'small' | 'medium' | 'large'
export type Typeface = 'editorial' | 'modern' | 'compact'

const SIZE_KEY = 'font-size-preference'
const FACE_KEY = 'font-family-preference'

const SIZES: FontSize[] = ['small', 'medium', 'large']
const FACES: Typeface[] = ['editorial', 'modern', 'compact']

type SettingsContextValue = {
  fontSize: FontSize
  setFontSize: (value: FontSize) => void
  typeface: Typeface
  setTypeface: (value: Typeface) => void
  isOpen: boolean
  openSettings: () => void
  closeSettings: () => void
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

function read<T extends string>(key: string, allowed: T[], fallback: T): T {
  try {
    const stored = localStorage.getItem(key)
    if (stored && (allowed as string[]).includes(stored)) return stored as T
  } catch {
    /* ignore */
  }
  return fallback
}

function apply(fontSize: FontSize, typeface: Typeface) {
  const root = document.documentElement
  // `medium` / `editorial` are the CSS defaults — no attribute needed.
  if (fontSize === 'medium') delete root.dataset.fontSize
  else root.dataset.fontSize = fontSize
  if (typeface === 'editorial') delete root.dataset.font
  else root.dataset.font = typeface
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSizeState] = useState<FontSize>(() =>
    typeof window === 'undefined' ? 'medium' : read(SIZE_KEY, SIZES, 'medium'),
  )
  const [typeface, setTypefaceState] = useState<Typeface>(() =>
    typeof window === 'undefined'
      ? 'editorial'
      : read(FACE_KEY, FACES, 'editorial'),
  )
  const [isOpen, setIsOpen] = useState(false)

  const setFontSize = useCallback(
    (value: FontSize) => {
      setFontSizeState(value)
      apply(value, typeface)
      try {
        localStorage.setItem(SIZE_KEY, value)
      } catch {
        /* ignore */
      }
    },
    [typeface],
  )

  const setTypeface = useCallback(
    (value: Typeface) => {
      setTypefaceState(value)
      apply(fontSize, value)
      try {
        localStorage.setItem(FACE_KEY, value)
      } catch {
        /* ignore */
      }
    },
    [fontSize],
  )

  useEffect(() => {
    apply(fontSize, typeface)
  }, [fontSize, typeface])

  const value = useMemo<SettingsContextValue>(
    () => ({
      fontSize,
      setFontSize,
      typeface,
      setTypeface,
      isOpen,
      openSettings: () => setIsOpen(true),
      closeSettings: () => setIsOpen(false),
    }),
    [fontSize, setFontSize, typeface, setTypeface, isOpen],
  )

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider')
  }
  return context
}
