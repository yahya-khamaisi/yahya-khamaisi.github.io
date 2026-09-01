import { useEffect, useRef } from 'react'
import { useSettings } from '../settings/SettingsProvider'
import { useTheme } from '../theme/ThemeProvider'
import { useLang } from '../i18n/LangProvider'
import { useContent } from '../i18n/useContent'

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
}) {
  return (
    <div className="setting-row">
      <span className="setting-row__label">{label}</span>
      <div className="segmented" role="group" aria-label={label}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`segmented__btn${
              value === option.value ? ' is-active' : ''
            }`}
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export function SettingsPanel() {
  const {
    isOpen,
    closeSettings,
    fontSize,
    setFontSize,
    typeface,
    setTypeface,
  } = useSettings()
  const { preference, setPreference } = useTheme()
  const { lang, setLang } = useLang()
  const { ui } = useContent()
  const t = ui.settings
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeSettings()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    dialogRef.current?.querySelector<HTMLElement>('button')?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previouslyFocused?.focus?.()
    }
  }, [isOpen, closeSettings])

  if (!isOpen) return null

  return (
    <div
      className="settings-overlay"
      onClick={closeSettings}
      role="presentation"
    >
      <div
        className="settings-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={t.title}
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="settings-dialog__head">
          <h2>{t.title}</h2>
          <button
            type="button"
            className="settings-dialog__close"
            onClick={closeSettings}
            aria-label={t.close}
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <Segmented
          label={t.textSize}
          value={fontSize}
          onChange={setFontSize}
          options={[
            { value: 'small', label: t.sizeSmall },
            { value: 'medium', label: t.sizeMedium },
            { value: 'large', label: t.sizeLarge },
          ]}
        />

        <Segmented
          label={t.typeface}
          value={typeface}
          onChange={setTypeface}
          options={[
            { value: 'editorial', label: t.faceEditorial },
            { value: 'modern', label: t.faceModern },
            { value: 'compact', label: t.faceCompact },
          ]}
        />

        <Segmented
          label={t.language}
          value={lang}
          onChange={setLang}
          options={[
            { value: 'en', label: t.langEnglish },
            { value: 'ar', label: t.langArabic },
          ]}
        />

        <Segmented
          label={t.theme}
          value={preference}
          onChange={setPreference}
          options={[
            { value: 'system', label: ui.themeShort.system },
            { value: 'light', label: ui.themeShort.light },
            { value: 'dark', label: ui.themeShort.dark },
          ]}
        />
      </div>
    </div>
  )
}
