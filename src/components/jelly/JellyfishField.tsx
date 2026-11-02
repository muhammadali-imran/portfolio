import { useEffect, useState } from 'react';
import Jellyfish from './Jellyfish';

export default function JellyfishField() {
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(document.visibilityState === 'visible');
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${pageVisible ? '' : 'jellyfish-field-paused'}`}>
      <Jellyfish className="absolute left-[7%] top-[20%] w-20 text-neo-mint opacity-10 [animation-delay:-3s]" />
      <Jellyfish className="absolute right-[9%] top-[36%] w-28 text-neo-mint opacity-[0.12] [animation-delay:-6s]" />
      <Jellyfish className="absolute bottom-[18%] left-[28%] w-16 text-neo-mint opacity-[0.08] [animation-delay:-9s]" />
      <Jellyfish className="absolute right-[31%] top-[12%] hidden w-24 text-neo-red opacity-[0.08] [animation-delay:-11s] sm:block" />
      <Jellyfish className="absolute bottom-[12%] right-[7%] hidden w-20 text-neo-mint opacity-[0.09] [animation-delay:-14s] sm:block" />
    </div>
  );
}
