export interface WeddingItem {
  id: string;
  number: string;
  title: string;
  category: 'CANDID' | 'TRADITIONAL' | 'PORTRAITS' | 'CEREMONIES' | 'CELEBRATIONS';
  location: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  span: string;
}

export const WEDDING_GALLERY: WeddingItem[] = [
  {
    id: 'w1',
    number: '01',
    title: 'THE ADORNED LEHENGA',
    category: 'PORTRAITS',
    location: 'ROYAL PALACE · MATHURA',
    src: '/images/hero-wedding.jpg',
    alt: 'Bridal portrait in traditional embroidered lehenga at Mathura Palace',
    width: 1200,
    height: 1600,
    span: 'lg:col-span-7',
  },
  {
    id: 'w2',
    number: '02',
    title: 'THE SACRED FLAME',
    category: 'CEREMONIES',
    location: 'TAJ HERITAGE · AGRA',
    src: '/images/ceremony-vows.jpg',
    alt: 'Sacred wedding vows around the holy fire ritual in Agra',
    width: 1600,
    height: 1200,
    span: 'lg:col-span-5',
  },
  {
    id: 'w3',
    number: '03',
    title: 'UNFILTERED EMOTION & LAUGHTER',
    category: 'CANDID',
    location: 'COURTYARD · DELHI NCR',
    src: '/images/dance-celebration.jpg',
    alt: 'Joyful family celebration and sangeet dance in Delhi NCR',
    width: 1600,
    height: 800,
    span: 'lg:col-span-12',
  },
  {
    id: 'w4',
    number: '04',
    title: 'ROYAL BARAAT & CELEBRATION',
    category: 'CELEBRATIONS',
    location: 'RAMBAGH PALACE · JAIPUR',
    src: '/images/jewelry-details.jpg',
    alt: 'Heirloom bridal jewelry and intricate gold craftsmanship in Jaipur',
    width: 1200,
    height: 1500,
    span: 'lg:col-span-6',
  },
  {
    id: 'w5',
    number: '05',
    title: 'TRADITIONAL BLESSINGS',
    category: 'TRADITIONAL',
    location: 'TEMPLE COURTYARD · MATHURA',
    src: '/images/sunset-ghats.jpg',
    alt: 'Sunset ghats ceremony rituals in Mathura',
    width: 1200,
    height: 1500,
    span: 'lg:col-span-6',
  },
];

export const WEDDING_CATEGORIES = ['ALL', 'CANDID', 'TRADITIONAL', 'PORTRAITS', 'CEREMONIES', 'CELEBRATIONS'] as const;

export interface PreWeddingStory {
  id: string;
  number: string;
  title: string;
  location: string;
  desc: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  span: string;
}

export const PRE_WEDDINGS: PreWeddingStory[] = [
  {
    id: 'pw1',
    number: '01',
    title: 'YAMUNA GHATS SUNSET SILENCE',
    location: 'MATHURA · UTTAR PRADESH',
    desc: 'Golden hour reflection across historic river ghats framed by vintage wooden boats and morning mist.',
    src: '/images/sunset-ghats.jpg',
    alt: 'Sunset pre-wedding portrait at historic Yamuna river ghats in Mathura',
    width: 1600,
    height: 900,
    span: 'lg:col-span-12',
  },
  {
    id: 'pw2',
    number: '02',
    title: 'HERITAGE COURTYARD PORTRAIT',
    location: 'AMPHITHEATRE · AGRA',
    desc: 'Intimate couple portrait framed by sandstone arches and quiet shadows.',
    src: '/images/jewelry-details.jpg',
    alt: 'Fine-art pre-wedding lookbook session in Agra',
    width: 1200,
    height: 1600,
    span: 'lg:col-span-6',
  },
  {
    id: 'pw3',
    number: '03',
    title: 'PALACE SUNSET LOOKBOOK',
    location: 'RAMBAGH · JAIPUR',
    desc: 'High-editorial lookbook session captured in low-angle golden sunlight.',
    src: '/images/hero-wedding.jpg',
    alt: 'Editorial lookbook shoot at Rambagh Palace Jaipur',
    width: 1200,
    height: 1600,
    span: 'lg:col-span-6',
  },
];

export interface FilmItem {
  id: string;
  number: string;
  title: string;
  couple: string;
  location: string;
  duration: string;
  audioScore: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  span: string;
  videoUrl?: string; // Empty/optional until client provides real embeds
}

export const FILMS: FilmItem[] = [
  {
    id: 'film-1',
    number: '01',
    title: 'THE PALACE CHRONICLE',
    couple: 'ANANYA & ROHAN',
    location: 'JAIPUR · RAJASTHAN',
    duration: '18 MINS · 4K CINEMA',
    audioScore: 'BESPOKE ACOUSTIC & AMBIENT SCORING',
    src: '/images/hero-wedding.jpg',
    alt: 'Cinematic film frame of Jaipur Palace wedding chronicle',
    width: 1600,
    height: 900,
    span: 'lg:col-span-12',
  },
  {
    id: 'film-2',
    number: '02',
    title: 'SACRED YAMUNA RITUALS',
    couple: 'PRIYA & KARAN',
    location: 'AGRA & MATHURA',
    duration: '12 MINS · 4K CINEMA',
    audioScore: 'CLASSICAL INSTRUMENTAL & NATURAL SOUND',
    src: '/images/ceremony-vows.jpg',
    alt: 'Cinematic film frame of sacred Yamuna river wedding rituals',
    width: 1600,
    height: 900,
    span: 'lg:col-span-6',
  },
  {
    id: 'film-3',
    number: '03',
    title: 'ROYAL LAKESIDE CELEBRATION',
    couple: 'MEERA & ADITYA',
    location: 'UDAIPUR DESTINATION',
    duration: '15 MINS · 4K CINEMA',
    audioScore: 'ORCHESTRAL SOUNDSCAPE & VOCALS',
    src: '/images/sunset-ghats.jpg',
    alt: 'Cinematic film frame of Udaipur lakeside destination wedding',
    width: 1600,
    height: 900,
    span: 'lg:col-span-6',
  },
];

export interface DetailedStoryData {
  slug: string;
  number: string;
  couple: string;
  location: string;
  date: string;
  title: string;
  subtitle: string;
  summary: string;
  heroImage: string;
  heroAlt: string;
  introParagraph1: string;
  introParagraph2: string;
  weddingDetails: { label: string; value: string }[];
  galleryImages: { src: string; alt: string; width: number; height: number }[];
  filmTitle: string;
  filmDesc: string;
}

export const STORIES_DATA: Record<string, DetailedStoryData> = {
  'a-r': {
    slug: 'a-r',
    number: '01',
    couple: 'ANANYA & ROHAN',
    location: 'JAIPUR · RAJASTHAN',
    date: '14.02.26',
    title: 'PALACE SUNSET & HEIRLOOM JEWELRY',
    subtitle: 'A three-day palace celebration framed by golden hour light and family heirlooms across Rambagh Palace.',
    summary: 'A three-day palace celebration framed by golden hour light and family heirlooms across Rambagh Palace.',
    heroImage: '/images/hero-wedding.jpg',
    heroAlt: 'Ananya & Rohan Jaipur Palace wedding portrait',
    introParagraph1:
      'Set against the pink sandstone courtyards of Rambagh Palace, Ananya and Rohan’s wedding brought together family traditions from Jaipur and Delhi in a three-day visual festival.',
    introParagraph2:
      'From the quiet morning bridal preparations to the candlelit sangeet and dusk pheras, our team documented every glance and unscripted laugh with fine-art editorial restraint.',
    weddingDetails: [
      { label: 'VENUE', value: 'RAMBAGH PALACE, JAIPUR' },
      { label: 'DURATION', value: '3 DAYS MULTI-EVENT' },
      { label: 'GUESTS', value: '450 GUESTS' },
      { label: 'FORMAT', value: '35MM STILLS & 4K CINEMA' },
    ],
    galleryImages: [
      { src: '/images/hero-wedding.jpg', alt: 'Bridal portrait in courtyard', width: 1200, height: 900 },
      { src: '/images/ceremony-vows.jpg', alt: 'Sacred pheras ritual', width: 1200, height: 900 },
      { src: '/images/jewelry-details.jpg', alt: 'Heirloom necklace close-up', width: 1200, height: 900 },
      { src: '/images/sunset-ghats.jpg', alt: 'Dusk couple portrait', width: 1200, height: 900 },
    ],
    filmTitle: 'THE PALACE CHRONICLE (4K REEL)',
    filmDesc: '18-minute cinematic feature film scored with custom acoustic soundscapes.',
  },
  'p-k': {
    slug: 'p-k',
    number: '02',
    couple: 'PRIYA & KARAN',
    location: 'AGRA & MATHURA · UTTAR PRADESH',
    date: '28.11.25',
    title: 'SACRED VOWS BY THE HERITAGE GHATS',
    subtitle: 'A traditional celebration grounded in family heritage, sacred rituals, and candlelit ghat moments.',
    summary: 'A traditional celebration grounded in family heritage, sacred rituals, and candid candlelit moments.',
    heroImage: '/images/ceremony-vows.jpg',
    heroAlt: 'Priya & Karan ceremony vows in Agra',
    introParagraph1:
      'Rooted in Uttar Pradesh traditions, Priya and Karan’s wedding spanned traditional ceremony rituals along Yamuna riverfronts to an intimate reception in Agra.',
    introParagraph2:
      'Our team captured sacred phere, heirloom gold embroidery, and unfiltered joy without interrupting the sanctity of the sacred rituals.',
    weddingDetails: [
      { label: 'VENUE', value: 'AMPHITHEATRE HERITAGE, AGRA' },
      { label: 'DURATION', value: '2 DAYS TRADITIONAL' },
      { label: 'GUESTS', value: '300 GUESTS' },
      { label: 'FORMAT', value: 'MEDIUM FORMAT STILLS & 4K CINEMA' },
    ],
    galleryImages: [
      { src: '/images/ceremony-vows.jpg', alt: 'Sacred fire ceremony', width: 1200, height: 900 },
      { src: '/images/sunset-ghats.jpg', alt: 'Sunset on river ghats', width: 1200, height: 900 },
      { src: '/images/dance-celebration.jpg', alt: 'Sangeet night celebrations', width: 1200, height: 900 },
    ],
    filmTitle: 'SACRED YAMUNA RITUALS (4K REEL)',
    filmDesc: '12-minute documentary motion picture capturing sacred chanting and family blessings.',
  },
  'm-a': {
    slug: 'm-a',
    number: '03',
    couple: 'MEERA & ADITYA',
    location: 'UDAIPUR · RAJASTHAN',
    date: '05.01.26',
    title: 'ROYAL LAKESIDE DESTINATION CHRONICLE',
    subtitle: 'An intimate multi-day destination wedding overlooking quiet waters and vintage palace architecture.',
    summary: 'An intimate multi-day destination wedding overlooking quiet waters and vintage architecture.',
    heroImage: '/images/sunset-ghats.jpg',
    heroAlt: 'Meera & Aditya lakeside destination wedding portrait in Udaipur',
    introParagraph1:
      'Surrounded by Lake Pichola waters, Meera and Aditya celebrated their love with close friends and family in an intimate destination setting.',
    introParagraph2:
      'Every frame reflects quiet luxury, golden sunset reflections, and candid emotional storytelling.',
    weddingDetails: [
      { label: 'VENUE', value: 'LAKE PALACE, UDAIPUR' },
      { label: 'DURATION', value: '3 DAYS DESTINATION' },
      { label: 'GUESTS', value: '200 GUESTS' },
      { label: 'FORMAT', value: 'DOCUMENTARY STILLS & DRONE AERIALS' },
    ],
    galleryImages: [
      { src: '/images/sunset-ghats.jpg', alt: 'Lakeside sunset silhouette', width: 1200, height: 900 },
      { src: '/images/hero-wedding.jpg', alt: 'Bride getting ready in vintage suite', width: 1200, height: 900 },
      { src: '/images/jewelry-details.jpg', alt: 'Kundan jewelry details', width: 1200, height: 900 },
    ],
    filmTitle: 'LAKESIDE CHRONICLE (4K REEL)',
    filmDesc: '15-minute cinematic film with drone aerials and custom soundscapes.',
  },
};

export const STORIES_LIST = Object.values(STORIES_DATA);

export interface ServicePanel {
  id: string;
  number: string;
  title: string;
  tags: string;
  description: string;
  locationTag: string;
  deliverables: string[];
  src: string;
  alt: string;
  width: number;
  height: number;
  layout: 'left-image' | 'right-image' | 'full-width';
}

export const SERVICES: ServicePanel[] = [
  {
    id: 'weddings',
    number: '01',
    title: 'WEDDINGS',
    tags: 'Candid Stills · Family Coordination · Heirlooms',
    description: 'Documenting sacred vows, grand rituals, and unguarded tears with punctual, respectful, and family-cooperative crew presence.',
    locationTag: 'MATHURA · VRINDAVAN · AGRA · RAJASTHAN',
    deliverables: [
      'Punctual, Polite Multi-Day Crew (Zero Ritual Disruption)',
      'Quiet Coordination with Family Elders & Planners',
      'Curated High-Resolution Color-Graded Stills Archive',
      'Signature Lay-Flat Italian Leather Heirloom Album',
    ],
    src: '/images/hero-wedding.jpg',
    alt: 'Luxury Editorial Indian Wedding Photography',
    width: 1200,
    height: 1500,
    layout: 'right-image',
  },
  {
    id: 'cinematography',
    number: '02',
    title: 'CINEMATOGRAPHY',
    tags: '4K Cinema · Flawless Edit · Live Vedic Audio',
    description: 'Slow-burn 4K documentary wedding films scored with pristine acoustic audio, capturing kinetic motion and sacred speech.',
    locationTag: '4K CINEMA · BESPOKE AUDIO',
    deliverables: [
      'Master 4K Cinema Feature Film (20–40 Mins)',
      'Cinematic Highlight Trailer (3–5 Mins)',
      'Multi-Track Audio Recording of Vows & Mantras',
      'Fast 9:16 Vertical Instacuts for Family Sharing',
    ],
    src: '/images/ceremony-vows.jpg',
    alt: 'Cinematic Wedding Film & Motion Picture',
    width: 1200,
    height: 1500,
    layout: 'left-image',
  },
  {
    id: 'pre-weddings',
    number: '03',
    title: 'PRE-WEDDINGS',
    tags: 'Concept Lookbooks · Dawn Sessions · Heritage',
    description: 'Cinematic visual stories created across historic ghats, Mughal sandstone, and royal desert landscapes in a single seamless day.',
    locationTag: 'YAMUNA GHATS · TAJ HERITAGE',
    deliverables: [
      '1-Day Dawn & Dusk Concept Location Session',
      'High-Fashion Editorial Lookbook Stills Archive',
      'Styling & Heritage Direction Guidance',
      '4K Motion Teaser Reel (60 Seconds)',
    ],
    src: '/images/jewelry-details.jpg',
    alt: 'Pre-Wedding Visual Story Photography',
    width: 1200,
    height: 1500,
    layout: 'right-image',
  },
  {
    id: 'the-complete-story',
    number: '04',
    title: 'THE COMPLETE STORY',
    tags: 'Unified Stills & Films · Full Coordination · Master Suite',
    description: 'Our signature full-coverage suite. Unified stills and cinema direction operating in quiet harmony without crowding your mandap.',
    locationTag: 'WORLDWIDE COVERAGE',
    deliverables: [
      'Complete Multi-Day Stills & 4K Cinema Integration',
      'Unified Crew Coordination (No Crowding at Mandap)',
      'Grand Heirloom Monograph + 2 Parent Albums',
      'Encrypted Master SSD containing full RAW Archive',
    ],
    src: '/images/sunset-ghats.jpg',
    alt: 'Full Coverage Heirloom Photography & Film Suite',
    width: 1600,
    height: 900,
    layout: 'full-width',
  },
];

export const HERITAGE_LOCATIONS = [
  { name: 'MATHURA', tag: 'HERITAGE STUDIO & HOME' },
  { name: 'VRINDAVAN', tag: 'SACRED BRAJ CELEBRATIONS' },
  { name: 'AGRA', tag: 'TAJ DESTINATION WEDDINGS' },
  { name: 'DELHI NCR', tag: 'ROYAL PALACE & FARM CELEBRATIONS' },
  { name: 'JAIPUR', tag: 'PALACE & RAJASTHAN DESTINATIONS' },
  { name: 'DESTINATION', tag: 'WORLDWIDE COVERAGE' },
];
