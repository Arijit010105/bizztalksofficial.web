import { Mail } from 'lucide-react'
import { plainMailto, plainWhatsapp } from '../lib/contact'
import { WhatsAppIcon } from './icons'
import { Reveal, SplitHeading } from './ui'

export default function FinalCTA() {
  return (
    <section className="relative py-16 sm:py-24" aria-labelledby="cta-heading">
      <div className="container-site">
        <div className="noise glass relative overflow-hidden rounded-[2.5rem] px-6 py-16 text-center sm:px-12 sm:py-24">
          <div className="aurora pointer-events-none absolute -top-48 left-1/2 h-[460px] w-[760px] -translate-x-1/2" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-6 rounded-[2rem] border border-ice/10 sm:inset-8" aria-hidden="true" />
          <div className="relative" id="cta-heading">
            <SplitHeading
              text="Ready to take your business to the next level?"
              accent={['next', 'level?']}
              className="h-display mx-auto max-w-4xl text-[2rem] sm:text-5xl lg:text-6xl"
            />
          </div>
          <Reveal delay={0.15}>
            <p className="relative mx-auto mt-6 max-w-xl text-base text-mist sm:text-lg">
              Let&rsquo;s discuss your ideas and create a digital strategy that works for your business.
            </p>
            <div className="relative mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={plainWhatsapp('Hello BizzTalks! I would like to start a project.')} target="_blank" rel="noopener noreferrer" className="btn-wa !px-8 !py-4 text-base">
                <WhatsAppIcon /> Start a Project
              </a>
              <a href={plainMailto()} className="btn-ghost !px-8 !py-4 text-base">
                <Mail className="h-5 w-5" /> Send an Email
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
