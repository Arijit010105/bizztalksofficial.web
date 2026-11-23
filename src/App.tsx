import { MotionConfig } from 'framer-motion'
import About from './components/About'
import Contact from './components/Contact'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import Founder from './components/Founder'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Process from './components/Process'
import Services from './components/Services'
import Why from './components/Why'
import Work from './components/Work'
import { CursorGlow } from './components/ui'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ice focus:px-4 focus:py-2 focus:text-void">
        Skip to content
      </a>
      <div className="galaxy" aria-hidden="true" />
      <CursorGlow />
      <Nav />
      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Work />
        <Why />
        <Process />
        <FinalCTA />
        <Contact />
        <Founder />
      </main>
      <Footer />
    </MotionConfig>
  )
}
