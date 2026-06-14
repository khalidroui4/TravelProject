import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, TrendingUp, Calendar, Compass, ArrowRight } from 'lucide-react';
import { searchCities } from '../services/apiService';
import ImageWithLoader from '../components/ImageWithLoader';

const TRENDING_DESTINATIONS = [
  {
    key: 'paris',
    name: 'Paris',
    country: 'France',
    rating: 4.8,
    reviews: '14,230 reviews',
    price: '$$$',
    bgImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    desc: 'The city of light remains a global icon of culture, gastronomy, and architectural masterpieces. Famous for Eiffel Tower, Louvre, and charming cafes.'
  },
  {
    key: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    rating: 4.9,
    reviews: '18,540 reviews',
    price: '$$',
    bgImage: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=600&q=80',
    desc: 'A mesmerizing mix of ultra-modern neon-lit skyscrapers and historical temples. Renowned for its unparalleled culinary scene and pristine transit.'
  },
  {
    key: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    rating: 4.7,
    reviews: '9,820 reviews',
    price: '$$$$',
    bgImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
    desc: 'The luxury shopping capital of the Middle East, known for skyscraper architectural marvels like Burj Khalifa and expansive desert dune safaris.'
  },
  {
    key: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    rating: 4.8,
    reviews: '11,430 reviews',
    price: '$$',
    bgImage: 'https://images.unsplash.com/photo-1583422409516-2895a77efedd?auto=format&fit=crop&w=600&q=80',
    desc: 'Catalonia\'s beautiful seaside capital combining unique Gaudí architecture, dynamic street festivals, and historical Gothic quarters.'
  }
];

export default function TrendingPage({ onCitySelect, onCountryClick }) {
  const handleExploreClick = async (cityName) => {
    try {
      const results = await searchCities(cityName);
      if (results.length > 0) {
        onCitySelect(results[0]);
        window.location.hash = 'home';
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-[#F8FAFC] py-16 text-left">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 w-fit mx-auto">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Top Picks</span>
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-800 mt-4 tracking-tight leading-tight">Trending Destinations</h2>
          <p className="text-grayText text-base font-semibold mt-4 leading-relaxed">
            Discover the highest-rated metropolitan and coastal locations loved by travelers worldwide.
          </p>
        </div>

        {/* Detailed List */}
        <div className="space-y-12">
          {TRENDING_DESTINATIONS.map((dest, idx) => (
            <motion.div
              key={dest.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-premium hover:shadow-2xl transition-all duration-300 flex flex-col lg:flex-row items-stretch"
            >
              {/* Left Column: Image */}
              <div className="lg:w-2/5 min-h-[250px] relative bg-slate-200">
                <ImageWithLoader 
                  src={dest.bgImage} 
                  alt={dest.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Right Column: Info details */}
              <div className="lg:w-3/5 p-8 flex flex-col justify-between text-left">
                <div>
                  {/* Title & Price tag */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-800 font-sans tracking-tight">{dest.name}</h3>
                      <button 
                        onClick={() => onCountryClick(dest.country)}
                        className="text-xs font-semibold text-primary mt-1 hover:underline flex items-center gap-1 border-none bg-transparent p-0 cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{dest.country}</span>
                      </button>
                    </div>
                    
                    <span className="text-xs font-extrabold bg-slate-100 border border-slate-200 px-3 py-1 rounded-md text-slate-600 shadow-sm">
                      {dest.price}
                    </span>
                  </div>

                  {/* Rating Metrics row */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 mb-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-dark text-white border-none shadow-sm text-[10px] font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                      <span>{dest.rating}</span>
                    </span>
                    <span className="text-[11px] text-slate-400 font-bold">{dest.reviews}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-grayText font-medium leading-relaxed mb-8">
                    {dest.desc}
                  </p>
                </div>

                {/* Bottom button trigger */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100 mt-auto">
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-slate-350" />
                      <span>Best time: Apr - Oct</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Compass className="w-4 h-4 text-slate-350" />
                      <span>Scenic / Culture</span>
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleExploreClick(dest.key)}
                    className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all active:scale-95 shadow-md flex items-center gap-2 cursor-pointer border-none"
                  >
                    <span>Explore Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
