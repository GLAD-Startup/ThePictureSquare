'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shell } from '@/components/layout/Shell';
import { SectionHead } from '@/components/ui/SectionHead';
import { ArrowUpRight, Check } from 'lucide-react';
import { scrollReveal } from '@/lib/motion';
import { SERVICES, ServicePanel } from '@/lib/data';

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative w-full py-24 sm:py-32 lg:py-36 space-y-20">
      <Shell>
        <div className="space-y-16">
          {/* SectionHead Recurring Device */}
          <SectionHead title="WHAT WE OFFER" eyebrow="SERVICES &amp; CAPABILITIES" />

          {/* Editorial Service Panels */}
          <div className="space-y-20">
            {SERVICES.map((service) => (
              <ServicePanelItem key={service.id} service={service} />
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
};

interface ServicePanelItemProps {
  service: ServicePanel;
}

const ServicePanelItem: React.FC<ServicePanelItemProps> = ({ service }) => {
  const isLeftImage = service.layout === 'left-image';
  const isFull = service.layout === 'full-width';

  return (
    <div
      id={service.id}
      className="group relative border-t border-rule pt-10 lg:pt-14 space-y-6"
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 font-sans border-b border-rule pb-4">
        <div className="flex items-baseline gap-4">
          <span className="text-meta text-accent-text font-semibold">
            {service.number}
          </span>
          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-fg tracking-wide transition-colors group-hover:text-accent-text">
            {service.title}
          </h3>
        </div>

        <div className="flex items-center gap-6 text-meta text-fg-dim">
          <span className="text-accent-text font-semibold tracking-[0.20em]">
            {service.tags}
          </span>
          <span className="hidden md:inline text-fg-faint" aria-hidden="true">•</span>
          <span className="hidden md:inline font-medium tracking-[0.18em]">
            {service.locationTag}
          </span>
        </div>
      </div>

      {/* Composition with EXPLICIT Grid Column & Order Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Photography Frame with 1px Inset Border & Subtle Ring */}
        <motion.div
          {...scrollReveal}
          className={`relative overflow-hidden rounded-sm bg-bg-sunken border border-rule shadow-[0_10px_30px_rgba(20,20,19,0.04)] ${
            isFull
              ? 'lg:col-span-12 h-[48vh] sm:h-[58vh]'
              : isLeftImage
              ? 'lg:col-span-7 lg:order-1 h-[44vh] sm:h-[52vh]'
              : 'lg:col-span-7 lg:order-2 h-[44vh] sm:h-[52vh]'
          }`}
          data-cursor="OFFERING"
        >
          <Image
            src={service.src}
            alt={service.alt}
            width={service.width}
            height={service.height}
            className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
          />

          {/* 1px Inset Border & Subtle Ring */}
          <div
            className="absolute inset-0 pointer-events-none rounded-sm border border-rule ring-1 ring-inset ring-black/[0.04]"
            aria-hidden="true"
          />
        </motion.div>

        {/* Narrative & Deliverables */}
        {!isFull && (
          <motion.div
            {...scrollReveal}
            className={`space-y-6 bg-bg-sunken p-6 sm:p-8 rounded-sm border border-rule shadow-[0_4px_20px_rgba(20,20,19,0.02)] ${
              isLeftImage
                ? 'lg:col-span-5 lg:order-2'
                : 'lg:col-span-5 lg:order-1'
            }`}
          >
            <p className="font-display text-2xl lg:text-3xl font-normal text-fg leading-snug">
              &ldquo;{service.description}&rdquo;
            </p>

            <div className="space-y-3 pt-2 border-t border-rule">
              <span className="text-meta text-accent-text block font-semibold">
                DELIVERABLES &amp; COMMISSIONS
              </span>
              <ul className="space-y-2 font-sans text-[13px] text-fg-dim">
                {service.deliverables.map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <Check size={14} className="text-accent-text shrink-0" />
                    <span className="tracking-wide font-medium text-fg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-meta text-accent-text hover:text-fg transition-colors rounded-sm focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none font-semibold"
              >
                <span>COMMISSION THIS SERVICE</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ServicesSection;
