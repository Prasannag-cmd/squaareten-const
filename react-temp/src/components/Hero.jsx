/* ============================================================
   HERO — Parallax & Text Reveal Animations
   ============================================================ */
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useHeroAnimation } from '../hooks/useGSAPAnimations';

export default function Hero({ isReady, onOpenEstimator }) {
  const heroRef = useRef(null);

  useHeroAnimation(heroRef, isReady);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero__bg">
        <img src="/assets/images/hero-bg.png" alt="Construction excellence" loading="eager" />
      </div>
      <div className="hero__overlay"></div>

      <div className="hero__shapes">
        <div className="hero__shape hero__shape--square"></div>
        <div className="hero__shape hero__shape--circle"></div>
        <div className="hero__shape hero__shape--line"></div>
      </div>

      <div className="container hero__content">
        <div className="hero__label">
          <span>Premium Construction</span>
        </div>

        <h1 className="hero__title">
          <span className="split-line"><span className="split-line__inner">We Build</span></span>
          <span className="split-line"><span className="split-line__inner"><span className="highlight">Extraordinary</span></span></span>
          <span className="split-line"><span className="split-line__inner">Spaces</span></span>
        </h1>

        <p className="hero__description">
          Transforming visions into architectural masterpieces. With over a decade of excellence,
          Squaareten Construction delivers world-class residential, commercial, and turnkey solutions
          that stand the test of time.
        </p>

        <div className="hero__actions">
          <Link to="/projects" className="btn btn--primary">View Our Work</Link>
          <a href="#contact" className="btn btn--outline">Get In Touch</a>
          <button className="btn btn--outline" onClick={onOpenEstimator}>Estimate Cost</button>
        </div>
      </div>

      <div className="hero__scroll">
        <span className="hero__scroll-text">Scroll</span>
        <div className="hero__scroll-line"></div>
      </div>
    </section>
  );
}
