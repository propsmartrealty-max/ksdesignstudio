import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';

const categories = ['All', 'Kitchen', 'Living', 'Bedroom', 'Office', 'Exterior'];

const MasonryGallery: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-brass tracking-[0.6em] uppercase text-[10px] font-black block mb-4">Design Ideas</span>
            <h2 className="text-4xl md:text-6xl text-charcoal tracking-tighter leading-none mb-6">
              Inspiration for every <span className="italic font-light text-brass/70">volume.</span>
            </h2>
            <p className="text-charcoal/70 font-light text-lg">
              Explore our curation of high-fidelity spatial narratives across major metros.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.3em] font-black transition-all duration-500 border ${
                  filter === cat 
                    ? 'bg-charcoal text-white border-charcoal' 
                    : 'bg-transparent text-charcoal/60 border-charcoal/10 hover:border-brass/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-6">
                  <img 
                    src={project.imageUrl} 
                    alt={project.alt}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                     <span className="text-white text-[10px] uppercase tracking-[0.5em] font-black border border-white/40 px-8 py-3 rounded-full backdrop-blur-md">View Project</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl text-charcoal group-hover:text-brass transition-colors mb-2">{project.title}</h4>
                  <p className="text-charcoal/60 text-[10px] uppercase tracking-[0.4em] font-black">{project.location}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default MasonryGallery;
