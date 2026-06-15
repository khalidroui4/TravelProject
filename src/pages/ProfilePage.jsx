import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Heart, MapPin, Trash2, ExternalLink, Loader2, Save, LogOut } from 'lucide-react';
import { backendService } from '../services/backendService';
import { fetchWeather } from '../services/apiService';
import ImageWithLoader from '../components/ImageWithLoader';

export default function ProfilePage({ user, onProfileUpdate, onLogoutSuccess, onCitySelect }) {
  // Profile settings state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);

  // Favorites state
  const [favorites, setFavorites] = useState([]);
  const [favsLoading, setFavsLoading] = useState(true);
  const [favsError, setFavsError] = useState('');
  const [weatherData, setWeatherData] = useState({});

  // Sync state if user prop changes
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  // Fetch user favorites from Laravel backend on mount
  useEffect(() => {
    let active = true;

    const loadFavorites = async () => {
      setFavsLoading(true);
      try {
        const favsList = await backendService.getFavorites();
        if (active) {
          setFavorites(favsList);
          
          // Load weather data for each favorite asynchronously
          favsList.forEach(async (fav) => {
            try {
              const weather = await fetchWeather(fav.lat, fav.lon);
              if (active) {
                setWeatherData(prev => ({
                  ...prev,
                  [fav.id]: weather?.current || null
                }));
              }
            } catch (err) {
              console.error(`Failed to fetch weather for favorite ${fav.city_name}:`, err);
            }
          });
        }
      } catch (err) {
        if (active) {
          setFavsError('Could not load saved destinations.');
        }
      } finally {
        if (active) {
          setFavsLoading(false);
        }
      }
    };

    loadFavorites();

    return () => {
      active = false;
    };
  }, []);

  // Update profile handler
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess('');

    if (!name || !email) {
      setProfileError('Name and email are required.');
      return;
    }

    if (password && password !== passwordConfirmation) {
      setProfileError('Passwords do not match.');
      return;
    }

    setProfileLoading(true);
    try {
      const data = await backendService.updateProfile(name, email, password, passwordConfirmation);
      setProfileSuccess(data.message || 'Profile updated successfully.');
      setPassword('');
      setPasswordConfirmation('');
      if (onProfileUpdate) {
        onProfileUpdate(data.user);
      }
    } catch (err) {
      setProfileError(err.message || 'Failed to update profile.');
    } finally {
      setProfileLoading(false);
    }
  };

  // Remove favorite handler
  const handleRemoveFavorite = async (e, favId) => {
    e.stopPropagation(); // Avoid triggering explore city click
    try {
      await backendService.removeFavorite(favId);
      setFavorites(favorites.filter(f => f.id !== favId));
    } catch (err) {
      alert(err.message || 'Failed to remove from favorites.');
    }
  };

  // Click handler to load city on home map/weather
  const handleExploreFavorite = (fav) => {
    if (onCitySelect) {
      onCitySelect({
        name: fav.city_name,
        country: fav.country_name,
        lat: parseFloat(fav.lat),
        lon: parseFloat(fav.lon)
      });
      window.location.hash = 'home';
    }
  };

  const handleLogoutClick = async () => {
    try {
      await backendService.logout();
      if (onLogoutSuccess) {
        onLogoutSuccess();
      } else {
        window.location.hash = 'home';
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-[#F8FAFC] py-16 text-left">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-slate-200 pb-8">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-full">
              User Dashboard
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-800 mt-4 tracking-tight leading-tight">
              Hello, {user?.name || 'Explorer'}
            </h2>
            <p className="text-grayText text-base font-semibold mt-2">
              Manage your credentials and view your live saved destinations.
            </p>
          </div>
          
          <button
            onClick={handleLogoutClick}
            className="flex items-center gap-2 border border-slate-200 hover:border-red-200 text-slate-600 hover:text-red-600 bg-white hover:bg-red-50 font-bold text-xs px-5 py-3 rounded-xl cursor-pointer transition-all shadow-sm w-fit shrink-0"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Two Columns Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Column 1: Settings Form */}
          <div className="lg:col-span-1 bg-white border border-slate-100 rounded-3xl p-6.5 shadow-sm">
            <h3 className="text-lg font-extrabold text-slate-800 mb-6 flex items-center gap-2.5 font-sans">
              <User className="w-5 h-5 text-primary" />
              <span>Profile Settings</span>
            </h3>

            {profileError && (
              <div className="mb-5 p-3.5 bg-red-50 border-l-4 border-red-500 rounded-r-lg text-xs font-semibold text-red-700">
                {profileError}
              </div>
            )}

            {profileSuccess && (
              <div className="mb-5 p-3.5 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg text-xs font-semibold text-emerald-700">
                {profileSuccess}
              </div>
            )}

            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700">Full Name</label>
                <div className="relative flex items-center bg-slate-50 border border-slate-200 focus-within:border-primary rounded-xl px-4 py-2.5 transition-colors">
                  <User className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 font-semibold text-xs py-1 w-full"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700">Email Address</label>
                <div className="relative flex items-center bg-slate-50 border border-slate-200 focus-within:border-primary rounded-xl px-4 py-2.5 transition-colors">
                  <Mail className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 font-semibold text-xs py-1 w-full"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 font-bold mb-3 uppercase tracking-wider">Change Password (Optional)</p>
                
                <div className="flex flex-col gap-1.5 mb-3">
                  <label className="text-xs font-bold text-slate-700">New Password</label>
                  <div className="relative flex items-center bg-slate-50 border border-slate-200 focus-within:border-primary rounded-xl px-4 py-2.5 transition-colors">
                    <Lock className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Leave blank to keep current"
                      className="bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 font-semibold text-xs py-1 w-full"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700">Confirm Password</label>
                  <div className="relative flex items-center bg-slate-50 border border-slate-200 focus-within:border-primary rounded-xl px-4 py-2.5 transition-colors">
                    <Lock className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                    <input
                      type="password"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      placeholder="Confirm new password"
                      className="bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 font-semibold text-xs py-1 w-full"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={profileLoading}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 border-none transition-all cursor-pointer shadow-sm disabled:opacity-70 mt-4"
              >
                {profileLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>Save Changes</span>
              </button>
            </form>
          </div>

          {/* Column 2: Saved Destinations (Favorites) */}
          <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-6.5 shadow-sm min-h-[400px]">
            <h3 className="text-lg font-extrabold text-slate-800 mb-6 flex items-center gap-2.5 font-sans">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <span>Saved Destinations</span>
            </h3>

            {favsLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-xs text-slate-400 font-bold">Retrieving your favorite cities...</p>
              </div>
            ) : favsError ? (
              <div className="text-center py-16">
                <p className="text-sm font-semibold text-red-500">{favsError}</p>
              </div>
            ) : favorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {favorites.map((fav) => {
                  const weather = weatherData[fav.id];
                  const fallbackImg = 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=400&q=80';
                  const cityImg = fav.image_url || fallbackImg;

                  return (
                    <div
                      key={fav.id}
                      onClick={() => handleExploreFavorite(fav)}
                      className="group cursor-pointer flex flex-col bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-3 shadow-sm hover:shadow-premium transition-all duration-300 relative text-left"
                    >
                      {/* Favorite Image Thumbnail */}
                      <div className="h-32 rounded-xl overflow-hidden relative mb-3 bg-slate-200">
                        <ImageWithLoader
                          src={cityImg}
                          alt={fav.city_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                        
                        {/* Weather overlay */}
                        {weather ? (
                          <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-white/10 text-white text-[10px] font-bold">
                            <span>{weather.temp}°C</span>
                            <span className="opacity-80">•</span>
                            <span>{weather.weatherLabel}</span>
                          </div>
                        ) : (
                          <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-lg text-white text-[9px] font-semibold opacity-70">
                            Loading weather...
                          </div>
                        )}

                        {/* Top action buttons */}
                        <div className="absolute top-2 right-2 flex gap-1.5">
                          {/* Trash Delete button */}
                          <button
                            onClick={(e) => handleRemoveFavorite(e, fav.id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg cursor-pointer border-none transition-colors shadow-sm"
                            title="Remove Favorite"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* City details */}
                      <div className="flex justify-between items-center px-1">
                        <div>
                          <h4 className="font-extrabold text-slate-800 text-sm group-hover:text-primary transition-colors font-sans">
                            {fav.city_name}
                          </h4>
                          <p className="text-[10px] text-grayText font-bold mt-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{fav.country_name}</span>
                          </p>
                        </div>
                        <div className="text-primary hover:text-primary-dark transition-colors">
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 border border-dashed border-slate-200 rounded-2xl bg-slate-50 text-center px-6">
                <Heart className="w-10 h-10 text-slate-300 mb-3" />
                <h4 className="text-sm font-extrabold text-slate-700">No saved destinations yet</h4>
                <p className="text-xs text-slate-500 font-semibold mt-1 max-w-xs">
                  Browse destinations from the home or explore directories, and click the bookmark icon to save them to your account.
                </p>
                <a
                  href="#explore"
                  className="mt-4 inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white font-bold text-[10px] px-4 py-2.5 rounded-xl border-none transition-colors shadow-sm cursor-pointer"
                >
                  Explore Cities
                </a>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
