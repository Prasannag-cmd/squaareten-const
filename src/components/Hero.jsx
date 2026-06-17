import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHeroAnimation } from '../hooks/useGSAPAnimations';

export default function Hero({ isReady }) {
  const heroRef = useRef(null);
  const imgRef = useRef(null);

  useHeroAnimation(heroRef, isReady);

  useEffect(() => {
    const hero = heroRef.current;
    const img = imgRef.current;
    if (!hero || !img) return;

    // Pre-scale on mount for smooth parallax padding
    img.style.transform = 'scale(1.04) translate3d(0, 0, 0)';

    const handleMouseMove = (e) => {
      // Check if mouse hover is supported to prevent mobile touch glitches
      if (!window.matchMedia('(hover: hover)').matches) return;

      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Normalize offsets to -0.5 to 0.5
      const percentX = (x / rect.width) - 0.5;
      const percentY = (y / rect.height) - 0.5;

      // Translate shift (max 25px)
      const maxTranslate = 25;
      const translateX = percentX * -maxTranslate;
      const translateY = percentY * -maxTranslate;

      img.style.transition = 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)';
      img.style.transform = `scale(1.08) translate3d(${translateX}px, ${translateY}px, 0)`;
    };

    const handleMouseLeave = () => {
      if (!window.matchMedia('(hover: hover)').matches) return;
      img.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
      img.style.transform = 'scale(1.04) translate3d(0, 0, 0)';
    };

    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      {/* Full screen background image wrapper */}
      <div className="hero__bg-wrapper">
        <img 
          ref={imgRef}
          src="/assets/images/office-clean.jpg" 
          alt="Squaare Ten Constructions Office" 
          className="hero__bg-img"
          loading="eager"
        />
        <div className="hero__bg-overlay"></div>
      </div>

      {/* Background blueprint grid overlay */}
      <div className="hero__grid-overlay"></div>
      
      {/* Subtle watermark overlay in the background */}
      <div className="hero__watermark">SQUAARE</div>

      <div className="hero__container">
        {/* Left Content Column */}
        <div className="hero__content-left">
          <span className="hero__tagline hero__label">DESIGNING THE LIFE OF THE FUTURE</span>
          <h1 className="hero__title">
            Building Spaces.<br />
            <span className="hero__title-accent">Inspiring Lives.</span>
          </h1>
          <p className="hero__description">
            Premium residential, commercial &amp; construction solutions across Tamil Nadu.
          </p>
          <div className="hero__actions">
            <Link to="/projects/residential" className="hero__btn hero__btn--solid">
              <span>Explore Projects</span>
              <svg className="hero__btn-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </Link>
            <Link to="/consultation" className="hero__btn hero__btn--outline">
              <span>Book Consultation</span>
              <svg className="hero__btn-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Stats Bar */}
      <div className="hero__stats-bar">
        {/* Stat Item 1 */}
        <div className="hero__stat-item">
          <div className="hero__stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="7" />
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
            </svg>
          </div>
          <div className="hero__stat-info">
            <h4 className="hero__stat-num">10+</h4>
            <p className="hero__stat-lbl">Years of Excellence</p>
          </div>
        </div>

        <div className="hero__stat-divider"></div>

        {/* Stat Item 2 */}
        <div className="hero__stat-item">
          <div className="hero__stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
              <line x1="9" y1="22" x2="9" y2="16" />
              <line x1="15" y1="22" x2="15" y2="16" />
              <line x1="9" y1="16" x2="15" y2="16" />
              <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M12 6h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
            </svg>
          </div>
          <div className="hero__stat-info">
            <h4 className="hero__stat-num">60+</h4>
            <p className="hero__stat-lbl">Projects Completed</p>
          </div>
        </div>

        <div className="hero__stat-divider"></div>

        {/* Stat Item 3 */}
        <div className="hero__stat-item">
          <div className="hero__stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />
              <path d="M12 2v2M8 4h8" />
              <path d="M4 22a8 8 0 0 1 16 0" />
            </svg>
          </div>
          <div className="hero__stat-info">
            <h4 className="hero__stat-num">Expert</h4>
            <p className="hero__stat-lbl">Team Members</p>
          </div>
        </div>

        <div className="hero__stat-divider"></div>

        {/* Stat Item 4 */}
        <div className="hero__stat-item">
          <div className="hero__stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4-4a1 1 0 0 0 0-1.4l-2-2" />
              <path d="m18 10.17 1.5-1.5a2 2 0 0 0-2.83-2.83L11 11.5M9 13.5l-3.5 3.5a2 2 0 1 1-2.83-2.83l3-3" />
              <path d="M12.5 7.5 10 10M14 9l-2.5 2.5M15.5 10.5 13 13" />
            </svg>
          </div>
          <div className="hero__stat-info">
            <h4 className="hero__stat-num">On Time</h4>
            <p className="hero__stat-lbl">Delivery</p>
          </div>
        </div>
      </div>
    </section>
  );
}
