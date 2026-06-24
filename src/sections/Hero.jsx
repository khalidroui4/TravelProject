import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import WeatherWidget from '../components/WeatherWidget';
import ImageWithLoader from '../components/ImageWithLoader';
import { Globe, MapPin, Compass, Navigation } from 'lucide-react';

export default function Hero({ selectedCity, weatherData, cityImage, onCitySelect, onCountryClick }) {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between pt-28 pb-16 overflow-hidden bg-slate-950 text-white">
      
      {/* Cinematic Background Image Transition */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          {cityImage && (
            <motion.div
              key={cityImage}
              initial={{ opacity: 0, scale: 1.12 }}
              animate={{ opacity: 0.5, scale: 1.02 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              className="w-full h-full"
            >
              <ImageWithLoader
                src={cityImage}
                alt={selectedCity?.name || 'EzTravel'}
                className="w-full h-full object-cover scale-105 filter saturate-[1.1] brightness-[0.75]"
              />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Deep, layered luxury gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/40 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0f172a_90%)]" />
      </div>

      {/* Floating vector contours / travel lines overlay */}
      <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none z-1">
        <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100 450 C 300 200, 700 700, 1540 450" stroke="white" strokeWidth="1.5" className="dashed-route-path" />
          <path d="M-50 600 C 400 350, 800 850, 1600 600" stroke="white" strokeWidth="1" className="dashed-route-path" />
          <circle cx="250" cy="350" r="120" stroke="white" strokeWidth="0.5" strokeDasharray="3 3" />
          <circle cx="1100" cy="550" r="180" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 relative z-10 flex-grow flex flex-col justify-center items-center">
        
        {/* Top: Centered Title & Subtitle */}
        <div className="text-center max-w-3xl mb-10 mt-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-glass mb-6"
          >
            <Compass className="w-4 h-4 text-accent animate-spin-slow" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-200">
              Discover Your Next Adventure
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-6 font-sans text-white uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          >
            Explore any city.<br/>
            <span className="text-primary drop-shadow-none">Experience the world.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-350 font-medium max-w-xl mx-auto leading-relaxed drop-shadow"
          >
            Uncover top attractions, authentic local cuisine, premium stays, live weather forecasts, and interactive travel tools.
          </motion.p>
        </div>

        {/* Center: Centered Premium Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full flex justify-center mb-12 relative z-30"
        >
          <SearchBar onCitySelect={onCitySelect} className="shadow-2xl shadow-slate-950/50" />
        </motion.div>

        {/* Bottom Widgets Row: Split Weather and Stats */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mt-4">
          
          {/* Left: Weather Widget */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", damping: 25, delay: 0.5 }}
            className="flex"
          >
            <WeatherWidget
              cityName={selectedCity.name}
              countryName={selectedCity.country}
              weather={weatherData?.current}
              imageThumbnail={cityImage}
            />
          </motion.div>

          {/* Right: Floating Statistics Widget */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", damping: 25, delay: 0.6 }}
            className="flex flex-col justify-between bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl text-white relative overflow-hidden transition-all duration-300 hover:shadow-glass-hover"
          >
            {/* Ambient background glow */}
            <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-accent/15 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5 text-accent animate-pulse" />
                  Destination Insights
                </span>
                <span className="text-[9px] font-mono text-slate-350">
                  REF: {selectedCity.name.toUpperCase().substring(0, 3)}-{Math.floor(Math.abs(selectedCity.lat || 0))}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-left mb-6">
                <div>
                  <span className="text-white/60 block text-[10px] font-semibold mb-0.5">Coordinates</span>
                  <span className="font-mono font-bold text-sm text-white">
                    {selectedCity.lat ? selectedCity.lat.toFixed(4) : '0.0000'}° N
                  </span>
                  <span className="font-mono font-bold text-sm text-white block">
                    {selectedCity.lon ? selectedCity.lon.toFixed(4) : '0.0000'}° E
                  </span>
                </div>
                <div>
                  <span className="text-white/60 block text-[10px] font-semibold mb-0.5">Timezone Info</span>
                  <span className="font-bold text-sm text-white">
                    Local Timezone
                  </span>
                  <span className="text-xs text-slate-300 block">
                    UTC {selectedCity.lon ? (selectedCity.lon >= 0 ? '+' : '') + Math.round(selectedCity.lon / 15) : '+0'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Country badge link */}
            <button
              onClick={() => onCountryClick(selectedCity.country)}
              className="w-full bg-white/10 hover:bg-white/15 backdrop-blur-md text-white border border-white/10 px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between shadow-md cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-accent" />
                <span>Explore {selectedCity.country} Demographics</span>
              </div>
              <span className="text-accent font-extrabold">View Profile &rarr;</span>
            </button>
          </motion.div>

        </div>

      </div>

      {/* Decorative Wave Divider at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full pointer-events-none overflow-hidden h-12 z-10">
        <svg className="w-full h-full fill-[#F8FAFC]" viewBox="0 0 1440 48" fill="none" preserveAspectRatio="none">
          <path d="M0,32 C240,48 480,48 720,32 C960,16 1200,16 1440,32 L1440,48 L0,48 Z" />
        </svg>
      </div>

    </section>
  );
}
