import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { hasFinePointer, prefersReducedMotion } from '../../lib/motion';

// Fixed backdrop: grid, drifting colour blobs and a soft spotlight that trails the cursor.
export default function Background() {
  const spot = useRef(null);

  useEffect(() => {
    const el = spot.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return undefined;

    gsap.set(el, { x: window.innerWidth / 2 - 300, y: window.innerHeight / 3 - 300 });
    const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3.out' });
    const move = (e) => {
      xTo(e.clientX - 300);
      yTo(e.clientY - 300);
    };

    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div className="blob blob-purple" />
      <div className="blob blob-blue" />
      <div className="blob blob-green" />
      <div ref={spot} className="spotlight" />
    </div>
  );
}
