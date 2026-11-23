import { BarChart3, Brush, Cpu, Globe, Lightbulb, TrendingUp } from 'lucide-react'
import logo from '../assets/logo-badge.webp'
import { SERVICES } from '../data/site'
import { Counter, Reveal, SplitHeading, TiltCard } from './ui'

const HIGHLIGHTS = [
  { icon: Lightbulb, title: 'Creative thinking', text: 'Ideas that make people stop and look.' },
  { icon: BarChart3, title: 'Data-driven marketing', text: 'Decisions backed by numbers, not guesses.' },
  { icon: Brush, title: 'Brand development', text: 'A consistent look, voice and story.' },
  { icon: Globe, title: 'Digital presence', text: 'Found everywhere your customers look.' },
  { icon: TrendingUp, title: 'Business growth', text: 'More enquiries, more customers.' },
  { icon: Cpu, title: 'Technology-driven', text: 'Automation, CRM and modern websites.' },
]

const ORBIT = ['Strategy', 'Content', 'Ads', 'Web', 'Video', 'Automation']

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container-site grid items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal><span className="eyebrow">About BizzTalks</span></Reveal>
          <SplitHeading
            text="More than a digital agency. Your growth partner."
            accent={['growth', 'partner']}
            className="h-display mt-5 text-[2.1rem] sm:text-5xl lg:text-[3.4rem]"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-relaxed text-mist sm:text-lg">
              BizzTalks brings creativity, digital strategy, marketing and technology together in one team. Instead of juggling a designer, an ads person, a web developer and a video editor, you get one partner who plans the strategy, makes the content, runs the campaigns, builds the website and automates the follow-ups, all pointed at the same goal: growing your business.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {HIGHLIGHTS.map((h, i) => (
              <li key={h.title}>
                <Reveal delay={0.05 * i} className="glass glow-border flex h-full gap-3 rounded-2xl p-4 transition-transform duration-300 hover:-translate-y-1">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan/10 text-cyan"><h.icon className="h-5 w-5" /></span>
                  <span>
                    <span className="block font-display font-semibold text-frost">{h.title}</span>
                    <span className="mt-0.5 block text-sm text-mist">{h.text}</span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal className="relative">
          <TiltCard className="mx-auto aspect-square w-full max-w-[480px] rounded-[2.5rem]" max={10}>
            <div className="glass relative grid h-full w-full place-items-center overflow-hidden rounded-[2.5rem]">
              <div className="grid-lines absolute inset-0 opacity-60" aria-hidden="true" />
              <div className="absolute h-[78%] w-[78%] rounded-full border border-dashed border-ice/15 animate-spin-slow" aria-hidden="true">
                {ORBIT.map((o, i) => {
                  const a = (i / ORBIT.length) * Math.PI * 2
                  return (
                    <span
                      key={o}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${50 + Math.cos(a) * 50}%`, top: `${50 + Math.sin(a) * 50}%` }}
                    >
                      <span className="inline-block animate-spin-slow rounded-full border border-ice/15 bg-ink/90 px-3 py-1 text-[11px] font-medium text-ice [animation-direction:reverse]">
                        {o}
                      </span>
                    </span>
                  )
                })}
              </div>
              <img
                src={logo}
                alt="BizzTalks badge logo"
                loading="lazy"
                width={305}
                height={397}
                className="relative w-[44%] animate-floaty drop-shadow-[0_0_40px_rgba(124,156,255,0.35)]"
                style={{ transform: 'translateZ(40px)' }}
              />
            </div>
          </TiltCard>
        </Reveal>
      </div>

      <div className="container-site mt-20">
        <Reveal>
          <div className="glass grid grid-cols-1 gap-8 rounded-3xl p-8 text-center sm:grid-cols-3 sm:p-10">
            <Counter to={SERVICES.length} label="Service areas under one roof" />
            <Counter to={3} suffix="+" label="Years of founder experience in social & digital marketing" />
            <Counter to={4} label="Step process from discovery to growth" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
