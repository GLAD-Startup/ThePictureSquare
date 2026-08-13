import React from 'react';
import { GoldDivider, GoldNumber, GoldMeta } from '../ui/GoldAccent';
import { EditorialButton } from '../ui/EditorialButton';
import { TextReveal } from '../ui/TextReveal';
import { ImageReveal } from '../ui/ImageReveal';
import { ArrowRight, Sparkles, Compass, Eye } from 'lucide-react';

export const DesignSystemShowcase: React.FC = () => {
  return (
    <main className="w-full pt-32 pb-20 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto space-y-36">
      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: STUDIO HERO HEADER STATEMENT & TYPOGRAPHY PROOF    */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-10 pt-8 border-b border-[#141413]/10 pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <GoldNumber number={1} />
          <GoldMeta>FOUNDATIONAL DESIGN SYSTEM & SITE SHELL</GoldMeta>
        </div>

        <div className="max-w-5xl space-y-6">
          <TextReveal
            text="THE PICTURE SQUARE"
            as="h1"
            className="text-hero text-[#141413]"
            delay={0.1}
          />
          <TextReveal
            text="Cinematic Wedding Stories & Editorial Fine-Art Photography."
            as="p"
            className="text-editorial-subhead text-[#6C6862] max-w-3xl"
            delay={0.3}
          />
        </div>

        <div className="pt-6 flex flex-wrap items-center gap-6">
          <EditorialButton variant="primary" size="md" dataCursor="EXPLORE">
            VIEW DESIGN TOKEN SYSTEM
            <ArrowRight size={14} className="text-[#B89B72]" />
          </EditorialButton>

          <EditorialButton variant="outline" size="md" dataCursor="SAMPLE">
            EDITORIAL SPECIMEN
          </EditorialButton>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: COLOR PALETTE & SURFACE TOKEN MATRIX              */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#141413]/10 pb-4">
          <div className="flex items-center gap-3">
            <GoldNumber number={2} />
            <h2 className="font-serif-editorial text-3xl text-[#141413]">COLOR PALETTE & SURFACE MATRIX</h2>
          </div>
          <span className="text-meta text-[#6C6862]">WARM IVORY × CHARCOAL × ANTIQUE GOLD</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Swatch 1: Primary Background */}
          <div className="p-8 rounded-sm bg-[#F6F4EE] border border-[#141413]/10 space-y-8 shadow-xs">
            <div className="h-16 w-full rounded-sm bg-[#F6F4EE] border border-[#141413]/15" />
            <div className="space-y-1">
              <span className="text-meta text-[#B89B72]">PRIMARY BACKGROUND</span>
              <p className="font-serif-editorial text-2xl text-[#141413]">Warm Ivory</p>
              <p className="font-sans text-xs text-[#6C6862] font-mono">#F6F4EE</p>
            </div>
          </div>

          {/* Swatch 2: Surface Container */}
          <div className="p-8 rounded-sm bg-[#ECE8DF] border border-[#141413]/10 space-y-8 shadow-xs">
            <div className="h-16 w-full rounded-sm bg-[#ECE8DF] border border-[#141413]/15" />
            <div className="space-y-1">
              <span className="text-meta text-[#B89B72]">SURFACE CONTAINER</span>
              <p className="font-serif-editorial text-2xl text-[#141413]">Bone Surface</p>
              <p className="font-sans text-xs text-[#6C6862] font-mono">#ECE8DF</p>
            </div>
          </div>

          {/* Swatch 3: Charcoal Text */}
          <div className="p-8 rounded-sm bg-[#141413] text-[#F6F4EE] space-y-8 shadow-xs">
            <div className="h-16 w-full rounded-sm bg-[#141413] border border-white/20" />
            <div className="space-y-1">
              <span className="text-meta text-[#B89B72]">HERO TEXT & SHELL</span>
              <p className="font-serif-editorial text-2xl text-[#F6F4EE]">Deep Charcoal</p>
              <p className="font-sans text-xs text-[#9B968E] font-mono">#141413</p>
            </div>
          </div>

          {/* Swatch 4: Antique Gold */}
          <div className="p-8 rounded-sm bg-[#F6F4EE] border border-[#B89B72]/40 space-y-8 shadow-xs">
            <div className="h-16 w-full rounded-sm bg-[#B89B72]" />
            <div className="space-y-1">
              <span className="text-meta text-[#B89B72]">ACCENT DETAILS ONLY</span>
              <p className="font-serif-editorial text-2xl text-[#141413]">Antique Gold</p>
              <p className="font-sans text-xs text-[#6C6862] font-mono">#B89B72</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: TYPOGRAPHY HIERARCHY & CONTRAST SPECIMEN          */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#141413]/10 pb-4">
          <div className="flex items-center gap-3">
            <GoldNumber number={3} />
            <h2 className="font-serif-editorial text-3xl text-[#141413]">EDITORIAL TYPOGRAPHY HIERARCHY</h2>
          </div>
          <span className="text-meta text-[#6C6862]">CORMORANT GARAMOND + PLUS JAKARTA SANS</span>
        </div>

        <div className="space-y-12 bg-[#ECE8DF]/40 p-8 sm:p-12 lg:p-16 border border-[#141413]/10 rounded-sm">
          {/* Display XL Specimen */}
          <div className="space-y-2 border-b border-[#141413]/10 pb-8">
            <GoldMeta>01 — DISPLAY HERO SERIF (CLAIMS & HEADINGS)</GoldMeta>
            <h2 className="text-display-lg text-[#141413]">
              Timeless Moments Captured in Mathura & Beyond.
            </h2>
          </div>

          {/* Display MD Specimen */}
          <div className="space-y-2 border-b border-[#141413]/10 pb-8">
            <GoldMeta>02 — SECTION TITLE SERIF</GoldMeta>
            <h3 className="text-display-md text-[#141413]">
              Weddings • Pre-Weddings • Cinematic Films
            </h3>
          </div>

          {/* Subhead Specimen */}
          <div className="space-y-2 border-b border-[#141413]/10 pb-8">
            <GoldMeta>03 — NARRATIVE ITALIC SERIF</GoldMeta>
            <p className="text-editorial-subhead italic text-[#141413]/90">
              "Restraint, subtle light, and high-contrast editorial composition."
            </p>
          </div>

          {/* Metadata Grid Contrast */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="space-y-1">
              <GoldMeta>LOCATION TAG</GoldMeta>
              <p className="font-sans text-xs tracking-wider uppercase font-semibold text-[#141413]">
                Mathura, Uttar Pradesh, India
              </p>
            </div>
            <div className="space-y-1">
              <GoldMeta>SOCIAL HANDLE</GoldMeta>
              <p className="font-sans text-xs tracking-wider uppercase font-semibold text-[#141413]">
                @thepicturesquarephotography
              </p>
            </div>
            <div className="space-y-1">
              <GoldMeta>ESTABLISHED</GoldMeta>
              <p className="font-sans text-xs tracking-wider uppercase font-semibold text-[#141413]">
                MMXXVI • PREMIUM STUDIO
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4: KINETIC IMAGE REVEAL & CURSOR INTERACTION ARENA     */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#141413]/10 pb-4">
          <div className="flex items-center gap-3">
            <GoldNumber number={4} />
            <h2 className="font-serif-editorial text-3xl text-[#141413]">IMAGE REVEAL & CURSOR INTERACTION</h2>
          </div>
          <span className="text-meta text-[#6C6862]">CURTAIN MOTION + MAGNETIC HOVER</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ImageReveal
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop"
            alt="Luxury Wedding Editorial Photography"
            category="WEDDINGS"
            caption="The Royal Courtyard Session"
            cursorText="VIEW"
            aspectRatio="aspect-[4/5]"
          />

          <ImageReveal
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop"
            alt="Pre-Wedding Cinematic Visual"
            category="PRE-WEDDINGS"
            caption="Golden Hour Narrative"
            cursorText="EXPLORE"
            aspectRatio="aspect-[4/5]"
          />

          <ImageReveal
            src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop"
            alt="Cinematic Wedding Film Stills"
            category="FILMS"
            caption="4K Motion Film Still"
            cursorText="PLAY"
            aspectRatio="aspect-[4/5]"
          />
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 5: BUTTON & LINK INTERACTION MATRIX                   */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#141413]/10 pb-4">
          <div className="flex items-center gap-3">
            <GoldNumber number={5} />
            <h2 className="font-serif-editorial text-3xl text-[#141413]">INTERACTION SYSTEM & BUTTON STATES</h2>
          </div>
          <span className="text-meta text-[#6C6862]">SUBTLE HOVER + GOLD LINES</span>
        </div>

        <div className="flex flex-wrap items-center gap-8 p-10 bg-[#ECE8DF]/30 border border-[#141413]/10 rounded-sm">
          <EditorialButton variant="primary" size="lg" dataCursor="PRIMARY">
            PRIMARY ACTION
            <Compass size={16} className="text-[#B89B72]" />
          </EditorialButton>

          <EditorialButton variant="outline" size="lg" dataCursor="OUTLINE">
            OUTLINE BUTTON
            <Eye size={16} />
          </EditorialButton>

          <EditorialButton variant="text" size="md" dataCursor="LINK">
            EDITORIAL TEXT LINK
            <Sparkles size={14} className="text-[#B89B72]" />
          </EditorialButton>
        </div>
      </section>

      <GoldDivider subtle />
    </main>
  );
};
