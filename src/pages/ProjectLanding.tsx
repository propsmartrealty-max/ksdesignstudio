import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, CheckCircle, ArrowRight, Building, ShieldCheck, Trophy } from 'lucide-react';
import { PROJECTS } from '../constants';

const ProjectLanding: React.FC = () => {
  const { projectName } = useParams<{ projectName: string }>();
  
  // Format project name for display
  const formattedProject = projectName?.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Luxury Residency';

  // Find if we have a real project matching this
  const existingProject = PROJECTS.find(p => p.title.toLowerCase().includes(formattedProject.toLowerCase()));

  return (
    <div className="pt-32 pb-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 architect-grid opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-16">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-brass mb-6">
              <Building size={16} />
              <span className="text-[10px] uppercase font-black tracking-[0.4em]">Elite Residence Protocol</span>
            </div>
            <h1 className="text-5xl md:text-7xl text-[#1A1A1A] leading-none tracking-tighter mb-8 font-black">
              Interiors at <br /> 
              <span className="italic font-light text-zinc-400">{formattedProject}.</span>
            </h1>
            <p className="text-zinc-500 text-xl font-medium leading-relaxed mb-10 max-w-xl">
               Calibrating high-fidelity interior monographs for the distinctive architectural silhouettes of {formattedProject}. Experience the pinnacle of Pune's residential design excellence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="bg-[#1A1A1A] text-white px-10 py-5 text-[10px] uppercase font-black tracking-widest rounded-full hover:bg-brass transition-all shadow-2xl">
                Initiate Project Brief
              </Link>
              <Link to="/portfolio" className="glass-premium px-10 py-5 text-[10px] uppercase font-black tracking-widest rounded-full border-zinc-200/40 hover:border-brass transition-all">
                Gallery Monograph
              </Link>
            </div>
          </div>
          
          <div className="flex-grow aspect-video lg:aspect-square max-w-xl bg-zinc-100 rounded-[4rem] relative overflow-hidden shadow-2xl">
             <img 
               src={existingProject?.imageUrl || "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200"} 
               alt={`${formattedProject} Interiors`} 
               className="w-full h-full object-cover opacity-80"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
             <div className="absolute bottom-10 left-10">
                <span className="text-brass text-[10px] uppercase font-black tracking-[0.5em] block mb-2">Signature Estate</span>
                <p className="text-white text-3xl font-black tracking-tighter">{formattedProject}</p>
             </div>
          </div>
        </div>

        {/* Project Specific USPs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          <div className="glass-premium p-12 rounded-[3.5rem] border-white/60 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <Trophy size={80} />
            </div>
            <h3 className="text-2xl font-black text-[#1A1A1A] mb-6 tracking-tighter">Spatial Caliber</h3>
            <p className="text-sm text-zinc-500 leading-relaxed font-medium mb-8">
               Designing specifically for the floor-plate nuances and structural logic of {formattedProject}. Every square foot is optimized for biophilic flow and acoustic excellence.
            </p>
            <ul className="space-y-4">
              {['Bespoke Modulars', 'Smart Home Integration', 'Italian Marble Joinery'].map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-[10px] font-black text-[#1A1A1A] uppercase tracking-widest">
                  <CheckCircle size={14} className="text-brass" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-premium p-12 rounded-[3.5rem] border-white/60 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <ShieldCheck size={80} />
            </div>
            <h3 className="text-2xl font-black text-[#1A1A1A] mb-6 tracking-tighter">Execution Protocol</h3>
            <p className="text-sm text-zinc-500 leading-relaxed font-medium mb-8">
               Our turnkey management system ensures a zero-compromise transition from blueprint to reality, respecting the site protocols and quality standards of {formattedProject}.
            </p>
            <div className="flex items-center space-x-2 text-brass text-[10px] font-black uppercase tracking-widest">
               <span>Vetted Studio Network</span>
            </div>
          </div>

          <div className="bg-[#1A1A1A] p-12 rounded-[3.5rem] text-white flex flex-col justify-between group cursor-pointer hover:bg-brass transition-all duration-700">
            <div>
              <h3 className="text-2xl font-black mb-6 tracking-tighter">Project Briefing</h3>
              <p className="text-white/40 text-sm mb-12 italic leading-relaxed">Secure your exclusive interior design session for your residence at {formattedProject}.</p>
            </div>
            <Link to="/contact" className="flex items-center space-x-4">
               <span className="text-[11px] uppercase font-black tracking-[0.5em]">Initiate Brief</span>
               <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectLanding;
