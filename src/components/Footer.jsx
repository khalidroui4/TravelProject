import React from 'react';
import { MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-500 pt-16 pb-8 border-t border-slate-100 text-left">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        
        {/* Left Column: Brand Details */}
        <div className="lg:col-span-2">
          <a href="#" className="flex items-center gap-2 mb-4 group w-fit">
            <div className="w-8.5 h-8.5 rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-200">
              <img src="/EzTravel.png" alt="EzTravel" className="w-full h-full object-cover" />
            </div>
            <span className="font-sans font-bold text-lg tracking-tight text-slate-800">
              Ez<span className="text-primary">Travel</span>
            </span>
          </a>
          <p className="text-sm text-grayText mb-6 max-w-sm leading-relaxed">
            Your all-in-one travel companion for discovering cities, attractions, culture, food, hotels and live weather.
          </p>
        </div>

        {/* Column 2: Explore */}
        <div>
          <h4 className="text-slate-800 font-bold text-xs tracking-wider uppercase mb-4 font-sans">Explore</h4>
          <ul className="space-y-2.5 text-xs font-semibold">
            <li><a href="#explore" className="hover:text-primary transition-colors text-grayText">Explore Cities</a></li>
            <li><a href="#trending" className="hover:text-primary transition-colors text-grayText">Top Destinations</a></li>
            <li><a href="#best-places" className="hover:text-primary transition-colors text-grayText">Attractions</a></li>
            <li><a href="#guides" className="hover:text-primary transition-colors text-grayText">Guides</a></li>
            <li><a href="#" className="hover:text-primary transition-colors text-grayText">Travel News</a></li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div>
          <h4 className="text-slate-800 font-bold text-xs tracking-wider uppercase mb-4 font-sans">Company</h4>
          <ul className="space-y-2.5 text-xs font-semibold">
            <li><a href="#" className="hover:text-primary transition-colors text-grayText">About Us</a></li>
            <li><a href="#" className="hover:text-primary transition-colors text-grayText">Contact Us</a></li>
            <li><a href="#" className="hover:text-primary transition-colors text-grayText">Careers</a></li>
            <li><a href="#" className="hover:text-primary transition-colors text-grayText">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors text-grayText">Terms of Service</a></li>
          </ul>
        </div>

        {/* Column 4: Support */}
        <div>
          <h4 className="text-slate-800 font-bold text-xs tracking-wider uppercase mb-4 font-sans">Support</h4>
          <ul className="space-y-2.5 text-xs font-semibold">
            <li><a href="#" className="hover:text-primary transition-colors text-grayText">Help Center</a></li>
            <li><a href="#" className="hover:text-primary transition-colors text-grayText">FAQ</a></li>
            <li><a href="#" className="hover:text-primary transition-colors text-grayText">Contact Support</a></li>
            <li><a href="#" className="hover:text-primary transition-colors text-grayText">Feedback</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Footer Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-semibold">
        <div>
          © {new Date().getFullYear()} EzTravel. All rights reserved.
        </div>
        
        {/* Social Icons row (Follow Us) */}
        <div className="flex items-center gap-4.5 text-slate-400">
          <a href="#" className="hover:text-primary hover:scale-110 transition-all duration-200 cursor-pointer" aria-label="Facebook">
            <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2c4.48-10 10-10c4.9 0 9 3.54 9.88 8.2h-6.9v-2.3h-2.3v2.3H8.3v2.8h2.3v6.9c-4.9-.88-8.2-4.98-8.2-9.88z"/></svg>
          </a>
          <a href="#" className="hover:text-primary hover:scale-110 transition-all duration-200 cursor-pointer" aria-label="Instagram">
            <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="#" className="hover:text-primary hover:scale-110 transition-all duration-200 cursor-pointer" aria-label="Twitter">
            <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="#" className="hover:text-primary hover:scale-110 transition-all duration-200 cursor-pointer" aria-label="YouTube">
            <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.555a3.003 3.003 0 0 0-2.11 2.108C0 8.03 0 12 0 12s0 3.97.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.48 20.5 12 20.5 12 20.5s7.52 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.97 24 12 24 12s0-3.97-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
