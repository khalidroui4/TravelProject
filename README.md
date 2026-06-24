# EzTravel - Client Application (Frontend)

EzTravel is a modern, premium full-stack travel exploration platform that allows users to search global cities, view interactive geocoded maps, get real-time weather forecasts, view country demographics, and securely save favorite destinations.

This repository holds the client-side Single Page Application (SPA) built using React and compiled via Vite.

---

## 🎨 Design System & Aesthetics

The frontend features a handcrafted luxury travel identity:
- **Primary Palette**: Emerald Green (`#16A34A`), Slate Dark (`#0F172A`), and Amber Accent (`#F59E0B`).
- **Interactive Elements**: Custom inline SVG illustrations with hover transitions.
- **Glassmorphism**: Soft backdrop blur overlays and shadow elevations.
- **Smooth Animations**: Guided scroll reveals and sliding panel transitions powered by Framer Motion.
- **Interactive Maps**: Full Leaflet integration displaying custom markers.

---

## 🛠 Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v18.x or higher)
- **NPM** (v9.x or higher)

---

## 🚀 Installation & Setup

Follow these steps to run the client locally:

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Variables** (Optional):
    If you want high-resolution Unsplash city photos, create a `.env` file in the root of the project and add your Unsplash Access Key:
    ```env
    VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
    ```
    *If no key is provided, the client will fall back to a curated catalog of popular destinations.*

3.  **Start Development Server**:
    ```bash
    npm run dev
    ```
    This will run the web app locally at `http://localhost:5173` (or the next available port).

4.  **Production Build**:
    To compile and minify the app for deployment, run:
    ```bash
    npm run build
    ```

---

## 📦 Key Packages & Technologies

- **React 19** (`react` / `react-dom` v19.2.5) - Core component framework.
- **Leaflet & React Leaflet** (v1.9.4 & v5.0.0) - Interactive map tiles and markers.
- **Framer Motion** (v12.40.0) - Liquid scroll transitions and micro-animations.
- **Lucide React** (v1.18.0) - Clean vector icons.
- **TailwindCSS v4** - Styling compiler.
- **Vite** (v8.0.9) - Fast local building.
