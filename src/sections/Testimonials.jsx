import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Compass } from 'lucide-react';
import ImageWithLoader from '../components/ImageWithLoader';

const REVIEWS = [
  {
    name: 'Emmie Johnson',
    location: 'New York, USA',
    flag: '🇺🇸',
    destination: 'Rome, Italy',
    text: 'Standing in the shadow of the Colosseum at sunset was a childhood dream. The local guides helped us discover family-owned trattorias away from tourist traps. Our Roman holiday felt deeply authentic and magical.',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
    tripImg: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Liam Smith',
    location: 'London, UK',
    flag: '🇬🇧',
    destination: 'Tokyo, Japan',
    text: 'Wandering through Shinjuku’s neon alleyways, we felt fully immersed in a different century. With live weather alerts, we timed our Meiji Shrine garden strolls perfectly, avoiding heavy showers and capturing quiet moments.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    tripImg: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Sophia Martin',
    location: 'Paris, France',
    flag: '🇫🇷',
    destination: 'Bali, Indonesia',
    text: 'Waking up to the sound of tropical birds in Ubud rice terraces was paradise. The curated culture articles connected us with local guides for a sunrise temple hike. It was an emotional journey we will treasure forever.',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120&q=80',
    tripImg: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80'
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section className="py-20 bg-slate-50 border-b border-[#E5E7EB] relative overflow-hidden">
      
      {/* Decorative background details */}
      <div className="absolute top-10 left-10 opacity-[0.03] pointer-events-none z-0">
        <svg className="w-60 h-60 text-slate-800" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <path d="M10 50 Q 50 90 90 50" strokeWidth="0.8" strokeDasharray="3 3" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Centered Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold text-primary uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-500/10">
            Stories
          </span>
          <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-4 font-sans tracking-tight">
            Explorer Diaries
          </h3>
          <p className="text-sm text-grayText mt-2 font-medium max-w-xl mx-auto">
            Read authentic travel experiences shared directly by our global community.
          </p>
        </div>

        {/* Story Card Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Slider Controllers - Rounded Circle Toggles */}
          <div className="absolute top-1/2 -left-5 -translate-y-1/2 z-20 hidden md:block">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-md flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute top-1/2 -right-5 -translate-y-1/2 z-20 hidden md:block">
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-md flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Core Story Card - Premium Glass / Rounded 3xl Panel */}
          <div className="overflow-hidden bg-white border border-slate-100 rounded-3xl shadow-premium hover:shadow-premium-hover min-h-[380px] flex flex-col lg:flex-row items-stretch transition-all duration-300">
            <AnimatePresence mode="wait">
              {REVIEWS.map((review, idx) => {
                if (idx !== activeIndex) return null;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="w-full flex flex-col lg:flex-row items-stretch"
                  >
                    
                    {/* Left: Premium Trip Image Banner */}
                    <div className="lg:w-1/2 min-h-[260px] relative bg-slate-100 overflow-hidden shrink-0 border-b lg:border-b-0 lg:border-r border-slate-100">
                      <ImageWithLoader 
                        src={review.tripImg} 
                        alt={review.destination}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Destination Overlay */}
                      <div className="absolute bottom-6 left-6 text-left text-white bg-slate-900/70 backdrop-blur-md border border-white/10 px-3.5 py-2.5 rounded-2xl shadow-lg">
                        <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest block mb-0.5">LOCATION LOG</span>
                        <h4 className="text-sm font-bold font-sans uppercase tracking-wider leading-none">
                          {review.destination}
                        </h4>
                      </div>
                    </div>

                    {/* Right: Premium Feedback Review */}
                    <div className="lg:w-1/2 p-8 md:p-10 flex flex-col justify-between text-left relative bg-white">
                      
                      {/* Quotes icon background */}
                      <div className="absolute top-8 right-8 opacity-[0.03] text-slate-800 pointer-events-none">
                        <Compass className="w-24 h-24" />
                      </div>

                      <div>
                        {/* Rating stars */}
                        <div className="flex items-center gap-0.5 mb-6 text-accent">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <Star className="w-4 h-4 fill-accent text-accent" />
                        </div>

                        {/* Review text */}
                        <p className="text-slate-600 text-sm sm:text-base font-semibold leading-relaxed mb-8 italic">
                          "{review.text}"
                        </p>
                      </div>

                      {/* Author Credentials */}
                      <div className="flex items-center gap-4 pt-5 border-t border-slate-100">
                        <img 
                          src={review.img} 
                          alt={review.name} 
                          className="w-12 h-12 rounded-full object-cover border border-slate-100 shrink-0 shadow-sm" 
                        />
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm leading-tight">
                            {review.name}
                          </h4>
                          <span className="text-[10px] text-grayText font-semibold block mt-1 flex items-center gap-1.5 uppercase tracking-wider">
                            <span>{review.flag}</span>
                            <span>{review.location}</span>
                          </span>
                        </div>
                      </div>

                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex ? 'w-6 bg-primary' : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
