import { useCallback, useEffect, useState } from 'react';
import { ScrollTrigger } from './lib/gsap';
import { prefersReducedMotion } from './lib/motion';
import { ThemeProvider } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';
import { SECTION_IDS } from './components/layout/nav';
import Background from './components/layout/Background';
import ScrollProgress from './components/layout/ScrollProgress';
import Loader from './components/layout/Loader';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import MobileMenu from './components/layout/MobileMenu';
import CommandPalette from './components/layout/CommandPalette';
import Footer from './components/layout/Footer';
import AvailabilityBadge from './components/ui/AvailabilityBadge';
import Hero from './sections/Hero';
import About from './sections/About';
import Stack from './sections/Stack';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

function shouldSkipIntro() {
  if (prefersReducedMotion()) return true;
  try {
    return sessionStorage.getItem('intro-seen') === '1';
  } catch {
    return false;
  }
}

export default function App() {
  const [skipIntro] = useState(shouldSkipIntro);
  const [revealed, setRevealed] = useState(skipIntro); // hero animations may start
  const [introDone, setIntroDone] = useState(skipIntro); // loader can be removed
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const active = useScrollSpy(SECTION_IDS);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);
  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  const handleReveal = useCallback(() => {
    try {
      sessionStorage.setItem('intro-seen', '1');
    } catch {
      /* ignore */
    }
    setRevealed(true);
  }, []);
  const handleIntroDone = useCallback(() => setIntroDone(true), []);

  // No scrolling behind the intro curtain.
  useEffect(() => {
    if (introDone) return undefined;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [introDone]);

  // Ctrl/Cmd + K opens the command palette.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Web fonts change text sizes, so re-measure scroll animations once they load.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <ThemeProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-neo-purple focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <Background />
      <ScrollProgress />
      <Sidebar active={active} ready={revealed} onOpenPalette={openPalette} />
      <TopBar open={menuOpen} onToggle={toggleMenu} />
      <MobileMenu open={menuOpen} onClose={closeMenu} active={active} />

      <div className="fixed right-6 top-5 z-30 hidden lg:block">
        <AvailabilityBadge />
      </div>

      <div className="lg:pl-[88px] xl:pl-[240px]">
        <main id="main">
          <Hero ready={revealed} />
          <About />
          <Stack />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>

      <CommandPalette open={paletteOpen} onClose={closePalette} />
      {!introDone && <Loader onReveal={handleReveal} onDone={handleIntroDone} />}
    </ThemeProvider>
  );
}
