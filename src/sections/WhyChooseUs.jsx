import React from 'react';
import { motion } from 'framer-motion';

const FEATURES = [
  {
    title: 'All-In-One Info',
    desc: 'Everything about a city in one place, including top restaurants, hotels, culture highlights, and geolocations.',
    illustration: (
      <svg className="w-16 h-16 text-primary group-hover:rotate-45 transition-transform duration-700" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" className="opacity-45" />
        <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="2.5" />
        <path d="M32 16 L36 32 L32 48 L28 32 Z" fill="#F59E0B" />
        <path d="M32 16 L36 32 L32 32 Z" fill="#D97706" />
        <circle cx="32" cy="32" r="3" fill="#0F172A" />
        <path d="M32 6 L32 12" stroke="currentColor" strokeWidth="2" />
        <path d="M6 32 L12 32" stroke="currentColor" strokeWidth="2" />
        <path d="M32 52 L32 58" stroke="currentColor" strokeWidth="2" />
        <path d="M52 32 L58 32" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  },
  {
    title: 'Live Weather',
    desc: 'Real-time weather parameters, current status codes, and 7-day temperature feeds from reliable satellites.',
    illustration: (
      <svg className="w-16 h-16 text-primary" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="22" r="12" fill="#F59E0B" className="animate-pulse-slow" />
        <path d="M18 42 C18 34.5 24 30.5 30 30.5 C36 30.5 41 33.5 42 38.5 C46.5 38.5 50 41.5 50 46 C50 50.5 46.5 53.5 42 53.5 L24 53.5 C20 53.5 18 50 18 46 C18 43.5 19.5 42.5 18 42 Z" fill="#0F172A" fillOpacity="0.1" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M26 44 L24 49" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" className="animate-bounce" />
        <path d="M34 44 L32 49" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" className="animate-bounce [animation-delay:0.2s]" />
        <path d="M42 44 L40 49" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" className="animate-bounce [animation-delay:0.4s]" />
      </svg>
    )
  },
  {
    title: 'Curated Places',
    desc: 'Locate local favorites, landmarks, authentic bakeries, and comfortable hotels curated by travel Experts.',
    illustration: (
      <svg className="w-16 h-16 text-primary group-hover:scale-105 transition-transform duration-300" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="12" width="40" height="40" rx="10" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="32" cy="32" r="14" fill="#16A34A" fillOpacity="0.08" stroke="currentColor" strokeWidth="2" />
        <path d="M32 24 A 8 8 0 0 0 32 40 A 8 8 0 0 0 32 24 Z" fill="none" />
        <circle cx="32" cy="32" r="4.5" fill="#F59E0B" />
        <path d="M32 12 L32 18 M32 46 L32 52 M12 32 L18 32 M46 32 L52 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: 'Trusted Guides',
    desc: 'Dive into safety guidelines, emergency contacts, local currencies, and detailed guidebooks.',
    illustration: (
      <svg className="w-16 h-16 text-primary" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 10 L50 17 C50 32, 42 46, 32 52 C22 46, 14 32, 14 17 L32 10 Z" fill="#16A34A" fillOpacity="0.08" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M25 31 L30 36 L39 25" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: 'Easy to Use',
    desc: 'Seamless navigation designed to help you search, bookmark, and share destinations with friends.',
    illustration: (
      <svg className="w-16 h-16 text-primary" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 48 C 20 24, 44 20, 52 28" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 4" strokeLinecap="round" />
        <circle cx="12" cy="48" r="5" fill="#0F172A" stroke="currentColor" strokeWidth="2" />
        <path d="M26 28 L34 36 M34 28 L26 36" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
        <path d="M52 28 L46 22 M52 28 L46 34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose" className="py-20 bg-[#F8FAFC] border-b border-[#E5E7EB] relative overflow-hidden">
      
      {/* Dynamic background detail */}
      <div className="absolute top-10 right-10 opacity-[0.03] pointer-events-none select-none">
        <svg className="w-80 h-80 text-slate-800" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <path d="M10 20 C30 10, 70 40, 90 20 C100 30, 80 70, 90 90" strokeWidth="0.5" />
          <path d="M5 25 C25 15, 65 45, 85 25" strokeWidth="0.5" strokeDasharray="1 1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header - Premium Centered */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold text-primary uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-500/10">
            Our Benefits
          </span>
          <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-4 font-sans tracking-tight">
            Why Travel With EzTravel?
          </h3>
          <p className="text-sm text-grayText mt-2 font-medium max-w-xl mx-auto">
            We merge live weather forecasts, geographic details, and local safety tips into one premium explorer toolkit.
          </p>
        </div>

        {/* 5-Column Grid with Glass/Soft Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {FEATURES.map((item, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white/80 backdrop-blur-md border border-slate-100/80 rounded-3xl p-6 shadow-premium hover:shadow-premium-hover transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-center text-center group"
              >
                {/* Custom Illustration */}
                <div className="w-16 h-16 flex items-center justify-center mb-6 text-primary group-hover:scale-108 transition-transform duration-300">
                  {item.illustration}
                </div>
                
                <h4 className="font-bold text-slate-800 text-sm mb-2.5">
                  {item.title}
                </h4>
                
                <p className="text-slate-550 text-[11px] leading-relaxed font-semibold">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
