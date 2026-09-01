import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { SettingsPanel } from '../components/SettingsPanel'
import { PhysicsField } from '../components/PhysicsField'
import { ThemeProvider } from '../theme/ThemeProvider'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useUi } from '../i18n/useContent'

/** Scroll to the hash target if there is one, otherwise to the very top. */
function scrollToTarget(hash: string) {
  if (!hash) {
    window.scrollTo(0, 0)
    return () => {}
  }
  const id = decodeURIComponent(hash.slice(1))
  let tries = 0
  let timer = 0
  const jump = () => {
    const el = document.getElementById(id)
    if (el) {
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)
      const top =
        el.getBoundingClientRect().top + window.scrollY - (rem * 4 + 8)
      window.scrollTo(0, top)
      return
    }
    if (tries++ < 20) timer = window.setTimeout(jump, 50)
  }
  jump()
  return () => window.clearTimeout(timer)
}

/**
 * On navigation: jump to the hash target (the one-page sections) or to the
 * top (the project routes). Also re-asserts position after the browser's
 * own scroll restoration — Safari otherwise reopens the page (fresh load
 * or bfcache) partway down, past the hero.
 */
function RouteScroll() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    // Stop re-asserting once the visitor takes the wheel.
    let userMoved = false
    const mark = () => {
      userMoved = true
    }
    window.addEventListener('wheel', mark, { passive: true, once: true })
    window.addEventListener('touchmove', mark, { passive: true, once: true })
    window.addEventListener('keydown', mark, { once: true })

    const apply = () => {
      if (!userMoved) scrollToTarget(hash)
    }
    const cancel = scrollToTarget(hash)
    // Fresh loads: Safari can restore a stale offset a beat after mount.
    const raf = requestAnimationFrame(apply)
    const late = window.setTimeout(apply, 150)
    return () => {
      cancel()
      cancelAnimationFrame(raf)
      window.clearTimeout(late)
      window.removeEventListener('wheel', mark)
      window.removeEventListener('touchmove', mark)
      window.removeEventListener('keydown', mark)
    }
  }, [pathname, hash, key])

  // bfcache restore (tab switch / reopen) does not remount React.
  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) scrollToTarget(window.location.hash)
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
