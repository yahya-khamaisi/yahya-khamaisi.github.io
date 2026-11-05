import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useContent } from '../i18n/useContent'
import { useLang } from '../i18n/LangProvider'
import { useTheme } from '../theme/ThemeProvider'
import { useSpotlight } from './Spotlight'
import { Sym, type SymName } from './Sym'

/** The three window controls. Decorative — the site has nothing to close. */
export function Lights() {
  return (
    <span className="lights" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  )
}

function Clock() {
  const { lang } = useLang()
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(id)
  }, [])
  const text = new Intl.DateTimeFormat(lang === 'ar' ? 'ar-AE' : 'en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }).format(now)
  return <span className="mb-clock">{text}</span>
}

const themeIcon: Record<string, SymName> = { system: 'auto', light: 'sun', dark: 'moon' }

export function MenuBar() {
  const { profile, ui, mac } = useContent()
  const { lang, toggleLang } = useLang()
  const { preference, cyclePreference } = useTheme()
  const { open } = useSpotlight()
  const menuSections = mac.sections.filter((s) =>
    ['about', 'work', 'experience', 'skills', 'contact'].includes(s.id),
  )

  return (
    <header className="menubar">
      <Link className="mb-brand" to="/">
        <span className="mb-mono" aria-hidden="true">
          YK
        </span>
        <b>{profile.name}</b>
      </Link>
      <nav className="mb-nav" aria-label={ui.primaryNav}>
        {menuSections.map((s) => (
          <NavLink key={s.id} to={s.to} end={s.to === '/'}>
            {s.label}
          </NavLink>
        ))}
      </nav>
      <div className="mb-right">
        <button
          type="button"
          className="mb-lang"
          onClick={toggleLang}
          aria-label={ui.langSwitchTo}
          title={ui.langSwitchTo}
        >
          <span className={lang === 'en' ? 'is-on' : undefined}>EN</span>
          <span className={lang === 'ar' ? 'is-on' : undefined}>ع</span>
        </button>
        <button
          type="button"
          className="mb-icon"
          onClick={cyclePreference}
          aria-label={`${mac.t.theme}: ${ui.themeShort[preference]}`}
          title={`${mac.t.theme}: ${ui.themeShort[preference]}`}
        >
          <Sym name={themeIcon[preference]} />
        </button>
        <button
          type="button"
          className="mb-icon"
          onClick={open}
          aria-label={mac.t.search}
          title={`${mac.t.search} (⌘K)`}
        >
          <Sym name="search" />
        </button>
        <Clock />
      </div>
    </header>
  )
}

export function Sidebar() {
  const { profile, projects, experience, ui, mac } = useContent()
  const counts: Partial<Record<string, number>> = {
    work: projects.length,
    experience: experience.length,
  }
  return (
    <nav className="side" aria-label={ui.primaryNav}>
      <Lights />
      {mac.sections.map((s) => (
        <NavLink
          key={s.id}
          to={s.to}
          end={s.to === '/'}
          className={({ isActive }) => `side-item${isActive ? ' is-on' : ''}`}
        >
          <Sym name={s.icon} />
          <span>{s.label}</span>
          {counts[s.id] !== undefined && <small>{counts[s.id]}</small>}
        </NavLink>
      ))}
      <p className="side-sec">{mac.t.elsewhere}</p>
      <a className="side-item" href={profile.github} target="_blank" rel="noreferrer">
        <Sym name="gh" />
        <span>GitHub</span>
      </a>
      <a className="side-item" href={profile.linkedin} target="_blank" rel="noreferrer">
        <Sym name="linkedin" />
        <span>LinkedIn</span>
      </a>
      <a className="side-item" href={profile.cvUrl} target="_blank" rel="noreferrer">
        <Sym name="down" />
        <span>{ui.downloadCv}</span>
      </a>
      <div className="side-me">
        <img src={profile.photo} alt="" width={30} height={30} />
        <div>
          <b>{profile.name}</b>
          <span>{profile.role}</span>
        </div>
      </div>
    </nav>
  )
}

const dockIds = ['about', 'work', 'experience', 'skills', 'contact']

export function Dock() {
  const { profile, ui, mac } = useContent()
  const items = mac.sections.filter((s) => dockIds.includes(s.id))
  return (
    <nav className="dock" aria-label={ui.primaryNav}>
      {items.map((s) => (
        <NavLink
          key={s.id}
          to={s.to}
          end={s.to === '/'}
          className={({ isActive }) => `dock-app${isActive ? ' is-on' : ''}`}
          aria-label={s.label}
        >
          <Sym name={s.icon} />
          <span className="dock-tip" aria-hidden="true">
            {s.label}
          </span>
        </NavLink>
      ))}
      <span className="dock-sep" aria-hidden="true" />
      <DockLink href={profile.github} label="GitHub" icon="gh" />
      <DockLink href={profile.linkedin} label="LinkedIn" icon="linkedin" />
      <DockLink href={profile.cvUrl} label={ui.downloadCv} icon="down" />
    </nav>
  )
}

function DockLink({ href, label, icon }: { href: string; label: string; icon: SymName }) {
  return (
    <a className="dock-app" href={href} target="_blank" rel="noreferrer" aria-label={label}>
      <Sym name={icon} />
      <span className="dock-tip" aria-hidden="true">
        {label}
      </span>
    </a>
  )
}

/** iOS-style floating tab bar — replaces the Dock on phones. */
export function TabBar() {
  const { ui, mac } = useContent()
  const items = mac.sections.filter((s) => dockIds.includes(s.id))
  return (
    <nav className="tabbar" aria-label={ui.primaryNav}>
      {items.map((s) => (
        <NavLink
          key={s.id}
          to={s.to}
          end={s.to === '/'}
          className={({ isActive }) => `tab${isActive ? ' is-on' : ''}`}
        >
          <Sym name={s.icon} />
          <span>{s.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export function Widgets() {
  const { experience, mac } = useContent()
  const now = experience[0]
  const since = now.period.split(/\s[—–-]\s/)[0]
  return (
    <aside className="widgets" aria-label={mac.widgets.now}>
      <section className="widget">
        <h2 className="widget-h">
          <Sym name="pin" />
          {mac.widgets.now}
        </h2>
        <p className="widget-big">{now.role}</p>
        <p className="widget-sub">
          {now.company} · {now.place} · {mac.widgets.since} {since}
        </p>
      </section>
      <section className="widget">
        <h2 className="widget-h">
          <Sym name="term" />
          {mac.widgets.sample}
        </h2>
        <div className="widget-trace" dir="ltr">
          <span>
            <i className="k">ask</i> "Eligible for renewal?"
          </span>
          <span>retrieve → 6 chunks · 84 ms</span>
          <span>
            tool <i className="k">policy_lookup</i>
          </span>
          <span>
            tool <i className="k">risk_score</i> → 0.31
          </span>
          <span>
            <i className="g">✓ answer</i> · 3 citations · 2.6 s
          </span>
        </div>
      </section>
      <section className="widget">
        <h2 className="widget-h">
          <Sym name="mail" />
          {mac.widgets.sayHello}
        </h2>
        <p className="widget-text">{mac.widgets.sayHelloText}</p>
        <Link className="g-btn tint" to="/contact">
          {mac.widgets.writeToMe}
        </Link>
      </section>
    </aside>
  )
}

/**
 * A window pane: unified glass toolbar on top, scrolling body below.
 * On phones the toolbar becomes an iOS large title.
 */
export function Pane({
  title,
  subtitle,
  leading,
  actions,
  heading = true,
  children,
}: {
  title: string
  subtitle?: string
  leading?: ReactNode
  actions?: ReactNode
  /** false when the page renders its own h1 */
  heading?: boolean
  children: ReactNode
}) {
  const Title = heading ? 'h1' : 'p'
  return (
    <section className="pane">
      <header className="pane-tb">
        {leading}
        <div className="pane-title">
          <Title>{title}</Title>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {actions && <div className="pane-actions">{actions}</div>}
      </header>
      <div className="pane-body">{children}</div>
    </section>
  )
}
