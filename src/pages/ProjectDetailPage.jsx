/* ============================================================
   PROJECT DETAIL PAGE — Individual Project View
   Premium editorial layout with gallery and story
   ============================================================ */
import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { projectsData } from '../data/projectsData';

gsap.registerPlugin(ScrollTrigger);

/* ── Location Pin SVG ────────────────────────────────── */
const LocationPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

/* ── Project Slideshow Component ─────────────────────── */
function ProjectSlideshow({ images, name }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const nextSlide = useCallback((e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback((e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard controls for fullscreen
  useEffect(() => {
    if (!fullscreen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') setFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreen, nextSlide, prevSlide]);

  if (!images || !images.length) return null;

  return (
    <div className="pd-slideshow-container">
      {/* Main Slide Display */}
      <div className="pd-slideshow">
        <button className="pd-slideshow__nav pd-slideshow__nav--prev" onClick={prevSlide} aria-label="Previous image">
          <span>←</span>
        </button>
        <button className="pd-slideshow__nav pd-slideshow__nav--next" onClick={nextSlide} aria-label="Next image">
          <span>→</span>
        </button>

        <div className="pd-slideshow__display" onClick={() => setFullscreen(true)}>
          <img 
            src={images[currentIndex]} 
            alt={`${name} - Slide ${currentIndex + 1}`} 
            className="pd-slideshow__img"
          />
          <button 
            className="pd-slideshow__fullscreen-btn" 
            onClick={(e) => { e.stopPropagation(); setFullscreen(true); }}
            aria-label="View full screen"
          >
            <span>⛶ Full Screen</span>
          </button>
        </div>

        <div className="pd-slideshow__counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="pd-slideshow__thumbnails">
          {images.map((img, idx) => (
            <button
              key={idx}
              className={`pd-slideshow__thumbnail ${idx === currentIndex ? 'is-active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Portal */}
      {fullscreen && (
        <div className="pd-lightbox" onClick={() => setFullscreen(false)}>
          <button className="pd-lightbox__close" onClick={() => setFullscreen(false)}>✕</button>
          {images.length > 1 && (
            <>
              <button
                className="pd-lightbox__nav pd-lightbox__nav--prev"
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              >
                ←
              </button>
              <button
                className="pd-lightbox__nav pd-lightbox__nav--next"
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              >
                →
              </button>
            </>
          )}
          <img
            className="pd-lightbox__image"
            src={images[currentIndex]}
            alt={`${name} — Photo ${currentIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="pd-lightbox__counter">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectDetailPage() {
  const { category, slug } = useParams();
  const navigate = useNavigate();
  const pageRef = useRef(null);

  const project = projectsData.find(p => p.id === slug);

  // Redirect to custom page if project has its own dedicated page
  useEffect(() => {
    if (project?.isCustomPage) {
      navigate(`/projects/${project.id}`, { replace: true });
    }
  }, [project, navigate]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.remove('is-loading');
  }, [slug]);

  // Animations
  useEffect(() => {
    if (!pageRef.current || !project) return;

    const ctx = gsap.context(() => {
      // Hero image cinematic zoom
      gsap.fromTo('.pd-hero__image',
        { scale: 1.05 },
        { scale: 1, duration: 8, ease: 'none' }
      );

      // Content reveal
      gsap.fromTo('.pd-hero__content',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' }
      );

      // Story section reveal
      gsap.fromTo('.pd-story',
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pd-story',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Slideshow/Gallery reveal
      gsap.fromTo('.pd-gallery-section',
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pd-gallery-section',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Videos section reveal
      if (project.videos && project.videos.length > 0) {
        gsap.fromTo('.pd-videos',
          { opacity: 0, y: 25 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: {
              trigger: '.pd-videos',
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Map Section reveal
      gsap.fromTo('.pd-map',
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pd-map',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Features reveal
      gsap.fromTo('.pd-features',
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pd-features',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // CTA reveal
      gsap.fromTo('.pd-cta__content',
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pd-cta',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, pageRef.current);

    return () => ctx.revert();
  }, [project]);

  // Helper function to resolve Google Maps embed source dynamically
  const getMapEmbedUrl = (proj) => {
    if (proj.mapEmbedUrl) {
      return proj.mapEmbedUrl;
    }
    // Generate using location name
    return `https://maps.google.com/maps?q=${encodeURIComponent(proj.location || proj.name)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  };

  // 404 fallback
  if (!project) {
    return (
      <div className="app-layout is-ready" ref={pageRef}>
        <Navbar alwaysScrolled />
        <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: 'var(--fs-h1)', marginBottom: 'var(--space-lg)' }}>Project Not Found</h1>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-2xl)' }}>The project you're looking for doesn't exist.</p>
            <Link to="/projects" className="btn btn--primary">Back to Projects</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const statusClass = project.status.toLowerCase();

  return (
    <div className="project-detail-page app-layout is-ready" ref={pageRef}>
      <Navbar alwaysScrolled />

      <main>
        {/* ── Hero ────────────────────────────────────── */}
        <section className="pd-hero">
          <div className="pd-hero__image-wrap">
            <img className="pd-hero__image" src={project.img} alt={project.name} loading="eager" />
            <div className="pd-hero__overlay" />
          </div>
          <div className="pd-hero__content">
            <button className="pd-hero__back" onClick={() => navigate(`/projects/${project.category}`)}>
              ← Back to {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
            </button>
            <span className={`pd-hero__status pd-hero__status--${statusClass}`}>
              {project.status}
            </span>
            <h1 className="pd-hero__title">{project.name}</h1>
            {project.mapUrl ? (
              <a href={project.mapUrl} target="_blank" rel="noopener noreferrer" className="pd-hero__location pd-hero__location--link">
                <LocationPin />
                {project.location}
              </a>
            ) : (
              <div className="pd-hero__location">
                <LocationPin />
                {project.location}
              </div>
            )}
            <p className="pd-hero__desc">{project.description}</p>

            {/* Quick info */}
            <div className="pd-hero__meta">
              {project.area && (
                <div className="pd-hero__meta-item">
                  <span className="pd-hero__meta-label">Area</span>
                  <span className="pd-hero__meta-value">{project.area}</span>
                </div>
              )}
              {project.year && (
                <div className="pd-hero__meta-item">
                  <span className="pd-hero__meta-label">Year Completed</span>
                  <span className="pd-hero__meta-value">{project.year}</span>
                </div>
              )}
              {project.price && (
                <div className="pd-hero__meta-item">
                  <span className="pd-hero__meta-label">Price</span>
                  <span className="pd-hero__meta-value">{project.price}</span>
                </div>
              )}
              {project.bedrooms && (
                <div className="pd-hero__meta-item">
                  <span className="pd-hero__meta-label">Config</span>
                  <span className="pd-hero__meta-value">{project.bedrooms}</span>
                </div>
              )}
              {project.progress !== undefined && (
                <div className="pd-hero__meta-item">
                  <span className="pd-hero__meta-label">Progress</span>
                  <span className="pd-hero__meta-value">{project.progress}%</span>
                </div>
              )}
              {project.approval && (
                <div className="pd-hero__meta-item">
                  <span className="pd-hero__meta-label">Approval</span>
                  <span className="pd-hero__meta-value">{project.approval}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Story ───────────────────────────────────── */}
        {project.story && (
          <section className="pd-story">
            <div className="container">
              <span className="section__label">The Design Journey</span>
              <div className="pd-story__content">
                <h2 className="pd-story__heading">About This Project</h2>
                <p className="pd-story__text">{project.story}</p>
              </div>
            </div>
          </section>
        )}

        {/* ── Progress (Ongoing) ──────────────────────── */}
        {project.progress !== undefined && (
          <section className="pd-progress">
            <div className="container">
              <div className="pd-progress__card">
                <div className="pd-progress__header">
                  <h3 className="pd-progress__title">Construction Progress</h3>
                  <span className="pd-progress__pct">{project.progress}%</span>
                </div>
                <div className="pd-progress__track">
                  <div className="pd-progress__fill" style={{ width: `${project.progress}%` }} />
                </div>
                <div className="pd-progress__info">
                  <div>
                    <span className="pd-progress__label">Current Phase</span>
                    <span className="pd-progress__value">{project.phase}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="pd-progress__label">Expected Completion</span>
                    <span className="pd-progress__value">{project.expectedCompletion}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Slideshow Gallery ───────────────────────── */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="pd-gallery-section">
            <div className="container">
              <span className="section__label">Gallery</span>
              <h2 className="pd-gallery-section__title">Project Showcases</h2>
              <ProjectSlideshow images={project.gallery} name={project.name} />
            </div>
          </section>
        )}

        {/* ── Videos ──────────────────────────────────── */}
        {project.videos && project.videos.length > 0 && (
          <section className="pd-videos">
            <div className="container">
              <span className="section__label">Cinematics</span>
              <h2 className="pd-videos__title">Site Walks & Video Walkthroughs</h2>
              <div className="pd-videos__grid">
                {project.videos.map((vid, i) => (
                  <div key={i} className="pd-videos__item">
                    <video src={vid} controls preload="metadata" playsInline />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Google Map Location ────────────────────── */}
        <section className="pd-map">
          <div className="container">
            <span className="section__label">Map View</span>
            <h2 className="pd-map__heading">Google Map Location</h2>
            <div className="pd-map__frame-wrap">
              <iframe
                title={`Map showing location of ${project.name}`}
                src={getMapEmbedUrl(project)}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            {project.mapUrl && (
              <div className="pd-map__action-wrap">
                <a
                  href={project.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline pd-map__btn"
                >
                  Open in Google Maps
                </a>
              </div>
            )}
          </div>
        </section>

        {/* ── Features ────────────────────────────────── */}
        {project.features && project.features.length > 0 && (
          <section className="pd-features">
            <div className="container">
              <span className="section__label">Technical specifications</span>
              <h2 className="pd-features__title">Key Highlights & Inclusions</h2>
              <div className="pd-features__grid">
                {project.features.map((feature, i) => (
                  <div className="pd-features__item" key={i}>
                    <div className="pd-features__check">✓</div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Contact CTA ─────────────────────────────── */}
        <section className="pd-cta">
          <div className="container">
            <div className="pd-cta__content">
              <h2 className="pd-cta__heading">Interested in This Project?</h2>
              <p className="pd-cta__text">
                Get in touch with our team to learn more, schedule a site visit, or discuss your requirements.
              </p>
              <div className="pd-cta__actions">
                <Link to="/#contact" className="btn btn--primary">Get In Touch</Link>
                <Link to={`/projects/${project.category}`} className="btn btn--outline">View Similar Projects</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
