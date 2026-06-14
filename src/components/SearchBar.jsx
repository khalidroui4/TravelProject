import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Loader2 } from 'lucide-react';
import { searchCities } from '../services/apiService';

const POPULAR_CHIPS = ['Paris', 'Rome', 'Tokyo', 'New York', 'Dubai'];

export default function SearchBar({ onCitySelect, className = '' }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Debounce API calls
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await searchCities(query);
        setSuggestions(results);
      } catch (err) {
        console.error('Autocomplete error:', err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city) => {
    onCitySelect(city);
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
  };

  const handleChipClick = async (chipName) => {
    setLoading(true);
    try {
      const results = await searchCities(chipName);
      if (results.length > 0) {
        handleSelect(results[0]);
      } else {
        // Fallback in case of network issues
        handleSelect({ name: chipName, country: 'Travel Destination', lat: 0, lon: 0 });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const results = await searchCities(query);
      if (results.length > 0) {
        handleSelect(results[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} className={`w-full max-w-2xl relative z-30 ${className}`}>
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="relative flex items-center bg-white rounded-full shadow-lg border border-slate-200 hover:border-primary/30 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all p-1.5 pl-5">
          <Search className="w-5 h-5 text-grayText mr-3 shrink-0" />
          
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search for a city, country or place..."
            className="w-full bg-transparent border-none outline-none text-slate-800 placeholder-slate-450 font-medium text-base py-2"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSuggestions([]);
              }}
              className="p-2 mr-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          )}

          <button
            type="submit"
            className="w-12 h-12 bg-primary hover:bg-primary-dark text-white rounded-full flex items-center justify-center shadow-md transition-all shrink-0 active:scale-95 cursor-pointer"
            aria-label="Search"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && (suggestions.length > 0 || loading) && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-2xl shadow-xl border border-slate-150 overflow-hidden z-40 max-h-72 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150">
          {loading && suggestions.length === 0 ? (
            <div className="p-4 flex items-center gap-3 text-slate-500 justify-center">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <span className="text-sm font-medium">Searching world cities...</span>
            </div>
          ) : (
            <ul className="py-2">
              {suggestions.map((city, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleSelect(city)}
                    className="w-full text-left px-5 py-3 hover:bg-slate-50 flex items-center gap-3 transition-colors border-b border-slate-50 last:border-0"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-primary flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{city.name}</div>
                      <div className="text-xs text-grayText">{city.country}</div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Popular Tags */}
      <div className="flex flex-wrap items-center gap-2.5 mt-4 text-xs font-semibold">
        <span className="text-white/80 select-none mr-1 font-semibold">Popular:</span>
        {POPULAR_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => handleChipClick(chip)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/10 backdrop-blur-md active:scale-95 shadow-sm cursor-pointer"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
