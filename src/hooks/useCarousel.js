/* ============================================================
   useCarousel — GSAP-Powered Auto-Carousel Hook
   ============================================================ */
import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

export function useCarousel(totalSlides, autoPlayDelay = 4000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);
  const progressBarRef = useRef(null);
  const carouselRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const autoPlayRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const dragThreshold = 80;

  // Go to a specific slide
  const goToSlide = useCallback((index, animate = true) => {
    if (isAnimatingRef.current || index === currentIndex) return;

    let newIndex = index;
    if (newIndex < 0) newIndex = totalSlides - 1;
    if (newIndex >= totalSlides) newIndex = 0;

    isAnimatingRef.current = true;

    const track = trackRef.current;
    if (!track) return;

    // Animate track
    gsap.to(track, {
      x: `-${newIndex * 100}%`,
      duration: animate ? 0.8 : 0,
      ease: 'expo.inOut',
      onComplete: () => {
        isAnimatingRef.current = false;
      }
    });

    // Animate slide content
    const slides = track.children;
    const currentContent = slides[currentIndex]?.querySelector('.carousel__slide-content');
    const nextContent = slides[newIndex]?.querySelector('.carousel__slide-content');

    if (animate && currentContent && nextContent) {
      gsap.to(currentContent, {
        opacity: 0, y: 20,
        duration: 0.3, ease: 'power2.in',
      });
      gsap.fromTo(nextContent,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', delay: 0.3 }
      );
    }

    setCurrentIndex(newIndex);
  }, [currentIndex, totalSlides]);

  // Reset progress bar
  const resetProgressBar = useCallback(() => {
    const bar = progressBarRef.current;
    if (!bar) return;
    gsap.killTweensOf(bar);
    gsap.fromTo(bar,
      { width: '0%' },
      { width: '100%', duration: autoPlayDelay / 1000, ease: 'none' }
    );
  }, [autoPlayDelay]);

  // Start/stop autoplay
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, autoPlayDelay);
  }, [goToSlide, currentIndex, autoPlayDelay]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  // Auto-advance effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimatingRef.current) {
        setCurrentIndex(prev => {
          const next = (prev + 1) % totalSlides;
          const track = trackRef.current;
          if (track) {
            isAnimatingRef.current = true;

            // Fade out current content
            const currentContent = track.children[prev]?.querySelector('.carousel__slide-content');
            const nextContent = track.children[next]?.querySelector('.carousel__slide-content');

            if (currentContent) {
              gsap.to(currentContent, { opacity: 0, y: 20, duration: 0.3, ease: 'power2.in' });
            }

            gsap.to(track, {
              x: `-${next * 100}%`,
              duration: 0.8,
              ease: 'expo.inOut',
              onComplete: () => {
                isAnimatingRef.current = false;
              }
            });

            if (nextContent) {
              gsap.fromTo(nextContent,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', delay: 0.3 }
              );
            }
          }
          return next;
        });
      }
    }, autoPlayDelay);

    autoPlayRef.current = interval;
    return () => clearInterval(interval);
  }, [totalSlides, autoPlayDelay]);

  // Progress bar effect
  useEffect(() => {
    const bar = progressBarRef.current;
    if (!bar) return;
    gsap.killTweensOf(bar);
    gsap.fromTo(bar,
      { width: '0%' },
      { width: '100%', duration: autoPlayDelay / 1000, ease: 'none' }
    );
  }, [currentIndex, autoPlayDelay]);

  // Initialize track position
  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      gsap.set(track, { x: '0%' });
    }
  }, []);

  // Navigate functions
  const goNext = useCallback(() => {
    stopAutoPlay();
    const next = (currentIndex + 1) % totalSlides;
    const track = trackRef.current;
    if (track && !isAnimatingRef.current) {
      isAnimatingRef.current = true;
      const currentContent = track.children[currentIndex]?.querySelector('.carousel__slide-content');
      const nextContent = track.children[next]?.querySelector('.carousel__slide-content');
      if (currentContent) gsap.to(currentContent, { opacity: 0, y: 20, duration: 0.3, ease: 'power2.in' });
      gsap.to(track, {
        x: `-${next * 100}%`, duration: 0.8, ease: 'expo.inOut',
        onComplete: () => { isAnimatingRef.current = false; }
      });
      if (nextContent) gsap.fromTo(nextContent, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', delay: 0.3 });
      setCurrentIndex(next);
    }
  }, [currentIndex, totalSlides, stopAutoPlay]);

  const goPrev = useCallback(() => {
    stopAutoPlay();
    const prev = (currentIndex - 1 + totalSlides) % totalSlides;
    const track = trackRef.current;
    if (track && !isAnimatingRef.current) {
      isAnimatingRef.current = true;
      const currentContent = track.children[currentIndex]?.querySelector('.carousel__slide-content');
      const prevContent = track.children[prev]?.querySelector('.carousel__slide-content');
      if (currentContent) gsap.to(currentContent, { opacity: 0, y: 20, duration: 0.3, ease: 'power2.in' });
      gsap.to(track, {
        x: `-${prev * 100}%`, duration: 0.8, ease: 'expo.inOut',
        onComplete: () => { isAnimatingRef.current = false; }
      });
      if (prevContent) gsap.fromTo(prevContent, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', delay: 0.3 });
      setCurrentIndex(prev);
    }
  }, [currentIndex, totalSlides, stopAutoPlay]);

  const goToDot = useCallback((index) => {
    stopAutoPlay();
    const track = trackRef.current;
    if (track && !isAnimatingRef.current && index !== currentIndex) {
      isAnimatingRef.current = true;
      const currentContent = track.children[currentIndex]?.querySelector('.carousel__slide-content');
      const nextContent = track.children[index]?.querySelector('.carousel__slide-content');
      if (currentContent) gsap.to(currentContent, { opacity: 0, y: 20, duration: 0.3, ease: 'power2.in' });
      gsap.to(track, {
        x: `-${index * 100}%`, duration: 0.8, ease: 'expo.inOut',
        onComplete: () => { isAnimatingRef.current = false; }
      });
      if (nextContent) gsap.fromTo(nextContent, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', delay: 0.3 });
      setCurrentIndex(index);
    }
  }, [currentIndex, stopAutoPlay]);

  // Drag/swipe handlers
  const onDragStart = useCallback((e) => {
    isDraggingRef.current = true;
    startXRef.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    stopAutoPlay();
  }, [stopAutoPlay]);

  const onDragEnd = useCallback((e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const diff = startXRef.current - endX;
    if (Math.abs(diff) > dragThreshold) {
      if (diff > 0) goNext();
      else goPrev();
    }
  }, [goNext, goPrev]);

  // Pause on hover
  const onMouseEnter = useCallback(() => stopAutoPlay(), [stopAutoPlay]);
  const onMouseLeave = useCallback(() => {
    // Restart auto-play handled by the effect
  }, []);

  return {
    currentIndex,
    trackRef,
    progressBarRef,
    carouselRef,
    goNext,
    goPrev,
    goToDot,
    onDragStart,
    onDragEnd,
    onMouseEnter,
    onMouseLeave,
  };
}

export default useCarousel;
