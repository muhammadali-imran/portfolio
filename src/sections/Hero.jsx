import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/motion';
import { profile } from '../data/profile';
import Button from '../components/ui/Button';
import CvButton from '../components/ui/CvButton';
import AvailabilityBadge from '../components/ui/AvailabilityBadge';
import TerminalCard from '../components/ui/TerminalCard';
import { ArrowRightIcon } from '../components/ui/Icons';

export default function Hero({ ready }) {
  const root = useRef(null);
  const role = useRef(null);

  // One orchestrated entrance: name lines rise, the rest follows, then the role line starts cycling.
  useGSAP(
    () => {
      if (!ready || prefersReducedMotion()) return;

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from('.h-line', { yPercent: 115, duration: 1.1, stagger: 0.12 })
        .from('.h-fade', { y: 22, autoAlpha: 0, duration: 0.8, stagger: 0.09 }, '-=0.7')
        .from('.h-card', { y: 36, autoAlpha: 0, duration: 1 }, '-=0.9');

      const roles = profile.roles;
      const loop = gsap.timeline({ repeat: -1, delay: 3 });
      roles.forEach((_, i) => {
        const next = roles[(i + 1) % roles.length];
        loop
          .to(role.current, { duration: 1.1, scrambleText: { text: next, chars: 'lowerCase', speed: 0.6 } })
          .to({}, { duration: 2.4 });
      });
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section
      id="home"
      ref={root}
      aria-label="Introduction"
      className="relative flex min-h-screen items-center px-6 pb-16 pt-28 sm:px-10 lg:px-14 lg:pt-16"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="min-w-0">
          <div className="h-fade mb-6 lg:hidden">
            <AvailabilityBadge />
          </div>

          <p className="h-fade flex items-center gap-4 font-mono text-sm text-neo-blue">
            <span aria-hidden="true" className="h-px w-10 bg-neo-blue/60" />
            Full stack developer and software engineering student
          </p>

          <h1
            aria-label={profile.name}
            className="mt-6 font-display text-[clamp(3.75rem,9.5vw,8.5rem)] font-extrabold uppercase leading-[0.86] tracking-tight"
          >
            <span aria-hidden="true" className="block overflow-hidden pb-[0.06em]">
              <span className="h-line text-grad block">Muhammad</span>
            </span>
            <span aria-hidden="true" className="block overflow-hidden pb-[0.06em]">
              <span className="h-line text-grad block">
                Ali<span className="text-neo-mint">.</span>
              </span>
            </span>
          </h1>

          <p className="h-fade mt-7 text-2xl font-semibold text-neo-red">
            <span className="sr-only">{profile.roles.join(', ')}</span>
            <span aria-hidden="true" ref={role}>
              {profile.roles[0]}
            </span>
          </p>

          <p className="h-fade mt-4 max-w-xl text-lg leading-relaxed text-muted">{profile.intro}</p>

          <div className="h-fade mt-9 flex flex-wrap items-center gap-3">
            <Button as="a" href="#projects">
              View projects
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button as="a" href="#contact" variant="ghost">
              Get in touch
            </Button>
            <CvButton />
          </div>
        </div>

        <TerminalCard ready={ready} className="h-card w-full max-w-xl lg:justify-self-end" />
      </div>
    </section>
  );
}
