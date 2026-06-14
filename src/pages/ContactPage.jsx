import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

const CONTACT_INFO = [
  { icon: Mail, label: 'Email Us', value: 'hello@eztravel.com', desc: 'Our support team responds within 24 hours.' },
  { icon: Phone, label: 'Call Us', value: '+1 (555) 732-9011', desc: 'Mon-Fri from 9am to 6pm GMT.' },
  { icon: MapPin, label: 'Headquarters', value: '75 Ocean Drive, Suite 400', desc: 'Miami, FL 33139, USA' }
];

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-[#F8FAFC] py-16 text-left">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-full">Contact Support</span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-800 mt-4 tracking-tight leading-tight">We'd Love to Hear From You</h2>
          <p className="text-grayText text-base font-semibold mt-4 leading-relaxed">
            Have questions about a destination, live weather accuracy, or partnership options? Drop us a line.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h3 className="text-2xl font-extrabold text-slate-800 font-sans tracking-tight mb-2">Get in Touch</h3>
            
            <div className="flex flex-col gap-6">
              {CONTACT_INFO.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary-dark text-white flex items-center justify-center shrink-0 shadow-sm border-none">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm leading-none mb-1">{item.label}</h4>
                      <span className="text-xs font-extrabold text-primary block mb-0.5">{item.value}</span>
                      <p className="text-[10px] text-grayText font-semibold leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-premium h-full flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col">
                        <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2 pl-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="John Doe"
                          className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold outline-none transition-colors"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2 pl-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="john@example.com"
                          className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2 pl-1">Message</label>
                      <textarea
                        required
                        rows="5"
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Tell us how we can help you..."
                        className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all active:scale-[0.98] shadow-md shadow-primary/10 flex items-center justify-center gap-2 cursor-pointer border-none"
                    >
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="contact-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center p-6"
                  >
                    <CheckCircle2 className="w-14 h-14 text-emerald-500 mb-4 animate-bounce" />
                    <h3 className="text-xl font-bold text-slate-800 font-sans mb-2">Message Sent!</h3>
                    <p className="text-xs text-grayText font-semibold leading-relaxed max-w-sm">
                      Thank you for contacting EzTravel. Our team has received your message and will review it immediately.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all active:scale-95 shadow-md border-none cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
