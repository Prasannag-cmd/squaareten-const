/* ============================================================
   NAVBAR — Scroll-Aware Navigation with Mobile Menu
   ============================================================ */
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';


export default function Navbar({ isVisible = false, alwaysScrolled = false }) {
  const [isScrolled, setIsScrolled] = useState(alwaysScrolled);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navbarRef = useRef(null);
  const mobileLinksRef = useRef(null);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/index.html';
  const isAboutPage = location.pathname === '/about';
  const isCareersPage = location.pathname === '/careers';

  // Navbar show animation
  useEffect(() => {
    if (isVisible && navbarRef.current) {
      gsap.to(navbarRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.2,
      });
    }
  }, [isVisible]);

  // Scroll behavior
  useEffect(() => {
    if (alwaysScrolled) return;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);
      setIsHidden(currentScrollY > lastScrollY.current && currentScrollY > 300);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [alwaysScrolled]);

  // Active section tracking
  useEffect(() => {
    if (!isHomePage) return;

    const sections = document.querySelectorAll('.section[id]');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [isHomePage]);

  // Mobile menu toggle
  const toggleMobile = useCallback(() => {
    setMobileOpen(prev => {
      const willOpen = !prev;
      if (willOpen) {
        document.body.style.overflow = 'hidden';
        // Animate links in after state update
        setTimeout(() => {
          const links = document.querySelectorAll('.navbar__mobile-link');
          if (links.length) {
            gsap.fromTo(links,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'expo.out', delay: 0.15 }
            );
          }
        }, 0);
      } else {
        document.body.style.overflow = '';
      }
      return willOpen;
    });
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  }, []);

  const navClasses = [
    'navbar',
    isVisible || alwaysScrolled ? 'is-visible' : '',
    isScrolled ? 'is-scrolled' : '',
    isHidden ? 'is-hidden' : '',
  ].filter(Boolean).join(' ');

  const homePrefix = isHomePage ? '' : '/';

  return (
    <>
      <nav className={navClasses} id="navbar" ref={navbarRef}>
        <div className="container navbar__inner">
          <Link to="/" className="navbar__logo">
            <img src="/assets/images/logo.png" alt="Squaareten Construction" className="navbar__logo-img" />
            <div className="navbar__logo-text">
              Squaareten
              <span>Construction</span>
            </div>
          </Link>

          <div className="navbar__links">
            {isHomePage ? (
              <>
                <Link to="/about" className="navbar__link">About</Link>
                <a href="#services" className={`navbar__link ${activeSection === 'services' ? 'is-active' : ''}`}>Services</a>
                <Link to="/projects" className="navbar__link">Projects</Link>
                <Link to="/careers" className="navbar__link">Careers</Link>
                <a href="#contact" className={`navbar__link ${activeSection === 'contact' ? 'is-active' : ''}`}>Contact</a>
              </>
            ) : (
              <>
                <Link to="/about" className={`navbar__link ${isAboutPage ? 'is-active' : ''}`}>About</Link>
                <Link to="/#services" className="navbar__link">Services</Link>
                <Link to="/projects" className={`navbar__link ${location.pathname === '/projects' ? 'is-active' : ''}`}>Projects</Link>
                <Link to="/careers" className={`navbar__link ${isCareersPage ? 'is-active' : ''}`}>Careers</Link>
                <Link to="/#contact" className="navbar__link">Contact</Link>
              </>
            )}
          </div>

          <div className="navbar__actions">
            {isHomePage ? (
              <a href="#contact" className="navbar__cta">Get Quote</a>
            ) : (
              <Link to="/#contact" className="navbar__cta">Get Quote</Link>
            )}
          </div>

          <button
            className={`navbar__hamburger ${mobileOpen ? 'is-active' : ''}`}
            aria-label="Toggle menu"
            onClick={toggleMobile}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`navbar__mobile-menu ${mobileOpen ? 'is-open' : ''}`} ref={mobileLinksRef}>
        {isHomePage ? (
          <>
            <Link to="/about" className="navbar__mobile-link" onClick={closeMobile}>About</Link>
            <a href="#services" className="navbar__mobile-link" onClick={closeMobile}>Services</a>
            <Link to="/projects" className="navbar__mobile-link" onClick={closeMobile}>Projects</Link>
            <Link to="/careers" className="navbar__mobile-link" onClick={closeMobile}>Careers</Link>
            <a href="#contact" className="navbar__mobile-link" onClick={closeMobile}>Contact</a>
          </>
        ) : (
          <>
            <Link to="/about" className="navbar__mobile-link" onClick={closeMobile}>About</Link>
            <Link to="/#services" className="navbar__mobile-link" onClick={closeMobile}>Services</Link>
            <Link to="/projects" className="navbar__mobile-link" onClick={closeMobile}>Projects</Link>
            <Link to="/careers" className="navbar__mobile-link" onClick={closeMobile}>Careers</Link>
            <Link to="/#contact" className="navbar__mobile-link" onClick={closeMobile}>Contact</Link>
          </>
        )}
      </div>
    </>
  );
}
