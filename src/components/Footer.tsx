import { Link } from 'react-router-dom'
import { useContent, useCopy } from '../i18n/useContent'

export function Footer() {
  const { profile } = useContent()
  const c = useCopy()
  return (
    <footer className="wrap">
      <div className="site-footer">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <Link to="/" state={{ section: 'top' }}>
          {c.footer.backToTop}
        </Link>
      </div>
    </footer>
  )
}
