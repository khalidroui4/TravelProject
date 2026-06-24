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
  Activity,
  Calendar
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
  
  // Format current date beautifully
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="w-full max-w-sm bg-slate-900/60 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-2xl text-white relative overflow-hidden transition-all duration-300 hover:shadow-glass-hover hover:-translate-y-0.5">
      
      {/* Background glow design */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#38BDF8]/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-primary/20 rounded-full blur-2xl pointer-events-none" />

      {/* Header with Date and Subtitle */}
      <div className="flex items-center justify-between gap-4 mb-4 relative z-10">
        <span className="text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/15 px-2.5 py-1 rounded-md border border-accent/10">
          Live Weather
        </span>
        <div className="flex items-center gap-1.5 text-[10px] text-white/70 font-semibold uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5 text-accent" />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* City Thumbnail & Info */}
      <div className="flex items-center gap-4.5 mb-5 pb-4 border-b border-white/10 relative z-10 text-left">
        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/20 shadow-md shrink-0 bg-slate-800">
          <img 
            src={imageThumbnail} 
            alt={cityName}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="min-w-0">
          <h3 className="text-xl font-bold tracking-tight text-white truncate leading-tight font-sans">{cityName}</h3>
          <p className="text-xs text-white/60 truncate mt-0.5">{countryName}</p>
        </div>
      </div>

      {/* Main Temperature and Icon Display */}
      <div className="flex items-center justify-between gap-4 mb-6 relative z-10 text-left">
        <div>
          <div className="flex items-start">
            <span className="text-5xl font-black tracking-tighter text-white font-sans">
              {weather.temp}
            </span>
            <span className="text-2xl font-bold text-accent mt-1 pl-0.5">°C</span>
          </div>
          <span className="text-xs font-bold text-white/95 mt-1 block">
            {weather.weatherLabel}
          </span>
        </div>
        
        <div className={`w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 shadow-inner ${weather.weatherColor}`}>
          <WeatherIcon className="w-8 h-8 drop-shadow-[0_2px_8px_rgba(255,255,255,0.25)] animate-pulse-slow" />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-2.5 text-center relative z-10 text-xs">
        
        {/* Humidity */}
        <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center">
          <Droplets className="w-4 h-4 text-sky-400 mb-1.5" />
          <span className="text-white/60 block text-[9px] font-bold uppercase tracking-wider mb-0.5">Humidity</span>
          <span className="font-extrabold text-white text-xs">{weather.humidity}%</span>
        </div>

        {/* Wind Speed */}
        <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center">
          <Wind className="w-4 h-4 text-accent mb-1.5" />
          <span className="text-white/60 block text-[9px] font-bold uppercase tracking-wider mb-0.5">Wind</span>
          <span className="font-extrabold text-white text-xs">{weather.windSpeed} km/h</span>
        </div>

        {/* Air Quality */}
        <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center col-span-1">
          <Activity className="w-4 h-4 text-emerald-400 mb-1.5" />
          <span className="text-white/60 block text-[9px] font-bold uppercase tracking-wider mb-0.5">Air Quality</span>
          <span className="font-extrabold text-white text-[10px] truncate w-full max-w-full">
            {weather.airQuality && typeof weather.airQuality === 'string' 
              ? weather.airQuality.split(' ')[0] 
              : 'Good'}
          </span>
        </div>

      </div>

    </div>
  );
}
