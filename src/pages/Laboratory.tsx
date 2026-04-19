import StyleQuiz from '../components/StyleQuiz';
import { Link } from 'react-router-dom';
import { FlaskConical, Sparkles, Palette, Fingerprint, Microscope, FileText, ArrowRight, Layout } from 'lucide-react';
import VisionLab from '../components/VisionLab';
import AIPaletteGenerator from '../components/AIPaletteGenerator';
import SpatialAudit from '../components/SpatialAudit';
import RoomSynthesis from '../components/RoomSynthesis';
import MaterialVault from '../components/MaterialVault';

const Laboratory: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-white relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 architect-grid opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <div className="flex justify-center mb-8">
            <div className="p-5 bg-brass/10 rounded-full animate-pulse">
               <FlaskConical size={32} className="text-brass" />
            </div>
          </div>
          <span className="text-brass font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block">Experimental_Volume_03</span>
          <h1 className="text-6xl md:text-8xl text-zinc-900 tracking-tighter mb-8 transition-all duration-1000">
            The <span className="italic font-light text-zinc-400">Laboratory.</span>
          </h1>
          <p className="text-zinc-500 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
             A high-performance neural environment where architectural research meets professional design intelligence. Calibrate your spatial intent through our proprietary laboratory modules.
          </p>
        </div>

        {/* Lab Module 01: Vision Lab */}
        <section className="mb-32">
          <div className="flex items-center space-x-4 mb-12">
            <Sparkles size={20} className="text-brass" />
            <h2 className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-900/40">Module_Alpha // Vision Lab</h2>
          </div>
          <div className="glass-premium p-10 rounded-[3rem] border-white/40 shadow-2xl">
            <VisionLab />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Lab Module 02: Neural Style Mapping */}
          <section>
            <div className="flex items-center space-x-4 mb-8">
              <Fingerprint size={20} className="text-brass" />
              <h2 className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-900/40">Module_Beta // Neural Style Mapping</h2>
            </div>
            <div className="glass-premium p-10 rounded-[3rem] border-white/40 h-full">
              <StyleQuiz />
            </div>
          </section>

          {/* Lab Module 03: Atmospheric Palette */}
          <section>
            <div className="flex items-center space-x-4 mb-8">
              <Palette size={20} className="text-brass" />
              <h2 className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-900/40">Module_Gamma // Atmospheric Palette</h2>
            </div>
            <div className="glass-premium p-10 rounded-[3rem] border-white/40 h-full">
              <AIPaletteGenerator />
            </div>
          </section>
        </div>
        
        {/* Lab Module 04: Spatial Audit & DNA Analysis */}
        <section className="mt-32">
          <div className="flex items-center space-x-4 mb-12">
            <Layout className="text-brass" size={20} />
            <h2 className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-900/40">Module_Epsilon // Spatial Audit</h2>
          </div>
          <div className="glass-premium p-10 rounded-[3rem] border-white/40 shadow-2xl">
            <SpatialAudit />
          </div>
        </section>

        {/* Lab Module 05: Room Synthesis Engine */}
        <section className="mt-32">
          <div className="flex items-center space-x-4 mb-12">
            <Sparkles className="text-brass" size={20} />
            <h2 className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-900/40">Module_Theta // Room Synthesis Engine</h2>
          </div>
          <div className="glass-premium p-10 rounded-[3rem] border-white/40 shadow-2xl">
            <RoomSynthesis />
          </div>
        </section>

        {/* Lab Module 06: Material Intelligence */}
        <section className="mt-32">
          <div className="flex items-center space-x-4 mb-12">
            <Microscope size={20} className="text-brass" />
            <h2 className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-900/40">Module_Eta // Material Intelligence</h2>
          </div>
          <MaterialVault />
        </section>

        {/* Lab Conclusion: Export Protocol */}
        <section className="mt-32 pt-24 border-t-2 border-zinc-900 overflow-hidden">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
              <div className="lg:col-span-7">
                 <div className="inline-flex items-center space-x-3 text-brass mb-6">
                    <FileText size={20} />
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black">Export Protocol</span>
                 </div>
                 <h2 className="text-5xl md:text-7xl text-[#1A1A1A] font-black tracking-tighter mb-8 leading-none">
                    Finalize <br/><span className="italic font-light text-zinc-400">Spatial Vision.</span>
                 </h2>
                 <p className="text-zinc-500 text-xl font-medium leading-relaxed max-w-xl">
                    Once you have calibrated your style DNA and atmospheric palette, synthesize these findings into a professional high-fidelity monograph. 
                 </p>
              </div>
              <div className="lg:col-span-5">
                 <Link 
                    to="/laboratory/report"
                    className="group bg-[#1A1A1A] text-white p-16 rounded-[3.5rem] flex flex-col justify-between h-80 hover:bg-brass transition-all duration-1000 shadow-2xl relative overflow-hidden"
                 >
                    <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                       <FileText size={120} />
                    </div>
                    <div className="relative z-10 flex justify-between items-start">
                       <span className="text-[11px] uppercase tracking-[0.5em] font-black">Protocol_v4.0</span>
                    </div>
                    <div className="relative z-10">
                       <h3 className="text-3xl font-black mb-4 flex items-center">
                          Generate Brief <ArrowRight size={24} className="ml-4 transform group-hover:translate-x-2 transition-transform" />
                       </h3>
                       <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Ready for Export</p>
                    </div>
                 </Link>
              </div>
           </div>
        </section>
        
        {/* Technical Footer */}
        <div className="mt-40 pt-20 border-t border-charcoal/5 flex flex-col md:flex-row justify-between items-center text-[8px] uppercase font-black tracking-[0.5em] text-charcoal/20">
           <p>Engine: ANTIGRAVITY_NEURAL_V2.0</p>
           <p>Status: All Modules Calibrated</p>
           <p>Studio: KS_DESIGN_LAB_PUNE</p>
        </div>
      </div>
    </div>
  );
};

export default Laboratory;
