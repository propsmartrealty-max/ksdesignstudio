import React, { useState, useRef } from 'react';
import { Layers, Maximize, Move, Rotate3d, Zap, Upload, Search, Loader2, CheckCircle2 } from 'lucide-react';
import { analyzeLayout } from '../../services/gemini';

const LayoutScanner: React.FC = () => {
  const [view, setView] = useState<'standard' | 'optimized'>('standard');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setView('standard');
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startScan = async () => {
    if (!selectedImage) return;
    setIsScanning(true);
    setAnalysis(null);
    try {
      const result = await analyzeLayout(selectedImage);
      setAnalysis(result);
      setView('optimized');
    } catch (error) {
      console.error("Scan Error:", error);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <section className="py-32 bg-white relative overflow-hidden border-y border-slate-50">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -z-10 skew-x-12" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1">
                <div className="relative aspect-square glass rounded-3xl overflow-hidden shadow-2xl group bg-white/50">
                    {/* Architectural Grid Background */}
                    <div className="absolute inset-0 architect-grid opacity-10" />
                    
                    {/* Upload / Display Area */}
                    <div className="absolute inset-0 flex items-center justify-center p-12">
                        {selectedImage ? (
                            <div className="w-full h-full relative group/img">
                                <img 
                                    src={selectedImage} 
                                    alt="Layout Preview" 
                                    className={`w-full h-full object-contain transition-all duration-1000 ${isScanning ? 'blur-sm' : ''} ${view === 'standard' ? 'grayscale' : ''}`} 
                                />
                                {view === 'optimized' && analysis && (
                                    <div className="absolute inset-0 bg-brass/5 backdrop-blur-[2px] animate-fade-in flex items-center justify-center p-8 text-center">
                                        <div className="bg-white/90 p-6 rounded-2xl shadow-xl border border-brass/20 max-h-full overflow-y-auto">
                                            <div className="flex items-center justify-center space-x-2 text-brass mb-4">
                                                <CheckCircle2 size={16} />
                                                <span className="text-[10px] uppercase font-black tracking-widest">Analysis_Complete</span>
                                            </div>
                                            <p className="text-[12px] text-charcoal/80 leading-relaxed italic font-light">"{analysis}"</p>
                                        </div>
                                    </div>
                                )}
                                <button 
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute top-4 right-4 bg-charcoal/80 text-white p-2 rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity"
                                >
                                    <CloseIcon size={14} />
                                </button>
                            </div>
                        ) : (
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full h-full border-2 border-dashed border-charcoal/10 rounded-2xl flex flex-col items-center justify-center gap-4 hover:bg-white/40 transition-all cursor-pointer group"
                            >
                                <Upload size={32} className="text-charcoal/20 group-hover:text-brass transition-colors" />
                                <div className="text-center">
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-black text-charcoal/40 block mb-1">Step_01</span>
                                    <span className="text-sm font-light text-charcoal/60">Upload Builder Floor Plan</span>
                                </div>
                                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                            </div>
                        )}
                    </div>

                    {/* Scanner HUD */}
                    <div className="absolute inset-8 border border-charcoal/10 pointer-events-none rounded-2xl">
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brass" />
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-brass" />
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-brass" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-brass" />
                        
                        {/* Scanning Line Animation */}
                        {isScanning && (
                            <div className="absolute inset-x-0 h-1 bg-brass/30 shadow-[0_0_15px_rgba(180,140,80,0.5)] animate-scan z-20" />
                        )}
                    </div>

                    <div className="absolute top-12 left-12 flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full animate-pulse ${isScanning ? 'bg-red-500' : 'bg-brass'}`} />
                        <span className="text-[10px] uppercase tracking-[0.3em] font-black text-charcoal/40 font-mono">
                            Protocol: KS_OPTIMIZE_V.2
                        </span>
                    </div>
                </div>
            </div>

            <div className="order-1 lg:order-2">
                <span className="text-brass font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
                    Spatial Optimization
                </span>
                <h2 className="text-5xl md:text-6xl text-charcoal mb-10 leading-tight">
                    Check Your <br /> <span className="italic text-slate-100 font-light">Layout DNA</span>
                </h2>
                <p className="text-charcoal/50 text-xl font-light leading-relaxed mb-12">
                    Standard builder floor plans often prioritize volume over flow. Our Tectonic Scanner evaluates your 2BHK/3BHK shell to identify hidden spatial potential.
                </p>

                <div className="flex flex-col space-y-8">
                    {selectedImage && !analysis && (
                        <button 
                            onClick={startScan}
                            disabled={isScanning}
                            className="bg-charcoal text-white px-10 py-6 rounded-2xl text-[11px] uppercase tracking-[0.4em] font-black hover:bg-brass transition-all flex items-center justify-center space-x-4 shadow-2xl disabled:opacity-50"
                        >
                            {isScanning ? <Loader2 className="animate-spin text-white" /> : <><Search size={18} /><span>Execute Spatial Audit</span></>}
                        </button>
                    )}

                    {analysis && (
                        <div className="flex bg-charcoal/5 p-2 rounded-2xl self-start inline-flex">
                            <button 
                                onClick={() => setView('standard')}
                                className={`px-8 py-4 rounded-xl text-[10px] uppercase tracking-widest font-black transition-all ${view === 'standard' ? 'bg-white text-charcoal shadow-xl' : 'text-charcoal/40 hover:text-charcoal'}`}
                            >
                                Standard
                            </button>
                            <button 
                                onClick={() => setView('optimized')}
                                className={`px-8 py-4 rounded-xl text-[10px] uppercase tracking-widest font-black transition-all ${view === 'optimized' ? 'bg-brass text-white shadow-xl' : 'text-charcoal/40 hover:text-charcoal'}`}
                            >
                                KS Optimized
                            </button>
                        </div>
                    )}

                    <div className="space-y-6">
                        {[
                            { icon: <Layers size={18} />, title: "Vertical Volume Mastery", desc: "Optimizing double-height voids for acoustic and visual balance." },
                            { icon: <Move size={18} />, title: "Tectonic Flow", desc: "Redirecting spatial paths to improve lifestyle efficiency by 35%." },
                            { icon: <Zap size={18} />, title: "Smart-Glow Nodes", desc: "Automated lighting placement aligned with natural circadian rhythms." }
                        ].map((feature, i) => (
                            <div key={i} className="flex space-x-6 p-6 rounded-2xl hover:bg-white transition-luxury group border border-transparent hover:border-charcoal/5">
                                <div className="text-brass group-hover:scale-110 transition-transform pt-1">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className="text-sm uppercase tracking-widest font-bold text-charcoal mb-1">{feature.title}</h4>
                                    <p className="text-[13px] text-charcoal/40 leading-relaxed">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

// Add missing icon
const CloseIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default LayoutScanner;
