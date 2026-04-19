import React, { useState, useRef } from 'react';
import { analyzeLayout } from '../services/gemini';
import { FileSearch, Upload, X, Loader2, CheckCircle2, AlertCircle, Sparkles, Layout } from 'lucide-react';

interface AuditResult {
  raw: string;
  sections: {
    title: string;
    points: string[];
  }[];
}

const SpatialAudit: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePlanUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedPlan(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const startAudit = async () => {
    if (!selectedPlan || isAnalyzing) return;

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const analysis = await analyzeLayout(selectedPlan);
      
      // Parse the analysis into structured sections for better UI
      // Assuming Gemini returns markdown-like bullets
      const sections = analysis.split('\n\n').map(section => {
        const lines = section.split('\n');
        return {
          title: lines[0].replace(/^[#*-]\s*/, ''),
          points: lines.slice(1).map(l => l.replace(/^[-*]\s*/, '')).filter(Boolean)
        };
      }).filter(s => s.points.length > 0);

      setResult({ raw: analysis, sections });
      
      // Persist result to Sovereign Vault
      const existingAudits = JSON.parse(localStorage.getItem('KS_SPATIAL_AUDITS') || '[]');
      localStorage.setItem('KS_SPATIAL_AUDITS', JSON.stringify([
        { date: new Date().toISOString(), analysis, image: selectedPlan },
        ...existingAudits
      ]));

    } catch (err) {
      console.error(err);
      setError("Spatial Synchronization Failed. Ensure the blueprint is clear and orthogonal.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Upload & Preview */}
        <div className="space-y-8">
          <div 
            onClick={() => !selectedPlan && fileInputRef.current?.click()}
            className={`relative aspect-[4/3] border-2 border-dashed rounded-[3rem] transition-all overflow-hidden flex flex-col items-center justify-center group ${
              selectedPlan ? 'border-brass bg-white shadow-2xl' : 'border-zinc-200 hover:border-brass/40 hover:bg-zinc-50'
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handlePlanUpload} 
            />
            
            {selectedPlan ? (
              <>
                <img src={selectedPlan} alt="Floor Plan" className="w-full h-full object-contain p-8" />
                <div className="absolute inset-0 bg-zinc-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <button 
                     onClick={(e) => { e.stopPropagation(); setSelectedPlan(null); setResult(null); }}
                     className="bg-red-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all"
                   >
                     <X size={24} />
                   </button>
                </div>
              </>
            ) : (
              <div className="text-center p-12">
                <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6 text-zinc-300 group-hover:text-brass group-hover:bg-brass/5 transition-all">
                  <Layout size={32} />
                </div>
                <h4 className="text-lg font-black tracking-tighter text-[#1A1A1A] mb-2">Upload 2D Floor Plan</h4>
                <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Supports JPG, PNG, PDF Sketches</p>
              </div>
            )}
          </div>

          <button 
            onClick={startAudit}
            disabled={!selectedPlan || isAnalyzing}
            className="w-full py-8 bg-[#1A1A1A] text-white rounded-[2rem] font-black uppercase tracking-[0.5em] text-[11px] hover:bg-brass transition-all shadow-2xl disabled:opacity-30 flex items-center justify-center space-x-4"
          >
            {isAnalyzing ? (
              <><Loader2 className="animate-spin" /><span>Scanning Spatial DNA...</span></>
            ) : (
              <><FileSearch size={22} /><span>Initiate Spatial Audit</span></>
            )}
          </button>
        </div>

        {/* Audit Results */}
        <div className="min-h-[500px] glass-premium rounded-[3rem] p-12 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <Layout size={120} />
          </div>
          
          {isAnalyzing ? (
            <div className="flex-grow flex flex-col items-center justify-center space-y-8 animate-fade-in">
               <div className="relative">
                  <div className="w-24 h-24 border-4 border-brass/20 border-t-brass rounded-full animate-spin" />
                  <Sparkles className="absolute inset-0 m-auto text-brass animate-pulse" size={32} />
               </div>
               <div className="text-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 mb-2">Neural Analysis in Progress</p>
                  <p className="text-sm font-bold text-[#1A1A1A]">Calculating Light Paths & Flow Resistance</p>
               </div>
            </div>
          ) : result ? (
            <div className="space-y-10 animate-fade-in">
               <div className="flex items-center space-x-3 text-green-500">
                  <CheckCircle2 size={24} />
                  <span className="text-[11px] font-black uppercase tracking-[0.4em]">Audit_Complete // Protocols_Applied</span>
               </div>
               
               <div className="space-y-12">
                  {result.sections.map((section, idx) => (
                    <div key={idx} className="space-y-4">
                       <h5 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 border-b border-zinc-100 pb-2">{section.title}</h5>
                       <ul className="space-y-4">
                          {section.points.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start space-x-4">
                               <div className="w-1.5 h-1.5 bg-brass rounded-full mt-2 flex-shrink-0" />
                               <p className="text-sm font-medium text-zinc-600 leading-relaxed italic">"{point}"</p>
                            </li>
                          ))}
                       </ul>
                    </div>
                  ))}
               </div>

               <div className="pt-8 border-t border-zinc-100">
                  <p className="text-[9px] text-zinc-300 font-bold uppercase tracking-[0.2em] leading-relaxed">
                    Disclaimer: This audit is a preliminary neural assessment. Connect with a KS Principal for a full structural validation.
                  </p>
               </div>
            </div>
          ) : error ? (
            <div className="flex-grow flex flex-col items-center justify-center space-y-6 text-red-500 text-center animate-fade-in">
               <AlertCircle size={48} />
               <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] mb-2">Protocol_Error</p>
                  <p className="text-xs font-bold text-zinc-400">{error}</p>
               </div>
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center space-y-6 text-zinc-300 text-center opacity-40">
               <FileSearch size={64} />
               <p className="text-[11px] font-black uppercase tracking-[0.5em]">Awaiting Spatial Input</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpatialAudit;
