'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, MapPin, Mail, Phone } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, FacebookIcon } from '@/components/ui/SocialIcons';
import { StudioLogo } from '@/components/ui/StudioLogo';
import { SITE_CONFIG, FOOTER_PAGES_LINKS } from '@/lib/site-config';

export const GlobalFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-bg-inverse text-fg-inverse pt-24 pb-12 px-5 sm:px-10 lg:px-[72px] border-t border-white/10 mt-24">
      <div className="max-w-[1560px] mx-auto space-y-16 sm:space-y-20">
        {/* ========================================================= */}
        {/* THREE COLUMNS GRID                                        */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Column 1: StudioLogo + Mathura Address + Phone + Email */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <span className="text-meta text-accent block font-semibold">
                STUDIO IMPRINT &amp; HEADQUARTERS
              </span>
              <StudioLogo
                variant="lockup"
                theme="light"
                size="lg"
                href="/"
              />
            </div>

            <div className="space-y-3 font-sans text-[13px] text-fg-inverse/70 tracking-wider uppercase">
              <p className="flex items-center gap-2.5">
                <MapPin size={15} className="text-accent shrink-0" />
                <span>{SITE_CONFIG.address.formatted}</span>
              </p>

              <p className="flex items-center gap-2.5">
                <Mail size={15} className="text-accent shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="hover:text-accent transition-colors"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </p>

              {SITE_CONFIG.contact.phone ? (
                <p className="flex items-center gap-2.5">
                  <Phone size={15} className="text-accent shrink-0" />
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone}`}
                    className="hover:text-accent transition-colors"
                  >
                    {SITE_CONFIG.contact.phone}
                  </a>
                </p>
              ) : (
                <p className="flex items-center gap-2.5 text-fg-inverse/40">
                  <Phone size={15} className="text-accent/70 shrink-0" />
                  <span>{SITE_CONFIG.contact.phoneDisplay}</span>
                </p>
              )}

              <p className="text-fg-inverse/40 pt-1">
                MATHURA · AGRA · RAJASTHAN · WORLDWIDE DESK
              </p>
            </div>
          </div>

          {/* Column 2: Two Link Columns (Pages / Connect) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8 font-sans">
            {/* Pages Link Column */}
            <div className="space-y-4">
              <span className="text-meta text-accent block font-semibold">PAGES</span>
              <ul className="space-y-2.5 text-fg-inverse/70 tracking-wider uppercase font-medium text-[13px]">
                {FOOTER_PAGES_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="hover:text-accent transition-colors rounded-sm focus-visible:ring-2 focus-visible:ring-accent focus:outline-none"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Link Column */}
            <div className="space-y-4">
              <span className="text-meta text-accent block font-semibold">CONNECT</span>
              <ul className="space-y-2.5 text-fg-inverse/70 tracking-wider uppercase font-medium text-[13px]">
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-accent transition-colors rounded-sm focus-visible:ring-2 focus-visible:ring-accent focus:outline-none"
                  >
                    Send Inquiry
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="hover:text-accent transition-colors rounded-sm focus-visible:ring-2 focus-visible:ring-accent focus:outline-none"
                  >
                    Direct Email
                  </a>
                </li>
                <li>
                  <a
                    href={SITE_CONFIG.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent transition-colors rounded-sm focus-visible:ring-2 focus-visible:ring-accent focus:outline-none"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href={SITE_CONFIG.social.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent transition-colors rounded-sm focus-visible:ring-2 focus-visible:ring-accent focus:outline-none"
                  >
                    YouTube
                  </a>
                </li>
                <li>
                  <a
                    href={SITE_CONFIG.social.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent transition-colors rounded-sm focus-visible:ring-2 focus-visible:ring-accent focus:outline-none"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: BACK TO TOP Button */}
          <div className="lg:col-span-3 flex lg:justify-end items-start">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/15 text-[13px] font-sans font-semibold tracking-[0.20em] text-fg-inverse hover:border-accent hover:text-accent transition-all uppercase focus-visible:ring-2 focus-visible:ring-accent focus:outline-none cursor-pointer"
              aria-label="Back to top"
              data-cursor="TOP"
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SOCIAL ICON ROW ABOVE COPYRIGHT BAR                       */}
        {/* ========================================================= */}
        <div className="flex items-center justify-between border-t border-white/10 pt-8">
          <span className="text-meta text-fg-inverse/60 font-semibold">
            FOLLOW STUDIO BROADCASTS &amp; REELS
          </span>

          <div className="flex items-center gap-5 text-fg-inverse/60">
            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-white/15 text-fg-inverse/60 hover:text-accent hover:border-accent transition-all"
              aria-label="Follow on Instagram"
              data-cursor="INSTAGRAM"
            >
              <InstagramIcon size={16} />
            </a>

            <a
              href={SITE_CONFIG.social.youtube}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-white/15 text-fg-inverse/60 hover:text-accent hover:border-accent transition-all"
              aria-label="Watch on YouTube"
              data-cursor="YOUTUBE"
            >
              <YoutubeIcon size={16} />
            </a>

            <a
              href={SITE_CONFIG.social.facebook}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-white/15 text-fg-inverse/60 hover:text-accent hover:border-accent transition-all"
              aria-label="Follow on Facebook"
              data-cursor="FACEBOOK"
            >
              <FacebookIcon size={16} />
            </a>
          </div>
        </div>

        {/* Hairline Divider */}
        <div className="w-full h-[1px] bg-white/10" aria-hidden="true" />

        {/* ========================================================= */}
        {/* BOTTOM BAR: Wordmark © {year} (Left) | Website (Right)     */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] font-sans font-medium tracking-[0.20em] text-fg-inverse/40 uppercase">
          <p>
            {SITE_CONFIG.wordmark} © {new Date().getFullYear()}
          </p>
          <p className="text-fg-inverse/60 hover:text-accent transition-colors">
            {SITE_CONFIG.domainDisplay}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;
