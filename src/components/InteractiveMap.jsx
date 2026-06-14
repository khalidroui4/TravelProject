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
      map.flyTo(center, 10, {
        duration: 2.0,
        easeLinearity: 0.25
      });
    }
  }, [center, map]);
  return null;
}

// Custom Leaflet DivIcon with premium green pulsing marker styling
const customMarkerIcon = L.divIcon({
  className: 'custom-map-pin',
  html: `
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/60 shadow-lg relative">
      <span class="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
      <div class="w-3.5 h-3.5 bg-emerald-600 rounded-full border border-white shadow-inner relative z-10"></div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -12],
});

export default function InteractiveMap({ selectedCity, onMarkerClick }) {
  const mapCenter = selectedCity ? [selectedCity.lat, selectedCity.lon] : [48.8566, 2.3522]; // Paris default

  return (
    <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-premium relative border border-slate-200 bg-slate-100">
      {/* Top Banner overlay indicator */}
      <div className="absolute top-4 left-4 z-[1000] bg-white border border-slate-200/80 text-slate-800 text-xs font-bold px-3.5 py-2 rounded-full flex items-center gap-2 shadow-md">
        <Navigation className="w-3.5 h-3.5 text-primary animate-pulse" />
        <span>Interactive Travel Map (CartoDB Voyager)</span>
      </div>

      <MapContainer 
        center={mapCenter} 
        zoom={5} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
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
              <div className="p-1 font-sans">
                <h4 className="font-bold text-sm text-slate-800 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>{marker.name}</span>
                </h4>
                <p className="text-[10px] text-grayText mt-0.5">{marker.desc}</p>
                <div className="mt-1.5 flex justify-end">
                  <span className="text-[9px] font-bold bg-emerald-50 text-primary px-1.5 py-0.5 rounded-full">
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
