import React, { useState } from 'react';
import { synthesizeRoom } from '../services/gemini';
import { Sparkles, Loader2, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

const RoomSynthesis: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<string>('Master Suite');
  const [isGenerating, setIsGenerating] = useState(false);
  const [script, setScript] = useState<string | null>(null);

  const generateScript = async () => {
    setIsGenerating(true);
    setScript(null);

    const styleDNA = JSON.parse(localStorage.getItem('KS_STYLE_DNA') || 'null');
    const paletteDNA = JSON.parse(localStorage.getItem('KS_PALETTE_DNA') || 'null');

    try {
      const response = await synthesizeRoom(selectedRoom, styleDNA, paletteDNA);
      setScript(response);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const rooms = ['Master Suite', 'Culinary Sanctuary', 'Social Lounge', 'Corporate Studio', 'Terrace Atelier'];

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Input Control */}
        <div className="lg:col-span-12">
           <div className="flex flex-wrap gap-4 mb-8">
              {rooms.map((room) => (
                <button
                  key={room}
                  onClick={() => setSelectedRoom(room)}
                  className={`px-8 py-4 rounded-full text-[10px] uppercase font-black tracking-widest transition-all ${
                    selectedRoom === room ? 'bg-zinc-900 text-white shadow-xl' : 'bg-zinc-50 text-zinc-400 hover:bg-zinc-100'
                  }`}
                >
                  {room}
                </button>
              ))}
           </div>
           
           <button 
             onClick={generateScript}
             disabled={isGenerating}
             className="w-full py-10 bg-[#1A1A1A] text-white rounded-[2.5rem] font-black uppercase tracking-[0.5em] text-[11px] hover:bg-brass transition-all shadow-2xl disabled:opacity-30 flex items-center justify-center space-x-4"
           >
             {isGenerating ? (
               <><Loader2 className="animate-spin" /><span>Synthesizing Design Prose...</span></>
             ) : (
               <><Sparkles size={18} /><span>Orchestrate Atmospheric Script</span></>
             )}
           </button>
        </div>

        {/* Output */}
        <div className="lg:col-span-12">
           <div className="min-h-[400px] glass-premium rounded-[3.5rem] p-12 relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 p-10 opacity-5">
                 <FileText size={120} />
              </div>
              
              {isGenerating ? (
                <div className="flex-grow flex flex-col items-center justify-center space-y-8 animate-pulse">
                   <div className="w-16 h-1 w-full bg-zinc-100 rounded-full" />
                   <div className="w-24 h-1 w-full bg-zinc-100 rounded-full" />
                   <div className="w-12 h-1 w-full bg-zinc-100 rounded-full" />
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300">Drafting Atelier Vision...</p>
                </div>
              ) : script ? (
                <div className="animate-fade-in space-y-12">
                   <div className="flex items-center space-x-3 text-green-500">
                      <CheckCircle2 size={24} />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em]">Synthesis_Complete // Brief_Ready</span>
                   </div>
                   
                   <div className="prose prose-zinc max-w-none">
                      <div className="text-zinc-600 text-lg font-medium leading-relaxed italic space-y-8 whitespace-pre-line">
                         {script}
                      </div>
                   </div>

                   <div className="pt-10 border-t border-zinc-100 flex justify-between items-center">
                       <span className="text-[9px] font-black uppercase tracking-widest text-zinc-300">Draft_ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                       <button className="text-[10px] font-black uppercase tracking-widest text-brass hover:translate-x-2 transition-all flex items-center space-x-3">
                          <span>Lock to Vault</span>
                          <ArrowRight size={14} />
                       </button>
                   </div>
                </div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-zinc-300 space-y-6 opacity-40">
                   <Sparkles size={64} />
                   <p className="text-[11px] font-black uppercase tracking-[0.5em]">Awaiting Spatial Context</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default RoomSynthesis;
