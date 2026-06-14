import React, { useState, useEffect } from 'react';
import { X, Globe, Landmark, Users, CreditCard, Languages, ExternalLink, Loader2 } from 'lucide-react';
import { fetchCountryDetails } from '../services/apiService';
import { motion, AnimatePresence } from 'framer-motion';

export default function CountryModal({ isOpen, onClose, countryName }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen || !countryName) return;

    const getDetails = async () => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const result = await fetchCountryDetails(countryName);
        if (result) {
          setData(result);
        } else {
          setError('Could not retrieve data for this country.');
        }
      } catch (err) {
        setError('Network error, please try again.');
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, [isOpen, countryName]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          
          {/* Backdrop Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Content Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="bg-white rounded-3xl w-full max-w-lg shadow-2xl relative overflow-hidden z-10 border border-slate-100"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-0.5">Destination Profile</span>
                <h3 className="text-xl font-extrabold text-slate-800 font-sans">{countryName}</h3>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-all"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              
              {loading && (
                <div className="py-12 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  <span className="text-sm font-semibold text-slate-500">Querying country demographics...</span>
                </div>
              )}

              {error && (
                <div className="py-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-3">
                    <Globe className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-rose-600 font-semibold mb-4">{error}</p>
                  <button 
                    onClick={onClose}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs font-bold transition-all"
                  >
                    Close Window
                  </button>
                </div>
              )}

              {data && (
                <div className="space-y-6">
                  
                  {/* Flag Banner */}
                  <div className="w-full h-44 rounded-2xl overflow-hidden border border-slate-150 relative bg-slate-50 flex items-center justify-center">
                    <img 
                      src={data.flag} 
                      alt={data.flagAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Demographic stats grid */}
                  <div className="grid grid-cols-2 gap-4">
                    
                    {/* Capital */}
                    <div className="flex items-center gap-3.5 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                      <div className="w-9 h-9 rounded-lg bg-emerald-50 text-primary flex items-center justify-center shrink-0">
                        <Landmark className="w-4.5 h-4.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-grayText font-semibold block uppercase">Capital</span>
                        <span className="font-bold text-slate-800 text-xs truncate block">{data.capital}</span>
                      </div>
                    </div>

                    {/* Population */}
                    <div className="flex items-center gap-3.5 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                      <div className="w-9 h-9 rounded-lg bg-emerald-50 text-primary flex items-center justify-center shrink-0">
                        <Users className="w-4.5 h-4.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-grayText font-semibold block uppercase">Population</span>
                        <span className="font-bold text-slate-800 text-xs truncate block">{data.population}</span>
                      </div>
                    </div>

                    {/* Currency */}
                    <div className="flex items-center gap-3.5 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                      <div className="w-9 h-9 rounded-lg bg-emerald-50 text-primary flex items-center justify-center shrink-0">
                        <CreditCard className="w-4.5 h-4.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-grayText font-semibold block uppercase">Currency</span>
                        <span className="font-bold text-slate-800 text-xs truncate block">{data.currencyName}</span>
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="flex items-center gap-3.5 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                      <div className="w-9 h-9 rounded-lg bg-emerald-50 text-primary flex items-center justify-center shrink-0">
                        <Languages className="w-4.5 h-4.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-grayText font-semibold block uppercase">Languages</span>
                        <span className="font-bold text-slate-800 text-xs truncate block">{data.languages}</span>
                      </div>
                    </div>

                  </div>

                  {/* Extra stats */}
                  <div className="p-4 bg-slate-50 rounded-2xl text-xs space-y-2 text-slate-600 font-medium">
                    <div className="flex justify-between">
                      <span>Official Name:</span>
                      <span className="font-bold text-slate-800">{data.officialName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Region:</span>
                      <span className="font-bold text-slate-800">{data.region} ({data.subregion})</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <a 
                      href={data.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-5 py-3 border border-slate-200 hover:border-slate-300 rounded-full text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-colors hover:bg-slate-50"
                    >
                      <Globe className="w-4 h-4 text-slate-400" />
                      <span>Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                    <button 
                      onClick={onClose}
                      className="flex-1 px-5 py-3 bg-primary hover:bg-primary-dark text-white rounded-full text-xs font-bold shadow-md shadow-primary/10 transition-colors"
                    >
                      Explore Tours
                    </button>
                  </div>

                </div>
              )}

            </div>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
