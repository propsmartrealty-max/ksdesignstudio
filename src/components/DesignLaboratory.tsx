import React from 'react';
import { STYLE_MONOLOGUES, DESIGN_CODE } from '../constants';
import { Zap, Trees, Move, Package, Layout, Minimize, ArrowUpRight, Check, X } from 'lucide-react';

const DesignLaboratory: React.FC = () => {
  const iconMap: any = {
    Zap: <Zap size={14} />,
    Tree: <Trees size={14} />,
    Move: <Move size={14} />,
    Package: <Package size={14} />,
    Layout: <Layout size={14} />,
    Minimize: <Minimize size={14} />
  };

  return (
    <section className="py-40 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
          <div className="max-w-2xl">
            <span className="text-brass tracking-[0.5em] uppercase text-[10px] font-black block mb-6">Design Laboratory</span>
            <h2 className="text-6xl md:text-8xl text-zinc-900 tracking-tighter leading-[0.9]">
              Thematic <br /> <span className="italic font-light text-zinc-400">Intelligence.</span>
            </h2>
          </div>
          <p className="text-zinc-500 font-medium max-w-sm leading-relaxed text-lg">
            A repository of architectural narratives and design patterns curated for the modern Indian silhouette.
          </p>
        </div>

        {/* Style Monologues */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-40">
          {STYLE_MONOLOGUES.map((style) => (
            <div key={style.id} className="group relative glass-premium rounded-[3rem] overflow-hidden border-white/40 shadow-xl transition-all duration-700 hover:-translate-y-2">
              <div className="h-[400px] overflow-hidden relative">
                <img 
                  src={style.imageUrl} 
                  alt={style.title} 
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[2s] ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                   <h3 className="text-3xl text-white font-bold tracking-tight mb-2">{style.title}</h3>
                   <p className="text-white/60 text-xs uppercase tracking-widest font-black">Monologue {style.id.split('-')[0]}</p>
                </div>
              </div>
              <div className="p-10 space-y-8 bg-white/10 backdrop-blur-md">
                <p className="text-zinc-600 text-sm leading-relaxed font-medium">
                  {style.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {style.principles?.map((p) => (
                    <span key={p} className="text-[9px] uppercase tracking-widest font-black px-3 py-1.5 bg-zinc-900/5 rounded-full text-zinc-500 border border-zinc-900/5">
                      {p}
                    </span>
                  ))}
                </div>
                <button className="flex items-center space-x-3 text-brass group/btn">
                  <span className="text-[10px] uppercase tracking-[0.4em] font-black">Explore Narrative</span>
                  <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* The Interior Code (Dos & Donts) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center border-t border-zinc-100 pt-40">
          <div className="space-y-12">
            <div>
              <span className="text-brass tracking-[0.5em] uppercase text-[10px] font-black block mb-6">Execution Guidelines</span>
              <h2 className="text-5xl md:text-7xl text-zinc-900 tracking-tighter leading-none mb-10">
                The Interior <br /> <span className="italic font-light text-zinc-400">Code.</span>
              </h2>
              <p className="text-zinc-600 font-medium text-lg max-w-md leading-relaxed">
                Rules of engagement for high-fidelity spatial design. We prioritize material honesty over generic aesthetics.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12">
               <div className="space-y-6">
                 <h4 className="text-[10px] uppercase tracking-[0.6em] font-black text-zinc-900 flex items-center space-x-3">
                   <span className="w-8 h-px bg-zinc-900/20" />
                   <span>The Affirmations (Dos)</span>
                 </h4>
                 <div className="space-y-6">
                    {DESIGN_CODE.dos.map((item) => (
                      <div key={item.title} className="flex space-x-6 group">
                        <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center shrink-0 shadow-lg group-hover:bg-brass transition-colors">
                          <Check size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900 uppercase tracking-widest text-xs mb-1">{item.title}</p>
                          <p className="text-zinc-500 text-sm font-medium leading-relaxed">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                 </div>
               </div>
            </div>
          </div>

          <div className="glass-premium p-12 lg:p-20 rounded-[4rem] border-zinc-200/60 shadow-2xl relative overflow-hidden group/donts">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover/donts:scale-110 transition-all duration-[3s]">
               <X size={120} className="text-zinc-900" />
            </div>
            <div className="relative z-10 space-y-12">
               <h4 className="text-[10px] uppercase tracking-[0.6em] font-black text-zinc-400 flex items-center space-x-3">
                 <span className="w-8 h-px bg-zinc-400/20" />
                 <span>The Restraints (Donts)</span>
               </h4>
               <div className="space-y-12">
                  {DESIGN_CODE.donts.map((item) => (
                    <div key={item.title} className="flex space-x-6">
                       <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 text-zinc-300 flex items-center justify-center shrink-0 shadow-sm">
                        <X size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-zinc-400 uppercase tracking-widest text-xs mb-1">{item.title}</p>
                        <p className="text-zinc-400 text-sm font-medium leading-relaxed italic">{item.detail}</p>
                      </div>
                    </div>
                  ))}
               </div>
               <div className="pt-10 border-t border-zinc-200/20">
                  <p className="text-[9px] uppercase tracking-[0.5em] font-black text-zinc-400/60 transition-colors group-hover/donts:text-zinc-900 duration-1000">
                    Sourced Stones • Timber Hub • Neural Fabrics
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignLaboratory;
