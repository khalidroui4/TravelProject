import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sun, 
  CloudSun, 
  Cloud, 
  CloudFog, 
  CloudDrizzle, 
  CloudRain, 
  CloudSnow, 
  CloudLightning,
  Loader2,
  Heart,
  MapPin,
  Compass
} from 'lucide-react';
import { fetchWeather, searchCities } from '../services/apiService';
import ImageWithLoader from '../components/ImageWithLoader';

const ICON_MAP = {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning
};

const EXPLORE_CITIES = [
  { name: 'Barcelona', country: 'Spain', lat: 41.3851, lon: 2.1734, flag: '🇪🇸', tag: '🏰 Landmark', img: 'https://images.unsplash.com/photo-1583422409516-2895a77efedd?auto=format&fit=crop&w=350&q=80' },
  { name: 'Istanbul', country: 'Turkey', lat: 41.0082, lon: 28.9784, flag: '🇹🇷', tag: '🕌 Culture', img: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=350&q=80' },
  { name: 'Bangkok', country: 'Thailand', lat: 13.7563, lon: 100.5018, flag: '🇹🇭', tag: '🏛 Temples', img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=350&q=80' },
  { name: 'Amsterdam', country: 'Netherlands', lat: 52.3676, lon: 4.9041, flag: '🇳🇱', tag: '🛶 Canals', img: 'https://images.unsplash.com/photo-1522083165195-3427502977a1?auto=format&fit=crop&w=350&q=80' },
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278, flag: '🇬🇧', tag: '🌉 Bridges', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=350&q=80' },
  { name: 'Bali', country: 'Indonesia', lat: -8.4095, lon: 115.1889, flag: '🇮🇩', tag: '🏖 Nature', img: 'https://images.unsplash.com/photo-1518548419070-ad867980724d?auto=format&fit=crop&w=350&q=80' }
];

export default function ExploreGrid({ onCitySelect, onCountryClick, favorites = [], onFavoriteToggle }) {
  const [cityWeatherData, setCityWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllWeather = async () => {
      const weatherMap = {};
      try {
        await Promise.all(
          EXPLORE_CITIES.map(async (city) => {
            const data = await fetchWeather(city.lat, city.lon);
            weatherMap[city.name] = data.current;
          })
        );
        setCityWeatherData(weatherMap);
      } catch (e) {
        console.error('Explore weather load error:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchAllWeather();
  }, []);

  const handleCityClick = async (cityName) => {
    try {
      const results = await searchCities(cityName);
      if (results.length > 0) {
        onCitySelect(results[0]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section id="explore" className="py-12 bg-slate-50 border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div className="text-left">
            <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-800 font-sans tracking-tight">Explore More Cities</h3>
            <p className="text-sm text-grayText mt-1 font-semibold">Find inspiration for your next trip</p>
          </div>
          <button 
            onClick={() => handleCityClick('barcelona')}
            className="text-xs font-bold text-primary hover:text-primary-dark transition-colors cursor-pointer"
          >
            View all cities
          </button>
        </div>

        {/* Cities row grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {EXPLORE_CITIES.map((city, idx) => {
            const weather = cityWeatherData[city.name];
            const WeatherIcon = weather ? (ICON_MAP[weather.weatherIcon] || CloudSun) : null;
            const isSaved = favorites.some(
              f => f.city_name.toLowerCase() === city.name.toLowerCase()
            );

            return (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => handleCityClick(city.name)}
                className="group cursor-pointer flex flex-col text-left"
              >
                {/* Image container using ImageWithLoader */}
                <div className="h-32 rounded-2xl overflow-hidden relative bg-slate-200 shadow-sm mb-3">
                  <ImageWithLoader
                    src={city.img}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category Chip overlay (top left) */}
                  <div className="absolute top-2 left-2 bg-black/25 backdrop-blur-sm px-1.5 py-0.5 rounded-lg text-[9px] font-bold text-white/95 border border-white/5">
                    {city.tag}
                  </div>

                  {/* Floating weather bubble overlay */}
                  <div className="absolute top-2 right-2 bg-black/35 backdrop-blur-sm px-2 py-1 rounded-xl flex items-center gap-1.5 text-white text-[10px] font-bold border border-white/5">
                    {loading ? (
                      <Loader2 className="w-2.5 h-2.5 animate-spin" />
                    ) : (
                      <>
                        {WeatherIcon && <WeatherIcon className={`w-3.5 h-3.5 ${weather.weatherColor}`} />}
                        <span>{weather?.temp}°</span>
                      </>
                    )}
                  </div>

                  {/* Heart/Save overlay button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onFavoriteToggle) {
                        onFavoriteToggle({
                          name: city.name,
                          country: city.country,
                          lat: city.lat,
                          lon: city.lon,
                          rating: null,
                          image: city.img
                        });
                      }
                    }}
                    className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-400 hover:text-red-500 p-1.5 rounded-full shadow-sm transition-colors border-none cursor-pointer z-10"
                    title={isSaved ? "Remove Favorite" : "Save Destination"}
                  >
                    <Heart className={`w-3.5 h-3.5 transition-colors ${isSaved ? 'text-red-500 fill-red-550' : 'text-slate-400'}`} />
                  </button>
                </div>

                {/* Info Text below */}
                <div>
                  <h4 className="font-bold text-slate-800 text-sm leading-tight group-hover:text-primary transition-colors font-sans">
                    {city.name}
                  </h4>
                  
                  {/* Country badge button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCountryClick(city.country);
                    }}
                    className="text-[11px] text-grayText font-semibold mt-0.5 hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <span>{city.flag}</span>
                    <span>{city.country}</span>
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
