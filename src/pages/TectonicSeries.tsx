import React from 'react';
import { SIGNATURE_MODULES } from '../constants';
import { Box, ArrowRight, Download, ShieldCheck, Zap } from 'lucide-react';

const TectonicSeries: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-[#0A0A0A] min-h-screen text-white relative overflow-hidden">
      <div className="absolute inset-0 architect-grid opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-3 text-brass mb-8">
               <Box size={24} />
               <span className="text-[10px] font-black uppercase tracking-[0.5em]">The Signature Series</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-10">
               Tectonic <br/><span className="text-zinc-800 italic">Volumes.</span>
            </h1>
            <p className="text-zinc-500 text-xl font-medium leading-relaxed max-w-xl">
               Pre-configured, high-fidelity design modules for the most critical volumes of your residence. Precision-engineered luxury at the intersection of architecture and product.
            </p>
          </div>
          <div className="flex flex-col items-end text-right">
             <div className="flex items-center space-x-2 text-green-500 mb-2">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Protocol Verified</span>
             </div>
             <p className="text-zinc-600 text-xs font-bold uppercase tracking-[0.3em]">Signature_Collection_v1.0</p>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="space-y-40">
           {SIGNATURE_MODULES.map((module, idx) => (
             <div key={module.id} className={`grid grid-cols-1 lg:grid-cols-12 gap-20 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`lg:col-span-7 aspect-[16/10] bg-zinc-900 rounded-[4rem] overflow-hidden relative group cursor-crosshair ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                   <img 
                     src={module.imageUrl} 
                     alt={module.title} 
                     className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                   <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                      <div>
                         <p className="text-brass text-[10px] font-black uppercase tracking-[0.5em] mb-4">Module_Type // {module.title.split(' ')[2]}</p>
                         <h3 className="text-4xl font-black tracking-tighter">{module.title}</h3>
                      </div>
                      <div className="flex items-center space-x-2 text-zinc-400">
                         <Zap size={14} className="animate-pulse" />
                         <span className="text-[10px] font-black uppercase tracking-widest">High-Fidelity</span>
                      </div>
                   </div>
                </div>

                <div className="lg:col-span-5 space-y-10">
                   <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brass mb-4">The Narrative</h4>
                      <p className="text-zinc-400 text-lg leading-relaxed font-medium italic">"{module.description}"</p>
                   </div>

                   <div className="grid grid-cols-2 gap-8 pt-10 border-t border-zinc-800">
                      <div>
                         <h4 className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-4">Main Materials</h4>
                         <ul className="space-y-2">
                            {module.materials.map(m => (
                              <li key={m} className="text-xs font-bold text-zinc-400">{m}</li>
                            ))}
                         </ul>
                      </div>
                      <div>
                         <h4 className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-4">Investment Envelope</h4>
                         <p className="text-xl font-black text-white">{module.investment}</p>
                      </div>
                   </div>

                   <div className="pt-10">
                      <h4 className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-6">Signature Features</h4>
                      <div className="flex flex-wrap gap-3">
                         {module.features.map(f => (
                           <span key={f} className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-[9px] font-black uppercase tracking-widest text-zinc-400">
                              {f}
                           </span>
                         ))}
                      </div>
                   </div>

                   <div className="pt-12 flex space-x-6">
                      <button className="flex-grow py-6 bg-brass text-white rounded-3xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all shadow-2xl flex items-center justify-center space-x-4 group">
                         <span>Download Brief</span>
                         <Download size={16} className="group-hover:translate-y-1 transition-transform" />
                      </button>
                      <button className="p-6 bg-zinc-900 text-white rounded-3xl hover:bg-zinc-800 transition-all border border-zinc-800">
                         <ArrowRight size={20} />
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Global CTA */}
        <div className="mt-60 p-24 bg-zinc-900/50 rounded-[4rem] border border-zinc-800 text-center relative overflow-hidden">
           <div className="absolute inset-0 architect-grid opacity-5" />
           <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-10 relative z-10">
              Beyond standard <br/><span className="text-brass">Architectural logic.</span>
           </h3>
           <p className="max-w-2xl mx-auto text-zinc-500 font-medium mb-12 relative z-10">
              The Tectonic Series represents our efforts to productize luxury. Every module is a calibrated masterpiece ready for deployment in your residence.
           </p>
           <button className="px-16 py-8 bg-white text-black rounded-full text-[11px] font-black uppercase tracking-[0.5em] hover:bg-brass hover:text-white transition-all shadow-2xl relative z-10">
              Enquire for Bespoke Calibration
           </button>
        </div>
      </div>
    </div>
  );
};

export default TectonicSeries;
