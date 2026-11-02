import { useCallback, useState } from 'react';
import { profile } from '../../data/profile';
import { NAV, SECTION_IDS } from './nav';
import { SearchIcon, MenuIcon, CloseIcon } from '../ui/Icons';
import CvButton from '../ui/CvButton';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import MobileMenu from './MobileMenu';

type NavbarProps = { onOpenPalette: () => void };

export default function Navbar({ onOpenPalette }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(SECTION_IDS);
  const onClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-5 px-5 sm:px-8">
          <a
            href="#home"
            aria-label={`${profile.name}, back to top`}
            className="shrink-0 font-display text-3xl font-extrabold leading-none"
          >
            <span className="text-grad">{profile.monogram}</span>
            <span className="text-neo-mint">.</span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? 'location' : undefined}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  active === id ? 'bg-neo-mint/10 text-neo-mint' : 'text-muted hover:text-ink'
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenPalette}
              aria-label="Open quick search (Ctrl K)"
              className="hidden size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-neo-mint hover:text-neo-mint sm:grid"
            >
              <SearchIcon className="size-4" />
            </button>
            <CvButton variant="primary" className="hidden sm:inline-flex" />
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls={open ? 'mobile-menu' : undefined}
              className="grid size-10 place-items-center rounded-full border border-line text-ink transition-colors hover:border-neo-mint hover:text-neo-mint lg:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={onClose} active={active} />
    </>
  );
}
