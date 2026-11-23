import { CONTACT } from '../data/site'

export interface EnquiryForm {
  name: string
  business: string
  email: string
  phone: string
  service: string
  message: string
}

export type FormErrors = Partial<Record<keyof EnquiryForm, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^[+()\d\s-]{7,20}$/

export function validate(form: EnquiryForm): FormErrors {
  const errors: FormErrors = {}
  if (form.name.trim().length < 2) errors.name = 'Please enter your full name.'
  if (!form.email.trim()) errors.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(form.email.trim())) errors.email = 'That email address doesn’t look right.'
  if (form.phone.trim() && !PHONE_RE.test(form.phone.trim())) errors.phone = 'Please enter a valid phone number, or leave it blank.'
  if (form.message.trim().length < 10) errors.message = 'Please tell us a little about your project (at least 10 characters).'
  return errors
}

const or = (v: string) => (v.trim() ? v.trim() : 'Not provided')

export function buildMessage(form: EnquiryForm): string {
  return [
    'Hello BizzTalks!',
    'I would like to enquire about your services.',
    '',
    `Name: ${form.name.trim()}`,
    `Business: ${or(form.business)}`,
    `Email: ${form.email.trim()}`,
    `Phone: ${or(form.phone)}`,
    `Service Required: ${or(form.service)}`,
    '',
    'Project Details:',
    form.message.trim(),
    '',
    'Please contact me regarding this enquiry.',
  ].join('\n')
}

export function whatsappUrl(form: EnquiryForm): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(buildMessage(form))}`
}

export function mailtoUrl(form: EnquiryForm): string {
  // mailto bodies need CRLF line breaks to render reliably across mail apps
  const body = buildMessage(form).replace(/\n/g, '\r\n')
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(CONTACT.emailSubject)}&body=${encodeURIComponent(body)}`
}

export const plainWhatsapp = (text = 'Hello BizzTalks! I would like to discuss a project.') =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`

export const plainMailto = () =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(CONTACT.emailSubject)}`

// Lets "Get This Service" buttons pre-select a service in the contact form.
export const SERVICE_EVENT = 'bizztalks:select-service'
export function selectService(title: string) {
  window.dispatchEvent(new CustomEvent(SERVICE_EVENT, { detail: title }))
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}
