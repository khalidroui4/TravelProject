import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
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
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Newsletter Box */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#166534] via-[#2E8B57] to-[#22C55E] p-8 md:p-12 text-left shadow-xl overflow-hidden border border-emerald-400/10">
          
          {/* Subtle background glow */}
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading and Subtitle */}
            <div className="lg:col-span-7">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2 font-sans">
                Get travel inspiration straight to your inbox
              </h3>
              <p className="text-xs md:text-sm text-white/80 font-medium max-w-xl leading-relaxed">
                Subscribe to our newsletter and receive the best travel tips, guides and offers.
              </p>
            </div>

            {/* Right Column: Form and Subtext */}
            <div className="lg:col-span-5 w-full relative">
              {/* Floating Travel Paper Airplane Illustration */}
              <div className="absolute -right-4 -bottom-10 opacity-15 pointer-events-none hidden lg:block transform rotate-12">
                <svg className="w-32 h-32 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2 2 8.66 11.5 12.5 22 2Z" />
                  <path d="M22 2 11.5 12.5 15 22 22 2Z" />
                </svg>
              </div>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div 
                    key="form-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-2 relative z-10"
                  >
                    <form onSubmit={handleSubscribe} className="flex gap-2 w-full">
                      <div className="flex bg-white/10 backdrop-blur-md border border-white/15 p-1 rounded-2xl shadow-md flex-grow">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="bg-transparent border-none outline-none text-white placeholder-white/60 text-xs py-2.5 px-4 flex-1 min-w-0 font-medium rounded-2xl"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-800 rounded-2xl text-xs font-bold transition-all active:scale-95 shadow-md cursor-pointer shrink-0"
                      >
                        Subscribe
                      </button>
                    </form>
                    <span className="text-[10px] text-white/70 font-medium pl-2 block text-left">
                      No spam. Unsubscribe anytime.
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 bg-white/15 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-md w-full relative z-10"
                  >
                    <CheckCircle2 className="w-6 h-6 text-emerald-300 shrink-0" />
                    <div className="text-white text-xs">
                      <h4 className="font-bold">Subscription Active!</h4>
                      <p className="text-white/80 mt-0.5">Thank you! Check your inbox soon.</p>
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
