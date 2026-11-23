import { ArrowUpRight, Globe } from 'lucide-react'
import { FOUNDER } from '../data/site'
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from './icons'
import { Reveal, TiltCard } from './ui'

const LINKS = [
  { label: 'Portfolio', sub: 'arijit-banerjee-portfolio', href: FOUNDER.links.portfolio, Icon: Globe },
  { label: 'Instagram', sub: FOUNDER.links.instagramHandle, href: FOUNDER.links.instagram, Icon: InstagramIcon },
  { label: 'LinkedIn', sub: 'Arijit Banerjee', href: FOUNDER.links.linkedin, Icon: LinkedInIcon },
  { label: 'WhatsApp', sub: '+91 97489 89711', href: FOUNDER.links.whatsapp, Icon: WhatsAppIcon },
]

export default function Founder() {
  return (
    <section id="founder" className="relative py-20 sm:py-28" aria-labelledby="founder-heading">
      <div className="container-site">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <TiltCard className="mx-auto aspect-[4/5] w-full max-w-[360px] rounded-[2.5rem]" max={8}>
              <div className="glass noise relative flex h-full flex-col justify-between overflow-hidden rounded-[2.5rem] p-7">
                <div className="grid-lines absolute inset-0 opacity-70" aria-hidden="true" />
                <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan/20 blur-[80px]" aria-hidden="true" />
                <span className="eyebrow relative self-start">Founder</span>
                <div className="relative grid flex-1 place-items-center">
                  <div className="grid h-40 w-32 place-items-center rounded-full border-2 border-ice/70 shadow-[0_0_40px_rgba(124,156,255,0.25),inset_0_0_30px_rgba(124,156,255,0.12)]">
                    <span className="font-display text-5xl font-bold text-gradient">{FOUNDER.initials}</span>
                  </div>
                </div>
                <div className="relative">
                  <p className="font-display text-2xl font-bold text-frost">{FOUNDER.name}</p>
                  <p className="mt-1 text-sm text-mist">{FOUNDER.role}</p>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <div>
            <Reveal><span className="eyebrow">Meet the founder</span></Reveal>
            <Reveal delay={0.05}>
              <h2 id="founder-heading" className="h-display mt-5 text-[2.1rem] sm:text-5xl">
                The person behind <span className="accent">BizzTalks.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-mist sm:text-lg">
                {FOUNDER.bio.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Founder skills">
                {FOUNDER.skills.map((s) => <li key={s} className="chip">{s}</li>)}
              </ul>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {LINKS.map(({ label, sub, href, Icon }) => (
                  <a
                    key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="glass glow-border group flex items-center gap-3 rounded-2xl p-4 transition-transform hover:-translate-y-1"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan/10 text-cyan"><Icon className="h-5 w-5" /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-frost">{label}</span>
                      <span className="block truncate text-xs text-mist">{sub}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-mist transition-colors group-hover:text-frost" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
