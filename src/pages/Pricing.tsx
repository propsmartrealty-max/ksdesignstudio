import React from 'react';
import InvestmentEstimator from '../components/InvestmentEstimator';
import { Ruler, Shield, Layers, Package, ArrowRight } from 'lucide-react';

const Pricing: React.FC = () => {
  const costDrivers = [
    {
      title: 'Material Taxonomy',
      desc: 'The selection of Statuary Marble vs. Local Basalt determines the base aesthetic value.',
      icon: <Package size={20} className="text-brass" />
    },
    {
      title: 'Structural complexity',
      desc: 'The extent of tectonic restructuring—moving walls or optimizing light paths.',
      icon: <Ruler size={20} className="text-brass" />
    },
    {
      title: 'Finish Precision',
      desc: 'High-fidelity coatings, brass inlays, and custom joinery levels.',
      icon: <Layers size={20} className="text-brass" />
    },
    {
      title: 'Guarantee Protocols',
      desc: 'Our 10-year structural warranty and 45-day handover assurance.',
      icon: <Shield size={20} className="text-brass" />
    }
  ];

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-end mb-32">
          <div className="space-y-10">
            <span className="text-brass tracking-[0.5em] uppercase text-[10px] font-black block">Investment_Registry</span>
            <h1 className="text-6xl md:text-9xl text-charcoal leading-none">
               Pricing <br/><span className="italic font-light">Architecture.</span>
            </h1>
            <p className="text-stone-500 text-xl font-light leading-relaxed max-w-lg">
               Transparent investment paths grounded in material honesty and tectonic precision. Calibrate your budget for Pune’s premium residential monographs.
            </p>
          </div>
          <div className="flex flex-col items-end space-y-6">
             <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-xl max-w-sm">
                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-charcoal mb-4">Baseline Protocol</p>
                <div className="flex items-end space-x-2 mb-4">
                   <span className="text-4xl text-brass">₹1,500</span>
                   <span className="text-stone-400 text-sm mb-1">/ sq.ft. onwards</span>
                </div>
                <p className="text-stone-400 text-xs leading-relaxed">Starting investment for high-end modular solutions in Pune & Mumbai.</p>
             </div>
          </div>
        </div>

        <section className="mb-40">
           <InvestmentEstimator />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
           {costDrivers.map((driver, i) => (
             <div key={i} className="p-10 bg-white rounded-[2.5rem] border border-slate-100 hover:translate-y-[-10px] transition-luxury group">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-8">
                   {driver.icon}
                </div>
                <h3 className="text-lg text-charcoal mb-4">{driver.title}</h3>
                <p className="text-stone-400 text-sm font-light leading-relaxed">{driver.desc}</p>
             </div>
           ))}
        </section>

        {/* Livspace-style Value Comparison */}
        <section className="bg-slate-50 rounded-[4rem] p-16 md:p-24 text-charcoal overflow-hidden relative border border-slate-100">
           <div className="absolute inset-0 architect-grid opacity-5" />
           <div className="relative z-10 max-w-4xl mx-auto">
              <div className="text-center mb-20">
                 <span className="text-brass tracking-[0.6em] uppercase text-[10px] font-black block mb-6">Comparative Integrity</span>
                 <h2 className="text-4xl md:text-6xl">The KS Design <span className="italic">Edge.</span></h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="space-y-8 p-10 bg-white rounded-[2rem] border border-slate-200">
                    <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-brass">Standard Contractors</h3>
                    <ul className="space-y-4">
                       {['Generic materials', 'Uncertain timelines', 'Hidden costs', 'No structural warranty'].map((item, i) => (
                         <li key={i} className="flex items-center space-x-4 text-charcoal/40 text-sm font-light">
                            <ArrowRight size={14} className="text-charcoal/10" />
                            <span>{item}</span>
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="space-y-8 p-10 bg-white rounded-[2rem] border border-brass/20 shadow-2xl relative">
                    <div className="absolute top-0 right-0 p-6">
                       <Shield size={20} className="text-brass" />
                    </div>
                    <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-charcoal">KS Design Studio</h3>
                    <ul className="space-y-4">
                       {['Curated tectonic materials', '45-Day guaranteed handover', 'Fixed price monographs', '10-Year structural warranty'].map((item, i) => (
                         <li key={i} className="flex items-center space-x-4 text-charcoal/80 text-sm font-medium">
                            <ArrowRight size={14} className="text-brass" />
                            <span>{item}</span>
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default Pricing;
