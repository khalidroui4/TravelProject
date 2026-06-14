import React from 'react';
import { motion } from 'framer-motion';
import { searchCities } from '../services/apiService';
import ImageWithLoader from '../components/ImageWithLoader';

const ARTICLES = [
  {
    title: '10 Things to do in Rome',
    excerpt: 'Discover the best attractions, food and local secrets.',
    category: 'Guide',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=400&q=80',
    cityKey: 'rome'
  },
  {
    title: 'Best Beaches in Bali',
    excerpt: 'Explore the most beautiful beaches and hidden gems.',
    category: 'Inspiration',
    readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80',
    cityKey: 'bali'
  },
  {
    title: 'Tokyo Culture Guide',
    excerpt: 'Everything you need to know about Tokyo\'s culture.',
    category: 'Culture',
    readTime: '7 min read',
    img: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80',
    cityKey: 'tokyo'
  },
  {
    title: 'Food Guide: Paris',
    excerpt: 'A complete guide to the best food experiences.',
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

  return (
    <section id="guides" className="py-12 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div className="text-left">
            <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-800 font-sans tracking-tight">Travel Guides & Inspiration</h3>
            <p className="text-sm text-grayText mt-1 font-semibold">Tips, stories and guides to help you travel better</p>
          </div>
          <button 
            onClick={() => handleArticleClick('rome')}
            className="text-xs font-bold text-primary hover:text-primary-dark transition-colors cursor-pointer"
          >
            View all articles
          </button>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTICLES.map((article, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => handleArticleClick(article.cityKey)}
              className="group cursor-pointer bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-premium hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 flex flex-col justify-between"
            >
              
              <div>
                {/* Photo container using ImageWithLoader */}
                <div className="h-44 w-full overflow-hidden bg-slate-50">
                  <ImageWithLoader 
                    src={article.img} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Details */}
                <div className="p-5 text-left">
                  {/* Uppercase Category Badge at the top of the text */}
                  <span className="inline-block bg-slate-100 text-[9px] font-extrabold text-slate-500 uppercase tracking-widest px-2 py-0.5 rounded-md mb-3">
                    {article.category}
                  </span>
                  
                  <h4 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-primary transition-colors font-sans mb-1.5">
                    {article.title}
                  </h4>
                  <p className="text-[11px] text-grayText leading-normal line-clamp-2 h-8 font-medium">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Read Time Footer */}
              <div className="px-5 pb-5 pt-2 flex items-center justify-between text-[10px] font-bold text-slate-400">
                <span>{article.readTime}</span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
