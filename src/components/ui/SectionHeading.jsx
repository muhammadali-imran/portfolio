import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '../../lib/gsap';
import { prefersReducedMotion } from '../../lib/motion';

// Big condensed heading whose lines rise out of a mask when scrolled into view.
export default function SectionHeading({ children, as: Tag = 'h2', className = '' }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      SplitText.create(ref.current, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 0.9,
            stagger: 0.08,
            ease: 'power4.out',
            scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
          });
        },
      });
    },
    { scope: ref },
  );

  return (
    <Tag
      ref={ref}
      className={`font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl ${className}`}
    >
      {children}
    </Tag>
  );
}
