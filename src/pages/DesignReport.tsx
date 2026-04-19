import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, ArrowLeft, Printer, Box, Palette, Fingerprint, MapPin, Zap } from 'lucide-react';

interface StyleDNA {
  id: string;
  title: string;
  desc: string;
}

interface PaletteDNA {
  name: string;
  mood: string;
  materialSuggestion: string;
  colors: { hex: string; role: string; description: string; }[];
}

const DesignReport: React.FC = () => {
  const [styleDNA, setStyleDNA] = useState<StyleDNA | null>(null);
  const [paletteDNA, setPaletteDNA] = useState<PaletteDNA | null>(null);
  const [reportDate] = useState(new Date().toLocaleDateString('en-US', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  }));

  useEffect(() => {
    const style = localStorage.getItem('KS_STYLE_DNA');
    const palette = localStorage.getItem('KS_PALETTE_DNA');
    if (style) setStyleDNA(JSON.parse(style));
    if (palette) setPaletteDNA(JSON.parse(palette));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-sans pt-32 pb-20 print:pt-0">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Navigation & Controls - Hidden on Print */}
        <div className="flex justify-between items-center mb-20 print:hidden">
          <Link to="/laboratory" className="flex items-center space-x-2 text-zinc-400 hover:text-brass transition-colors uppercase text-[9px] font-black tracking-widest">
            <ArrowLeft size={14} />
            <span>Return to Laboratory</span>
          </Link>
          <button 
            onClick={handlePrint}
            className="flex items-center space-x-2 bg-[#1A1A1A] text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-brass transition-all shadow-xl"
          >
            <Printer size={16} />
            <span>Export Monograph</span>
          </button>
        </div>

        {/* Report Header */}
        <header className="border-b-[4px] border-[#1A1A1A] pb-10 mb-20">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brass block mb-4">Laboratory_Finding_Report</span>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-0">Spatial <span className="italic font-light text-zinc-400">Brief.</span></h1>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-300 mb-1">Doc No: KS_REF_77492</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]">{reportDate}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-8 py-6 border-t border-zinc-100">
             <div className="flex items-center space-x-2">
                <Zap size={14} className="text-brass" />
                <span className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]">Engine: Neural_v4.0</span>
             </div>
             <div className="flex items-center space-x-2">
                <MapPin size={14} className="text-brass" />
                <span className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]">Origin: Pune_Atelier</span>
             </div>
          </div>
        </header>

        {/* Style DNA Section */}
        {styleDNA ? (
          <section className="mb-24 animate-fade-in">
            <div className="flex items-center space-x-4 mb-10">
              <Fingerprint size={24} className="text-[#1A1A1A]" />
              <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400">Section_01 // Aesthetic DNA</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
               <div className="md:col-span-4">
                  <h3 className="text-4xl font-black tracking-tighter mb-4 italic leading-tight">{styleDNA.title}</h3>
                  <div className="w-16 h-1 bg-brass mb-6" />
               </div>
               <div className="md:col-span-8">
                  <p className="text-xl md:text-2xl font-medium leading-relaxed text-zinc-600">
                    {styleDNA.desc}
                  </p>
               </div>
            </div>
          </section>
        ) : (
          <div className="mb-24 p-12 bg-zinc-50 rounded-[2rem] border-2 border-dashed border-zinc-200 text-center">
             <p className="text-zinc-400 text-[10px] uppercase tracking-widest font-black italic">Aesthetic Diagnostic Incomplete — Module_Beta Awaiting Execution</p>
          </div>
        )}

        {/* Palette DNA Section */}
        {paletteDNA ? (
          <section className="mb-24 animate-fade-in">
            <div className="flex items-center space-x-4 mb-12">
              <Palette size={24} className="text-[#1A1A1A]" />
              <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400">Section_02 // Atmospheric Palette</h2>
            </div>
            
            <div className="mb-12">
               <h3 className="text-4xl font-black tracking-tighter mb-2">{paletteDNA.name}</h3>
               <p className="text-zinc-400 italic text-lg">{paletteDNA.mood}</p>
            </div>

            <div className="flex flex-col md:flex-row h-64 md:h-80 w-full mb-12 overflow-hidden shadow-2xl print:shadow-none border-4 border-white print:border-none">
              {paletteDNA.colors.map((color, i) => (
                <div key={i} className="flex-grow flex flex-col items-center justify-end pb-8" style={{ backgroundColor: color.hex }}>
                   <span className="text-white text-[9px] font-bold uppercase tracking-widest mix-blend-difference opacity-60 mb-1">{color.role}</span>
                   <span className="text-white font-mono text-xs mix-blend-difference opacity-80">{color.hex}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-6">
                  <h4 className="text-[10px] uppercase tracking-widest font-black text-zinc-300">Composition Logic</h4>
                  <ul className="space-y-4">
                    {paletteDNA.colors.map((color, i) => (
                      <li key={i} className="flex items-start space-x-4">
                        <div className="w-4 h-4 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: color.hex }} />
                        <div>
                          <p className="text-xs font-bold text-[#1A1A1A] uppercase tracking-widest leading-none mb-1">{color.role}</p>
                          <p className="text-xs text-zinc-500 font-medium">{color.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
               </div>
               <div className="bg-zinc-50 p-10 rounded-[2.5rem] border border-zinc-100 h-fit">
                  <div className="flex items-center space-x-3 text-brass mb-6">
                    <Box size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Material_Anchor</span>
                  </div>
                  <h4 className="text-3xl font-black tracking-tighter mb-4">{paletteDNA.materialSuggestion}</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed font-bold">This material serves as the structural stabilizer for your neural color palette.</p>
               </div>
            </div>
          </section>
        ) : (
          <div className="mb-24 p-12 bg-zinc-50 rounded-[2rem] border-2 border-dashed border-zinc-200 text-center">
             <p className="text-zinc-400 text-[10px] uppercase tracking-widest font-black italic">Color Story Incomplete — Module_Gamma Awaiting Execution</p>
          </div>
        )}

        {/* Studio Footer */}
        <footer className="pt-20 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-start gap-12">
           <div className="max-w-xs transition-all duration-1000">
              <h4 className="text-xl font-black tracking-tighter mb-4 italic border-l-4 border-brass pl-6">KS Design Studio.</h4>
              <p className="text-[10px] text-zinc-400 leading-relaxed font-bold uppercase tracking-widest">
                The conclusion of this laboratory brief is an intellectual starting point. Connect with our principal architect to finalize implementation.
              </p>
           </div>
           <div className="flex flex-col space-y-2 text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]">
              <p>Hinjewadi - Wakad Rd, Pune</p>
              <p>KS_DESIGN_STUDIO_PROTOCOL_V4</p>
              <p className="text-brass">www.ksdesignpune.com</p>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default DesignReport;
