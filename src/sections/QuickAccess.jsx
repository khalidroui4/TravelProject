import React from 'react';
import { 
  Landmark, 
  Utensils, 
  Hotel, 
  Globe, 
  Calendar,
  CloudSun, 
  Map, 
  BookOpen 
} from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { name: 'Attractions', icon: Landmark, color: 'text-white', bg: 'bg-primary-dark', link: '#best-places' },
  { name: 'Restaurants', icon: Utensils, color: 'text-white', bg: 'bg-primary-dark', link: '#best-places' },
  { name: 'Hotels', icon: Hotel, color: 'text-white', bg: 'bg-primary-dark', link: '#best-places' },
  { name: 'Culture', icon: Globe, color: 'text-white', bg: 'bg-primary-dark', link: '#guides' },
  { name: 'Events', icon: Calendar, color: 'text-white', bg: 'bg-primary-dark', link: '#why-choose' },
  { name: 'Weather', icon: CloudSun, color: 'text-white', bg: 'bg-primary-dark', link: '#map-weather' },
  { name: 'Maps', icon: Map, color: 'text-white', bg: 'bg-primary-dark', link: '#map-weather' },
  { name: 'Guides', icon: BookOpen, color: 'text-white', bg: 'bg-primary-dark', link: '#guides' },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function QuickAccess() {
  return (
    <section className="py-8 bg-emerald-50/20 border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-4 lg:grid-cols-8 gap-5"
        >
          {CATEGORIES.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.a
                key={index}
                href={cat.link}
                variants={itemVariants}
                className="group flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-100 bg-white hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-premium hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`w-5.5 h-5.5 ${cat.color}`} />
                </div>
                <span className="text-[11px] font-bold text-slate-600 group-hover:text-primary transition-colors">
                  {cat.name}
                </span>
              </motion.a>
            );
          })}
        </motion.div>
 
      </div>
    </section>
  );
}
