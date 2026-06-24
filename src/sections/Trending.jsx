import React from 'react';
import { Star, ChevronRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { searchCities } from '../services/apiService';
import ImageWithLoader from '../components/ImageWithLoader';

const FEATURED_CITIES = [
  { key: 'paris', name: 'Paris', country: 'France', rating: 4.8, weather: '🌤 24°C', tag: '🏰 Landmark', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80' },
  { key: 'tokyo', name: 'Tokyo', country: 'Japan', rating: 4.7, weather: '🌤 28°C', tag: '🏛 Culture', img: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=600&q=80' },
  { key: 'new york', name: 'New York', country: 'USA', rating: 4.6, weather: '⛅ 22°C', tag: '🏙 Cityscape', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80' },
  { key: 'dubai', name: 'Dubai', country: 'UAE', rating: 4.7, weather: '☀️ 38°C', tag: '🛍 Luxury', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80' }
];

const FLAG_MAP = {
  'France': '🇫🇷',
  'Japan': '🇯🇵',
  'USA': '🇺🇸',
  'United States': '🇺🇸',
  'UAE': '🇦🇪',
  'United Arab Emirates': '🇦🇪',
  'Italy': '🇮🇹',
  'Spain': '🇪🇸',
  'Turkey': '🇹🇷',
  'Thailand': '🇹🇭',
  'Netherlands': '🇳🇱',
  'United Kingdom': '🇬🇧',
  'Indonesia': '🇮🇩',
  'Morocco': '🇲🇦'
};

export default function Trending({ onCitySelect, onCountryClick, favorites = [], onFavoriteToggle }) {
  const handleExploreClick = async (cityName) => {
    try {
      const results = await searchCities(cityName);
      if (results.length > 0) {
        onCitySelect(results[0]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section id="trending" className="py-20 bg-white border-b border-slate-100 relative overflow-hidden">
      
      {/* Background visual details (airplane path representation) */}
      <div className="absolute top-10 left-10 opacity-5 pointer-events-none z-0">
        <svg className="w-48 h-48 text-slate-800" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <circle cx="50" cy="50" r="45" strokeWidth="0.5" strokeDasharray="3 3" />
          <path d="M10 50 Q 50 10 90 50" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-12 text-left">
          <div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-emerald-50 px-2.5 py-1.5 rounded-md border border-emerald-100/30">
              Top Picked
            </span>
            <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-900 font-sans tracking-tight mt-3">
              Featured Destinations
            </h3>
            <p className="text-sm text-slate-500 mt-1 font-semibold">
              Handpicked travel experiences curated for ultimate wanderlust.
            </p>
          </div>
          
          <button 
            onClick={() => handleExploreClick('paris')}
            className="group flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-dark transition-colors cursor-pointer"
          >
            <span>View All Destinations</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Cards Row (Grid on Desktop, Horizontal Scroll on Mobile) */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory">
            {FEATURED_CITIES.map((city, index) => {
              const isSaved = favorites.some(
                f => f.city_name.toLowerCase() === city.name.toLowerCase()
              );
              const flag = FLAG_MAP[city.country] || '🌐';

              return (
                <motion.div
                  key={city.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => handleExploreClick(city.key)}
                  className="h-[400px] rounded-3xl overflow-hidden relative shadow-premium hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer group snap-start bg-slate-950 border border-slate-100"
                >
                  {/* Photo background using ImageWithLoader */}
                  <ImageWithLoader 
                    src={city.img} 
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                  
                  {/* Dark gradient overlay on bottom of card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-350 pointer-events-none" />

                  {/* Top left Tag Chip */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-bold text-primary shadow-md border border-white/20">
                    {city.tag}
                  </div>

                  {/* Top right Heart/Save button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const coordinates = {
                        paris: { lat: 48.8566, lon: 2.3522 },
                        tokyo: { lat: 35.6762, lon: 139.6503 },
                        'new york': { lat: 40.7128, lon: -74.0060 },
                        dubai: { lat: 25.2048, lon: 55.2708 },
                      };
                      const coords = coordinates[city.key] || { lat: 0, lon: 0 };
                      if (onFavoriteToggle) {
                        onFavoriteToggle({
                          name: city.name,
                          country: city.country,
                          lat: coords.lat,
                          lon: coords.lon,
                          rating: city.rating,
                          image: city.img
                        });
                      }
                    }}
                    className="absolute top-4 right-4 bg-white/95 backdrop-blur-md hover:bg-white text-slate-400 hover:text-red-500 p-2.5 rounded-xl shadow-md transition-all border border-white/20 cursor-pointer z-10 active:scale-90 hover:scale-105"
                    title={isSaved ? "Remove Favorite" : "Save Destination"}
                  >
                    <Heart className={`w-4 h-4 transition-colors ${isSaved ? 'text-red-500 fill-red-550' : 'text-slate-400'}`} />
                  </button>

                  {/* Details Container */}
                  <div className="absolute bottom-5 inset-x-5 flex flex-col justify-end text-left text-white z-10">
                    
                    {/* Top row of bottom: Category Badge & Weather */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-extrabold text-accent uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-md">
                        {city.weather}
                      </span>
                      <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md text-[10px] font-bold text-white">
                        <Star className="w-3 h-3 text-accent fill-accent" />
                        <span>{city.rating}</span>
                      </div>
                    </div>

                    <h4 className="text-2xl font-black font-sans leading-tight tracking-tight uppercase group-hover:text-primary transition-colors duration-300">
                      {city.name}
                    </h4>
                    
                    {/* Country badge button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCountryClick(city.country);
                      }}
                      className="text-xs font-bold text-slate-350 mt-1 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer w-max"
                    >
                      <span>{flag}</span>
                      <span>{city.country}</span>
                    </button>
                    
                  </div>

                </motion.div>
              );
            })}
          </div>

          {/* Floating Right Navigation Arrow */}
          <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20">
            <button 
              onClick={() => handleExploreClick('tokyo')}
              className="w-10 h-10 rounded-full bg-slate-900 hover:bg-primary text-white shadow-lg flex items-center justify-center hover:scale-105 transition-all cursor-pointer border border-white/10"
              aria-label="Next destination"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
