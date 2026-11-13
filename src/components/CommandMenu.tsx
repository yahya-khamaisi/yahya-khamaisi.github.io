import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, FolderKanban, Hash, Languages, Mail, SunMoon } from 'lucide-react'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import { useContent, useCopy } from '../i18n/useContent'
import { useLang } from '../i18n/LangProvider'
import { useTheme } from '../theme/ThemeProvider'
import { CommandMenuContext } from './commandMenuContext'

/** ⌘K / Ctrl+K command menu: jump to sections and projects, or run quick actions. */
export function CommandMenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const { projects, profile } = useContent()
  const c = useCopy()
  const k = c.command
  const navigate = useNavigate()
  const { toggleLang } = useLang()
  const { cyclePreference } = useTheme()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const openMenu = useMemo(() => () => setOpen(true), [])
  const run = (action: () => void) => () => {
    setOpen(false)
    action()
  }

  return (
    <CommandMenuContext.Provider value={openMenu}>
      {children}
      <CommandDialog open={open} onOpenChange={setOpen} title={k.title} description={k.placeholder}>
        <Command>
        <CommandInput placeholder={k.placeholder} />
        <CommandList>
          <CommandEmpty>{k.empty}</CommandEmpty>
          <CommandGroup heading={k.sections}>
            {[{ id: 'top', label: profile.name }, ...c.nav].map((item) => (
              <CommandItem key={item.id} onSelect={run(() => navigate('/', { state: { section: item.id } }))}>
                <Hash />
                {item.label}
              </CommandItem>
            ))}
            <CommandItem onSelect={run(() => navigate('/projects'))}>
              <FolderKanban />
              {c.projects.title(projects.length)}
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={k.projects}>
            {projects.map((p) => (
              <CommandItem key={p.slug} value={`${p.title} ${p.tag}`} onSelect={run(() => navigate(`/projects/${p.slug}`))}>
                <FolderKanban />
                <span className="truncate">{p.title}</span>
                <span className="ms-auto truncate text-xs text-muted-foreground">{p.period}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={k.actions}>
            <CommandItem onSelect={run(cyclePreference)}>
              <SunMoon />
              {k.toggleTheme}
            </CommandItem>
            <CommandItem onSelect={run(toggleLang)}>
              <Languages />
              {k.switchLang}
            </CommandItem>
            <CommandItem onSelect={run(() => window.open(profile.cvUrl, '_blank', 'noreferrer'))}>
              <FileText />
              {c.cv}
            </CommandItem>
            <CommandItem onSelect={run(() => window.location.assign(`mailto:${profile.email}`))}>
              <Mail />
              {k.email}
              <CommandShortcut>{profile.email}</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
        </Command>
      </CommandDialog>
    </CommandMenuContext.Provider>
  )
}
