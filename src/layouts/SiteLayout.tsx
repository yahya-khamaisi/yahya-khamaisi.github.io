import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ThemeProvider } from '../theme/ThemeProvider'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useUi } from '../i18n/useContent'
import { Dock, MenuBar, Sidebar, TabBar, Widgets } from '../components/Shell'
import { Spotlight, SpotlightProvider } from '../components/Spotlight'

/** Old one-page section anchors now live at their own routes. */
const legacyHashes: Record<string, string> = {
  '#work': '/projects',
  '#experience': '/experience',
  '#skills': '/skills',
  '#education': '/education',
  '#research': '/research',
  '#contact': '/contact',
}

function Desktop() {
  useDocumentMeta()
  const ui = useUi()
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()
  const home = pathname === '/'

  useEffect(() => {
    const to = legacyHashes[hash]
    if (to) navigate(to, { replace: true })
  }, [hash, navigate])

  // Phones scroll the document; desktop scrolls inside the window.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <a className="skip-link" href="#main">
        {ui.skipToContent}
      </a>
      <MenuBar />
      <div className={`stage${home ? ' stage--home' : ''}`}>
        <div className="win">
          <Sidebar />
          <main id="main" className="win-main" tabIndex={-1} key={pathname}>
            <Outlet />
          </main>
        </div>
        {home && <Widgets />}
      </div>
      <Dock />
      <TabBar />
      <Spotlight />
    </>
  )
}

export function SiteLayout() {
  return (
    <ThemeProvider>
      <SpotlightProvider>
        <Desktop />
      </SpotlightProvider>
    </ThemeProvider>
  )
}
