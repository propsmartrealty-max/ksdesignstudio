
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronRight, RotateCcw, Crosshair } from 'lucide-react';

const QUIZ_STEPS = [
  {
    question: "Select the primary atmospheric bias.",
    options: [
      { id: 'min', label: "Monochrome / Reduction", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=400" },
      { id: 'lux', label: "Chromatic / Opulent", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=400" },
      { id: 'ind', label: "Textural / Brutalist", img: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=400" }
    ]
  },
  {
    question: "Select the dominant structural silhouette.",
    options: [
      { id: 'min', label: "Orthogonal / Pure", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=400" },
      { id: 'lux', label: "Ornamental / Fluid", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=400" },
      { id: 'ind', label: "Fragmented / Raw", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=400" }
    ]
  }
];

const StyleQuiz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (id: string) => {
    const newSelections = [...selections, id];
    setSelections(newSelections);
    if (step < QUIZ_STEPS.length - 1) {
      setStep(step + 1);
    } else {
      const result = calculateResult(newSelections);
      localStorage.setItem('KS_STYLE_DNA', JSON.stringify(result));
      setShowResult(true);
    }
  };

  const calculateResult = (finalSelections: string[]) => {
    const counts: any = {};
    finalSelections.forEach(s => counts[s] = (counts[s] || 0) + 1);
    const winner = Object.keys(counts).reduce((a, b) => (counts[a] || 0) >= (counts[b] || 0) ? a : b);
    
    const results: any = {
      'min': { id: 'min', title: "Zen Reductionist", desc: "Your spatial bias leans toward the removal of the unnecessary. You value voids, soft light, and the silence between materials." },
      'lux': { id: 'lux', title: "New Heritage Luxury", desc: "You seek a dialogue between contemporary comfort and historical weight. Layers of texture and refined craft define your vision." },
      'ind': { id: 'ind', title: "Tectonic Industrial", desc: "You appreciate the honesty of construction. Exposed joints, raw finishes, and structural authenticity are your core pillars." }
    };
    return results[winner] || results['lux'];
  };

  if (showResult) {
    const result = calculateResult(selections);
    return (
      <div className="bg-charcoal text-white p-16 md:p-24 text-center animate-fade-in shadow-2xl rounded-sm border border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 .5H1000" stroke="white"/><path d="M.5 0V1000" stroke="white"/></svg>
        </div>
        <Crosshair className="mx-auto mb-10 text-brass animate-pulse-soft" size={48} />
        <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-brass mb-4">Diagnostic Conclusion</h3>
        <h2 className="text-5xl md:text-7xl font-bold mb-10 serif italic">{result.title}</h2>
        <p className="text-white/40 max-w-xl mx-auto mb-16 text-xl leading-relaxed font-light">{result.desc}</p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-10">
          <button 
            onClick={() => { setStep(0); setSelections([]); setShowResult(false); }}
            className="flex items-center text-[10px] uppercase tracking-[0.3em] font-black text-white/40 hover:text-white transition-colors"
          >
            <RotateCcw className="mr-3" size={16} /> Reset Analysis
          </button>
          <Link to="/laboratory/report" className="bg-brass text-white px-16 py-6 text-[10px] uppercase tracking-[0.4em] font-black hover:bg-white hover:text-charcoal transition-all shadow-2xl rounded-full">
            Finalize Vision & Export Brief
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-12 md:p-20 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-stone-100 max-w-6xl mx-auto rounded-sm relative">
      <div className="absolute top-0 right-0 p-8 text-[9px] font-mono text-stone-300 pointer-events-none">
        MOD // KS_DIAGNOSTIC_V4
      </div>
      <div className="flex justify-between items-center mb-16 border-b border-stone-100 pb-10">
        <div>
          <h3 className="text-3xl font-black tracking-tighter text-[#1A1A1A]">Atelier <span className="italic font-light text-brass">Consultant.</span></h3>
          <div className="flex items-center space-x-2 mt-1">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
             <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-400 font-bold">KS_Neural_Core v4.2</p>
          </div>
        </div>
        <div className="flex space-x-2">
          {QUIZ_STEPS.map((_, i) => (
            <div key={i} className={`h-1 w-12 transition-all duration-500 ${step === i ? 'bg-brass' : 'bg-stone-100'}`} />
          ))}
        </div>
      </div>
      <h2 className="text-4xl md:text-6xl font-bold mb-16 serif text-charcoal leading-tight">{QUIZ_STEPS[step].question}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {QUIZ_STEPS[step].options.map((opt) => (
          <button 
            key={opt.id}
            onClick={() => handleSelect(opt.id)}
            className="group relative text-left overflow-hidden border border-stone-50 hover:border-brass transition-all duration-500"
          >
            <div className="aspect-[4/5] overflow-hidden grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-1000">
              <img src={opt.img} alt={opt.label} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[2s]" />
            </div>
            <div className="p-6 bg-white flex justify-between items-center border-t border-stone-50 group-hover:border-brass/20 transition-all">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 group-hover:text-charcoal">{opt.label}</span>
              <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 text-brass" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleQuiz;
