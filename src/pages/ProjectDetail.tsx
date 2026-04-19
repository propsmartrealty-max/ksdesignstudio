import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ArrowLeft, MapPin, Calendar, Ruler, Clock, Crosshair, Plus } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = PROJECTS.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-charcoal text-center">
        <h1 className="text-4xl mb-4">Monograph Not Found</h1>
        <Link to="/portfolio" className="text-brass uppercase tracking-widest text-xs font-bold hover:underline">Return to Gallery</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-white min-h-screen">
      <section className="relative h-[85vh] overflow-hidden bg-white">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-60"
        />
        
        {/* Interactive Material Hotspots */}
        {project.materials && project.materials.length > 0 && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            {project.materials.map((mat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + (i * 0.2), duration: 0.8 }}
                className="absolute pointer-events-auto group"
                style={{ 
                  top: `${20 + (i * 15)}%`, 
                  left: `${30 + (i * 20)}%` 
                }}
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full border border-white/40 flex items-center justify-center cursor-pointer group-hover:scale-125 transition-all shadow-2xl">
                    <Plus size={14} className="text-white" />
                  </div>
                  <div className="absolute top-0 left-10 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 whitespace-nowrap">
                    <div className="glass-premium p-4 rounded-2xl border-white/60">
                      <p className="text-[10px] font-black uppercase tracking-widest text-brass mb-1">Material Source</p>
                      <p className="text-sm font-bold text-[#1A1A1A]">{mat.name}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
        <div className="absolute bottom-20 left-0 w-full px-6 lg:px-12 z-30">
          <div className="max-w-7xl mx-auto">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.5 }}
             >
               <Link to="/portfolio" className="flex items-center space-x-2 text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors mb-8 group">
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Back to Portfolio</span>
               </Link>
               <span className="text-brass tracking-[0.4em] uppercase text-[10px] font-black block mb-4">{project.category} — {project.location}</span>
               <h1 className="text-6xl md:text-9xl text-[#1A1A1A] max-w-5xl tracking-tighter font-black leading-[0.85] mb-4">{project.title}</h1>
             </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-8 space-y-16"
          >
            <div className="space-y-6">
               <h2 className="text-3xl text-charcoal">The Narrative</h2>
               <p className="text-zinc-600 text-xl leading-relaxed font-medium">
                 {project.fullDescription || project.description}
               </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-stone-100">
               <div className="space-y-4">
                  <h3 className="text-[10px] uppercase tracking-widest font-black text-zinc-400">Project Specifications</h3>
                  <ul className="space-y-3">
                     <li className="flex items-center space-x-3 text-sm text-charcoal/70">
                        <Ruler size={14} className="text-brass" />
                        <span>{project.area} of curated volume</span>
                     </li>
                     <li className="flex items-center space-x-3 text-sm text-charcoal/70">
                        <Calendar size={14} className="text-brass" />
                        <span>Commissioned in {project.year}</span>
                     </li>
                     <li className="flex items-center space-x-3 text-sm text-charcoal/70">
                        <Clock size={14} className="text-brass" />
                        <span>{project.duration} execution cycle</span>
                     </li>
                  </ul>
               </div>
               <div className="space-y-4">
                  <h3 className="text-[10px] uppercase tracking-widest font-black text-zinc-400">Design DNA</h3>
                  <ul className="space-y-3">
                     <li className="flex items-center space-x-3 text-sm text-charcoal/70 italic">
                        "Material Honesty" Protocol
                     </li>
                     <li className="flex items-center space-x-3 text-sm text-charcoal/70 italic">
                        "Sculptural Light" Mapping
                     </li>
                  </ul>
               </div>
            </div>

            {/* Material Palette Section */}
            {project.materials && project.materials.length > 0 && (
              <div className="pt-20 border-t border-stone-100">
                <span className="text-brass tracking-[0.4em] uppercase text-[10px] font-black block mb-10">Material Intelligence</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {project.materials.map((material, idx) => (
                    <div key={idx} className="glass-premium p-8 rounded-3xl border-zinc-200/40 group hover:border-brass/30 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-zinc-900 text-white flex items-center justify-center mb-6 group-hover:bg-brass transition-colors">
                        <span className="text-[10px] font-black">{idx + 1}</span>
                      </div>
                      <h4 className="text-lg text-[#1A1A1A] font-bold mb-3">{material.name}</h4>
                      <p className="text-zinc-500 text-xs leading-relaxed font-medium">{material.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-4 lg:sticky lg:top-32 space-y-12 h-fit"
          >
             <div className="glass-premium p-12 rounded-[3.5rem] border-white/60 shadow-[0_50px_100px_rgba(0,0,0,0.05)] relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-3xl mb-6 text-[#1A1A1A] font-black tracking-tighter">Initiate Design</h3>
                  <p className="text-zinc-500 text-lg mb-10 leading-relaxed font-medium">
                    Inspired by this narrative? Start a bespoke professional consultation to calibrate your space.
                  </p>
                  <Link to="/contact" className="block w-full py-8 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-[0.5em] font-black text-center hover:bg-brass transition-all shadow-2xl rounded-[2rem]">
                    Request Brief
                  </Link>
                </div>
             </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
