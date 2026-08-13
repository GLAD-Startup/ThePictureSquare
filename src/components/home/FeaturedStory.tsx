import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { GoldNumber, GoldMeta } from '../ui/GoldAccent';
import { ArrowRight } from 'lucide-react';
import { StoryModal, SAMPLE_STORY } from './StoryModal';

export const FeaturedStory: React.FC = () => {
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const navigate = useNavigate();
  const easeOutEditorial = [0.23, 1, 0.32, 1] as const;

  return (
    <>
      <section className="relative w-full py-16 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto border-t border-[#141413]/10 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#141413]/10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <GoldNumber number={6} />
              <GoldMeta>FEATURED CASE STUDY</GoldMeta>
            </div>
            <h2 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-[#141413] font-light">
              FEATURED WEDDING STORY
            </h2>
          </div>

          <Link
            to="/stories"
            className="font-sans text-xs text-[#6C6862] hover:text-[#B89B72] tracking-widest uppercase transition-colors"
          >
            VIEW ALL STORIES →
          </Link>
        </div>

        {/* Cinematic Featured Story Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.2, ease: easeOutEditorial }}
          onClick={() => navigate('/stories/a-r')}
          className="group relative w-full h-[65vh] sm:h-[76vh] lg:h-[84vh] overflow-hidden rounded-sm bg-[#ECE8DF] border border-[#141413]/10 cursor-pointer shadow-[0_25px_60px_rgba(20,20,19,0.08)]"
          data-cursor="OPEN STORY"
        >
          {/* Full-Bleed High-Res Cover Visual */}
          <img
            src="/images/hero-wedding.jpg"
            alt="Ananya and Rohan Jaipur Wedding Story"
            loading="lazy"
            className="w-full h-full object-cover object-center filter brightness-[0.96] contrast-[1.02] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />

          {/* Understated Editorial Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/80 via-[#141413]/25 to-transparent transition-opacity duration-500" />

          {/* Top Left Tag */}
          <div className="absolute top-6 left-6 z-20 px-4 py-2 bg-[#141413]/80 backdrop-blur-md text-[#F6F4EE] border border-white/10 rounded-full">
            <span className="font-sans text-[10px] font-semibold tracking-[0.25em] text-[#B89B72] uppercase">
              JAIPUR PALACE STORY
            </span>
          </div>

          {/* Bottom Editorial Content Overlay */}
          <div className="absolute bottom-8 left-8 right-8 sm:bottom-12 sm:left-12 sm:right-12 z-20 flex flex-col md:flex-row md:items-end justify-between gap-8 text-[#F6F4EE]">
            {/* Metadata */}
            <div className="space-y-3 max-w-xl">
              <span className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide text-[#F6F4EE]">
                A + R
              </span>
              <p className="font-sans text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#D5CFC3] uppercase">
                JAIPUR · 14.02.26
              </p>
              <p className="font-serif-editorial text-lg sm:text-xl font-light italic text-[#F6F4EE]/90 max-w-md hidden sm:block">
                "A three-day palace celebration framed by golden hour light and family heirlooms."
              </p>
            </div>

            {/* Large Title / Link Trigger */}
            <div className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
              <span className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl font-light tracking-wider text-[#F6F4EE] group-hover:text-[#B89B72] transition-colors">
                VIEW STORY →
              </span>
              <div className="p-3 rounded-full border border-white/20 group-hover:border-[#B89B72] group-hover:bg-[#B89B72] group-hover:text-[#141413] transition-all">
                <ArrowRight size={18} />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Dedicated Story Modal View */}
      <StoryModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        story={SAMPLE_STORY}
      />
    </>
  );
};
