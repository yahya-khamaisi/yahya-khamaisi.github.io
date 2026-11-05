import { Link } from 'react-router-dom'
import { featuredProjects } from '../data/content'
import { useContent } from '../i18n/useContent'
import { useTheme } from '../theme/ThemeProvider'
import { Pane } from '../components/Shell'
import { Sym } from '../components/Sym'
import { Thumb } from '../components/Thumb'
import { useSpotlight } from '../components/Spotlight'

export function HomePage() {
  const { profile, projects, categoryLabels, ui, mac } = useContent()
  const { resolved } = useTheme()
  const { open } = useSpotlight()
  const featured = featuredProjects(projects).slice(0, 3)
  const more = mac.sections.filter((s) => s.id === 'education' || s.id === 'research')

  return (
    <Pane
      title={mac.sections[0].label}
      heading={false}
      actions={
        <>
          <button type="button" className="g-field g-field--button" onClick={open}>
            <Sym name="search" />
            <span>{mac.t.search}</span>
            <kbd>⌘K</kbd>
          </button>
          <Link className="g-btn tint" to="/contact">
            <Sym name="mail" />
            {ui.contact}
          </Link>
        </>
      }
    >
      <div className="about">
        <img
          className="about-avatar"
          src={resolved === 'light' ? profile.photoLight : profile.photo}
          alt={profile.photoAlt}
          width={168}
          height={168}
          fetchPriority="high"
          onError={(e) => {
            const img = e.currentTarget
            if (!img.src.endsWith(profile.photo)) img.src = profile.photo
          }}
        />
        <div>
          <p className="status-pill">
            <i aria-hidden="true" />
            {mac.hero.status}
          </p>
          <h1 className="about-title">
            {mac.hero.before}
            <span>{mac.hero.em}</span>
            {mac.hero.after}
          </h1>
          <p className="about-lede">{mac.hero.lede}</p>
          <div className="btn-row">
            <Link className="g-btn tint" to="/projects">
              {mac.t.seeMyWork}
            </Link>
            <a className="g-btn" href={profile.cvUrl} target="_blank" rel="noreferrer">
              <Sym name="down" />
              {ui.downloadCv}
            </a>
          </div>
        </div>
      </div>

      <ul className="proof">
        {mac.proof.map((item) => (
          <li key={item.label} className="tile">
            <span className="tile-ic" aria-hidden="true">
              <Sym name={item.icon} />
            </span>
            <b>{item.value}</b>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>

      <div className="row-head">
        <h2>{mac.t.featuredWork}</h2>
        <Link to="/projects">{mac.t.showAll(projects.length)}</Link>
      </div>
      <ul className="feat">
        {featured.map((p) => (
          <li key={p.slug}>
            <Link className="feat-card" to={`/projects/${p.slug}`}>
              <Thumb project={p} />
              <span className="feat-meta">
                <b>{p.title}</b>
                <span>
                  {categoryLabels[p.category]} · {p.period}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <nav className="more-list" aria-label={mac.t.more}>
        <h2>{mac.t.more}</h2>
        <div className="group">
          {more.map((s) => (
            <Link key={s.id} className="group-row" to={s.to}>
              <span className="row-ic">
                <Sym name={s.icon} />
              </span>
              <span className="grow">{s.label}</span>
              <Sym name="chevron" className="chev" />
            </Link>
          ))}
        </div>
      </nav>
    </Pane>
  )
}
