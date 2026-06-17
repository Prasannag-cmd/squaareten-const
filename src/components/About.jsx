/* ============================================================
   ABOUT — Company Story Section
   ============================================================ */
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function About() {
  const imageRef = useScrollReveal('clip-reveal');
  const contentRef = useScrollReveal('fade-right');

  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about__grid">
          <div className="about__image-wrapper" ref={imageRef}>
            <img src="/assets/images/about-story.jpg" alt="Our story" className="about__image" />
            <div className="about__image-accent"></div>
            {/* Floating glass legacy badge */}
            <div className="about__image-badge">
              <span className="about__image-badge-year">Est. 2014</span>
              <span className="about__image-badge-label">Building Trust</span>
            </div>
          </div>

          <div className="about__content" ref={contentRef}>
            <span className="section__label">Our Story</span>
            <h2 className="section__title">Crafting Legacies<br />in Concrete &amp; Steel</h2>
            <p className="about__text">
              Founded with a passion for excellence, <strong>Squaareten Construction</strong> has
              grown into a trusted name in the construction industry. We bring together innovative
              design, sustainable practices, and meticulous craftsmanship to create spaces that
              inspire and endure.
            </p>
            <p className="about__text">
              From luxurious villas to modern commercial complexes, every project reflects our
              commitment to quality, transparency, and client satisfaction. We don't just build
              structures — we <strong>build trust</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
