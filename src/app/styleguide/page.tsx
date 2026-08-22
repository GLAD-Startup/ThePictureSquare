import type { Metadata } from 'next';
import { Shell } from '@/components/layout/Shell';
import { Rule } from '@/components/ui/Rule';
import { SectionHead } from '@/components/ui/SectionHead';
import { GoldDivider, GoldNumber, GoldMeta } from '@/components/ui/GoldAccent';
import { EditorialButton } from '@/components/ui/EditorialButton';
import { ImageReveal } from '@/components/ui/ImageReveal';
import { TextReveal } from '@/components/ui/TextReveal';
import { ParallaxFrameDemo } from '@/components/styleguide/ParallaxFrameDemo';
import { StyleguideGalleryFixture } from '@/components/styleguide/StyleguideGalleryFixture';

export const metadata: Metadata = {
  title: 'Design System & Primitives Styleguide | THE PICTURE SQUARE',
  description:
    'Visual inventory of all light monograph tokens, typography classes, motion curves, shared gallery components, and UI primitives.',
};

export default function StyleguidePage() {
  const colorTokens = [
    { name: '--bg', hex: '#F6F4EE', class: 'bg-bg', text: 'text-fg', desc: 'Warm off-white page background' },
    { name: '--bg-raised', hex: '#FFFFFF', class: 'bg-bg-raised', text: 'text-fg', desc: 'Cards, elevated surfaces' },
    { name: '--bg-sunken', hex: '#ECE8DF', class: 'bg-bg-sunken', text: 'text-fg', desc: 'Inset panels, form fields, image wells' },
    { name: '--bg-inverse', hex: '#141413', class: 'bg-bg-inverse', text: 'text-fg-inverse', desc: 'Dark overlay backgrounds, modal scrims' },
    { name: '--fg', hex: '#141413', class: 'bg-fg', text: 'text-fg-inverse', desc: 'Primary body text, headers (17.07:1)' },
    { name: '--fg-dim', hex: '#63605A', class: 'bg-fg-dim', text: 'text-fg-inverse', desc: 'Secondary body, captions (5.76:1)' },
    { name: '--fg-faint', hex: '#8A857D', class: 'bg-fg-faint', text: 'text-fg-inverse', desc: 'Tertiary metadata, muted borders' },
    { name: '--rule', hex: 'rgba(20,20,19,0.10)', class: 'bg-rule', text: 'text-fg', desc: 'Subtle hairline divider' },
    { name: '--rule-strong', hex: 'rgba(20,20,19,0.18)', class: 'bg-rule-strong', text: 'text-fg', desc: 'Emphasized borders and dividers' },
    { name: '--accent', hex: '#B89B72', class: 'bg-accent', text: 'text-fg-inverse', desc: 'Warm antique gold (decorative only)' },
    { name: '--accent-text', hex: '#84683D', class: 'bg-accent-text', text: 'text-fg-inverse', desc: 'Darkened antique gold for text (4.83:1 AA)' },
  ];

  return (
    <main className="py-28 sm:py-36 space-y-24">
      {/* ------------------------------------------------------------- */}
      {/* STYLEGUIDE HEADER                                             */}
      {/* ------------------------------------------------------------- */}
      <Shell>
        <div className="space-y-6 max-w-4xl border-b border-rule pb-12">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
            <GoldMeta>DESIGN SYSTEM MONOGRAPH</GoldMeta>
          </div>

          <h1 className="font-display text-display-lg text-fg font-normal leading-none">
            STYLEGUIDE &amp; SPECIFICATION
          </h1>

          <p className="font-display text-2xl sm:text-3xl font-normal italic text-accent-text">
            &ldquo;Light, quiet, editorial. The photographs are the design; the interface is the frame.&rdquo;
          </p>

          <p className="prose-editorial text-fg-dim">
            This live styleguide documents every color token, fluid clamp typography class, motion easing preset, and UI component primitive built for The Picture Square.
          </p>
        </div>
      </Shell>

      {/* ------------------------------------------------------------- */}
      {/* 1. COLOR TOKENS                                               */}
      {/* ------------------------------------------------------------- */}
      <Shell>
        <div className="space-y-10">
          <SectionHead title="01 — COLOR TOKENS &amp; PALETTE" eyebrow="LIGHT MONOGRAPH GROUND" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {colorTokens.map((token) => (
              <div
                key={token.name}
                className="p-5 rounded-sm bg-bg-raised border border-rule space-y-4 shadow-[0_4px_20px_rgba(20,20,19,0.03)]"
              >
                <div
                  className={`w-full h-20 rounded-sm ${token.class} border border-rule/50 flex items-end p-3`}
                >
                  <span className={`text-[12px] font-mono font-semibold ${token.text}`}>
                    {token.hex}
                  </span>
                </div>

                <div className="space-y-1 font-sans">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-bold text-fg tracking-wide">
                      {token.name}
                    </span>
                    <span className="text-meta-sm text-accent-text font-semibold">
                      .{token.class}
                    </span>
                  </div>
                  <p className="text-[13px] text-fg-dim">
                    {token.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Shell>

      {/* ------------------------------------------------------------- */}
      {/* 2. RECURRING SECTIONHEAD & RULE DEVICES                       */}
      {/* ------------------------------------------------------------- */}
      <Shell>
        <div className="space-y-10">
          <SectionHead title="02 — RECURRING SECTIONHEAD &amp; RULE DEVICES" eyebrow="LAYOUT APPARATUS" />

          <div className="p-8 rounded-sm bg-bg-raised border border-rule space-y-12 shadow-[0_4px_20px_rgba(20,20,19,0.03)]">
            <div className="space-y-3">
              <span className="text-meta text-accent-text block font-semibold">1. STANDARD SECTIONHEAD WITH NUMBER AND EYEBROW</span>
              <SectionHead number={1} eyebrow="CURATED ARCHIVE" title="WEDDING PORTFOLIO" />
            </div>

            <div className="space-y-3">
              <span className="text-meta text-accent-text block font-semibold">2. SECTIONHEAD WITH EYEBROW ONLY</span>
              <SectionHead eyebrow="CINEMATOGRAPHY DIVISION" title="SLOW-BURN 4K WEDDING FILMS" />
            </div>

            <div className="space-y-3">
              <span className="text-meta text-accent-text block font-semibold">3. HAIRLINE RULE VARIANTS</span>
              <div className="space-y-6 pt-2">
                <div className="space-y-2">
                  <span className="text-meta-sm text-fg-dim">Standard Hairline (&lt;Rule /&gt;)</span>
                  <Rule />
                </div>
                <div className="space-y-2">
                  <span className="text-meta-sm text-fg-dim">Gold Gradient Hairline (&lt;Rule variant=&quot;gold&quot; /&gt;)</span>
                  <Rule variant="gold" />
                </div>
                <div className="space-y-2">
                  <span className="text-meta-sm text-fg-dim">Subtle Gold Hairline (&lt;Rule variant=&quot;gold-subtle&quot; /&gt;)</span>
                  <Rule variant="gold-subtle" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Shell>

      {/* ------------------------------------------------------------- */}
      {/* 3. FLUID TYPOGRAPHY SCALE                                     */}
      {/* ------------------------------------------------------------- */}
      <Shell>
        <div className="space-y-10">
          <SectionHead title="03 — FLUID TYPOGRAPHY SCALE" eyebrow="CONDENSED SERIF &amp; SANS" />

          <div className="p-8 rounded-sm bg-bg-raised border border-rule space-y-12 shadow-[0_4px_20px_rgba(20,20,19,0.03)]">
            {/* Hero */}
            <div className="space-y-2 border-b border-rule pb-8">
              <div className="flex items-center justify-between text-meta text-accent-text font-semibold">
                <span>.text-hero — Instrument Serif (clamp 2.4rem – 7.8rem)</span>
                <span>Line-height 0.95</span>
              </div>
              <h2 className="text-hero text-fg">
                WE PHOTOGRAPH THE FEELING.
              </h2>
            </div>

            {/* Display Large */}
            <div className="space-y-2 border-b border-rule pb-8">
              <div className="flex items-center justify-between text-meta text-accent-text font-semibold">
                <span>.text-display-lg — Instrument Serif (clamp 2.5rem – 5.5rem)</span>
                <span>Line-height 1.02</span>
              </div>
              <h3 className="text-display-lg text-fg">
                STORIES WE GET TO KEEP.
              </h3>
            </div>

            {/* Display Medium */}
            <div className="space-y-2 border-b border-rule pb-8">
              <div className="flex items-center justify-between text-meta text-accent-text font-semibold">
                <span>.text-display-md — Instrument Serif (clamp 2.0rem – 3.8rem)</span>
                <span>Line-height 1.08</span>
              </div>
              <h4 className="text-display-md text-fg">
                CURATED WEDDING ARCHIVES
              </h4>
            </div>

            {/* Pull Quote */}
            <div className="space-y-2 border-b border-rule pb-8">
              <div className="flex items-center justify-between text-meta text-accent-text font-semibold">
                <span>.text-quote — Instrument Serif Italic (clamp 1.25rem – 2.25rem)</span>
                <span>Line-height 1.25</span>
              </div>
              <blockquote className="text-quote text-fg italic">
                &ldquo;Every photograph felt like a moment we remembered rather than a photograph we posed for.&rdquo;
              </blockquote>
            </div>

            {/* Body Copy */}
            <div className="space-y-2 border-b border-rule pb-8">
              <div className="flex items-center justify-between text-meta text-accent-text font-semibold">
                <span>.text-body / .prose-editorial — Plus Jakarta Sans 400 (16–18px)</span>
                <span>Line-height 1.7 · Max-width 68ch</span>
              </div>
              <p className="text-body text-fg-dim">
                We believe the photographs worth keeping are rarely the ones you plan. They are the glance, the laugh, the trembling hands, the chaos, the silence — the moments that become memories before you even realise they happened.
              </p>
            </div>

            {/* Metadata & Sub-metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <span className="text-meta text-accent-text block font-semibold">.text-meta — 0.8125rem (13px) · Tracking 0.20em · Plus Jakarta 600</span>
                <p className="text-meta text-fg">
                  COMMISSION INQUIRY · MATHURA, UTTAR PRADESH
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-meta text-accent-text block font-semibold">.text-meta-sm — 0.75rem (12px) · Tracking 0.20em · Plus Jakarta 600</span>
                <p className="text-meta-sm text-fg-dim">
                  CASE STUDY NO. A-R · JAIPUR PALACE STORY
                </p>
              </div>
            </div>
          </div>
        </div>
      </Shell>

      {/* ------------------------------------------------------------- */}
      {/* 4. BUTTONS & INTERACTIVE PRIMITIVES                           */}
      {/* ------------------------------------------------------------- */}
      <Shell>
        <div className="space-y-10">
          <SectionHead title="04 — BUTTONS &amp; ACCESSIBLE PRIMITIVES" eyebrow="FOCUS &amp; HOVER ACCENTS" />

          <div className="p-8 rounded-sm bg-bg-raised border border-rule space-y-10 shadow-[0_4px_20px_rgba(20,20,19,0.03)]">
            {/* Button Variants */}
            <div className="space-y-4">
              <span className="text-meta text-accent-text block font-semibold">BUTTON VARIANTS (HOVER TO TEST GOLD DOT &amp; TRANSITIONS)</span>
              <div className="flex flex-wrap items-center gap-6">
                <EditorialButton variant="primary" dataCursor="PRIMARY">
                  PRIMARY ACTION
                </EditorialButton>

                <EditorialButton variant="outline" dataCursor="OUTLINE">
                  OUTLINE ACTION
                </EditorialButton>

                <EditorialButton variant="text" dataCursor="TEXT">
                  TEXT LINK VARIANT →
                </EditorialButton>
              </div>
            </div>

            {/* Button Sizes */}
            <div className="space-y-4 pt-4 border-t border-rule">
              <span className="text-meta text-accent-text block font-semibold">BUTTON SIZES (MINIMUM 13PX TEXT ENFORCED)</span>
              <div className="flex flex-wrap items-center gap-6">
                <EditorialButton size="sm" variant="outline">
                  SMALL (13PX)
                </EditorialButton>

                <EditorialButton size="md" variant="primary">
                  MEDIUM (13PX)
                </EditorialButton>

                <EditorialButton size="lg" variant="outline">
                  LARGE (14PX)
                </EditorialButton>
              </div>
            </div>

            {/* Gold Accents */}
            <div className="space-y-4 pt-4 border-t border-rule">
              <span className="text-meta text-accent-text block font-semibold">GOLD ACCENT PRIMITIVES</span>
              <div className="flex flex-wrap items-center gap-8">
                <GoldNumber number={1} />
                <GoldNumber number={8} />
                <GoldNumber number="26" />
                <GoldMeta>FEATURED EDITORIAL CHAPTER</GoldMeta>
                <div className="w-32">
                  <GoldDivider subtle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Shell>

      {/* ------------------------------------------------------------- */}
      {/* 5. IMAGE & TEXT REVEAL PRIMITIVES                             */}
      {/* ------------------------------------------------------------- */}
      <Shell>
        <div className="space-y-10">
          <SectionHead title="05 — MOTION PRIMITIVES &amp; REVEALS" eyebrow="CURTAIN MASKS &amp; WORD STAGGERS" />

          <div className="p-8 rounded-sm bg-bg-raised border border-rule space-y-12 shadow-[0_4px_20px_rgba(20,20,19,0.03)]">
            {/* TextReveal Demo */}
            <div className="space-y-3">
              <span className="text-meta text-accent-text block font-semibold">1. TEXTREVEAL (0.04S WORD STAGGER WITH REDUCED-MOTION NO-OP)</span>
              <TextReveal
                as="h3"
                text="DOCUMENTING SACRED VOWS AND UNGUARDED TEARS WITH RESTRAINT."
                className="font-display text-3xl sm:text-4xl text-fg"
              />
            </div>

            {/* ImageReveal Demo */}
            <div className="space-y-4 pt-4 border-t border-rule">
              <span className="text-meta text-accent-text block font-semibold">2. IMAGEREVEAL (CURTAIN MASK REVEAL, 1.02 HOVER ZOOM, INSET BORDER &amp; CAPTION)</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
                <ImageReveal
                  src="/images/hero-wedding.jpg"
                  alt="Styleguide bridal portrait demonstration"
                  category="PORTRAIT"
                  caption="Royal Palace · Mathura"
                  aspectRatio="aspect-[4/5]"
                  cursorText="PORTFOLIO"
                />

                <ImageReveal
                  src="/images/ceremony-vows.jpg"
                  alt="Styleguide ceremony vows demonstration"
                  category="CEREMONY"
                  caption="Taj Heritage · Agra"
                  aspectRatio="aspect-[4/5]"
                  cursorText="CEREMONY"
                />
              </div>
            </div>

            {/* ParallaxFrame Interactive Demo */}
            <div className="space-y-4 pt-8 border-t border-rule">
              <span className="text-meta text-accent-text block font-semibold">
                3. PARALLAXFRAME (FIXED FRAME, VERTICAL DRIFT, ASYMMETRIC FOCAL BIASING, REDUCED-MOTION NO-OP)
              </span>
              <ParallaxFrameDemo />
            </div>
          </div>
        </div>
      </Shell>

      {/* ------------------------------------------------------------- */}
      {/* 6. RESPONSIVE CONTAINER & SHELL APPARATUS                     */}
      {/* ------------------------------------------------------------- */}
      <Shell>
        <div className="space-y-8">
          <SectionHead title="06 — SHELL CONTAINER APPARATUS" eyebrow="LAYOUT BOUNDS" />

          <div className="p-8 rounded-sm bg-bg-raised border border-rule space-y-4 font-sans text-[13px] text-fg-dim shadow-[0_4px_20px_rgba(20,20,19,0.03)]">
            <p>
              The <code className="text-accent-text font-mono font-semibold">&lt;Shell&gt;</code> component guarantees that every section of the application aligns to a strict 1560px grid with responsive gutters:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-fg">
              <li><strong className="text-accent-text">Mobile (&lt; 640px)</strong>: 20px horizontal padding (<code className="font-mono text-fg-dim">px-5</code>)</li>
              <li><strong className="text-accent-text">Tablet (&ge; 640px)</strong>: 40px horizontal padding (<code className="font-mono text-fg-dim">px-10</code>)</li>
              <li><strong className="text-accent-text">Desktop (&ge; 1024px)</strong>: 72px horizontal padding (<code className="font-mono text-fg-dim">px-[72px]</code>)</li>
            </ul>
          </div>
        </div>
      </Shell>

      {/* ------------------------------------------------------------- */}
      {/* 7. SHARED GALLERY & LIGHTBOX APPARATUS (30-IMAGE FIXTURE)    */}
      {/* ------------------------------------------------------------- */}
      <Shell>
        <div className="space-y-10">
          <SectionHead
            title="07 — MASONRY GALLERY &amp; LIGHTBOX APPARATUS"
            eyebrow="RESPONSIVE COLUMNS &amp; FULLSCREEN VIEWER"
          />

          <div className="p-6 sm:p-8 rounded-sm bg-bg-sunken border border-rule shadow-[0_4px_20px_rgba(20,20,19,0.03)]">
            <StyleguideGalleryFixture />
          </div>
        </div>
      </Shell>
    </main>
  );
}
