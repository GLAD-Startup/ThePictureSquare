import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { CustomCursor } from './components/ui/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { GlobalFooter } from './components/layout/GlobalFooter';
import { ScrollToTop } from './components/layout/ScrollToTop';

// Page Views
import HomePage from './pages/HomePage';
import WeddingsPage from './pages/WeddingsPage';
import PreWeddingsPage from './pages/PreWeddingsPage';
import FilmsPage from './pages/FilmsPage';
import StoriesPage from './pages/StoriesPage';
import StoryDetailPage from './pages/StoryDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

export function App() {
  // Initialize Lenis Kinetic Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#F6F4EE] text-[#141413] font-sans antialiased relative selection:bg-[#B89B72] selection:text-[#F6F4EE]">
        {/* Film Grain Texture Overlay */}
        <div className="film-grain" />

        {/* Magnetic Contextual Custom Cursor */}
        <CustomCursor />

        {/* Global Editorial Navbar */}
        <Navbar />

        {/* Route Definitions */}
        <main className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/weddings" element={<WeddingsPage />} />
            <Route path="/pre-weddings" element={<PreWeddingsPage />} />
            <Route path="/films" element={<FilmsPage />} />
            <Route path="/stories" element={<StoriesPage />} />
            <Route path="/stories/:slug" element={<StoryDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        {/* Global Shell Footer */}
        <GlobalFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
