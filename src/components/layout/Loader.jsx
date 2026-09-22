import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { profile } from '../../data/profile';

// First-visit intro: monogram rises, a bar fills, then the curtain lifts off the page.
export default function Loader({ onReveal, onDone }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ onComplete: onDone });
      tl.from('.ld-letter', { yPercent: 120, duration: 0.7, stagger: 0.12, ease: 'expo.out' })
        .from('.ld-bar', { scaleX: 0, duration: 0.9, ease: 'power2.inOut' }, '<+=0.1')
        .to('.ld-inner', { autoAlpha: 0, duration: 0.25 }, '+=0.15')
        .addLabel('curtain')
        .call(onReveal, null, 'curtain')
        .to(root.current, { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, 'curtain');
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-100 grid place-items-center bg-canvas"
    >
      <div className="ld-inner text-center">
        <div className="flex justify-center font-display text-8xl font-extrabold leading-none">
          {profile.monogram.split('').map((char) => (
            <span key={char} className="block overflow-hidden pb-2">
              <span className="ld-letter text-grad block">{char}</span>
            </span>
          ))}
          <span className="block overflow-hidden pb-2">
            <span className="ld-letter block text-neo-mint">.</span>
          </span>
        </div>
        <div className="mx-auto mt-6 h-0.75 w-40 overflow-hidden rounded-full bg-line">
          <div
            className="ld-bar h-full origin-left"
            style={{ backgroundImage: 'linear-gradient(90deg, var(--purple), var(--blue), var(--mint))' }}
          />
        </div>
      </div>
    </div>
  );
}
