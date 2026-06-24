import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, DollarSign, Clock } from 'lucide-react';

const JOBS = [
  {
    title: 'Senior Frontend Engineer (React/Vite)',
    dept: 'Engineering',
    loc: 'Remote / Miami, FL',
    type: 'Full-time',
    salary: '$120k - $150k + Equity',
    desc: 'Help us build dynamic interactive map widgets and live-weather streaming charts.'
  },
  {
    title: 'Travel Product Manager',
    dept: 'Product Management',
    loc: 'Hybrid / New York, NY',
    type: 'Full-time',
    salary: '$110k - $135k',
    desc: 'Shape the roadmap of EzTravel\'s REST Countries integrations and local guide directories.'
  },
  {
    title: 'UX/UI Designer (Framer/Tailwind)',
    dept: 'Product Design',
    loc: 'Remote',
    type: 'Full-time',
    salary: '$90k - $115k',
    desc: 'Ensure all pages have a unified, green-dark-white visual hierarchy with sleek animations.'
  },
  {
    title: 'Culture & Food Travel Writer',
    dept: 'Editorial & Marketing',
    loc: 'Contract / Remote',
    type: 'Part-time',
    salary: '$50/hr',
    desc: 'Curate recommendations for hotels, restaurants, and culture guides in global metropolitan centers.'
  }
];

export default function CareersPage() {
  const handleApplyClick = (title) => {
    window.showToast?.(`Thank you for your interest in the ${title} role! Please send your resume to careers@eztravel.com.`, 'info');
  };

  return (
    <div className="bg-[#F8FAFC] py-16 text-left">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-full">We Are Hiring</span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-800 mt-4 tracking-tight leading-tight">Join the EzTravel Team</h2>
          <p className="text-grayText text-base font-semibold mt-4 leading-relaxed">
            We are looking for travel enthusiasts, engineers, and designers who want to build the future of travel exploration.
          </p>
        </div>

        {/* Jobs List */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="text-2xl font-extrabold text-slate-800 font-sans tracking-tight mb-4">Open Opportunities</h3>
          
          <div className="space-y-6">
            {JOBS.map((job, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-premium hover:-translate-y-0.5 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-3 flex-1 text-left">
                  <h4 className="font-extrabold text-slate-800 text-lg leading-tight">{job.title}</h4>
                  
                  {/* Job Metadata Chips */}
                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold text-slate-500">
                    <span className="inline-flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                      <Briefcase className="w-3 h-3 text-slate-400" />
                      <span>{job.dept}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{job.loc}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{job.type}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100 text-primary-dark">
                      <DollarSign className="w-3 h-3 text-primary" />
                      <span>{job.salary}</span>
                    </span>
                  </div>
                  
                  <p className="text-xs text-grayText font-medium leading-relaxed max-w-2xl pt-1">
                    {job.desc}
                  </p>
                </div>

                <button
                  onClick={() => handleApplyClick(job.title)}
                  className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all active:scale-95 shadow-md shadow-primary/10 hover:shadow-lg cursor-pointer shrink-0 border-none w-full md:w-auto"
                >
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
