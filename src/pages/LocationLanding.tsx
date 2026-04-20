import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO_LOCATIONS, SEO_LONG_TAIL, SEO_PROPERTY_TYPES, PUNE_NEIGHBORHOOD_USPS } from '../registry/seo_registry';
import { MapPin, CheckCircle, ArrowRight, Star, Map as MapIcon, BrainCircuit, ShieldCheck, Sparkles } from 'lucide-react';
import { generateLocationBrief } from '../services/gemini';

const LocationLanding: React.FC = () => {
  const { location } = useParams<{ location: string }>();
  const [aiBrief, setAiBrief] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Format location name for display
  const formattedLocation = location?.charAt(0).toUpperCase() + location?.slice(1).replace('-', ' ') || 'Pune';
  
  useEffect(() => {
    async function fetchAiBrief() {
      if (!PUNE_NEIGHBORHOOD_USPS[formattedLocation]) {
        setIsLoading(true);
        try {
          const brief = await generateLocationBrief(formattedLocation);
          setAiBrief(brief);
        } catch (error) {
          console.error("AI Brief Generation Error:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchAiBrief();
  }, [formattedLocation]);

  const neighborhoodUSP = PUNE_NEIGHBORHOOD_USPS[formattedLocation];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ksdesignstudio.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Interiors in Pune",
        "item": "https://ksdesignstudio.in/#/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": formattedLocation,
        "item": `https://ksdesignstudio.in/#/interiors-in/${location || 'pune'}`
      }
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "InteriorDesign",
    "name": `KS Design Studio | Best Interior Designer in ${formattedLocation}`,
    "image": "https://ksdesignstudio.in/logo.png",
    "@id": `https://ksdesignstudio.in/#/interiors-in/${location}`,
    "url": `https://ksdesignstudio.in/#/interiors-in/${location}`,
    "telephone": "+91 20 6700 0000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Baner - Balewadi High Street",
      "addressLocality": formattedLocation,
      "addressRegion": "MH",
      "postalCode": "411045",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.5597,
      "longitude": 73.7799
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "10:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://www.instagram.com/ksdesignstudiopune"
    ]
  };

  return (
    <div className="pt-32 pb-20 bg-white relative overflow-hidden">
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <div className="absolute inset-0 architect-grid opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-24 gap-16">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-3 text-brass mb-6">
              <div className="w-10 h-[1px] bg-brass/30" />
              <span className="text-[10px] uppercase font-black tracking-[0.6em]">Micro-Market Laboratory</span>
            </div>
            <h1 className="text-6xl md:text-8xl text-zinc-900 tracking-tighter leading-[0.9] mb-10 font-black">
              Interior <br /> Designer in <br />
              <span className="italic font-light text-zinc-400 font-medium">{formattedLocation}.</span>
            </h1>
            <p className="text-zinc-500 text-xl font-medium leading-relaxed mb-12 max-w-2xl">
               Algorithmically calibrated interior architecture for the elite residences of {formattedLocation}. We synchronize spatial flow with the unique DNA of this micro-market.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <Link to="/contact" className="bg-zinc-900 text-white px-12 py-6 text-[10px] uppercase font-black tracking-[0.4em] rounded-full hover:bg-brass transition-all shadow-2xl">
                Lock Your Vision
              </Link>
              <Link to="/portfolio" className="glass-premium px-12 py-6 text-[10px] uppercase font-black tracking-[0.4em] rounded-full border-zinc-200/40 hover:border-brass transition-all">
                Registry Portfolio
              </Link>
            </div>
          </div>
          
          <div className="relative group lg:mt-20">
            <div className="absolute -inset-4 bg-brass/10 rounded-[4rem] blur-3xl group-hover:bg-brass/20 transition-all duration-700" />
            <div className="w-full lg:w-[450px] h-[550px] rounded-[3.5rem] overflow-hidden relative glass-premium shadow-[0_50px_100px_rgba(0,0,0,0.1)] border-white/40">
               <img 
                 src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200" 
                 alt={`KS Design Studio | Premium Interiors in ${formattedLocation}`} 
                 className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s] ease-out"
               />
               <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-zinc-900/90 to-transparent">
                  <div className="flex items-center space-x-3 text-white/60 mb-2">
                    <Sparkles size={14} className="text-brass" />
                    <p className="text-[10px] uppercase font-black tracking-[0.5em]">{formattedLocation} Profile</p>
                  </div>
                  <h4 className="text-white text-2xl font-bold tracking-tight">Tectonic Series_01</h4>
               </div>
            </div>
          </div>
        </div>

        {/* Local Intelligence Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
           {/* Section 1: Traditional/Pre-defined USP */}
           <div className="glass-premium p-12 rounded-[4rem] border-white/40 shadow-xl overflow-hidden relative">
             <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
               <ShieldCheck size={120} />
             </div>
             <h3 className="text-xs uppercase tracking-[0.5em] font-black text-brass mb-8">Design Protocol</h3>
             <p className="text-zinc-600 text-sm font-medium leading-relaxed mb-10">
                {neighborhoodUSP || `We apply our proprietary Deccan Tectonic methodology to every home in ${formattedLocation}, focusing on material honesty and spatial optimization.`}
             </p>
             <div className="flex items-center space-x-3 text-zinc-400">
               <CheckCircle size={14} />
               <span className="text-[9px] font-black uppercase tracking-widest">Sovereign Tested</span>
             </div>
           </div>

           {/* Section 2: AI Generated Content */}
           <div className="md:col-span-2 bg-[#1A1A1A] p-12 lg:p-20 rounded-[4rem] text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <BrainCircuit size={160} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-10">
                   <span className="h-px w-10 bg-brass/40" />
                   <h3 className="text-xs uppercase tracking-[0.6em] font-black text-brass">Local Intelligence Audit // Gemini Pro</h3>
                </div>
                
                {isLoading ? (
                  <div className="space-y-6 animate-pulse">
                    <div className="h-4 bg-white/5 rounded w-3/4" />
                    <div className="h-4 bg-white/5 rounded w-1/2" />
                    <div className="h-4 bg-white/5 rounded w-5/6" />
                  </div>
                ) : (
                  <div className="whitespace-pre-line text-lg font-light leading-relaxed text-zinc-300 italic opacity-90">
                    {aiBrief || `Analyzing the structural DNA of ${formattedLocation}... Our algorithmic brief integrates local real-estate trends with archival architectural precedents to create a visionary santuary for your property.`}
                  </div>
                )}

                <div className="mt-16 pt-10 border-t border-white/5 flex items-center justify-between">
                   <p className="text-[9px] uppercase tracking-[0.4em] font-black text-zinc-500">Source: Studio_Intelligence_V5</p>
                   <Link to="/laboratory" className="text-brass border-b border-brass/20 pb-1 text-[9px] uppercase tracking-[0.3em] font-black hover:border-brass transition-all">Audit Spatial DNA</Link>
                </div>
              </div>
           </div>
        </div>

        {/* pSEO Cluster Engine */}
        <div className="pt-20 border-t border-zinc-100">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-xl">
                 <span className="text-brass tracking-[0.5em] uppercase text-[10px] font-black block mb-4">Search Context Logic</span>
                 <h2 className="text-4xl md:text-6xl text-zinc-900 tracking-tighter leading-none font-black">
                    Programmatic <br /> <span className="italic font-light text-zinc-400">Contexts.</span>
                 </h2>
              </div>
              <p className="text-zinc-500 text-sm font-medium max-w-xs leading-relaxed">
                 Explore the spectrum of specialized design services algorithmically targeted for {formattedLocation}’s elite residential inventory.
              </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10">
              {SEO_PROPERTY_TYPES.slice(0, 12).map((type, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                     <p className="text-[12px] font-black text-zinc-900 uppercase tracking-widest group-hover:text-brass transition-colors">
                       {type.replace('Pune', formattedLocation)}
                     </p>
                     <ArrowRight size={14} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brass" />
                  </div>
                  <div className="h-[1px] w-full bg-zinc-100 relative overflow-hidden">
                     <div className="absolute inset-0 bg-brass -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                  </div>
                </div>
              ))}
           </div>

           <div className="mt-24 p-12 lg:p-16 glass-premium rounded-[3.5rem] border-zinc-200/40 relative overflow-hidden">
              <div className="absolute inset-0 architect-grid opacity-[0.03]" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                 <div>
                    <h3 className="text-3xl font-black tracking-tight text-zinc-900 mb-4">Start your {formattedLocation} journey.</h3>
                    <p className="text-zinc-500 text-sm font-medium tracking-wide">Lock your style preference in the Sovereign Vault to unlock prime design intelligence.</p>
                 </div>
                 <Link to="/vault" className="whitespace-nowrap px-16 py-7 bg-zinc-900 text-white rounded-2xl text-[10px] uppercase font-black tracking-[0.5em] hover:bg-brass transition-all shadow-xl">
                    Enter Vault
                 </Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LocationLanding;
