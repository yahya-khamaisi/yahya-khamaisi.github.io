import { Container } from '@/components/site'
import { Bento } from '../components/home/Bento'
import { WorkSection } from '../components/home/WorkSection'
import { BuildSection } from '../components/home/BuildSection'
import { ExperienceSection } from '../components/home/ExperienceSection'
import { SkillsSection } from '../components/home/SkillsSection'
import { EducationSection } from '../components/home/EducationSection'
import { ContactSection } from '../components/home/ContactSection'

export function HomePage() {
  return (
    <div>
      <Container>
        <Bento />
        <WorkSection />
        <BuildSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </Container>
    </div>
  )
}
