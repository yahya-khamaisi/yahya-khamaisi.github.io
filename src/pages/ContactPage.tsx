import { Contact } from '../components/Contact'
import { PageHero } from '../components/PageHero'
import { useContent } from '../i18n/useContent'

export function ContactPage() {
  const { profile, pageHero, ui } = useContent()
  return (
    <div className="page-stack">
      <PageHero
        kicker={pageHero.contact.kicker}
        kickerIcon="mail"
        title={pageHero.contact.title}
        description={ui.contactDescription(profile.location)}
      />
      <Contact hideIntro />
    </div>
  )
}
