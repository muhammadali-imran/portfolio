import { profile } from '../../data/profile';
import ThemeToggle from '../ui/ThemeToggle';
import { CloseIcon, MenuIcon } from '../ui/Icons';

// Mobile and tablet navigation bar. Hidden from lg upward, where the sidebar takes over.
export default function TopBar({ open, onToggle }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-line bg-canvas/75 px-5 backdrop-blur-xl lg:hidden">
      <a href="#home" aria-label={`${profile.name}, back to top`} className="font-display text-3xl font-extrabold leading-none">
        <span className="text-grad">{profile.monogram}</span>
        <span className="text-neo-mint">.</span>
      </a>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button
          type="button"
          onClick={onToggle}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="grid size-11 place-items-center rounded-full border border-line bg-surface/70 text-ink backdrop-blur transition-colors hover:border-neo-purple hover:text-neo-purple"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </header>
  );
}
