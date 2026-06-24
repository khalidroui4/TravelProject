import React from 'react';
import { motion } from 'framer-motion';
import { searchCities } from '../services/apiService';
import ImageWithLoader from '../components/ImageWithLoader';
import { BookOpen, Clock, ChevronRight } from 'lucide-react';

const ARTICLES = [
  {
    title: '10 Things to do in Rome',
    excerpt: 'Discover the ancient monuments, backstreet trattorias, and local secrets that bring the Eternal City to life.',
    category: 'Guide',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
    cityKey: 'rome'
  },
  {
    title: 'Best Beaches in Bali',
    excerpt: 'Explore the most beautiful volcanic sands and hidden lagoons.',
    category: 'Inspiration',
    readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80',
    cityKey: 'bali'
  },
  {
    title: 'Tokyo Culture Guide',
    excerpt: 'An expert walkthrough of historic temples, neon skylines, and customs.',
    category: 'Culture',
    readTime: '7 min read',
    img: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80',
    cityKey: 'tokyo'
  },
  {
    title: 'Food Guide: Paris',
    excerpt: 'From street-side crêperies to fine-dining bistros, explore the capital.',
    category: 'Food',
    readTime: '4 min read',
    img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80',
    cityKey: 'paris'
  }
];

export default function CultureGuides({ onCitySelect }) {
  const handleArticleClick = async (cityKey) => {
    try {
      const results = await searchCities(cityKey);
      if (results.length > 0) {
        onCitySelect(results[0]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const featured = ARTICLES[0];
  const sideArticles = ARTICLES.slice(1);

  return (
    <section id="guides" className="py-20 bg-white border-b border-slate-100 relative">
      
      {/* Background geographic path lines */}
      <div className="absolute top-20 right-20 opacity-[0.03] pointer-events-none select-none">
        <svg className="w-56 h-56 text-slate-800" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <circle cx="50" cy="50" r="40" strokeWidth="0.5" />
          <line x1="10" y1="50" x2="90" y2="50" strokeWidth="0.5" />
          <line x1="50" y1="10" x2="50" y2="90" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left gap-4">
          <div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-emerald-50 px-2.5 py-1.5 rounded-md border border-emerald-100/30">
              Journal & Chronicle
            </span>
            <h3 className="text-3xl lg:text-4xl font-black text-slate-900 mt-3 font-sans tracking-tight">
              Travel Guides & Inspiration
            </h3>
            <p className="text-sm text-slate-500 mt-1 font-semibold">
              Stories, tips, and insights curated by our editorial explorer team.
            </p>
          </div>
          
          <button 
            onClick={() => handleArticleClick('rome')}
            className="w-max text-xs font-bold text-primary hover:text-primary-dark transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Read Magazine Feed</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Magazine Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Featured cover story */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => handleArticleClick(featured.cityKey)}
            className="lg:col-span-7 group cursor-pointer bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative h-[340px] md:h-[400px] w-full overflow-hidden bg-slate-100">
              <ImageWithLoader 
                src={featured.img} 
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-xl text-[9px] font-bold text-white uppercase tracking-wider">
                Featured Cover Story
              </div>
            </div>

            <div className="p-6 md:p-8 text-left flex-grow flex flex-col justify-between bg-white">
              <div>
                <span className="text-[10px] font-extrabold text-accent uppercase tracking-widest mb-3 block">
                  {featured.category}
                </span>
                
                <h4 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight group-hover:text-primary transition-colors font-sans mb-3">
                  {featured.title}
                </h4>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                  {featured.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary" />
                  {featured.readTime}
                </span>
                <span className="text-primary group-hover:translate-x-1.5 transition-transform flex items-center gap-1">
                  Read Article &rarr;
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Stack of smaller horizontal side articles */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {sideArticles.map((article, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => handleArticleClick(article.cityKey)}
                className="group cursor-pointer bg-white border border-slate-100 rounded-3xl p-4 shadow-premium hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 flex gap-4 items-center text-left"
              >
                
                {/* Square image thumbnail */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-150 shrink-0 relative">
                  <ImageWithLoader 
                    src={article.img} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/10 pointer-events-none" />
                </div>

                {/* Article Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[9px] font-extrabold text-accent uppercase tracking-widest mb-1.5 block">
                      {article.category}
                    </span>
                    
                    <h5 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-primary transition-colors font-sans mb-1 truncate">
                      {article.title}
                    </h5>
                    
                    <p className="text-[11px] text-slate-450 leading-relaxed font-semibold line-clamp-2 mb-2">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold border-t border-slate-50 pt-2 mt-1">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {article.readTime}
                    </span>
                    <span className="text-primary group-hover:translate-x-0.5 transition-transform font-bold">
                      Read
                    </span>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
