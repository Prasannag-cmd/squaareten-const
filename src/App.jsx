/* ============================================================
   APP ENTRY — Routing & Global Elements
   ============================================================ */
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import KaruppiahNagarPage from './pages/KaruppiahNagarPage';
import ConsultationPage from './pages/ConsultationPage';
import GalleryPage from './pages/GalleryPage';
import CustomCursor from './components/CustomCursor';
import WhatsAppFAB from './components/WhatsAppFAB';

export default function App() {
  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    window.lenis = lenis;

    // Connect Lenis scroll events to ScrollTrigger updates
    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP ticker to run Lenis raf (requestAnimationFrame) loop
    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      window.lenis = null;
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  return (
    <Router>
      {/* Premium Custom Cursor (Desktop only) */}
      <CustomCursor />

      {/* Floating Action Buttons */}
      <WhatsAppFAB />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/consultation" element={<ConsultationPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/projects" element={<Navigate to="/projects/residential" replace />} />
        <Route path="/projects/karuppiah-nagar" element={<KaruppiahNagarPage />} />
        <Route path="/projects/:category" element={<ProjectsPage />} />
        <Route path="/projects/:category/:slug" element={<ProjectDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
