/* ============================================================
   FOOTER — Site Footer
   ============================================================ */
import { Link, useLocation } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Footer() {
  const gridRef = useScrollReveal('stagger-children');
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/index.html';
  const homePrefix = isHomePage ? '' : '/';

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__grid" ref={gridRef}>
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <img src="/assets/images/logo.png" alt="Squaareten Construction" className="footer__logo-img" />
              <div className="footer__logo-text">Squaareten<span>Construction</span></div>
            </Link>
            <p className="footer__desc">Building excellence since 2014. We transform visions into architectural masterpieces that stand the test of time.</p>
            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="Facebook">f</a>
              <a href="#" className="footer__social" aria-label="Instagram">ig</a>
              <a href="#" className="footer__social" aria-label="LinkedIn">in</a>
              <a href="#" className="footer__social" aria-label="YouTube">yt</a>
            </div>
          </div>
          <div className="footer__column">
            <h4 className="footer__column-title">Services</h4>
            <div className="footer__links">
              {isHomePage ? (
                <>
                  <a href="#services" className="footer__link">Residential</a>
                  <a href="#services" className="footer__link">Commercial</a>
                  <a href="#services" className="footer__link">Villa Construction</a>
                  <a href="#services" className="footer__link">Renovation</a>
                  <a href="#services" className="footer__link">Interior Design</a>
                  <a href="#services" className="footer__link">Turnkey Solutions</a>
                </>
              ) : (
                <>
                  <Link to="/#services" className="footer__link">Residential</Link>
                  <Link to="/#services" className="footer__link">Commercial</Link>
                  <Link to="/#services" className="footer__link">Villa Construction</Link>
                  <Link to="/#services" className="footer__link">Renovation</Link>
                  <Link to="/#services" className="footer__link">Interior Design</Link>
                  <Link to="/#services" className="footer__link">Turnkey Solutions</Link>
                </>
              )}
            </div>
          </div>
          <div className="footer__column">
            <h4 className="footer__column-title">Company</h4>
            <div className="footer__links">
              {isHomePage ? (
                <>
                  <Link to="/about" className="footer__link">About Us</Link>
                  <Link to="/projects" className="footer__link">Projects</Link>
                  <Link to="/careers" className="footer__link">Careers</Link>
                  <a href="#testimonials" className="footer__link">Testimonials</a>
                  <a href="#contact" className="footer__link">Contact</a>
                </>
              ) : (
                <>
                  <Link to="/about" className="footer__link">About Us</Link>
                  <Link to="/projects" className="footer__link">Projects</Link>
                  <Link to="/careers" className="footer__link">Careers</Link>
                  <Link to="/#testimonials" className="footer__link">Testimonials</Link>
                  <Link to="/#contact" className="footer__link">Contact</Link>
                </>
              )}
            </div>
          </div>
          <div className="footer__column">
            <h4 className="footer__column-title">Contact</h4>
            <div className="footer__links">
              <a href="tel:+917540002054" className="footer__link">Call: +91 7540002054</a>
              <a href="https://wa.me/917540002054?text=Hello%20Squaareten%20Construction%2C%20I%20would%20like%20to%20enquire%20about%20your%20services." target="_blank" rel="noopener noreferrer" className="footer__link">WhatsApp: +91 7540002054</a>
              <a href="mailto:info@squaareten.com" className="footer__link">Email: info@squaareten.com</a>
              <span className="footer__link" style={{ cursor: 'default', color: 'var(--color-text-muted)' }}>Mon – Sat: 9 AM – 7 PM</span>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="footer__copyright">© 2024 Squaareten Construction. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#" className="footer__bottom-link">Privacy Policy</a>
            <a href="#" className="footer__bottom-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
