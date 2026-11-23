import { ArrowUp, Globe, Mail } from 'lucide-react'
import logo from '../assets/logo-badge-sm.webp'
import { BRAND, CONTACT, FOUNDER } from '../data/site'
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from './icons'

const QUICK = [
  { id: 'home', label: 'Home' }, { id: 'about', label: 'About' }, { id: 'services', label: 'Services' },
  { id: 'work', label: 'Our Work' }, { id: 'contact', label: 'Contact' },
]
const FOOT_SERVICES = ['Digital Marketing', 'Social Media Management', 'Meta Ads', 'Google Ads', 'Website Development', 'Portfolio Development', 'Video Editing', 'Content Creation']

export default function Footer() {
  const year = new Date().getFullYear()
  const social = [
    { label: 'BizzTalks on Instagram', href: CONTACT.instagram, Icon: InstagramIcon },
    { label: 'Chat on WhatsApp', href: `https://wa.me/${CONTACT.whatsappNumber}`, Icon: WhatsAppIcon },
    { label: 'Email BizzTalks', href: `mailto:${CONTACT.email}`, Icon: Mail },
  ]
  return (
    <footer className="relative z-10 mt-10 overflow-hidden border-t border-cyan/10 pb-10 pt-16">
      <div className="container-site">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.2fr]">
          <div>
            <a href="#home" className="flex items-center gap-3">
              <img src={logo} alt={`${BRAND.name} logo`} loading="lazy" width={36} height={47} className="h-12 w-auto" />
              <span className="font-display text-2xl font-bold text-frost">{BRAND.name}</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">{BRAND.tagline}</p>
            <div className="mt-6 flex gap-2">
              {social.map(({ label, href, Icon }) => (
                <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-ice/10 text-mist transition-all hover:-translate-y-0.5 hover:border-cyan/50 hover:text-cyan">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer quick links">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-frost">Quick Links</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {QUICK.map((q) => <li key={q.id}><a href={`#${q.id}`} className="text-mist transition-colors hover:text-frost">{q.label}</a></li>)}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-frost">Services</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {FOOT_SERVICES.map((s) => <li key={s}><a href="#services" className="text-mist transition-colors hover:text-frost">{s}</a></li>)}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-frost">Contact</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 text-mist hover:text-frost"><Mail className="h-4 w-4 text-cyan" />{CONTACT.email}</a></li>
              <li><a href={`https://wa.me/${CONTACT.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-mist hover:text-frost"><WhatsAppIcon className="h-4 w-4 text-cyan" />{CONTACT.whatsappDisplay}</a></li>
              <li><a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-mist hover:text-frost"><InstagramIcon className="h-4 w-4 text-cyan" />{CONTACT.instagramHandle}</a></li>
            </ul>

            <div className="mt-8 rounded-2xl border border-ice/10 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-mist">Founder</p>
              <p className="mt-1 font-display font-semibold text-frost">{FOUNDER.name}</p>
              <div className="mt-3 flex gap-2">
                {[
                  { l: 'Arijit Banerjee portfolio', h: FOUNDER.links.portfolio, I: Globe },
                  { l: 'Arijit Banerjee on Instagram', h: FOUNDER.links.instagram, I: InstagramIcon },
                  { l: 'Arijit Banerjee on LinkedIn', h: FOUNDER.links.linkedin, I: LinkedInIcon },
                  { l: 'WhatsApp Arijit Banerjee', h: FOUNDER.links.whatsapp, I: WhatsAppIcon },
                ].map(({ l, h, I }) => (
                  <a key={l} href={h} target="_blank" rel="noopener noreferrer" aria-label={l}
                    className="grid h-9 w-9 place-items-center rounded-full border border-ice/10 text-mist transition-colors hover:border-cyan/50 hover:text-cyan">
                    <I className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="pointer-events-none mt-16 select-none text-center font-display text-[18vw] font-bold leading-none tracking-[-0.06em] bg-gradient-to-b from-cyan/25 via-violet/10 to-transparent bg-clip-text text-transparent lg:text-[13.5rem]" aria-hidden="true">
          {BRAND.name}
        </p>
        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-ice/10 pt-8 text-xs text-mist sm:flex-row">
          <p>© {year} {BRAND.name}. All rights reserved.</p>
          <a href="#home" className="group inline-flex items-center gap-2 rounded-full border border-ice/10 px-4 py-2 transition-colors hover:border-cyan/50 hover:text-frost" aria-label="Back to top">
            Back to top <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
