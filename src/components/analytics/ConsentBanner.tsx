'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { GA_TRACKING_ID } from '@/lib/analytics';
import { motion, AnimatePresence } from 'framer-motion';

export const ConsentBanner: React.FC = () => {
  const [consentState, setConsentState] = useState<'granted' | 'denied' | 'pending'>('pending');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedConsent = localStorage.getItem('tps_analytics_consent');
    if (savedConsent === 'granted' || savedConsent === 'denied') {
      setConsentState(savedConsent);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('tps_analytics_consent', 'granted');
    setConsentState('granted');
  };

  const handleDecline = () => {
    localStorage.setItem('tps_analytics_consent', 'denied');
    setConsentState('denied');
  };

  if (!isMounted) return null;

  return (
    <>
      {/* 1. Load GA4 script strictly only when consent is granted */}
      {consentState === 'granted' && GA_TRACKING_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
                anonymize_ip: true
              });
            `}
          </Script>
        </>
      )}

      {/* 2. Minimalist Non-Intrusive Editorial Consent Bar */}
      <AnimatePresence>
        {consentState === 'pending' && (
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-5 rounded-sm bg-bg-raised border border-rule-strong shadow-xl space-y-4"
            aria-label="Privacy and Analytics Consent"
            role="region"
          >
            <div className="space-y-1.5">
              <span className="text-meta text-accent-text uppercase tracking-widest text-[11px]">
                PRIVACY &amp; EXPERIENCE
              </span>
              <p className="text-fg text-xs leading-relaxed">
                We use privacy-preserving analytics to understand how couples browse our wedding monographs and refine our visual craft.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={handleAccept}
                className="px-4 py-2 rounded-full bg-fg text-fg-inverse hover:bg-accent-text hover:text-fg-inverse text-meta-sm font-semibold uppercase tracking-widest transition-all focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none cursor-pointer"
              >
                ACCEPT
              </button>
              <button
                onClick={handleDecline}
                className="px-4 py-2 rounded-full border border-rule hover:border-fg text-fg-dim hover:text-fg text-meta-sm uppercase tracking-widest transition-all focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none cursor-pointer"
              >
                DECLINE
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default ConsentBanner;
