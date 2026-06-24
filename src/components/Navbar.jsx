import React, { useState, useEffect } from 'react';
import { MapPin, Search, Menu, X, Globe, User, ChevronDown } from 'lucide-react';

export default function Navbar({ onSearchClick, user, onLogoutSuccess }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 flex items-center bg-white ${
        isScrolled ? 'shadow-md border-b border-[#E5E7EB]' : 'shadow-sm border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Logo + Subtitle */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl overflow-hidden shadow-md shadow-primary/15 group-hover:scale-105 transition-transform duration-200">
            <img src="/EzTravel.png" alt="EzTravel" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col items-start leading-none text-left">
            <span className="font-sans font-extrabold text-base tracking-tight text-slate-800">
              Ez<span className="text-primary">Travel</span>
            </span>
            <span className="text-[9px] font-bold text-slate-400 mt-0.5 tracking-wider uppercase font-sans">
              Explore the world
            </span>
          </div>
        </a>

        {/* Center: Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#home" className="font-bold text-xs uppercase tracking-wider text-primary hover:text-primary-dark transition-colors">
            Home
          </a>
          <a href="#explore" className="font-bold text-xs uppercase tracking-wider text-slate-500 hover:text-primary transition-colors">
            Explore Cities
          </a>
          <a href="#trending" className="font-bold text-xs uppercase tracking-wider text-slate-500 hover:text-primary transition-colors">
            Top Destinations
          </a>
          <a href="#about" className="font-bold text-xs uppercase tracking-wider text-slate-500 hover:text-primary transition-colors">
            About Us
          </a>
        </nav>

        {/* Right: Language Selector + Sign In Button */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* EN selector with dropdown arrow */}
          <button className="flex items-center gap-1.5 px-3 py-2 text-slate-550 hover:text-slate-700 transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span>EN</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* Search trigger icon */}
          <button 
            onClick={onSearchClick}
            className="p-2.5 text-slate-550 hover:text-primary hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-4.5 h-4.5" />
          </button>

          {/* Sign In / Profile action */}
          {user ? (
            <a 
              href="#profile" 
              className="flex items-center gap-2 px-4.5 py-2.5 bg-slate-50 hover:bg-white text-slate-700 hover:text-primary rounded-full text-xs font-bold transition-all shadow-sm border border-slate-200 hover:border-primary/20 shrink-0 cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="truncate max-w-[100px]">{user.name}</span>
            </a>
          ) : (
            <a 
              href="#signin" 
              className="flex items-center gap-1.5 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-full text-xs font-bold shadow-md shadow-primary/10 hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <span>Sign In</span>
              <User className="w-3.5 h-3.5 fill-white/10" />
            </a>
          )}

        </div>

        {/* Mobile menu triggers */}
        <div className="flex md:hidden items-center gap-3">
          <button 
            onClick={onSearchClick}
            className="p-2 text-slate-555 hover:text-primary rounded-full animate-none"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-555 hover:text-primary rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white border-b border-[#E5E7EB] shadow-lg py-6 px-6 flex flex-col gap-5 md:hidden z-40 animate-in fade-in slide-in-from-top-5 duration-200 text-left">
          <a 
            href="#home" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-bold text-xs uppercase tracking-wider text-primary py-1 border-b border-slate-50"
          >
            Home
          </a>
          <a 
            href="#explore" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-bold text-xs uppercase tracking-wider text-slate-500 hover:text-primary py-1 border-b border-slate-50"
          >
            Explore Cities
          </a>
          <a 
            href="#trending" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-bold text-xs uppercase tracking-wider text-slate-500 hover:text-primary py-1 border-b border-slate-50"
          >
            Top Destinations
          </a>
          <a 
            href="#about" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-bold text-xs uppercase tracking-wider text-slate-500 hover:text-primary py-1 border-b border-slate-50"
          >
            About Us
          </a>
          <div className="flex items-center justify-between pt-2">
            <button className="flex items-center gap-1.5 px-3 py-2 text-slate-550 text-xs font-bold uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5" />
              <span>English</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {user ? (
              <a 
                href="#profile" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full text-xs font-bold shadow-sm w-1/2 cursor-pointer text-center"
              >
                <User className="w-3.5 h-3.5 text-primary" />
                <span className="truncate max-w-[80px]">{user.name}</span>
              </a>
            ) : (
              <a 
                href="#signin" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-full text-xs font-bold shadow-md w-1/2 cursor-pointer text-center"
              >
                <span>Sign In</span>
                <User className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
