import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/motion';

// Fades matching elements in as they scroll into view, staggered when several arrive together.
export function useBatchReveal(scope, selector) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const items = gsap.utils.toArray(selector, scope.current);
      if (!items.length) return;

      gsap.set(items, { autoAlpha: 0, y: 28 });
      ScrollTrigger.batch(items, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }),
      });
    },
    { scope },
  );
}
