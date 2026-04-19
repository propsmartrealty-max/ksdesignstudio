
import React, { useState } from 'react';
import { Sparkles, Download, RefreshCcw, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const AIDesignStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [ratio, setRatio] = useState('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const ratios = ['1:1', '16:9', '4:3', '9:16'];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `A high-end luxury interior design visualization of: ${prompt}. Professional architectural photography, 8k resolution, cinematic lighting, interior design portfolio style, highly detailed textures, masterfully composed.` }],
        },
        config: {
          imageConfig: {
            aspectRatio: ratio as any
          }
        }
      });

      const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      if (part?.inlineData) {
        setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
      }
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
          <div>
            <span className="text-brass tracking-[0.4em] uppercase text-[10px] font-black block mb-4">Generative Atelier</span>
            <h2 className="text-white text-4xl md:text-7xl  leading-none tracking-tight">
              Prototyping <br/><span className="italic">Elegance</span>
            </h2>
            <p className="text-white/40 mt-8 font-light leading-relaxed text-lg max-w-lg">
              Our generative engine translates abstract aspirations into high-fidelity architectural renders. A bridge between your imagination and our structural expertise.
            </p>
          </div>

          <div className="space-y-8 bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl">
            <div className="space-y-3">
              <label className="text-[9px] uppercase tracking-[0.3em] text-brass font-black">Visual Intent</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe a space... (e.g., A sun-drenched minimalist library with white oak shelves and floating brass lighting)"
                className="w-full bg-charcoal/50 border border-white/10 rounded-2xl p-6 text-white text-sm focus:border-brass outline-none h-40 transition-all resize-none placeholder:text-white/20"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[9px] uppercase tracking-[0.3em] text-brass font-black">Frame Aspect</label>
              <div className="grid grid-cols-4 gap-3">
                {ratios.map(r => (
                  <button
                    key={r}
                    onClick={() => setRatio(r)}
                    className={`py-3 rounded-xl text-[10px] font-bold border transition-all ${
                      ratio === r ? 'bg-brass border-brass text-white' : 'border-white/10 text-white/40 hover:border-white/20'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-6 bg-white text-charcoal font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl hover:bg-brass hover:text-white transition-all duration-700 disabled:opacity-50 flex items-center justify-center space-x-4 shadow-xl"
            >
              {isGenerating ? (
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-charcoal rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 bg-charcoal rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-charcoal rounded-full animate-bounce"></div>
                  </div>
                  <span>Synthesizing Geometry</span>
                </div>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Render Concept</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="relative aspect-square lg:aspect-[4/5] w-full bg-white/2 rounded-[3rem] border border-white/5 overflow-hidden flex items-center justify-center group shadow-inner">
          {generatedImage ? (
            <>
              <img src={generatedImage} alt="Render" className="w-full h-full object-cover animate-fade-in" />
              <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center space-y-4 backdrop-blur-sm">
                <div className="flex space-x-4">
                  <button 
                    onClick={() => setGeneratedImage(null)}
                    className="p-5 bg-white text-charcoal rounded-full hover:bg-brass hover:text-white transition-all scale-90 group-hover:scale-100 duration-500"
                  >
                    <RefreshCcw size={24} />
                  </button>
                  <a 
                    href={generatedImage} 
                    download="ks-design-render.png"
                    className="p-5 bg-brass text-white rounded-full hover:bg-white hover:text-charcoal transition-all scale-90 group-hover:scale-100 duration-500"
                  >
                    <Download size={24} />
                  </a>
                </div>
                <p className="text-[10px] uppercase tracking-widest font-black text-white/60">Export Final Render</p>
              </div>
            </>
          ) : (
            <div className="text-center space-y-6 px-16">
              <div className="w-24 h-24 bg-brass/10 rounded-full flex items-center justify-center mx-auto border border-white/5">
                <ImageIcon size={32} className="text-brass/30" />
              </div>
              <div>
                <h3 className="text-white/30 text-2xl ">Neural Canvas Ready</h3>
                <p className="text-white/10 text-[10px] uppercase tracking-[0.3em] mt-4 font-black">Awaiting Architectural Input</p>
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="absolute inset-0 bg-charcoal/90 backdrop-blur-2xl flex flex-col items-center justify-center p-16 text-center">
              {/* Refined Architectural Loader */}
              <div className="relative w-48 h-48 mb-12">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/10" />
                  <path d="M 50 10 V 90 M 10 50 H 90" stroke="currentColor" strokeWidth="0.5" className="text-white/5" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/10" />
                  <rect x="10" y="10" width="80" height="80" fill="none" stroke="#B5A642" strokeWidth="1" className="animate-draw" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                   <Sparkles className="text-brass animate-pulse" size={40} />
                </div>
                {/* Coordinates */}
                <div className="absolute -top-4 -left-4 text-[8px] font-mono text-brass/40 uppercase">Grid_Ref // AI_VIS</div>
                <div className="absolute -bottom-4 -right-4 text-[8px] font-mono text-brass/40 uppercase">Phase // Rendering</div>
              </div>
              <div className="space-y-3">
                <h4 className="text-white text-2xl  tracking-tight">Rendering Elegance</h4>
                <div className="flex flex-col items-center space-y-1">
                  <p className="text-white/40 text-[9px] uppercase tracking-[0.4em] font-black">Calculating Material Shaders</p>
                  <div className="w-32 h-[1px] bg-white/10 relative overflow-hidden mt-2">
                    <div className="absolute inset-y-0 left-0 w-1/3 bg-brass animate-[loading-bar_2s_infinite]"></div>
                  </div>
                </div>
              </div>
              <style>{`
                @keyframes loading-bar {
                  0% { left: -40%; }
                  100% { left: 100%; }
                }
              `}</style>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIDesignStudio;
