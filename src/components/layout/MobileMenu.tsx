import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { X, Mail, MapPin } from 'lucide-react';
import { GoldDivider } from '../ui/GoldAccent';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { name: string; path: string }[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, links }) => {
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#141413] text-[#F6F4EE] px-6 py-8 md:px-12 md:py-12 overflow-y-auto"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <Link to="/" onClick={onClose} className="flex flex-col">
              <span className="font-serif-editorial text-2xl tracking-[0.12em] text-[#F6F4EE]">
                THE PICTURE SQUARE
              </span>
              <span className="text-meta text-[#B89B72] mt-0.5">MATHURA, UTTAR PRADESH</span>
            </Link>

            <button
              onClick={onClose}
              className="p-3 text-[#F6F4EE] hover:text-[#B89B72] transition-colors rounded-full border border-white/10 hover:border-[#B89B72]"
              aria-label="Close menu"
              data-cursor="CLOSE"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Navigation Links Grid */}
          <div className="my-auto py-12">
            <nav className="flex flex-col gap-6 md:gap-8">
              {links.map((link, idx) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1 + idx * 0.06,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="flex items-baseline gap-4 group"
                  >
                    <span className="text-meta text-[#B89B72] text-[10px]">
                      0{idx + 1}
                    </span>
                    <Link
                      to={link.path}
                      onClick={onClose}
                      className={`font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-light transition-colors duration-400 tracking-wide ${
                        isActive ? 'text-[#B89B72]' : 'text-[#F6F4EE] group-hover:text-[#B89B72]'
                      }`}
                      data-cursor="EXPLORE"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </div>

          {/* Footer Information Row */}
          <div className="space-y-6">
            <GoldDivider subtle className="bg-white/10" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[#9B968E]">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-[#B89B72]" />
                <span className="font-sans text-[12px] tracking-wider uppercase text-[#D5CFC3]">
                  Mathura, Uttar Pradesh, India
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#B89B72]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                <a
                  href="https://www.instagram.com/thepicturesquarephotography/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-sans text-[12px] tracking-wider uppercase text-[#D5CFC3] hover:text-[#B89B72] transition-colors"
                >
                  @thepicturesquarephotography
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#B89B72]" />
                <span className="font-sans text-[12px] tracking-wider uppercase text-[#D5CFC3]">
                  Worldwide Bookings Available
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
