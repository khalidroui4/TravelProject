/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2E8B57', // Primary Green
          dark: '#166534',    // Dark Green
          accent: '#22C55E',  // Accent Green
        },
        weather: '#38BDF8',   // Weather Accent
        darkText: '#1F2937',  // Dark Text
        grayText: '#6B7280',  // Gray Text
        borderBg: '#E5E7EB',  // Borders
        lightBg: '#F8FAFC',   // Light Background
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'premium-hover': '0 20px 45px -12px rgba(46, 139, 87, 0.15), 0 4px 6px rgba(0, 0, 0, 0.02)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-hover': '0 12px 40px 0 rgba(46, 139, 87, 0.15)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    },
  },
  plugins: [],
}
