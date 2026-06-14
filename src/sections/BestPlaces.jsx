import React from 'react';
import { Star, Utensils, Hotel, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import ImageWithLoader from '../components/ImageWithLoader';

const RESTAURANTS = [
  {
    name: 'Trattoria De Enzo',
    desc: 'Rome, Italy',
    tag: 'Italian',
    price: '$$',
    rating: 4.8,
    trend: '+4.8%',
    trendColor: 'text-emerald-600 bg-emerald-50 border border-emerald-100',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=120&q=80'
  },
  {
    name: 'Sushi Saito',
    desc: 'Tokyo, Japan',
    tag: 'Japanese',
    price: '$$$',
    rating: 4.9,
    trend: '+5.0%',
    trendColor: 'text-emerald-600 bg-emerald-50 border border-emerald-100',
    img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=120&q=80'
  },
  {
    name: 'Le Petit Paris',
    desc: 'Paris, France',
    tag: 'French',
    price: '$$$',
    rating: 4.7,
    trend: '+3.1%',
    trendColor: 'text-amber-600 bg-amber-50 border border-amber-100',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=120&q=80'
  }
];

const HOTELS = [
  {
    name: 'Hotel de Russie',
    desc: 'Rome, Italy',
    tag: 'Luxury',
    price: '$$$$',
    rating: 4.8,
    trend: '+4.5%',
    trendColor: 'text-emerald-600 bg-emerald-50 border border-emerald-100',
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=120&q=80'
  },
  {
    name: 'Park Hyatt Tokyo',
    desc: 'Tokyo, Japan',
    tag: 'Luxury',
    price: '$$$$',
    rating: 4.9,
    trend: '+5.2%',
    trendColor: 'text-emerald-600 bg-emerald-50 border border-emerald-100',
    img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=120&q=80'
  },
  {
    name: 'The Ritz Paris',
    desc: 'Paris, France',
    tag: 'Luxury',
    price: '$$$$',
    rating: 4.7,
    trend: '+2.8%',
    trendColor: 'text-amber-600 bg-amber-50 border border-amber-100',
    img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=120&q=80'
  }
];

const CULTURE = [
  {
    name: 'Colosseum',
    desc: 'Rome, Italy',
    tag: 'Ancient History',
    rating: 4.9,
    trend: '+6.1%',
    trendColor: 'text-emerald-600 bg-emerald-50 border border-emerald-100',
    img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=120&q=80'
  },
  {
    name: 'Meiji Shrine',
    desc: 'Tokyo, Japan',
    tag: 'Tradition',
    rating: 4.8,
    trend: '+4.0%',
    trendColor: 'text-emerald-600 bg-emerald-50 border border-emerald-100',
    img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=120&q=80'
  },
  {
    name: 'Louvre Museum',
    desc: 'Paris, France',
    tag: 'Art & History',
    rating: 4.8,
    trend: '+3.7%',
    trendColor: 'text-emerald-600 bg-emerald-50 border border-emerald-100',
    img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=120&q=80'
  }
];

export default function BestPlaces() {
  return (
    <section id="best-places" className="py-12 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Column 1: Top Restaurants */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-left flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-bold text-slate-800 font-sans">Top Restaurants</h4>
              <button className="text-xs font-bold text-primary hover:text-primary-dark transition-colors cursor-pointer">View all</button>
            </div>

            <div className="space-y-4">
              {RESTAURANTS.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between pb-4 border-b border-slate-100 last:border-0 last:pb-0 hover:bg-slate-50/50 p-1.5 rounded-2xl transition-colors group">
                  <div className="flex items-center gap-4 min-w-0">
                    <ImageWithLoader 
                      src={item.img} 
                      alt={item.name} 
                      className="w-14 h-14 rounded-2xl object-cover bg-slate-100 shrink-0 border border-slate-100 group-hover:scale-[1.03] transition-transform duration-200" 
                    />
                    <div className="min-w-0">
                      <h5 className="font-bold text-slate-800 text-sm truncate font-sans group-hover:text-primary transition-colors">{item.name}</h5>
                      <p className="text-xs text-grayText font-medium mt-0.5 truncate">
                        {item.desc}
                      </p>
                      
                      {/* Detailed chips */}
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-rose-50 text-rose-600 text-[9px] font-bold border border-rose-100">
                          <Utensils className="w-2.5 h-2.5" />
                          <span>{item.tag}</span>
                        </span>
                        <span className="inline-flex px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[9px] font-bold border border-slate-200">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 flex flex-col items-end gap-1.5 pl-4">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-0.5 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
                      {item.rating}
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.trendColor}`}>
                      {item.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Best Hotels */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-left flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-bold text-slate-800 font-sans">Best Hotels</h4>
              <button className="text-xs font-bold text-primary hover:text-primary-dark transition-colors cursor-pointer">View all</button>
            </div>

            <div className="space-y-4">
              {HOTELS.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between pb-4 border-b border-slate-100 last:border-0 last:pb-0 hover:bg-slate-50/50 p-1.5 rounded-2xl transition-colors group">
                  <div className="flex items-center gap-4 min-w-0">
                    <ImageWithLoader 
                      src={item.img} 
                      alt={item.name} 
                      className="w-14 h-14 rounded-2xl object-cover bg-slate-100 shrink-0 border border-slate-100 group-hover:scale-[1.03] transition-transform duration-200" 
                    />
                    <div className="min-w-0">
                      <h5 className="font-bold text-slate-800 text-sm truncate font-sans group-hover:text-primary transition-colors">{item.name}</h5>
                      <p className="text-xs text-grayText font-medium mt-0.5 truncate">
                        {item.desc}
                      </p>
                      
                      {/* Detailed chips */}
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-600 text-[9px] font-bold border border-indigo-100">
                          <Hotel className="w-2.5 h-2.5" />
                          <span>{item.tag}</span>
                        </span>
                        <span className="inline-flex px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[9px] font-bold border border-slate-200">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 flex flex-col items-end gap-1.5 pl-4">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-0.5 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
                      {item.rating}
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.trendColor}`}>
                      {item.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 3: Discover Culture */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-left flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-bold text-slate-800 font-sans">Discover Culture</h4>
              <button className="text-xs font-bold text-primary hover:text-primary-dark transition-colors cursor-pointer">View all</button>
            </div>

            <div className="space-y-4">
              {CULTURE.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between pb-4 border-b border-slate-100 last:border-0 last:pb-0 hover:bg-slate-50/50 p-1.5 rounded-2xl transition-colors group">
                  <div className="flex items-center gap-4 min-w-0">
                    <ImageWithLoader 
                      src={item.img} 
                      alt={item.name} 
                      className="w-14 h-14 rounded-2xl object-cover bg-slate-100 shrink-0 border border-slate-100 group-hover:scale-[1.03] transition-transform duration-200" 
                    />
                    <div className="min-w-0">
                      <h5 className="font-bold text-slate-800 text-sm truncate font-sans group-hover:text-primary transition-colors">{item.name}</h5>
                      <p className="text-xs text-grayText font-medium mt-0.5 truncate">
                        {item.desc}
                      </p>
                      
                      {/* Detailed chips */}
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-[9px] font-bold border border-emerald-100">
                          <Compass className="w-2.5 h-2.5" />
                          <span>{item.tag}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 flex flex-col items-end gap-1.5 pl-4">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-0.5 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
                      {item.rating}
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.trendColor}`}>
                      {item.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
