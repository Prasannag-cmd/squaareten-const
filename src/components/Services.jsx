/* ============================================================
   SERVICES — Service Cards Section
   ============================================================ */
import { useScrollReveal } from '../hooks/useScrollReveal';

const services = [
  {
    num: '01',
    icon: '🏠',
    title: 'Residential Construction',
    desc: 'Custom homes designed around your lifestyle. From foundation to finishing, we create living spaces that reflect your personality.'
  },
  {
    num: '02',
    icon: '🏢',
    title: 'Commercial Projects',
    desc: 'Modern office spaces, retail complexes, and commercial buildings engineered for functionality and long-term value.'
  },
  {
    num: '03',
    icon: '🏡',
    title: 'Villa Construction',
    desc: 'Luxury villas that combine architectural grandeur with comfortable living. Every detail curated for an elevated experience.'
  },
  {
    num: '04',
    icon: '🔧',
    title: 'Renovation & Remodeling',
    desc: 'Breathe new life into existing spaces. Our renovation expertise transforms outdated structures into modern masterpieces.'
  },
  {
    num: '05',
    icon: '🎨',
    title: 'Interior Design',
    desc: 'Holistic interior solutions that harmonize aesthetics with functionality. From concept to execution, we craft spaces you love.'
  },
  {
    num: '06',
    icon: '🔑',
    title: 'Turnkey Solutions',
    desc: 'Complete end-to-end project management. Just hand us the key — we handle everything from design to final handover.'
  },
];

export default function Services() {
  const gridRef = useScrollReveal('stagger-children');

  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="services__header">
          <span className="section__label">What We Do</span>
          <h2 className="section__title">Our Services</h2>
          <p className="section__subtitle">
            Comprehensive construction solutions tailored to your vision, delivered with precision and premium quality.
          </p>
        </div>

        <div className="services__grid" ref={gridRef}>
          {services.map(s => (
            <div className="service-card" key={s.num}>
              <div className="service-card__shine"></div>
              <div className="service-card__number">{s.num}</div>
              <div className="service-card__icon">{s.icon}</div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.desc}</p>
              <div className="service-card__glow-bar"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
