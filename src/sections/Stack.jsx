import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/motion';
import { skillGroups, marqueeItems } from '../data/skills';
import { timeline } from '../data/experience';
import SectionHeading from '../components/ui/SectionHeading';
import Tag from '../components/ui/Tag';
import { useBatchReveal } from '../hooks/useBatchReveal';

const dot = {
  purple: 'bg-neo-purple',
  blue: 'bg-neo-blue',
  green: 'bg-neo-mint',
  red: 'bg-neo-red',
};
const typeColor = {
  purple: 'text-neo-purple',
  blue: 'text-neo-blue',
  green: 'text-neo-green',
  red: 'text-neo-red',
};

export default function Stack() {
  const root = useRef(null);
  const list = useRef(null);
  const line = useRef(null);
  useBatchReveal(root, '.reveal');

  // The coloured line grows down the timeline as you scroll.
  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(line.current, { scaleY: 1 });
        return;
      }
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: list.current, start: 'top 70%', end: 'bottom 65%', scrub: true },
        },
      );
      ScrollTrigger.refresh();
    },
    { scope: root },
  );

  return (
    <section id="stack" ref={root} aria-label="Tools and experience" className="relative px-6 py-28 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <SectionHeading className="max-w-3xl">The tools I reach for, and the path so far</SectionHeading>

        <div className="marquee mt-12" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex shrink-0 items-center gap-3 pr-3">
                {marqueeItems.map((item) => (
                  <li key={item} className="rounded-full border border-line bg-surface/60 px-5 py-2 font-mono text-sm text-muted backdrop-blur">
                    {item}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <dl className="mt-12 divide-y divide-line border-y border-line">
          {skillGroups.map((group) => (
            <div key={group.label} className="reveal grid gap-3 py-6 md:grid-cols-[14rem_1fr] md:gap-8">
              <dt className="flex items-center gap-3 font-medium text-ink">
                <span aria-hidden="true" className={`size-2.5 rounded-full ${dot[group.tone]}`} />
                {group.label}
              </dt>
              <dd className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Tag key={item} tone={group.tone}>
                    {item}
                  </Tag>
                ))}
              </dd>
            </div>
          ))}
        </dl>

        <h3 className="mt-24 font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
          Education and experience
        </h3>

        <ol ref={list} className="relative mt-10 ml-2 space-y-10 border-l border-line pl-8 sm:ml-4 sm:pl-10">
          <span
            ref={line}
            aria-hidden="true"
            className="absolute -left-px top-0 h-full w-[2px] origin-top"
            style={{ backgroundImage: 'linear-gradient(180deg, var(--purple), var(--blue), var(--mint))' }}
          />
          {timeline.map((item) => (
            <li key={item.title} className="reveal relative">
              <span
                aria-hidden="true"
                className={`absolute -left-[2.375rem] top-2 size-3 rounded-full ring-4 ring-canvas sm:-left-[2.875rem] ${dot[item.tone]}`}
              />
              <p className="text-sm text-muted">
                <span className={`font-semibold ${typeColor[item.tone]}`}>{item.type}</span>
                <span className="mx-2" aria-hidden="true">
                  /
                </span>
                {item.period}
              </p>
              <h4 className="mt-1 text-2xl font-semibold text-ink">{item.title}</h4>
              <p className="text-neo-blue">{item.org}</p>
              <p className="mt-2 max-w-2xl leading-relaxed text-muted">{item.summary}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
