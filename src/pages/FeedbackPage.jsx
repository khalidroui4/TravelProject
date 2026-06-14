import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Smile, CheckCircle2 } from 'lucide-react';

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || !comment.trim()) return;
    setIsSubmitted(true);
    setComment('');
  };

  return (
    <div className="bg-[#F8FAFC] py-16 text-left">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-full">Share Your Thoughts</span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-800 mt-4 tracking-tight leading-tight">We Value Your Feedback</h2>
          <p className="text-grayText text-base font-semibold mt-4 leading-relaxed">
            Your insights help us refine weather widgets, map dashboards, and guides to make travel planning even easier.
          </p>
        </div>

        {/* Feedback Card */}
        <div className="max-w-xl mx-auto">
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-premium">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="feedback-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  
                  {/* Rating Selector */}
                  <div className="flex flex-col items-center text-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-3">Overall Rating</span>
                    
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((starIdx) => {
                        const isHighlighted = (hoverRating || rating) >= starIdx;
                        return (
                          <button
                            key={starIdx}
                            type="button"
                            onClick={() => setRating(starIdx)}
                            onMouseEnter={() => setHoverRating(starIdx)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 cursor-pointer transition-transform duration-100 hover:scale-110 active:scale-95 focus:outline-none"
                            aria-label={`Rate ${starIdx} Stars`}
                          >
                            <Star 
                              className={`w-9 h-9 transition-colors ${
                                isHighlighted 
                                  ? 'text-amber-500 fill-amber-500' 
                                  : 'text-slate-200 hover:text-slate-350'
                              }`} 
                            />
                          </button>
                        );
                      })}
                    </div>
                    
                    {rating > 0 && (
                      <span className="text-[10px] text-primary font-bold tracking-wider uppercase mt-3">
                        {rating === 5 ? 'Excellent!' : rating === 4 ? 'Very Good' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Needs Improvement'}
                      </span>
                    )}
                  </div>

                  {/* Comment Box */}
                  <div className="flex flex-col">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2 pl-1">Tell Us More</label>
                    <textarea
                      required
                      rows="4"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="What did you like? What can we do better?"
                      className="bg-slate-50 border border-slate-200 focus:border-primary rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={rating === 0}
                    className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 border-none ${
                      rating > 0 
                        ? 'bg-primary hover:bg-primary-dark text-white shadow-primary/10 active:scale-[0.98] cursor-pointer' 
                        : 'bg-slate-100 text-slate-400 shadow-none cursor-not-allowed'
                    }`}
                  >
                    <span>Submit Feedback</span>
                    <Smile className="w-4 h-4" />
                  </button>

                </motion.form>
              ) : (
                <motion.div 
                  key="feedback-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center p-6"
                >
                  <CheckCircle2 className="w-14 h-14 text-emerald-500 mb-4 animate-bounce" />
                  <h3 className="text-xl font-bold text-slate-800 font-sans mb-2">Thank You!</h3>
                  <p className="text-xs text-grayText font-semibold leading-relaxed max-w-sm">
                    Your feedback has been successfully submitted. We appreciate your contribution to making EzTravel better for everyone!
                  </p>
                  <button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setRating(0);
                    }}
                    className="mt-6 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all active:scale-95 shadow-md border-none cursor-pointer"
                  >
                    Submit New Feedback
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
