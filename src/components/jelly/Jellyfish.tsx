type JellyfishProps = { className?: string };

export default function Jellyfish({ className = '' }: JellyfishProps) {
  return (
    <svg
      aria-hidden="true"
      className={`jellyfish-glow jellyfish-float ${className}`}
      viewBox="0 0 160 190"
      fill="none"
    >
      <path
        d="M22 75c0-34 26-61 58-61s58 27 58 61c-15-9-26-9-39 0-13-9-25-9-38 0-13-9-25-9-39 0Z"
        fill="currentColor"
        fillOpacity=".16"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M28 66c11-22 28-34 52-34s41 12 52 34" stroke="currentColor" strokeOpacity=".7" strokeWidth="2" />
      <path d="M43 79c-5 25 7 28 1 54m19-54c-5 35 9 38 2 69m18-69c-2 28 4 41 1 67m19-67c5 31-8 39-2 66m20-66c5 24-7 32-1 52" stroke="currentColor" strokeLinecap="round" strokeOpacity=".72" strokeWidth="2" />
      <circle cx="80" cy="57" r="4" fill="currentColor" fillOpacity=".8" />
    </svg>
  );
}
