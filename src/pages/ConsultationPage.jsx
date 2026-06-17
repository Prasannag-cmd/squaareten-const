/* ============================================================
   CONSULTATION PAGE — Premium Consultation Selector & Booking Form
   ============================================================ */
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/consultation-page.css';

const consultationTypes = [
  {
    id: 'architectural',
    icon: '📐',
    title: 'Architectural & Spatial Planning',
    desc: 'Floor plans, custom spatial layout planning, Vaastu compliance, and photorealistic 3D external elevation rendering to visualize your home.',
    features: ['Custom Floor Plans', '3D Exterior Renderings', 'Vaastu Consultation', 'Spatial Space Optimization']
  },
  {
    id: 'structural',
    icon: '🏗️',
    title: 'Structural Safety & Foundation',
    desc: 'Professional advice on soil capacity, foundation type selection (pile, raft, isolated), steel reinforcement layout, and earthquake safety.',
    features: ['Soil Report Analysis', 'Foundation Type Advice', 'Steel Reinforcement Layouts', 'Concrete Mix & Grade Planning']
  },
  {
    id: 'budgeting',
    icon: '💰',
    title: 'Cost Estimation & BOQ Review',
    desc: 'A complete Bill of Quantities (BOQ) review, detailing exact material specifications, brand recommendations, and cost-saving construction tactics.',
    features: ['Detailed BOQ Analysis', 'Brand & Grade Assessment', 'Cost Optimization Tactics', 'Budget Phasing Guidance']
  },
  {
    id: 'interior',
    icon: '🎨',
    title: 'Interior Concepts & Lighting',
    desc: 'Consultation on electrical circuitry layout, modular kitchen planning, custom built-in furniture layout, false ceiling design, and lighting schemes.',
    features: ['Modular Kitchen Concepts', 'Electrical & Conduit Plans', 'False Ceiling Layouts', 'Custom Woodwork Consultation']
  },
  {
    id: 'legal',
    icon: '📋',
    title: 'Approvals & Legal Compliance',
    desc: 'Guidance on local building rules, government approval processes, setback requirements, rainwater harvesting compliance, and security clearance.',
    features: ['Local Body Rules Check', 'Approval Documentation Guide', 'Setback & Height Rules', 'Rainwater Harvesting Compliance']
  }
];

export default function ConsultationPage() {
  const [selectedType, setSelectedType] = useState('architectural');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    area: '',
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.remove('is-loading');
  }, []);

  const handleSelect = (id) => {
    setSelectedType(id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill in your Name and Phone Number.');
      return;
    }
    // Simulate API Submission
    setSubmitted(true);
  };

  return (
    <div className="consultation-page app-layout is-ready">
      <Navbar alwaysScrolled />

      <main className="consultation-main">
        {/* Hero Section */}
        <section className="consult-hero">
          <div className="consult-hero__bg">
            <div className="consult-hero__glow" />
          </div>
          <div className="container consult-hero__content">
            <span className="section__label">Expert Guidance</span>
            <h1 className="consult-hero__title">
              Home Construction <span className="highlight">Consultation</span>
            </h1>
            <p className="consult-hero__desc">
              Building your dream home requires precision. Select from our expert engineering and architectural consultation services to review plans, structural safety, budgeting, or legal compliance.
            </p>
          </div>
        </section>

        {/* Selector Grid & Form Section */}
        <section className="consult-body">
          <div className="container consult-body__grid">
            
            {/* Left Column: Selector Cards */}
            <div className="consult-selector">
              <h2 className="consult-column-title">1. Select Consultation Type</h2>
              <div className="consult-cards-list">
                {consultationTypes.map((type) => {
                  const isActive = selectedType === type.id;
                  return (
                    <div 
                      key={type.id}
                      className={`consult-type-card ${isActive ? 'is-active' : ''}`}
                      onClick={() => handleSelect(type.id)}
                    >
                      <div className="consult-type-card__icon">{type.icon}</div>
                      <div className="consult-type-card__content">
                        <h3 className="consult-type-card__title">{type.title}</h3>
                        <p className="consult-type-card__desc">{type.desc}</p>
                        
                        <div className="consult-type-card__features">
                          {type.features.map((f, idx) => (
                            <span key={idx} className="consult-type-card__tag">✓ {f}</span>
                          ))}
                        </div>
                      </div>
                      <div className="consult-type-card__indicator">
                        <div className="consult-type-card__dot" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Booking Form */}
            <div className="consult-form-wrapper">
              <div className="consult-form-container">
                <h2 className="consult-column-title">2. Book Your Session</h2>
                
                {submitted ? (
                  <div className="consult-success">
                    <div className="consult-success__icon">✓</div>
                    <h3 className="consult-success__title">Booking Request Sent</h3>
                    <p className="consult-success__text">
                      Thank you, <strong>{formData.name}</strong>. We have received your request for <strong>{consultationTypes.find(t => t.id === selectedType)?.title}</strong>. Our chief structural engineer/architect will contact you on <strong>{formData.phone}</strong> within 24 hours to schedule the session.
                    </p>
                    <button 
                      className="btn btn--outline" 
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', phone: '', email: '', location: '', area: '', details: '' });
                      }}
                      style={{ marginTop: '20px' }}
                    >
                      Book Another Session
                    </button>
                  </div>
                ) : (
                  <form className="consult-form" onSubmit={handleSubmit}>
                    <div className="consult-form__info-banner">
                      Selected Service: <strong>{consultationTypes.find(t => t.id === selectedType)?.title}</strong>
                    </div>

                    <div className="consult-form__group">
                      <label className="consult-form__label">Full Name *</label>
                      <input 
                        type="text" 
                        name="name" 
                        className="consult-form__input" 
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required 
                      />
                    </div>

                    <div className="consult-form__row">
                      <div className="consult-form__group">
                        <label className="consult-form__label">Phone Number *</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          className="consult-form__input" 
                          placeholder="Your active phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          required 
                        />
                      </div>
                      <div className="consult-form__group">
                        <label className="consult-form__label">Email Address</label>
                        <input 
                          type="email" 
                          name="email" 
                          className="consult-form__input" 
                          placeholder="Your email address"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="consult-form__row">
                      <div className="consult-form__group">
                        <label className="consult-form__label">Project Location</label>
                        <input 
                          type="text" 
                          name="location" 
                          className="consult-form__input" 
                          placeholder="e.g. Madurai, Tamil Nadu"
                          value={formData.location}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="consult-form__group">
                        <label className="consult-form__label">Estimated Plot Area (Sq.ft)</label>
                        <input 
                          type="number" 
                          name="area" 
                          className="consult-form__input" 
                          placeholder="e.g. 1500"
                          value={formData.area}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="consult-form__group">
                      <label className="consult-form__label">Tell Us About Your Requirements</label>
                      <textarea 
                        name="details" 
                        className="consult-form__textarea" 
                        placeholder="Share any details (e.g. looking to check building height rules, soil testing reports, or cost-cutting design alternatives)..."
                        value={formData.details}
                        onChange={handleChange}
                      />
                    </div>

                    <button type="submit" className="btn btn--primary consult-form__submit">
                      Schedule Consultation
                    </button>
                    
                    <p className="consult-form__disclaimer">
                      * Our team coordinates online Zoom sessions or physical site visits for local projects in Tamil Nadu.
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
