import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { pageMeta } from '../data/content'

const DEFAULT_TITLE = 'Yahya Khamayseh'
const FALLBACK = pageMeta['/']

function setMeta(selector: string, content: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector)
  if (el) el.setAttribute('content', content)
}

/**
 * Keeps <title> and the description/OG meta tags in sync with the active route.
 * The SPA has no SSR, so without this every route shares index.html's tags.
 */
export function useDocumentMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = pageMeta[pathname] ?? FALLBACK
    const isKnown = pathname in pageMeta

    document.title = isKnown ? meta.title : DEFAULT_TITLE
    setMeta('meta[name="description"]', meta.description)
    setMeta('meta[property="og:title"]', isKnown ? meta.title : DEFAULT_TITLE)
    setMeta('meta[property="og:description"]', meta.description)
  }, [pathname])
}
