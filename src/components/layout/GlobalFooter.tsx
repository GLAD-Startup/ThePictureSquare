import React from 'react';
import { Link } from 'react-router-dom';
import { GoldDivider } from '../ui/GoldAccent';
import { ArrowUp, MapPin } from 'lucide-react';

export const GlobalFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#141413] text-[#F6F4EE] pt-24 pb-16 px-6 sm:px-10 lg:px-16 mt-20">
      <div className="max-w-[1440px] mx-auto space-y-20">
        {/* Top Editorial Row — Book Closing Page Feel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Brand Name & Geographic Anchor */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-meta text-[#B89B72]">STUDIO IMPRINT & HEADQUARTERS</span>
            <Link to="/" className="block group">
              <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide text-[#F6F4EE] group-hover:text-[#B89B72] transition-colors">
                THE PICTURE SQUARE PHOTOGRAPHY
              </h2>
            </Link>
            <div className="space-y-1 font-sans text-xs text-[#9B968E] tracking-widest uppercase">
              <p className="flex items-center gap-2 text-[#D5CFC3]">
                <MapPin size={14} className="text-[#B89B72]" />
                <span>JUNCTION ROAD, MATHURA, UTTAR PRADESH</span>
              </p>
              <p>MATHURA · AGRA · INDIA · WORLDWIDE DESK</p>
            </div>
          </div>

          {/* Navigation Links Grid */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8 font-sans text-xs">
            <div className="space-y-3">
              <span className="text-meta text-[#B89B72] text-[10px]">PAGES</span>
              <ul className="space-y-2 text-[#D5CFC3] tracking-wider uppercase font-medium">
                <li>
                  <Link to="/weddings" className="hover:text-[#B89B72] transition-colors">
                    Weddings
                  </Link>
                </li>
                <li>
                  <Link to="/pre-weddings" className="hover:text-[#B89B72] transition-colors">
                    Pre-Weddings
                  </Link>
                </li>
                <li>
                  <Link to="/films" className="hover:text-[#B89B72] transition-colors">
                    Films
                  </Link>
                </li>
                <li>
                  <Link to="/stories" className="hover:text-[#B89B72] transition-colors">
                    Stories
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-[#B89B72] transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[#B89B72] transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-meta text-[#B89B72] text-[10px]">CONNECT</span>
              <ul className="space-y-2 text-[#D5CFC3] tracking-wider uppercase font-medium">
                <li>
                  <a
                    href="https://www.instagram.com/thepicturesquarephotography/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#B89B72] transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#B89B72] transition-colors"
                  >
                    WhatsApp Direct
                  </a>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-[#B89B72] transition-colors"
                  >
                    Send Inquiry
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Top Button */}
          <div className="lg:col-span-3 flex lg:justify-end items-start">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/15 text-xs font-sans font-semibold tracking-[0.22em] text-[#F6F4EE] hover:border-[#B89B72] hover:text-[#B89B72] transition-all uppercase"
              aria-label="Back to top"
              data-cursor="TOP"
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        <GoldDivider subtle className="bg-white/10" />

        {/* Bottom Copyright & Rights Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans font-semibold tracking-[0.2em] text-[#6C6862] uppercase">
          <p>© {new Date().getFullYear()} THE PICTURE SQUARE PHOTOGRAPHY. ALL RIGHTS RESERVED.</p>
          <p className="text-[#9B968E]">EST. 2000 · MATHURA, UTTAR PRADESH</p>
        </div>
      </div>
    </footer>
  );
};
