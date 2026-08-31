import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useContent } from '../i18n/useContent'
import { useLang } from '../i18n/LangProvider'

function setMeta(selector: string, content: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector)
  if (el) el.setAttribute('content', content)
}

/**
 * Keeps <title> and the description/OG meta tags in sync with the active
 * route and language. The SPA has no SSR, so without this every route
 * shares index.html's tags.
 */
export function useDocumentMeta() {
  const { pathname } = useLocation()
  const { pageMeta, profile } = useContent()
  const { lang } = useLang()

  useEffect(() => {
    const fallback = pageMeta['/']
    const meta = pageMeta[pathname] ?? fallback
    const isKnown = pathname in pageMeta
    const title = isKnown ? meta.title : profile.name

    document.title = title
    setMeta('meta[name="description"]', meta.description)
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', meta.description)
    document.documentElement.lang = lang
  }, [pathname, pageMeta, profile.name, lang])
}
