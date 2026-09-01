import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useContent } from '../i18n/useContent'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { useSettings } from '../settings/SettingsProvider'
import { Icon } from './Icon'

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
      <circle
        cx="12"
        cy="12"
        r="3.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M12 2.6l1.5 2.3 2.7-.7.6 2.7 2.7.9-.9 2.6.9 2.6-2.7.9-.6 2.7-2.7-.7L12 21.4l-1.5-2.3-2.7.7-.6-2.7-2.7-.9.9-2.6-.9-2.6 2.7-.9.6-2.7 2.7.7z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Header() {
  const { profile, nav, ui } = useContent()
  const { openSettings } = useSettings()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const onHome = location.pathname === '/'

  const sectionIds = nav.map((item) => item.href.replace('#', ''))
  const spyId = useScrollSpy(sectionIds)
  const activeId = onHome ? spyId : ''

  // Close the mobile menu on route change and on Escape.
  useEffect(() => {
    setOpen(false)
  }, [location])

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`topbar${open ? ' is-open' : ''}`}>
      <div className="topbar__inner">
        <Link className="topbar__logo" to="/" onClick={() => setOpen(false)}>
          <span className="topbar__name">{profile.name}</span>
          <span className="topbar__role">{profile.role}</span>
        </Link>

        <nav className="topbar__nav" aria-label={ui.primaryNav}>
          {nav.map((item) => {
            const id = item.href.replace('#', '')
            return (
              <Link
                key={item.href}
                to={{ pathname: '/', hash: item.href }}
                className={activeId === id ? 'is-active' : undefined}
                aria-current={activeId === id ? 'true' : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="topbar__actions">
          <a
            className="btn btn-ghost topbar__cv"
            href={profile.cvUrl}
            target="_blank"
            rel="noreferrer"
          >
            {ui.downloadCv}
          </a>
          <button
            type="button"
            className="topbar__icon-btn"
            onClick={openSettings}
            aria-label={ui.settings.open}
            title={ui.settings.open}
          >
            <GearIcon />
          </button>
          <button
            type="button"
            className="topbar__toggle"
            aria-expanded={open}
            aria-controls="topbar-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true">{open ? '✕' : '☰'}</span>
            <span className="sr-only">{open ? ui.closeMenu : ui.openMenu}</span>
          </button>
        </div>
      </div>

      <div className="topbar__menu" id="topbar-menu">
        <nav className="topbar__menu-nav" aria-label={ui.primaryNav}>
          {nav.map((item) => {
            const id = item.href.replace('#', '')
            return (
              <Link
                key={item.href}
                to={{ pathname: '/', hash: item.href }}
                className={activeId === id ? 'is-active' : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="topbar__menu-foot">
          <p className="topbar__status">
            <span className="dot" aria-hidden="true" />
            {ui.openToConversations}
          </p>
          <div className="topbar__socials">
            <a href={`mailto:${profile.email}`} aria-label="Email" title="Email">
              <Icon name="mail" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <Icon name="code" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Icon name="network" />
            </a>
          </div>
          <a
            className="btn btn-ghost"
            href={profile.cvUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            {ui.downloadCv}
          </a>
        </div>
      </div>
    </header>
  )
}
