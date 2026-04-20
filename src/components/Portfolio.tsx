import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { PROJECTS } from '../constants';
import { useApp } from '../context/AppContext';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Residential', 'Commercial', 'Bungalow', 'Villa'];
  const { toggleProjectShortlist, isProjectShortlisted } = useApp();

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <section className="py-24 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-brass tracking-widest uppercase text-xs font-bold block mb-4">Portfolio</span>
            <h2 className="text-4xl md:text-5xl text-charcoal">Curated <span className="italic font-light text-slate-100">Creations</span></h2>
          </div>
          
          <div className="flex flex-wrap gap-4 sm:gap-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all border-b-2 py-2 ${
                  filter === cat ? 'border-brass text-charcoal' : 'border-transparent text-charcoal/40 hover:text-charcoal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredProjects.map((project) => (
            <div key={project.id} className="relative group">
              <Link to={`/portfolio/${project.id}`} className="relative overflow-hidden bg-white border border-slate-100 rounded-[2rem] shadow-xl block">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={`Best Interior Designer Pune | ${project.title} - ${project.category} Design in ${project.location}`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                </div>
                
                {/* Architectural Annotation Overlays */}
                <div className="absolute top-6 left-6 z-20 pointer-events-none transition-all duration-700 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0">
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-brass rounded-full" />
                    <span className="text-[8px] text-brass/80 font-black tracking-[0.3em] uppercase">{project.area} | {project.year}</span>
                  </div>
                  <div className="h-[1px] w-20 bg-brass/30 mt-1" />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
                
                <div className="absolute bottom-0 left-0 w-full p-8 transition-transform duration-500">
                  <p className="text-brass text-[10px] uppercase tracking-[0.3em] font-bold mb-2">
                    {project.category} — {project.location}
                  </p>
                  <h3 className="text-charcoal text-2xl mb-4">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-charcoal/40 text-[10px] uppercase font-bold tracking-widest">{project.duration} Engagement</span>
                    <span className="text-charcoal/20 text-[9px] uppercase tracking-[0.2em]">Verified Architecture</span>
                  </div>
                </div>

                <div className="absolute top-8 right-8 overflow-hidden">
                  <span className="inline-block text-charcoal/40 text-[10px] uppercase tracking-widest opacity-0 -translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    Ref No: KS_{project.id}
                  </span>
                </div>
              </Link>

              {/* Shortlist Toggle */}
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleProjectShortlist(project);
                }}
                className={`absolute top-6 right-6 z-30 p-4 rounded-full backdrop-blur-md transition-all duration-500 ${
                  isProjectShortlisted(project.id) 
                    ? 'bg-brass text-white shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
                    : 'bg-white/20 text-white hover:bg-white hover:text-brass'
                }`}
              >
                <Heart size={18} fill={isProjectShortlisted(project.id) ? "currentColor" : "none"} strokeWidth={2.5} />
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-100 -z-10" />
          <button className="px-12 py-5 bg-white border border-charcoal/10 text-charcoal text-[10px] uppercase tracking-[0.4em] font-black hover:border-brass hover:text-brass transition-all duration-500 relative z-10 shadow-sm rounded-full">
            View All Work
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;