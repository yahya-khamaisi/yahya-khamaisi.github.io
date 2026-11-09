import { Link, useLocation } from 'react-router-dom'
import { useContent, useCopy } from '../i18n/useContent'
import { useLang } from '../i18n/LangProvider'
import { useTheme } from '../theme/ThemeProvider'
import { useScrollSpy } from '../hooks/useScrollSpy'

function ThemeIcon({ mode }: { mode: 'system' | 'light' | 'dark' }) {
  if (mode === 'light') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    )
  }
  if (mode === 'dark') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  )
}

export function Header() {
  const { profile, ui } = useContent()
  const c = useCopy()
  const { toggleLang } = useLang()
  const { preference, cyclePreference } = useTheme()
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const active = useScrollSpy(onHome ? c.nav.map((n) => n.id) : [])

  return (
    <header className="topbar">
      <div className="wrap topbar-in">
        <Link to="/" state={{ section: 'top' }} className="brand">
          <span className="brand-mark" aria-hidden="true">YK</span>
          <span className="brand-name">{profile.name}</span>
        </Link>
        <nav className="topnav" aria-label={ui.primaryNav}>
          {c.nav.map((item) => (
            <Link
              key={item.id}
              to="/"
              state={{ section: item.id }}
              className={onHome && active === item.id ? 'is-active' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="topbar-actions">
          <Link to="/" state={{ section: 'ask' }} className="btn btn-plain btn-sm">
            <span className="sparkle" aria-hidden="true">✦</span>
            <span className="btn-label-wide">{c.askAboutMe}</span>
          </Link>
          <button
            type="button"
            className="icon-btn"
            onClick={cyclePreference}
            aria-label={c.theme.toggle(c.theme[preference])}
            title={c.theme.toggle(c.theme[preference])}
          >
            <ThemeIcon mode={preference} />
          </button>
          <button type="button" className="icon-btn" onClick={toggleLang} aria-label={ui.langSwitchTo} title={ui.langSwitchTo}>
            {ui.langName === 'العربية' ? 'ع' : 'EN'}
          </button>
          <a className="btn btn-primary btn-sm" href={profile.cvUrl} target="_blank" rel="noreferrer">
            {c.cv}
          </a>
        </div>
      </div>
    </header>
  )
}
