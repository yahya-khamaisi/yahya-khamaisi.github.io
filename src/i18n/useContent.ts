import { en, type Site } from '../data/content'
import { copy, type Copy } from '../data/site'
import { ar } from '../data/content.ar'
import { useLang } from './LangProvider'

/** The active localized content bundle. */
export function useContent(): Site {
  const { lang } = useLang()
  return lang === 'ar' ? ar : en
}

/** Just the UI micro-copy from the active bundle. */
export function useUi() {
  return useContent().ui
}

/** Bundle for a given language, outside of React (e.g. pre-render helpers). */
export function contentFor(lang: 'en' | 'ar'): Site {
  return lang === 'ar' ? ar : en
}

/** Layout copy (section text, demo script) for the active language. */
export function useCopy(): Copy {
  const { lang } = useLang()
  return copy[lang]
}
