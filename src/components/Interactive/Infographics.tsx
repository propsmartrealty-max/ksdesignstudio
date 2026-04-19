import React from 'react';
import { Ruler, Sparkles, Shield, Zap } from 'lucide-react';

const Infographics: React.FC = () => {
  const data = [
    {
      title: "Space Optimization Index",
      value: "35%",
      desc: "Average volume increase via tectonic restructuring.",
      icon: <Ruler className="text-brass" size={24} />,
      color: "bg-brass/10"
    },
    {
      title: "Material Longevity",
      value: "25Y+",
      desc: "Lifecycle of our curated basalt and teak selections.",
      icon: <Shield className="text-brass" size={24} />,
      color: "bg-brass/10"
    },
    {
      title: "Natural Light Gain",
      value: "60%",
      desc: "Improvement in lux levels through spatial transparency.",
      icon: <Sparkles className="text-brass" size={24} />,
      color: "bg-brass/10"
    },
    {
      title: "Energy Efficiency",
      value: "A+",
      desc: "Thermal regulation via material-first insulation.",
      icon: <Zap className="text-brass" size={24} />,
      color: "bg-brass/10"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 architect-grid opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brass tracking-[0.5em] uppercase text-[10px] font-black block mb-4">Design elements data</span>
          <h2 className="text-4xl md:text-5xl text-charcoal">The Tectonic <span className="italic font-light text-slate-100">Intelligence.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-luxury relative overflow-hidden">
              <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <p className="text-5xl font-black text-charcoal mb-4">{item.value}</p>
              <h3 className="text-xs uppercase tracking-widest font-black text-charcoal/80 mb-2">{item.title}</h3>
              <p className="text-[11px] text-charcoal/40 leading-relaxed font-bold">{item.desc}</p>
              
              {/* Blueprint Decoration */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-10 transition-opacity">
                 <div className="w-12 h-12 border border-brass rounded-full animate-ping" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Material Longevity Infographic SVG */}
        <div className="mt-20 p-12 bg-slate-50 rounded-[3rem] text-charcoal overflow-hidden relative group border border-slate-100">
           <div className="absolute inset-0 architect-grid opacity-5 pointer-events-none" />
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                 <span className="text-brass tracking-[0.4em] uppercase text-[10px] font-black block">Interactive Intelligence</span>
                 <h3 className="text-4xl leading-tight">Material Performance <br /> <span className="italic text-slate-200">& Durability Index</span></h3>
                 <p className="text-stone-500 font-light text-lg">A technical comparison of premium interior materials used by KS Design Studio across Pune projects.</p>
                 
                 <div className="space-y-6 pt-4">
                    {[
                      { l: 'Italian Marble', p: '95%', c: 'bg-brass' },
                      { l: 'Burma Teak', p: '88%', c: 'bg-brass/60' },
                      { l: 'Bespoke Metals', p: '92%', c: 'bg-brass/80' }
                    ].map((m, i) => (
                      <div key={i} className="space-y-2">
                         <div className="flex justify-between text-[10px] uppercase font-black tracking-widest text-charcoal/40">
                           <span>{m.l}</span>
                           <span>{m.p}</span>
                        </div>
                        <div className="h-1 bg-charcoal/5 rounded-full overflow-hidden">
                           <div className={`h-full ${m.c} transition-all duration-1000 w-0 group-hover:w-[${m.p}]`} style={{ width: i === 0 ? '95%' : (i === 1 ? '88%' : '92%') }} />
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="relative aspect-square bg-white rounded-full p-12 border border-slate-100 flex items-center justify-center shadow-xl">
                 <div className="absolute inset-0 animate-spin-slow opacity-10">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-brass">
                       <circle cx="50" cy="50" r="48" stroke="currentColor" fill="none" strokeWidth="0.5" strokeDasharray="10 5" />
                    </svg>
                 </div>
                 <div className="text-center">
                    <p className="text-6xl font-black text-brass">100%</p>
                    <p className="text-[10px] uppercase tracking-[0.5em] font-black text-charcoal/40 mt-4">Tectonic integrity</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Infographics;
