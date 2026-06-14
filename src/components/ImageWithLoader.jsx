import React, { useState } from 'react';

// A generic cityscape image that is guaranteed to load
const GUARANTEED_FALLBACK = 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=600&q=80';

export default function ImageWithLoader({ src, alt, className = '', ...props }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton Shimmer Loader */}
      {loading && (
        <div className="absolute inset-0 shimmer-bg bg-slate-200" />
      )}
      
      <img
        src={error ? GUARANTEED_FALLBACK : src}
        alt={alt}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
        {...props}
      />
    </div>
  );
}
