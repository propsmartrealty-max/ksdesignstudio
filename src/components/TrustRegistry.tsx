import React from 'react';
import { ShieldCheck, History, BookOpen, Layers, MapPin, CheckCircle2, Award, Zap } from 'lucide-react';

const USPs = [
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: '150+ Completed Projects',
    description: 'Beautifully designed homes delivered across Pune, Mumbai, Indore, and Goa.'
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: 'Quality Standards',
    description: 'A 146-point checklist ensuring every corner of your home is finished to perfection.'
  },
  {
    icon: <History className="w-5 h-5" />,
    title: '08+ Years of Design',
    description: 'Years of expertise in residential interiors and local home requirements.'
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: 'Premium Materials',
    description: 'Access to a curated selection of fine wood, stone, and luxury finishes.'
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: 'Regional Mastery',
    description: 'Deep spatial intelligence across Pune, Mumbai, Indore, and Goa’s elite micro-markets.'
  },
  {
    icon: <CheckCircle2 className="w-5 h-5" />,
    title: 'Full Warranty',
    description: 'Complete guarantee on all interior works for your absolute peace of mind.'
  },
  {
    icon: <Award className="w-5 h-5" />,
    title: 'Expert Team',
    description: 'Experienced designers and skilled craftsmen working for your dream home.'
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Smart Design',
    description: 'Modern spatial planning and mood lighting for a comfortable lifestyle.'
  }
];

const TrustRegistry: React.FC = () => {
  return (
    <div className="w-full py-24 bg-transparent border-y border-white/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] -z-10" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-y-16 gap-x-8 md:gap-x-12">
          {USPs.map((usp, i) => (
            <div 
              key={i} 
              className="group flex flex-col items-center text-center w-[calc(50%-1rem)] md:w-[calc(25%-2.5rem)] lg:w-[calc(12.5%-2rem)] max-w-[160px]"
            >
              {/* Livspace-Inspired Density with Atelier Genesis Aesthetics */}
              <div className="w-16 h-16 rounded-full glass-premium flex items-center justify-center mb-6 text-brass group-hover:bg-brass group-hover:text-white transition-all duration-700 relative shadow-lg">
                <div className="absolute inset-0 rounded-full border border-brass/20 scale-125 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700" />
                {usp.icon}
              </div>
              <h3 className="text-sm font-bold text-charcoal tracking-wide mb-2 group-hover:text-brass transition-colors">
                {usp.title}
              </h3>
              <p className="text-[10px] text-zinc-500 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 max-w-[140px]">
                {usp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Structural Background Pattern */}
      <div className="absolute inset-0 architect-grid opacity-[0.03] pointer-events-none" />
    </div>
  );
};

export default TrustRegistry;
