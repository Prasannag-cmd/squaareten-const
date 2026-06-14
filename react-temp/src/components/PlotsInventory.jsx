/* ============================================================
   PLOTS INVENTORY — Searchable grid with filters
   ============================================================ */
import React, { useState, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const allPlots = [
  { id: 1, area: 1200, areaStr: '1,200 sq.ft', facing: 'East', status: 'available', price: 1500000, priceStr: '₹15 Lakhs', dimensions: '30 × 40 ft' },
  { id: 2, area: 1350, areaStr: '1,350 sq.ft', facing: 'East', status: 'available', price: 1700000, priceStr: '₹17 Lakhs', dimensions: '30 × 45 ft' },
  { id: 3, area: 1200, areaStr: '1,200 sq.ft', facing: 'East', status: 'sold', price: 1500000, priceStr: '₹15 Lakhs', dimensions: '30 × 40 ft' },
  { id: 4, area: 1500, areaStr: '1,500 sq.ft', facing: 'East', status: 'available', price: 1900000, priceStr: '₹19 Lakhs', dimensions: '30 × 50 ft' },
  { id: 5, area: 1200, areaStr: '1,200 sq.ft', facing: 'East', status: 'reserved', price: 1500000, priceStr: '₹15 Lakhs', dimensions: '30 × 40 ft' },
  { id: 6, area: 1350, areaStr: '1,350 sq.ft', facing: 'East', status: 'available', price: 1700000, priceStr: '₹17 Lakhs', dimensions: '30 × 45 ft' },
  { id: 7, area: 1200, areaStr: '1,200 sq.ft', facing: 'East', status: 'available', price: 1500000, priceStr: '₹15 Lakhs', dimensions: '30 × 40 ft' },
  { id: 8, area: 1500, areaStr: '1,500 sq.ft', facing: 'West', status: 'available', price: 1900000, priceStr: '₹19 Lakhs', dimensions: '30 × 50 ft' },
  { id: 9, area: 1200, areaStr: '1,200 sq.ft', facing: 'West', status: 'sold', price: 1500000, priceStr: '₹15 Lakhs', dimensions: '30 × 40 ft' },
  { id: 10, area: 1350, areaStr: '1,350 sq.ft', facing: 'West', status: 'available', price: 1700000, priceStr: '₹17 Lakhs', dimensions: '30 × 45 ft' },
  { id: 11, area: 1200, areaStr: '1,200 sq.ft', facing: 'West', status: 'available', price: 1500000, priceStr: '₹15 Lakhs', dimensions: '30 × 40 ft' },
  { id: 12, area: 1500, areaStr: '1,500 sq.ft', facing: 'West', status: 'sold', price: 1900000, priceStr: '₹19 Lakhs', dimensions: '30 × 50 ft' },
  { id: 13, area: 1200, areaStr: '1,200 sq.ft', facing: 'West', status: 'available', price: 1500000, priceStr: '₹15 Lakhs', dimensions: '30 × 40 ft' },
  { id: 14, area: 1350, areaStr: '1,350 sq.ft', facing: 'West', status: 'available', price: 1700000, priceStr: '₹17 Lakhs', dimensions: '30 × 45 ft' },
  { id: 15, area: 1200, areaStr: '1,200 sq.ft', facing: 'South', status: 'available', price: 1500000, priceStr: '₹15 Lakhs', dimensions: '30 × 40 ft' },
  { id: 16, area: 1350, areaStr: '1,350 sq.ft', facing: 'South', status: 'reserved', price: 1700000, priceStr: '₹17 Lakhs', dimensions: '30 × 45 ft' },
  { id: 17, area: 1200, areaStr: '1,200 sq.ft', facing: 'South', status: 'available', price: 1500000, priceStr: '₹15 Lakhs', dimensions: '30 × 40 ft' },
  { id: 18, area: 1500, areaStr: '1,500 sq.ft', facing: 'South', status: 'available', price: 1900000, priceStr: '₹19 Lakhs', dimensions: '30 × 50 ft' },
  { id: 19, area: 1200, areaStr: '1,200 sq.ft', facing: 'South', status: 'sold', price: 1500000, priceStr: '₹15 Lakhs', dimensions: '30 × 40 ft' },
  { id: 20, area: 1350, areaStr: '1,350 sq.ft', facing: 'South', status: 'available', price: 1700000, priceStr: '₹17 Lakhs', dimensions: '30 × 45 ft' },
  { id: 21, area: 1200, areaStr: '1,200 sq.ft', facing: 'South', status: 'available', price: 1500000, priceStr: '₹15 Lakhs', dimensions: '30 × 40 ft' },
  { id: 22, area: 2400, areaStr: '2,400 sq.ft', facing: 'North', status: 'available', price: 2800000, priceStr: '₹28 Lakhs', dimensions: '40 × 60 ft' },
  { id: 23, area: 2400, areaStr: '2,400 sq.ft', facing: 'North', status: 'available', price: 2800000, priceStr: '₹28 Lakhs', dimensions: '40 × 60 ft' },
  { id: 24, area: 2000, areaStr: '2,000 sq.ft', facing: 'North', status: 'reserved', price: 2400000, priceStr: '₹24 Lakhs', dimensions: '40 × 50 ft' },
  { id: 25, area: 2400, areaStr: '2,400 sq.ft', facing: 'North', status: 'available', price: 2800000, priceStr: '₹28 Lakhs', dimensions: '40 × 60 ft' },
  { id: 26, area: 1800, areaStr: '1,800 sq.ft', facing: 'North', status: 'available', price: 2200000, priceStr: '₹22 Lakhs', dimensions: '30 × 60 ft' },
];

const statusBadge = {
  available: { cls: 'kn-badge--green', text: 'Available' },
  sold: { cls: 'kn-badge--red', text: 'Sold' },
  reserved: { cls: 'kn-badge--yellow', text: 'Reserved' },
};

export default function PlotsInventory() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [facingFilter, setFacingFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return allPlots.filter(p => {
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;
      if (facingFilter !== 'all' && p.facing !== facingFilter) return false;
      if (search && !`Plot ${p.id} ${p.areaStr} ${p.facing}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [statusFilter, facingFilter, search]);

  useEffect(() => {
    gsap.fromTo('.kn-inv__card',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.04,
        scrollTrigger: { trigger: '.kn-inv__grid', start: 'top 85%' } }
    );
  }, []);

  const availableCount = allPlots.filter(p => p.status === 'available').length;
  const soldCount = allPlots.filter(p => p.status === 'sold').length;
  const reservedCount = allPlots.filter(p => p.status === 'reserved').length;

  return (
    <section className="kn-inventory" id="kn-inventory">
      <div className="kn-container">
        <div className="kn-section-header">
          <span className="kn-section-tag">Plot Inventory</span>
          <h2 className="kn-section-title">Available Plots</h2>
          <p className="kn-section-desc">Browse our collection of premium plots. Filter by status, facing, or search by plot number.</p>
        </div>

        {/* Quick Stats */}
        <div className="kn-inv__quick-stats">
          <div className="kn-inv__qs-item kn-inv__qs--total"><span>{allPlots.length}</span>Total Plots</div>
          <div className="kn-inv__qs-item kn-inv__qs--available"><span>{availableCount}</span>Available</div>
          <div className="kn-inv__qs-item kn-inv__qs--sold"><span>{soldCount}</span>Sold</div>
          <div className="kn-inv__qs-item kn-inv__qs--reserved"><span>{reservedCount}</span>Reserved</div>
        </div>

        {/* Filters */}
        <div className="kn-inv__filters">
          <div className="kn-inv__search-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              type="text"
              placeholder="Search by plot number..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="kn-inv__search"
            />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="kn-inv__select">
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="reserved">Reserved</option>
          </select>
          <select value={facingFilter} onChange={e => setFacingFilter(e.target.value)} className="kn-inv__select">
            <option value="all">All Facing</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="North">North</option>
            <option value="South">South</option>
          </select>
        </div>

        {/* Results count */}
        <p className="kn-inv__results">{filtered.length} plots found</p>

        {/* Cards Grid */}
        <div className="kn-inv__grid">
          {filtered.map(p => (
            <div className={`kn-inv__card ${p.status === 'sold' ? 'kn-inv__card--sold' : ''}`} key={p.id}>
              <div className="kn-inv__card-top">
                <span className="kn-inv__card-id">Plot #{p.id}</span>
                <span className={`kn-badge ${statusBadge[p.status].cls}`}>{statusBadge[p.status].text}</span>
              </div>
              <div className="kn-inv__card-body">
                <div className="kn-inv__card-row"><span>Area</span><strong>{p.areaStr}</strong></div>
                <div className="kn-inv__card-row"><span>Dimensions</span><strong>{p.dimensions}</strong></div>
                <div className="kn-inv__card-row"><span>Facing</span><strong>{p.facing}</strong></div>
                <div className="kn-inv__card-row kn-inv__card-price"><span>Price</span><strong>{p.priceStr}</strong></div>
              </div>
              {p.status === 'available' && (
                <a
                  href={`https://wa.me/919150765025?text=I'm interested in Plot %23${p.id} at Karuppiah Nagar (${p.areaStr})`}
                  className="kn-btn kn-btn--primary kn-inv__card-cta" target="_blank" rel="noopener noreferrer"
                >
                  Enquire Now
                </a>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="kn-inv__empty">
            <p>No plots match your filters. Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
