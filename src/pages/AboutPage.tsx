import { Link } from 'react-router-dom'
import { aboutEssay, profile, aboutStats } from '../data/content'
import { Reveal } from '../components/Reveal'
import { Magnetic } from '../components/Magnetic'
import { Icon } from '../components/Icon'

export function AboutPage() {
  return (
    <div className="about">
      <Reveal>
        <header className="about-hero">
          <Magnetic className="about-hero__portrait" strength={8}>
            <div className="about-portrait__frame">
              <img
                src={profile.photo}
                alt={profile.photoAlt}
                width={560}
                height={700}
              />
            </div>
          </Magnetic>

          <div className="about-hero__main">
            <div className="section-kicker">
              <Icon name="spark" />
              <span>{aboutEssay.kicker}</span>
            </div>
            <h1>{profile.name}</h1>
            <p className="about-hero__tagline">{profile.headline}</p>
            <p className="about-hero__lede">{aboutEssay.lede}</p>

            <ul className="about-hero__facts">
              <li>
                <Icon name="location" />
                <span>{profile.location}</span>
              </li>
              <li>
                <Icon name="mail" />
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>
                <Icon name="code" />
                <a href={profile.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <Icon name="network" />
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
            </ul>

            <div className="cta-row">
              <Link className="btn btn-primary" to="/contact">
                Contact me
              </Link>
              <a
                className="btn btn-ghost"
                href={profile.cvUrl}
                target="_blank"
                rel="noreferrer"
              >
                Download CV
              </a>
            </div>
          </div>

          <ul className="about-hero__stats">
            {aboutStats.map((item) => (
              <li key={item.label}>
                <span className="about-hero__stat-icon" aria-hidden="true">
                  <Icon name={item.icon} />
                </span>
                <div>
                  <strong>{item.label}</strong>
                  <span>{item.detail}</span>
                </div>
              </li>
            ))}
          </ul>
        </header>
      </Reveal>

      <div className="about-essay">
        {aboutEssay.sections.map((section, index) => (
          <Reveal
            key={section.id}
            as="article"
            className="about-section"
            delay={index * 60}
          >
            <div id={section.id} className="about-section__anchor" />
            <h2>{section.title}</h2>
            {section.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        ))}
      </div>
    </div>
  )
}
