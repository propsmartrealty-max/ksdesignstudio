import React, { useState } from 'react';
import { MATERIAL_TAXONOMY } from '../constants';
import { Gem, Box, Layers, MapPin, Zap, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Material } from '../types';

const MaterialCard: React.FC<{ material: Material }> = ({ material }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const { toggleMaterialShortlist, isMaterialShortlisted } = useApp();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const isShortlisted = isMaterialShortlisted(material.name);

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="glass-premium p-8 rounded-[2rem] border-zinc-200/40 group hover:border-brass/40 transition-all duration-500 relative overflow-hidden h-full flex flex-col"
      style={{
        background: isHovering 
          ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(197, 165, 114, 0.08) 0%, transparent 60%)`
          : undefined
      }}
    >
      <div className="flex justify-between items-start mb-4 relative z-10 transition-transform duration-700">
        <div className="flex-grow pr-8">
          <h4 className="text-xl font-bold text-[#1A1A1A] leading-tight mb-2">{material.name}</h4>
          {material.origin && (
            <span className="text-[8px] uppercase tracking-widest font-black text-zinc-400 border border-zinc-200 px-2 py-1 rounded-full">{material.origin}</span>
          )}
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleMaterialShortlist(material);
          }}
          className={`shrink-0 p-2 rounded-full transition-all duration-500 ${
            isShortlisted ? 'bg-brass text-white' : 'bg-zinc-100 text-zinc-300 hover:text-brass'
          }`}
        >
          <Heart size={14} fill={isShortlisted ? "currentColor" : "none"} />
        </button>
      </div>
      <p className="text-zinc-500 text-xs leading-relaxed font-bold mb-6 italic relative z-10">
        {material.description}
      </p>
      
      <div className="mt-auto pt-4 border-t border-zinc-900/5 space-y-4 relative z-10">
        <div className="flex items-center justify-between">
            <span className="text-[8px] uppercase tracking-widest font-black text-brass">Metric // {material.property}</span>
            <Zap size={10} className={`text-brass transition-all duration-700 ${isHovering ? 'opacity-100 scale-125' : 'opacity-20'}`} />
        </div>
        
        {material.partners && (
          <div className="pt-2">
            <p className="text-[7px] uppercase tracking-widest font-black text-zinc-300 mb-2">Vetted Network</p>
            <div className="flex flex-wrap gap-2">
              {material.partners.map((partner: string) => (
                <span key={partner} className="flex items-center space-x-1 text-[8px] font-bold text-zinc-500 bg-zinc-50 px-2 py-1 rounded-md">
                  <MapPin size={8} className="text-brass" />
                  <span>{partner}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Atmospheric Secondary Light Source */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
        style={{
            background: `radial-gradient(circle at ${100 - mousePos.x}% ${100 - mousePos.y}%, rgba(26, 26, 26, 0.03) 0%, transparent 40%)`
        }}
      />
    </div>
  );
};

const MaterialVault: React.FC = () => {
  const icons: any = {
    'Sourced Stones': <Gem size={18} />,
    'Timber Hub': <Box size={18} />,
    'Neural Fabrics': <Layers size={18} />
  };

  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {MATERIAL_TAXONOMY.map((category) => (
          <div key={category.category} className="space-y-8 flex flex-col">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-zinc-900 rounded-2xl text-white">
                {icons[category.category]}
              </div>
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-900">{category.category}</h3>
            </div>
            
            <div className="space-y-6 flex-grow">
              {category.materials.map((material) => (
                <MaterialCard key={material.name} material={material} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="glass-premium p-10 rounded-[3rem] border-zinc-200/40 bg-zinc-900/5 text-center">
        <p className="text-[9px] uppercase tracking-[0.6em] font-black text-zinc-400">
          Subtle mouse interactions simulate atmospheric lux conditions (Module Eta).
        </p>
      </div>
    </div>
  );
};

export default MaterialVault;
