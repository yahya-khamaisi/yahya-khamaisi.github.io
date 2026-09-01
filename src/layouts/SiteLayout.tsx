import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { PhysicsField } from '../components/PhysicsField'
import { ThemeProvider } from '../theme/ThemeProvider'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useUi } from '../i18n/useContent'

/**
 * On navigation: jump to the hash target if there is one (the one-page
 * sections), otherwise scroll to the top (the project routes).
 */
function RouteScroll() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    const id = decodeURIComponent(hash.slice(1))
    let tries = 0
    let timer = 0
    const jump = () => {
      const el = document.getElementById(id)
      if (el) {
        const rem = parseFloat(
          getComputedStyle(document.documentElement).fontSize,
        )
        const top =
          el.getBoundingClientRect().top + window.scrollY - (rem * 4 + 8)
        window.scrollTo(0, top)
        return
      }
      if (tries++ < 20) timer = window.setTimeout(jump, 50)
    }
    jump()
    return () => window.clearTimeout(timer)
  }, [pathname, hash, key])
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
