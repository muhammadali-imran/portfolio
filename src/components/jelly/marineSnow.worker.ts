type Dot = { x: number; y: number; radius: number; alpha: number; speed: number };
type SnowMessage =
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

let canvas: OffscreenCanvas | null = null;
let context: OffscreenCanvasRenderingContext2D | null = null;
let width = 0;
let height = 0;
let dpr = 1;
let dots: Dot[] = [];
let animate = true;
let visible = true;
let frame = 0;
let lastFrame = 0;

const makeDots = (count: number): Dot[] =>
  Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 0.5 + Math.random() * 1.1,
    alpha: 0.12 + Math.random() * 0.38,
    speed: 0.08 + Math.random() * 0.22,
  }));

function paint() {
  if (!context) return;
  context.clearRect(0, 0, width, height);
  for (const dot of dots) {
    context.beginPath();
    context.fillStyle = `rgba(145, 240, 202, ${dot.alpha})`;
    context.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
    context.fill();
  }
}

function tick(timestamp: number) {
  if (!context) return;
  if (timestamp - lastFrame < 33) {
    frame = self.requestAnimationFrame(tick);
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
  paint();
  if (animate && visible) frame = self.requestAnimationFrame(tick);
}

function resizeCanvas(nextWidth: number, nextHeight: number, nextDpr: number, count: number) {
  if (!canvas || !context) return;
  width = nextWidth;
  height = nextHeight;
  dpr = nextDpr;
  canvas.width = Math.ceil(width * dpr);
  canvas.height = Math.ceil(height * dpr);
  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  dots = makeDots(count);
  paint();
}

self.addEventListener('message', (event: MessageEvent<SnowMessage>) => {
  const message = event.data;
  if (message.type === 'init') {
    canvas = message.canvas;
    context = canvas.getContext('2d');
    if (!context) throw new Error('OffscreenCanvas 2D context is unavailable for marine snow.');
    animate = message.animate;
    visible = message.visible;
    resizeCanvas(message.width, message.height, message.dpr, message.count);
    if (animate && visible) frame = self.requestAnimationFrame(tick);
    return;
  }

  if (message.type === 'resize') {
    resizeCanvas(message.width, message.height, message.dpr, message.count);
    return;
  }

  animate = message.animate;
  visible = message.visible;
  self.cancelAnimationFrame(frame);
  if (animate && visible) {
    lastFrame = 0;
    frame = self.requestAnimationFrame(tick);
  }
});
