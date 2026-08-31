import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Lang = 'en' | 'ar'
export type Dir = 'ltr' | 'rtl'

const STORAGE_KEY = 'lang-preference'

type LangContextValue = {
  lang: Lang
  dir: Dir
  setLang: (lang: Lang) => void
  toggleLang: () => void
}

const LangContext = createContext<LangContextValue | null>(null)

export function detectLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'ar') return stored
  } catch {
    /* ignore */
  }
  if (
    typeof navigator !== 'undefined' &&
    (navigator.languages ?? [navigator.language]).some((l) =>
      l?.toLowerCase().startsWith('ar'),
    )
  ) {
    return 'ar'
  }
  return 'en'
}

export function dirFor(lang: Lang): Dir {
  return lang === 'ar' ? 'rtl' : 'ltr'
}

function applyLang(lang: Lang) {
  const el = document.documentElement
  el.lang = lang
  el.dir = dirFor(lang)
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() =>
    typeof window === 'undefined' ? 'en' : detectLang(),
  )

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    applyLang(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  const toggleLang = useCallback(() => {
    setLang(lang === 'ar' ? 'en' : 'ar')
  }, [lang, setLang])

  useEffect(() => {
    applyLang(lang)
  }, [lang])

  const value = useMemo<LangContextValue>(
    () => ({ lang, dir: dirFor(lang), setLang, toggleLang }),
    [lang, setLang, toggleLang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const context = useContext(LangContext)
  if (!context) {
    throw new Error('useLang must be used within LangProvider')
  }
  return context
}
