/* ============================================================
   PROJECT CAROUSEL — Auto-Playing Carousel with GSAP
   ============================================================ */
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCarousel } from '../hooks/useCarousel';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { img: '/assets/images/project-residential.png', alt: 'Residential project', category: 'Residential', title: 'Sunrise Residences', desc: 'A luxurious gated community with 48 premium villas featuring contemporary architecture.' },
  { img: '/assets/images/pool-image-1.jpeg', alt: 'Swimming pool project', category: 'Swimming Pool', title: 'Swimming Pool at Mannadimangalam', desc: 'A luxury private concrete swimming pool with state-of-the-art filtration and lighting.' },
  { img: '/assets/images/project-villa.png', alt: 'Villa project', category: 'Villa', title: 'The Grand Estate', desc: 'An ultra-luxury 8,500 sq.ft. villa with infinity pool and Italian marble throughout.' },
  { img: '/assets/images/project-renovation.png', alt: 'Renovation project', category: 'Renovation', title: 'Heritage Revival', desc: 'A stunning transformation of a 1960s bungalow into a modern smart home.' },
  { img: '/assets/images/thirupaalai-image-1.jpeg', alt: 'Residential project', category: 'Residential', title: 'Thirupaalai Residence', desc: 'A modern contemporary premium residential project under construction in Madurai.' },
  { img: '/assets/images/bonita-image-1.jpeg', alt: 'Salon project', category: 'Interior', title: 'Bonita Hair & Skin Care', desc: 'A premium salon and wellness space designed and executed with modern interiors.' },
];

export default function ProjectCarousel() {
  const {
    currentIndex,
    trackRef,
    progressBarRef,
    carouselRef,
    goNext,
    goPrev,
    goToDot,
    onDragStart,
    onDragEnd,
    onMouseEnter,
    onMouseLeave,
  } = useCarousel(slides.length, 4000);

  const sectionRef = useRef(null);

  // ScrollTrigger entrance animation
  useEffect(() => {
    if (!carouselRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(carouselRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section projects" id="projects" ref={sectionRef}>
      <div className="container">
        <div className="projects__header">
          <div className="projects__header-row">
            <div>
              <span className="section__label">Our Portfolio</span>
              <h2 className="section__title">Featured Projects</h2>
              <p className="section__subtitle">A showcase of excellence — explore our finest constructions that have defined skylines.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
              <div className="carousel__counter hide-mobile">
                <span className="carousel__counter-current">{String(currentIndex + 1).padStart(2, '0')}</span>
                <span>/ {String(slides.length).padStart(2, '0')}</span>
              </div>
              <Link to="/projects" className="btn btn--outline" style={{ whiteSpace: 'nowrap' }}>View All →</Link>
            </div>
          </div>
        </div>

        <div
          className="carousel"
          ref={carouselRef}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div
            className="carousel__track"
            ref={trackRef}
            onMouseDown={onDragStart}
            onTouchStart={onDragStart}
            onMouseUp={onDragEnd}
            onTouchEnd={onDragEnd}
          >
            {slides.map((slide, i) => (
              <div className="carousel__slide" key={i}>
                <img src={slide.img} alt={slide.alt} className="carousel__slide-image" />
                <div className="carousel__slide-overlay"></div>
                <div className="carousel__slide-content">
                  <div className="carousel__slide-category">{slide.category}</div>
                  <h3 className="carousel__slide-title">{slide.title}</h3>
                  <p className="carousel__slide-desc">{slide.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel__nav">
            <div className="carousel__dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`carousel__dot ${i === currentIndex ? 'is-active' : ''}`}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => goToDot(i)}
                />
              ))}
            </div>
            <div className="carousel__progress">
              <div className="carousel__progress-bar" ref={progressBarRef}></div>
            </div>
            <div className="carousel__arrows">
              <button className="carousel__arrow carousel__arrow--prev" aria-label="Previous" onClick={goPrev}>←</button>
              <button className="carousel__arrow carousel__arrow--next" aria-label="Next" onClick={goNext}>→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
