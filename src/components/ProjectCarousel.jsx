/* ============================================================
   PROJECT CAROUSEL — Auto-Playing Carousel with GSAP
   ============================================================ */
import { useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCarousel } from '../hooks/useCarousel';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../data/projectsData';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectCarousel() {
  // Select specific featured projects from the unified database
  const slides = useMemo(() => {
    const featuredIds = ['maha-groups-residence', 'swimming-pool-mannadimangalam', 'karuppiah-nagar'];
    return projectsData.filter(p => featuredIds.includes(p.id));
  }, []);

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

  const getSlideLink = (slide) => {
    if (slide.id === 'karuppiah-nagar') {
      return '/projects/karuppiah-nagar';
    }
    return `/projects/${slide.category}/${slide.id}`;
  };

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
              <Link to={getSlideLink(slide)} className="carousel__slide" key={i} style={{ display: 'block' }}>
                <img src={slide.img} alt={slide.name} className="carousel__slide-image" />
                <div className="carousel__slide-overlay"></div>
                <div className="carousel__slide-content">
                  <div className="carousel__slide-category">{slide.category.toUpperCase()}</div>
                  <h3 className="carousel__slide-title">{slide.name}</h3>
                  <p className="carousel__slide-desc">{slide.description}</p>
                </div>
              </Link>
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
