import React from 'react';

export default function TermsPage() {
  return (
    <div className="bg-[#F8FAFC] py-16 text-left">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 bg-white border border-slate-100 p-8 sm:p-12 rounded-3xl shadow-sm">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2 font-sans">Terms of Service</h2>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-8">Last Updated: June 15, 2026</span>
        
        <div className="space-y-6 text-sm text-grayText font-semibold leading-relaxed">
          <p>
            Welcome to EzTravel. These terms and conditions outline the rules and regulations for the use of EzTravel's Website.
          </p>
          
          <h3 className="text-lg font-bold text-slate-800 pt-4">1. Agreement to Terms</h3>
          <p>
            By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use EzTravel if you do not agree to all of the terms and conditions stated on this page.
          </p>

          <h3 className="text-lg font-bold text-slate-800 pt-4">2. Intellectual Property Rights</h3>
          <p>
            Unless otherwise stated, EzTravel and/or its licensors own the intellectual property rights for all material on EzTravel. All intellectual property rights are reserved.
          </p>

          <h3 className="text-lg font-bold text-slate-800 pt-4">3. User Conduct</h3>
          <p>
            You must not use this website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of EzTravel. You must not use our search API integrations for automated scraping or DDoS attacks.
          </p>

          <h3 className="text-lg font-bold text-slate-800 pt-4">4. Disclaimer of Warranties</h3>
          <p>
            Weather forecasts, geolocational coordinates, and demographic metrics are fetched from third-party APIs. We provide this data "as is" and do not warrant its absolute real-time accuracy or readiness.
          </p>
          
          <h3 className="text-lg font-bold text-slate-800 pt-4">5. Governing Law</h3>
          <p>
            These terms will be governed by and construed in accordance with the laws of the jurisdiction of Florida, USA, and any disputes relating to these terms will be subject to the exclusive jurisdiction of the courts of Florida.
          </p>
        </div>
      </div>
    </div>
  );
}
