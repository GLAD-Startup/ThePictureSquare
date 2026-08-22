'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, FacebookIcon } from '@/components/ui/SocialIcons';
import { MobileMenu } from './MobileMenu';
import { SearchOverlayModal } from '@/components/search/SearchOverlayModal';
import { StudioLogo } from '@/components/ui/StudioLogo';
import { SITE_CONFIG, HEADER_NAV_LINKS } from '@/lib/site-config';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isOverHero = pathname === '/' && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isOverHero
            ? 'bg-gradient-to-b from-black/75 via-black/30 to-transparent py-4 sm:py-5 border-b border-transparent'
            : 'bg-bg/95 backdrop-blur-md border-b border-rule shadow-[0_4px_30px_rgba(20,20,19,0.04)] py-3 sm:py-3.5'
        }`}
      >
        <div className="w-full max-w-[1560px] mx-auto px-5 sm:px-10 lg:px-[72px]">
          {/* ========================================================= */}
          {/* DESKTOP HEADER (>= 1024px) — TWO ROWS                     */}
          {/* ========================================================= */}
          <div className="hidden lg:flex flex-col gap-3.5">
            {/* ROW 1: Search (Left) | Centred Wordmark | Socials (Right) */}
            <div className="grid grid-cols-12 items-center">
              {/* Far Left: Search Icon Trigger */}
              <div className="col-span-3 flex items-center justify-start">
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className={`p-1.5 transition-colors duration-300 rounded-sm focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none flex items-center gap-2 group cursor-pointer ${
                    isOverHero
                      ? 'text-fg-inverse/80 hover:text-fg-inverse'
                      : 'text-fg-dim hover:text-fg'
                  }`}
                  aria-label="Search archive stories and galleries"
                  data-cursor="SEARCH"
                >
                  <Search
                    size={16}
                    className={`transition-colors duration-300 ${
                      isOverHero
                        ? 'text-fg-inverse/80 group-hover:text-fg-inverse'
                        : 'text-fg-dim group-hover:text-fg'
                    }`}
                  />
                  <span
                    className={`text-[11px] font-sans font-semibold tracking-[0.20em] uppercase transition-colors duration-300 hidden xl:inline ${
                      isOverHero
                        ? 'text-fg-inverse/70 group-hover:text-fg-inverse'
                        : 'text-fg-faint group-hover:text-fg-dim'
                    }`}
                  >
                    SEARCH
                  </span>
                </button>
              </div>

              {/* Centred Brand Lockup */}
              <div className="col-span-6 flex justify-center text-center">
                <StudioLogo
                  variant="lockup"
                  theme={isOverHero ? 'light' : 'dark'}
                  size="md"
                  href="/"
                  priority
                />
              </div>

              {/* Far Right: Social Icons */}
              <div
                className={`col-span-3 flex items-center justify-end gap-4 transition-colors duration-300 ${
                  isOverHero ? 'text-fg-inverse/80' : 'text-fg-dim'
                }`}
              >
                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-1 transition-colors duration-300 rounded-sm focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none ${
                    isOverHero
                      ? 'text-fg-inverse/80 hover:text-fg-inverse'
                      : 'text-fg-dim hover:text-fg'
                  }`}
                  aria-label="Visit The Picture Square on Instagram"
                  data-cursor="INSTAGRAM"
                >
                  <InstagramIcon size={16} />
                </a>

                <a
                  href={SITE_CONFIG.social.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-1 transition-colors duration-300 rounded-sm focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none ${
                    isOverHero
                      ? 'text-fg-inverse/80 hover:text-fg-inverse'
                      : 'text-fg-dim hover:text-fg'
                  }`}
                  aria-label="Visit The Picture Square on YouTube"
                  data-cursor="YOUTUBE"
                >
                  <YoutubeIcon size={16} />
                </a>

                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-1 transition-colors duration-300 rounded-sm focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none ${
                    isOverHero
                      ? 'text-fg-inverse/80 hover:text-fg-inverse'
                      : 'text-fg-dim hover:text-fg'
                  }`}
                  aria-label="Visit The Picture Square on Facebook"
                  data-cursor="FACEBOOK"
                >
                  <FacebookIcon size={16} />
                </a>
              </div>
            </div>

            {/* ROW 2: Centred single row of uppercase utility links */}
            <nav
              aria-label="Primary Navigation"
              className="flex items-center justify-center gap-6 xl:gap-8 text-[0.75rem] font-sans font-medium tracking-[0.20em] uppercase whitespace-nowrap"
            >
              {HEADER_NAV_LINKS.map((item) => {
                const isActive =
                  pathname === item.path ||
                  (item.path !== '/' && pathname.startsWith(item.path));

                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`relative py-1 transition-colors duration-300 rounded-sm focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none ${
                      isOverHero
                        ? isActive
                          ? 'text-fg-inverse font-semibold'
                          : 'text-fg-inverse/80 hover:text-fg-inverse'
                        : isActive
                        ? 'text-fg font-semibold'
                        : 'text-fg-dim hover:text-fg'
                    }`}
                    data-cursor="NAV"
                  >
                    {item.name}
                    {/* Active route indicator underline */}
                    {isActive && (
                      <span
                        className="absolute -bottom-1 left-0 w-full h-[1px] bg-accent"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* ========================================================= */}
          {/* MOBILE HEADER (< 1024px): Wordmark left, Search + Menu right */}
          {/* ========================================================= */}
          <div className="flex lg:hidden items-center justify-between">
            {/* Mobile Brand Logo Left */}
            <StudioLogo
              variant="lockup"
              theme={isOverHero ? 'light' : 'dark'}
              size="sm"
              href="/"
              priority
            />

            {/* Mobile Actions: Search Icon + Hamburger */}
            <div className="flex items-center gap-2">
              <Link
                href="/search"
                className={`p-2 transition-colors duration-300 rounded-sm focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none ${
                  isOverHero
                    ? 'text-fg-inverse/80 hover:text-fg-inverse'
                    : 'text-fg-dim hover:text-fg'
                }`}
                aria-label="Search stories and archives"
                data-cursor="SEARCH"
              >
                <Search size={18} />
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className={`p-2 transition-colors duration-300 rounded-sm focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none cursor-pointer ${
                  isOverHero
                    ? 'text-fg-inverse hover:text-accent'
                    : 'text-fg hover:text-accent-text'
                }`}
                aria-label="Open mobile navigation menu"
                data-cursor="MENU"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={HEADER_NAV_LINKS}
      />

      {/* Full-Screen Desktop Search Overlay Modal */}
      <SearchOverlayModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Navbar;
