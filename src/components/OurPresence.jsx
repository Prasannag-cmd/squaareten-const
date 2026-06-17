/* ============================================================
   OUR PRESENCE — Geographic Map & City Grid Component
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
    address: 'Coimbatore District Office, Coimbatore, Tamil Nadu',
    phone: '+91 75400 02054',
    icon: '🏡'
  },
  {
    name: 'Thiruvallur',
    projects: 'Residential & Commercial Projects',
    description: 'High-quality residential layouts, layout developments, and modern commercial builds near Chennai.',
    address: 'Thiruvallur District Office, Thiruvallur, Tamil Nadu',
    phone: '+91 75400 02054',
    icon: '🏗️'
  },
  {
    name: 'Aranthangi',
    projects: 'Residential & Development Projects',
    description: 'Custom individual homes and turnkey layout developments focused on structural longevity.',
    address: 'Aranthangi Office, Pudukkottai District, Tamil Nadu',
    phone: '+91 75400 02054',
    icon: '🧱'
  },
  {
    name: 'Tirunelveli',
    projects: 'Residential & Construction Projects',
    description: 'High-end residential constructions built to exact client specifications under strict quality control.',
    address: 'Tirunelveli District Office, Tirunelveli, Tamil Nadu',
    phone: '+91 75400 02054',
    icon: '🛠️'
  }
];

export default function OurPresence() {
  const [activeCityIndex, setActiveCityIndex] = useState(0);
  const [isFlyerOpen, setIsFlyerOpen] = useState(false);
  const revealRef = useScrollReveal('stagger-children');

  return (
    <section className="section presence" id="presence">
      <div className="container">
        {/* Section Header (styled like the poster) */}
        <div className="presence__header">
          <div className="presence__logo-wrap">
            <img src="/assets/images/logo.png" alt="Squaareten Logo" className="presence__logo" />
          </div>
          <span className="presence__company-title">SQUAARE TEN CONSTRUCTIONS PVT. LTD.</span>
          <h2 className="presence__tamil-title">Our Footprints Across Tamil Nadu</h2>
          <p className="presence__tamil-subtitle">
            Solid Foundations, Cultivating Trust
          </p>
          <div className="presence__pill-badge">
            ACROSS TAMIL NADU, DELIVERING EXCELLENCE
          </div>
        </div>

        {/* Content Layout Split */}
        <div className="presence__split" ref={revealRef}>
          {/* Left Side: Interactive SVG Map panel */}
          <div className="presence__left">
            <div className="presence__map-card">
              {/* Floating button to view flyer */}
              <button className="presence__flyer-trigger" onClick={() => setIsFlyerOpen(true)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>View Flyer</span>
              </button>

              <div className="presence__map-container">
                <svg viewBox="0 0 400 500" className="presence__map-svg">
                  <defs>
                    <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(206, 148, 67, 0.22)" />
                      <stop offset="100%" stopColor="rgba(206, 148, 67, 0.05)" />
                    </linearGradient>
                    <filter id="mapGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Stylized background geometric grid */}
                  <circle cx="200" cy="250" r="180" fill="none" stroke="rgba(206, 148, 67, 0.04)" strokeDasharray="5,5" />
                  <circle cx="200" cy="250" r="110" fill="none" stroke="rgba(206, 148, 67, 0.03)" />
                  <line x1="200" y1="20" x2="200" y2="480" stroke="rgba(206, 148, 67, 0.03)" strokeDasharray="3,3" />
                  <line x1="20" y1="250" x2="380" y2="250" stroke="rgba(206, 148, 67, 0.03)" strokeDasharray="3,3" />

                  {/* Stylized Tamil Nadu landmass SVG outline path */}
                  <path 
                    d="M 330 65 
                       C 340 65, 345 70, 350 80
                       C 350 90, 340 110, 335 125
                       C 330 140, 320 160, 315 175
                       C 310 190, 305 210, 305 225
                       C 305 240, 315 250, 325 260
                       C 335 270, 345 275, 345 285
                       C 345 295, 330 300, 315 305
                       C 300 310, 285 315, 275 325
                       C 265 335, 285 340, 310 342
                       C 335 344, 345 346, 335 352
                       C 325 358, 295 358, 270 360
                       C 245 362, 230 370, 220 385
                       C 210 400, 215 415, 210 430
                       C 205 445, 185 460, 165 470
                       C 145 480, 130 488, 125 488
                       C 120 488, 115 475, 115 460
                       C 115 445, 120 430, 115 415
                       C 110 400, 95 385, 90 370
                       C 85 355, 80 340, 80 325
                       C 80 310, 90 295, 85 280
                       C 80 265, 65 255, 60 240
                       C 55 225, 75 215, 95 200
                       C 115 185, 125 170, 135 150
                       C 145 130, 160 115, 175 105
                       C 190 95, 210 95, 225 90
                       C 240 85, 255 75, 270 65
                       Z" 
                    fill="url(#mapGradient)"
                    stroke="rgba(206, 148, 67, 0.35)"
                    strokeWidth="2.5"
                    filter="url(#mapGlow)"
                    className="presence__map-landmass"
                  />

                  {/* Interactive City Pins */}
                  {cities.map((city, idx) => {
                    const coords = {
                      'Thiruvallur': { x: 320, y: 80 },
                      'Coimbatore': { x: 95, y: 230 },
                      'Madurai (HQ)': { x: 170, y: 350 },
                      'Aranthangi': { x: 240, y: 360 },
                      'Tirunelveli': { x: 130, y: 460 }
                    };
                    
                    const pos = coords[city.name] || { x: 200, y: 250 };
                    const isActive = activeCityIndex === idx;
                    
                    return (
                      <g 
                        key={idx} 
                        className={`presence__map-pin ${isActive ? 'is-active' : ''}`}
                        transform={`translate(${pos.x}, ${pos.y})`}
                        onClick={() => setActiveCityIndex(idx)}
                        onMouseEnter={() => setActiveCityIndex(idx)}
                      >
                        {/* Radial expanding waves */}
                        <circle cx="0" cy="0" r={isActive ? "20" : "10"} fill="rgba(206, 148, 67, 0.12)" className="pin-pulse-circle" />
                        <circle cx="0" cy="0" r={isActive ? "32" : "22"} fill="none" stroke="rgba(206, 148, 67, 0.2)" strokeWidth="1" className="pin-pulse-ring" />
                        
                        {/* Interactive marker pin */}
                        <path 
                          d="M0 -14 C-5 -14 -9 -10 -9 -5 C-9 1 -2 9 0 14 C2 9 9 1 9 -5 C9 -10 5 -14 0 -14 Z" 
                          fill="rgba(224, 76, 76, 0.95)"
                          stroke="rgba(206, 148, 67, 0.85)"
                          strokeWidth="1.5"
                          className="pin-marker"
                        />
                        {/* Inner glowing dot */}
                        <circle cx="0" cy="-5" r="3" fill="#FFFFFF" />
                        
                        {/* Hover City Tooltip */}
                        {isActive && (
                          <g transform="translate(0, -32)">
                            <rect 
                              x="-65" 
                              y="-28" 
                              width="130" 
                              height="26" 
                              rx="6" 
                              fill="rgba(10, 10, 10, 0.92)" 
                              stroke="var(--color-accent)" 
                              strokeWidth="1.5" 
                              className="pin-tooltip-bg"
                            />
                            <text 
                              x="0" 
                              y="-11" 
                              fill="#FFFFFF" 
                              fontSize="11" 
                              fontFamily="var(--font-sans)" 
                              fontWeight="700" 
                              textAnchor="middle"
                            >
                              {city.name.replace(' (HQ)', '')}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
            
            {/* Caption */}
            <div className="presence__caption">
              <span className="presence__caption-bullet"></span>
              <p>Hover or click on the map pinpoints or the directory listings to explore specific project scopes in each city.</p>
            </div>
          </div>

          {/* Right Side: City Directory cards */}
          <div className="presence__right">
            <div className="presence__cities-list">
              {cities.map((city, idx) => {
                const isActive = activeCityIndex === idx;
                return (
                  <div 
                    className={`presence__city-card ${isActive ? 'is-active' : ''}`} 
                    key={idx}
                    onMouseEnter={() => setActiveCityIndex(idx)}
                  >
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
                        <strong>Office/Site:</strong> {city.address}
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Poster highlights footer */}
        <div className="presence__stats-card">
          <div className="presence__stats-grid">
            <div className="presence__stat-col">
              <span className="presence__stat-number">100+</span>
              <span className="presence__stat-label">Projects Completed</span>
            </div>
            <div className="presence__stat-col">
              <span className="presence__stat-number">Multiple Cities</span>
              <span className="presence__stat-label">Across Tamil Nadu</span>
            </div>
            <div className="presence__stat-col">
              <span className="presence__stat-number">10+ Years</span>
              <span className="presence__stat-label">Of Experience</span>
            </div>
            <div className="presence__stat-col">
              <span className="presence__stat-number">Quality Build</span>
              <span className="presence__stat-label">On Time. Every Time.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Full Contact Flyer */}
      {isFlyerOpen && (
        <div className="presence-modal__overlay" onClick={() => setIsFlyerOpen(false)}>
          <div className="presence-modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="presence-modal__close" onClick={() => setIsFlyerOpen(false)} aria-label="Close Lightbox">
              ✕
            </button>
            <div className="presence-modal__img-container">
              <img 
                src="/assets/images/tamilnadu-presence-portrait.jpg" 
                alt="Squaareten Tamil Nadu Presence Contact Flyer" 
                className="presence-modal__img"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
