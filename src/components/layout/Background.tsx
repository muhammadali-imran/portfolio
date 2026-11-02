import { lazy, Suspense, useEffect, useState } from 'react';

const JellyfishField = lazy(() => import('../jelly/JellyfishField'));
const MarineSnow = lazy(() => import('../jelly/MarineSnow'));

export default function Background() {
  const [effectsReady, setEffectsReady] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    let firstFrame = 0;
    let secondFrame = 0;
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const loadEffects = () => setEffectsReady(true);
    const afterPaint = () => {
      if (idleWindow.requestIdleCallback) {
        idleId = idleWindow.requestIdleCallback(loadEffects, { timeout: 1500 });
      } else {
        timeoutId = window.setTimeout(loadEffects, 120);
      }
    };

    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(afterPaint);
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div className="background-emerald-light absolute inset-0" />
      <div className="background-raspberry-glow absolute inset-0" />
      <div className="background-vignette absolute inset-0" />
      {effectsReady && (
        <Suspense fallback={null}>
          <MarineSnow />
          <JellyfishField />
        </Suspense>
      )}
    </div>
  );
}
