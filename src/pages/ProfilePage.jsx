import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Heart, MapPin, Trash2, ExternalLink, Loader2, Save, LogOut, Users, Shield, X } from 'lucide-react';
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

  // Admin panel state
  const isAdmin = user?.role === 'admin';
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'admin'
  const [usersList, setUsersList] = useState([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState('');

  const loadAdminUsers = async () => {
    setAdminLoading(true);
    setAdminError('');
    try {
      const data = await backendService.getAdminUsers();
      setUsersList(data);
    } catch (err) {
      setAdminError(err.message || 'Failed to load user list.');
    } finally {
      setAdminLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin && activeTab === 'admin') {
      loadAdminUsers();
    }
  }, [activeTab, isAdmin]);

  const [userToDelete, setUserToDelete] = useState(null);

  const handleDeleteUserClick = (u) => {
    setUserToDelete(u);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;
    const userId = userToDelete.id;
    const userName = userToDelete.name;
    setUserToDelete(null);
    try {
      await backendService.deleteAdminUser(userId);
      setUsersList(prev => prev.filter(u => u.id !== userId));
      window.showToast?.(`User ${userName} deleted successfully.`, 'success');
    } catch (err) {
      window.showToast?.(err.message || 'Failed to delete user.', 'error');
    }
  };

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
      window.showToast?.('Destination removed from favorites.', 'success');
    } catch (err) {
      window.showToast?.(err.message || 'Failed to remove from favorites.', 'error');
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

  const [selectedFavDetails, setSelectedFavDetails] = useState(null);
  const [countryDetails, setCountryDetails] = useState(null);
  const [loadingCountry, setLoadingCountry] = useState(false);

  useEffect(() => {
    if (selectedFavDetails) {
      setLoadingCountry(true);
      setCountryDetails(null);
      backendService.getCountryDetails(selectedFavDetails.country_name)
        .then(details => {
          setCountryDetails(details);
        })
        .catch(err => console.error(err))
        .finally(() => setLoadingCountry(false));
    }
  }, [selectedFavDetails]);

  const handleCardClick = (fav) => {
    setSelectedFavDetails(fav);
  };

  const handleExploreFromModal = () => {
    if (selectedFavDetails && onCitySelect) {
      onCitySelect({
        name: selectedFavDetails.city_name,
        country: selectedFavDetails.country_name,
        lat: parseFloat(selectedFavDetails.lat),
        lon: parseFloat(selectedFavDetails.lon)
      });
      setSelectedFavDetails(null);
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
              {isAdmin ? 'Admin Portal' : 'User Dashboard'}
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-800 mt-4 tracking-tight leading-tight">
              Hello, {user?.name || 'Explorer'}
            </h2>
            <p className="text-grayText text-base font-semibold mt-2">
              {isAdmin
                ? 'System administration and user metrics overview.'
                : 'Manage your credentials and view your live saved destinations.'}
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {isAdmin && (
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-4 py-2.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                    activeTab === 'profile'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  My Profile
                </button>
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`px-4 py-2.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                    activeTab === 'admin'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Admin Panel
                </button>
              </div>
            )}

            <button
              onClick={handleLogoutClick}
              className="flex items-center gap-2 border border-slate-200 hover:border-red-200 text-slate-600 hover:text-red-600 bg-white hover:bg-red-50 font-bold text-xs px-5 py-3 rounded-xl cursor-pointer transition-all shadow-sm w-fit shrink-0"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {activeTab === 'profile' ? (
          /* Two Columns Dashboard */
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
                      autoComplete="name"
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
                      autoComplete="email"
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
                        autoComplete="new-password"
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
                        autoComplete="new-password"
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
                        onClick={() => handleCardClick(fav)}
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
        ) : (
          /* Admin Panel View */
          <div className="space-y-8 animate-fadeIn">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Users</p>
                  <h4 className="text-2xl font-extrabold text-slate-800 mt-1">{usersList.length}</h4>
                </div>
              </div>
              
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-violet-50 text-violet-600 rounded-xl">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Administrators</p>
                  <h4 className="text-2xl font-extrabold text-slate-800 mt-1">
                    {usersList.filter(u => u.role === 'admin').length}
                  </h4>
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Saved Favorites</p>
                  <h4 className="text-2xl font-extrabold text-slate-800 mt-1">
                    {usersList.reduce((acc, u) => acc + (u.favorites_count || 0), 0)}
                  </h4>
                </div>
              </div>
            </div>

            {/* User List Table card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6.5 shadow-sm min-h-[400px]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
                <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-2.5 font-sans">
                  <Users className="w-5 h-5 text-primary" />
                  <span>User Management</span>
                </h3>
                <button
                  onClick={loadAdminUsers}
                  disabled={adminLoading}
                  className="text-xs font-bold text-primary hover:text-primary-dark transition-colors border-none bg-transparent cursor-pointer flex items-center gap-1"
                >
                  {adminLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                  <span>Refresh List</span>
                </button>
              </div>

              {adminError && (
                <div className="mb-5 p-3.5 bg-red-50 border-l-4 border-red-500 rounded-r-lg text-xs font-semibold text-red-700">
                  {adminError}
                </div>
              )}

              {adminLoading && usersList.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  <p className="text-xs text-slate-400 font-bold">Loading registered users...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
                        <th className="pb-3 font-bold pl-2">User Details</th>
                        <th className="pb-3 font-bold">Role</th>
                        <th className="pb-3 font-bold text-center">Saved Favorites</th>
                        <th className="pb-3 font-bold">Joined Date</th>
                        <th className="pb-3 font-bold text-right pr-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {usersList.map((u) => {
                        const initials = u.name ? u.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'EX';
                        const isCurrentUser = u.id === user?.id;
                        
                        return (
                          <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-4 pl-2">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary/20 to-blue-500/20 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                                  {initials}
                                </div>
                                <div>
                                  <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                                    <span>{u.name}</span>
                                    {isCurrentUser && (
                                      <span className="bg-slate-100 text-slate-600 text-[9px] font-bold px-1.5 py-0.5 rounded">You</span>
                                    )}
                                  </h4>
                                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5 flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    <span>{u.email}</span>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                u.role === 'admin' 
                                  ? 'bg-violet-50 text-violet-700 border border-violet-100' 
                                  : 'bg-slate-100 text-slate-700 border border-slate-200/50'
                              }`}>
                                {u.role === 'admin' ? (
                                  <>
                                    <Shield className="w-2.5 h-2.5" />
                                    <span>Admin</span>
                                  </>
                                ) : (
                                  <span>User</span>
                                )}
                              </span>
                            </td>
                            <td className="py-4 text-center">
                              <span className="text-xs font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                {u.favorites_count ?? 0}
                              </span>
                            </td>
                            <td className="py-4 text-xs font-bold text-slate-500">
                              {new Date(u.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </td>
                            <td className="py-4 text-right pr-2">
                              <button
                                onClick={() => handleDeleteUserClick(u)}
                                disabled={isCurrentUser}
                                className={`p-2 rounded-xl border-none transition-colors shadow-sm cursor-pointer ${
                                  isCurrentUser
                                    ? 'bg-slate-50 text-slate-300 cursor-not-allowed'
                                    : 'bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600'
                                }`}
                                title={isCurrentUser ? "Cannot delete yourself" : "Delete User"}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Delete User Confirmation Modal */}
      {userToDelete && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/55 backdrop-blur-sm px-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-6.5 max-w-sm w-full shadow-2xl text-left">
            <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-2 font-sans">
              <Shield className="w-5 h-5 text-red-500" />
              <span>Confirm Deletion</span>
            </h3>
            <p className="text-xs text-grayText font-semibold mt-3.5 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-800">{userToDelete.name}</strong>? All their favorites and details will be permanently removed.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setUserToDelete(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer border-none"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteUser}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer border-none shadow-sm"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Destination Details Modal */}
      {selectedFavDetails && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/55 backdrop-blur-sm px-6 py-6 overflow-y-auto">
          <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl text-left flex flex-col max-h-[90vh]">
            
            {/* Header image banner */}
            <div className="h-48 relative shrink-0 bg-slate-200">
              <ImageWithLoader
                src={selectedFavDetails.image_url || 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=600&q=80'}
                alt={selectedFavDetails.city_name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
              
              {/* Close Button overlay */}
              <button
                onClick={() => setSelectedFavDetails(null)}
                className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white p-2 rounded-full border-none cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title Overlay */}
              <div className="absolute bottom-4 left-6 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-primary px-2 py-0.5 rounded-md text-white">
                  Destination Info
                </span>
                <h3 className="text-2xl font-extrabold font-sans mt-1 leading-tight flex items-center gap-2">
                  <span>{selectedFavDetails.city_name}</span>
                  {countryDetails?.flag && (
                    <img 
                      src={countryDetails.flag} 
                      alt={countryDetails.flagAlt} 
                      className="w-6 h-4 object-cover rounded shadow-sm inline-block border border-white/20"
                    />
                  )}
                </h3>
                <p className="text-xs text-white/85 font-semibold mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-300" />
                  <span>{selectedFavDetails.country_name}</span>
                </p>
              </div>
            </div>

            {/* Scrollable details content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Weather section */}
              {weatherData[selectedFavDetails.id] ? (
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between">
                  <div className="space-y-1 text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Weather</p>
                    <h4 className="text-xl font-extrabold text-slate-800 font-sans">
                      {weatherData[selectedFavDetails.id].temp}°C
                    </h4>
                    <p className="text-xs text-slate-600 font-bold">
                      {weatherData[selectedFavDetails.id].weatherLabel}
                    </p>
                  </div>
                  <div className="text-right text-[11px] font-bold text-slate-500 space-y-1">
                    <p>💨 Wind: {weatherData[selectedFavDetails.id].windSpeed} km/h</p>
                    <p>💧 Humidity: {weatherData[selectedFavDetails.id].humidity}%</p>
                    <p>🍃 AQI: {weatherData[selectedFavDetails.id].airQuality}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center py-6">
                  <Loader2 className="w-5 h-5 text-primary animate-spin mx-auto mb-1.5" />
                  <p className="text-xs text-slate-400 font-bold">Fetching current weather condition...</p>
                </div>
              )}

              {/* Geographic Coordinates & Rating */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-left">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Latitude</p>
                  <p className="text-xs font-extrabold text-slate-700 mt-1 font-mono">{parseFloat(selectedFavDetails.lat).toFixed(4)}</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-left">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Longitude</p>
                  <p className="text-xs font-extrabold text-slate-700 mt-1 font-mono">{parseFloat(selectedFavDetails.lon).toFixed(4)}</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-left">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Global Rating</p>
                  <p className="text-xs font-extrabold text-amber-600 mt-1 flex items-center gap-1">
                    <span>★</span>
                    <span>{selectedFavDetails.rating || '4.5'}</span>
                  </p>
                </div>
              </div>

              {/* Country Demographics from REST Countries API */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-1.5 font-sans">
                  Country Profile Details
                </h4>
                
                {loadingCountry ? (
                  <div className="flex items-center gap-2 py-4 justify-center">
                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                    <p className="text-xs text-slate-400 font-bold">Querying Rest Countries details...</p>
                  </div>
                ) : countryDetails ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs text-slate-700 text-left">
                    <div className="flex justify-between border-b border-slate-50 pb-1">
                      <span className="font-semibold text-slate-400">Capital City</span>
                      <span className="font-bold text-slate-800">{countryDetails.capital}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-1">
                      <span className="font-semibold text-slate-400">Total Population</span>
                      <span className="font-bold text-slate-800">{countryDetails.population}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-1">
                      <span className="font-semibold text-slate-400">Region</span>
                      <span className="font-bold text-slate-800">{countryDetails.region} ({countryDetails.subregion})</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-1">
                      <span className="font-semibold text-slate-400">Currency</span>
                      <span className="font-bold text-slate-800">{countryDetails.currencyName}</span>
                    </div>
                    <div className="col-span-1 sm:col-span-2 flex justify-between border-b border-slate-50 pb-1">
                      <span className="font-semibold text-slate-400">Languages</span>
                      <span className="font-bold text-slate-800 truncate max-w-[180px] sm:max-w-none" title={countryDetails.languages}>
                        {countryDetails.languages}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 font-medium italic">Demographic details not available.</p>
                )}
              </div>

            </div>

            {/* Footer Actions */}
            <div className="border-t border-slate-100 p-6 flex gap-3 shrink-0 bg-slate-50/50">
              <button
                onClick={() => setSelectedFavDetails(null)}
                className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer shadow-sm"
              >
                Close Details
              </button>
              <button
                onClick={handleExploreFromModal}
                className="flex-1 bg-primary hover:bg-primary-dark border-none text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
              >
                <MapPin className="w-4 h-4" />
                <span>Explore on Map</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
