import React, { useState } from 'react';
import { CheckCircle2, Navigation, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <section className="py-16 bg-slate-950 relative overflow-hidden">
      
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Newsletter Box */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-[#1e293b]/70 to-slate-900 p-8 md:p-14 text-left shadow-2xl overflow-hidden border border-white/10">
          
          {/* Subtle background glow */}
          <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-10 -left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading and Subtitle */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-4">
                <Navigation className="w-4 h-4 text-emerald-400 rotate-45" />
                <span className="text-[10px] font-bold text-emerald-450 uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                  Weekly Newsletter
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight mb-4 font-sans">
                Get travel inspiration <br />
                <span className="text-primary-accent">straight to your inbox</span>
              </h3>
              <p className="text-xs md:text-sm text-slate-300 font-medium max-w-xl leading-relaxed">
                Subscribe to receive curated destination guidebooks, live weather insights, and authentic travel logs weekly.
              </p>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-5 w-full relative">
              {/* Paper Airplane Illustration overlay */}
              <div className="absolute -right-4 -bottom-10 opacity-10 pointer-events-none hidden lg:block transform rotate-12">
                <svg className="w-36 h-36 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2 2 8.66 11.5 12.5 22 2Z" />
                  <path d="M22 2 11.5 12.5 15 22 22 2Z" />
                </svg>
              </div>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div 
                    key="form-container"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col gap-2 relative z-10"
                  >
                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full">
                      <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-2xl flex-grow focus-within:border-primary/40 transition-colors">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="bg-transparent border-none outline-none text-white placeholder-slate-400 text-xs py-3 px-4 flex-1 min-w-0 font-medium rounded-2xl"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-2xl text-xs font-bold transition-all active:scale-95 cursor-pointer shrink-0 flex items-center justify-center gap-1.5 border border-transparent shadow-md"
                      >
                        <span>Subscribe</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                    <span className="text-[10px] text-slate-405 font-semibold pl-2 block text-left">
                      No spam. Unsubscribe at any time.
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 bg-slate-900/60 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-lg w-full relative z-10"
                  >
                    <CheckCircle2 className="w-6 h-6 text-emerald-450 shrink-0" />
                    <div className="text-white text-xs">
                      <h4 className="font-bold">Subscription Active!</h4>
                      <p className="text-slate-300 mt-1">Thank you for joining. Check your inbox soon for your initial newsletter dispatch.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
