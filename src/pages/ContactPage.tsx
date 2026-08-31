import { Contact } from '../components/Contact'
import { PageHero } from '../components/PageHero'
import { profile } from '../data/content'

export function ContactPage() {
  return (
    <div className="page-stack">
      <PageHero
        kicker="Contact"
        kickerIcon="mail"
        title="Let's talk"
        description={`Open to full-stack, AI engineering, and research collaborations. Based in ${profile.location}.`}
      />
      <Contact hideIntro />
    </div>
  )
}
