import { useEffect } from 'react';
import { gsap } from '../lib/gsap';
import { hasFinePointer, prefersReducedMotion } from '../lib/motion';

// 3D tilt that follows the cursor. Also exposes --mx / --my (percent) for a glare overlay in CSS.
export function useTilt(ref, max = 6) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !hasFinePointer()) return undefined;

    gsap.set(el, { transformPerspective: 900 });
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' });

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      ry((px - 0.5) * 2 * max);
      rx(-(py - 0.5) * 2 * max);
      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);
    };
    const leave = () => {
      rx(0);
      ry(0);
    };

    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    return () => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseleave', leave);
      gsap.set(el, { rotationX: 0, rotationY: 0 });
    };
  }, [ref, max]);
}
