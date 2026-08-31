import { useState, type FormEvent } from 'react'
import { profile } from '../data/content'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function Contact({ hideIntro = false }: { hideIntro?: boolean }) {
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
      setError('Add your name, a valid email, and a message.')
      return
    }

    setStatus('sending')
    setError('')

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${profile.email}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            subject: data.get('subject') || 'Portfolio contact',
            message,
            _template: 'table',
          }),
        },
      )

      if (!response.ok) {
        throw new Error('Could not send message')
      }

      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
      setError('Something went wrong. Email me directly instead.')
    }
  }

  return (
    <section className="section contact">
      {!hideIntro && (
        <div className="section-head">
          <h2>Let&apos;s talk</h2>
          <p>
            Open to full-stack, AI engineering, and research collaborations.
            Based in {profile.location}.
          </p>
        </div>
      )}

      <div className="contact-layout">
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ display: 'none' }}
          />
          <div className="field-row">
            <label className="field">
              <span>Name</span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Your name"
                disabled={status === 'sending'}
              />
            </label>
            <label className="field">
              <span>Email</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                disabled={status === 'sending'}
              />
            </label>
          </div>

          <label className="field">
            <span>Subject</span>
            <input
              name="subject"
              type="text"
              placeholder="What is this about?"
              disabled={status === 'sending'}
            />
          </label>

          <label className="field">
            <span>Message</span>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell me about the role, project, or collaboration."
              disabled={status === 'sending'}
            />
          </label>

          <div className="form-actions">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            {status === 'sent' && (
              <p className="form-status ok" role="status">
                Message sent — I&apos;ll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="form-status err" role="alert">
                {error}{' '}
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </p>
            )}
          </div>

          <p className="contact-form__note">
            Sent via formsubmit.co — your name, email, and message are emailed to
            me and not stored on this site.
          </p>
        </form>

        <aside className="contact-aside">
          <p className="aside-label">Or reach me directly</p>
          <a className="aside-link" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <div className="contact-links">
            <a
              className="btn btn-ghost"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="btn btn-ghost"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </aside>
      </div>
    </section>
  )
}
