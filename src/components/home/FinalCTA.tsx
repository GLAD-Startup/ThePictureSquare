import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GoldNumber, GoldMeta } from '../ui/GoldAccent';
import { ArrowUpRight, MessageCircle } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const easeOutEditorial = [0.23, 1, 0.32, 1] as const;

  return (
    <section className="relative w-full min-h-[85vh] py-28 sm:py-36 md:py-44 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto border-t border-[#141413]/10 flex flex-col justify-between overflow-hidden">
      {/* Section Marker */}
      <div className="relative z-10 flex items-center justify-between pb-8 border-b border-[#141413]/10">
        <div className="flex items-center gap-3">
          <GoldNumber number={9} />
          <GoldMeta>CLOSING EXHIBITION INVITATION</GoldMeta>
        </div>
        <span className="text-meta text-[#6C6862]">
          STUDIO RESERVATIONS
        </span>
      </div>

      {/* Dramatic Closing Headline & Oversized Art-Directed CTA */}
      <div className="relative z-10 my-auto py-12 space-y-16 max-w-5xl">
        <div className="font-serif-editorial text-hero text-[#141413] tracking-tight leading-[0.88] select-none">
          <div className="overflow-hidden pb-1">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: easeOutEditorial }}
              className="block font-light"
            >
              LET'S MAKE
            </motion.span>
          </div>

          <div className="overflow-hidden pb-1">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.15, ease: easeOutEditorial }}
              className="block font-normal italic text-[#141413]/90"
            >
              SOMETHING
            </motion.span>
          </div>

          <div className="overflow-hidden pb-1">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: easeOutEditorial }}
              className="block font-light"
            >
              WORTH
            </motion.span>
          </div>

          <div className="overflow-hidden pb-2">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.45, ease: easeOutEditorial }}
              className="block font-light text-[#141413]"
            >
              REMEMBERING.
            </motion.span>
          </div>
        </div>

        {/* Oversized Art-Directed CTA Interaction & Direct WhatsApp Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.6, ease: easeOutEditorial }}
          className="flex flex-col sm:flex-row sm:items-center gap-8"
        >
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-6 py-4 px-2 focus:outline-none"
            data-cursor="INQUIRE"
          >
            {/* Expanding Gold Circle Accent */}
            <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#B89B72] bg-transparent flex items-center justify-center group-hover:bg-[#B89B72] group-hover:scale-110 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-sm">
              <ArrowUpRight size={24} className="text-[#B89B72] group-hover:text-[#141413] transition-colors" />
            </span>

            {/* Text Link */}
            <div className="flex flex-col text-left">
              <span className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-[#141413] tracking-wide group-hover:text-[#B89B72] transition-colors duration-300">
                START YOUR STORY →
              </span>
              <span className="font-sans text-[11px] font-semibold tracking-[0.25em] text-[#6C6862] uppercase -mt-1">
                INQUIRE FOR WEDDING & PRE-WEDDING DATES
              </span>
            </div>

            {/* Hover Line Expansion */}
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#B89B72] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-[cubic-bezier(0.23,1,0.32,1)]" />
          </Link>

          {/* Direct WhatsApp Action Link */}
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-[#141413]/20 font-sans text-xs font-semibold tracking-[0.22em] text-[#141413] hover:border-[#B89B72] hover:bg-[#141413] hover:text-[#F6F4EE] transition-all uppercase self-start sm:self-center"
            data-cursor="WHATSAPP"
          >
            <MessageCircle size={15} className="text-[#B89B72]" />
            <span>WHATSAPP DIRECT</span>
          </a>
        </motion.div>
      </div>

      {/* Subdued Bottom Tag */}
      <div className="relative z-10 pt-8 border-t border-[#141413]/10 flex items-center justify-between text-meta text-[10px] text-[#6C6862]">
        <span>MATHURA · AGRA · WORLDWIDE</span>
        <span>THE PICTURE SQUARE STUDIO</span>
      </div>
    </section>
  );
};
