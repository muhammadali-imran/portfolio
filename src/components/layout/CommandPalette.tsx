import { useEffect, useMemo, useRef, useState } from 'react';
import { profile } from '../../data/profile';
import { scrollToId } from '../../lib/motion';
import { useTheme } from '../../hooks/useTheme';
import { NAV } from './nav';
import { SearchIcon } from '../ui/Icons';

type CommandPaletteProps = { open: boolean; onClose: () => void };
type PaletteItem = { id: string; group: string; label: string; keepOpen?: boolean; run: () => void | Promise<void> };
type DialogProps = Pick<CommandPaletteProps, 'onClose'>;

function Dialog({ onClose }: DialogProps) {
  const { theme, toggle } = useTheme();
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const [notice, setNotice] = useState('');
  const input = useRef<HTMLInputElement>(null);

  const items = useMemo(() => {
    const openLink = (href: string) => () => window.open(href, '_blank', 'noopener,noreferrer');
    const list: PaletteItem[] = NAV.map((n) => ({ id: `go-${n.id}`, group: 'Go to', label: n.label, run: () => scrollToId(n.id) }));

    list.push({
      id: 'theme',
      group: 'Action',
      label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
      run: () => toggle(),
    });
    if (profile.cv.enabled) {
      list.push({
        id: 'cv',
        group: 'Action',
        label: 'Download CV',
        run: () => {
          const a = document.createElement('a');
          a.href = profile.cv.url;
          a.download = profile.cv.fileName;
          a.click();
        },
      });
    }
    if (profile.discord) {
      list.push({
        id: 'discord',
        group: 'Contact',
        label: 'Copy Discord username',
        keepOpen: true,
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.discord);
            setNotice('Discord username copied');
          } catch {
            setNotice('Could not copy. Use the contact section instead.');
          }
        },
      });
    }
    if (profile.email) {
      list.push({
        id: 'mail',
        group: 'Contact',
        label: 'Send an email',
        run: () => {
          window.location.href = `mailto:${profile.email}`;
        },
      });
      list.push({
        id: 'copy',
        group: 'Contact',
        label: 'Copy email address',
        keepOpen: true,
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            setNotice('Email address copied');
          } catch {
            setNotice('Could not copy. Select the address in the contact section instead.');
          }
        },
      });
    }
    list.push({ id: 'gh', group: 'Link', label: 'Open GitHub profile', run: openLink(profile.github) });
    list.push({ id: 'li', group: 'Link', label: 'Open LinkedIn profile', run: openLink(profile.linkedin) });
    return list;
  }, [theme, toggle]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((item) => item.label.toLowerCase().includes(q)) : items;
  }, [items, query]);

  // Remember what had focus so we can hand it back on close.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    input.current?.focus();
    return () => {
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, []);

  const runItem = (item?: PaletteItem) => {
    if (!item) return;
    if (!item.keepOpen) onClose();
    item.run();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runItem(results[index]);
    } else if (e.key === 'Tab') {
      e.preventDefault(); // keep focus in the search field while the dialog is open
    }
  };

  return (
    <div className="fixed inset-0 z-90 flex items-start justify-center px-4 pt-[14vh]">
      <button
        type="button"
        aria-label="Close quick search"
        onClick={onClose}
        className="absolute inset-0 border-0 bg-black/50 p-0 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Quick search"
        className="pop-in relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-glow"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <SearchIcon className="size-5 text-muted" />
          <input
            ref={input}
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setQuery(e.target.value);
              setIndex(0);
              setNotice('');
            }}
            onKeyDown={onKeyDown}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[index] ? `palette-${results[index].id}` : undefined}
            aria-label="Search sections and actions"
            placeholder="Search sections and actions"
            className="w-full bg-transparent py-4 text-ink outline-none placeholder:text-muted"
          />
          <kbd className="kbd">Esc</kbd>
        </div>

        <ul id="palette-list" role="listbox" className="max-h-72 overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No matches. Try “projects” or “theme”.</li>}
          {results.map((item, i) => (
            <li key={item.id}>
              <button
                type="button"
                id={`palette-${item.id}`}
                role="option"
                tabIndex={-1}
                aria-selected={i === index}
                onMouseEnter={() => setIndex(i)}
                onClick={() => runItem(item)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-3 text-left text-sm ${
                  i === index ? 'bg-neo-purple/12 text-ink' : 'text-muted'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs text-muted">{item.group}</span>
              </button>
            </li>
          ))}
        </ul>

        <p role="status" className="min-h-9 border-t border-line px-4 py-2 text-xs text-muted">
          {notice || 'Use the arrow keys to move and Enter to run.'}
        </p>
      </div>
    </div>
  );
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  if (!open) return null;
  return <Dialog onClose={onClose} />;
}
