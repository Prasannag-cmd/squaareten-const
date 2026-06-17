/* ============================================================
   useGSAPAnimations — GSAP + ScrollTrigger integration for React
   ============================================================ */
import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Creates a GSAP timeline scoped to a container ref.
 * Auto-cleans up on unmount.
 */
export function useGSAPTimeline(containerRef, timelineConfig = {}, deps = []) {
  const tlRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      tlRef.current = gsap.timeline(timelineConfig);
    }, containerRef);

    return () => ctx.revert();
  }, deps);

  return tlRef;
}

/**
 * Hero entrance animations
 */export function useHeroAnimation(heroRef, isReady) {
  useEffect(() => {
    if (!heroRef.current || !isReady) return;

    const hero = heroRef.current;
    const bgWrapper = hero.querySelector('.hero__bg-wrapper');
    const contentLeft = hero.querySelector('.hero__content-left');
    const tagline = hero.querySelector('.hero__tagline');
    const title = hero.querySelector('.hero__title');
    const desc = hero.querySelector('.hero__description');
    const actions = hero.querySelector('.hero__actions');
    const statsBar = hero.querySelector('.hero__stats-bar');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // 1. Fade in the background image wrapper
      if (bgWrapper) {
        tl.fromTo(bgWrapper,
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: 'power2.out' }
        );
      }

      // 2. Reveal Left Content elements
      tl.to(contentLeft, {
        opacity: 1,
        duration: 0.1,
      }, '-=0.5');

      tl.fromTo(tagline,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );

      tl.fromTo(title,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' },
        '-=0.4'
      );

      tl.fromTo(desc,
        { opacity: 0 },
        { opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.5'
      );

      tl.fromTo(actions,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );

      // 3. Reveal Bottom Stats Bar
      if (statsBar) {
        tl.fromTo(statsBar,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          '-=0.7'
        );
        
        // Slight stagger reveal for stat items inside the bar
        const items = statsBar.querySelectorAll('.hero__stat-item');
        const dividers = statsBar.querySelectorAll('.hero__stat-divider');
        
        if (items.length) {
          tl.fromTo(items,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
            '-=0.5'
          );
        }
        if (dividers.length) {
          tl.fromTo(dividers,
            { opacity: 0, scaleY: 0 },
            { opacity: 1, scaleY: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
            '-=0.4'
          );
        }
      }

      // Watermark Parallax Depth Effect on Scroll
      const watermark = hero.querySelector('.hero__watermark');
      if (watermark) {
        gsap.to(watermark, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }
    }, hero);

    return () => ctx.revert();
  }, [isReady]);
}

/**
 * Onboarding cinematic animation
 * Returns a promise that resolves when animation completes
 */
export function useOnboardingAnimation(onboardingRef, onComplete) {
  useEffect(() => {
    if (!onboardingRef.current) return;

    const el = onboardingRef.current;
    const logo = el.querySelector('.onboarding__logo');
    const glow = el.querySelector('.onboarding__glow');
    const name = el.querySelector('.onboarding__name');
    const tagline = el.querySelector('.onboarding__tagline');
    const progressBar = el.querySelector('.onboarding__progress-bar');
    const corners = el.querySelectorAll('.onboarding__corner');
    const particles = el.querySelectorAll('.onboarding__particle');

    document.documentElement.classList.add('is-loading');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.classList.remove('is-loading');
          onComplete?.();
        }
      });

      // Phase 1: Ambient Particles
      tl.to(particles, {
        opacity: (i) => 0.2 + Math.random() * 0.5,
        x: () => (Math.random() - 0.5) * 300,
        y: () => (Math.random() - 0.5) * 300,
        duration: 1.5,
        stagger: 0.05,
        ease: 'power2.out',
      }, 0);

      // Progress bar fills
      tl.to(progressBar, {
        width: '100%',
        duration: 3.2,
        ease: 'power1.inOut',
      }, 0);

      // Phase 2: Corner decorations
      tl.to(corners, {
        opacity: 0.3,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      }, 0.3);

      // Phase 3: Golden glow pulse
      tl.to(glow, {
        opacity: 0.6,
        scale: 1.2,
        duration: 1.5,
        ease: 'power2.inOut',
      }, 0.5);

      tl.to(glow, {
        opacity: 0.3,
        scale: 1,
        duration: 1,
        ease: 'power2.inOut',
      }, 2);

      // Phase 4: Logo reveal
      tl.to(logo, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'expo.out',
      }, 0.8);

      // Phase 5: Company name
      tl.to(name, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out',
      }, 1.8);

      // Phase 6: Tagline
      tl.to(tagline, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, 2.3);

      // Phase 7: Exit
      tl.to(el, {
        y: '-100%',
        duration: 0.8,
        ease: 'expo.inOut',
        delay: 0.2,
      }, 3.2);
    }, el);

    return () => ctx.revert();
  }, []);
}

export { gsap, ScrollTrigger };
