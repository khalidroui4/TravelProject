import React from 'react';
import { Star, ChevronRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { searchCities } from '../services/apiService';
import ImageWithLoader from '../components/ImageWithLoader';
import { backendService } from '../services/backendService';

const FEATURED_CITIES = [
  { key: 'paris', name: 'Paris', country: 'France', rating: 4.8, weather: '🌤 24°C', tag: '🏰 Landmark', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80' },
  { key: 'tokyo', name: 'Tokyo', country: 'Japan', rating: 4.7, weather: '🌤 28°C', tag: '🏛 Culture', img: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=600&q=80' },
  { key: 'new york', name: 'New York', country: 'USA', rating: 4.6, weather: '⛅ 22°C', tag: '🏙 Cityscape', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80' },
  { key: 'dubai', name: 'Dubai', country: 'UAE', rating: 4.7, weather: '☀️ 38°C', tag: '🛍 Luxury', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80' }
];

export default function Trending({ onCitySelect, onCountryClick }) {
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
    <section id="trending" className="py-12 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div className="text-left">
            <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-800 font-sans tracking-tight">Featured Destinations</h3>
            <p className="text-sm text-grayText mt-1 font-semibold">Handpicked cities for your next adventure</p>
          </div>
          <button 
            onClick={() => handleExploreClick('paris')}
            className="text-xs font-bold text-primary hover:text-primary-dark transition-colors cursor-pointer"
          >
            View all
          </button>
        </div>

        {/* Cards Row (Grid on Desktop, Horizontal Scroll on Mobile) */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory">
            {FEATURED_CITIES.map((city, index) => {
              return (
                <motion.div
                  key={city.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  onClick={() => handleExploreClick(city.key)}
                  className="h-[360px] rounded-3xl overflow-hidden relative shadow-premium hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 ease-in-out cursor-pointer group snap-start"
                >
                  {/* Photo background using ImageWithLoader */}
                  <ImageWithLoader 
                    src={city.img} 
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Dark gradient overlay on bottom of card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* Top left Tag Chip */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-primary shadow-sm">
                    {city.tag}
                  </div>

                  {/* Top right Heart/Save button */}
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (!backendService.isAuthenticated()) {
                        window.location.hash = 'signin';
                        return;
                      }
                      try {
                        const coordinates = {
                          paris: { lat: 48.8566, lon: 2.3522 },
                          tokyo: { lat: 35.6762, lon: 139.6503 },
                          'new york': { lat: 40.7128, lon: -74.0060 },
                          dubai: { lat: 25.2048, lon: 55.2708 },
                        };
                        const coords = coordinates[city.key] || { lat: 0, lon: 0 };
                        await backendService.addFavorite({
                          name: city.name,
                          country: city.country,
                          lat: coords.lat,
                          lon: coords.lon,
                          rating: city.rating,
                          image: city.img
                        });
                        alert(`${city.name} added to favorites!`);
                      } catch (err) {
                        alert(err.message || 'Already in favorites.');
                      }
                    }}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-400 hover:text-red-500 p-2 rounded-full shadow-sm transition-colors border-none cursor-pointer z-10"
                    title="Save Destination"
                  >
                    <Heart className="w-4 h-4" />
                  </button>

                  {/* Left bottom details */}
                  <div className="absolute bottom-5 left-5 text-left text-white">
                    <h4 className="text-xl font-extrabold font-sans leading-none">{city.name}</h4>
                    
                    {/* Country badge button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCountryClick(city.country);
                      }}
                      className="text-[11px] font-semibold text-white/75 mt-1 hover:text-white transition-colors"
                    >
                      {city.country}
                    </button>
                  </div>

                  {/* Right bottom rating + weather chips */}
                  <div className="absolute bottom-5 right-5 flex flex-col items-end gap-1.5">
                    <div className="flex items-center gap-1 bg-black/45 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white border border-white/10">
                      <span>{city.weather}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-primary px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow-sm border-none">
                      <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                      <span>{city.rating}</span>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

          {/* Floating Right Navigation Arrow (exactly like the screenshot) */}
          <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20">
            <button 
              onClick={() => handleExploreClick('tokyo')}
              className="w-10 h-10 rounded-full bg-primary-dark hover:bg-primary text-white shadow-lg flex items-center justify-center hover:scale-105 transition-all cursor-pointer border-none"
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
