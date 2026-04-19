
import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Palette, Sparkles, Copy, Check, RefreshCcw } from 'lucide-react';

interface ColorCombination {
  name: string;
  colors: {
    hex: string;
    role: string;
    description: string;
  }[];
  mood: string;
  materialSuggestion: string;
}

const AIPaletteGenerator: React.FC = () => {
  const [mood, setMood] = useState('Modern Maratha Luxury');
  const [palette, setPalette] = useState<ColorCombination | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generatePalette = async () => {
    setIsLoading(true);
    setPalette(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a sophisticated interior design color palette for a project in Pune based on the mood: "${mood}". 
        The palette should have 5 harmonious colors. Include a name for the combination and a brief description of why these colors work together. 
        Also suggest a key material (like a specific stone, wood, or fabric) that complements this palette.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              mood: { type: Type.STRING },
              materialSuggestion: { type: Type.STRING },
              colors: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    hex: { type: Type.STRING },
                    role: { type: Type.STRING, description: "e.g., Primary, Accent, Neutral, Trim" },
                    description: { type: Type.STRING }
                  },
                  required: ["hex", "role", "description"]
                }
              }
            },
            required: ["name", "mood", "materialSuggestion", "colors"]
          }
        }
      });

      const data = JSON.parse(response.text);
      setPalette(data);
      localStorage.setItem('KS_PALETTE_DNA', JSON.stringify(data));
    } catch (error) {
      console.error("Error generating palette:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="glass-premium p-8 md:p-16 rounded-[4rem] border-white/60 shadow-2xl relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-brass/5 rounded-full blur-[120px]"></div>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3">
            <div className="inline-flex items-center space-x-2 text-brass mb-4">
              <Palette size={16} />
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Material & Color Lab</span>
            </div>
            <h2 className="text-4xl font-bold serif mb-6 text-charcoal">Curated Color Stories.</h2>
            <p className="text-stone-600 mb-8 leading-relaxed">
              Every space starts with a palette. Select a mood or enter your own to see AI-curated combinations specifically designed for Pune's architectural light.
            </p>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-6">
                {['Modern Maratha', 'Monsoon Calm', 'Koregaon Lush', 'Industrial Baner'].map((m) => (
                  <button 
                    key={m}
                    onClick={() => setMood(m)}
                    className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold border transition-all ${mood === m ? 'bg-charcoal text-white border-charcoal' : 'border-stone-300 text-stone-500 hover:border-stone-500'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input 
                  type="text"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  placeholder="Or describe your own vibe..."
                  className="w-full bg-white/20 backdrop-blur-md border border-white/40 rounded-2xl p-6 text-[#1A1A1A] focus:outline-none focus:border-brass/50 transition-all font-medium"
                />
              </div>
              <button 
                onClick={generatePalette}
                disabled={isLoading || !mood.trim()}
                className="w-full bg-[#1A1A1A] text-white py-6 rounded-2xl font-black uppercase tracking-[0.4em] text-[11px] hover:bg-brass transition-all flex items-center justify-center space-x-3 disabled:opacity-50 shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1.5">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse [animation-duration:1s]"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse [animation-duration:1s] [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse [animation-duration:1s] [animation-delay:0.4s]"></div>
                    </div>
                    <span>Mixing Pigments</span>
                  </div>
                ) : (
                  <><Sparkles size={20} /><span>Generate Palette</span></>
                )}
              </button>
            </div>
          </div>

          <div className="lg:w-2/3 w-full min-h-[400px] flex items-center justify-center">
            {isLoading ? (
              <div className="w-full space-y-8 animate-fade-in">
                <div className="flex space-x-1 h-[300px] rounded-2xl overflow-hidden shadow-sm border-4 border-white bg-white/50">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className="flex-grow bg-stone-100 animate-pulse relative overflow-hidden"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brass/5 to-transparent -translate-y-full animate-[shimmer_2s_infinite]" style={{ animationDelay: `${i * 0.15}s` }}></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center px-4">
                  <div className="h-4 w-32 bg-stone-100 rounded animate-pulse"></div>
                  <div className="h-10 w-10 bg-stone-100 rounded-full animate-pulse"></div>
                </div>
                <style>{`
                  @keyframes shimmer {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                  }
                `}</style>
              </div>
            ) : palette ? (
              <div className="w-full animate-fade-in">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold serif text-charcoal mb-2">{palette.name}</h3>
                  <p className="text-stone-500 text-sm italic">{palette.mood}</p>
                </div>
                
                <div className="flex flex-col md:flex-row h-[350px] rounded-[2.5rem] overflow-hidden shadow-2xl mb-10 border-8 border-white/60 glass-premium">
                  {palette.colors.map((color, idx) => (
                    <div 
                      key={idx}
                      className="group relative flex-grow transition-all duration-500 hover:flex-[2] cursor-pointer"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => copyToClipboard(color.hex, idx)}
                    >
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                        <span className="text-white text-[10px] font-bold uppercase tracking-widest mb-1">{color.role}</span>
                        <span className="text-white font-mono text-sm mb-2">{color.hex}</span>
                        {copiedIndex === idx ? <Check size={16} className="text-sage" /> : <Copy size={16} className="text-white/70" />}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity md:block hidden">
                         <p className="text-white text-[10px] leading-tight font-medium">{color.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="glass-premium p-8 border-white/40 rounded-3xl shadow-xl flex items-center justify-between">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-black text-zinc-400 mb-2">Key Material Recommendation</h4>
                    <p className="text-[#1A1A1A] font-bold text-lg">{palette.materialSuggestion}</p>
                  </div>
                  <button 
                    onClick={generatePalette}
                    className="p-4 text-zinc-400 hover:text-[#1A1A1A] hover:bg-white/40 rounded-full transition-all"
                  >
                    <RefreshCcw size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center p-12 bg-white/50 border border-dashed border-stone-300 rounded-3xl w-full">
                <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-300">
                  <Palette size={40} />
                </div>
                <p className="text-stone-400 uppercase tracking-[0.2em] text-xs font-bold">Enter a mood to generate a color story</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPaletteGenerator;
