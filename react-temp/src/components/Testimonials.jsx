/* ============================================================
   TESTIMONIALS — Client Reviews Section
   ============================================================ */
import { useScrollReveal } from '../hooks/useScrollReveal';

const testimonials = [
  {
    text: 'Squaareten delivered our dream home beyond expectations. The attention to detail and quality of work is unmatched. Truly a premium construction experience.',
    avatar: 'RK',
    name: 'Rajesh Kumar',
    role: 'Villa Owner, Sunrise Residences',
  },
  {
    text: 'Professional, transparent, and incredibly skilled. Our office complex was completed ahead of schedule with impeccable quality.',
    avatar: 'SP',
    name: 'Sanya Patel',
    role: 'Director, Apex Industries',
  },
  {
    text: 'The renovation of our heritage home was handled with such care and expertise. They preserved the character while adding modern comforts beautifully.',
    avatar: 'AM',
    name: 'Arjun Mehta',
    role: 'Homeowner, Heritage Revival',
  },
];

export default function Testimonials() {
  const gridRef = useScrollReveal('stagger-children');

  return (
    <section className="section testimonials" id="testimonials">
      <div className="container">
        <div className="testimonials__header">
          <span className="section__label">Client Reviews</span>
          <h2 className="section__title">What Our Clients Say</h2>
          <p className="section__subtitle">Don't just take our word for it — hear from the families and businesses who trusted us.</p>
        </div>

        <div className="testimonials__grid" ref={gridRef}>
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="testimonial-card__stars">
                {[...Array(5)].map((_, j) => (
                  <span className="testimonial-card__star" key={j}>★</span>
                ))}
              </div>
              <div className="testimonial-card__quote">"</div>
              <p className="testimonial-card__text">{t.text}</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">{t.avatar}</div>
                <div>
                  <div className="testimonial-card__name">{t.name}</div>
                  <div className="testimonial-card__role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
