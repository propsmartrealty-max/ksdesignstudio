import React, { useState } from 'react';
import { Camera, ChevronLeft, ChevronRight, Info, Maximize2 } from 'lucide-react';

const hotspots = [
  { id: 1, x: '25%', y: '45%', title: 'Minimalist Dining', desc: 'Custom oak wood slab with brass inlay.' },
  { id: 2, x: '65%', y: '35%', title: 'Sculptural Lighting', desc: 'Bespoke chandelier by KS Studio.' },
  { id: 3, x: '45%', y: '75%', title: 'Tectonic Flooring', desc: 'Seamless Italian Statuario marble.' }
];

const scenes = [
  { id: 'living', title: 'The Living Monograph', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2400' },
  { id: 'bedroom', title: 'The Master Sanctuary', url: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?q=80&w=2400' },
  { id: 'balcony', title: 'The Sky Deck', url: 'https://images.unsplash.com/photo-1600607687940-47a04b629571?q=80&w=2400' }
];

const LiveWalkthrough: React.FC = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  return (
    <section className="py-32 bg-white overflow-hidden text-charcoal relative border-y border-slate-50">
      <div className="absolute inset-0 pointer-events-none opacity-5 architect-grid" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left">
          <div>
            <span className="text-brass font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
              Experience the Narrative
            </span>
            <h2 className="text-5xl md:text-6xl leading-tight">
              Live 3D <br /> <span className="italic text-slate-100 font-light">Walkthrough</span>
            </h2>
          </div>
          <div className="flex items-center space-x-6">
             <div className="text-right hidden md:block">
                <p className="text-[10px] uppercase tracking-widest font-black text-charcoal/30">Current Perspective</p>
                <p className="text-brass font-bold text-xl">{scenes[currentScene].title}</p>
             </div>
             <button className="p-4 rounded-full border border-slate-100 hover:border-brass transition-colors">
                <Maximize2 size={18} />
             </button>
          </div>
        </div>

        {/* Viewport */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[3rem] overflow-hidden bg-slate-50 border border-slate-100 group shadow-2xl">
          {/* Main Image */}
          <div className="absolute inset-0 transition-luxury">
            <img 
              src={scenes[currentScene].url} 
              alt="Walkthrough Scene" 
              className="w-full h-full object-cover opacity-90 scale-105 animate-slow-zoom"
            />
          </div>

          {/* HUD Overlay */}
          <div className="absolute inset-0 border-[20px] md:border-[40px] border-white pointer-events-none z-20 opacity-40" />
          
          {/* Hotspots */}
          {hotspots.map((spot) => (
            <div 
              key={spot.id}
              className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: spot.x, top: spot.y }}
              onMouseEnter={() => setActiveHotspot(spot.id)}
              onMouseLeave={() => setActiveHotspot(null)}
            >
              <button className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-brass rounded-full animate-ping opacity-40" />
                <div className="w-4 h-4 bg-brass rounded-full border-2 border-white relative z-10" />
              </button>

              {activeHotspot === spot.id && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 bg-white text-charcoal p-4 rounded-xl shadow-2xl animate-fade-in pointer-events-none">
                  <h4 className="text-[10px] uppercase font-black tracking-widest text-brass mb-1">{spot.title}</h4>
                  <p className="text-[11px] leading-relaxed">{spot.desc}</p>
                </div>
              )}
            </div>
          ))}

          {/* Controls */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex items-center space-x-8 bg-white/90 backdrop-blur-xl px-12 py-5 rounded-full border border-slate-100 shadow-2xl">
            <button 
              onClick={() => setCurrentScene((prev) => (prev > 0 ? prev - 1 : scenes.length - 1))}
              className="hover:text-brass transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex space-x-3">
              {scenes.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${currentScene === i ? 'w-8 bg-brass' : 'bg-charcoal/10'}`} 
                />
              ))}
            </div>
            <button 
              onClick={() => setCurrentScene((prev) => (prev < scenes.length - 1 ? prev + 1 : 0))}
              className="hover:text-brass transition-colors text-charcoal/40"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="absolute top-12 left-12 z-40 hidden md:flex items-center space-x-4">
             <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center bg-white/40 backdrop-blur-md">
                <Camera size={16} />
             </div>
             <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-charcoal/40">Sovereign_View_Alpha_01</span>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
          {[
            { icon: <Info size={18} />, title: "Tectonic Context", desc: "Every volume is mapped to a structural monograph." },
            { icon: <Camera size={18} />, title: "Cinematic Access", desc: "Live-rendered cinematic pathing for full spatial immersion." },
            { icon: <Camera size={18} />, title: "Material Detail", desc: "Zoom capability for ultra-high-fidelity texture inspection." }
          ].map((item, i) => (
            <div key={i} className="flex space-x-6 p-8 rounded-3xl border border-slate-50 hover:bg-slate-50 transition-luxury group">
              <div className="text-brass group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest font-bold mb-2">{item.title}</h4>
                <p className="text-[12px] text-stone-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveWalkthrough;
