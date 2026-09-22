const tones = {
  purple: 'bg-neo-purple/10 text-neo-purple ring-neo-purple/25',
  blue: 'bg-neo-blue/10 text-neo-blue ring-neo-blue/25',
  green: 'bg-neo-green/10 text-neo-green ring-neo-green/25',
  red: 'bg-neo-red/10 text-neo-red ring-neo-red/25',
  muted: 'bg-surface2 text-muted ring-line',
};

export default function Tag({ children, tone = 'muted', className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
