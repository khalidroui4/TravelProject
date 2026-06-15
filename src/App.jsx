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

// Import New Pages
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CareersPage from './pages/CareersPage';
import FAQPage from './pages/FAQPage';
import FeedbackPage from './pages/FeedbackPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ExplorePage from './pages/ExplorePage';
import TrendingPage from './pages/TrendingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';

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
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  
  // Country Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCountry, setActiveCountry] = useState('');

  // Sync user state from localStorage on mount
  useEffect(() => {
    const userStr = localStorage.getItem('eztravel_user');
    const token = localStorage.getItem('eztravel_token');
    if (userStr && token) {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch (e) {
        localStorage.removeItem('eztravel_user');
        localStorage.removeItem('eztravel_token');
      }
    }
  }, []);

  // Hash Router Listener
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validPages = [
        'home', 'explore', 'trending', 'about', 'contact', 
        'careers', 'privacy', 'terms', 'faq', 'feedback', 
        'signin', 'signup', 'profile'
      ];
      if (hash && validPages.includes(hash)) {
        if (hash === 'profile' && !localStorage.getItem('eztravel_token')) {
          window.location.hash = 'signin';
          return;
        }
        if ((hash === 'signin' || hash === 'signup') && localStorage.getItem('eztravel_token')) {
          window.location.hash = 'profile';
          return;
        }
        setCurrentPage(hash);
      } else {
        setCurrentPage('home');
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run on mount

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
    if (currentPage !== 'home') {
      window.location.hash = 'home';
      setTimeout(() => {
        const searchSection = document.getElementById('root');
        if (searchSection) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    } else {
      const searchSection = document.getElementById('root');
      if (searchSection) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-[#1F2937] font-sans selection:bg-primary/20">
      
      {/* Sticky Navigation Bar */}
      <Navbar onSearchClick={handleTriggerSearch} user={currentUser} onLogoutSuccess={() => setCurrentUser(null)} />

      {/* Main Layout Content */}
      <main className="flex-grow pt-20">
        
        {currentPage === 'home' && (
          <>
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
          </>
        )}

        {currentPage === 'explore' && (
          <ExplorePage onCitySelect={handleCitySelect} onCountryClick={handleCountryClick} />
        )}

        {currentPage === 'trending' && (
          <TrendingPage onCitySelect={handleCitySelect} onCountryClick={handleCountryClick} />
        )}

        {currentPage === 'about' && <AboutPage />}

        {currentPage === 'contact' && <ContactPage />}

        {currentPage === 'careers' && <CareersPage />}

        {currentPage === 'faq' && <FAQPage />}

        {currentPage === 'feedback' && <FeedbackPage />}

        {currentPage === 'privacy' && <PrivacyPage />}

        {currentPage === 'terms' && <TermsPage />}

        {currentPage === 'signin' && (
          <SignInPage onLoginSuccess={(user) => {
            setCurrentUser(user);
            window.location.hash = 'profile';
          }} />
        )}

        {currentPage === 'signup' && (
          <SignUpPage onLoginSuccess={(user) => {
            setCurrentUser(user);
            window.location.hash = 'profile';
          }} />
        )}

        {currentPage === 'profile' && (
          <ProfilePage
            user={currentUser}
            onProfileUpdate={(updatedUser) => setCurrentUser(updatedUser)}
            onLogoutSuccess={() => {
              setCurrentUser(null);
              window.location.hash = 'home';
            }}
            onCitySelect={handleCitySelect}
          />
        )}

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
