import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { prefersReducedMotion } from '../../lib/motion';
import Jellyfish from '../jelly/Jellyfish';

type LoaderProps = { onReveal: () => void; onDone: () => void };

export default function Loader({ onReveal, onDone }: LoaderProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        onReveal();
        onDone();
        return;
      }

      const tl = gsap.timeline({ onComplete: onDone });
      tl.from('.ld-inner', { y: 16, autoAlpha: 0, duration: 0.55, ease: 'power3.out' })
        .from('.ld-bar', { scaleX: 0, duration: 0.9, ease: 'power2.inOut' }, '<+=0.1')
        .to('.ld-inner', { autoAlpha: 0, duration: 0.25 }, '+=0.15')
        .addLabel('curtain')
        .call(onReveal, [], 'curtain')
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
        <Jellyfish className="mx-auto w-28 text-neo-mint" />
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.22em] text-muted">Entering the deep</p>
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
