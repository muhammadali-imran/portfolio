import { useEffect, useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { prefersReducedMotion } from '../../lib/motion';
import { NAV } from './nav';
import AvailabilityBadge from '../ui/AvailabilityBadge';
import CvButton from '../ui/CvButton';
import SocialLinks from '../ui/SocialLinks';
import { CloseIcon } from '../ui/Icons';

const FOCUSABLE = 'a[href], button:not(:disabled), [tabindex]:not([tabindex="-1"])';

function Panel({ active, onClose }) {
  const root = useRef(null);

  // Lock page scroll, close on Escape, keep Tab inside the menu.
  useEffect(() => {
    const el = root.current;
    const previous = document.activeElement;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden';
    el.querySelector('a[href]')?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const nodes = el.querySelectorAll(FOCUSABLE);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      html.style.overflow = prevOverflow;
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [onClose]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.5, ease: 'power3.out' });
      gsap.from('.mm-item', { y: 40, autoAlpha: 0, duration: 0.6, stagger: 0.07, delay: 0.15, ease: 'power3.out' });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-canvas/95 px-6 pb-8 pt-4 backdrop-blur-2xl lg:hidden"
    >
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="grid size-11 place-items-center rounded-full border border-line text-ink"
        >
          <CloseIcon />
        </button>
      </div>

      <nav aria-label="Primary" className="mt-6">
        <ul className="space-y-1">
          {NAV.map(({ id, label }) => (
            <li key={id} className="mm-item">
              <a
                href={`#${id}`}
                onClick={onClose}
                aria-current={active === id ? 'true' : undefined}
                className={`block py-2 font-display text-6xl font-extrabold uppercase leading-none transition-colors ${
                  active === id ? 'text-grad' : 'text-ink'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mm-item mt-auto space-y-5 pt-10">
        <AvailabilityBadge />
        <div>
          <CvButton />
        </div>
        <SocialLinks className="-ml-2" />
      </div>
    </div>
  );
}

export default function MobileMenu({ open, onClose, active }) {
  if (!open) return null;
  return <Panel active={active} onClose={onClose} />;
}
