import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FolderHeart, Palette, Fingerprint, Layout, FileText, ArrowRight, Trash2, ShieldCheck, Download, ExternalLink } from 'lucide-react';

interface VaultItem {
  id: string;
  type: 'style' | 'palette' | 'spatial';
  title: string;
  date: string;
  data: any;
}

const ProjectVault: React.FC = () => {
  const [items, setItems] = useState<VaultItem[]>([]);
  const [selectedType, setSelectedType] = useState<'all' | 'style' | 'palette' | 'spatial'>('all');

  useEffect(() => {
    const styleData = localStorage.getItem('KS_STYLE_DNA');
    const paletteData = localStorage.getItem('KS_PALETTE_DNA');
    const spatialData = JSON.parse(localStorage.getItem('KS_SPATIAL_AUDITS') || '[]');

    const loadedItems: VaultItem[] = [];

    if (styleData) {
      const dna = JSON.parse(styleData);
      loadedItems.push({
        id: 'style-dna',
        type: 'style',
        title: dna.title,
        date: 'Current Selection',
        data: dna
      });
    }

    if (paletteData) {
      const pal = JSON.parse(paletteData);
      loadedItems.push({
        id: 'palette-dna',
        type: 'palette',
        title: pal.name,
        date: 'Current Selection',
        data: pal
      });
    }

    spatialData.forEach((audit: any, idx: number) => {
      loadedItems.push({
        id: `spatial-${idx}`,
        type: 'spatial',
        title: `Spatial Audit #${spatialData.length - idx}`,
        date: new Date(audit.date).toLocaleDateString(),
        data: audit
      });
    });

    setItems(loadedItems);
  }, []);

  const clearVault = () => {
    if (window.confirm("Are you sure? This will purge your localized design data from the Sovereign Vault.")) {
      localStorage.removeItem('KS_STYLE_DNA');
      localStorage.removeItem('KS_PALETTE_DNA');
      localStorage.removeItem('KS_SPATIAL_AUDITS');
      setItems([]);
    }
  };

  const filteredItems = selectedType === 'all' ? items : items.filter(i => i.type === selectedType);

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 architect-grid opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <div className="flex items-center space-x-3 text-brass mb-6">
              <FolderHeart size={24} />
              <span className="text-[10px] uppercase tracking-[0.4em] font-black">Sovereign_Project_Vault</span>
            </div>
            <h1 className="text-6xl md:text-8xl text-zinc-900 tracking-tighter leading-none mb-4">
              Your <span className="italic font-light text-zinc-400">Atelier.</span>
            </h1>
            <p className="text-zinc-500 max-w-xl text-lg font-medium">
              A private, persistent environment for all your laboratory findings. Your data stays on your machine, always protected.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
             <button 
               onClick={clearVault}
               className="px-8 py-4 bg-zinc-50 text-zinc-400 border border-zinc-100 rounded-full text-[10px] uppercase tracking-widest font-black hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center space-x-3"
             >
                <Trash2 size={14} />
                <span>Purge Vault</span>
             </button>
             <Link 
               to="/laboratory/report"
               className="px-10 py-5 bg-[#1A1A1A] text-white rounded-full text-[10px] uppercase tracking-[0.4em] font-black hover:bg-brass transition-all shadow-2xl flex items-center space-x-4"
             >
                <FileText size={18} />
                <span>Global Monograph</span>
             </Link>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex space-x-12 mb-16 border-b border-zinc-100 pb-8">
           {['all', 'style', 'palette', 'spatial'].map((type) => (
             <button
               key={type}
               onClick={() => setSelectedType(type as any)}
               className={`text-[10px] uppercase tracking-[0.3em] font-black transition-all ${
                 selectedType === type ? 'text-brass border-b-2 border-brass pb-8' : 'text-zinc-300 hover:text-zinc-900'
               }`}
             >
               {type}
             </button>
           ))}
        </div>

        {/* Dashboard Grid */}
        {items.length === 0 ? (
          <div className="py-32 text-center glass-premium rounded-[3.5rem] border-dashed border-2 border-zinc-200">
             <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-8 text-zinc-200">
                <ShieldCheck size={48} />
             </div>
             <h3 className="text-2xl font-black text-[#1A1A1A] mb-4 tracking-tighter">Your Vault is Encrypted & Empty</h3>
             <p className="text-zinc-400 max-w-md mx-auto text-sm font-medium">Start calorie-free architectural design in our laboratory to populate this space with your spatial findings.</p>
             <Link to="/laboratory" className="inline-flex items-center space-x-2 text-brass mt-10 text-[10px] font-black uppercase tracking-widest hover:translate-x-2 transition-all">
                <span>Enter Laboratory</span>
                <ArrowRight size={16} />
             </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredItems.map((item) => (
              <div key={item.id} className="glass-premium p-10 rounded-[3rem] border-white/60 shadow-xl flex flex-col justify-between group hover:border-brass/40 transition-all">
                 <div className="space-y-6">
                    <div className="flex justify-between items-start">
                       <div className="w-12 h-12 bg-zinc-900 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:bg-brass transition-colors">
                          {item.type === 'style' && <Fingerprint size={20} />}
                          {item.type === 'palette' && <Palette size={20} />}
                          {item.type === 'spatial' && <Layout size={20} />}
                       </div>
                       <span className="text-[9px] font-black uppercase tracking-widest text-zinc-300">{item.date}</span>
                    </div>
                    <div>
                       <h3 className="text-2xl font-black tracking-tighter leading-tight mb-2 text-[#1A1A1A]">{item.title}</h3>
                       <p className="text-[10px] uppercase tracking-widest font-black text-zinc-400">{item.type} finding</p>
                    </div>
                 </div>
                 
                 <div className="pt-10 flex gap-4">
                    <Link 
                      to={item.type === 'spatial' ? '/laboratory' : (item.type === 'palette' ? '/laboratory' : '/laboratory')} 
                      className="flex-grow py-4 bg-zinc-50 text-center rounded-2xl text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:bg-brass hover:text-white transition-all"
                    >
                       View Raw
                    </Link>
                    <button className="p-4 bg-zinc-50 text-zinc-400 rounded-2xl hover:text-brass transition-all">
                       <Download size={18} />
                    </button>
                 </div>
              </div>
            ))}
          </div>
        )}

        {/* Security Footer */}
        <div className="mt-32 pt-20 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center text-zinc-300">
           <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <ShieldCheck size={20} className="text-green-500" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em]">Sovereign_Shield Active</span>
           </div>
           <p className="text-[9px] font-bold uppercase tracking-widest">Data Persistence: Native_LocalStorage_V4</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectVault;
