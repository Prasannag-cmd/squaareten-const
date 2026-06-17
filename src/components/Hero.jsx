import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useHeroAnimation } from '../hooks/useGSAPAnimations';

const slides = [
  {
    image: '/assets/images/hero-bg-ai.png',
    alt: 'Luxury Architectural Design Render'
  },
  {
    image: '/assets/images/tamilnadu-presence-landscape.jpg',
    imageMobile: '/assets/images/tamilnadu-presence-portrait.jpg',
    alt: 'Squaareten Constructions Tamil Nadu Presence Map'
  },
  {
    image: '/assets/images/pool-image-1.jpeg',
    alt: 'Premium Modern Architecture with Pool'
  },
  {
    image: '/assets/images/project-villa.png',
    alt: 'Modern Residential Villa Elevation'
  },
  {
    image: '/assets/images/project-duplex-main.jpg',
    alt: 'Premium Duplex Construction Facade'
  }
];

export default function Hero({ isReady }) {
  const heroRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useHeroAnimation(heroRef, isReady);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Auto-change slide every 6 seconds

    return () => clearInterval(timer);
  }, []);

  const handleIndicatorClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="hero" id="hero" ref={heroRef}>
      {/* Background Slideshow (Acts as the background wrapper for GSAP entry fade) */}
      <div className="hero__bg-wrapper">
        {slides.map((slide, idx) => (
          <div 
            key={idx} 
            className={`hero__slide ${idx === currentSlide ? 'is-active' : ''}`}
          >
            <picture className="hero__slide-pic">
              {slide.imageMobile && (
                <source media="(max-width: 768px)" srcSet={slide.imageMobile} />
              )}
              <img 
                src={slide.image} 
                alt={slide.alt} 
                className="hero__slide-img"
                loading={idx === 0 ? "eager" : "lazy"}
              />
            </picture>
          </div>
        ))}
        <div className="hero__bg-overlay"></div>
      </div>

      {/* Technical Drafting Grid Overlay */}
      <div className="hero__grid-overlay"></div>
      
      {/* Deep Watermark Branding */}
      <div className="hero__watermark">SQUAARE</div>

      <div className="hero__container">
        {/* Left Column: Floating Information and Actions */}
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

        {/* Minimalist Slideshow Indicators */}
        <div className="hero__indicators">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`hero__indicator-dot ${idx === currentSlide ? 'is-active' : ''}`}
              onClick={() => handleIndicatorClick(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
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
