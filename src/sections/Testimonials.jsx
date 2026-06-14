import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Emmie Johnson',
    location: 'New York, USA',
    text: 'EzTravel made our trip to Rome unforgettable. Everything we needed was in one place!',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80'
  },
  {
    name: 'Liam Smith',
    location: 'London, UK',
    text: 'The live weather and local recommendations were so helpful. Highly recommended!',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80'
  },
  {
    name: 'Sophia Martin',
    location: 'Paris, France',
    text: 'Beautiful design, easy to use and very informative. My go-to travel website now.',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120&q=80'
  }
];

export default function Testimonials() {
  return (
    <section className="py-12 bg-white border-b border-[#E5E7EB] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-800 font-sans tracking-tight">What Travelers Say</h3>
          <p className="text-sm text-grayText mt-1.5 font-semibold">Real stories from people who explored the world with us</p>
        </div>

        {/* 3 Testimonials in a row with floating arrows */}
        <div className="relative px-2">
          
          {/* Left Arrow */}
          <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-10 hidden md:block">
            <button className="w-8 h-8 rounded-full bg-primary-dark text-white hover:bg-primary hover:scale-105 transition-all flex items-center justify-center cursor-pointer border-none shadow-sm">
              <ChevronLeft className="w-4.5 h-4.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-slate-50 border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left relative"
              >
                
                {/* 5 Stars Rating inside Testimonials (Trustworthiness detail) */}
                <div className="flex items-center gap-0.5 mb-4 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                </div>

                {/* Review Text */}
                <p className="text-slate-700 text-xs font-semibold leading-relaxed mb-6 italic">
                  "{review.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-3 border-t border-slate-150/60 mt-auto">
                  <img 
                    src={review.img} 
                    alt={review.name} 
                    className="w-10 h-10 rounded-full object-cover border border-slate-100 shrink-0" 
                  />
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs leading-none">{review.name}</h4>
                    <span className="text-[10px] text-grayText font-semibold block mt-1">{review.location}</span>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

          {/* Right Arrow */}
          <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-10 hidden md:block">
            <button className="w-8 h-8 rounded-full bg-primary-dark text-white hover:bg-primary hover:scale-105 transition-all flex items-center justify-center cursor-pointer border-none shadow-sm">
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </div>

        </div>

        {/* Carousel indicators dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
        </div>

      </div>
    </section>
  );
}
