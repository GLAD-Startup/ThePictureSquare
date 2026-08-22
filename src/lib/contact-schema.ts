import { z } from 'zod';

export const ContactFormSchema = z.object({
  coupleNames: z
    .string()
    .min(2, 'Please enter both partners’ names (e.g. Ananya & Rohan)'),
  email: z
    .string()
    .email('Please enter a valid email address so we can reply with our brochure'),
  phone: z
    .string()
    .min(6, 'Please enter a phone or WhatsApp number with country code'),
  weddingDates: z
    .string()
    .min(2, 'Please provide your wedding or event dates (e.g. Nov 20–22, 2026)'),
  cityAndVenue: z
    .string()
    .min(2, 'Please specify your destination city and venue/hotel'),
  service: z.enum([
    'weddings',
    'pre-weddings',
    'cinematography',
    'complete-story',
    'photobook',
    'other',
  ]),
  referralSource: z.enum([
    'instagram',
    'planner',
    'friend',
    'google',
    'venue',
    'other',
  ]),
  message: z
    .string()
    .min(10, 'Please tell us a few details about your celebration and vision'),
  botField: z.string().optional(), // Honeypot field
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
