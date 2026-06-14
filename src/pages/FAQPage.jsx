import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
  {
    q: 'How does EzTravel fetch weather and map data?',
    a: 'We use open-source weather and geocoding API endpoints to query forecasts, temperature, and coordinates. This data is then loaded dynamically into Leaflet Maps and custom weather widget gauges.'
  },
  {
    q: 'Can I view details about the demographics of a country?',
    a: 'Yes! Simply click on any country name or click the statistics link on the hero floating weather card to bring up the demographic modal. This queries REST Countries dynamically for capital, population, currency, and language data.'
  },
  {
    q: 'How do I add a new city or explore a custom destination?',
    a: 'Use the premium Search Bar in the top hero section. Start typing any city name (e.g. Barcelona, Tokyo, London), select a suggestion, and the entire homepage (weather, map coordinates, guides) will instantly re-configure to display that city.'
  },
  {
    q: 'Is EzTravel free to use for planning trips?',
    a: 'Absolutely! Our dashboard is fully open-source and free for all travelers. We aim to consolidate the most critical APIs into a clean interface so you can plan trips quickly.'
  },
  {
    q: 'Who should I contact for partnerships or inquiries?',
    a: 'Please fill out the form on our Contact Us page (#contact) or send an email directly to partnership@eztravel.com. Our product representatives will get back to you.'
  }
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggleOpen = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="bg-[#F8FAFC] py-16 text-left">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-full">Help Center</span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-800 mt-4 tracking-tight leading-tight">Frequently Asked Questions</h2>
          <p className="text-grayText text-base font-semibold mt-4 leading-relaxed">
            Find immediate answers regarding geocoding, demographics query, guide lists, and platform support.
          </p>
        </div>

        {/* Accordions */}
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleOpen(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 text-sm hover:bg-slate-50/50 transition-colors focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                    <span>{faq.q}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                  )}
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="p-5 pt-0 border-t border-slate-50 text-xs text-grayText font-medium leading-relaxed bg-slate-50/30">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
