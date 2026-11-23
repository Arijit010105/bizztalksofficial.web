import { motion, useReducedMotion } from 'framer-motion'
import { WHY } from '../data/site'
import { EASE, Reveal, SplitHeading } from './ui'

export default function Why() {
  const reduce = useReducedMotion()
  return (
    <section id="why" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute left-0 top-1/3 h-[420px] w-[420px] rounded-full bg-[#a27bff]/[0.06] blur-[120px]" aria-hidden="true" />
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal><span className="eyebrow">Why choose BizzTalks</span></Reveal>
          <SplitHeading
            text="Creativity meets strategy. Results follow."
            accent={['Results', 'follow.']}
            className="h-display mt-5 text-[2.1rem] sm:text-5xl lg:text-[3.6rem]"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-mist sm:text-lg">
              Good-looking content is easy to find. Content, ads and websites that work together to bring in customers is not. That is the gap BizzTalks fills.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a href="#contact" className="btn-primary mt-8">Start a conversation</a>
          </Reveal>
        </div>

        <ol className="space-y-4">
          {WHY.map((w, i) => (
            <motion.li
              key={w.title}
              initial={reduce ? false : { opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
              className="glass glow-border group flex gap-5 rounded-3xl p-6 transition-colors duration-300 hover:bg-white/[0.05] sm:gap-7 sm:p-7"
            >
              <span className="font-display text-3xl font-bold text-ice/20 transition-colors duration-300 group-hover:text-cyan sm:text-4xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-frost sm:text-xl">{w.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mist sm:text-base">{w.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
