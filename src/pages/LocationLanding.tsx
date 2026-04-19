import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO_LOCATIONS, SEO_LONG_TAIL, SEO_PROPERTY_TYPES, PUNE_NEIGHBORHOOD_USPS } from '../registry/seo_registry';
import { MapPin, CheckCircle, ArrowRight, Star, Map as MapIcon } from 'lucide-react';

const LocationLanding: React.FC = () => {
  const { location } = useParams<{ location: string }>();
  
  // Format location name for display
  const formattedLocation = location?.charAt(0).toUpperCase() + location?.slice(1).replace('-', ' ') || 'Pune';
  
  const neighborhoodUSP = PUNE_NEIGHBORHOOD_USPS[formattedLocation];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ksdesignpune.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Portfolio",
        "item": "https://ksdesignpune.com/#/portfolio"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": formattedLocation,
        "item": `https://ksdesignpune.com/#/interiors-in/${location || 'pune'}`
      }
    ]
  };

  return (
    <div className="pt-32 pb-20 bg-white relative overflow-hidden">
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <div className="absolute inset-0 architect-grid opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-brass mb-6">
              <MapPin size={16} />
              <span className="text-[10px] uppercase font-black tracking-[0.4em]">Curated Design Laboratory</span>
            </div>
            <h1 className="text-5xl md:text-7xl  text-charcoal leading-tight mb-8">
              Best Interior Designer <br /> 
              <span className="italic">in {formattedLocation}</span>
            </h1>
            <p className="text-charcoal/50 text-xl font-light leading-relaxed mb-10">
               Delivering high-fidelity interior architecture to the elite residences and corporate sanctuaries of {formattedLocation}. From initial spatial strategy to turnkey execution.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="bg-[#1A1A1A] text-white px-10 py-5 text-[10px] uppercase font-black tracking-widest rounded-full hover:bg-brass transition-all shadow-lg">
                Book Consultation
              </Link>
              <Link to="/portfolio" className="glass-premium px-10 py-5 text-[10px] uppercase font-black tracking-widest rounded-full border-zinc-200/40 hover:border-brass transition-all">
                View Gallery
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block w-[400px] h-[500px] rounded-[3rem] overflow-hidden relative glass-premium shadow-2xl skew-y-1">
             <img 
               src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200" 
               alt={`${formattedLocation} Interiors`} 
               className="w-full h-full object-cover opacity-80"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
             <div className="absolute bottom-10 left-10">
                <p className="text-white text-xs uppercase font-black tracking-[0.5em]">{formattedLocation} Profile</p>
             </div>
          </div>
        </div>

        {/* Hyper-Local SEO Content Cluster */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <div className="glass-premium p-10 rounded-[3rem] border-white/40 shadow-xl">
            <h3 className="text-xl  mb-6">Service Excellence</h3>
            <ul className="space-y-4">
              {['2 BHK Design Packages', 'Luxury 3BHK Transformations', 'Turnkey Villa Interiors', 'Vastu Compliant Layouts'].map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-xs font-bold text-charcoal/40 uppercase tracking-widest">
                  <CheckCircle size={14} className="text-brass" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="glass-premium p-10 rounded-[3rem] border-white/40 shadow-xl">
            <h3 className="text-xl  mb-6">Technical Rigor</h3>
            <p className="text-[11px] text-zinc-500 font-bold leading-relaxed mb-8">
               {neighborhoodUSP 
                 ? `${neighborhoodUSP} Our ${formattedLocation} studio leverages professional design intelligence to calibrate these unique spatial conditions.`
                 : `Our ${formattedLocation} studio leverages professional design intelligence to optimize every square foot of your property, ensuring material longevity and aesthetic authority.`}
            </p>
            <div className="flex items-center space-x-2 text-sage">
               <Star size={14} fill="currentColor" />
               <span className="text-[10px] font-black uppercase tracking-widest">#01 in {formattedLocation}</span>
            </div>
          </div>

          <div className="bg-charcoal p-10 rounded-[2.5rem] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <MapIcon size={80} />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl  mb-6 text-brass italic">Local Intelligence</h3>
              <p className="text-white/40 text-xs mb-8 italic">Designing sanctuaries in {formattedLocation}’s fastest growing residential hubs with biophilic flow and high-fidelity textures.</p>
              <Link to="/contact" className="flex items-center space-x-3 group">
                 <span className="text-[10px] uppercase font-black tracking-[0.5em] group-hover:text-brass transition-colors">Book Consult</span>
                 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Long-Tail Dominance Section */}
        <div className="pt-20 border-t border-charcoal/5">
          <span className="text-annotation block mb-12">Programmatic SEO Clusters // {formattedLocation}</span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8">
             {SEO_PROPERTY_TYPES.slice(0, 8).map((type, i) => (
               <div key={i} className="group cursor-pointer">
                 <p className="text-[11px] font-bold text-charcoal/40 uppercase tracking-widest group-hover:text-brass transition-colors truncate">
                   {type.replace('Pune', formattedLocation)}
                 </p>
                 <div className="h-[1px] w-0 bg-brass transition-all duration-500 group-hover:w-full mt-2" />
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationLanding;
