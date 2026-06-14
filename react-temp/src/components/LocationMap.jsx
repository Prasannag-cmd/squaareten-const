/* ============================================================
   LOCATION MAP — Embedded Google Maps
   ============================================================ */
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const advantages = [
  { icon: '🏫', title: 'Schools & Colleges', desc: 'Multiple reputed educational institutions within 3 km radius.' },
  { icon: '🏥', title: 'Hospitals', desc: 'Major hospitals and clinics accessible within 5 km.' },
  { icon: '🛒', title: 'Shopping', desc: 'Supermarkets, malls, and local markets in close proximity.' },
  { icon: '🚌', title: 'Transport', desc: 'Well-connected by bus routes and near major highways.' },
  { icon: '🕌', title: 'Places of Worship', desc: 'Temples, mosques, and churches within walking distance.' },
  { icon: '🌳', title: 'Green Spaces', desc: 'Parks and recreational areas nearby for a healthy lifestyle.' },
];

export default function LocationMap() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: ref.current, start: 'top 80%' } }
    );
  }, []);

  return (
    <section className="kn-location" id="kn-location" ref={ref}>
      <div className="kn-container">
        <div className="kn-section-header">
          <span className="kn-section-tag">Strategic Location</span>
          <h2 className="kn-section-title">Location Advantages</h2>
          <p className="kn-section-desc">Kovilpapakudi, Madurai — a thriving residential corridor with excellent connectivity.</p>
        </div>

        <div className="kn-location__wrapper">
          <div className="kn-location__advantages">
            {advantages.map((a, i) => (
              <div className="kn-location__adv-card" key={i}>
                <span className="kn-location__adv-icon">{a.icon}</span>
                <div>
                  <h4 className="kn-location__adv-title">{a.title}</h4>
                  <p className="kn-location__adv-desc">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="kn-location__map">
            <iframe
              title="Karuppiah Nagar Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.0!2d78.1!3d9.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTQnMDAuMCJOIDc4wrAwNicwMC4wIkU!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
