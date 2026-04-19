import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { Search } from 'lucide-react';

const DesignIdeas: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const roomCategories = [
    'All', 'Culinary Labs (Kitchen)', 'Sanctuaries (Bedroom)', 'Volumes (Living)', 'Corporate Contexts', 'Aesthetic DNA'
  ];

  // Mapping simple categories to project categories for filtering
  const getFilteredItems = () => {
    if (activeCategory === 'All') return PROJECTS;
    if (activeCategory.includes('Living')) return PROJECTS.filter(p => p.category === 'Residential');
    if (activeCategory.includes('Kitchen')) return PROJECTS.filter(p => p.category === 'Residential');
    if (activeCategory.includes('Bedroom')) return PROJECTS.filter(p => p.category === 'Bungalow' || p.category === 'Villa');
    if (activeCategory.includes('Corporate')) return PROJECTS.filter(p => p.category === 'Commercial');
    return PROJECTS;
  };

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-24">
          <span className="text-brass tracking-[0.5em] uppercase text-[10px] font-black block mb-6">Discovery_Engine</span>
          <h1 className="text-6xl md:text-8xl text-charcoal mb-10">
            Design <span className="italic font-light text-slate-200">Idea Registry.</span>
          </h1>
          <p className="text-stone-400 max-w-2xl mx-auto font-light text-lg">
             Explore a curated library of spatial narratives and tectonic details for every volume of your residence.
          </p>
        </div>

        {/* Filter Navigation - Livspace Mirroring */}
        <div className="flex flex-wrap justify-center gap-10 mb-20">
           {roomCategories.map((cat) => (
             <button
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`text-[10px] uppercase tracking-[0.3em] font-black pb-4 border-b-2 transition-all ${
                 activeCategory === cat ? 'border-brass text-charcoal' : 'border-transparent text-charcoal/30 hover:text-charcoal'
               }`}
             >
               {cat}
             </button>
           ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
           {getFilteredItems().map((item) => (
             <div key={item.id} className="group cursor-pointer">
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden mb-8 relative shadow-2xl">
                   <img 
                      src={item.imageUrl} 
                      alt={item.alt} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                   />
                   <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center text-charcoal scale-0 group-hover:scale-100 transition-transform">
                         <Search size={24} />
                      </div>
                   </div>
                </div>
                <div className="px-6">
                   <span className="text-brass text-[9px] uppercase tracking-[0.4em] font-bold block mb-2">{item.location}</span>
                   <h3 className="text-xl text-charcoal group-hover:text-brass transition-colors">{item.title}</h3>
                </div>
             </div>
           ))}
        </div>

        {/* Discovery Footer */}
        <div className="mt-40 p-20 bg-slate-50 rounded-[3rem] text-center border border-slate-100">
           <h2 className="text-4xl text-charcoal mb-8">Ready to synthesize <br /><span className="italic font-light text-slate-200">your unique narrative?</span></h2>
           <button className="px-16 py-8 bg-charcoal text-white uppercase tracking-[0.4em] text-[10px] font-black hover:bg-brass transition-luxury">
             Book Tectonic Consultation
           </button>
        </div>
      </div>
    </div>
  );
};

export default DesignIdeas;
