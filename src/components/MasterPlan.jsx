/* ============================================================
   MASTER PLAN — Interactive SVG Plot Map
   ============================================================ */
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Plot data derived from the PDF layout. Coordinates are relative percentages. */
const plotData = [
  { id: 1, x: 5, y: 8, w: 12, h: 18, area: '1200 sq.ft', facing: 'East', status: 'available', price: '₹15L' },
  { id: 2, x: 18, y: 8, w: 12, h: 18, area: '1350 sq.ft', facing: 'East', status: 'available', price: '₹17L' },
  { id: 3, x: 31, y: 8, w: 12, h: 18, area: '1200 sq.ft', facing: 'East', status: 'sold', price: '₹15L' },
  { id: 4, x: 44, y: 8, w: 12, h: 18, area: '1500 sq.ft', facing: 'East', status: 'available', price: '₹19L' },
  { id: 5, x: 57, y: 8, w: 12, h: 18, area: '1200 sq.ft', facing: 'East', status: 'reserved', price: '₹15L' },
  { id: 6, x: 70, y: 8, w: 12, h: 18, area: '1350 sq.ft', facing: 'East', status: 'available', price: '₹17L' },
  { id: 7, x: 83, y: 8, w: 12, h: 18, area: '1200 sq.ft', facing: 'East', status: 'available', price: '₹15L' },
  { id: 8, x: 5, y: 32, w: 12, h: 18, area: '1500 sq.ft', facing: 'West', status: 'available', price: '₹19L' },
  { id: 9, x: 18, y: 32, w: 12, h: 18, area: '1200 sq.ft', facing: 'West', status: 'sold', price: '₹15L' },
  { id: 10, x: 31, y: 32, w: 12, h: 18, area: '1350 sq.ft', facing: 'West', status: 'available', price: '₹17L' },
  { id: 11, x: 44, y: 32, w: 12, h: 18, area: '1200 sq.ft', facing: 'West', status: 'available', price: '₹15L' },
  { id: 12, x: 57, y: 32, w: 12, h: 18, area: '1500 sq.ft', facing: 'West', status: 'sold', price: '₹19L' },
  { id: 13, x: 70, y: 32, w: 12, h: 18, area: '1200 sq.ft', facing: 'West', status: 'available', price: '₹15L' },
  { id: 14, x: 83, y: 32, w: 12, h: 18, area: '1350 sq.ft', facing: 'West', status: 'available', price: '₹17L' },
  { id: 15, x: 5, y: 56, w: 12, h: 18, area: '1200 sq.ft', facing: 'South', status: 'available', price: '₹15L' },
  { id: 16, x: 18, y: 56, w: 12, h: 18, area: '1350 sq.ft', facing: 'South', status: 'reserved', price: '₹17L' },
  { id: 17, x: 31, y: 56, w: 12, h: 18, area: '1200 sq.ft', facing: 'South', status: 'available', price: '₹15L' },
  { id: 18, x: 44, y: 56, w: 12, h: 18, area: '1500 sq.ft', facing: 'South', status: 'available', price: '₹19L' },
  { id: 19, x: 57, y: 56, w: 12, h: 18, area: '1200 sq.ft', facing: 'South', status: 'sold', price: '₹15L' },
  { id: 20, x: 70, y: 56, w: 12, h: 18, area: '1350 sq.ft', facing: 'South', status: 'available', price: '₹17L' },
  { id: 21, x: 83, y: 56, w: 12, h: 18, area: '1200 sq.ft', facing: 'South', status: 'available', price: '₹15L' },
  { id: 22, x: 5, y: 78, w: 18, h: 18, area: '2400 sq.ft', facing: 'North', status: 'available', price: '₹28L' },
  { id: 23, x: 24, y: 78, w: 18, h: 18, area: '2400 sq.ft', facing: 'North', status: 'available', price: '₹28L' },
  { id: 24, x: 43, y: 78, w: 18, h: 18, area: '2000 sq.ft', facing: 'North', status: 'reserved', price: '₹24L' },
  { id: 25, x: 62, y: 78, w: 18, h: 18, area: '2400 sq.ft', facing: 'North', status: 'available', price: '₹28L' },
  { id: 26, x: 81, y: 78, w: 14, h: 18, area: '1800 sq.ft', facing: 'North', status: 'available', price: '₹22L' },
];

const statusColors = {
  available: { fill: 'rgba(72, 187, 120, 0.25)', stroke: '#48bb78', label: 'Available' },
  sold: { fill: 'rgba(245, 101, 101, 0.25)', stroke: '#f56565', label: 'Sold' },
  reserved: { fill: 'rgba(237, 187, 69, 0.25)', stroke: '#edbb45', label: 'Reserved' },
};

export default function MasterPlan() {
  const sectionRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );
  }, []);

  return (
    <section className="kn-masterplan" id="kn-masterplan" ref={sectionRef}>
      <div className="kn-container">
        <div className="kn-section-header">
          <span className="kn-section-tag">Official Layout</span>
          <h2 className="kn-section-title">Master Plan Brochure</h2>
          <p className="kn-section-desc">Click the brochure image below to download the official high-resolution layout plan.</p>
        </div>

        <div className="kn-mp__wrapper" style={{ display: 'block' }}>
          <div 
            className="kn-mp__flyer-container" 
            style={{ 
              width: '100%', 
              maxWidth: '900px', 
              margin: '0 auto', 
              borderRadius: '16px', 
              overflow: 'hidden', 
              border: '1px solid rgba(201,169,110,0.25)', 
              boxShadow: '0 12px 40px rgba(0,0,0,0.6)', 
              background: '#111', 
              padding: '12px' 
            }}
          >
            <a 
              href="/assets/images/karuppiah-nagar-layout.jpg" 
              download="Karuppiah_Nagar_Layout_Brochure.jpg"
              style={{ display: 'block', position: 'relative', cursor: 'pointer', overflow: 'hidden', borderRadius: '10px' }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img 
                src="/assets/images/karuppiah-nagar-layout.jpg" 
                alt="Karuppiah Nagar Layout Map Brochure" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  display: 'block', 
                  borderRadius: '10px',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'scale(1.02)' : 'scale(1)'
                }} 
              />
              <div 
                className="kn-mp__download-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(10, 10, 10, 0.45)',
                  backdropFilter: 'blur(6px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                  color: 'var(--color-accent)',
                  gap: '15px'
                }}
              >
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'rgba(201, 169, 110, 0.15)',
                  border: '1px solid var(--color-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 25px rgba(201, 169, 110, 0.35)',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'scale(1.1)' : 'scale(0.9)'
                }}>
                  <svg viewBox="0 0 24 24" style={{ width: '36px', height: '36px', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </div>
                <span style={{ 
                  fontFamily: 'var(--font-sans)', 
                  fontSize: '13px', 
                  fontWeight: '700', 
                  letterSpacing: '2px', 
                  textTransform: 'uppercase',
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)' 
                }}>
                  Click to Download Brochure
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
