/* ============================================================
   HOMEPAGE
   Composes the core sections and manages the onboarding/boot cycle
   ============================================================ */
import { useState } from 'react';
import Onboarding from '../components/Onboarding';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import ProjectCarousel from '../components/ProjectCarousel';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import OurPresence from '../components/OurPresence';
import Footer from '../components/Footer';

export default function HomePage() {
  const [onboardingComplete, setOnboardingComplete] = useState(() => {
    return sessionStorage.getItem('onboarding_shown') === 'true';
  });

  return (
    <>
      {/* Onboarding Loader Screen */}
      <Onboarding onComplete={() => setOnboardingComplete(true)} />

      {/* Main Layout */}
      <div className={`app-layout ${onboardingComplete ? 'is-ready' : ''}`}>
        <Navbar isVisible={onboardingComplete} />
        <main>
          <Hero isReady={onboardingComplete} />
          <About />
          <Services />
          <ProjectCarousel />
          <Stats />
          <Testimonials />
          <Contact />
          <OurPresence />
        </main>
        <Footer />
      </div>
    </>
  );
}
