import React, { useState } from 'react';
import { Calculator, ChevronRight, Layout, Home, Box } from 'lucide-react';

const PricingEstimator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('kitchen');
  const [area, setArea] = useState(150);
  const [quality, setQuality] = useState('Premium');
  const [city, setCity] = useState('Pune');

  const cityMultipliers: any = {
    'Pune': 1.0,
    'Mumbai': 1.25,
    'Goa': 1.15,
    'Indore': 0.95
  };

  const tabs = [
    { id: 'kitchen', icon: Layout, label: 'Kitchen' },
    { id: 'wardrobe', icon: Box, label: 'Wardrobe' },
    { id: 'full-home', icon: Home, label: 'Full Home' }
  ];

  const calculateEstimate = () => {
    let multiplier = quality === 'Ultra' ? 1800 : 1200;
    if (activeTab === 'kitchen') multiplier *= 1.5;
    if (activeTab === 'full-home') multiplier = quality === 'Ultra' ? 1650 : 1100;
    
    // Apply City Factor
    multiplier *= cityMultipliers[city];
    
    return (area * multiplier).toLocaleString('en-IN', {
      maximumFractionDigits: 0,
      style: 'currency',
      currency: 'INR'
    });
  };

  return (
    <section className="py-32 bg-transparent text-[#1A1A1A] relative overflow-hidden">
      <div className="absolute inset-0 bg-zinc-900/5 backdrop-blur-[2px] -z-10" />
      <div className="absolute inset-0 architect-grid opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div>
            <span className="text-brass tracking-[0.6em] uppercase text-[10px] font-black block mb-6">Price Estimator</span>
            <h2 className="text-5xl md:text-7xl tracking-tighter leading-[0.9] mb-10">
              Estimate your home <br /> <span className="italic font-light text-brass/70">interior cost.</span>
            </h2>
            <p className="text-zinc-600 font-medium text-lg mb-12 max-w-lg leading-relaxed">
              Plan your home interior budget with ease. Select your home size and design preferences to get started.
            </p>
            
            <div className="flex flex-col space-y-6">
              <div className="flex items-center space-x-6 text-brass">
                 <div className="w-12 h-12 rounded-full border border-brass/50 flex items-center justify-center">
                    <Calculator size={20} />
                 </div>
                 <span className="text-[10px] uppercase tracking-[0.3em] font-black">Accurate Estimation Engine</span>
              </div>
              <p className="text-white/70 text-xs italic font-medium">
                *Estimates are based on current market rates and high-quality material standards.
              </p>
            </div>
          </div>

          <div className="glass-premium p-10 md:p-16 rounded-[4rem] border-white/60 shadow-2xl">
            {/* Tabs */}
            <div className="flex justify-between mb-12 bg-white/5 rounded-3xl p-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-3 py-4 rounded-2xl transition-all duration-500 ${
                    activeTab === tab.id ? 'bg-zinc-900 text-white shadow-xl' : 'text-zinc-400 hover:text-zinc-600'
                  }`}
                >
                  <tab.icon size={18} />
                  <span className="text-[10px] uppercase tracking-widest font-black">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Inputs */}
            <div className="space-y-10">
              <div>
                <div className="flex justify-between mb-6">
                  <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500">Approximate Area (Sq.Ft.)</label>
                  <span className="text-brass font-bold">{area} sq.ft.</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="10000" 
                  value={area} 
                  onChange={(e) => setArea(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-brass"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500 block mb-6">Execution Location</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Pune', 'Mumbai', 'Goa', 'Indore'].map(c => (
                      <button
                        key={c}
                        onClick={() => setCity(c)}
                        className={`py-4 rounded-xl border text-[9px] uppercase tracking-widest font-black transition-all duration-500 ${
                          city === c ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-lg' : 'bg-white/10 border-zinc-200 text-zinc-400 hover:border-zinc-400'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500 block mb-6">Material Specification</label>
                <div className="grid grid-cols-2 gap-4">
                    {['Premium', 'Ultra'].map(q => (
                      <button
                        key={q}
                        onClick={() => setQuality(q)}
                        className={`py-5 rounded-2xl border text-[10px] uppercase tracking-widest font-black transition-all duration-500 shadow-md ${
                          quality === q ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xl' : 'bg-white/10 border-zinc-200 text-zinc-400 hover:border-zinc-400'
                        }`}
                      >
                        {q} Project
                      </button>
                    ))}
                </div>
              </div>

              {/* Result Overlay */}
              <div className="pt-10 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-[0.5em] font-black text-zinc-400 block mb-4">Estimated Total Cost</span>
                <div className="text-4xl md:text-6xl font-black text-brass tracking-tighter mb-10">
                  {calculateEstimate()}*
                </div>
                
                <button className="w-full bg-brass py-8 rounded-3xl flex items-center justify-center group hover:bg-white transition-all duration-700 shadow-2xl">
                  <span className="text-white group-hover:text-charcoal text-[11px] uppercase tracking-[0.5em] font-black mr-4 font-bold">Get Detailed Quote</span>
                  <ChevronRight size={18} className="text-white/40 group-hover:text-brass" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PricingEstimator;
