import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight, Bot, ChartColumn, Check, Compass, Film, Globe, Megaphone, PenTool, Plus, Search, Target, TrendingUp, UserRound, Users,
} from 'lucide-react'
import { useState } from 'react'
import { SERVICES, type Service, type ServiceIcon } from '../data/site'
import { selectService } from '../lib/contact'
import { Reveal, SectionHead, TiltCard } from './ui'

const ICONS: Record<ServiceIcon, typeof Bot> = {
  trending: TrendingUp, users: Users, target: Target, search: Search, globe: Globe, user: UserRound,
  film: Film, pen: PenTool, compass: Compass, bot: Bot, chart: ChartColumn, megaphone: Megaphone,
}

function ServiceCard({ s, i }: { s: Service; i: number }) {
  const [open, setOpen] = useState(false)
  const Icon = ICONS[s.icon]
  const preview = s.items.slice(0, 3)
  const panelId = `svc-${s.id}`
  return (
    <Reveal delay={(i % 3) * 0.08} className="h-full">
      <TiltCard className="h-full rounded-3xl" max={5}>
        <article className="glass glow-border flex h-full flex-col rounded-3xl p-6 sm:p-7">
          <div className="flex items-start justify-between">
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan/20 bg-gradient-to-br from-cyan/20 to-violet/10 text-cyan shadow-[0_0_24px_-6px_rgba(124,156,255,0.6)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
              <Icon className="h-6 w-6" strokeWidth={1.6} />
            </span>
            <span className="font-display text-sm font-semibold text-mist/60">{s.letter}</span>
          </div>
          <h3 className="mt-6 font-display text-xl font-semibold text-frost">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-mist">{s.blurb}</p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${s.title} highlights`}>
            {preview.map((it) => <li key={it} className="chip">{it}</li>)}
          </ul>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={panelId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <ul className="mt-5 space-y-2 border-t border-ice/10 pt-5">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-center gap-2.5 text-sm text-ice">
                      <Check className="h-4 w-4 shrink-0 text-cyan" /> {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-auto flex items-center justify-between gap-3 pt-6">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls={panelId}
              className="inline-flex items-center gap-1.5 text-sm text-mist transition-colors hover:text-frost"
            >
              <Plus className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-45' : ''}`} />
              {open ? 'Show less' : `All ${s.items.length} inclusions`}
            </button>
            <button
              type="button"
              onClick={() => selectService(s.title)}
              className="inline-flex items-center gap-1 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 text-[13px] font-semibold text-cyan transition-all hover:border-transparent hover:bg-gradient-to-r hover:from-cyan-deep hover:to-violet-deep hover:text-white"
            >
              Get This Service <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </article>
      </TiltCard>
    </Reveal>
  )
}

export default function Services() {
  const words = SERVICES.map((s) => s.title)
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="container-site">
        <SectionHead
          eyebrow="Our Services"
          title="Everything your brand needs to grow online."
          accent={['grow', 'online.']}
          intro="Twelve services, one joined-up team. Pick a single service or combine them into a complete growth plan. Open any card to see exactly what is included."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => <ServiceCard key={s.id} s={s} i={i} />)}
        </div>
      </div>

      <div className="relative mt-20 overflow-hidden border-y border-ice/10 py-5" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-2xl font-semibold uppercase text-ice/20 sm:text-3xl">
          {[...words, ...words].map((w, i) => (
            <span key={i} className="flex items-center gap-10">{w}<span className="text-cyan/50">✦</span></span>
          ))}
        </div>
      </div>
    </section>
  )
}
