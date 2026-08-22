'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormSchema, ContactFormData } from '@/lib/contact-schema';
import { SITE_CONFIG } from '@/lib/site-config';
import { trackConversion } from '@/lib/analytics';
import { CheckCircle2, AlertCircle, Send, Mail, MessageSquare } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const searchParams = useSearchParams();
  const initialSuite = searchParams.get('suite') || searchParams.get('service') || 'weddings';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      coupleNames: '',
      email: '',
      phone: '',
      weddingDates: '',
      cityAndVenue: '',
      service: (['weddings', 'pre-weddings', 'cinematography', 'complete-story', 'photobook', 'other'].includes(initialSuite)
        ? initialSuite
        : 'weddings') as ContactFormData['service'],
      referralSource: 'instagram',
      message: '',
      botField: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setSubmitSuccess(result.coupleNames || data.coupleNames);
        trackConversion('enquiry_submit', {
          couple: data.coupleNames,
          interest: data.service,
          city: data.cityAndVenue,
        });
        reset();
      } else {
        setSubmitError(
          result.message || 'We could not submit your inquiry due to a network issue. Please reach out directly.'
        );
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setSubmitError(
        'A connection issue occurred while transmitting your inquiry. Please reach out to our studio desk directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="p-8 sm:p-12 rounded-sm bg-bg-raised border border-accent space-y-6 text-center shadow-[0_10px_30px_rgba(184,155,114,0.1)]">
        <div className="w-16 h-16 rounded-full bg-accent/10 text-accent-text flex items-center justify-center mx-auto border border-accent/40">
          <CheckCircle2 size={32} />
        </div>

        <div className="space-y-3">
          <span className="text-meta text-accent-text uppercase tracking-widest font-semibold block">
            INQUIRY RECEIVED
          </span>
          <h3 className="font-display text-3xl sm:text-4xl text-fg font-normal">
            Thank you, {submitSuccess}.
          </h3>
          <p className="text-body text-fg-dim text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            We have received your celebration details. Our studio team reviews every wedding itinerary individually to ensure our dates and visual direction align with your vision.
          </p>
        </div>

        <div className="p-4 rounded-sm bg-bg-sunken border border-rule max-w-md mx-auto font-sans text-xs text-accent-text uppercase tracking-wider">
          EXPECTED RESPONSE TIMELINE: WITHIN 24–48 HOURS
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={() => setSubmitSuccess(null)}
            className="px-6 py-2.5 rounded-full border border-rule hover:border-accent text-fg-dim hover:text-fg text-meta-sm uppercase transition-colors"
          >
            SUBMIT ANOTHER INQUIRY
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-8 bg-bg-raised border border-rule p-8 sm:p-12 rounded-sm shadow-[0_10px_30px_rgba(20,20,19,0.06)]"
    >
      {/* Honeypot field (hidden from real users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="botField">Leave this field blank</label>
        <input
          id="botField"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('botField')}
        />
      </div>

      {/* Failure State Alert */}
      {submitError && (
        <div className="p-5 rounded-sm bg-red-50 border border-red-200 text-fg space-y-3">
          <div className="flex items-center gap-2 text-red-600 font-semibold text-meta">
            <AlertCircle size={18} />
            <span>TRANSMISSION NOTICE</span>
          </div>
          <p className="text-body text-sm text-fg-dim">{submitError}</p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-sans">
            <a
              href={`mailto:${SITE_CONFIG.contact.email}`}
              className="inline-flex items-center gap-1.5 text-accent-text hover:underline font-semibold"
            >
              <Mail size={13} />
              <span>EMAIL DIRECT: {SITE_CONFIG.contact.email}</span>
            </a>
            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-accent-text hover:underline font-semibold"
            >
              <MessageSquare size={13} />
              <span>INSTAGRAM DM</span>
            </a>
          </div>
        </div>
      )}

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 font-sans">
        {/* Field 1: Couple Names */}
        <div className="space-y-2 md:col-span-2">
          <label
            htmlFor="coupleNames"
            className="text-meta-sm text-fg font-semibold uppercase tracking-wider block"
          >
            PARTNERS&apos; NAMES <span className="text-accent-text">*</span>
          </label>
          <input
            id="coupleNames"
            type="text"
            placeholder="e.g. Ananya Sharma & Rohan Verma"
            aria-invalid={errors.coupleNames ? 'true' : 'false'}
            aria-describedby={errors.coupleNames ? 'coupleNames-error' : undefined}
            className={`w-full px-4 py-3.5 bg-bg-sunken border rounded-sm text-fg placeholder:text-fg-faint text-sm outline-none transition-colors duration-200 ${
              errors.coupleNames
                ? 'border-red-600 focus:border-red-500'
                : 'border-rule focus:border-accent-text'
            }`}
            {...register('coupleNames')}
          />
          {errors.coupleNames && (
            <p id="coupleNames-error" className="text-xs text-red-500 font-medium">
              {errors.coupleNames.message}
            </p>
          )}
        </div>

        {/* Field 2: Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-meta-sm text-fg font-semibold uppercase tracking-wider block"
          >
            EMAIL ADDRESS <span className="text-accent-text">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="e.g. ananya@gmail.com"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`w-full px-4 py-3.5 bg-bg-sunken border rounded-sm text-fg placeholder:text-fg-faint text-sm outline-none transition-colors duration-200 ${
              errors.email
                ? 'border-red-600 focus:border-red-500'
                : 'border-rule focus:border-accent-text'
            }`}
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-red-500 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Field 3: Phone / WhatsApp */}
        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="text-meta-sm text-fg font-semibold uppercase tracking-wider block"
          >
            PHONE / WHATSAPP <span className="text-accent-text">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="e.g. +91 99581 26122"
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={`w-full px-4 py-3.5 bg-bg-sunken border rounded-sm text-fg placeholder:text-fg-faint text-sm outline-none transition-colors duration-200 ${
              errors.phone
                ? 'border-red-600 focus:border-red-500'
                : 'border-rule focus:border-accent-text'
            }`}
            {...register('phone')}
          />
          {errors.phone && (
            <p id="phone-error" className="text-xs text-red-500 font-medium">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Field 4: Wedding Dates */}
        <div className="space-y-2">
          <label
            htmlFor="weddingDates"
            className="text-meta-sm text-fg font-semibold uppercase tracking-wider block"
          >
            EVENT / WEDDING DATES <span className="text-accent-text">*</span>
          </label>
          <input
            id="weddingDates"
            type="text"
            placeholder="e.g. November 18–20, 2026"
            aria-invalid={errors.weddingDates ? 'true' : 'false'}
            aria-describedby={errors.weddingDates ? 'weddingDates-error' : undefined}
            className={`w-full px-4 py-3.5 bg-bg-sunken border rounded-sm text-fg placeholder:text-fg-faint text-sm outline-none transition-colors duration-200 ${
              errors.weddingDates
                ? 'border-red-600 focus:border-red-500'
                : 'border-rule focus:border-accent-text'
            }`}
            {...register('weddingDates')}
          />
          {errors.weddingDates && (
            <p id="weddingDates-error" className="text-xs text-red-500 font-medium">
              {errors.weddingDates.message}
            </p>
          )}
        </div>

        {/* Field 5: City & Venue */}
        <div className="space-y-2">
          <label
            htmlFor="cityAndVenue"
            className="text-meta-sm text-fg font-semibold uppercase tracking-wider block"
          >
            DESTINATION CITY &amp; VENUE <span className="text-accent-text">*</span>
          </label>
          <input
            id="cityAndVenue"
            type="text"
            placeholder="e.g. Jaipur — Rambagh Palace"
            aria-invalid={errors.cityAndVenue ? 'true' : 'false'}
            aria-describedby={errors.cityAndVenue ? 'cityAndVenue-error' : undefined}
            className={`w-full px-4 py-3.5 bg-bg-sunken border rounded-sm text-fg placeholder:text-fg-faint text-sm outline-none transition-colors duration-200 ${
              errors.cityAndVenue
                ? 'border-red-600 focus:border-red-500'
                : 'border-rule focus:border-accent-text'
            }`}
            {...register('cityAndVenue')}
          />
          {errors.cityAndVenue && (
            <p id="cityAndVenue-error" className="text-xs text-red-500 font-medium">
              {errors.cityAndVenue.message}
            </p>
          )}
        </div>

        {/* Field 6: Service Interest */}
        <div className="space-y-2">
          <label
            htmlFor="service"
            className="text-meta-sm text-fg font-semibold uppercase tracking-wider block"
          >
            COMMISSION SUITE OF INTEREST <span className="text-accent-text">*</span>
          </label>
          <select
            id="service"
            className="w-full px-4 py-3.5 bg-bg-sunken border border-rule focus:border-accent-text rounded-sm text-fg text-sm outline-none transition-colors duration-200"
            {...register('service')}
          >
            <option value="weddings">Weddings (Fine-Art Stills Suite)</option>
            <option value="cinematography">Cinematography (4K Motion Pictures)</option>
            <option value="complete-story">The Complete Story (Combined Suite)</option>
            <option value="pre-weddings">Pre-Wedding Editorial Lookbook</option>
            <option value="photobook">Heirloom Monograph Album Commission</option>
            <option value="other">Bespoke / Multi-City Commission</option>
          </select>
        </div>

        {/* Field 7: Referral Source */}
        <div className="space-y-2">
          <label
            htmlFor="referralSource"
            className="text-meta-sm text-fg font-semibold uppercase tracking-wider block"
          >
            HOW DID YOU DISCOVER US?
          </label>
          <select
            id="referralSource"
            className="w-full px-4 py-3.5 bg-bg-sunken border border-rule focus:border-accent-text rounded-sm text-fg text-sm outline-none transition-colors duration-200"
            {...register('referralSource')}
          >
            <option value="instagram">Instagram (@thepicturesquarephotography)</option>
            <option value="planner">Wedding Planner / Event Designer</option>
            <option value="friend">Friend / Family Recommendation</option>
            <option value="venue">Venue / Hotel Concierge</option>
            <option value="google">Editorial / Google Search</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Field 8: Message / Story */}
        <div className="space-y-2 md:col-span-2">
          <label
            htmlFor="message"
            className="text-meta-sm text-fg font-semibold uppercase tracking-wider block"
          >
            TELL US ABOUT YOUR CELEBRATION &amp; HOW YOU MET <span className="text-accent-text">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Share your wedding vision, guest count, flow of events, aesthetic priorities, and anything special about how you two found each other..."
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`w-full px-4 py-3.5 bg-bg-sunken border rounded-sm text-fg placeholder:text-fg-faint text-sm outline-none transition-colors duration-200 resize-y ${
              errors.message
                ? 'border-red-600 focus:border-red-500'
                : 'border-rule focus:border-accent-text'
            }`}
            {...register('message')}
          />
          {errors.message && (
            <p id="message-error" className="text-xs text-red-500 font-medium">
              {errors.message.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4 border-t border-rule flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-sans text-fg-dim text-center sm:text-left">
          We strictly maintain privacy. Your information is never shared.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-accent-text text-fg-inverse hover:bg-fg text-meta font-semibold uppercase tracking-[0.22em] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-text focus:outline-none shadow-md"
          data-cursor="SUBMIT"
        >
          <span>{isSubmitting ? 'TRANSMITTING INQUIRY...' : 'TRANSMIT INQUIRY →'}</span>
          <Send size={15} />
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
