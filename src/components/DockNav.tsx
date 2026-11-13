import { Link, useLocation } from 'react-router-dom'
import { Briefcase, FolderKanban, GraduationCap, House, Layers, Mail, Search, Sparkles, type LucideIcon } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Dock, DockIcon } from '@/components/ui/dock'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useCopy } from '../i18n/useContent'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { useOpenCommandMenu } from './commandMenuContext'

const icons: Record<string, LucideIcon> = {
  top: House,
  work: FolderKanban,
  stack: Layers,
  experience: Briefcase,
  skills: Sparkles,
  education: GraduationCap,
  contact: Mail,
}

/** Floating macOS-style dock: one icon per section, plus search. */
export function DockNav() {
  const c = useCopy()
  const openMenu = useOpenCommandMenu()
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const items = [{ id: 'top', label: c.footer.backToTop }, ...c.nav]
  const active = useScrollSpy(onHome ? items.map((i) => i.id) : [])
  const icon = cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'size-10 rounded-full')

  return (
    <nav aria-label="Sections" className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      <Dock iconSize={40} iconMagnification={56} className="mt-0 h-14 gap-1 bg-background/80 shadow-lg backdrop-blur-xl max-sm:gap-0">
        {items.map((item) => {
          const Icon = icons[item.id] ?? House
          return (
            <DockIcon key={item.id} className="max-sm:size-9">
              <Link
                to="/"
                state={{ section: item.id }}
                aria-label={item.label}
                title={item.label}
                className={cn(icon, onHome && active === item.id && 'bg-muted text-chart-1')}
              >
                <Icon className="size-4" />
              </Link>
            </DockIcon>
          )
        })}
        <Separator orientation="vertical" className="mx-1 h-8" />
        <DockIcon className="max-sm:size-9">
          <button type="button" onClick={openMenu} aria-label={c.command.open} title={`${c.command.open} (⌘K)`} className={icon}>
            <Search className="size-4" />
          </button>
        </DockIcon>
      </Dock>
    </nav>
  )
}
