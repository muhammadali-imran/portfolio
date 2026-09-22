import { useEffect, useRef, useCallback } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { prefersReducedMotion } from '../../lib/motion';
import { profile } from '../../data/profile';
import { NAV } from './nav';
import ThemeToggle from '../ui/ThemeToggle';
import CvButton from '../ui/CvButton';
import SocialLinks from '../ui/SocialLinks';
import { SearchIcon } from '../ui/Icons';

export default function Sidebar({ active, ready, onOpenPalette }) {
  const nav = useRef(null);
  const indicator = useRef(null);
  const items = useRef({});

  // Calculate position using relative bounding rectangles
  const place = useCallback(
    (duration = 0.45) => {
      const navEl = nav.current;
      const activeEl = items.current[active];
      const indEl = indicator.current;

      if (!navEl || !activeEl || !indEl) return;

      const navRect = navEl.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();

      // Exact pixel offset of the active item relative to the <nav> container
      const relativeY = activeRect.top - navRect.top;
      const height = activeRect.height;

      gsap.to(indEl, {
        y: relativeY,
        height: height,
        opacity: 1,
        duration: prefersReducedMotion() ? 0 : duration,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    },
    [active],
  );

  // Trigger movement whenever active link updates
  useGSAP(
    () => {
      place(prefersReducedMotion() ? 0 : 0.45);
    },
    { dependencies: [active] },
  );

  // Re-measure on window/sidebar resize
  useEffect(() => {
    const el = nav.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;

    const observer = new ResizeObserver(() => place(0));
    observer.observe(el);

    return () => observer.disconnect();
  }, [place]);

  // Entrance animation on load
  useGSAP(
    () => {
      if (!ready || prefersReducedMotion()) return;
      gsap.from('.nav-item', {
        x: -24,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power3.out',
        delay: 0.3,
      });
    },
    { scope: nav, dependencies: [ready] },
  );

  return (
    <aside
      aria-label="Site sidebar"
      className="
        fixed inset-y-0 left-0 z-40 hidden w-22 flex-col overflow-y-auto 
        border-r border-line bg-surface/70 backdrop-blur-xl lg:flex xl:w-60
      "
    >
      <div className="flex flex-col items-center gap-3 px-4 pt-8 xl:flex-row xl:items-center xl:justify-between xl:px-6">
        <a
          href="#home"
          aria-label={`${profile.name}, back to top`}
          className="font-display text-4xl font-extrabold leading-none"
        >
          <span className="text-grad">{profile.monogram}</span>
          <span className="text-neo-mint">.</span>
        </a>

        <ThemeToggle />
      </div>

      <nav ref={nav} aria-label="Primary" className="relative mt-12 px-3 xl:px-4">
        <span
          ref={indicator}
          aria-hidden="true"
          className="
            absolute inset-x-3 top-0 rounded-2xl bg-neo-purple/12 opacity-0 
            ring-1 ring-neo-purple/30 xl:inset-x-4 pointer-events-none
          "
        />
        <ul className="flex flex-col gap-1">
          {NAV.map(({ id, label, Icon }) => (
            <li key={id} className="nav-item">
              <a
                ref={(el) => {
                  items.current[id] = el;
                }}
                href={`#${id}`}
                title={label}
                aria-current={active === id ? 'true' : undefined}
                className={`relative flex items-center justify-center gap-4 rounded-2xl px-4 py-3.5 text-[0.95rem] font-medium transition-colors xl:justify-start ${
                  active === id ? 'text-neo-purple' : 'text-muted hover:text-ink'
                }`}
              >
                <Icon className="size-5 shrink-0" />
                <span className="hidden xl:inline">{label}</span>
                <span className="sr-only xl:hidden">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto space-y-3 px-3 pb-6 pt-8 xl:px-4">
        <button
          type="button"
          onClick={onOpenPalette}
          aria-label="Open quick search (Ctrl K)"
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-line bg-surface2/50 px-3 py-3 text-sm text-muted transition-colors hover:border-neo-purple hover:text-ink xl:justify-between xl:px-4"
        >
          <span className="flex items-center gap-3">
            <SearchIcon className="size-4" />
            <span className="hidden xl:inline">Quick search</span>
          </span>
          <kbd className="kbd hidden xl:inline">Ctrl K</kbd>
        </button>

        <CvButton railLabel className="w-full px-0! xl:px-5!" />

        <SocialLinks vertical className="justify-center xl:flex-row! xl:justify-start xl:-ml-1" />
      </div>
    </aside>
  );
}
