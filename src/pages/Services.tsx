import React from 'react';
import ServicesGrid from '../components/ServicesGrid';

const Services: React.FC = () => {
  return (
    <div className="pt-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto py-24 px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="text-brass tracking-[0.6em] uppercase text-[10px] font-black block mb-6">Discipline & Methodology</span>
            <h1 className="text-6xl md:text-8xl text-charcoal leading-none">
              One-Stop Studio <br/><span className="italic font-light text-slate-100">for Tectonics.</span>
            </h1>
          </div>
          <div className="text-charcoal/40 text-[10px] uppercase tracking-[0.4em] font-bold max-w-xs text-right hidden md:block">
            Our practice is defined by a relentless pursuit of architectural integrity and material honesty across every interior pillar.
          </div>
        </div>
        
        {/* Livspace-Inspired Structural Grid */}
        <ServicesGrid />

        <div className="mt-40 bg-slate-50 p-16 md:p-24 rounded-[3rem] text-charcoal relative overflow-hidden border border-slate-100">
          <div className="absolute inset-0 architect-grid opacity-5"></div>
          <div className="relative z-10 max-w-3xl">
             <span className="text-brass tracking-[0.6em] uppercase text-[10px] font-black block mb-8">Turnkey Integration</span>
             <h2 className="text-4xl md:text-6xl mb-8 leading-tight">Total <span className="italic font-light text-slate-200">Structural Control.</span></h2>
             <p className="text-stone-500 text-xl font-light leading-relaxed mb-12">
               Beyond aesthetics, we manage the entire lifecycle of the project—from tectonic restructuring to the final material reveal—ensuring that every silhouette remains true to the conceptual intent.
             </p>
             <button className="px-12 py-6 bg-charcoal text-white uppercase tracking-[0.4em] text-[10px] font-black hover:bg-brass transition-all">Download Protocol</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;