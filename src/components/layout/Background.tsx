import Jellyfish from '../jelly/Jellyfish';

export default function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div className="blob blob-green" />
      <div className="absolute -right-32 top-[18%] size-120 rounded-full bg-neo-red/5 blur-[100px]" />
      <Jellyfish className="absolute left-[5%] top-[22%] w-20 opacity-20 [animation-delay:-3s]" />
      <Jellyfish className="absolute right-[8%] top-[68%] w-28 opacity-15 [animation-delay:-6s]" />
    </div>
  );
}
