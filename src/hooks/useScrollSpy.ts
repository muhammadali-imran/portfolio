import { useEffect, useState } from 'react';

// Tracks the section crossing the reading line without a per-frame scroll handler.
export function useScrollSpy(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * 0.4;
      let current = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // The last section can be shorter than the viewport, so force it at the very bottom.
      if (ids.length && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = ids[ids.length - 1];
      }
      setActive((previous) => (previous === current ? previous : current));
    };

    const observer = new IntersectionObserver(update, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    for (const id of ids) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    update();
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
