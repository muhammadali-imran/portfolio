import { useEffect, useRef } from 'react';

type Dot = { x: number; y: number; radius: number; alpha: number; speed: number };
type WorkerMessage =
  | {
      type: 'init';
      canvas: OffscreenCanvas;
      width: number;
      height: number;
      dpr: number;
      count: number;
      animate: boolean;
      visible: boolean;
    }
  | { type: 'resize'; width: number; height: number; dpr: number; count: number }
  | { type: 'playback'; animate: boolean; visible: boolean };

const makeDots = (count: number, width: number, height: number): Dot[] =>
  Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 0.5 + Math.random() * 1.1,
    alpha: 0.12 + Math.random() * 0.38,
    speed: 0.08 + Math.random() * 0.22,
  }));

function drawDots(
  context: CanvasRenderingContext2D,
  dots: Dot[],
  width: number,
  height: number,
) {
  context.clearRect(0, 0, width, height);
  for (const dot of dots) {
    context.beginPath();
    context.fillStyle = `rgba(145, 240, 202, ${dot.alpha})`;
    context.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
    context.fill();
  }
}

export default function MarineSnow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileViewport = window.matchMedia('(max-width: 640px)');
    let width = 0;
    let height = 0;
    let dpr = 1;
    let dots: Dot[] = [];
    let context: CanvasRenderingContext2D | null = null;
    let worker: Worker | null = null;
    let frame = 0;
    let lastFrame = 0;
    let animate = !motionPreference.matches;
    let visible = document.visibilityState === 'visible';

    const dimensions = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      return mobileViewport.matches ? 40 : 88;
    };

    const draw = (timestamp: number) => {
      if (!context) return;
      if (timestamp - lastFrame < 33) {
        frame = window.requestAnimationFrame(draw);
        return;
      }
      lastFrame = timestamp;
      for (const dot of dots) {
        dot.y -= dot.speed;
        if (dot.y < -dot.radius) {
          dot.y = height + dot.radius;
          dot.x = Math.random() * width;
        }
      }
      drawDots(context, dots, width, height);
      if (animate && visible) frame = window.requestAnimationFrame(draw);
    };

    const updatePlayback = () => {
      animate = !motionPreference.matches;
      visible = document.visibilityState === 'visible';
      if (worker) {
        worker.postMessage({ type: 'playback', animate, visible } satisfies WorkerMessage);
        return;
      }
      window.cancelAnimationFrame(frame);
      if (context) {
        if (animate && visible) {
          lastFrame = 0;
          frame = window.requestAnimationFrame(draw);
        } else {
          drawDots(context, dots, width, height);
        }
      }
    };

    const resize = () => {
      const count = dimensions();
      if (worker) {
        worker.postMessage({ type: 'resize', width, height, dpr, count } satisfies WorkerMessage);
        return;
      }
      canvas.width = Math.ceil(width * dpr);
      canvas.height = Math.ceil(height * dpr);
      context?.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = makeDots(count, width, height);
      if (context) {
        drawDots(context, dots, width, height);
        updatePlayback();
      }
    };

    if (typeof Worker !== 'undefined' && 'transferControlToOffscreen' in canvas) {
      worker = new Worker(new URL('./marineSnow.worker.ts', import.meta.url), { type: 'module' });
      worker.onerror = (event) => {
        console.error('Marine snow worker failed.', event.message);
      };
      const count = dimensions();
      const offscreen = canvas.transferControlToOffscreen();
      worker.postMessage(
        { type: 'init', canvas: offscreen, width, height, dpr, count, animate, visible } satisfies WorkerMessage,
        [offscreen],
      );
    } else {
      context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas 2D context is unavailable for marine snow.');
      resize();
    }

    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', updatePlayback);
    motionPreference.addEventListener('change', updatePlayback);
    mobileViewport.addEventListener('change', resize);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', updatePlayback);
      motionPreference.removeEventListener('change', updatePlayback);
      mobileViewport.removeEventListener('change', resize);
      window.cancelAnimationFrame(frame);
      worker?.terminate();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 size-full opacity-60" />;
}
