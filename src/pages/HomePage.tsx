import { Link } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { SectionHead } from '../components/SectionHead'
import { Capabilities } from '../components/Capabilities'
import { Experience } from '../components/Experience'
import { Skills } from '../components/Skills'
import { Education } from '../components/Education'
import { Research } from '../components/Research'
import { Contact } from '../components/Contact'
import { ProjectCard } from '../components/ProjectCard'
import { Icon } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { featuredProjects } from '../data/content'
import { useContent } from '../i18n/useContent'

export function HomePage() {
  const { projects, ui, home, pageHero, profile, researchToolkit } = useContent()
  const topPicks = featuredProjects(projects).slice(0, 3)

  return (
    <>
      <Reveal>
        <Hero />
      </Reveal>

      <section id="work" className="section">
        <SectionHead
          kicker={home.topPicks.kicker}
          icon="work"
          title={home.topPicks.title}
          description={home.topPicks.description}
          action={
            <Link className="btn btn-ghost" to="/projects">
              {ui.viewAllProjects}
            </Link>
          }
        />
        <ul className="project-grid project-grid--top">
          {topPicks.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              size="lg"
            />
          ))}
        </ul>
      </section>

      <section id="experience" className="section">
        <SectionHead
          kicker={pageHero.experience.kicker}
          icon="experience"
          title={pageHero.experience.title}
          description={pageHero.experience.description}
        />
        <Experience />
      </section>

      <section id="skills" className="section">
        <SectionHead
          kicker={home.capabilities.kicker}
          icon="spark"
          title={home.capabilities.title}
          description={home.capabilities.description}
        />
        <Capabilities />

        <SectionHead
          kicker={pageHero.skills.kicker}
          icon="skills"
          title={pageHero.skills.title}
          description={pageHero.skills.description}
          variant="sub"
        />
        <Skills />

        <div className="research-toolkit">
          <div>
            <div className="section-kicker">
              <Icon name="research" />
              <span>{ui.skillsSecondary}</span>
            </div>
            <h3>{researchToolkit.title}</h3>
            <p>{researchToolkit.description}</p>
          </div>
          <ul className="research-toolkit__list">
            {researchToolkit.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="education" className="section">
        <SectionHead
          kicker={pageHero.education.kicker}
          icon="education"
          title={pageHero.education.title}
          description={pageHero.education.description}
        />
        <Education />

        <SectionHead
          kicker={ui.publicationsKicker}
          icon="paper"
          title={ui.publicationsTitle}
          description={ui.publicationsDesc}
          variant="sub"
        />
        <Research />
      </section>

      <section id="contact" className="section section--flush">
        <SectionHead
          icon="mail"
          title={pageHero.contact.title}
          description={ui.contactDescription(profile.location)}
        />
        <Contact />
      </section>
    </>
  )
}
