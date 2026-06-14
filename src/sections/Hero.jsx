import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import WeatherWidget from '../components/WeatherWidget';
import ImageWithLoader from '../components/ImageWithLoader';

export default function Hero({ selectedCity, weatherData, cityImage, onCitySelect, onCountryClick }) {
  return (
    <section className="relative w-full min-h-[600px] lg:min-h-[700px] flex items-center pt-24 pb-12 overflow-hidden">
      
      {/* Cinematic Background Image Transition */}
      <div className="absolute inset-0 z-0 bg-slate-950">
        <AnimatePresence mode="wait">
          {cityImage && (
            <motion.div
              key={cityImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.55, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full"
            >
              <ImageWithLoader
                src={cityImage}
                alt={selectedCity?.name || 'EzTravel'}
                className="w-full h-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Soft radial overlay for premium readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/60 to-slate-950/40" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side text content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            
            <h1 
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-sans"
            >
              Explore any city.
            </h1>
            <h2 
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#22C55E] tracking-tight leading-[1.1] mb-6 font-sans"
            >
              Experience the world.
            </h2>
            
            <p 
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}
              className="text-base md:text-lg text-slate-200 font-semibold mb-8 max-w-xl leading-relaxed"
            >
              Discover top attractions, restaurants, hotels, culture and live weather – all in one place.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="w-full"
          >
            <SearchBar onCitySelect={onCitySelect} />
          </motion.div>
        </div>

        {/* Right Side floating glass weather card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.25 }}
            className="w-full max-w-sm"
          >
            <WeatherWidget
              cityName={selectedCity.name}
              countryName={selectedCity.country}
              weather={weatherData?.current}
              imageThumbnail={cityImage}
            />
            
            {/* Quick Country badge link */}
            <button 
              onClick={() => onCountryClick(selectedCity.country)}
              className="mt-4 w-full bg-white/10 hover:bg-white/15 backdrop-blur-md text-white border border-white/10 px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between shadow-md cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore {selectedCity.country} Demographics</span>
              <span className="text-emerald-400 font-extrabold">View Stats →</span>
            </button>
          </motion.div>
        </div>

      </div>

    </section>
  );
}
