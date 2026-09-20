import { useEffect, useMemo, useRef, useState } from 'react';
import { profile, whatsappUrl } from '../../data/profile';
import { scrollToId } from '../../lib/motion';
import { useTheme } from '../../hooks/useTheme';
import { NAV } from './nav';
import { SearchIcon } from '../ui/Icons';

function Dialog({ onClose }) {
  const { theme, toggle } = useTheme();
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const [notice, setNotice] = useState('');
  const input = useRef(null);

  const items = useMemo(() => {
    const open = (href) => () => window.open(href, '_blank', 'noopener,noreferrer');
    const list = NAV.map((n) => ({ id: `go-${n.id}`, group: 'Go to', label: n.label, run: () => scrollToId(n.id) }));

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
    if (profile.whatsapp) {
      list.push({ id: 'wa', group: 'Contact', label: 'Message on WhatsApp', run: open(whatsappUrl()) });
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
    list.push({ id: 'gh', group: 'Link', label: 'Open GitHub profile', run: open(profile.github) });
    list.push({ id: 'li', group: 'Link', label: 'Open LinkedIn profile', run: open(profile.linkedin) });
    return list;
  }, [theme, toggle]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((item) => item.label.toLowerCase().includes(q)) : items;
  }, [items, query]);

  // Remember what had focus so we can hand it back on close.
  useEffect(() => {
    const previous = document.activeElement;
    input.current?.focus();
    return () => {
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, []);

  const runItem = (item) => {
    if (!item) return;
    if (!item.keepOpen) onClose();
    item.run();
  };

  const onKeyDown = (e) => {
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
    <div className="fixed inset-0 z-[90] flex items-start justify-center bg-black/50 px-4 pt-[14vh] backdrop-blur-sm" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Quick search"
        onMouseDown={(e) => e.stopPropagation()}
        className="pop-in w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-glow"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <SearchIcon className="size-5 text-muted" />
          <input
            ref={input}
            value={query}
            onChange={(e) => {
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
            <li
              key={item.id}
              id={`palette-${item.id}`}
              role="option"
              aria-selected={i === index}
              onMouseEnter={() => setIndex(i)}
              onClick={() => runItem(item)}
              className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-3 text-sm ${
                i === index ? 'bg-neo-purple/12 text-ink' : 'text-muted'
              }`}
            >
              <span>{item.label}</span>
              <span className="text-xs text-muted">{item.group}</span>
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

export default function CommandPalette({ open, onClose }) {
  if (!open) return null;
  return <Dialog onClose={onClose} />;
}
