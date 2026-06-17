/* ============================================================
   NAVBAR — Scroll-Aware Navigation with Mobile Menu
   ============================================================ */
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

// Theme icons removed for light-only mode


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

  // Theme locked to light-only mode

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
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);

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
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'expo.out', delay: 0.15 }
            );
          }
        }, 0);
      } else {
        document.body.style.overflow = '';
        setMobileProjectsOpen(false);
      }
      return willOpen;
    });
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileProjectsOpen(false);
    document.body.style.overflow = '';
  }, []);

  const navClasses = [
    'navbar',
    isVisible || alwaysScrolled ? 'is-visible' : '',
    isScrolled ? 'is-scrolled' : '',
    isHidden ? 'is-hidden' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <nav className={navClasses} id="navbar" ref={navbarRef}>
        <div className="container navbar__inner">
          <Link to="/" className="navbar__logo">
            <img src="/assets/images/logo.png" alt="Squaareten Constructions" className="navbar__logo-img" />
            <div className="navbar__logo-text">
              Squaareten
              <span>Constructions</span>
            </div>
          </Link>

          <div className="navbar__links">
            {isHomePage ? (
              <>
                <a href="#hero" className={`navbar__link ${activeSection === 'hero' || activeSection === '' ? 'is-active' : ''}`}>Home</a>
                <Link to="/about" className="navbar__link">About</Link>
                <div className="navbar__dropdown">
                  <Link to="/projects/residential" className={`navbar__link navbar__dropdown-trigger ${location.pathname.startsWith('/projects') ? 'is-active' : ''}`}>
                    Projects <span className="navbar__dropdown-arrow">▼</span>
                  </Link>
                  <div className="navbar__dropdown-menu">
                    <Link to="/projects/residential" className="navbar__dropdown-item">Residential</Link>
                    <Link to="/projects/interior" className="navbar__dropdown-item">Interior</Link>
                    <Link to="/projects/commercial" className="navbar__dropdown-item">Commercial</Link>
                    <Link to="/projects/plots" className="navbar__dropdown-item">Plots</Link>
                  </div>
                </div>
                <Link to="/gallery" className={`navbar__link ${location.pathname === '/gallery' ? 'is-active' : ''}`}>Gallery</Link>
                <Link to="/careers" className="navbar__link">Careers</Link>
                <a href="#contact" className={`navbar__link ${activeSection === 'contact' ? 'is-active' : ''}`}>Contact</a>
              </>
            ) : (
              <>
                <Link to="/" className="navbar__link">Home</Link>
                <Link to="/about" className={`navbar__link ${isAboutPage ? 'is-active' : ''}`}>About</Link>
                <div className="navbar__dropdown">
                  <Link to="/projects/residential" className={`navbar__link navbar__dropdown-trigger ${location.pathname.startsWith('/projects') ? 'is-active' : ''}`}>
                    Projects <span className="navbar__dropdown-arrow">▼</span>
                  </Link>
                  <div className="navbar__dropdown-menu">
                    <Link to="/projects/residential" className="navbar__dropdown-item">Residential</Link>
                    <Link to="/projects/interior" className="navbar__dropdown-item">Interior</Link>
                    <Link to="/projects/commercial" className="navbar__dropdown-item">Commercial</Link>
                    <Link to="/projects/plots" className="navbar__dropdown-item">Plots</Link>
                  </div>
                </div>
                <Link to="/gallery" className={`navbar__link ${location.pathname === '/gallery' ? 'is-active' : ''}`}>Gallery</Link>
                <Link to="/careers" className={`navbar__link ${isCareersPage ? 'is-active' : ''}`}>Careers</Link>
                <Link to="/#contact" className="navbar__link">Contact</Link>
              </>
            )}
          </div>

          <div className="navbar__actions">
            <div className="navbar__socials">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="navbar__social-link" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="navbar__social-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="navbar__social-link" aria-label="Twitter">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
            {/* Theme toggle removed */}
            <Link to="/consultation" className="navbar__cta-pill">
              <span>Consultation</span>
              <span className="navbar__cta-arrow">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </span>
            </Link>
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
            <a href="#hero" className="navbar__mobile-link" onClick={closeMobile}>Home</a>
            <Link to="/about" className="navbar__mobile-link" onClick={closeMobile}>About</Link>
            <Link to="/consultation" className="navbar__mobile-link" onClick={closeMobile}>Consultation</Link>
            
            <div className="navbar__mobile-dropdown-wrapper">
              <button 
                className={`navbar__mobile-link navbar__mobile-link--parent ${location.pathname.startsWith('/projects') ? 'is-active' : ''}`}
                onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
              >
                Projects <span className={`submenu-arrow ${mobileProjectsOpen ? 'is-open' : ''}`}>▼</span>
              </button>
              <div className={`navbar__mobile-submenu ${mobileProjectsOpen ? 'is-open' : ''}`}>
                <Link to="/projects/residential" className="navbar__mobile-link navbar__mobile-link--sub" onClick={closeMobile}>Residential</Link>
                <Link to="/projects/interior" className="navbar__mobile-link navbar__mobile-link--sub" onClick={closeMobile}>Interior</Link>
                <Link to="/projects/commercial" className="navbar__mobile-link navbar__mobile-link--sub" onClick={closeMobile}>Commercial</Link>
                <Link to="/projects/plots" className="navbar__mobile-link navbar__mobile-link--sub" onClick={closeMobile}>Plots</Link>
              </div>
            </div>

            <Link to="/gallery" className={`navbar__mobile-link ${location.pathname === '/gallery' ? 'is-active' : ''}`} onClick={closeMobile}>Gallery</Link>
            <Link to="/careers" className="navbar__mobile-link" onClick={closeMobile}>Careers</Link>
            <a href="#contact" className="navbar__mobile-link" onClick={closeMobile}>Contact</a>
          </>
        ) : (
          <>
            <Link to="/" className="navbar__mobile-link" onClick={closeMobile}>Home</Link>
            <Link to="/about" className="navbar__mobile-link" onClick={closeMobile}>About</Link>
            <Link to="/consultation" className="navbar__mobile-link" onClick={closeMobile}>Consultation</Link>
            
            <div className="navbar__mobile-dropdown-wrapper">
              <button 
                className={`navbar__mobile-link navbar__mobile-link--parent ${location.pathname.startsWith('/projects') ? 'is-active' : ''}`}
                onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
              >
                Projects <span className={`submenu-arrow ${mobileProjectsOpen ? 'is-open' : ''}`}>▼</span>
              </button>
              <div className={`navbar__mobile-submenu ${mobileProjectsOpen ? 'is-open' : ''}`}>
                <Link to="/projects/residential" className="navbar__mobile-link navbar__mobile-link--sub" onClick={closeMobile}>Residential</Link>
                <Link to="/projects/interior" className="navbar__mobile-link navbar__mobile-link--sub" onClick={closeMobile}>Interior</Link>
                <Link to="/projects/commercial" className="navbar__mobile-link navbar__mobile-link--sub" onClick={closeMobile}>Commercial</Link>
                <Link to="/projects/plots" className="navbar__mobile-link navbar__mobile-link--sub" onClick={closeMobile}>Plots</Link>
              </div>
            </div>

            <Link to="/gallery" className={`navbar__mobile-link ${location.pathname === '/gallery' ? 'is-active' : ''}`} onClick={closeMobile}>Gallery</Link>
            <Link to="/careers" className="navbar__mobile-link" onClick={closeMobile}>Careers</Link>
            <Link to="/#contact" className="navbar__mobile-link" onClick={closeMobile}>Contact</Link>
          </>
        )}
        {/* Mobile theme toggle removed */}
      </div>
    </>
  );
}
