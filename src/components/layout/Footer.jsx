import { profile } from '../../data/profile';
import { scrollToId } from '../../lib/motion';
import SocialLinks from '../ui/SocialLinks';
import { ArrowUpIcon } from '../ui/Icons';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line px-6 pb-8 pt-16 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <p
          aria-hidden="true"
          className="text-grad select-none font-display text-[clamp(4rem,17vw,13rem)] font-extrabold uppercase leading-[0.8] opacity-90"
        >
          {profile.name}
        </p>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind CSS and GSAP.
          </p>
          <div className="flex items-center gap-3">
            <SocialLinks />
            <button
              type="button"
              onClick={() => scrollToId('home')}
              aria-label="Back to top"
              className="grid size-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-neo-purple hover:text-neo-purple"
            >
              <ArrowUpIcon />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
