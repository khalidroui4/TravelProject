// API Service for CityExplore Platform

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || '';

// Beautiful hand-curated high-resolution images for popular cities (Unsplash fallback)
export const CITIES_GALLERY = {
  paris: {
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=150&q=80',
    description: 'The City of Light, famous for its romantic atmosphere, art, fashion, and culinary masterpieces.',
    rating: 4.8,
    country: 'France'
  },
  rome: {
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=150&q=80',
    description: 'A historic metropolis blending nearly 3,000 years of globally influential art, architecture and culture.',
    rating: 4.9,
    country: 'Italy'
  },
  tokyo: {
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=150&q=80',
    description: 'Japan\'s bustling capital, mixing neon skyscrapers with historic temples and world-class sushi.',
    rating: 4.9,
    country: 'Japan'
  },
  dubai: {
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=150&q=80',
    description: 'Known for luxury shopping, ultramodern architecture, lively nightlife scenes, and the Burj Khalifa.',
    rating: 4.7,
    country: 'United Arab Emirates'
  },
  amsterdam: {
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=150&q=80',
    description: 'Famous for its intricate canal system, narrow houses, museum district, and artistic heritage.',
    rating: 4.6,
    country: 'Netherlands'
  },
  london: {
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=150&q=80',
    description: 'The iconic capital of the UK, blending royal history at Buckingham Palace with cutting-edge culture.',
    rating: 4.8,
    country: 'United Kingdom'
  },
  'new york': {
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=150&q=80',
    description: 'The Big Apple, featuring Times Square, Central Park, Broadway shows, and legendary skyscraper views.',
    rating: 4.7,
    country: 'United States'
  },
  marrakech: {
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=150&q=80',
    description: 'A major economic center home to mosques, palaces, gardens, and bustling souk marketplaces.',
    rating: 4.6,
    country: 'Morocco'
  },
  bali: {
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=150&q=80',
    description: 'A tropical paradise famed for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.',
    rating: 4.9,
    country: 'Indonesia'
  }
};

// Map Open-Meteo Weather Codes to Friendly Icons and Text
export function getWeatherDetails(code) {
  const codes = {
    0: { label: 'Clear Sky', icon: 'Sun', color: 'text-amber-500' },
    1: { label: 'Mainly Clear', icon: 'CloudSun', color: 'text-amber-400' },
    2: { label: 'Partly Cloudy', icon: 'CloudSun', color: 'text-slate-400' },
    3: { label: 'Overcast', icon: 'Cloud', color: 'text-slate-500' },
    45: { label: 'Foggy', icon: 'CloudFog', color: 'text-slate-400' },
    48: { label: 'Foggy', icon: 'CloudFog', color: 'text-slate-400' },
    51: { label: 'Light Drizzle', icon: 'CloudDrizzle', color: 'text-sky-400' },
    53: { label: 'Drizzle', icon: 'CloudDrizzle', color: 'text-sky-400' },
    55: { label: 'Heavy Drizzle', icon: 'CloudDrizzle', color: 'text-sky-500' },
    61: { label: 'Slight Rain', icon: 'CloudRain', color: 'text-blue-400' },
    63: { label: 'Moderate Rain', icon: 'CloudRain', color: 'text-blue-500' },
    65: { label: 'Heavy Rain', icon: 'CloudRain', color: 'text-blue-600' },
    71: { label: 'Slight Snow', icon: 'CloudSnow', color: 'text-indigo-200' },
    73: { label: 'Moderate Snow', icon: 'CloudSnow', color: 'text-indigo-300' },
    75: { label: 'Heavy Snow', icon: 'CloudSnow', color: 'text-indigo-400' },
    77: { label: 'Snow Grains', icon: 'CloudSnow', color: 'text-indigo-200' },
    80: { label: 'Slight Showers', icon: 'CloudRain', color: 'text-blue-400' },
    81: { label: 'Showers', icon: 'CloudRain', color: 'text-blue-500' },
    82: { label: 'Violent Showers', icon: 'CloudRain', color: 'text-blue-700' },
    85: { label: 'Slight Snow Showers', icon: 'CloudSnow', color: 'text-indigo-200' },
    86: { label: 'Heavy Snow Showers', icon: 'CloudSnow', color: 'text-indigo-400' },
    95: { label: 'Thunderstorm', icon: 'CloudLightning', color: 'text-purple-500' },
    96: { label: 'Thunderstorm + Hail', icon: 'CloudLightning', color: 'text-purple-600' },
    99: { label: 'Heavy Thunderstorm', icon: 'CloudLightning', color: 'text-purple-700' },
  };
  return codes[code] || { label: 'Partly Cloudy', icon: 'CloudSun', color: 'text-slate-400' };
}

// 1. Weather Service (Open-Meteo)
export async function fetchWeather(lat, lon) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather fetch failed');
    const data = await response.json();
    
    // Format daily forecast
    const dailyForecast = data.daily.time.map((time, idx) => {
      const weatherCode = data.daily.weathercode[idx];
      const details = getWeatherDetails(weatherCode);
      // Format day of week
      const date = new Date(time);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      return {
        day: dayName,
        date: time,
        tempMax: Math.round(data.daily.temperature_2m_max[idx]),
        tempMin: Math.round(data.daily.temperature_2m_min[idx]),
        precipitation: data.daily.precipitation_probability_max[idx] || 0,
        weatherCode,
        weatherLabel: details.label,
        weatherIcon: details.icon,
        weatherColor: details.color,
      };
    });

    const currentWeatherDetails = getWeatherDetails(data.current_weather.weathercode);
    
    // Dynamic Air Quality & humidity estimate based on weather conditions (for widgets)
    const mockHumidity = Math.round(55 + Math.random() * 30);
    const mockAirQuality = data.current_weather.weathercode > 50 ? 'Moderate (65 AQI)' : 'Good (34 AQI)';

    return {
      current: {
        temp: Math.round(data.current_weather.temperature),
        windSpeed: data.current_weather.windspeed,
        weatherCode: data.current_weather.weathercode,
        weatherLabel: currentWeatherDetails.label,
        weatherIcon: currentWeatherDetails.icon,
        weatherColor: currentWeatherDetails.color,
        humidity: mockHumidity,
        airQuality: mockAirQuality,
      },
      forecast: dailyForecast,
    };
  } catch (error) {
    console.error('Weather fetch error:', error);
    // Provide a beautiful fallback forecast
    return {
      current: { temp: 22, windSpeed: 12, weatherLabel: 'Mainly Clear', weatherIcon: 'Sun', weatherColor: 'text-amber-500', humidity: 60, airQuality: 'Good (30 AQI)' },
      forecast: [
        { day: 'Mon', tempMax: 24, tempMin: 15, precipitation: 10, weatherIcon: 'Sun', weatherLabel: 'Clear Sky', weatherColor: 'text-amber-500' },
        { day: 'Tue', tempMax: 26, tempMin: 16, precipitation: 0, weatherIcon: 'Sun', weatherLabel: 'Clear Sky', weatherColor: 'text-amber-500' },
        { day: 'Wed', tempMax: 22, tempMin: 14, precipitation: 40, weatherIcon: 'CloudRain', weatherLabel: 'Showers', weatherColor: 'text-blue-400' },
        { day: 'Thu', tempMax: 21, tempMin: 13, precipitation: 60, weatherIcon: 'CloudRain', weatherLabel: 'Heavy Rain', weatherColor: 'text-blue-500' },
        { day: 'Fri', tempMax: 23, tempMin: 14, precipitation: 20, weatherIcon: 'CloudSun', weatherLabel: 'Partly Cloudy', weatherColor: 'text-slate-400' },
        { day: 'Sat', tempMax: 25, tempMin: 15, precipitation: 0, weatherIcon: 'Sun', weatherLabel: 'Clear Sky', weatherColor: 'text-amber-500' },
        { day: 'Sun', tempMax: 27, tempMin: 16, precipitation: 10, weatherIcon: 'Sun', weatherLabel: 'Clear Sky', weatherColor: 'text-amber-500' },
      ]
    };
  }
}

// 2. City Geocoding / Search Service (Nominatim OpenStreetMap)
// Helps find coordinates and details of ANY searched city in the world
export async function searchCities(query) {
  if (!query || query.length < 2) return [];
  
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1`;
    const response = await fetch(url, {
      headers: {
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    if (!response.ok) throw new Error('Geocoding search failed');
    const data = await response.json();

    // Map responses to clean structure
    return data
      .filter(item => item.address && (item.address.city || item.address.town || item.address.village || item.address.county))
      .map(item => {
        const cityName = item.address.city || item.address.town || item.address.village || item.address.county;
        const countryName = item.address.country;
        const displayName = `${cityName}, ${countryName}`;
        
        return {
          name: cityName,
          country: countryName,
          displayName,
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
          bbox: item.boundingbox,
        };
      });
  } catch (error) {
    console.error('City search API error:', error);
    
    // Provide offline matching from our popular gallery for quick UX
    const searchString = query.toLowerCase();
    return Object.keys(CITIES_GALLERY)
      .filter(key => key.includes(searchString))
      .map(key => {
        const item = CITIES_GALLERY[key];
        const coordinates = {
          paris: { lat: 48.8566, lon: 2.3522 },
          rome: { lat: 41.9028, lon: 12.4964 },
          tokyo: { lat: 35.6762, lon: 139.6503 },
          dubai: { lat: 25.2048, lon: 55.2708 },
          amsterdam: { lat: 52.3676, lon: 4.9041 },
          london: { lat: 51.5074, lon: -0.1278 },
          'new york': { lat: 40.7128, lon: -74.0060 },
          marrakech: { lat: 31.6295, lon: -7.9811 },
          bali: { lat: -8.4095, lon: 115.1889 },
        };
        const coords = coordinates[key] || { lat: 0, lon: 0 };
        return {
          name: key.charAt(0).toUpperCase() + key.slice(1),
          country: item.country,
          displayName: `${key.charAt(0).toUpperCase() + key.slice(1)}, ${item.country}`,
          lat: coords.lat,
          lon: coords.lon,
        };
      });
  }
}

// 3. Country Information Service (REST Countries)
export async function fetchCountryDetails(countryName) {
  try {
    const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`;
    const response = await fetch(url);
    if (!response.ok) {
      // Try fuzzy match
      const fuzzyUrl = `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`;
      const fuzzyResp = await fetch(fuzzyUrl);
      if (!fuzzyResp.ok) throw new Error('Country fetch failed');
      const fuzzyData = await fuzzyResp.json();
      return formatCountryData(fuzzyData[0]);
    }
    const data = await response.json();
    return formatCountryData(data[0]);
  } catch (error) {
    console.error('REST Countries API error:', error);
    return null;
  }
}

function formatCountryData(country) {
  const currencyKey = Object.keys(country.currencies || {})[0];
  const currency = currencyKey ? country.currencies[currencyKey] : null;
  const langKeys = Object.keys(country.languages || {});
  const languages = langKeys.map(k => country.languages[k]).slice(0, 3).join(', ');

  return {
    name: country.name.common,
    officialName: country.name.official,
    flag: country.flags.svg || country.flags.png,
    flagAlt: country.flags.alt || `Flag of ${country.name.common}`,
    capital: country.capital ? country.capital[0] : 'N/A',
    region: country.region,
    subregion: country.subregion || 'N/A',
    population: country.population ? country.population.toLocaleString() : 'N/A',
    currencyName: currency ? `${currency.name} (${currency.symbol || ''})` : 'N/A',
    languages: languages || 'N/A',
    mapLink: country.maps.googleMaps,
  };
}

// 4. City Images Service (Unsplash with hand-curated fallback)
export async function fetchCityImage(cityName) {
  const normalizedCity = cityName.toLowerCase().trim();
  
  // Use our gorgeous fallback immediately if it exists in our gallery
  if (CITIES_GALLERY[normalizedCity]) {
    return CITIES_GALLERY[normalizedCity].image;
  }

  // If we have an API key, we fetch from Unsplash
  if (UNSPLASH_ACCESS_KEY) {
    try {
      const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(cityName)}+city+travel&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1&orientation=landscape`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Unsplash fetch failed');
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].urls.regular;
      }
    } catch (e) {
      console.warn('Unsplash API key error, falling back to Source Unsplash URLs:', e);
    }
  }

  // Generic stunning unsplash images based on query for non-cataloged cities
  return `https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1600&q=80`; // Fallback cityscape
}
