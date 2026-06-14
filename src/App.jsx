import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CountryModal from './components/CountryModal';
import Hero from './sections/Hero';
import QuickAccess from './sections/QuickAccess';
import Trending from './sections/Trending';
import ExploreGrid from './sections/ExploreGrid';
import BestPlaces from './sections/BestPlaces';
import MapAndWeather from './sections/MapAndWeather';
import CultureGuides from './sections/CultureGuides';
import WhyChooseUs from './sections/WhyChooseUs';
import Testimonials from './sections/Testimonials';
import Newsletter from './sections/Newsletter';

import { fetchWeather, fetchCityImage } from './services/apiService';

// Default starter city: Paris
const DEFAULT_CITY = {
  name: 'Paris',
  country: 'France',
  lat: 48.8566,
  lon: 2.3522
};

export default function App() {
  const [selectedCity, setSelectedCity] = useState(DEFAULT_CITY);
  const [weatherData, setWeatherData] = useState(null);
  const [cityImage, setCityImage] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Country Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCountry, setActiveCountry] = useState('');

  // Fetch weather and landscape image when selectedCity changes
  useEffect(() => {
    let active = true;
    
    const loadCityData = async () => {
      setLoading(true);
      try {
        const [weather, imgUrl] = await Promise.all([
          fetchWeather(selectedCity.lat, selectedCity.lon),
          fetchCityImage(selectedCity.name)
        ]);

        if (active) {
          setWeatherData(weather);
          setCityImage(imgUrl);
        }
      } catch (err) {
        console.error('Failed to load city data:', err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadCityData();

    return () => {
      active = false;
    };
  }, [selectedCity]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleCountryClick = (countryName) => {
    setActiveCountry(countryName);
    setIsModalOpen(true);
  };

  const handleTriggerSearch = () => {
    // Scroll smoothly to search input in Hero section
    const searchSection = document.getElementById('root');
    if (searchSection) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-[#1F2937] font-sans selection:bg-primary/20">
      
      {/* Sticky Navigation Bar */}
      <Navbar onSearchClick={handleTriggerSearch} />

      {/* Main Layout Content */}
      <main className="flex-grow">
        
        {/* Section 1: Hero Section */}
        <Hero
          selectedCity={selectedCity}
          weatherData={weatherData}
          cityImage={cityImage}
          onCitySelect={handleCitySelect}
          onCountryClick={handleCountryClick}
        />

        {/* Section 2: Quick Access Categories */}
        <QuickAccess />

        {/* Section 3: Trending Destinations */}
        <Trending 
          onCitySelect={handleCitySelect} 
          onCountryClick={handleCountryClick} 
        />

        {/* Section 4: Explore Cities Grid */}
        <ExploreGrid 
          onCitySelect={handleCitySelect} 
          onCountryClick={handleCountryClick} 
        />

        {/* Section 5: Best Places to Visit recommendations columns */}
        <BestPlaces />

        {/* Section 6: Interactive Leaflet Map & Weather Forecast table */}
        <MapAndWeather
          selectedCity={selectedCity}
          weatherData={weatherData}
          onCitySelect={handleCitySelect}
          loading={loading}
        />

        {/* Section 7: Culture and Travel Articles */}
        <CultureGuides onCitySelect={handleCitySelect} />

        {/* Section 8: Why Choose Us highlights */}
        <WhyChooseUs />

        {/* Section 9: Traveler Testimonials review slider */}
        <Testimonials />

        {/* Section 10: Email Subscription Newsletter */}
        <Newsletter />

      </main>

      {/* Section 11: Professional Page Footer */}
      <Footer />

      {/* REST Countries Demographics Modal */}
      <CountryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        countryName={activeCountry}
      />

    </div>
  );
}
