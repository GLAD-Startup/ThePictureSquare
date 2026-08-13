import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GoldMeta, GoldDivider } from '../components/ui/GoldAccent';
import { ArrowLeft, ArrowUpRight, Calendar, MapPin, Sparkles } from 'lucide-react';

interface DetailedStoryData {
  slug: string;
  couple: string;
  location: string;
  date: string;
  subtitle: string;
  heroImage: string;
  introParagraph1: string;
  introParagraph2: string;
  weddingDetails: { label: string; value: string }[];
  galleryImages: string[];
  filmTitle: string;
  filmDesc: string;
}

const DETAILED_STORIES: Record<string, DetailedStoryData> = {
  'a-r': {
    slug: 'a-r',
    couple: 'ANANYA & ROHAN',
    location: 'JAIPUR · RAJASTHAN',
    date: '14.02.26',
    subtitle: 'A three-day palace celebration framed by golden hour light and family heirlooms across Rambagh Palace.',
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=85&w=1800&auto=format&fit=crop',
    introParagraph1: 'Set against the pink sandstone courtyards of Rambagh Palace, Ananya and Rohan’s wedding brought together family traditions from Jaipur and Delhi in a three-day visual festival.',
    introParagraph2: 'From the quiet morning bridal preparations to the candlelit sangeet and dusk pheras, our team documented every glance and unscripted laugh with fine-art editorial vision.',
    weddingDetails: [
      { label: 'VENUE', value: 'RAMBAGH PALACE, JAIPUR' },
      { label: 'DURATION', value: '3 DAYS MULTI-EVENT' },
      { label: 'GUESTS', value: '450 GUESTS' },
      { label: 'FORMAT', value: '35MM STILLS & 4K CINEMA' },
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=85&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=85&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=85&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=85&w=1400&auto=format&fit=crop',
    ],
    filmTitle: 'THE PALACE CHRONICLE (4K REEL)',
    filmDesc: '18-minute cinematic feature film scored with custom acoustic soundscapes.',
  },
  'p-k': {
    slug: 'p-k',
    couple: 'PRIYA & KARAN',
    location: 'AGRA & MATHURA · UTTAR PRADESH',
    date: '28.11.25',
    subtitle: 'A traditional celebration grounded in family heritage, sacred rituals, and candlelit ghat moments.',
    heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=85&w=1800&auto=format&fit=crop',
    introParagraph1: 'Rooted in Uttar Pradesh traditions, Priya and Karan’s wedding spanned traditional ceremony rituals along Yamuna riverfronts to an intimate reception in Agra.',
    introParagraph2: 'Our team captured sacred phere, heirloom gold embroidery, and unfiltered joy without interrupting the sanctity of the sacred rituals.',
    weddingDetails: [
      { label: 'VENUE', value: 'AMPHITHEATRE HERITAGE, AGRA' },
      { label: 'DURATION', value: '2 DAYS TRADITIONAL' },
      { label: 'GUESTS', value: '300 GUESTS' },
      { label: 'FORMAT', value: 'MEDIUM FORMAT STILLS & 4K CINEMA' },
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=85&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=85&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=85&w=1200&auto=format&fit=crop',
    ],
    filmTitle: 'SACRED YAMUNA RITUALS (4K REEL)',
    filmDesc: '12-minute documentary motion picture capturing sacred chanting and family blessings.',
  },
  'm-a': {
    slug: 'm-a',
    couple: 'MEERA & ADITYA',
    location: 'UDAIPUR · RAJASTHAN',
    date: '05.01.26',
    subtitle: 'An intimate multi-day destination wedding overlooking quiet waters and vintage palace architecture.',
    heroImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=85&w=1800&auto=format&fit=crop',
    introParagraph1: 'Surrounded by Lake Pichola waters, Meera and Aditya celebrated their love with close friends and family in an intimate destination setting.',
    introParagraph2: 'Every frame reflects quiet luxury, golden sunset reflections, and candid emotional storytelling.',
    weddingDetails: [
      { label: 'VENUE', value: 'LAKE PALACE, UDAIPUR' },
      { label: 'DURATION', value: '3 DAYS DESTINATION' },
      { label: 'GUESTS', value: '200 GUESTS' },
      { label: 'FORMAT', value: 'DOCUMENTARY STILLS & DRONE AERIALS' },
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=85&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=85&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=85&w=1200&auto=format&fit=crop',
    ],
    filmTitle: 'LAKESIDE CHRONICLE (4K REEL)',
    filmDesc: '15-minute cinematic film with drone aerials and custom soundscapes.',
  },
};

export const StoryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const story = (slug && DETAILED_STORIES[slug]) || DETAILED_STORIES['a-r'];
  const easeOutEditorial = [0.23, 1, 0.32, 1] as const;

  return (
    <div className="pt-28 pb-24 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto space-y-16">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between border-b border-[#141413]/10 pb-6">
        <Link
          to="/stories"
          className="inline-flex items-center gap-2.5 text-xs font-sans font-semibold tracking-[0.22em] text-[#141413] hover:text-[#B89B72] uppercase transition-colors"
        >
          <ArrowLeft size={16} />
          <span>BACK TO STORIES</span>
        </Link>

        <div className="flex items-center gap-4 text-meta text-[10px] text-[#6C6862]">
          <span>CASE STUDY NO. {story.slug.toUpperCase()}</span>
          <span>•</span>
          <span className="text-[#B89B72]">{story.location}</span>
        </div>
      </div>

      {/* Story Header */}
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center gap-3">
          <Sparkles size={14} className="text-[#B89B72]" />
          <GoldMeta>EDITORIAL CASE STUDY</GoldMeta>
        </div>

        <h1 className="font-serif-editorial text-display-lg text-[#141413] font-light leading-none">
          {story.couple}
        </h1>

        <p className="font-serif-editorial text-2xl sm:text-3xl font-light italic text-[#6C6862]">
          "{story.subtitle}"
        </p>

        <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-sans text-[#6C6862] tracking-wider uppercase font-semibold">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-[#B89B72]" />
            <span>{story.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-[#B89B72]" />
            <span>{story.date}</span>
          </div>
        </div>
      </div>

      {/* Hero Full-Bleed Image Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: easeOutEditorial }}
        className="relative w-full h-[60vh] sm:h-[75vh] overflow-hidden rounded-sm bg-[#ECE8DF] border border-[#141413]/10"
      >
        <img
          src={story.heroImage}
          alt={story.couple}
          loading="eager"
          className="w-full h-full object-cover object-center filter brightness-[0.98]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/40 via-transparent to-transparent" />
      </motion.div>

      {/* Story Narrative & Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start py-8">
        {/* Intro Paragraphs */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="font-serif-editorial text-3xl font-light text-[#141413]">
            THE STORY & VISION
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#141413]/85 leading-relaxed tracking-wide">
            {story.introParagraph1}
          </p>
          <p className="font-sans text-xs sm:text-sm text-[#141413]/85 leading-relaxed tracking-wide">
            {story.introParagraph2}
          </p>
        </div>

        {/* Wedding Details Sidebar */}
        <div className="lg:col-span-5 space-y-4 bg-[#ECE8DF]/40 p-8 rounded-sm border border-[#141413]/10">
          <span className="text-meta text-[#B89B72] text-[10px] block">
            WEDDING DETAILS & SPECS
          </span>
          <div className="space-y-3 font-sans text-xs">
            {story.weddingDetails.map((detail, i) => (
              <div key={i} className="flex justify-between py-1.5 border-b border-[#141413]/10">
                <span className="font-semibold tracking-wider text-[#6C6862] uppercase">{detail.label}</span>
                <span className="font-medium text-[#141413] tracking-wide">{detail.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <GoldDivider subtle />

      {/* Curated Case Study Print Gallery */}
      <div className="space-y-8">
        <h2 className="font-serif-editorial text-3xl font-light text-[#141413]">
          CURATED STORY SEQUENCE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {story.galleryImages.map((imgSrc, idx) => (
            <div
              key={idx}
              className="relative w-full aspect-[4/3] overflow-hidden rounded-sm bg-[#ECE8DF] border border-[#141413]/10"
            >
              <img
                src={imgSrc}
                alt={`${story.couple} frame ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover filter brightness-[0.98]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dual Page Footer Navigation */}
      <div className="pt-16 border-t border-[#141413]/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link
          to="/stories"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#141413]/25 text-[#141413] hover:border-[#B89B72] hover:bg-[#141413] hover:text-[#F6F4EE] font-sans text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-400"
        >
          <ArrowLeft size={16} />
          <span>BACK TO STORIES</span>
        </Link>

        <Link
          to="/contact"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#141413] text-[#F6F4EE] hover:bg-[#B89B72] hover:text-[#141413] font-sans text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-400"
        >
          <span>START YOUR STORY →</span>
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default StoryDetailPage;
