import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Stats from './components/Stats'
import FAQ from './components/FAQ'
import Partners from './components/Partners'
import WorkTogether from './components/WorkTogether'
import Services from './components/Services'
import LatestNews from './components/LatestNews'
import Footer from './components/Footer'

function App() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* HOME SECTION */}
      <section id="home" className="pt-12 md:pt-20">
        <Hero />
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="pt-12 md:pt-20">
        <About />
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="pt-12 md:pt-20">
        <Services />
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="pt-12 md:pt-20">
        <WorkTogether />
        <Partners />
      </section>

      {/* PAGES SECTION */}
      <section id="pages" className="pt-12 md:pt-20">
        <FAQ />
        <Stats />
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="pt-12 md:pt-20">
        <LatestNews />
        <Footer />
      </section>
    </div>
  )
}

export default App
