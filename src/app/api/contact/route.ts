import { NextRequest, NextResponse } from 'next/server';
import { ContactFormSchema } from '@/lib/contact-schema';
import { Resend } from 'resend';

// Simple in-memory rate limiting map: IP -> timestamp array
const ipRateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRateLimitMap.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  ipRateLimitMap.set(ip, validTimestamps);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';

    // 1. IP Rate Limiting
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many inquiries sent from this IP. Please wait a few minutes or message us directly via WhatsApp.',
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 2. Honeypot check for bots
    if (body.botField && body.botField.trim().length > 0) {
      // Silently accept without processing
      return NextResponse.json({ success: true, coupleNames: body.coupleNames || 'Guest' });
    }

    // 3. Zod Server Validation
    const parseResult = ContactFormSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: parseResult.error.flatten().fieldErrors,
          message: 'Please verify the highlighted form fields.',
        },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // 4. Send via Resend (if API key available)
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      // Email to Studio Desk
      await resend.emails.send({
        from: 'The Picture Square Inquiries <inquiries@thepicturesquare.com>',
        to: ['inquiries@thepicturesquare.com'],
        replyTo: data.email,
        subject: `[New Commission Inquiry] ${data.coupleNames} — ${data.cityAndVenue} (${data.weddingDates})`,
        text: `
NEW WEDDING COMMISSION INQUIRY

Couple: ${data.coupleNames}
Email: ${data.email}
Phone / WhatsApp: ${data.phone}
Dates: ${data.weddingDates}
Destination / Venue: ${data.cityAndVenue}
Service Suite: ${data.service}
Referral Source: ${data.referralSource}

Message / Story:
${data.message}
        `,
      });

      // Autoresponder to Couple
      await resend.emails.send({
        from: 'The Picture Square Studio <inquiries@thepicturesquare.com>',
        to: [data.email],
        subject: `We have received your wedding inquiry — The Picture Square`,
        text: `
Dear ${data.coupleNames},

Thank you for reaching out to The Picture Square.

We have received your details for your celebration in ${data.cityAndVenue} (${data.weddingDates}). Our studio team reviews every wedding itinerary individually to ensure our dates and visual direction align with your vision.

You can expect our personalized response and bespoke commission proposal within 24 to 48 hours.

Warm regards,
Deepanshu & The Studio Team
The Picture Square · Mathura, Uttar Pradesh
www.thepicturesquare.com
        `,
      });
    } else {
      // In development or when RESEND_API_KEY is not yet provisioned, log structured lead
      console.log('📬 [LEAD RECEIVED - RESEND_API_KEY NOT CONFIGURED]');
      console.log('Couple:', data.coupleNames);
      console.log('Email:', data.email);
      console.log('Phone:', data.phone);
      console.log('Dates:', data.weddingDates);
      console.log('Venue:', data.cityAndVenue);
      console.log('Suite:', data.service);
      console.log('Message:', data.message);
    }

    return NextResponse.json({
      success: true,
      coupleNames: data.coupleNames,
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'A temporary network error occurred. Please contact us directly via email or WhatsApp.',
      },
      { status: 500 }
    );
  }
}
