import { useRef } from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.95rem] font-semibold transition-[box-shadow,background-color,border-color,color,filter] duration-300 disabled:cursor-not-allowed disabled:opacity-60';

const variants = {
  primary: 'btn-primary text-white',
  ghost:
    'border border-line bg-surface/60 text-ink backdrop-blur hover:border-neo-purple hover:text-neo-purple',
};

export default function Button({
  as: Tag = 'button',
  variant = 'primary',
  magnetic = true,
  className = '',
  children,
  ...props
}) {
  const ref = useRef(null);
  useMagnetic(ref, magnetic && !props.disabled);

  return (
    <Tag ref={ref} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
