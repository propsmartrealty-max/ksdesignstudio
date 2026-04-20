import React, { useState } from 'react';
import { IndianRupee, TrendingUp, Building2, Landmark, CheckCircle } from 'lucide-react';

const CommercialROI: React.FC = () => {
  const [area, setArea] = useState(2500); // sq ft
  const [tier, setTier] = useState<'Essential' | 'Premium' | 'Ultra-Luxury'>('Premium');

  const basePropertyRate = 12000; // Base sqft rate in Pune IT Corridors (e.g., Hinjewadi/Kharadi)
  const propertyValue = area * basePropertyRate;

  // Interior Cost Multipliers (per sqft)
  const costMap = {
    'Essential': 1500,
    'Premium': 3500,
    'Ultra-Luxury': 7000
  };

  const interiorInvestment = area * costMap[tier];
  
  // Rental Yield percentages
  const baseYield = 4.0; // standard bare-shell rental yield (4%)
  const yieldBumpMap = {
    'Essential': 1.5,
    'Premium': 2.8,
    'Ultra-Luxury': 4.5
  };

  const currentYield = baseYield;
  const projectedYield = baseYield + yieldBumpMap[tier];
  
  const currentMonthlyRent = (propertyValue * (currentYield / 100)) / 12;
  const projectedMonthlyRent = ((propertyValue + interiorInvestment) * (projectedYield / 100)) / 12;
  
  const monthlyIncrease = projectedMonthlyRent - currentMonthlyRent;
  const payloadBreakEven = interiorInvestment / monthlyIncrease / 12; // in years

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹ ${(val / 100000).toFixed(2)} L`;
    return `₹ ${Math.floor(val).toLocaleString()}`;
  };

  return (
    <div className="bg-[#1A1A1A] p-10 lg:p-14 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
       {/* Background structural elements */}
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
       <div className="absolute top-0 right-0 p-8 opacity-10">
         <Landmark size={200} />
       </div>

       <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Controls Segment */}
          <div className="lg:col-span-5 space-y-12">
             <div>
                <span className="text-brass tracking-[0.4em] uppercase text-[10px] font-black block mb-4">Investment Calculator</span>
                <h3 className="text-4xl font-black mb-4 tracking-tighter">Yield <span className="text-zinc-500 italic font-light">Projection.</span></h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-medium mb-8">
                  Calculate the rental yield multiplier for your Pune commercial or high-end residential property through strategic interior architecture.
                </p>
             </div>

             <div className="space-y-6">
                <div>
                   <div className="flex justify-between items-end mb-4">
                     <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400">Property Area (Sq Ft)</label>
                     <span className="text-brass font-mono font-bold">{area} sq ft</span>
                   </div>
                   <input 
                     type="range" 
                     min="1000" 
                     max="10000" 
                     step="100" 
                     value={area}
                     onChange={(e) => setArea(Number(e.target.value))}
                     className="w-full appearance-none h-1 bg-zinc-800 rounded-full outline-none slider-thumb-brass"
                   />
                </div>

                <div className="pt-6">
                   <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 block mb-4">Execution Tier</label>
                   <div className="grid grid-cols-3 gap-3">
                      {(['Essential', 'Premium', 'Ultra-Luxury'] as const).map(t => (
                        <button 
                          key={t}
                          onClick={() => setTier(t)}
                          className={`py-3 rounded-xl border text-[9px] uppercase tracking-widest font-black transition-all ${
                            tier === t 
                              ? 'border-brass bg-brass/10 text-brass' 
                              : 'border-zinc-800 text-zinc-500 hover:border-zinc-600'
                          }`}
                        >
                           {t}
                        </button>
                      ))}
                   </div>
                </div>
             </div>
             
             <div className="pt-4 border-t border-zinc-800">
                <a href="#contact" className="text-zinc-400 text-[10px] uppercase tracking-widest font-black hover:text-white transition-colors flex items-center space-x-2">
                   <span>Request Detailed BOQ</span>
                   <TrendingUp size={12} />
                </a>
             </div>
          </div>

          {/* Visualization Segment */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 backdrop-blur-md">
             <div className="flex items-center space-x-3 mb-10 pb-6 border-b border-white/5">
                <Building2 size={24} className="text-brass" />
                <h4 className="text-lg font-bold">Pune IT Corridor (Baseline)</h4>
             </div>

             <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                   <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-black mb-2">Base Property Value</p>
                   <p className="text-2xl font-mono text-zinc-300">{formatCurrency(propertyValue)}</p>
                </div>
                <div>
                   <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-black mb-2">Required Interior Investment</p>
                   <p className="text-3xl font-mono text-brass">{formatCurrency(interiorInvestment)}</p>
                </div>
             </div>

             <div className="space-y-8 bg-black/30 p-8 rounded-2xl border border-white/5 shadow-inner">
                <div>
                   <div className="flex justify-between items-end mb-2">
                     <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Current Monthly Rent (Bare-shell)</p>
                     <p className="text-lg font-mono text-zinc-300">{formatCurrency(currentMonthlyRent)}</p>
                   </div>
                   <div className="w-full h-1 bg-zinc-800 rounded-full" />
                </div>
                <div>
                   <div className="flex justify-between items-end mb-2">
                     <p className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">Projected Premium Rent</p>
                     <p className="text-xl font-mono text-emerald-400">{formatCurrency(projectedMonthlyRent)}</p>
                   </div>
                   <div className="w-full h-1.5 bg-emerald-900 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: '85%' }} />
                   </div>
                </div>
             </div>

             <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                   <div className="w-8 h-8 rounded-lg bg-brass/20 flex items-center justify-center flex-shrink-0">
                     <TrendingUp size={14} className="text-brass" />
                   </div>
                   <div>
                     <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-black mb-1">Yield Jump</p>
                     <p className="text-lg text-white font-bold">+{yieldBumpMap[tier]}%</p>
                   </div>
                </div>
                <div className="flex items-start space-x-3">
                   <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                     <CheckCircle size={14} className="text-blue-400" />
                   </div>
                   <div>
                     <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-black mb-1">Break-Even</p>
                     <p className="text-lg text-white font-bold">{payloadBreakEven.toFixed(1)} Years</p>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default CommercialROI;
