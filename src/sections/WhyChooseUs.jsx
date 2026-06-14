import React from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, 
  CloudSun, 
  MapPin, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';

const FEATURES = [
  {
    title: 'All-In-One Info',
    desc: 'Everything about a city in one place.',
    icon: Compass,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    title: 'Live Weather',
    desc: 'Real-time weather and forecasts.',
    icon: CloudSun,
    color: 'text-sky-500',
    bg: 'bg-sky-50'
  },
  {
    title: 'Curated Places',
    desc: 'Top attractions, restaurants and hotels.',
    icon: MapPin,
    color: 'text-rose-500',
    bg: 'bg-rose-50'
  },
  {
    title: 'Trusted Guides',
    desc: 'Local insights and travel expert tips.',
    icon: ShieldCheck,
    color: 'text-indigo-500',
    bg: 'bg-indigo-50'
  },
  {
    title: 'Easy to Use',
    desc: 'Plan your trip fast and effortlessly.',
    icon: Zap,
    color: 'text-amber-500',
    bg: 'bg-amber-50'
  }
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose" className="py-12 bg-[#F8FAFC] border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-800 font-sans tracking-tight">Why Travel With EzTravel?</h3>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="flex flex-col items-center text-center p-4 hover:bg-white hover:shadow-premium hover:-translate-y-1 rounded-2xl transition-all duration-300 border border-transparent hover:border-slate-100 group"
              >
                {/* Icon above text */}
                <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`w-5.5 h-5.5 ${item.color}`} />
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-1.5 font-sans leading-none">{item.title}</h4>
                <p className="text-[11px] text-grayText font-semibold leading-relaxed max-w-[150px]">
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
