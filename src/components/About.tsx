import React, { useState, useEffect, useRef } from 'react';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-48 px-6 lg:px-12 bg-transparent relative overflow-hidden border-y border-white/20">
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] -z-10" />
      {/* Sterile Background Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 -z-0" />
      <div className="absolute top-0 left-[20%] h-full w-[1px] bg-slate-100" />
      <div className="absolute top-0 right-[20%] h-full w-[1px] bg-slate-100" />
      
      {/* Floating Material Notation */}
      <div className="absolute top-20 left-12 hidden xl:block">
        <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-[0.5em] vertical-text">Interior Design // Studio Records</span>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="space-y-24">
          <div className="space-y-10 flex flex-col items-center">
            <div className="flex items-center space-x-6">
              <div className="h-[1px] w-12 bg-brass/30" />
              <span className="text-brass tracking-[0.8em] uppercase text-[10px] font-black block">Our Design Philosophy</span>
              <div className="h-[1px] w-12 bg-brass/30" />
            </div>
            
            <h2 className="text-7xl md:text-[9rem] text-charcoal leading-[0.85] tracking-tighter">
              Premium <br /><span className="italic font-light text-slate-400">Materials.</span>
            </h2>
          </div>
          
          <div className="space-y-12 max-w-2xl mx-auto">
            <p className="text-zinc-600 leading-relaxed text-3xl font-light italic text-center px-4">
              "Interior design is the art of creating beautiful, functional spaces. We define homes through a relentless pursuit of <span className="text-charcoal font-bold not-italic">design excellence</span> and cultural resonance."
            </p>
            
            <div className="h-px w-24 bg-brass/20 mx-auto" />
            
            <p className="text-zinc-500 leading-relaxed text-lg font-medium">
              We operate across <span className="text-charcoal font-bold">Pune, Mumbai, Indore, and Goa</span> as a premium interior design studio. Our work is characterized by clean spaces, optimized natural light, and a deep respect for the quality of materials—from fine stone to bespoke woodwork.
            </p>
          </div>

          <div 
            ref={statsRef}
            className="pt-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative"
          >
            <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-48 h-[2px] bg-brass shadow-[0_0_15px_#D4AF37]" />
            
            {/* Stat Item 1 */}
            <div className={`glass-premium p-12 rounded-[2.5rem] group cursor-default transition-all duration-1000 delay-100 border-white/40 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-7xl md:text-8xl text-zinc-900 transition-colors group-hover:text-brass duration-500 font-bold">120+</p>
              <p className="text-[10px] uppercase tracking-[0.6em] font-black text-zinc-500 mt-6 transition-colors group-hover:text-zinc-900">Homes Completed</p>
            </div>
            
            {/* Stat Item 2 */}
            <div className={`glass-premium p-12 rounded-[2.5rem] group cursor-default transition-all duration-1000 delay-300 border-white/40 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-7xl md:text-8xl text-zinc-900 transition-colors group-hover:text-brass duration-500 font-bold">08+</p>
              <p className="text-[10px] uppercase tracking-[0.6em] font-black text-zinc-500 mt-6 transition-colors group-hover:text-zinc-900">Years of Experience</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Corner Element */}
      <div className="absolute bottom-12 right-12 opacity-20 hidden lg:block">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M60 0H0V60" stroke="#B5A642" strokeWidth="0.5" />
          <circle cx="60" cy="0" r="3" fill="#B5A642" />
        </svg>
      </div>

      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
      `}</style>
    </section>
  );
};

export default About;