/* ============================================================
   KARUPPIAH NAGAR — Hero Section
   Fullscreen hero with GSAP animations
   ============================================================ */
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/karuppiah-nagar.css';

export default function HeroSection() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.kn-hero__badge', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 })
      .fromTo('.kn-hero__title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.3')
      .fromTo('.kn-hero__subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
      .fromTo('.kn-hero__cta', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 }, '-=0.3')
      .fromTo('.kn-hero__stats', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2');
  }, []);

  const scrollToPlots = () => {
    const el = document.getElementById('kn-masterplan');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="kn-hero" ref={heroRef}>
      <div className="kn-hero__overlay" />
      <div className="kn-hero__content" ref={contentRef}>
        <span className="kn-hero__badge">✦ SQUARETEN CONSTRUCTIONS PVT LTD</span>
        <h1 className="kn-hero__title">Karuppiah Nagar</h1>
        <p className="kn-hero__subtitle">
          Premium residential plots at Kovilpapakudi, Madurai — where tradition meets modern living.
        </p>
        <div className="kn-hero__cta-group kn-hero__cta">
          <button className="kn-btn kn-btn--primary" onClick={scrollToPlots}>
            Explore Master Plan
          </button>
          <a href="tel:+919150765025" className="kn-btn kn-btn--outline">
            Call Now
          </a>
        </div>
        <div className="kn-hero__stats">
          <div className="kn-hero__stat">
            <span className="kn-hero__stat-value">30+</span>
            <span className="kn-hero__stat-label">Premium Plots</span>
          </div>
          <div className="kn-hero__stat">
            <span className="kn-hero__stat-value">DTCP</span>
            <span className="kn-hero__stat-label">Approved</span>
          </div>
          <div className="kn-hero__stat">
            <span className="kn-hero__stat-value">100%</span>
            <span className="kn-hero__stat-label">Clear Title</span>
          </div>
        </div>
      </div>
      <div className="kn-hero__scroll-indicator">
        <span>Scroll to explore</span>
        <div className="kn-hero__scroll-line" />
      </div>
    </section>
  );
}
