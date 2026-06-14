import React from 'react';
import { motion } from 'framer-motion';
import { Compass, ShieldCheck, Heart, Globe, Award } from 'lucide-react';

const VALUES = [
  {
    title: 'Passion for Discovery',
    desc: 'We are dedicated to helping travelers discover the soul of every destination.',
    icon: Compass
  },
  {
    title: 'Safety & Trust',
    desc: 'We verify our insights and guides to ensure your journey is safe and worry-free.',
    icon: ShieldCheck
  },
  {
    title: 'Customer Heartbeat',
    desc: 'We put the traveler experience at the core of everything we build.',
    icon: Heart
  },
  {
    title: 'Global Community',
    desc: 'Connecting cultures and facilitating sustainable global tourism.',
    icon: Globe
  }
];

const TEAM = [
  { name: 'Sarah Jenkins', role: 'CEO & Founder', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80' },
  { name: 'Marcus Chen', role: 'Chief Travel Officer', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80' },
  { name: 'Elena Rostova', role: 'Lead UI/UX Designer', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80' }
];

export default function AboutPage() {
  return (
    <div className="bg-[#F8FAFC] py-16 text-left">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Intro Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-full"
          >
            Our Story
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl lg:text-5xl font-extrabold text-slate-800 mt-4 tracking-tight leading-tight"
          >
            Redefining Travel Exploration
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-grayText text-base font-semibold mt-4 leading-relaxed"
          >
            EzTravel was born out of a simple idea: that finding live weather, top hotels, local food secrets, and map layouts should be effortless. We bring all aspects of travel planning into one visual dashboard.
          </motion.p>
        </div>

        {/* Vision Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-800 font-sans tracking-tight">Our Mission</h3>
            <p className="text-sm text-grayText leading-relaxed font-medium">
              We strive to inspire travelers to dive deeper into the destinations they explore. Travel isn't just about checkboxes; it is about local culture, authentic culinary wonders, and seamless adventures.
            </p>
            <p className="text-sm text-grayText leading-relaxed font-medium">
              With our real-time interactive mapping and weather dashboards combined with REST-API demographic statistics, we offer the most detailed travel data tool online today.
            </p>
            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary-dark text-white flex items-center justify-center shrink-0 shadow-sm">
                <Award className="w-5.5 h-5.5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm leading-none mb-1">Award-Winning Platform</h4>
                <p className="text-[11px] text-grayText font-semibold">Recognized as the most innovative travel dashboard of the year.</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-premium h-96 relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80" 
              alt="Travel Planning" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">Core Values We Stand For</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="flex flex-col items-start p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-dark text-white flex items-center justify-center mb-4 shadow-sm border-none group-hover:scale-105 transition-transform duration-200">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1.5 font-sans leading-none">{item.title}</h4>
                  <p className="text-[11px] text-grayText font-semibold leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">Meet the Explorers Behind EzTravel</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {TEAM.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border border-slate-100 shadow-sm mb-4 group-hover:scale-105 transition-transform duration-200">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm leading-none">{item.name}</h4>
                <span className="text-[10px] text-primary font-bold tracking-wider uppercase mt-1.5 block">{item.role}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
