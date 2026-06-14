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
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [hoveredPlot, setHoveredPlot] = useState(null);
  const [filter, setFilter] = useState('all');
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );
  }, []);

  const filteredPlots = filter === 'all' ? plotData : plotData.filter(p => p.status === filter);
  const activePlot = selectedPlot || hoveredPlot;

  return (
    <section className="kn-masterplan" id="kn-masterplan" ref={sectionRef}>
      <div className="kn-container">
        <div className="kn-section-header">
          <span className="kn-section-tag">Interactive Layout</span>
          <h2 className="kn-section-title">Master Plan</h2>
          <p className="kn-section-desc">Click on any plot to view details. Use filters to find your perfect plot.</p>
        </div>

        {/* Legend & Filters */}
        <div className="kn-mp__controls">
          <div className="kn-mp__legend">
            {Object.entries(statusColors).map(([key, val]) => (
              <div className="kn-mp__legend-item" key={key}>
                <span className="kn-mp__legend-dot" style={{ background: val.stroke }} />
                <span>{val.label}</span>
              </div>
            ))}
          </div>
          <div className="kn-mp__filters">
            {['all', 'available', 'sold', 'reserved'].map(f => (
              <button
                key={f}
                className={`kn-mp__filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'All Plots' : statusColors[f]?.label || f}
              </button>
            ))}
          </div>
        </div>

        <div className="kn-mp__wrapper">
          {/* SVG Map */}
          <div className="kn-mp__map-container">
            <svg viewBox="0 0 100 100" className="kn-mp__svg" preserveAspectRatio="xMidYMid meet">
              {/* Background */}
              <rect x="0" y="0" width="100" height="100" fill="var(--color-bg-alt)" rx="1" />
              
              {/* Roads */}
              <rect x="0" y="27" width="100" height="4" fill="rgba(201,169,110,0.08)" />
              <text x="50" y="29.5" textAnchor="middle" fill="rgba(201,169,110,0.3)" fontSize="1.2" fontFamily="var(--font-sans)">40 FT ROAD</text>
              
              <rect x="0" y="51" width="100" height="4" fill="rgba(201,169,110,0.08)" />
              <text x="50" y="53.5" textAnchor="middle" fill="rgba(201,169,110,0.3)" fontSize="1.2" fontFamily="var(--font-sans)">30 FT ROAD</text>
              
              <rect x="0" y="75" width="100" height="2" fill="rgba(201,169,110,0.06)" />
              <text x="50" y="76.5" textAnchor="middle" fill="rgba(201,169,110,0.2)" fontSize="1" fontFamily="var(--font-sans)">30 FT ROAD</text>

              {/* Title */}
              <text x="50" y="4" textAnchor="middle" fill="var(--color-accent)" fontSize="2.5" fontFamily="var(--font-heading)" fontWeight="600">
                KARUPPIAH NAGAR — LAYOUT
              </text>

              {/* Plot blocks */}
              {plotData.map((plot) => {
                const colors = statusColors[plot.status];
                const isActive = activePlot?.id === plot.id;
                const isFiltered = filter !== 'all' && plot.status !== filter;
                return (
                  <g
                    key={plot.id}
                    className="kn-mp__plot"
                    style={{ cursor: plot.status !== 'sold' ? 'pointer' : 'not-allowed', opacity: isFiltered ? 0.15 : 1 }}
                    onClick={() => plot.status !== 'sold' && setSelectedPlot(selectedPlot?.id === plot.id ? null : plot)}
                    onMouseEnter={() => setHoveredPlot(plot)}
                    onMouseLeave={() => setHoveredPlot(null)}
                  >
                    <rect
                      x={plot.x} y={plot.y} width={plot.w} height={plot.h}
                      fill={isActive ? colors.stroke.replace(')', ',0.4)').replace('rgb', 'rgba') : colors.fill}
                      stroke={colors.stroke}
                      strokeWidth={isActive ? 0.6 : 0.3}
                      rx="0.5"
                      style={{ transition: 'all 0.3s ease' }}
                    />
                    <text
                      x={plot.x + plot.w / 2} y={plot.y + plot.h / 2 - 1.5}
                      textAnchor="middle" fill="var(--color-text)" fontSize="1.8"
                      fontFamily="var(--font-sans)" fontWeight="600"
                    >
                      {plot.id}
                    </text>
                    <text
                      x={plot.x + plot.w / 2} y={plot.y + plot.h / 2 + 2}
                      textAnchor="middle" fill="var(--color-text-secondary)" fontSize="0.9"
                      fontFamily="var(--font-sans)"
                    >
                      {plot.area}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Detail Panel */}
          <div className={`kn-mp__detail ${activePlot ? 'visible' : ''}`}>
            {activePlot ? (
              <>
                <div className="kn-mp__detail-header">
                  <span className="kn-mp__detail-badge" style={{ color: statusColors[activePlot.status].stroke }}>
                    {statusColors[activePlot.status].label}
                  </span>
                  <h3 className="kn-mp__detail-title">Plot #{activePlot.id}</h3>
                </div>
                <div className="kn-mp__detail-grid">
                  <div className="kn-mp__detail-item"><span>Area</span><strong>{activePlot.area}</strong></div>
                  <div className="kn-mp__detail-item"><span>Facing</span><strong>{activePlot.facing}</strong></div>
                  <div className="kn-mp__detail-item"><span>Price</span><strong>{activePlot.price}</strong></div>
                  <div className="kn-mp__detail-item"><span>Status</span><strong>{statusColors[activePlot.status].label}</strong></div>
                </div>
                {activePlot.status === 'available' && (
                  <a href={`https://wa.me/919150765025?text=I'm interested in Plot %23${activePlot.id} at Karuppiah Nagar (${activePlot.area})`}
                    className="kn-btn kn-btn--primary kn-mp__detail-cta" target="_blank" rel="noopener noreferrer">
                    Enquire on WhatsApp
                  </a>
                )}
              </>
            ) : (
              <div className="kn-mp__detail-empty">
                <span className="kn-mp__detail-empty-icon">👆</span>
                <p>Select a plot on the map to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
