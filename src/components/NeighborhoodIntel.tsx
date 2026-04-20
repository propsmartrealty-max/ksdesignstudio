import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { MapPin, Navigation, Loader2, ExternalLink, Info } from 'lucide-react';

const NeighborhoodIntel: React.FC = () => {
  const [intel, setIntel] = useState<{ text: string; locations: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNeighborhoodData = async (coords?: GeolocationCoordinates) => {
    setIsLoading(true);
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("KS Design Portfolio: Neighborhood Intel disabled due to missing API key.");
      setIsLoading(false);
      return;
    }

    try {
      const ai = new GoogleGenAI(apiKey);
      // Default to Baner/Balewadi, Pune coordinates if geolocation fails
      const lat = coords?.latitude || 18.5597;
      const lng = coords?.longitude || 73.7799;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "You are a professional interior design consultant. Identify the 3 most exclusive interior design showrooms, premium home decor stores, or furniture galleries strictly within the Pune region near this coordinate. Provide a sophisticated one-sentence summary of the 'interior design vibe' of this specific Pune neighborhood (e.g., Baner's modern apartments vs Koregaon Park's classic bungalows).",
        config: {
          tools: [{ googleMaps: {} }],
          toolConfig: {
            retrievalConfig: {
              latLng: { latitude: lat, longitude: lng }
            }
          }
        },
      });

      const text = response.text || "";
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const locations = chunks.map((c: any) => ({
        uri: c.maps?.uri,
        title: c.maps?.title
      })).filter((l: any) => l.uri);

      setIntel({ text, locations });
    } catch (error) {
      console.error("Maps grounding failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchNeighborhoodData(pos.coords),
        () => fetchNeighborhoodData()
      );
    } else {
      fetchNeighborhoodData();
    }
  }, []);

  return (
    <div className="bg-white p-10 border border-stone-200 rounded-[2.5rem] h-full flex flex-col shadow-2xl shadow-stone-900/5 group transition-all duration-700 hover:border-brass/30 font-sans">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center space-x-4">
          <div className="bg-brass/10 p-3 rounded-2xl group-hover:bg-brass group-hover:text-white transition-all duration-500">
            <Navigation className="animate-pulse" size={24} />
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-500">Spatial Intelligence</h4>
            <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mt-0.5">Pune Design Feed</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-sage/5 px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 bg-sage rounded-full animate-ping"></span>
          <span className="text-[8px] uppercase font-black text-sage tracking-widest">Real-time Grounding</span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-grow flex flex-col items-center justify-center space-y-8 py-20">
          <div className="relative">
            <div className="absolute inset-0 bg-brass/5 rounded-full scale-150 animate-pulse"></div>
            <Loader2 className="animate-spin text-stone-200 relative z-10" size={64} />
            <MapPin className="absolute inset-0 m-auto text-brass/30" size={24} />
          </div>
          <div className="text-center space-y-2">
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em]">
              Scanning Local Topography
            </p>
            <p className="text-[9px] text-stone-300 font-light italic">Locating premium vendors and landmarks...</p>
          </div>
        </div>
      ) : intel ? (
        <div className="flex-grow flex flex-col space-y-10">
          <div className="relative">
            <span className="absolute -top-4 -left-2 text-6xl text-brass/10 ">“</span>
            <p className="text-charcoal text-xl  italic leading-relaxed relative z-10 pl-4">
              {intel.text}
            </p>
          </div>
          
          <div className="space-y-6">
             <div className="flex items-center justify-between border-b border-stone-100 pb-3">
               <p className="text-[9px] font-black text-stone-400 uppercase tracking-[0.3em]">Recommended Design Hubs</p>
               <Info size={12} className="text-stone-300" />
             </div>
             <div className="grid grid-cols-1 gap-4">
               {intel.locations.length > 0 ? intel.locations.slice(0, 3).map((loc, i) => (
                 <a 
                   key={i} 
                   href={loc.uri} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-brass hover:-translate-y-1 transition-all duration-500 group/item shadow-sm"
                 >
                   <div className="flex items-center space-x-4 truncate">
                     <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center text-brass shadow-sm group-hover/item:border-brass transition-colors">
                        <MapPin size={14} />
                     </div>
                     <span className="text-xs font-bold truncate pr-4 tracking-tight text-charcoal">{loc.title}</span>
                   </div>
                   <ExternalLink size={14} className="text-stone-300 group-hover/item:text-brass transition-colors" />
                 </a>
               )) : (
                 <p className="text-xs text-stone-400 italic py-4 text-center">No curated showroom links found for this sector.</p>
               )}
             </div>
          </div>
          
          <div className="mt-auto pt-8 border-t border-stone-100 flex items-center justify-between">
            <p className="text-[8px] text-stone-400 leading-tight uppercase tracking-[0.2em] font-bold">
              Grounding: Google Maps • PMR Region
            </p>
            <div className="text-[8px] font-black text-brass uppercase tracking-widest">v2.5 FLASH</div>
          </div>
        </div>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center py-20 text-center space-y-4">
           <MapPin size={40} className="text-stone-100" />
           <p className="text-xs text-stone-300 italic max-w-[200px]">Unable to synchronize local design intelligence feed.</p>
        </div>
      )}
    </div>
  );
};

export default NeighborhoodIntel;