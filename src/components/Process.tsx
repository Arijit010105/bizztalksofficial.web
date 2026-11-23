import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { PROCESS } from '../data/site'
import { Reveal, SectionHead, TiltCard } from './ui'

export default function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="container-site">
        <SectionHead
          eyebrow="Our Process"
          title="Four steps from idea to growth."
          accent={['growth.']}
          center
          intro="A simple, transparent way of working, so you always know what is happening and why."
        />

        <div ref={ref} className="relative">
          {/* timeline track: horizontal on desktop, vertical on mobile */}
          <div className="absolute left-6 top-0 h-full w-px bg-ice/10 lg:left-0 lg:top-[38px] lg:h-px lg:w-full" aria-hidden="true">
            <motion.div style={{ scaleY: fill }} className="h-full w-full origin-top bg-gradient-to-b from-cyan to-ice lg:hidden" />
            <motion.div style={{ scaleX: fill }} className="hidden h-full w-full origin-left bg-gradient-to-r from-cyan to-ice lg:block" />
          </div>

          <ol className="grid gap-6 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <li key={p.step} className="relative pl-16 lg:pl-0 lg:pt-20">
                <span className="absolute left-0 top-0 z-10 grid h-12 w-12 place-items-center rounded-full border border-cyan/40 bg-void font-display text-sm font-bold text-cyan shadow-[0_0_24px_rgba(124,156,255,0.25)] lg:top-[14px]">
                  {p.step}
                </span>
                <Reveal delay={i * 0.1}>
                  <TiltCard className="rounded-3xl" max={6}>
                    <div className="glass glow-border rounded-3xl p-6">
                      <h3 className="font-display text-2xl font-semibold tracking-tight text-frost">{p.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-mist">{p.text}</p>
                    </div>
                  </TiltCard>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
