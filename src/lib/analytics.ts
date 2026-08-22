'use client';

/**
 * Privacy-compliant analytics dispatcher.
 * Only sends events if the user has given consent via ConsentBanner.
 */

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export function isAnalyticsAllowed(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('tps_analytics_consent') === 'granted';
}

export function trackEvent(action: string, params: Record<string, any> = {}) {
  if (!isAnalyticsAllowed()) return;

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, params);
  }

  // Also log in dev for testing
  if (process.env.NODE_ENV !== 'production') {
    console.log(`📊 [ANALYTICS EVENT] ${action}:`, params);
  }
}

export function trackConversion(type: 'enquiry_submit' | 'whatsapp_click', data: Record<string, any> = {}) {
  trackEvent(`conversion_${type}`, {
    event_category: 'Conversions',
    event_label: type === 'enquiry_submit' ? `Inquiry: ${data.interest || 'General'}` : 'Direct WhatsApp Inquiry',
    value: type === 'enquiry_submit' ? 100 : 50,
    ...data,
  });
}
