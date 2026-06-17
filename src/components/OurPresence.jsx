/* ============================================================
   OUR PRESENCE — Project Locations and Map Showcase
   ============================================================ */
import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const cities = [
  {
    name: 'Madurai (HQ)',
    projects: 'Premium Homes & Commercial Spaces',
    description: 'Corporate headquarters and central operations hub directing flagship designs across southern districts.',
    address: '116/294 J Vijayasekaran Street, Arapalayam, Madurai - 625016',
    phone: '+91 75400 02054',
    icon: '🏢'
  },
  {
    name: 'Coimbatore',
    projects: 'Villas & Residential Projects',
    description: 'Modern luxury duplex developments and architect-designed residential villas in premier locales.',
    phone: '+91 75400 02054',
    icon: '🏡'
  },
  {
    name: 'Thiruvallur',
    projects: 'Residential & Commercial Projects',
    description: 'High-quality residential layouts, layouts development, and modern commercial builds near Chennai.',
    phone: '+91 75400 02054',
    icon: '🏗️'
  },
  {
    name: 'Aranthangi',
    projects: 'Residential & Development Projects',
    description: 'Custom individual homes and turnkey layout developments focused on structural longevity.',
    phone: '+91 75400 02054',
    icon: '🧱'
  },
  {
    name: 'Tirunelveli',
    projects: 'Residential & Construction Projects',
    description: 'High-end residential constructions built to exact client specifications under strict quality control.',
    phone: '+91 75400 02054',
    icon: '🛠️'
  }
];

export default function OurPresence() {
  const [isOpen, setIsOpen] = useState(false);
  const revealRef = useScrollReveal('stagger-children');

  return (
    <section className="section presence" id="presence">
      <div className="container">
        {/* Section Header */}
        <div className="presence__header">
          <span className="section__label">Our Reach</span>
          <h2 className="section__title">Our Presence Across Tamil Nadu</h2>
          <p className="section__subtitle">
            From our headquarters in Madurai, we deliver premium construction and engineering excellence across major cities in Tamil Nadu.
          </p>
        </div>

        {/* Content Layout Split */}
        <div className="presence__split" ref={revealRef}>
          {/* Left Side: Interactive Map Poster Display */}
          <div className="presence__left">
            <div className="presence__poster-card" onClick={() => setIsOpen(true)}>
              <picture className="presence__poster-pic">
                <source media="(max-width: 768px)" srcSet="/assets/images/tamilnadu-presence-portrait.jpg" />
                <img 
                  src="/assets/images/tamilnadu-presence-landscape.jpg" 
                  alt="Squaareten Constructions Tamil Nadu Reach Map" 
                  className="presence__poster-img"
                  loading="lazy"
                />
              </picture>
              
              {/* Click to expand hover overlay */}
              <div className="presence__poster-overlay">
                <span className="presence__zoom-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                  <span>View Full Flyer</span>
                </span>
              </div>
            </div>
            
            {/* Caption Card */}
            <div className="presence__caption">
              <span className="presence__caption-bullet"></span>
              <p>Click on the map flyer above to view detailed contact numbers, office address, and our complete service details.</p>
            </div>
          </div>

          {/* Right Side: City Directory Grid */}
          <div className="presence__right">
            <div className="presence__cities-list">
              {cities.map((city, idx) => (
                <div className="presence__city-card" key={idx}>
                  <div className="presence__city-shine"></div>
                  
                  <div className="presence__city-top">
                    <span className="presence__city-icon">{city.icon}</span>
                    <div className="presence__city-title-group">
                      <h3 className="presence__city-name">{city.name}</h3>
                      <span className="presence__city-tag">{city.projects}</span>
                    </div>
                  </div>

                  <p className="presence__city-desc">{city.description}</p>
                  
                  {city.address && (
                    <div className="presence__city-address">
                      <strong>Address:</strong> {city.address}
                    </div>
                  )}

                  <div className="presence__city-footer">
                    <a href={`tel:${city.phone.replace(/\s+/g, '')}`} className="presence__city-call">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
                      </svg>
                      <span>{city.phone}</span>
                    </a>
                  </div>
                  
                  <div className="presence__city-glow"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full Resolution Glassmorphic Image Lightbox Modal */}
      {isOpen && (
        <div className="presence-modal__overlay" onClick={() => setIsOpen(false)}>
          <div className="presence-modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="presence-modal__close" onClick={() => setIsOpen(false)} aria-label="Close Lightbox">
              ✕
            </button>
            <div className="presence-modal__img-container">
              <picture>
                <source media="(max-width: 768px)" srcSet="/assets/images/tamilnadu-presence-portrait.jpg" />
                <img 
                  src="/assets/images/tamilnadu-presence-landscape.jpg" 
                  alt="Squaareten Tamil Nadu Presence Full Resolution" 
                  className="presence-modal__img"
                />
              </picture>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
