import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GoldMeta, GoldDivider } from '../components/ui/GoldAccent';
import { ArrowUpRight, Award, Heart, ShieldCheck } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const easeOutEditorial = [0.23, 1, 0.32, 1] as const;

  return (
    <div className="pt-28 pb-24 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto space-y-20">
      {/* Editorial Page Header */}
      <div className="space-y-6 max-w-4xl border-b border-[#141413]/10 pb-12">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#B89B72]" />
          <GoldMeta>STUDIO HERITAGE & PHILOSOPHY</GoldMeta>
        </div>

        <h1 className="font-serif-editorial text-display-lg text-[#141413] font-light leading-none">
          THE PICTURE SQUARE
        </h1>

        <p className="font-serif-editorial text-3xl sm:text-4xl font-light italic text-[#B89B72]">
          "BORN IN MATHURA. BUILT FOR EVERYWHERE."
        </p>

        <p className="font-sans text-xs text-[#6C6862] tracking-widest uppercase pt-2 max-w-xl">
          For more than two decades, we've photographed celebrations, families, and people at their happiest across Uttar Pradesh, Rajasthan, and worldwide destinations.
        </p>
      </div>

      {/* Main Studio Narrative & Photo Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Narrative Column */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-meta text-[#B89B72]">ESTABLISHED 2000 — MATHURA, UTTAR PRADESH</span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[#141413] font-light leading-snug">
            TWENTY-SIX YEARS OF UNBROKEN PHOTOGRAPHIC CRAFT.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#141413]/85 leading-relaxed tracking-wide">
            Founded in Mathura, The Picture Square Photography has grown into a premier contemporary wedding photography and fine-art film studio in North India.
          </p>
          <p className="font-sans text-xs sm:text-sm text-[#141413]/85 leading-relaxed tracking-wide">
            We avoid typical Indian wedding templates, generic pose books, and artificial studio clutter. We believe the photographs worth keeping are rarely the ones you plan—they are the glance, the laugh, the trembling hands, and the unscripted joy.
          </p>
        </div>

        {/* Right Heritage Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: easeOutEditorial }}
          className="lg:col-span-6 relative h-[50vh] sm:h-[62vh] overflow-hidden rounded-sm bg-[#ECE8DF] border border-[#141413]/10"
        >
          <img
            src="/images/mathura-heritage.jpg"
            alt="Mathura Heritage Studio"
            loading="lazy"
            className="w-full h-full object-cover filter brightness-[0.98]"
          />
          <div className="absolute bottom-5 left-5 z-10 px-4 py-2 bg-[#141413]/85 backdrop-blur-md text-[#F6F4EE] border border-white/10 rounded-full font-sans text-[10px] font-semibold tracking-widest text-[#B89B72] uppercase">
            MATHURA HEADQUARTERS & DESK
          </div>
        </motion.div>
      </div>

      <GoldDivider subtle />

      {/* Core Credentials & Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-sm bg-[#ECE8DF]/40 border border-[#141413]/10 space-y-3">
          <Award size={20} className="text-[#B89B72]" />
          <h3 className="font-serif-editorial text-2xl text-[#141413]">26 YEARS LEGACY</h3>
          <p className="font-sans text-xs text-[#6C6862] leading-relaxed">
            Continuous heritage craft since 2000, documenting multi-generational family celebrations.
          </p>
        </div>

        <div className="p-8 rounded-sm bg-[#ECE8DF]/40 border border-[#141413]/10 space-y-3">
          <Heart size={20} className="text-[#B89B72]" />
          <h3 className="font-serif-editorial text-2xl text-[#141413]">3,000+ STORIES</h3>
          <p className="font-sans text-xs text-[#6C6862] leading-relaxed">
            Over three thousand weddings, pre-weddings, and destination celebrations documented worldwide.
          </p>
        </div>

        <div className="p-8 rounded-sm bg-[#ECE8DF]/40 border border-[#141413]/10 space-y-3">
          <ShieldCheck size={20} className="text-[#B89B72]" />
          <h3 className="font-serif-editorial text-2xl text-[#141413]">HEIRLOOM QUALITY</h3>
          <p className="font-sans text-xs text-[#6C6862] leading-relaxed">
            Handcrafted Italian leather albums, high-res RAW digital archives, and 4K cinema masters.
          </p>
        </div>
      </div>

      {/* Page Closing CTA */}
      <div className="pt-16 border-t border-[#141413]/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-meta text-[#B89B72]">LET'S TALK</span>
          <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#141413] font-light">
            BEGIN A CONVERSATION WITH OUR STUDIO
          </h3>
        </div>

        <Link
          to="/contact"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#141413] text-[#F6F4EE] hover:bg-[#B89B72] hover:text-[#141413] font-sans text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-400 group"
        >
          <span>LET'S TALK →</span>
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
