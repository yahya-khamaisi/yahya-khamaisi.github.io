import { Hero } from '../components/home/Hero'
import { AgentConsole } from '../components/home/AgentConsole'
import { WorkSection } from '../components/home/WorkSection'
import { BuildSection } from '../components/home/BuildSection'
import { ExperienceSection } from '../components/home/ExperienceSection'
import { SkillsSection } from '../components/home/SkillsSection'
import { EducationSection } from '../components/home/EducationSection'
import { ContactSection } from '../components/home/ContactSection'

export function HomePage() {
  return (
    <div className="home">
      <div className="grid-bg" aria-hidden="true" />
      <div className="wrap" style={{ position: 'relative' }}>
        <Hero />
        <AgentConsole />
        <WorkSection />
        <BuildSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </div>
    </div>
  )
}
