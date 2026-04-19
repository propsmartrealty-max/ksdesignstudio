import React from 'react';
import { MICRO_MARKETS } from '../constants';
import { MapPin } from 'lucide-react';

const MicroMarkets: React.FC = () => {
  return (
    <section className="py-32 bg-charcoal text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
                <span className="text-brass font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
                    Strategic Presence
                </span>
                <h2 className="text-5xl md:text-6xl  mb-10 leading-tight">
                    Dominating Pune’s <br /> <span className="italic text-white/40">Interior Landscape</span>
                </h2>
                <p className="text-white/50 text-xl font-light leading-relaxed mb-12">
                    From the high-rises of Baner to the sprawling bungalows of Bavdhan, KS Design Studio is the benchmark for luxury across Pune’s prime micro-markets.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                    {MICRO_MARKETS.map((market, i) => (
                        <div key={i} className="flex items-center space-x-3 group cursor-default">
                            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-brass group-hover:border-brass transition-all">
                                <MapPin size={12} className="text-white/40 group-hover:text-white" />
                            </div>
                            <span className="text-xs uppercase tracking-widest font-bold text-white/60 group-hover:text-white transition-colors">
                                {market}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative">
                <div className="aspect-square glass-dark rounded-full flex items-center justify-center p-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brass/5 animate-pulse" />
                    <div className="text-center relative z-10">
                        <div className="text-8xl  text-brass mb-4">#01</div>
                        <div className="text-[10px] uppercase tracking-[0.5em] font-black text-white/40">
                            Ranked Interior Firm <br /> in Pune Prime Sites
                        </div>
                    </div>
                    
                    {/* Floating decorative elements */}
                    <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-white/5 rounded-full animate-ping opacity-20" />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default MicroMarkets;
