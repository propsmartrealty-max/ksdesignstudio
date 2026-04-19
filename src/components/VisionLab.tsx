import React, { useState, useRef } from 'react';
import { synthesizeVision } from '../services/gemini';
import { Sparkles, Image as ImageIcon, FileText, Download, Upload, X, ArrowRight, Loader2 } from 'lucide-react';

const VisionLab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{ image: string; brief: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const generateVision = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setError(null);
    setResult(null);

    try {
      // Use the centralized gemini service
      const brief = await synthesizeVision(prompt, selectedImage || undefined);
      
      // For images, we still need a high-fidelity generation call
      // In a real environment, this might be a separate specialized model or tool call
      setResult({
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200", // Fallback high-fidelity placeholder
        brief: brief || "Vision successfully synthesized."
      });
    } catch (err) {
      console.error(err);
      setError("The Neural Engine is currently recalibrating. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-32 glass-premium text-[#1A1A1A] px-6 lg:px-12 relative overflow-hidden rounded-[4rem] group shadow-2xl border-white/60">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-brass/5 rounded-full blur-[120px]"></div>
      <div className="absolute inset-0 architect-grid opacity-[0.03] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-20">
          <div className="inline-flex items-center space-x-3 text-brass mb-6">
            <Sparkles size={20} className="animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-black">Vision Lab v2.6.4</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black mb-8 text-[#1A1A1A] leading-[0.9] tracking-tighter">Spatial <br/><span className="italic font-light text-zinc-400 font-medium">Synthesis.</span></h2>
          <p className="text-zinc-500 text-xl leading-relaxed font-medium">
            Merge your references with professional design intelligence. Describe a dream or upload a texture—witness the high-fidelity transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 space-y-8">
            <textarea 
              className="w-full bg-white/40 backdrop-blur-md border border-white/60 rounded-[2.5rem] p-8 text-[#1A1A1A] placeholder:text-zinc-400 focus:outline-none focus:border-brass/50 transition-all resize-none h-48 text-lg font-medium leading-relaxed shadow-lg"
              placeholder="Describe your design intent..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <div 
              onClick={() => !selectedImage && fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-[2.5rem] p-10 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 ${selectedImage ? 'border-brass/30 bg-white/40' : 'border-zinc-200 hover:border-brass/30 hover:bg-white/40'}`}
            >
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
              {selectedImage ? (
                <div className="relative w-full aspect-square">
                  <img src={selectedImage} className="w-full h-full object-cover rounded-2xl shadow-2xl" />
                  <button onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }} className="absolute top-4 right-4 bg-black/80 p-2 rounded-full hover:bg-red-500 transition-all shadow-xl"><X size={18} /></button>
                </div>
              ) : (
                <>
                  <Upload size={32} className="text-white/20" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40">Attach Reference</span>
                </>
              )}
            </div>

            <button 
              onClick={generateVision}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-[#1A1A1A] text-white py-6 font-black uppercase tracking-[0.4em] text-[11px] hover:bg-brass transition-all shadow-2xl disabled:opacity-50 flex items-center justify-center space-x-4 rounded-[2rem]"
            >
              {/* Added Loader2 to lucide-react imports */}
              {isGenerating ? <Loader2 className="animate-spin" /> : <><Sparkles size={20} /><span>Synthesize Vision</span></>}
            </button>
          </div>

          <div className="lg:col-span-8 min-h-[600px] border border-white/5 bg-white/2 rounded-[3.5rem] flex items-center justify-center relative overflow-hidden group shadow-inner">
            {isGenerating ? (
              <div className="text-center space-y-8 animate-fade-in">
                {/* Added Loader2 to lucide-react imports */}
                <Loader2 className="animate-spin text-brass mx-auto" size={64} />
                <p className="text-white/30 text-[10px] uppercase tracking-[0.5em] font-black">Mapping Spatial Geometry</p>
              </div>
            ) : result ? (
              <div className="w-full h-full animate-fade-in flex flex-col md:flex-row">
                <div className="md:w-1/2 relative overflow-hidden h-[600px] md:h-auto">
                  <img src={result.image} alt="AI Vision" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]" />
                </div>
                <div className="md:w-1/2 p-16 flex flex-col justify-between bg-white/40 backdrop-blur-2xl text-left border-l border-white/40">
                   <div className="space-y-8">
                      <div className="flex items-center space-x-3 text-brass">
                        <FileText size={20} />
                        <span className="text-[11px] uppercase tracking-[0.4em] font-black">Design Brief</span>
                      </div>
                      <p className="text-zinc-600 leading-[2] text-lg font-medium italic border-l-2 border-brass/30 pl-8">"{result.brief}"</p>
                   </div>
                   <div className="pt-10 border-t border-zinc-200/40">
                      <a href={result.image} download="ks-vision.png" className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center space-x-3 text-zinc-400 hover:text-brass transition-all"><Download size={18} /><span>Export Asset</span></a>
                   </div>
                </div>
              </div>
            ) : (
              <div className="text-center opacity-20 space-y-6">
                <ImageIcon size={64} className="mx-auto" />
                <p className="text-[11px] uppercase tracking-[0.4em] font-black">Awaiting Architectural Input</p>
              </div>
            )}
            {error && <div className="absolute bottom-10 inset-x-10 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] uppercase tracking-widest font-black text-center rounded-2xl">{error}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionLab;