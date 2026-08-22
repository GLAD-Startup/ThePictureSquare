'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface ServiceComparisonColumn {
  id: string;
  name: string;
  badge?: string;
  featured?: boolean;
  days: string;
  crew: string;
  stills: string;
  cinema: string;
  album: string;
  timeline: string;
  preview: string;
  rawArchive: string;
  idealFor: string;
}

const COMPARISON_DATA: ServiceComparisonColumn[] = [
  {
    id: 'weddings',
    name: 'WEDDINGS',
    badge: 'FINE-ART STILLS',
    days: '2 to 4 Days (Full Event)',
    crew: '2–3 Punctual Stills Photographers (Lead Driven)',
    stills: '600–900 Hand-Edited High-Res JPEGs',
    cinema: 'Available as Add-On Suite',
    album: '1 × Signature Lay-Flat Album (80 Pages)',
    timeline: '6–8 Weeks (Full Gallery)',
    preview: '50–75 Preview Frames in 7 Days',
    rawArchive: 'Available Upon Request',
    idealFor: 'Couples prioritizing generational print monographs, unscripted emotion, and family-cooperative crew conduct',
  },
  {
    id: 'cinematography',
    name: 'CINEMATOGRAPHY',
    badge: '4K MOTION PICTURE',
    days: '2 to 4 Days (Full Event)',
    crew: '2–3 Dedicated 4K Cinematographers + Sound Tech',
    stills: 'Select 4K Screen Grabs',
    cinema: '1 × 4K Trailer (3–5 min) + 1 × Feature Film (20–40 min) + Vertical Instacuts',
    album: 'Custom USB Cinema Case',
    timeline: '8–10 Weeks',
    preview: '60s Social Instacut within 72 Hours',
    rawArchive: 'Available on External SSD',
    idealFor: 'Families desiring slow-burn, audio-scored 4K documentary cinema without staged choreography',
  },
  {
    id: 'pre-weddings',
    name: 'PRE-WEDDINGS',
    badge: 'EDITORIAL LOOKBOOK',
    days: '1 Day (Dawn & Dusk Sessions)',
    crew: '1 Lead Photographer + 1 Assistant',
    stills: '100–150 Color-Graded Stills',
    cinema: '1 × 60s Cinema Teaser Reel',
    album: 'Optional Guestbook Album',
    timeline: '3–4 Weeks',
    preview: '15 Curated Frames in 48 Hours',
    rawArchive: 'Not Included',
    idealFor: 'Intimate pre-wedding editorial sessions in Mathura, Vrindavan, Agra, or destination sands',
  },
  {
    id: 'complete-story',
    name: 'THE COMPLETE STORY',
    badge: 'ALL-INCLUSIVE MASTER SUITE',
    featured: true,
    days: '3 to 5 Days (Complete Chronicle)',
    crew: 'Full Combined Studio Suite (5–7 Specialists)',
    stills: '900–1400 Master Edited Stills',
    cinema: 'Complete 4K Motion Suite (Trailer, Feature, Teasers, Instacuts)',
    album: '1 × Grand Leather Monograph (100 Pages) + 2 Parent Albums',
    timeline: '8–10 Weeks',
    preview: 'Curated 7-Day Preview Set',
    rawArchive: 'Included on Encrypted Master SSD',
    idealFor: 'Flagship multi-day celebrations requiring unified stills and cinema working in quiet harmony without crowding',
  },
];

export const ServicesComparisonTable: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* ------------------------------------------------------------- */}
      {/* 1. DESKTOP COMPARISON TABLE (>= 1024px)                       */}
      {/* ------------------------------------------------------------- */}
      <div className="hidden lg:block overflow-x-auto rounded-sm border border-rule bg-bg-raised shadow-[0_10px_30px_rgba(20,20,19,0.06)]">
        <table className="w-full text-left border-collapse font-sans text-[13px]">
          <thead>
            <tr className="border-b border-rule bg-bg-sunken">
              <th className="p-6 text-meta text-fg-dim uppercase tracking-wider w-1/5">
                COMMISSION SUITE
              </th>
              {COMPARISON_DATA.map((col) => (
                <th
                  key={col.id}
                  className={`p-6 w-1/5 align-top ${
                    col.featured ? 'bg-accent/10 border-x border-accent/40' : ''
                  }`}
                >
                  <div className="space-y-1.5">
                    {col.featured && (
                      <span className="text-meta-sm text-accent-text flex items-center gap-1 font-semibold uppercase tracking-widest">
                        <Sparkles size={11} />
                        {col.badge}
                      </span>
                    )}
                    {!col.featured && (
                      <span className="text-meta-sm text-fg-dim uppercase tracking-widest">
                        {col.badge}
                      </span>
                    )}
                    <h3 className="font-display text-2xl text-fg font-normal">
                      {col.name}
                    </h3>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-rule/60 text-fg-dim">
            {/* Row: Coverage Days */}
            <tr>
              <td className="p-5 font-semibold text-fg uppercase tracking-wider text-[11px] bg-bg-sunken/60">
                COVERAGE DURATION
              </td>
              {COMPARISON_DATA.map((col) => (
                <td
                  key={col.id}
                  className={`p-5 ${
                    col.featured ? 'bg-accent/5 font-medium text-fg border-x border-accent/40' : ''
                  }`}
                >
                  {col.days}
                </td>
              ))}
            </tr>

            {/* Row: Crew Size */}
            <tr>
              <td className="p-5 font-semibold text-fg uppercase tracking-wider text-[11px] bg-bg-sunken/60">
                CREW &amp; DIRECTION
              </td>
              {COMPARISON_DATA.map((col) => (
                <td
                  key={col.id}
                  className={`p-5 ${
                    col.featured ? 'bg-accent/5 font-medium text-fg border-x border-accent/40' : ''
                  }`}
                >
                  {col.crew}
                </td>
              ))}
            </tr>

            {/* Row: Stills Deliverables */}
            <tr>
              <td className="p-5 font-semibold text-fg uppercase tracking-wider text-[11px] bg-bg-sunken/60">
                STILLS ARCHIVE
              </td>
              {COMPARISON_DATA.map((col) => (
                <td
                  key={col.id}
                  className={`p-5 ${
                    col.featured ? 'bg-accent/5 font-medium text-fg border-x border-accent/40' : ''
                  }`}
                >
                  {col.stills}
                </td>
              ))}
            </tr>

            {/* Row: 4K Film Deliverables */}
            <tr>
              <td className="p-5 font-semibold text-fg uppercase tracking-wider text-[11px] bg-bg-sunken/60">
                4K CINEMA CUTS
              </td>
              {COMPARISON_DATA.map((col) => (
                <td
                  key={col.id}
                  className={`p-5 ${
                    col.featured ? 'bg-accent/5 font-medium text-fg border-x border-accent/40' : ''
                  }`}
                >
                  {col.cinema}
                </td>
              ))}
            </tr>

            {/* Row: Physical Album */}
            <tr>
              <td className="p-5 font-semibold text-fg uppercase tracking-wider text-[11px] bg-bg-sunken/60">
                HEIRLOOM MONOGRAPH
              </td>
              {COMPARISON_DATA.map((col) => (
                <td
                  key={col.id}
                  className={`p-5 ${
                    col.featured ? 'bg-accent/5 font-medium text-fg border-x border-accent/40' : ''
                  }`}
                >
                  {col.album}
                </td>
              ))}
            </tr>

            {/* Row: Preview Set */}
            <tr>
              <td className="p-5 font-semibold text-fg uppercase tracking-wider text-[11px] bg-bg-sunken/60">
                PREVIEW TURNAROUND
              </td>
              {COMPARISON_DATA.map((col) => (
                <td
                  key={col.id}
                  className={`p-5 ${
                    col.featured ? 'bg-accent/5 font-medium text-fg border-x border-accent/40' : ''
                  }`}
                >
                  {col.preview}
                </td>
              ))}
            </tr>

            {/* Row: Delivery Timeline */}
            <tr>
              <td className="p-5 font-semibold text-fg uppercase tracking-wider text-[11px] bg-bg-sunken/60">
                FINAL DELIVERY
              </td>
              {COMPARISON_DATA.map((col) => (
                <td
                  key={col.id}
                  className={`p-5 ${
                    col.featured ? 'bg-accent/5 font-medium text-fg border-x border-accent/40' : ''
                  }`}
                >
                  {col.timeline}
                </td>
              ))}
            </tr>

            {/* Row: RAW Archives */}
            <tr>
              <td className="p-5 font-semibold text-fg uppercase tracking-wider text-[11px] bg-bg-sunken/60">
                MASTER RAW ARCHIVE
              </td>
              {COMPARISON_DATA.map((col) => (
                <td
                  key={col.id}
                  className={`p-5 ${
                    col.featured ? 'bg-accent/5 font-medium text-fg border-x border-accent/40' : ''
                  }`}
                >
                  {col.rawArchive}
                </td>
              ))}
            </tr>

            {/* Row: Ideal For */}
            <tr>
              <td className="p-5 font-semibold text-fg uppercase tracking-wider text-[11px] bg-bg-sunken/60">
                RECOMMENDED FOR
              </td>
              {COMPARISON_DATA.map((col) => (
                <td
                  key={col.id}
                  className={`p-5 text-[12px] leading-relaxed ${
                    col.featured ? 'bg-accent/5 font-medium text-fg border-x border-accent/40' : ''
                  }`}
                >
                  {col.idealFor}
                </td>
              ))}
            </tr>

            {/* Row: Action Link */}
            <tr className="bg-bg-sunken border-t border-rule">
              <td className="p-6 bg-bg-sunken/60 font-semibold text-fg uppercase text-[11px]">
                INQUIRE
              </td>
              {COMPARISON_DATA.map((col) => (
                <td
                  key={col.id}
                  className={`p-6 ${
                    col.featured ? 'bg-accent/10 border-x border-accent/40' : ''
                  }`}
                >
                  <Link
                    href={`/contact?suite=${col.id}`}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-meta-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                      col.featured
                        ? 'bg-accent-text text-fg-inverse hover:bg-fg'
                        : 'border border-rule hover:border-accent text-fg hover:text-accent-text'
                    }`}
                  >
                    <span>SELECT SUITE</span>
                    <ArrowUpRight size={12} />
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. MOBILE STACKED COMPARISON CARDS (< 1024px)                 */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
        {COMPARISON_DATA.map((col) => (
          <div
            key={col.id}
            className={`p-6 sm:p-8 rounded-sm bg-bg-raised border flex flex-col justify-between space-y-6 ${
              col.featured ? 'border-accent shadow-[0_10px_30px_rgba(184,155,114,0.15)]' : 'border-rule'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-meta-sm text-accent-text font-semibold uppercase tracking-widest">
                  {col.badge}
                </span>
                {col.featured && <Sparkles size={16} className="text-accent-text" />}
              </div>

              <h3 className="font-display text-3xl text-fg font-normal">
                {col.name}
              </h3>

              <p className="text-body text-fg-dim text-sm leading-relaxed">
                {col.idealFor}
              </p>

              <div className="space-y-3 pt-4 border-t border-rule text-sm font-sans">
                <div className="flex justify-between py-1 border-b border-rule/50">
                  <span className="text-fg-dim text-xs uppercase">Coverage</span>
                  <span className="text-fg font-medium text-right text-xs">{col.days}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-rule/50">
                  <span className="text-fg-dim text-xs uppercase">Crew Size</span>
                  <span className="text-fg font-medium text-right text-xs">{col.crew}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-rule/50">
                  <span className="text-fg-dim text-xs uppercase">Stills</span>
                  <span className="text-fg font-medium text-right text-xs">{col.stills}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-rule/50">
                  <span className="text-fg-dim text-xs uppercase">4K Film</span>
                  <span className="text-fg font-medium text-right text-xs">{col.cinema}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-rule/50">
                  <span className="text-fg-dim text-xs uppercase">Heirloom Album</span>
                  <span className="text-fg font-medium text-right text-xs">{col.album}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-rule/50">
                  <span className="text-fg-dim text-xs uppercase">Final Timeline</span>
                  <span className="text-fg font-medium text-right text-xs">{col.timeline}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href={`/contact?suite=${col.id}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-fg text-fg-inverse hover:bg-accent-text hover:text-fg-inverse text-meta uppercase font-semibold transition-colors"
              >
                <span>INQUIRE FOR {col.name}</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesComparisonTable;
