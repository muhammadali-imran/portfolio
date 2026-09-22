import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';

// Thin gradient bar at the top that fills as you scroll.
export default function ScrollProgress() {
  const bar = useRef(null);

  useGSAP(() => {
    gsap.to(bar.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.2,
      },
    });
  });

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-60 h-0.75">
      <div
        ref={bar}
        className="h-full origin-left scale-x-0"
        style={{ backgroundImage: 'linear-gradient(90deg, var(--purple), var(--blue), var(--mint))' }}
      />
    </div>
  );
}
