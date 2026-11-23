import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, ArrowUpRight, Check, ChevronDown, Copy, Info, Mail } from 'lucide-react'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { CONTACT, SERVICES } from '../data/site'
import { SERVICE_EVENT, mailtoUrl, validate, whatsappUrl, type EnquiryForm, type FormErrors } from '../lib/contact'
import { InstagramIcon, WhatsAppIcon } from './icons'
import { Reveal, SectionHead } from './ui'

const EMPTY: EnquiryForm = { name: '', business: '', email: '', phone: '', service: '', message: '' }
const SERVICE_OPTIONS = [...SERVICES.map((s) => s.title), 'Complete growth package (multiple services)', 'Not sure yet – need advice']
const ORDER: (keyof EnquiryForm)[] = ['name', 'business', 'email', 'phone', 'service', 'message']

type Status = { channel: 'whatsapp' | 'email'; href: string } | null

function Field({
  id, label, required, error, children,
}: { id: keyof EnquiryForm; label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <label htmlFor={id} className="pointer-events-none absolute left-4 top-2 text-[11px] font-medium uppercase tracking-wider text-mist">
        {label} {required ? <span className="text-cyan" aria-hidden="true">*</span> : <span className="normal-case tracking-normal text-mist/60">(optional)</span>}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mt-1.5 flex items-center gap-1.5 text-xs text-red-300"
            role="alert"
          >
            <AlertCircle className="h-3.5 w-3.5" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [done, setDone] = useState(false)
  return (
    <button
      type="button"
      aria-label={`Copy ${label}`}
      onClick={async () => {
        try { await navigator.clipboard.writeText(value); setDone(true); setTimeout(() => setDone(false), 1600) } catch { /* clipboard unavailable */ }
      }}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ice/10 text-mist transition-colors hover:border-ice/30 hover:text-frost"
    >
      {done ? <Check className="h-4 w-4 text-cyan" /> : <Copy className="h-4 w-4" />}
    </button>
  )
}

export default function Contact() {
  const [form, setForm] = useState<EnquiryForm>(EMPTY)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<Status>(null)
  const [flash, setFlash] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const onSelect = (e: Event) => {
      const title = (e as CustomEvent<string>).detail
      if (SERVICE_OPTIONS.includes(title)) {
        setForm((f) => ({ ...f, service: title }))
        setFlash(true)
        setTimeout(() => setFlash(false), 1400)
      }
    }
    window.addEventListener(SERVICE_EVENT, onSelect)
    return () => window.removeEventListener(SERVICE_EVENT, onSelect)
  }, [])

  const update = (k: keyof EnquiryForm) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...form, [k]: e.target.value }
    setForm(next)
    setStatus(null)
    if (touched) setErrors(validate(next))
  }

  const check = () => {
    setTouched(true)
    const errs = validate(form)
    setErrors(errs)
    const first = ORDER.find((k) => errs[k])
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus()
      return false
    }
    return true
  }

  const sendWhatsApp = () => {
    if (!check()) return
    const href = whatsappUrl(form)
    // A real link click is more reliable than window.open (popup blockers, in-app browsers).
    const a = document.createElement('a')
    a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer'
    document.body.appendChild(a); a.click(); a.remove()
    setStatus({ channel: 'whatsapp', href })
  }

  const sendEmail = () => {
    if (!check()) return
    const href = mailtoUrl(form)
    window.location.href = href
    setStatus({ channel: 'email', href })
  }

  const aria = (k: keyof EnquiryForm) => ({
    id: k, name: k, value: form[k], onChange: update(k),
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${k}-error` : undefined,
  })

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute right-0 top-1/4 h-[480px] w-[480px] rounded-full bg-cyan/[0.07] blur-[120px]" aria-hidden="true" />
      <div className="container-site">
        <SectionHead
          eyebrow="Contact"
          title="Let's build something great together."
          accent={['great', 'together.']}
          intro="Tell us a little about your business and what you need. We'll get back to you with ideas and next steps."
        />

        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] [&>*]:min-w-0">
          <Reveal>
            <form
              ref={formRef}
              noValidate
              onSubmit={(e) => { e.preventDefault(); sendWhatsApp() }}
              className="glass rounded-[2rem] p-5 sm:p-8"
              aria-label="Project enquiry form"
            >
              <div className="grid gap-4 sm:grid-cols-2 [&>*]:min-w-0">
                <Field id="name" label="Full name" required error={errors.name}>
                  <input {...aria('name')} type="text" autoComplete="name" required placeholder="Full name" className="field" />
                </Field>
                <Field id="business" label="Business / Brand" error={errors.business}>
                  <input {...aria('business')} type="text" autoComplete="organization" placeholder="Business name" className="field" />
                </Field>
                <Field id="email" label="Email address" required error={errors.email}>
                  <input {...aria('email')} type="email" autoComplete="email" inputMode="email" required placeholder="Email" className="field" />
                </Field>
                <Field id="phone" label="Phone number" error={errors.phone}>
                  <input {...aria('phone')} type="tel" autoComplete="tel" inputMode="tel" placeholder="Phone" className="field" />
                </Field>
                <div className="sm:col-span-2">
                  <Field id="service" label="Service required" error={errors.service}>
                    <select {...aria('service')} className={`field appearance-none pr-10 ${flash ? '!border-cyan !bg-cyan/10' : ''} ${form.service ? '' : 'text-mist'}`}>
                      <option value="">Choose a service</option>
                      {SERVICE_OPTIONS.map((s) => <option key={s} value={s} className="bg-ink text-frost">{s}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-[22px] h-4 w-4 text-mist" />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field id="message" label="Project details / message" required error={errors.message}>
                    <textarea {...aria('message')} rows={5} required placeholder="Message" className="field resize-y pt-7" />
                  </Field>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button type="submit" className="btn-wa w-full !py-4 text-[15px]">
                  <WhatsAppIcon /> Send on WhatsApp
                </button>
                <button type="button" onClick={sendEmail} className="btn-ghost w-full !py-4 text-[15px]">
                  <Mail className="h-5 w-5" /> Send by Email
                </button>
              </div>

              <p className="mt-4 flex gap-2 text-xs leading-relaxed text-mist">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Clicking a button opens WhatsApp or your email app with your message already written. Nothing is sent until you press Send there.
              </p>

              <AnimatePresence>
                {status && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                    role="status"
                  >
                    <div className="mt-4 rounded-2xl border border-cyan/25 bg-cyan/[0.06] p-4 text-sm text-ice">
                      {status.channel === 'whatsapp'
                        ? 'WhatsApp should now be open with your enquiry ready. Tap Send in WhatsApp to deliver it to us.'
                        : 'Your email app should now be open with your enquiry ready. Press Send in your email app to deliver it to us.'}{' '}
                      Didn&rsquo;t open?{' '}
                      <a href={status.href} target={status.channel === 'whatsapp' ? '_blank' : undefined} rel="noopener noreferrer" className="font-semibold text-cyan underline underline-offset-2">
                        Try again
                      </a>
                      {status.channel === 'email' && <> or email us directly at <span className="font-semibold text-frost">{CONTACT.email}</span>.</>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-4">
            <a
              href={`https://wa.me/${CONTACT.whatsappNumber}`}
              target="_blank" rel="noopener noreferrer"
              className="glass glow-border group flex items-center gap-4 rounded-3xl p-5 transition-transform hover:-translate-y-1"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#25d366]/15 text-[#25d366]"><WhatsAppIcon className="h-6 w-6" /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs uppercase tracking-widest text-mist">WhatsApp</span>
                <span className="block font-display text-lg font-semibold text-frost">{CONTACT.whatsappDisplay}</span>
              </span>
              <ArrowUpRight className="h-5 w-5 text-mist transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-frost" />
            </a>

            <div className="glass glow-border flex items-center gap-4 rounded-3xl p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan/10 text-cyan"><Mail className="h-6 w-6" /></span>
              <a href={`mailto:${CONTACT.email}`} className="min-w-0 flex-1">
                <span className="block text-xs uppercase tracking-widest text-mist">Email</span>
                <span className="block truncate font-display text-lg font-semibold text-frost hover:text-cyan">{CONTACT.email}</span>
              </a>
              <CopyButton value={CONTACT.email} label="email address" />
            </div>

            <a
              href={CONTACT.instagram}
              target="_blank" rel="noopener noreferrer"
              className="group relative flex items-center gap-4 overflow-hidden rounded-3xl p-5 text-white transition-transform hover:-translate-y-1"
              style={{ background: 'linear-gradient(120deg, #833ab4 0%, #c13584 45%, #f56040 80%, #fcaf45 100%)' }}
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/15"><InstagramIcon className="h-6 w-6" /></span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-lg font-semibold">Visit Our Instagram</span>
                <span className="block text-sm text-white/80">{CONTACT.instagramHandle}</span>
              </span>
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <div className="glass mt-auto rounded-3xl p-6">
              <p className="font-display text-lg font-semibold text-frost">What happens next?</p>
              <ol className="mt-3 space-y-2 text-sm text-mist">
                <li><span className="text-cyan">1.</span> We read your enquiry and ask anything we need to know.</li>
                <li><span className="text-cyan">2.</span> We suggest the services and plan that fit your goals.</li>
                <li><span className="text-cyan">3.</span> Once you&rsquo;re happy, we get to work.</li>
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
