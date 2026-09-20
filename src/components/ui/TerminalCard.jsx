import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { prefersReducedMotion } from '../../lib/motion';

const LINES = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'muhammad-ali, full stack developer' },
  { type: 'cmd', text: 'cat focus.txt' },
  { type: 'out', text: 'AI-powered apps, automation, security' },
  { type: 'cmd', text: 'education --current' },
  { type: 'out', text: 'BS Software Engineering, NUST (2023 to 2027)' },
  { type: 'cmd', text: 'status' },
  { type: 'ok', text: 'active to work' },
];

const summary = `Terminal window: ${LINES.filter((l) => l.type !== 'cmd')
  .map((l) => l.text)
  .join('. ')}.`;

export default function TerminalCard({ ready, className = '' }) {
  const root = useRef(null);

  // Types each line in, one after another.
  useGSAP(
    () => {
      if (!ready || prefersReducedMotion()) return;
      const rows = gsap.utils.toArray('.t-row', root.current);
      const tl = gsap.timeline({ delay: 1.2 });

      rows.forEach((row, i) => {
        const target = row.querySelector('.t-text');
        const full = LINES[i].text;
        gsap.set(row, { autoAlpha: 0 });
        target.textContent = '';
        tl.set(row, { autoAlpha: 1 });
        tl.to(target, { duration: Math.max(0.35, full.length * 0.028), text: { value: full }, ease: 'none' });
        tl.to({}, { duration: LINES[i].type === 'cmd' ? 0.25 : 0.45 });
      });
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <div
      ref={root}
      role="img"
      aria-label={summary}
      className={`overflow-hidden rounded-2xl border border-line bg-surface/70 shadow-glow backdrop-blur-xl ${className}`}
    >
      <div aria-hidden="true">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="size-3 rounded-full bg-neo-red" />
          <span className="size-3 rounded-full bg-neo-blue" />
          <span className="size-3 rounded-full bg-neo-mint" />
          <span className="ml-3 font-mono text-xs text-muted">~/muhammad-ali</span>
        </div>
        <div className="space-y-2 p-5 font-mono text-[0.82rem] leading-relaxed sm:text-sm">
          {LINES.map((line, i) => (
            <div key={line.text} className="t-row flex gap-3">
              <span className={`select-none ${line.type === 'cmd' ? 'text-neo-green' : 'text-transparent'}`}>$</span>
              <span
                className={`min-w-0 break-words ${
                  line.type === 'cmd' ? 'text-ink' : line.type === 'ok' ? 'text-neo-green' : 'text-muted'
                }`}
              >
                {line.type === 'ok' && <span className="mr-2">●</span>}
                <span className="t-text">{line.text}</span>
                {i === LINES.length - 1 && <span className="caret" />}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
