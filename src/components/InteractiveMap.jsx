import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation } from 'lucide-react';

// Hand-curated coordinates for cities of interest
const MAP_MARKERS = [
  { name: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522, desc: 'The Romantic Capital' },
  { name: 'Rome', country: 'Italy', lat: 41.9028, lon: 12.4964, desc: 'The Eternal City' },
  { name: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503, desc: 'The Neon Metropolis' },
  { name: 'Dubai', country: 'UAE', lat: 25.2048, lon: 55.2708, desc: 'City of Gold' },
  { name: 'Amsterdam', country: 'Netherlands', lat: 52.3676, lon: 4.9041, desc: 'Venice of the North' },
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278, desc: 'Historic Hub' },
  { name: 'New York', country: 'United States', lat: 40.7128, lon: -74.0060, desc: 'The Big Apple' },
  { name: 'Marrakech', country: 'Morocco', lat: 31.6295, lon: -7.9811, desc: 'Jewel of the South' },
];

// Helper to center and animate map viewpoint movement
function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 9, {
        duration: 2.2,
        easeLinearity: 0.2
      });
    }
  }, [center, map]);
  return null;
}

// Custom Leaflet DivIcon with premium glowing neon pulsing marker styling
const customMarkerIcon = L.divIcon({
  className: 'custom-map-pin',
  html: `
    <div class="flex items-center justify-center w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/40 relative shadow-[0_0_15px_rgba(22,163,74,0.6)]">
      <span class="absolute inline-flex h-full w-full rounded-full bg-emerald-400/35 opacity-75 animate-ping"></span>
      <div class="w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-950 shadow-[0_0_8px_#10b981] relative z-10"></div>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -14],
});

export default function InteractiveMap({ selectedCity, onMarkerClick }) {
  const mapCenter = selectedCity ? [selectedCity.lat, selectedCity.lon] : [48.8566, 2.3522]; // Paris default

  return (
    <div className="w-full h-[450px] md:h-[520px] rounded-3xl overflow-hidden shadow-2xl relative border border-slate-800 bg-slate-950">
      {/* Top Banner overlay indicator */}
      <div className="absolute top-4 left-4 z-[1000] bg-slate-900/95 border border-slate-800 text-white text-xs font-bold px-3.5 py-2.5 rounded-full flex items-center gap-2 shadow-lg backdrop-blur-md">
        <Navigation className="w-3.5 h-3.5 text-primary animate-pulse" />
        <span>Satellite Geotarget (CartoDB Dark Matter)</span>
      </div>

      <MapContainer 
        center={mapCenter} 
        zoom={5} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {/* Custom Marker instances */}
        {MAP_MARKERS.map((marker, index) => (
          <Marker 
            key={index} 
            position={[marker.lat, marker.lon]} 
            icon={customMarkerIcon}
            eventHandlers={{
              click: () => {
                onMarkerClick({
                  name: marker.name,
                  country: marker.country,
                  lat: marker.lat,
                  lon: marker.lon
                });
              }
            }}
          >
            <Popup>
              <div className="p-1 font-sans text-slate-200">
                <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>{marker.name}</span>
                </h4>
                <p className="text-[10px] text-slate-400 mt-1">{marker.desc}</p>
                <div className="mt-2.5 flex justify-end">
                  <span className="text-[9px] font-extrabold bg-primary/20 text-primary border border-primary/20 px-2 py-0.5 rounded-md">
                    View Weather
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        <MapController center={mapCenter} />
      </MapContainer>
    </div>
  );
}
