import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useContent } from '../i18n/useContent'
import { ThemeToggle } from './ThemeToggle'
import { LangToggle } from './LangToggle'
import { Icon } from './Icon'

export function Sidebar() {
  const { profile, nav, ui } = useContent()
  const [open, setOpen] = useState(false)

  // Close on Escape when the mobile menu is open.
  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <aside className={`sidebar${open ? ' is-open' : ''}`}>
      <div className="sidebar__bar">
        <Link
          className="sidebar__logo"
          to="/"
          onClick={() => setOpen(false)}
        >
          <span className="sidebar__name">{profile.name}</span>
          <span className="sidebar__role">{profile.role}</span>
        </Link>
        <button
          type="button"
          className="sidebar__toggle"
          aria-expanded={open}
          aria-controls="sidebar-panel"
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
          <span className="sr-only">{open ? ui.closeMenu : ui.openMenu}</span>
        </button>
      </div>

      <div className="sidebar__panel" id="sidebar-panel">
        <nav className="sidebar__nav" aria-label={ui.primaryNav}>
          {nav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? 'is-active' : undefined)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__footer">
          <p className="sidebar__status">
            <span className="dot" aria-hidden="true" />
            {ui.openToConversations}
          </p>
          <div className="sidebar__socials">
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
          <div className="sidebar__prefs">
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </aside>
  )
}
