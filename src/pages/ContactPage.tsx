import { useState, type FormEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { useContent } from '../i18n/useContent'
import { Pane } from '../components/Shell'
import { Sym } from '../components/Sym'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/** Contact as a Mail compose window, already addressed to me. */
export function ContactPage() {
  const { profile, ui, mac } = useContent()
  const t = ui.form
  const location = useLocation()
  const presetSubject = (location.state as { subject?: string } | null)?.subject ?? ''
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    // Bots fill hidden fields; humans don't.
    if (data.get('_honey')) {
      setStatus('sent')
      form.reset()
      return
    }

    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setError(t.validationError)
      return
    }

    setStatus('sending')
    setError('')

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject: data.get('subject') || t.defaultSubject,
          message,
          _template: 'table',
        }),
      })
      if (!response.ok) throw new Error('Could not send message')
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
      setError(t.networkError)
    }
  }

  const busy = status === 'sending'

  return (
    <Pane
      title={mac.sections[6].label}
      subtitle={ui.contactDescription(profile.location)}
      actions={
        <>
          <a
            className="g-btn icon"
            href={profile.cvUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={ui.downloadCv}
            title={ui.downloadCv}
          >
            <Sym name="clip" />
          </a>
          <button className="g-btn tint" type="submit" form="compose" disabled={busy}>
            <Sym name="send" className="flip-rtl" />
            {busy ? t.sending : t.send}
          </button>
        </>
      }
    >
      <form id="compose" className="mail" onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="_honey"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ display: 'none' }}
        />
        <div className="mail-field">
          <span>{mac.t.to}</span>
          <span className="token">{profile.name}</span>
        </div>
        <label className="mail-field">
          <span>{mac.t.from}</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder={t.emailPlaceholder}
            aria-label={t.email}
            disabled={busy}
          />
        </label>
        <label className="mail-field">
          <span>{mac.t.name}:</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder={t.namePlaceholder}
            aria-label={t.name}
            disabled={busy}
          />
        </label>
        <label className="mail-field">
          <span>{t.subject}:</span>
          <input
            name="subject"
            type="text"
            defaultValue={presetSubject}
            placeholder={t.subjectPlaceholder}
            aria-label={t.subject}
            disabled={busy}
          />
        </label>
        <textarea
          className="mail-body"
          name="message"
          required
          rows={9}
          placeholder={t.messagePlaceholder}
          aria-label={t.message}
          disabled={busy}
        />
        {status === 'sent' && (
          <p className="form-status ok" role="status">
            {t.sent}
          </p>
        )}
        {status === 'error' && (
          <p className="form-status err" role="alert">
            {error} <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
        )}
        <p className="muted small">{t.note}</p>
      </form>

      <div className="reach">
        <span className="muted">{t.reachDirectly}</span>
        <a className="g-btn" href={`mailto:${profile.email}`}>
          <Sym name="mail" />
          Email
        </a>
        <a className="g-btn" href={profile.linkedin} target="_blank" rel="noreferrer">
          <Sym name="linkedin" />
          LinkedIn
        </a>
        <a className="g-btn" href={profile.github} target="_blank" rel="noreferrer">
          <Sym name="gh" />
          GitHub
        </a>
      </div>
    </Pane>
  )
}
