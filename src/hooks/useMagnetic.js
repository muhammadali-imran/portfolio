import { useEffect } from 'react';
import { gsap } from '../lib/gsap';
import { hasFinePointer, prefersReducedMotion } from '../lib/motion';

// Pulls an element slightly toward the cursor while hovering. Desktop pointers only.
export function useMagnetic(ref, enabled = true, strength = 0.25) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled || prefersReducedMotion() || !hasFinePointer()) return undefined;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });

    const move = (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    return () => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseleave', leave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [ref, enabled, strength]);
}
