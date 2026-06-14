import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="bg-[#F8FAFC] py-16 text-left">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 bg-white border border-slate-100 p-8 sm:p-12 rounded-3xl shadow-sm">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2 font-sans">Privacy Policy</h2>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-8">Last Updated: June 15, 2026</span>
        
        <div className="space-y-6 text-sm text-grayText font-semibold leading-relaxed">
          <p>
            At EzTravel, we prioritize the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by EzTravel and how we use it.
          </p>
          
          <h3 className="text-lg font-bold text-slate-800 pt-4">1. Information We Collect</h3>
          <p>
            We collect search queries (to fetch city weather and map information) and details submitted via our contact and feedback forms (such as name, email, and messages). We do not save your physical location or credit details.
          </p>

          <h3 className="text-lg font-bold text-slate-800 pt-4">2. Log Files & Third-Party APIs</h3>
          <p>
            EzTravel follows a standard procedure of using log files. We use third-party APIs (such as Open-Source weather APIs and REST Countries) to load geolocational and weather telemetry. These providers may collect parameters like your IP address to prevent traffic abuse.
          </p>

          <h3 className="text-lg font-bold text-slate-800 pt-4">3. Cookies</h3>
          <p>
            Like any other website, EzTravel uses cookies to store visitor preferences and optimize user experience based on browser type.
          </p>

          <h3 className="text-lg font-bold text-slate-800 pt-4">4. Your Data Protection Rights</h3>
          <p>
            You have the right to request copies of your personal data, rectify any inaccurate information, or request that we erase your query logs.
          </p>
          
          <h3 className="text-lg font-bold text-slate-800 pt-4">5. Contact Information</h3>
          <p>
            If you have questions about our privacy practices, please contact us at privacy@eztravel.com.
          </p>
        </div>
      </div>
    </div>
  );
}
