import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Sparkles } from 'lucide-react';
import { GoldDivider, GoldMeta } from '../ui/GoldAccent';

export interface StoryDetail {
  id: string;
  couple: string;
  location: string;
  date: string;
  tagline: string;
  coverImage: string;
  introText: string;
  details: { label: string; value: string }[];
  gallery: { src: string; caption: string }[];
  filmTitle?: string;
  filmDuration?: string;
}

export const SAMPLE_STORY: StoryDetail = {
  id: 'jaipur-palace-story',
  couple: 'ANANYA & ROHAN',
  location: 'JAIPUR, RAJASTHAN',
  date: 'FEBRUARY 14, 2026',
  tagline: 'A three-day palace celebration framed by golden hour light and family heirlooms.',
  coverImage: '/images/hero-wedding.jpg',
  introText:
    'Set against the pink sandstone courtyards of Rambagh Palace, Ananya and Rohan’s wedding brought together family traditions from Jaipur and Delhi in a three-day visual festival.',
  details: [
    { label: 'VENUE', value: 'RAMBAGH PALACE, JAIPUR' },
    { label: 'EVENTS', value: 'MEHNDI, SANGEET, PHERAS' },
    { label: 'ATTENDANCE', value: '450 GUESTS' },
    { label: 'PHOTOGRAPHY', value: 'STILLS & 4K CINEMA' },
  ],
  gallery: [
    {
      src: '/images/ceremony-vows.jpg',
      caption: 'Sacred pheras ritual under golden hour light.',
    },
    {
      src: '/images/sunset-ghats.jpg',
      caption: 'Sunset couple portraiture across palace gardens.',
    },
    {
      src: '/images/jewelry-details.jpg',
      caption: 'Handcrafted heirloom bridal jewelry details.',
    },
  ],
  filmTitle: 'THE PALACE CHRONICLE (4K REEL)',
  filmDuration: '18 MINS · BESPOKE AUDIO SCORING',
};

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  story?: StoryDetail;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  isOpen,
  onClose,
  story = SAMPLE_STORY,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#141413]/85 backdrop-blur-md"
          />

          {/* Modal Overlay Container */}
          <div className="min-h-screen px-4 sm:px-8 py-12 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full max-w-5xl bg-[#F6F4EE] text-[#141413] rounded-sm shadow-2xl border border-[#141413]/10 overflow-hidden z-10 my-auto"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-30 p-3 bg-[#141413]/80 hover:bg-[#141413] text-[#F6F4EE] hover:text-[#B89B72] rounded-full border border-white/10 transition-colors"
                aria-label="Close story case study"
                data-cursor="CLOSE"
              >
                <X size={20} />
              </button>

              {/* Cover Hero Header */}
              <div className="relative w-full h-[50vh] sm:h-[60vh] overflow-hidden bg-[#ECE8DF]">
                <img
                  src={story.coverImage}
                  alt={story.couple}
                  className="w-full h-full object-cover filter brightness-[0.96]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/90 via-[#141413]/30 to-transparent" />

                {/* Overlaid Title & Metadata */}
                <div className="absolute bottom-8 left-8 right-8 sm:bottom-10 sm:left-10 sm:right-10 text-[#F6F4EE] space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-[#B89B72]" />
                    <GoldMeta className="text-[#B89B72]">FEATURED CASE STUDY</GoldMeta>
                  </div>
                  <h2 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-[#F6F4EE]">
                    {story.couple}
                  </h2>
                  <div className="flex flex-wrap items-center gap-6 font-sans text-xs text-[#D5CFC3] tracking-widest uppercase">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-[#B89B72]" />
                      {story.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-[#B89B72]" />
                      {story.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Body Content */}
              <div className="p-8 sm:p-12 space-y-12">
                {/* Intro & Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-7 space-y-4">
                    <h3 className="font-serif-editorial text-2xl sm:text-3xl italic font-light text-[#141413]">
                      "{story.tagline}"
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#6C6862] leading-relaxed tracking-wide">
                      {story.introText}
                    </p>
                  </div>

                  <div className="lg:col-span-5 bg-[#ECE8DF]/60 p-6 rounded-sm space-y-3 font-sans border border-[#141413]/10">
                    <span className="text-meta text-[#B89B72] text-[10px] block">
                      WEDDING DETAILS
                    </span>
                    <div className="space-y-2 text-xs">
                      {story.details.map((item, idx) => (
                        <div key={idx} className="flex justify-between py-1 border-b border-[#141413]/10">
                          <span className="font-semibold text-[#6C6862] uppercase tracking-wider">{item.label}</span>
                          <span className="font-medium text-[#141413] tracking-wide">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <GoldDivider subtle />

                {/* Editorial Gallery Grid */}
                <div className="space-y-6">
                  <span className="text-meta text-[#B89B72] text-[10px] block">
                    CURATED PRINT SEQUENCE
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {story.gallery.map((img, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="aspect-[4/5] overflow-hidden rounded-sm bg-[#ECE8DF] border border-[#141413]/10">
                          <img
                            src={img.src}
                            alt={img.caption}
                            className="w-full h-full object-cover filter brightness-[0.98]"
                          />
                        </div>
                        <p className="font-sans text-[11px] text-[#6C6862] tracking-wide">
                          {img.caption}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Row */}
                <div className="pt-6 border-t border-[#141413]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="font-sans text-xs text-[#6C6862] uppercase tracking-widest">
                    THE PICTURE SQUARE PHOTOGRAPHY STUDIO ARCHIVE
                  </span>

                  <button
                    onClick={onClose}
                    className="px-8 py-3.5 bg-[#141413] hover:bg-[#B89B72] text-[#F6F4EE] hover:text-[#141413] font-sans text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-400 rounded-full"
                  >
                    CLOSE CASE STUDY →
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
