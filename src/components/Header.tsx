import { Link } from 'react-router-dom'
import { Monitor, Moon, Search, Sun } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useContent, useCopy } from '../i18n/useContent'
import { useLang } from '../i18n/LangProvider'
import { useTheme } from '../theme/ThemeProvider'
import { useOpenCommandMenu } from './commandMenuContext'
import { Container } from './site'

const themeIcon = { system: Monitor, light: Sun, dark: Moon }

/** Slim top bar: identity on the start side, search and settings on the end. Sections live in the Dock. */
export function Header() {
  const { profile, ui } = useContent()
  const c = useCopy()
  const openMenu = useOpenCommandMenu()
  const { toggleLang } = useLang()
  const { preference, cyclePreference } = useTheme()
  const ThemeIcon = themeIcon[preference]
  const themeLabel = c.theme.toggle(c.theme[preference])

  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-xl">
      <Container className="flex h-14 items-center gap-3">
        <Link to="/" state={{ section: 'top' }} className="flex items-center gap-2.5 text-sm font-semibold whitespace-nowrap">
          <span aria-hidden="true" className="inline-flex size-7 items-center justify-center rounded-lg bg-foreground font-mono text-xs font-semibold text-background">
            YK
          </span>
          <span className="max-sm:hidden">{profile.name}</span>
          <span className="font-normal text-muted-foreground max-md:hidden">· {profile.role}</span>
        </Link>

        <div className="ms-auto flex items-center gap-2">
          <Button variant="outline" className="h-9 gap-2 rounded-full ps-3 pe-2 text-muted-foreground" onClick={openMenu}>
            <Search />
            <span className="max-sm:hidden">{c.command.open}</span>
            <kbd className="rounded border bg-muted px-1.5 font-mono text-xs max-sm:hidden">⌘K</kbd>
          </Button>
          <Button variant="outline" size="icon" className="size-9 rounded-full" onClick={cyclePreference} aria-label={themeLabel} title={themeLabel}>
            <ThemeIcon />
          </Button>
          <Button variant="outline" size="icon" className="size-9 rounded-full text-xs font-semibold" onClick={toggleLang} aria-label={ui.langSwitchTo} title={ui.langSwitchTo}>
            {ui.langName === 'العربية' ? 'ع' : 'EN'}
          </Button>
          <a href={profile.cvUrl} target="_blank" rel="noreferrer" className={cn(buttonVariants(), 'h-9 rounded-full px-4')}>
            {c.cv}
          </a>
        </div>
      </Container>
    </header>
  )
}
