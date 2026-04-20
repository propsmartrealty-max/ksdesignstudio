import heroFoyer from '../assets/images/hero_foyer.png';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-white pt-24 lg:pt-32">
      <div 
        className="absolute inset-0 bg-cover bg-center animate-slow-zoom z-0 opacity-40" 
        style={{ backgroundImage: `url(${heroFoyer})` }} 
      />
      {/* SEO Alt Tag Hardening */}
      <img src={heroFoyer} alt="KS Design Studio Pune | Premium Residential Interiors & Bungalows" className="sr-only" />
      <div className="absolute inset-0 architect-grid opacity-[0.05] z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/90 z-10" />
      
      <div className="relative z-30 text-center px-6 max-w-7xl">
        <div className="mb-10 inline-flex items-center space-x-4 animate-fade-in-up">
          <div className="h-[1px] w-8 bg-brass/40" />
          <span className="text-brass tracking-[0.6em] uppercase text-[10px] font-black">KS Design Studio — Premium Interior Designers</span>
          <div className="h-[1px] w-8 bg-brass/40" />
        </div>
        
        <h1 
          className="text-zinc-900 mb-10 leading-[1.1] tracking-tighter animate-fade-in drop-shadow-sm" 
          style={{ 
            animationDelay: '0.3s',
            fontSize: 'clamp(2rem, 5.5vw, 4.5rem)' 
          }}
        >
          Designing the <span className="italic font-light text-zinc-400">Soul</span> <br /> 
          <span className="text-zinc-900">of Your </span> 
          <span className="italic font-light text-brass/80">Premium Homes.</span>
        </h1>
        
        <p className="text-zinc-600 max-w-4xl mx-auto mb-20 text-lg md:text-2xl font-medium leading-relaxed animate-fade-in" style={{ animationDelay: '0.5s' }}>
          Crafting bespoke home narratives across <span className="text-zinc-900 font-bold tracking-wide">Pune, Mumbai, Indore & Goa</span>. We turn architectural volumes into personal sanctuaries for the city's finest residents.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <Link to="/portfolio" className="group relative px-20 py-7 overflow-hidden glass-dark shadow-2xl rounded-2xl hover:scale-105 transition-luxury">
            <span className="relative z-10 text-white uppercase tracking-[0.4em] text-[10px] font-black group-hover:text-brass">View Our Projects</span>
          </Link>
          <Link to="/contact" className="px-20 py-7 glass-premium text-zinc-900 rounded-2xl border-white/60 uppercase tracking-[0.4em] text-[10px] font-black glass-interactive shadow-xl">Book Free Consultation</Link>
        </div>
      </div>
      
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30">
        <div className="flex flex-col items-center space-y-4">
          <span className="text-[8px] uppercase tracking-[0.5em] text-charcoal/50 font-black rotate-90 mb-8 translate-y-4">Scroll Down</span>
          <div className="w-px h-24 bg-gradient-to-b from-brass/0 via-brass/40 to-brass/0 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 border border-brass/20 rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-6 -translate-y-1/2 z-20 hidden xl:flex flex-col space-y-8">
         {['BANER', 'WAKAD', 'AUNDH', 'KHARADI', 'KOTHRUD'].map((loc) => (
           <div key={loc} className="glass-surface px-2 py-6 rounded-full flex items-center justify-center shadow-xl border-white/30 backdrop-blur-2xl hover:scale-110 transition-luxury cursor-pointer">
             <span className="text-zinc-900 text-[8px] font-bold tracking-[0.4em] uppercase -rotate-90 origin-center whitespace-nowrap">{loc}</span>
           </div>
         ))}
      </div>
    </div>
  );
}