import React from 'react';
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
  Droplets,
  Wind,
  Shield,
  Activity,
  Loader2
} from 'lucide-react';
import InteractiveMap from '../components/InteractiveMap';

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

export default function MapAndWeather({ selectedCity, weatherData, onCitySelect, loading }) {
  const forecast = weatherData?.forecast || [];
  const current = weatherData?.current;

  // Resolve current weather icon
  const CurrentWeatherIcon = current ? (ICON_MAP[current.weatherIcon] || CloudSun) : CloudSun;

  return (
    <section id="map-weather" className="py-12 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full">Interactive Geography</span>
          <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-3 font-sans tracking-tight">Interactive Map & Weather</h3>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Map */}
          <div className="lg:col-span-7">
            <InteractiveMap 
              selectedCity={selectedCity} 
              onMarkerClick={onCitySelect} 
            />
          </div>

          {/* Right: Weather Forecast Widget (exactly like the screenshot) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 border border-slate-150 rounded-3xl p-6 h-full flex flex-col justify-between shadow-premium text-left">
              
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-150/70 mb-4">
                <div>
                  <h4 className="font-bold text-slate-800 text-lg font-sans">Weather Forecast</h4>
                  <p className="text-xs text-grayText font-medium mt-0.5">
                    {selectedCity.name}, {selectedCity.country}
                  </p>
                </div>
                
                <span className="text-[10px] font-bold text-grayText uppercase tracking-wider mt-1 select-none">
                  7-Day Forecast
                </span>
              </div>

              {/* Horizontal 7-Day Forecast Row */}
              <div className="flex-1 flex flex-col justify-center py-4 border-b border-slate-150/70">
                {loading && forecast.length === 0 ? (
                  <div className="py-10 flex flex-col items-center justify-center gap-2">
                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    <span className="text-[11px] text-slate-400 font-semibold">Updating forecast...</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-7 gap-1">
                    {forecast.map((dayData, idx) => {
                      const WeatherIcon = ICON_MAP[dayData.weatherIcon] || CloudSun;
                      const isToday = idx === 0;
                      return (
                        <div key={idx} className="flex flex-col items-center text-center">
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${isToday ? 'text-primary' : 'text-slate-400'}`}>
                            {isToday ? 'Today' : dayData.day}
                          </span>
                          
                          <div className={`w-8 h-8 rounded-full my-3 flex items-center justify-center bg-white border border-slate-100 ${dayData.weatherColor}`}>
                            <WeatherIcon className="w-4 h-4" />
                          </div>
                          
                          <div className="flex flex-col text-xs font-bold text-slate-800">
                            <span>{dayData.tempMax}°</span>
                            <span className="text-[10px] text-slate-400 font-medium mt-0.5">{dayData.tempMin}°</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Bottom Metrics Row (exactly like the screenshot) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 text-slate-700">
                {/* Humidity */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-primary-dark text-white flex items-center justify-center shrink-0">
                    <Droplets className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none mb-1">Humidity</span>
                    <span className="font-extrabold text-slate-800 text-xs leading-none">
                      {current ? `${current.humidity}%` : '65%'}
                    </span>
                  </div>
                </div>

                {/* Wind */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-primary-dark text-white flex items-center justify-center shrink-0">
                    <Wind className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none mb-1">Wind</span>
                    <span className="font-extrabold text-slate-800 text-xs leading-none truncate block">
                      {current ? `${current.windSpeed} km/h` : '12 km/h'}
                    </span>
                  </div>
                </div>

                {/* UV Index */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-primary-dark text-white flex items-center justify-center shrink-0">
                    <Shield className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none mb-1">UV Index</span>
                    <span className="font-extrabold text-slate-800 text-xs leading-none">
                      5 High
                    </span>
                  </div>
                </div>

                {/* Air Quality */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-primary-dark text-white flex items-center justify-center shrink-0">
                    <Activity className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none mb-1">Air Quality</span>
                    <span className="font-extrabold text-slate-800 text-xs leading-none truncate block">
                      {current ? current.airQuality.split(' ')[0] : 'Good'}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
