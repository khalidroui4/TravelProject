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
  Droplets,
  Wind,
  Shield,
  Activity,
  Loader2,
  Globe,
  MapPin,
  Clock,
  Compass
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
    <section id="map-weather" className="py-20 bg-slate-950 border-b border-slate-900 relative overflow-hidden text-white">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            Command Center
          </span>
          <h3 className="text-3xl lg:text-4xl font-extrabold text-white mt-4 font-sans tracking-tight">
            Interactive Geography & Weather
          </h3>
          <p className="text-sm text-slate-400 mt-2 font-medium max-w-xl mx-auto">
            Cross-reference live weather telemetry, coordinate telemetry, and geographical maps.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Dark Theme Map */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <InteractiveMap 
              selectedCity={selectedCity} 
              onMarkerClick={onCitySelect} 
            />
          </div>

          {/* Right: Glass Weather & Command Center Insights */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Glass Weather Card */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col justify-between text-left">
              
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-4">
                <div>
                  <h4 className="font-bold text-white text-base font-sans uppercase tracking-wider flex items-center gap-1.5">
                    <CloudSun className="w-4 h-4 text-accent" />
                    Weather Forecast
                  </h4>
                  <p className="text-xs text-slate-450 mt-1 font-semibold">
                    {selectedCity.name}, {selectedCity.country}
                  </p>
                </div>
                
                <span className="text-[10px] font-bold bg-white/5 border border-white/10 text-slate-350 px-2 py-0.5 rounded-md uppercase tracking-wider">
                  7-Day Telemetry
                </span>
              </div>

              {/* Horizontal 7-Day Forecast Row */}
              <div className="py-4 border-b border-white/10">
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
                          
                          <div className={`w-8 h-8 rounded-full my-3 flex items-center justify-center bg-white/5 border border-white/10 ${dayData.weatherColor}`}>
                            <WeatherIcon className="w-4 h-4" />
                          </div>
                          
                          <div className="flex flex-col text-[11px] font-extrabold text-white">
                            <span>{dayData.tempMax}°</span>
                            <span className="text-[9px] text-slate-400 font-medium mt-0.5">{dayData.tempMin}°</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Bottom Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 text-white/95">
                {/* Humidity */}
                <div className="flex items-center gap-2.5">
                  <div className="w-8.5 h-8.5 rounded-xl bg-white/5 border border-white/10 text-primary-accent flex items-center justify-center shrink-0">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 text-left">
                    <span className="text-[8px] text-slate-400 font-bold block uppercase leading-none mb-1">Humidity</span>
                    <span className="font-extrabold text-white text-[11px] leading-none">
                      {current ? `${current.humidity}%` : '65%'}
                    </span>
                  </div>
                </div>

                {/* Wind */}
                <div className="flex items-center gap-2.5">
                  <div className="w-8.5 h-8.5 rounded-xl bg-white/5 border border-white/10 text-primary-accent flex items-center justify-center shrink-0">
                    <Wind className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 text-left">
                    <span className="text-[8px] text-slate-400 font-bold block uppercase leading-none mb-1">Wind</span>
                    <span className="font-extrabold text-white text-[11px] leading-none truncate block">
                      {current ? `${current.windSpeed} km/h` : '12 km/h'}
                    </span>
                  </div>
                </div>

                {/* UV Index */}
                <div className="flex items-center gap-2.5">
                  <div className="w-8.5 h-8.5 rounded-xl bg-white/5 border border-white/10 text-primary-accent flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 text-left">
                    <span className="text-[8px] text-slate-400 font-bold block uppercase leading-none mb-1">UV Index</span>
                    <span className="font-extrabold text-white text-[11px] leading-none">
                      5 High
                    </span>
                  </div>
                </div>

                {/* Air Quality */}
                <div className="flex items-center gap-2.5">
                  <div className="w-8.5 h-8.5 rounded-xl bg-white/5 border border-white/10 text-primary-accent flex items-center justify-center shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 text-left">
                    <span className="text-[8px] text-slate-400 font-bold block uppercase leading-none mb-1">Air Quality</span>
                    <span className="font-extrabold text-white text-[11px] leading-none truncate block">
                      {current ? current.airQuality.split(' ')[0] : 'Good'}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Destination Insights Card */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col justify-between text-left">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <h4 className="font-bold text-white text-base font-sans uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-accent" />
                  Destination Insights
                </h4>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="grid grid-cols-2 gap-4.5 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-450 mt-0.5 shrink-0" />
                  <div className="text-left">
                    <span className="text-slate-450 block text-[9px] font-bold uppercase tracking-wider leading-none mb-1">Positioning</span>
                    <span className="font-mono font-bold text-[11px] text-white">
                      Lat: {selectedCity.lat?.toFixed(4)}°<br/>
                      Lon: {selectedCity.lon?.toFixed(4)}°
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Globe className="w-4 h-4 text-slate-450 mt-0.5 shrink-0" />
                  <div className="text-left">
                    <span className="text-slate-450 block text-[9px] font-bold uppercase tracking-wider leading-none mb-1">Continent Zone</span>
                    <span className="font-bold text-[11px] text-white block mt-0.5 truncate">
                      {selectedCity.country}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 col-span-2 border-t border-white/5 pt-3">
                  <Clock className="w-4 h-4 text-slate-450 mt-0.5 shrink-0" />
                  <div className="flex-1 flex items-center justify-between text-left">
                    <div>
                      <span className="text-slate-450 block text-[9px] font-bold uppercase tracking-wider leading-none mb-1">Command Sync</span>
                      <span className="font-semibold text-[11px] text-white">
                        Standard Local Coordinate Time
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-accent">
                      UTC {selectedCity.lon ? (selectedCity.lon >= 0 ? '+' : '') + Math.round(selectedCity.lon / 15) : '+0'}
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
