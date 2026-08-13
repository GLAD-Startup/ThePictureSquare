import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MapPin } from 'lucide-react';
import { GoldMeta } from '../ui/GoldAccent';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[250] bg-[#141413]/95 backdrop-blur-xl text-[#F6F4EE] flex flex-col justify-between px-6 py-8 md:px-16 md:py-12 overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-serif-editorial text-2xl tracking-[0.14em] text-[#F6F4EE]">
                THE PICTURE SQUARE
              </span>
              <span className="text-meta text-[#B89B72] mt-0.5">MATHURA · INQUIRIES</span>
            </div>

            <button
              onClick={onClose}
              className="p-3 text-[#F6F4EE] hover:text-[#B89B72] transition-colors rounded-full border border-white/10 hover:border-[#B89B72]"
              aria-label="Close form"
              data-cursor="CLOSE"
            >
              <X size={20} />
            </button>
          </div>

          {/* Main Content */}
          <div className="max-w-3xl mx-auto w-full my-auto py-12 space-y-12">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-16"
              >
                <GoldMeta>STUDIO CONFIRMATION</GoldMeta>
                <h2 className="font-serif-editorial text-4xl sm:text-5xl text-[#F6F4EE]">
                  THANK YOU FOR YOUR INQUIRY
                </h2>
                <p className="font-sans text-xs text-[#D5CFC3] tracking-widest uppercase max-w-md mx-auto">
                  OUR STUDIO TEAM WILL BE IN TOUCH WITHIN 24 HOURS TO DISCUSS DATES AND DREAMS.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-4">
                  <GoldMeta>START YOUR STORY</GoldMeta>
                  <h2 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F6F4EE] font-light">
                    BEGIN THE CONVERSATION.
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
                  <div className="space-y-2 border-b border-white/15 pb-2">
                    <label className="text-meta text-[#B89B72] text-[10px]">COUPLE NAMES *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya & Rohan"
                      className="w-full bg-transparent text-[#F6F4EE] text-sm focus:outline-none placeholder:text-white/30"
                    />
                  </div>

                  <div className="space-y-2 border-b border-white/15 pb-2">
                    <label className="text-meta text-[#B89B72] text-[10px]">EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      className="w-full bg-transparent text-[#F6F4EE] text-sm focus:outline-none placeholder:text-white/30"
                    />
                  </div>

                  <div className="space-y-2 border-b border-white/15 pb-2">
                    <label className="text-meta text-[#B89B72] text-[10px]">PHONE & WHATSAPP *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full bg-transparent text-[#F6F4EE] text-sm focus:outline-none placeholder:text-white/30"
                    />
                  </div>

                  <div className="space-y-2 border-b border-white/15 pb-2">
                    <label className="text-meta text-[#B89B72] text-[10px]">EVENT LOCATION & CITY *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mathura, Jaipur, Agra, Goa"
                      className="w-full bg-transparent text-[#F6F4EE] text-sm focus:outline-none placeholder:text-white/30"
                    />
                  </div>
                </div>

                <div className="space-y-2 border-b border-white/15 pb-2 font-sans">
                  <label className="text-meta text-[#B89B72] text-[10px]">YOUR VISION & DATES</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your dates, functions, or specific visual requirements..."
                    className="w-full bg-transparent text-[#F6F4EE] text-sm focus:outline-none placeholder:text-white/30 resize-none"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="group relative inline-flex items-center gap-4 px-10 py-4 bg-[#B89B72] text-[#141413] font-sans text-xs font-semibold tracking-[0.25em] uppercase rounded-full hover:bg-[#F6F4EE] transition-all duration-400"
                    data-cursor="SEND"
                  >
                    <span>SEND INQUIRY</span>
                    <Send size={15} />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Footer Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans text-[#9B968E]">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[#B89B72]" />
              <span>MATHURA, UTTAR PRADESH · WORLDWIDE DESK</span>
            </div>
            <span>@THEPICTURESQUAREPHOTOGRAPHY</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
