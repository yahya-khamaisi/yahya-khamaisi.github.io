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
  const { pageMeta, profile, mac, projects, pageHero } = useContent()
  const { lang } = useLang()

  useEffect(() => {
    const fallback = pageMeta['/']
    let title = fallback.title
    let description = fallback.description

    const slug = pathname.match(/^\/projects\/([^/]+)/)?.[1]
    const project = slug ? projects.find((p) => p.slug === slug) : undefined
    const section = mac.sections.find((s) => s.to === pathname && s.to !== '/')

    if (pathname in pageMeta) {
      ;({ title, description } = pageMeta[pathname])
    } else if (project) {
      title = `${project.title} — ${profile.name}`
      description = project.blurb
    } else if (section) {
      title = `${section.label} — ${profile.name}`
      const hero = pageHero[section.id as keyof typeof pageHero]
      if (hero) description = hero.description
    }

    document.title = title
    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', description)
    document.documentElement.lang = lang
  }, [pathname, pageMeta, profile.name, lang, mac, projects, pageHero])
}
