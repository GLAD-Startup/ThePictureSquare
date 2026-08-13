import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

export const NAV_LINKS = [
  { name: 'WEDDINGS', path: '/weddings' },
  { name: 'PRE-WEDDINGS', path: '/pre-weddings' },
  { name: 'FILMS', path: '/films' },
  { name: 'STORIES', path: '/stories' },
  { name: 'ABOUT', path: '/about' },
  { name: 'CONTACT', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isScrolled
            ? 'py-4 bg-[#F6F4EE]/90 backdrop-blur-md border-b border-[#141413]/5 shadow-[0_4px_30px_rgba(0,0,0,0.02)]'
            : 'py-7 bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          {/* LEFT: Branding */}
          <Link
            to="/"
            className="flex flex-col group focus:outline-none"
            data-cursor="HOME"
          >
            <span className="font-serif-editorial text-xl sm:text-2xl lg:text-[1.65rem] tracking-[0.14em] font-normal text-[#141413] transition-colors group-hover:text-[#B89B72]">
              THE PICTURE SQUARE
            </span>
            <span className="text-[9px] font-sans font-semibold tracking-[0.28em] text-[#B89B72] uppercase -mt-0.5">
              MATHURA, IN
            </span>
          </Link>

          {/* RIGHT: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-9" aria-label="Desktop Global Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={`relative text-[11px] font-sans font-semibold tracking-[0.22em] py-1 transition-colors group ${
                    isActive ? 'text-[#B89B72]' : 'text-[#141413]/80 hover:text-[#141413]'
                  }`}
                >
                  <span>{link.name}</span>
                  {/* Understated Gold Active Dot / Line */}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1px] bg-[#B89B72] transition-transform duration-300 origin-left ease-[cubic-bezier(0.23,1,0.32,1)] ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </NavLink>
              );
            })}
          </nav>

          {/* Mobile / Quick Drawer Menu Trigger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#141413]/15 text-[#141413] hover:border-[#B89B72] hover:bg-[#141413]/5 transition-all text-[10px] font-sans font-semibold tracking-[0.2em] uppercase"
              aria-label="Open navigation menu"
              data-cursor="MENU"
            >
              <span>MENU</span>
              <Menu size={15} strokeWidth={1.5} className="text-[#B89B72]" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
};
