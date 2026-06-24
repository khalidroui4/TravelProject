import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import { backendService } from '../services/backendService';

export default function SignUpPage({ onLoginSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !passwordConfirmation) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== passwordConfirmation) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const data = await backendService.register(name, email, password, passwordConfirmation);
      if (onLoginSuccess) {
        onLoginSuccess(data.user);
      } else {
        window.location.hash = 'profile';
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Email might already be taken.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] py-20 flex items-center justify-center min-h-[85vh] text-left">
      <div className="max-w-md w-full mx-auto px-6">
        
        {/* Card wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-slate-100 rounded-3xl p-8 shadow-premium"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
              Join Us Today
            </span>
            <h2 className="text-3xl font-extrabold text-slate-800 mt-3 tracking-tight font-sans">
              Create an Account
            </h2>
            <p className="text-grayText text-xs font-semibold mt-2">
              Start bookmarking cities and syncing weather details.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg text-xs font-semibold text-red-700">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">Full Name</label>
              <div className="relative flex items-center bg-slate-50 border border-slate-200 focus-within:border-primary rounded-xl px-4.5 py-2.5 transition-colors">
                <User className="w-4 h-4 text-slate-400 mr-3 shrink-0" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  autoComplete="name"
                  className="bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 font-semibold text-xs py-1 w-full"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">Email Address</label>
              <div className="relative flex items-center bg-slate-50 border border-slate-200 focus-within:border-primary rounded-xl px-4.5 py-2.5 transition-colors">
                <Mail className="w-4 h-4 text-slate-400 mr-3 shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  autoComplete="email"
                  className="bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 font-semibold text-xs py-1 w-full"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">Password (min 8 chars)</label>
              <div className="relative flex items-center bg-slate-50 border border-slate-200 focus-within:border-primary rounded-xl px-4.5 py-2.5 transition-colors">
                <Lock className="w-4 h-4 text-slate-400 mr-3 shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 font-semibold text-xs py-1 w-full"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 transition-colors border-none bg-transparent cursor-pointer p-0"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">Confirm Password</label>
              <div className="relative flex items-center bg-slate-50 border border-slate-200 focus-within:border-primary rounded-xl px-4.5 py-2.5 transition-colors">
                <Lock className="w-4 h-4 text-slate-400 mr-3 shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 font-semibold text-xs py-1 w-full"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 border-none transition-all cursor-pointer shadow-md disabled:opacity-70 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4.5 h-4.5 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </>
              )}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="mt-8 text-center border-t border-slate-100 pt-6">
            <p className="text-xs text-slate-500 font-semibold">
              Already have an account?{' '}
              <a
                href="#signin"
                className="text-primary hover:text-primary-dark font-bold underline transition-colors"
              >
                Sign In Now
              </a>
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
