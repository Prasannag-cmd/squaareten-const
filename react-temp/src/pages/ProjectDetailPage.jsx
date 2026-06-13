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

gsap.registerPlugin(ScrollTrigger);

/* ── All projects data (shared source of truth) ─────── */
const allProjects = [
  {
    id: 'luxury-villa-madurai',
    name: 'Luxury Villa Madurai',
    location: 'Madurai, Tamil Nadu',
    category: 'completed',
    status: 'Completed',
    img: '/assets/images/project-villa.png',
    description: 'A premium 4-bedroom luxury villa with contemporary design, private pool, and landscaped gardens spanning 4,500 sq.ft.',
    area: '4,500 sq.ft',
    year: '2024',
    story: 'Nestled in the heart of Madurai, this luxury villa redefines modern living. Every detail — from the imported Italian marble flooring to the custom-designed lighting — was meticulously crafted to create a space that feels both grand and intimate. The open floor plan connects indoor and outdoor living seamlessly, with floor-to-ceiling windows framing views of the lush private garden.',
    gallery: ['/assets/images/project-villa.png', '/assets/images/project-residential.png', '/assets/images/project-interior.png'],
    features: ['Private Swimming Pool', 'Landscaped Gardens', 'Smart Home Automation', 'Italian Marble Flooring', 'Home Theatre', 'Modular Kitchen'],
  },
  {
    id: 'sunrise-residences',
    name: 'Sunrise Residences',
    location: 'Nagudi, Aranthangi',
    category: 'completed',
    status: 'Completed',
    img: '/assets/images/project-nagudi-main.jpg',
    description: 'Modern 2 BHK residential home featuring a spacious veranda, dedicated vehicle parking, and landscaped gardening space.',
    area: '1,600 sq.ft',
    year: '2024',
    story: 'Sunrise Residences stands as a premium example of contemporary single-story home design. Featuring a spacious 2 BHK configuration (2 rooms, 1 kitchen, 1 hall), a welcoming veranda, dedicated vehicle parking, and landscaped gardening space, the home offers a perfect balance of comfort and modern aesthetics. The exterior combines textured stone cladding with warm horizontal wood-look panels and a sleek blue-grey canopy, creating a striking architectural statement in the Nagudi neighborhood.',
    gallery: [
      '/assets/images/project-nagudi-main.jpg',
      '/assets/images/project-nagudi-1.jpg',
      '/assets/images/project-nagudi-2.jpg',
      '/assets/images/project-nagudi-3.jpg'
    ],
    features: ['2 Spacious Bedrooms', 'Modern Kitchen & Hall', 'Welcoming Front Veranda', 'Dedicated Vehicle Parking', 'Landscaped Gardening Area', 'Premium Stone Cladding'],
  },
  {
    id: 'apex-business-tower',
    name: 'Apex Business Tower',
    location: 'Coimbatore, Tamil Nadu',
    category: 'completed',
    status: 'Completed',
    img: '/assets/images/project-commercial.png',
    description: 'A 12-floor commercial tower with Grade A office spaces, smart building systems, and rooftop conference facilities.',
    area: '78,000 sq.ft',
    year: '2024',
    story: 'Apex Business Tower represents the future of commercial architecture in Coimbatore. The 12-floor structure features intelligent building management systems, energy-efficient HVAC, and flexible floor plates that adapt to any business requirement. The rooftop conference facility offers panoramic city views.',
    gallery: ['/assets/images/project-commercial.png', '/assets/images/project-turnkey.png', '/assets/images/project-renovation.png'],
    features: ['Grade A Office Spaces', 'Smart Building Systems', 'Rooftop Conference Center', 'High-Speed Elevators', 'Underground Parking', 'Fiber Optic Connectivity'],
  },
  {
    id: 'heritage-revival',
    name: 'Modern Duplex Residence',
    location: 'Thanjavur, Tamil Nadu',
    category: 'completed',
    status: 'Completed',
    img: '/assets/images/project-duplex-main.jpg',
    description: 'A premium 3 BHK modern duplex residence featuring textured stone wall cladding, a spacious glass balcony, and bespoke interiors.',
    area: '3,200 sq.ft',
    year: '2024',
    story: 'This premium modern duplex residence represents a perfect fusion of bold contemporary architecture and high-end interior styling. Spanning two levels, the home features a custom-designed facade with textured grey stone cladding and geometric plaster bands. Inside, the spaces are designed for luxury living, starting with a grand living room with polished marble flooring and a custom backlit TV unit. A stunning structural staircase with glass panel balustrades leads to the upper level under a custom pattern skylight that filters beautiful natural light. Complete with premium bathroom fixtures and modern modular storage throughout, the residence offers a refined urban sanctuary.',
    gallery: [
      '/assets/images/project-duplex-main.jpg',
      '/assets/images/project-duplex-1.jpg',
      '/assets/images/project-duplex-2.jpg',
      '/assets/images/project-duplex-3.jpg',
      '/assets/images/project-duplex-4.jpg'
    ],
    features: [
      '3 Spacious Bedrooms',
      'Textured Stone Facade',
      'Glass Balustrade Balcony',
      'Glass-Rail Structural Staircase',
      'Backlit TV Unit Fretwork',
      'Modern Bathroom Vanity'
    ],
  },
  {
    id: 'marina-bay-complex',
    name: 'Marina Bay Complex',
    location: 'Chennai, Tamil Nadu',
    category: 'ongoing',
    status: 'Ongoing',
    img: '/assets/images/project-turnkey.png',
    description: 'A mixed-use development featuring luxury apartments, retail spaces, and a boutique hotel with marina views.',
    area: '1,20,000 sq.ft',
    progress: 72,
    phase: 'Structural Work',
    expectedCompletion: 'December 2026',
    story: 'Marina Bay Complex is our most ambitious project to date. This mixed-use development will feature premium waterfront apartments, curated retail experiences, and a boutique hotel — all designed to capture the essence of coastal luxury living in Chennai.',
    gallery: ['/assets/images/project-turnkey.png', '/assets/images/project-commercial.png', '/assets/images/project-residential.png'],
    features: ['Waterfront Location', 'Mixed-Use Development', 'Boutique Hotel', 'Premium Retail', 'Marina Access', 'Infinity Pool'],
  },
  {
    id: 'zen-living-spaces',
    name: 'Zen Living Spaces',
    location: 'Madurai, Tamil Nadu',
    category: 'ongoing',
    status: 'Ongoing',
    img: '/assets/images/project-interior.png',
    description: 'Premium interior fitout project for a 24-unit gated community with Japanese-inspired minimalist design.',
    area: '36,000 sq.ft',
    progress: 45,
    phase: 'Interior Finishing',
    expectedCompletion: 'March 2027',
    story: 'Zen Living Spaces draws inspiration from Japanese minimalism — clean lines, natural materials, and purposeful spaces. Each of the 24 units is designed as a sanctuary, with carefully curated interiors that promote calm and well-being.',
    gallery: ['/assets/images/project-interior.png', '/assets/images/project-villa.png', '/assets/images/project-residential.png'],
    features: ['Japanese-Inspired Design', 'Natural Materials', 'Gated Community', 'Zen Garden', 'Meditation Room', 'Smart Home Ready'],
  },
  {
    id: 'emerald-villa-01',
    name: 'Emerald Villa — Type A',
    location: 'Madurai, Tamil Nadu',
    category: 'houses',
    status: 'Ready To Move',
    img: '/assets/images/project-villa.png',
    description: 'Ready-to-move 3BHK villa with premium finishes, private garden, and covered parking.',
    price: '₹1.85 Cr',
    bedrooms: '3 BHK',
    area: '2,800 sq.ft',
    story: 'The Emerald Villa Type A offers the perfect blend of luxury and comfort. With 3 spacious bedrooms, premium Italian marble flooring, and a private garden, this ready-to-move villa is designed for families who value quality living.',
    gallery: ['/assets/images/project-villa.png', '/assets/images/project-interior.png', '/assets/images/project-residential.png'],
    features: ['3 Bedrooms', 'Private Garden', 'Covered Parking', 'Italian Marble', 'Modular Kitchen', 'Rainwater Harvesting'],
  },
  {
    id: 'emerald-villa-02',
    name: 'Emerald Villa — Type B',
    location: 'Coimbatore, Tamil Nadu',
    category: 'houses',
    status: 'Available',
    img: '/assets/images/project-residential.png',
    description: 'Spacious 4BHK independent house with modular kitchen, home theatre, and terrace garden.',
    price: '₹2.45 Cr',
    bedrooms: '4 BHK',
    area: '3,600 sq.ft',
    story: 'The Emerald Villa Type B is our flagship offering — a spacious 4BHK independent house designed for discerning buyers. With a dedicated home theatre, terrace garden, and top-of-the-line modular kitchen, this is luxury redefined.',
    gallery: ['/assets/images/project-residential.png', '/assets/images/project-villa.png', '/assets/images/project-commercial.png'],
    features: ['4 Bedrooms', 'Home Theatre', 'Terrace Garden', 'Modular Kitchen', 'Study Room', 'Double Car Parking'],
  },
  {
    id: 'golden-acres-plot-a',
    name: 'Golden Acres — Plot A',
    location: 'Madurai, Tamil Nadu',
    category: 'plots',
    status: 'Available',
    img: '/assets/images/hero-bg.png',
    description: 'DTCP-approved premium residential plot in a gated community with all amenities.',
    plotArea: '2,400 sq.ft',
    approval: 'DTCP Approved',
    price: '₹48 Lakhs',
    story: 'Golden Acres Plot A is a premium DTCP-approved residential plot located in a secure gated community. With 24-hour security, internal roads, and proximity to schools and hospitals, this is the ideal canvas for your dream home.',
    gallery: ['/assets/images/hero-bg.png', '/assets/images/about-team.png'],
    features: ['DTCP Approved', 'Gated Community', '24/7 Security', 'Internal Roads', 'Water & Electricity', 'Near Schools'],
  },
  {
    id: 'golden-acres-plot-b',
    name: 'Golden Acres — Plot B',
    location: 'Chennai, Tamil Nadu',
    category: 'plots',
    status: 'Available',
    img: '/assets/images/about-team.png',
    description: 'Corner plot with excellent road connectivity, suitable for villa or duplex construction.',
    plotArea: '3,200 sq.ft',
    approval: 'CMDA Approved',
    price: '₹72 Lakhs',
    story: 'This premium corner plot in Chennai offers excellent road connectivity and is CMDA approved. With 3,200 sq.ft of space, it is perfectly suited for a villa or duplex construction, giving you the freedom to design your ideal home.',
    gallery: ['/assets/images/about-team.png', '/assets/images/hero-bg.png'],
    features: ['CMDA Approved', 'Corner Plot', 'Road Facing', 'Clear Title', 'Ready for Construction', 'Near IT Corridor'],
  },
];

/* ── Location Pin SVG ────────────────────────────────── */
const LocationPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const project = allProjects.find(p => p.id === slug);

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

      // Gallery reveal
      const galleryItems = pageRef.current.querySelectorAll('.pd-gallery__item');
      if (galleryItems.length) {
        gsap.fromTo(galleryItems,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: {
              trigger: '.pd-gallery',
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

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

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') setLightboxIndex(prev => (prev - 1 + project.gallery.length) % project.gallery.length);
      if (e.key === 'ArrowRight') setLightboxIndex(prev => (prev + 1) % project.gallery.length);
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, project]);

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

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

  const statusClass = {
    'Completed': 'completed',
    'Ongoing': 'ongoing',
    'Available': 'available',
    'Ready To Move': 'ready',
  }[project.status] || 'available';

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
            <button className="pd-hero__back" onClick={() => navigate('/projects')}>
              ← Back to Projects
            </button>
            <span className={`pd-hero__status pd-hero__status--${statusClass}`}>
              {project.status}
            </span>
            <h1 className="pd-hero__title">{project.name}</h1>
            <div className="pd-hero__location">
              <LocationPin />
              {project.location}
            </div>
            <p className="pd-hero__desc">{project.description}</p>

            {/* Quick info */}
            <div className="pd-hero__meta">
              {project.area && (
                <div className="pd-hero__meta-item">
                  <span className="pd-hero__meta-label">Area</span>
                  <span className="pd-hero__meta-value">{project.area || project.plotArea}</span>
                </div>
              )}
              {project.year && (
                <div className="pd-hero__meta-item">
                  <span className="pd-hero__meta-label">Year</span>
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
              <span className="section__label">The Story</span>
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

        {/* ── Gallery ─────────────────────────────────── */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="pd-gallery">
            <div className="container">
              <span className="section__label">Gallery</span>
              <div className="pd-gallery__grid">
                {project.gallery.map((img, i) => (
                  <div
                    key={i}
                    className={`pd-gallery__item ${i === 0 ? 'pd-gallery__item--large' : ''}`}
                    onClick={() => openLightbox(i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
                  >
                    <img src={img} alt={`${project.name} — Photo ${i + 1}`} loading="lazy" />
                    <div className="pd-gallery__item-overlay">
                      <span>View</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Features ────────────────────────────────── */}
        {project.features && project.features.length > 0 && (
          <section className="pd-features">
            <div className="container">
              <span className="section__label">Key Features</span>
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
                <Link to="/projects" className="btn btn--outline">View All Projects</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ── Lightbox ──────────────────────────────────── */}
      {lightboxOpen && (
        <div className="pd-lightbox" onClick={(e) => e.target === e.currentTarget && setLightboxOpen(false)}>
          <button className="pd-lightbox__close" onClick={() => setLightboxOpen(false)}>✕</button>
          {project.gallery.length > 1 && (
            <>
              <button
                className="pd-lightbox__nav pd-lightbox__nav--prev"
                onClick={() => setLightboxIndex(prev => (prev - 1 + project.gallery.length) % project.gallery.length)}
              >
                ←
              </button>
              <button
                className="pd-lightbox__nav pd-lightbox__nav--next"
                onClick={() => setLightboxIndex(prev => (prev + 1) % project.gallery.length)}
              >
                →
              </button>
            </>
          )}
          <img
            className="pd-lightbox__image"
            src={project.gallery[lightboxIndex]}
            alt={`${project.name} — Photo ${lightboxIndex + 1}`}
          />
          <div className="pd-lightbox__counter">
            {lightboxIndex + 1} / {project.gallery.length}
          </div>
        </div>
      )}
    </div>
  );
}
