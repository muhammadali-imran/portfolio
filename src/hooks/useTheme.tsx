import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { MouseEvent, PropsWithChildren } from 'react';
import { flushSync } from 'react-dom';

type Theme = 'light' | 'dark';
type ThemeContextValue = {
  theme: Theme;
  toggle: (event?: MouseEvent<HTMLElement>) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const readTheme = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeProvider({ children }: PropsWithChildren) {
  // index.html already set data-theme before React mounted, so just read it back.
  const [theme, setTheme] = useState(readTheme);

  const toggle = useCallback(
    (event?: MouseEvent<HTMLElement>) => {
      const next = theme === 'dark' ? 'light' : 'dark';

      const commit = () => {
        applyTheme(next);
        flushSync(() => setTheme(next));
        try {
          localStorage.setItem('theme', next);
        } catch {
          /* storage can be unavailable (private mode); the theme still changes */
        }
      };

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!document.startViewTransition || reduce) {
        commit();
        return;
      }

      // Grow the new theme out of the button that was clicked.
      const rect = event?.currentTarget?.getBoundingClientRect();
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

      const transition = document.startViewTransition(commit);
      transition.ready
        .then(() => {
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: 650, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' },
          );
        })
        .catch(() => {});
    },
    [theme],
  );

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
