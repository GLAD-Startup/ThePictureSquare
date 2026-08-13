import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GoldMeta } from '../components/ui/GoldAccent';
import { Send, CheckCircle2, MessageCircle, MapPin, Mail } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: 'Weddings',
    location: 'Mathura / Agra',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Valid email address is required';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone / WhatsApp number is required';
    if (!formData.eventDate.trim()) errs.eventDate = 'Event date is required';
    if (!formData.message.trim()) errs.message = 'Please share a few details about your celebration';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate clean frontend submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <div className="pt-28 pb-24 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto space-y-16">
      {/* Editorial Header */}
      <div className="space-y-6 max-w-4xl border-b border-[#141413]/10 pb-12">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#B89B72]" />
          <GoldMeta>COMMISSION & INQUIRIES</GoldMeta>
        </div>

        <h1 className="font-serif-editorial text-display-lg text-[#141413] font-light leading-none">
          LET'S MAKE SOMETHING<br />WORTH REMEMBERING.
        </h1>

        <p className="font-sans text-xs text-[#6C6862] tracking-widest uppercase pt-2 max-w-xl">
          We accept a limited number of wedding commissions each year to maintain the highest level of craftsmanship and personal direction.
        </p>
      </div>

      {/* Main Grid: Form + Studio Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Interactive Form */}
        <div className="lg:col-span-7 bg-[#ECE8DF]/40 p-8 sm:p-12 rounded-sm border border-[#141413]/10">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center space-y-6"
            >
              <CheckCircle2 size={56} className="text-[#B89B72] mx-auto" />
              <div className="space-y-2">
                <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#141413]">
                  INQUIRY RECEIVED
                </h3>
                <p className="font-sans text-xs text-[#6C6862] tracking-wide uppercase max-w-md mx-auto">
                  Thank you, {formData.name}. Our studio team will review your event details and respond within 24 hours.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    eventDate: '',
                    eventType: 'Weddings',
                    location: 'Mathura / Agra',
                    message: '',
                  });
                }}
                className="px-6 py-3 rounded-full border border-[#141413]/25 font-sans text-xs font-semibold tracking-widest uppercase hover:bg-[#141413] hover:text-[#F6F4EE] transition-all"
              >
                SUBMIT ANOTHER INQUIRY
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold tracking-[0.2em] text-[#141413] uppercase block">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ananya Sharma"
                    className={`w-full px-4 py-3 bg-[#F6F4EE] border ${
                      errors.name ? 'border-red-500' : 'border-[#141413]/15'
                    } rounded-sm text-xs focus:outline-none focus:border-[#B89B72]`}
                  />
                  {errors.name && <span className="text-[10px] text-red-500">{errors.name}</span>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold tracking-[0.2em] text-[#141413] uppercase block">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ananya@example.com"
                    className={`w-full px-4 py-3 bg-[#F6F4EE] border ${
                      errors.email ? 'border-red-500' : 'border-[#141413]/15'
                    } rounded-sm text-xs focus:outline-none focus:border-[#B89B72]`}
                  />
                  {errors.email && <span className="text-[10px] text-red-500">{errors.email}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold tracking-[0.2em] text-[#141413] uppercase block">
                    PHONE / WHATSAPP *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`w-full px-4 py-3 bg-[#F6F4EE] border ${
                      errors.phone ? 'border-red-500' : 'border-[#141413]/15'
                    } rounded-sm text-xs focus:outline-none focus:border-[#B89B72]`}
                  />
                  {errors.phone && <span className="text-[10px] text-red-500">{errors.phone}</span>}
                </div>

                {/* Event Date */}
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold tracking-[0.2em] text-[#141413] uppercase block">
                    EVENT DATE(S) *
                  </label>
                  <input
                    type="text"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    placeholder="e.g. Dec 14-16, 2026"
                    className={`w-full px-4 py-3 bg-[#F6F4EE] border ${
                      errors.eventDate ? 'border-red-500' : 'border-[#141413]/15'
                    } rounded-sm text-xs focus:outline-none focus:border-[#B89B72]`}
                  />
                  {errors.eventDate && <span className="text-[10px] text-red-500">{errors.eventDate}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Event Type */}
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold tracking-[0.2em] text-[#141413] uppercase block">
                    SERVICE INTEREST
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F6F4EE] border border-[#141413]/15 rounded-sm text-xs focus:outline-none focus:border-[#B89B72]"
                  >
                    <option value="Weddings">Wedding Photography</option>
                    <option value="Pre-Weddings">Pre-Wedding Story</option>
                    <option value="Cinematography">Wedding Cinematography</option>
                    <option value="Full Story">The Complete Story (Stills & Film)</option>
                  </select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold tracking-[0.2em] text-[#141413] uppercase block">
                    DESTINATION / VENUE
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Jaipur / Agra / Mathura"
                    className="w-full px-4 py-3 bg-[#F6F4EE] border border-[#141413]/15 rounded-sm text-xs focus:outline-none focus:border-[#B89B72]"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-[10px] font-semibold tracking-[0.2em] text-[#141413] uppercase block">
                  CELEBRATION DETAILS & VISION *
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your wedding vision, venue, and expectations..."
                  className={`w-full px-4 py-3 bg-[#F6F4EE] border ${
                    errors.message ? 'border-red-500' : 'border-[#141413]/15'
                  } rounded-sm text-xs focus:outline-none focus:border-[#B89B72]`}
                />
                {errors.message && <span className="text-[10px] text-red-500">{errors.message}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#141413] text-[#F6F4EE] hover:bg-[#B89B72] hover:text-[#141413] font-sans text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-400 rounded-sm flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <span>SENDING INQUIRY...</span>
                ) : (
                  <>
                    <span>SEND ENQUIRY →</span>
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Studio Contact & WhatsApp Direct */}
        <div className="lg:col-span-5 space-y-8 lg:pl-4 font-sans">
          <div className="space-y-4">
            <span className="text-meta text-[#B89B72]">DIRECT CONTACT</span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[#141413] font-light">
              STUDIO DESK
            </h2>
            <p className="text-xs text-[#6C6862] leading-relaxed">
              For urgent booking inquiries or immediate availability checks, reach out directly via WhatsApp or email.
            </p>
          </div>

          {/* Quick Direct Actions */}
          <div className="space-y-4">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-5 rounded-sm border border-[#141413]/15 hover:border-[#B89B72] hover:bg-[#141413] hover:text-[#F6F4EE] transition-all group"
            >
              <div className="flex items-center gap-3">
                <MessageCircle size={20} className="text-[#B89B72]" />
                <span className="text-xs font-semibold tracking-wider uppercase">WHATSAPP DIRECT</span>
              </div>
              <span className="text-xs text-[#6C6862] group-hover:text-[#B89B72]">+91 98765 43210</span>
            </a>

            <div className="p-5 rounded-sm bg-[#ECE8DF]/40 border border-[#141413]/10 space-y-3 text-xs">
              <div className="flex items-center gap-3 text-[#141413]">
                <MapPin size={16} className="text-[#B89B72]" />
                <span className="font-semibold tracking-wider uppercase">MATHURA STUDIO</span>
              </div>
              <p className="text-[#6C6862] tracking-wide">
                Junction Road, Mathura, Uttar Pradesh, India
              </p>
            </div>

            <div className="p-5 rounded-sm bg-[#ECE8DF]/40 border border-[#141413]/10 space-y-3 text-xs">
              <div className="flex items-center gap-3 text-[#141413]">
                <Mail size={16} className="text-[#B89B72]" />
                <span className="font-semibold tracking-wider uppercase">EMAIL INQUIRIES</span>
              </div>
              <p className="text-[#6C6862] tracking-wide">
                inquiries@thepicturesquare.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
