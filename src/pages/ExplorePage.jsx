import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star } from 'lucide-react';
import { searchCities } from '../services/apiService';
import ImageWithLoader from '../components/ImageWithLoader';

const CITIES = [
  { key: 'paris', name: 'Paris', country: 'France', rating: 4.8, tag: 'Landmark', flag: ' France', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80' },
  { key: 'tokyo', name: 'Tokyo', country: 'Japan', rating: 4.7, tag: 'Culture', flag: '🇯🇵 Japan', img: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=400&q=80' },
  { key: 'new york', name: 'New York', country: 'USA', rating: 4.6, tag: 'Cityscape', flag: '🇺🇸 USA', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=400&q=80' },
  { key: 'dubai', name: 'Dubai', country: 'UAE', rating: 4.7, tag: 'Luxury', flag: '🇦🇪 UAE', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80' },
  { key: 'barcelona', name: 'Barcelona', country: 'Spain', rating: 4.8, tag: 'Landmark', flag: '🇪🇸 Spain', img: 'https://images.unsplash.com/photo-1583422409516-2895a77efedd?auto=format&fit=crop&w=400&q=80' },
  { key: 'istanbul', name: 'Istanbul', country: 'Turkey', rating: 4.7, tag: 'Culture', flag: '🇹🇷 Turkey', img: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=400&q=80' },
  { key: 'bangkok', name: 'Bangkok', country: 'Thailand', rating: 4.6, tag: 'Temples', flag: '🇹🇭 Thailand', img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=400&q=80' },
  { key: 'amsterdam', name: 'Amsterdam', country: 'Netherlands', rating: 4.6, tag: 'Canals', flag: '🇳🇱 Netherlands', img: 'https://images.unsplash.com/photo-1522083165195-3427502977a1?auto=format&fit=crop&w=400&q=80' },
  { key: 'london', name: 'London', country: 'United Kingdom', rating: 4.7, tag: 'Bridges', flag: '🇬🇧 UK', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&q=80' },
  { key: 'bali', name: 'Bali', country: 'Indonesia', rating: 4.8, tag: 'Nature', flag: '🇮🇩 Indonesia', img: 'https://images.unsplash.com/photo-1518548419070-ad867980724d?auto=format&fit=crop&w=400&q=80' }
];

const CATEGORIES = ['All', 'Landmark', 'Culture', 'Cityscape', 'Luxury', 'Temples', 'Canals', 'Nature'];

export default function ExplorePage({ onCitySelect, onCountryClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCities = CITIES.filter((city) => {
    const matchesSearch = city.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          city.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || city.tag === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-full">Cities Directory</span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-800 mt-4 tracking-tight leading-tight">Explore the World's Wonders</h2>
          <p className="text-grayText text-base font-semibold mt-4 leading-relaxed">
            Search cities, filter by categories, and load live parameters into the interactive dashboard.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 bg-white p-4 rounded-3xl border border-slate-100 shadow-premium">
          {/* Search Box */}
          <div className="relative flex items-center bg-slate-50 border border-slate-200 focus-within:border-primary rounded-2xl px-4 py-2 w-full md:max-w-sm transition-colors">
            <Search className="w-4.5 h-4.5 text-slate-400 mr-2.5 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search city or country..."
              className="bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 font-semibold text-xs py-1.5 w-full"
            />
          </div>

          {/* Categories Grid */}
          <div className="flex flex-wrap items-center gap-2 max-w-full overflow-x-auto hide-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border-none ${
                  selectedCategory === cat
                    ? 'bg-primary-dark text-white'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cities Grid */}
        {filteredCities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredCities.map((city, idx) => (
              <motion.div
                key={city.key}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => handleExploreClick(city.key)}
                className="group cursor-pointer flex flex-col bg-white border border-slate-100 p-2.5 rounded-3xl shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300"
              >
                {/* Photo background using ImageWithLoader */}
                <div className="h-40 rounded-2xl overflow-hidden relative bg-slate-200 shadow-sm mb-3">
                  <ImageWithLoader
                    src={city.img}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category Chip overlay (top left) */}
                  <div className="absolute top-2.5 left-2.5 bg-black/25 backdrop-blur-sm px-2.5 py-0.5 rounded-lg text-[9px] font-bold text-white/95 border border-white/5">
                    🏰 {city.tag}
                  </div>

                  {/* Rating Bubble overlay */}
                  <div className="absolute top-2.5 right-2.5 bg-primary-dark/80 backdrop-blur-sm px-2 py-0.5 rounded-lg flex items-center gap-0.5 text-white text-[9px] font-bold border border-white/5">
                    <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
                    <span>{city.rating}</span>
                  </div>
                </div>

                {/* Info Text below */}
                <div className="p-1.5 flex flex-col text-left">
                  <h4 className="font-extrabold text-slate-800 text-sm leading-tight group-hover:text-primary transition-colors font-sans">
                    {city.name}
                  </h4>
                  
                  {/* Country badge button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCountryClick(city.country);
                    }}
                    className="text-[10px] text-grayText font-bold mt-1.5 hover:text-primary transition-colors flex items-center gap-1 w-fit border-none bg-transparent p-0 cursor-pointer"
                  >
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{city.flag}</span>
                  </button>
                </div>

              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">No destinations found matching your filters.</p>
          </div>
        )}

      </div>
    </div>
  );
}
