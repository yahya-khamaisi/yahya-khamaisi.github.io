import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { SettingsPanel } from '../components/SettingsPanel'
import { PhysicsField } from '../components/PhysicsField'
import { ThemeProvider } from '../theme/ThemeProvider'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useUi } from '../i18n/useContent'
import { scrollToSection } from '../lib/scroll'

/**
 * Scroll behaviour for the one-page layout.
 *
 * In-app section links carry the target in router state, never in the URL,
 * and any hash from a deep link / legacy redirect is stripped once handled.
 * So the visible URL stays `/` and a reload or tab-reopen always starts at
 * the top — never parked on a section past the hero.
 */
function RouteScroll() {
  const location = useLocation()
  const navigate = useNavigate()
  const { pathname, hash, key } = location
  const section = (location.state as { section?: string } | null)?.section
  const cleaningUp = useRef(false)

  useEffect(() => {
    // The replace() below that strips a hash/state re-fires this effect —
    // skip that pass so we don't yank the page back to the top.
    if (cleaningUp.current) {
      cleaningUp.current = false
      return
    }

    const target = section || (hash ? decodeURIComponent(hash.slice(1)) : '')

    if (target) {
      const cancel = scrollToSection(target)
      const strip = window.setTimeout(() => {
        cleaningUp.current = true
        navigate(pathname + location.search, { replace: true, state: null })
      }, 700)
      return () => {
        cancel()
        window.clearTimeout(strip)
      }
    }

    // No target — top. Re-assert after the browser's own restoration,
    // but stop the moment the visitor scrolls.
    let userMoved = false
    const mark = () => {
      userMoved = true
    }
    window.addEventListener('wheel', mark, { passive: true, once: true })
    window.addEventListener('touchmove', mark, { passive: true, once: true })
    window.addEventListener('keydown', mark, { once: true })

    const top = () => {
      if (!userMoved) window.scrollTo(0, 0)
    }
    top()
    const raf = requestAnimationFrame(top)
    const late = window.setTimeout(top, 150)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(late)
      window.removeEventListener('wheel', mark)
      window.removeEventListener('touchmove', mark)
      window.removeEventListener('keydown', mark)
    }
  }, [pathname, hash, key, section, location.search, navigate])

  // bfcache / session restore doesn't remount React — URLs are clean, so top.
  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) window.scrollTo(0, 0)
    }
    window.addEventListener('pageshow', onPageShow)
    return () => window.removeEventListener('pageshow', onPageShow)
  }, [])

  return null
}

function Chrome() {
  useDocumentMeta()
  const ui = useUi()

  return (
    <>
      <RouteScroll />
      <a className="skip-link" href="#main">
        {ui.skipToContent}
      </a>
      <PhysicsField />
      <Header />
      <SettingsPanel />
      <div className="page">
        <main id="main" tabIndex={-1}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export function SiteLayout() {
  return (
    <ThemeProvider>
      <Chrome />
    </ThemeProvider>
  )
}
