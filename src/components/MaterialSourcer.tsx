import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ShoppingBag, Loader2, ExternalLink, X } from 'lucide-react';

interface MaterialSourcerProps {
  projectTitle: string;
  materials: string;
}

const MaterialSourcer: React.FC<MaterialSourcerProps> = ({ projectTitle, materials }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<{ text: string; sources: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSources = async () => {
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Find 3 real high-end vendors or showrooms in Pune, India where I can source materials like "${materials}" for a project similar to "${projectTitle}". Provide their names and what they are known for.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || "";
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources = chunks.map((c: any) => ({
        uri: c.web?.uri,
        title: c.web?.title
      })).filter((s: any) => s.uri);

      setResults({ text, sources });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => { setIsOpen(true); fetchSources(); }}
        className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-brass border-b border-brass/30 pb-1 hover:text-white hover:border-white transition-all"
      >
        <ShoppingBag size={12} />
        <span>Source Materials in Pune</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 backdrop-blur-sm bg-black/40">
          <div className="bg-white w-full max-w-lg shadow-2xl rounded-2xl overflow-hidden animate-fade-in-up text-charcoal">
            <div className="bg-charcoal p-6 text-white flex justify-between items-center">
              <div>
                <h4 className="font-bold text-sm tracking-widest uppercase">Material Sourcing</h4>
                <p className="text-[10px] text-stone-400 mt-1 italic">Grounded in local Pune market data</p>
              </div>
              <button onClick={() => setIsOpen(false)}><X size={20} /></button>
            </div>
            
            <div className="p-8">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <Loader2 className="animate-spin text-brass" size={32} />
                  <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">Searching local vendors...</p>
                </div>
              ) : results ? (
                <div className="space-y-6">
                  <p className="text-sm text-stone-600 leading-relaxed italic border-l-2 border-stone-100 pl-4">
                    {results.text}
                  </p>
                  
                  <div className="space-y-3">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-stone-400">Verified Web Links</h5>
                    <div className="flex flex-col gap-2">
                      {results.sources.map((s, i) => (
                        <a 
                          key={i} 
                          href={s.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 bg-stone-50 hover:bg-stone-100 rounded-lg border border-stone-100 transition-colors group"
                        >
                          <span className="text-xs font-bold text-charcoal">{s.title || 'Visit Vendor Site'}</span>
                          <ExternalLink size={14} className="text-stone-300 group-hover:text-brass transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MaterialSourcer;