import { Link } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'
import { useContent, useCopy } from '../i18n/useContent'
import { Container } from './site'

export function Footer() {
  const { profile } = useContent()
  const c = useCopy()
  return (
    <footer>
      <Container>
        <Separator />
        <div className="flex flex-wrap justify-between gap-3 pt-6 pb-10 text-sm text-muted-foreground">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <Link to="/" state={{ section: 'top' }} className="hover:text-foreground">
            {c.footer.backToTop}
          </Link>
        </div>
      </Container>
    </footer>
  )
}
