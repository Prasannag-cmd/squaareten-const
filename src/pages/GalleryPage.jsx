/* ============================================================
   GALLERY PAGE — Interactive Multi-Project Media Gallery
   ============================================================ */
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { projectsData } from '../data/projectsData';
import '../styles/gallery-page.css';

/* ── Project Showcase Card Component ──────────────────────── */
function ProjectShowcaseCard({ project, onZoom }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const images = useMemo(() => {
    return project.gallery && project.gallery.length > 0 ? project.gallery : [project.img];
  }, [project]);

  // Autoplay slideshow for each individual project card
  useEffect(() => {
    if (images.length <= 1) return;
    
    // Stagger start times slightly so not all slideshows animate in sync
    const randomDelay = Math.random() * 2000;
    const intervalTime = 4500 + randomDelay;
    
    const timer = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % images.length);
    }, intervalTime);
    
    return () => clearInterval(timer);
  }, [images.length]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setSlideIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSlideIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="gallery-project-card">
      {/* Interactive Media Slider */}
      <div className="gallery-project-card__slider">
        <div className="gallery-project-card__slides">
          {images.map((imgSrc, idx) => (
            <div
              key={idx}
              className={`gallery-project-card__slide ${idx === slideIndex ? 'is-active' : ''}`}
            >
              <img 
                src={imgSrc} 
                alt={`${project.name} photo ${idx + 1}`} 
                className="gallery-project-card__image" 
                loading="lazy" 
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button className="gallery-project-card__nav-btn prev" onClick={handlePrev} aria-label="Previous image">
              <span>‹</span>
            </button>
            <button className="gallery-project-card__nav-btn next" onClick={handleNext} aria-label="Next image">
              <span>›</span>
            </button>
            
            {/* Slide Pagination Dots */}
            <div className="gallery-project-card__dots">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  className={`gallery-project-card__dot ${idx === slideIndex ? 'is-active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSlideIndex(idx);
                  }}
                  aria-label={`Go to photo ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Fullscreen Magnifier Overlay */}
        <button 
          className="gallery-project-card__zoom-btn" 
          onClick={() => onZoom(project, slideIndex)}
          aria-label="View fullscreen slideshow"
        >
          <span className="zoom-icon">🔍</span>
          <span className="zoom-text">View Fullscreen</span>
        </button>
      </div>

      {/* Project Filled Content Info Panel */}
      <div className="gallery-project-card__info">
        <div className="gallery-project-card__header">
          <span className="gallery-project-card__category">{project.category}</span>
          {project.status && (
            <span className={`gallery-project-card__status ${project.status.toLowerCase()}`}>
              {project.status}
            </span>
          )}
        </div>
        <h3 className="gallery-project-card__title">{project.name}</h3>
        <div className="gallery-project-card__meta">
          <span className="meta-item">📍 {project.location}</span>
          {project.area && <span className="meta-item">📏 {project.area}</span>}
        </div>
        <p className="gallery-project-card__desc">{project.description}</p>
        <Link 
          to={project.id === 'karuppiah-nagar' ? '/projects/karuppiah-nagar' : `/projects/${project.category}/${project.id}`} 
          className="gallery-project-card__link"
        >
          Explore Project Details <span className="arrow">→</span>
        </Link>
      </div>
    </div>
  );
}

/* ── Main GalleryPage Component ───────────────────────────── */
export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    project: null,
    slideIndex: 0
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.remove('is-loading');
  }, []);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential' },
    { id: 'interior', label: 'Interior' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'plots', label: 'Plots' }
  ];

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projectsData;
    return projectsData.filter(project => project.category === activeCategory);
  }, [activeCategory]);

  // Featured projects list for the cinematic top hero slider
  const featuredSlides = useMemo(() => {
    return projectsData.filter(p => ['maha-groups-residence', 'swimming-pool-mannadimangalam', 'karuppiah-nagar', 'apex-chambers'].includes(p.id));
  }, []);

  // Auto-play top featured banner slideshow
  useEffect(() => {
    if (!featuredSlides.length) return;
    const timer = setInterval(() => {
      setFeaturedIndex(prev => (prev + 1) % featuredSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [featuredSlides.length]);

  // Open Lightbox
  const handleOpenLightbox = (project, index) => {
    setLightboxState({
      isOpen: true,
      project,
      slideIndex: index
    });
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  };

  // Close Lightbox
  const handleCloseLightbox = () => {
    setLightboxState({
      isOpen: false,
      project: null,
      slideIndex: 0
    });
    document.body.style.overflow = ''; // Release scroll lock
  };

  // Navigate lightbox slides
  const handleLightboxPrev = (e) => {
    if (e) e.stopPropagation();
    const images = lightboxState.project?.gallery || [lightboxState.project?.img];
    setLightboxState(prev => ({
      ...prev,
      slideIndex: prev.slideIndex === 0 ? images.length - 1 : prev.slideIndex - 1
    }));
  };

  const handleLightboxNext = (e) => {
    if (e) e.stopPropagation();
    const images = lightboxState.project?.gallery || [lightboxState.project?.img];
    setLightboxState(prev => ({
      ...prev,
      slideIndex: (prev.slideIndex + 1) % images.length
    }));
  };

  // Keyboard controls for lightbox
  useEffect(() => {
    if (!lightboxState.isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowLeft') handleLightboxPrev();
      if (e.key === 'ArrowRight') handleLightboxNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxState.isOpen, lightboxState.project]);

  return (
    <div className="gallery-page app-layout is-ready">
      <Navbar alwaysScrolled />

      <main className="gallery-main">
        {/* Top Featured Cinematic Slideshow */}
        <section className="gallery-featured">
          <div className="gallery-featured__slideshow">
            {featuredSlides.map((slide, idx) => {
              const isActive = idx === featuredIndex;
              return (
                <div 
                  key={slide.id} 
                  className={`gallery-featured__slide ${isActive ? 'is-active' : ''}`}
                >
                  <div className="gallery-featured__image-wrap">
                    <img src={slide.img} alt={slide.name} className="gallery-featured__image" />
                    <div className="gallery-featured__overlay" />
                  </div>
                  <div className="gallery-featured__content">
                    <span className="gallery-featured__tag">Featured Showcase</span>
                    <h2 className="gallery-featured__title">{slide.name}</h2>
                    <p className="gallery-featured__desc">{slide.description}</p>
                    <div className="gallery-featured__meta">
                      <span>📍 {slide.location}</span>
                      <span>📏 {slide.area || 'Premium Layout'}</span>
                    </div>
                    <Link to={slide.id === 'karuppiah-nagar' ? '/projects/karuppiah-nagar' : `/projects/${slide.category}/${slide.id}`} className="btn btn--primary">
                      View Project
                    </Link>
                  </div>
                </div>
              );
            })}

            {/* Slideshow Controls */}
            <div className="gallery-featured__controls">
              {featuredSlides.map((_, idx) => (
                <button
                  key={idx}
                  className={`gallery-featured__dot ${idx === featuredIndex ? 'is-active' : ''}`}
                  onClick={() => setFeaturedIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Media Explorer Section */}
        <section className="gallery-explorer">
          <div className="container">
            <div className="gallery-explorer__header">
              <span className="section__label">Visual Portfolio</span>
              <h2 className="section__title">Media Gallery</h2>
              <p className="section__desc">
                Explore our portfolio organized by individual projects. Each project features a complete, interactive slide deck detailing our architectural, interior, and commercial constructions.
              </p>
            </div>

            {/* Category Filter Bar */}
            <div className="gallery-filter-bar">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`gallery-filter-btn ${activeCategory === cat.id ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Showcase Grid */}
            <div className="gallery-grid">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <ProjectShowcaseCard
                    key={project.id}
                    project={project}
                    onZoom={handleOpenLightbox}
                  />
                ))
              ) : (
                <div className="gallery-empty">
                  <p>No projects found in this category.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Lightbox / Fullscreen Slideshow Portal */}
        {lightboxState.isOpen && lightboxState.project && (
          <div className="gallery-lightbox" onClick={handleCloseLightbox}>
            <button className="gallery-lightbox__close" onClick={handleCloseLightbox}>✕</button>
            
            {/* Nav Prev */}
            {(lightboxState.project.gallery || [lightboxState.project.img]).length > 1 && (
              <button className="gallery-lightbox__nav gallery-lightbox__nav--prev" onClick={handleLightboxPrev}>
                <span>‹</span>
              </button>
            )}
            
            <div className="gallery-lightbox__content" onClick={(e) => e.stopPropagation()}>
              <img 
                src={(lightboxState.project.gallery || [lightboxState.project.img])[lightboxState.slideIndex]} 
                alt={`${lightboxState.project.name} fullscreen`} 
                className="gallery-lightbox__img" 
              />
              <div className="gallery-lightbox__meta">
                <h3 className="gallery-lightbox__title">{lightboxState.project.name}</h3>
                <p className="gallery-lightbox__subtitle">📍 {lightboxState.project.location} | Category: {lightboxState.project.category.toUpperCase()}</p>
                <div className="gallery-lightbox__counter">
                  Photo {lightboxState.slideIndex + 1} of {(lightboxState.project.gallery || [lightboxState.project.img]).length}
                </div>
              </div>
            </div>

            {/* Nav Next */}
            {(lightboxState.project.gallery || [lightboxState.project.img]).length > 1 && (
              <button className="gallery-lightbox__nav gallery-lightbox__nav--next" onClick={handleLightboxNext}>
                <span>›</span>
              </button>
            )}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
