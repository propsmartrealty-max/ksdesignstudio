import React from 'react';
import { SERVICES } from '../constants';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {SERVICES.map((svc) => (
        <Link 
          to={svc.path} 
          key={svc.id} 
          className="group glass-premium p-4 rounded-[3rem] border-white/40 hover:border-brass transition-all duration-700 hover:shadow-2xl hover:translate-y-[-8px] flex flex-col items-center text-center"
        >
          {/* Image Container with Livspace-inspired rounded topology */}
          <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden mb-8 relative">
            <img 
              src={svc.imageUrl} 
              alt={svc.alt} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
          
          {/* Typography Hardening */}
          <div className="px-4 pb-4 flex flex-col items-center">
            <h3 className="text-xl md:text-2xl  text-charcoal mb-4 group-hover:text-brass transition-colors duration-500">
              {svc.title}
            </h3>
            <p className="text-stone-500 text-xs font-light leading-relaxed mb-8 max-w-[200px]">
              {svc.description}
            </p>
            
            {/* Minimalist Protocol Arrow */}
            <div className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center group-hover:border-brass group-hover:bg-brass group-hover:text-white transition-all duration-500 mt-auto">
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ServicesGrid;
