import React, { useState } from 'react';
import { Calculator, ArrowRight, ChevronRight, Home, Building2, Palette } from 'lucide-react';

const tiers = [
  { id: 'luxe', label: 'Classic Design', rate: 1200, desc: 'Quality finishes and professional color palettes.' },
  { id: 'ultra', label: 'Premium Luxury', rate: 1800, desc: 'Luxury materials, bespoke furniture, and smart home automation.' }
];

const projectTypes = [
  { id: 'monograph', label: 'Full Home Interior', Icon: Home },
  { id: 'estate', label: 'Premium Bungalow', Icon: Palette },
  { id: 'refine', label: 'Home Renovation', Icon: Building2 }
];

const InvestmentEstimator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [type, setType] = useState('monograph');
  const [sqft, setSqft] = useState(1500);
  const [tier, setTier] = useState('luxe');

  const calculateEstimate = () => {
    const rate = tiers.find(t => t.id === tier)?.rate || 2500;
    const base = sqft * rate;
    const range = [base * 0.9, base * 1.1];
    return range.map(v => (v / 100000).toFixed(1)); // in Lakhs
  };

  const currentRange = calculateEstimate();

  return (
    <div className="w-full bg-transparent py-32 px-6 lg:px-12 relative overflow-hidden rounded-[4rem] border border-white/10">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] -z-10" />
      {/* Background hardener */}
      <div className="absolute inset-0 architect-grid opacity-10 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-10">
            <div className="inline-flex items-center space-x-3 px-4 py-2 bg-brass/10 border border-brass/20 rounded-full">
              <Calculator size={14} className="text-brass" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-black text-brass">Cost Estimator Tool</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl text-charcoal leading-tight">
              Estimate Your <br/><span className="italic font-light text-slate-400">Interior Cost.</span>
            </h2>
            
            <p className="text-zinc-600 font-medium leading-relaxed text-lg max-w-md">
              Use our simple tool to estimate the interior design cost for your dream home based on current market standards.
            </p>
            
            <div className="pt-10 space-y-4">
               <div className="flex items-center space-x-4">
                 <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-charcoal/40">
                    <span className="text-sm font-bold">{step} / 3</span>
                 </div>
                 <div className="flex-grow h-[2px] bg-slate-50 rounded-full relative">
                    <div 
                      className="absolute top-0 left-0 h-full bg-brass transition-all duration-700" 
                      style={{ width: `${(step/3) * 100}%` }}
                    />
                 </div>
               </div>
            </div>
          </div>

          <div className="glass-premium p-12 rounded-[3rem] shadow-2xl relative border-white/40">
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-700">
                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500">Step 01: Select Project Type</p>
                <div className="grid grid-cols-1 gap-4">
                  {projectTypes.map(p => (
                    <button
                      key={p.id}
                      onClick={() => { setType(p.id); setStep(2); }}
                      className={`flex items-center justify-between p-6 rounded-2xl border transition-all duration-500 ${type === p.id ? 'border-brass bg-brass/5' : 'border-stone-100 hover:border-brass/30'}`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl shadow-inner ${type === p.id ? 'bg-white text-brass' : 'bg-zinc-100 text-zinc-400'}`}><p.Icon /></div>
                        <span className="font-bold text-sm uppercase tracking-widest text-[#1A1A1A]">{p.label}</span>
                      </div>
                      <ChevronRight size={18} className={type === p.id ? 'text-brass' : 'text-zinc-300'} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-700">
                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500">Step 02: Enter Home Size</p>
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-bold uppercase tracking-widest text-charcoal">Area (Square Feet)</label>
                    <span className="text-3xl text-charcoal">{sqft} <span className="text-xs uppercase">sq.ft.</span></span>
                  </div>
                  <input 
                    type="range" 
                    min="500" 
                    max="10000" 
                    step="100"
                    value={sqft}
                    onChange={(e) => setSqft(parseInt(e.target.value))}
                    className="w-full h-1 bg-stone-100 rounded-full appearance-none cursor-pointer accent-brass"
                  />
                  <div className="grid grid-cols-3 gap-4">
                     {[1000, 2000, 5000].map(v => (
                       <button 
                         key={v}
                         onClick={() => setSqft(v)}
                         className="py-3 bg-stone-50 text-[10px] font-black uppercase tracking-widest text-charcoal/40 hover:bg-brass/10 hover:text-brass transition-all rounded-xl"
                       >
                         {v} SF
                       </button>
                     ))}
                  </div>
                </div>
                <button 
                  onClick={() => setStep(3)}
                  className="w-full py-6 bg-charcoal text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center space-x-4 hover:bg-brass transition-all"
                >
                  <span>Set Fidelity Tier</span>
                  <ArrowRight size={14} />
                </button>
                <button onClick={() => setStep(1)} className="w-full text-[10px] uppercase tracking-widest font-bold text-stone-400">Back back</button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-700">
                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500">Step 03: Select Design Quality</p>
                <div className="grid grid-cols-1 gap-4">
                  {tiers.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setTier(t.id)}
                      className={`text-left p-6 rounded-2xl border transition-all duration-500 shadow-sm ${tier === t.id ? 'bg-zinc-900 border-zinc-900' : 'bg-white/10 border-white/20 hover:border-white/50'}`}
                    >
                      <div className="flex justify-between items-center mb-2">
                         <span className={`font-bold text-sm uppercase tracking-widest ${tier === t.id ? 'text-white' : 'text-zinc-900'}`}>{t.label}</span>
                         {tier === t.id && <div className="w-2 h-2 bg-brass rounded-full shadow-[0_0_8px_#D4AF37]" />}
                      </div>
                      <p className={`text-[11px] font-medium leading-relaxed ${tier === t.id ? 'text-zinc-400' : 'text-zinc-500'}`}>{t.desc}</p>
                    </button>
                  ))}
                </div>
                
                <div className="pt-8 border-t border-white/20">
                    <div className="bg-zinc-900/5 p-8 rounded-3xl text-center space-y-2 border border-zinc-900/10 shadow-inner">
                      <p className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-900">Estimated Project Cost</p>
                      <h4 className="text-4xl text-zinc-900 font-bold">₹{currentRange[0]} - {currentRange[1]} <span className="text-sm italic font-light text-zinc-400">Lakhs*</span></h4>
                      <p className="text-[8px] text-zinc-400 uppercase tracking-widest font-bold">*Estimated excluding civil changes & appliances</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <button className="w-full py-6 bg-brass text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-charcoal transition-all">Get Detailed Quote</button>
                  <button onClick={() => setStep(2)} className="w-full text-[10px] uppercase tracking-widest font-bold text-stone-400">Modify scale</button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default InvestmentEstimator;
