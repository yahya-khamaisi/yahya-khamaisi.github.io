import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Footer } from '../components/Footer'
import { PhysicsField } from '../components/PhysicsField'
import { ThemeProvider } from '../theme/ThemeProvider'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useUi } from '../i18n/useContent'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Chrome() {
  useDocumentMeta()
  const ui = useUi()

  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#main">
        {ui.skipToContent}
      </a>
      <PhysicsField />
      <div className="shell">
        <Sidebar />
        <div className="shell-main">
          <div className="page">
            <main id="main" tabIndex={-1}>
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
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
