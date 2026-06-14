import React from 'react';
import { 
  Sun, 
  CloudSun, 
  Cloud, 
  CloudFog, 
  CloudDrizzle, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  Wind, 
  Droplets, 
  Compass,
  Activity
} from 'lucide-react';

const ICON_MAP = {
  Sun: Sun,
  CloudSun: CloudSun,
  Cloud: Cloud,
  CloudFog: CloudFog,
  CloudDrizzle: CloudDrizzle,
  CloudRain: CloudRain,
  CloudSnow: CloudSnow,
  CloudLightning: CloudLightning
};

export default function WeatherWidget({ cityName, countryName, weather, imageThumbnail }) {
  if (!weather) return null;

  const WeatherIcon = ICON_MAP[weather.weatherIcon] || CloudSun;
  
  return (
    <div className="w-full max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-2xl text-white relative overflow-hidden transition-all duration-300 hover:shadow-glass-hover">
      
      {/* Background glow design */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#38BDF8]/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-emerald-400/15 rounded-full blur-2xl pointer-events-none" />

      {/* Header with City Image Thumbnail and Details */}
      <div className="flex items-center gap-4 mb-5 pb-4 border-b border-white/10 relative z-10">
        <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/20 shadow-md shrink-0">
          <img 
            src={imageThumbnail} 
            alt={cityName}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="min-w-0 text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Live Weather</span>
          <h3 className="text-xl font-bold font-sans text-white truncate leading-tight">{cityName}</h3>
          <p className="text-xs text-white/75 truncate">{countryName}</p>
        </div>
      </div>

      {/* Main Temperature and Icon Display */}
      <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="flex items-start">
            <span className="text-5xl font-extrabold tracking-tighter text-white font-sans">
              {weather.temp}
            </span>
            <span className="text-2xl font-bold text-emerald-300 mt-1">°C</span>
          </div>
          <span className="text-sm font-semibold text-white/95 mt-1 block">
            {weather.weatherLabel}
          </span>
        </div>
        
        <div className={`w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 ${weather.weatherColor}`}>
          <WeatherIcon className="w-10 h-10 drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)] animate-pulse-slow" />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-2 text-center relative z-10 text-xs">
        
        {/* Humidity */}
        <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 flex flex-col items-center justify-center">
          <Droplets className="w-4 h-4 text-emerald-300 mb-1" />
          <span className="text-white/60 block text-[10px] font-medium mb-0.5">Humidity</span>
          <span className="font-bold text-white text-xs">{weather.humidity}%</span>
        </div>

        {/* Wind Speed */}
        <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 flex flex-col items-center justify-center">
          <Wind className="w-4 h-4 text-sky-300 mb-1" />
          <span className="text-white/60 block text-[10px] font-medium mb-0.5">Wind</span>
          <span className="font-bold text-white text-xs">{weather.windSpeed} km/h</span>
        </div>

        {/* Air Quality */}
        <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 flex flex-col items-center justify-center col-span-1">
          <Activity className="w-4 h-4 text-amber-300 mb-1" />
          <span className="text-white/60 block text-[10px] font-medium mb-0.5">Air Quality</span>
          <span className="font-bold text-white text-[10px] truncate w-full max-w-full">
            {weather.airQuality && typeof weather.airQuality === 'string' 
              ? weather.airQuality.split(' ')[0] 
              : 'Good'}
          </span>
        </div>

      </div>

    </div>
  );
}
