/* ============================================================
   ONBOARDING — Cinematic Logo Reveal
   ============================================================ */
import { useRef, useState, useEffect } from 'react';
import { useOnboardingAnimation } from '../hooks/useGSAPAnimations';

export default function Onboarding({ onComplete }) {
  const isShown = sessionStorage.getItem('onboarding_shown') === 'true';
  const [visible, setVisible] = useState(!isShown);
  const onboardingRef = useRef(null);

  useOnboardingAnimation(onboardingRef, () => {
    setVisible(false);
    sessionStorage.setItem('onboarding_shown', 'true');
    onComplete?.();
  });

  useEffect(() => {
    if (isShown) {
      document.documentElement.classList.remove('is-loading');
      onComplete?.();
    }
  }, [isShown, onComplete]);

  if (!visible) return null;

  return (
    <div className="onboarding" id="onboarding" ref={onboardingRef}>
      <div className="onboarding__corner onboarding__corner--tl"></div>
      <div className="onboarding__corner onboarding__corner--tr"></div>
      <div className="onboarding__corner onboarding__corner--bl"></div>
      <div className="onboarding__corner onboarding__corner--br"></div>

      <div className="onboarding__particles">
        <div className="onboarding__particle" style={{ top: '15%', left: '20%' }}></div>
        <div className="onboarding__particle" style={{ top: '25%', left: '70%' }}></div>
        <div className="onboarding__particle" style={{ top: '60%', left: '15%' }}></div>
        <div className="onboarding__particle" style={{ top: '70%', left: '80%' }}></div>
        <div className="onboarding__particle" style={{ top: '40%', left: '50%' }}></div>
        <div className="onboarding__particle" style={{ top: '80%', left: '35%' }}></div>
        <div className="onboarding__particle" style={{ top: '10%', left: '85%' }}></div>
        <div className="onboarding__particle" style={{ top: '55%', left: '60%' }}></div>
      </div>

      <div className="onboarding__glow"></div>

      <div className="onboarding__logo">
        <img src="/assets/images/logo.png" alt="Squaareten Construction Logo" loading="eager" />
      </div>

      <div className="onboarding__text">
        <div className="onboarding__name">Squaareten Construction</div>
        <div className="onboarding__tagline">Building Excellence, Shaping Futures</div>
      </div>

      <div className="onboarding__progress">
        <div className="onboarding__progress-bar"></div>
      </div>
    </div>
  );
}
