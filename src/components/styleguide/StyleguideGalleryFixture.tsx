'use client';

import React, { useState } from 'react';
import { MasonryGallery } from '@/components/gallery/MasonryGallery';
import { Lightbox } from '@/components/gallery/Lightbox';
import { GalleryImage } from '@/lib/content/types';

const FIXTURE_IMAGES: GalleryImage[] = [
  // 1. Portrait 2:3
  {
    src: '/images/ceremony-vows.jpg',
    width: 1600,
    height: 2400,
    alt: '01: Sacred Phere vows by the evening Agni fire in Agra',
    blurDataURL:
      'data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAADwAQCdASoLABAABUB8JQAAS7rG3/dKqWAA/uOEsPEjRrIUftIJFsg+5fM0fohpdoq1Ee4JPpCSQbqjt7BkJDJwKlTdl5SXapgOTBJTKAAAAA==',
  },
  // 2. Landscape 3:2
  {
    src: '/images/hero-wedding.jpg',
    width: 1600,
    height: 1067,
    alt: '02: Bridal portrait in the sandstone palace corridors',
    blurDataURL:
      'data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADwAQCdASoQAAsABUB8JQBdgB4bjjh6LAAA/uNANMPPMxQ8XIu8dUcgSYrmF6060nj9AAAA',
  },
  // 3. Landscape 3:2
  {
    src: '/images/dance-celebration.jpg',
    width: 1600,
    height: 1067,
    alt: '03: Sangeet dance celebration and kinetic movement',
    blurDataURL:
      'data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAADQAQCdASoQAAsABUB8JQAAUlD87XbOAAD+tgMrkk++/JDrFtpKt7SQjLAuzf7k9A8AAA==',
  },
  // 4. Portrait 4:5
  {
    src: '/images/jewelry-details.jpg',
    width: 1200,
    height: 1500,
    alt: '04: Antique Polki diamond and heirloom gold jewelry detail',
    blurDataURL:
      'data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAAAQAgCdASoQAAsABUB8JZQC7AERHLfagH2AAP7IAdJL8Ksk1r6TTBuy/2j3WRsrMag5w2jqFLAN3alumEs1MySs5aaeAA==',
  },
  // 5. Landscape 3:2
  {
    src: '/images/sunset-ghats.jpg',
    width: 1600,
    height: 1067,
    alt: '05: Yamuna river ghats golden hour lookbook in Mathura',
    blurDataURL:
      'data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAAAwAgCdASoQAAsABUB8JYgCsAD7gM0Gc5YgAAD+W4OzZQj9MwK/HiwuA0DfxW0qg9cWYlG+zXfAxsqMmOz5xU/YEgzrdS4qIMQ2E3dwAAA=',
  },
  // 6. Landscape 3:2
  {
    src: '/images/mathura-heritage.jpg',
    width: 1600,
    height: 1067,
    alt: '06: Heritage architecture and temple archways in Braj',
    blurDataURL:
      'data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAAAwAgCdASoQAAsABUB8JaACdH8AFe21EFVhMAD+Mpn/GmN3bggEf/VrTftYBeD7XoQcQHg8BM1eWqPg3v1+YNnbuGJwlu9XYVX6Bc2YAAA=',
  },
  // 7. Portrait 4:5
  {
    src: '/images/hero-wedding.jpg',
    width: 1200,
    height: 1500,
    alt: '07: Crimson silk veil draped over bride',
  },
  // 8. Landscape 3:2
  {
    src: '/images/ceremony-vows.jpg',
    width: 1600,
    height: 1067,
    alt: '08: Varmala garland exchange under floral mandap',
  },
  // 9. Portrait 2:3
  {
    src: '/images/sunset-ghats.jpg',
    width: 1200,
    height: 1800,
    alt: '09: Sunset boat silhouette along Vishram Ghat',
  },
  // 10. Landscape 3:2
  {
    src: '/images/dance-celebration.jpg',
    width: 1600,
    height: 1067,
    alt: '10: Dholak folk music and courtyard laughter',
  },
  // 11. Portrait 4:5
  {
    src: '/images/jewelry-details.jpg',
    width: 1200,
    height: 1500,
    alt: '11: Kundan bangles and bridal henna artwork',
  },
  // 12. Landscape 3:2
  {
    src: '/images/mathura-heritage.jpg',
    width: 1600,
    height: 1067,
    alt: '12: Morning light through carved stone jaalis',
  },
  // 13. Portrait 2:3
  {
    src: '/images/ceremony-vows.jpg',
    width: 1600,
    height: 2400,
    alt: '13: Father of the bride blessing during Kanyadaan',
  },
  // 14. Landscape 16:9
  {
    src: '/images/hero-wedding.jpg',
    width: 1920,
    height: 1080,
    alt: '14: Panoramic courtyard reception under lantern canopy',
  },
  // 15. Landscape 3:2
  {
    src: '/images/sunset-ghats.jpg',
    width: 1600,
    height: 1067,
    alt: '15: Flocks of birds over the calm river waters',
  },
  // 16. Portrait 4:5
  {
    src: '/images/dance-celebration.jpg',
    width: 1200,
    height: 1500,
    alt: '16: Emotional embrace between mother and daughter',
  },
  // 17. Landscape 3:2
  {
    src: '/images/jewelry-details.jpg',
    width: 1600,
    height: 1068,
    alt: '17: Handcrafted wedding bands on antique brass tray',
  },
  // 18. Portrait 2:3
  {
    src: '/images/hero-wedding.jpg',
    width: 1200,
    height: 1800,
    alt: '18: Quiet portrait in the palace garden alcove',
  },
  // 19. Landscape 3:2
  {
    src: '/images/ceremony-vows.jpg',
    width: 1600,
    height: 1067,
    alt: '19: Sacred sindoor ceremony at twilight',
  },
  // 20. Landscape 3:2
  {
    src: '/images/mathura-heritage.jpg',
    width: 1600,
    height: 1067,
    alt: '20: Ancient stone temple bells ringing at dusk',
  },
  // 21. Portrait 4:5
  {
    src: '/images/sunset-ghats.jpg',
    width: 1200,
    height: 1500,
    alt: '21: Couple standing on the riverbank steps',
  },
  // 22. Landscape 3:2
  {
    src: '/images/dance-celebration.jpg',
    width: 1600,
    height: 1067,
    alt: '22: Baraat entrance with brass band and royal umbrellas',
  },
  // 23. Portrait 2:3
  {
    src: '/images/jewelry-details.jpg',
    width: 1200,
    height: 1800,
    alt: '23: Intricate emerald mathapatti close-up',
  },
  // 24. Landscape 16:9
  {
    src: '/images/hero-wedding.jpg',
    width: 1920,
    height: 1080,
    alt: '24: Wide panoramic landscape of palace facade at night',
  },
  // 25. Landscape 3:2
  {
    src: '/images/ceremony-vows.jpg',
    width: 1600,
    height: 1067,
    alt: '25: The seven steps (Saptapadi) around the sacred flame',
  },
  // 26. Portrait 4:5
  {
    src: '/images/sunset-ghats.jpg',
    width: 1200,
    height: 1500,
    alt: '26: Floating diyas illuminated on the dark river',
  },
  // 27. Landscape 3:2
  {
    src: '/images/mathura-heritage.jpg',
    width: 1600,
    height: 1067,
    alt: '27: Warm candlelight reflections across sandstone arches',
  },
  // 28. Portrait 2:3
  {
    src: '/images/dance-celebration.jpg',
    width: 1200,
    height: 1800,
    alt: '28: Groom spun in the air by childhood friends',
  },
  // 29. Landscape 3:2
  {
    src: '/images/jewelry-details.jpg',
    width: 1600,
    height: 1068,
    alt: '29: Raw silk sherwani buttons and pocket square detail',
  },
  // 30. Landscape 3:2
  {
    src: '/images/hero-wedding.jpg',
    width: 1600,
    height: 1067,
    alt: '30: Final departure vidaai in vintage automobile',
  },
];

export const StyleguideGalleryFixture: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null);

  const handleOpen = (index: number, element?: HTMLElement) => {
    setLightboxIndex(index);
    if (element) setTriggerEl(element);
  };

  const handleClose = () => {
    setLightboxIndex(null);
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % FIXTURE_IMAGES.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + FIXTURE_IMAGES.length) % FIXTURE_IMAGES.length
      );
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-rule pb-4">
        <div>
          <span className="text-meta text-accent-text block font-semibold">
            INTERACTIVE GALLERY &amp; LIGHTBOX FIXTURE (30 IMAGES)
          </span>
          <p className="text-body text-fg-dim text-sm mt-1">
            CSS columns (1 col &lt;640px, 2 cols 640px–1024px, 3 cols &ge;1024px) with true aspect ratio preservation. Click any photograph to launch the fullscreen Lightbox with touch swipe, keyboard arrows, Tab trapping, focus restoration, and preload caching.
          </p>
        </div>

        <div className="shrink-0 px-3.5 py-1.5 rounded-full bg-bg-sunken border border-rule text-meta-sm text-accent-text font-semibold">
          {FIXTURE_IMAGES.length} STILLS
        </div>
      </div>

      {/* MasonryGallery Component */}
      <MasonryGallery images={FIXTURE_IMAGES} onOpen={handleOpen} />

      {/* Lightbox Component */}
      <Lightbox
        images={FIXTURE_IMAGES}
        index={lightboxIndex}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
        triggerElement={triggerEl}
      />
    </div>
  );
};

export default StyleguideGalleryFixture;
