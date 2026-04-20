import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FolderHeart, Palette, Fingerprint, Layout, FileText, ArrowRight, Trash2, ShieldCheck, Download, ExternalLink, Heart, Box, Gem } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { safeStorageGet, safeStorageRemove } from '../utils/storage';

interface VaultItem {
  id: string;
  type: 'style' | 'palette' | 'spatial' | 'project' | 'material';
  title: string;
  date: string;
  data: any;
}

const ProjectVault: React.FC = () => {
  const { shortlistedProjects, shortlistedMaterials, vaultCount } = useApp();
  const [items, setItems] = useState<VaultItem[]>([]);
  const [selectedType, setSelectedType] = useState<'all' | 'style' | 'palette' | 'spatial' | 'project' | 'material'>('all');

  useEffect(() => {
    const styleDataString = localStorage.getItem('KS_STYLE_DNA');
    const paletteDataString = localStorage.getItem('KS_PALETTE_DNA');
    const spatialData = safeStorageGet<any[]>('KS_SPATIAL_AUDITS', []);

    const loadedItems: VaultItem[] = [];

    // 1. AI DNA Findings
    if (styleDataString) {
      try {
        const dna = JSON.parse(styleDataString);
        loadedItems.push({
          id: 'style-dna',
          type: 'style',
          title: dna.title,
          date: 'Generated DNA',
          data: dna
        });
      } catch (e) {
        console.error("Corrupted Style DNA found.");
      }
    }

    if (paletteDataString) {
      try {
        const pal = JSON.parse(paletteDataString);
        loadedItems.push({
          id: 'palette-dna',
          type: 'palette',
          title: pal.name,
          date: 'Atmospheric Palette',
          data: pal
        });
      } catch (e) {
        console.error("Corrupted Palette DNA found.");
      }
    }

    spatialData.forEach((audit: any, idx: number) => {
      loadedItems.push({
        id: `spatial-${idx}`,
        type: 'spatial',
        title: `Spatial Audit | ${audit.location || 'Pune'}`,
        date: new Date(audit.date).toLocaleDateString(),
        data: audit
      });
    });

    // 2. Shortlisted Projects
    shortlistedProjects.forEach(project => {
      loadedItems.push({
        id: `project-${project.id}`,
        type: 'project',
        title: project.title,
        date: 'Design Inspiration',
        data: project
      });
    });

    // 3. Shortlisted Materials
    shortlistedMaterials.forEach(material => {
      loadedItems.push({
        id: `material-${material.name.replace(/\s+/g, '-')}`,
        type: 'material',
        title: material.name,
        date: 'Material Selection',
        data: material
      });
    });

    setItems(loadedItems);
  }, [shortlistedProjects, shortlistedMaterials]);

  const clearVault = () => {
    if (window.confirm("Are you sure? This will purge your localized design data from the Sovereign Vault.")) {
      localStorage.removeItem('KS_STYLE_DNA');
      localStorage.removeItem('KS_PALETTE_DNA');
      localStorage.removeItem('KS_SPATIAL_AUDITS');
      localStorage.removeItem('KS_SAVED_PROJECTS');
      localStorage.removeItem('KS_SAVED_MATERIALS');
      window.location.reload();
    }
  };

  const generateGlobalConsultation = () => {
    let message = `*SOVEREIGN ARCHITECTURAL BRIEF*%0A%0AHi KS Design Studio, I have finalized my selection in the Sovereign Vault for my project.%0A%0A`;
    
    const projects = items.filter(i => i.type === 'project').map(i => i.title);
    const materials = items.filter(i => i.type === 'material').map(i => i.title);
    const audits = items.filter(i => i.type === 'spatial').length;
    
    if (projects.length) message += `%0A*Inspirational Projects:*%0A- ${projects.join('%0A- ')}%0A`;
    if (materials.length) message += `%0A*Curated Materials:*%0A- ${materials.join('%0A- ')}%0A`;
    if (audits) message += `%0A*Spatial Audits:* ${audits} reports pending review.%0A`;

    message += `%0A_Requesting a design hardening callback._`;
    
    window.open(`https://wa.me/917020377693?text=${message}`, '_blank');
  };

  const filteredItems = selectedType === 'all' ? items : items.filter(i => i.type === selectedType);

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 architect-grid opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-3 text-brass mb-6">
              <FolderHeart size={24} />
              <span className="text-[10px] uppercase tracking-[0.4em] font-black">Sovereign_Project_Vault_V4</span>
            </div>
            <h1 className="text-6xl md:text-8xl text-zinc-900 tracking-tighter leading-none mb-6">
              The <span className="italic font-light text-zinc-400">Atelier.</span>
            </h1>
            <p className="text-zinc-500 text-lg font-medium leading-relaxed">
              Welcome to your private design sanctuary. This is where your spatial DNA, curated materials, and site inspirations converge into a single architectural brief.
            </p>
          </div>
          
          <div className="flex flex-col items-end space-y-4">
             <div className="flex items-center space-x-4">
                <button 
                  onClick={clearVault}
                  className="px-6 py-4 bg-zinc-50 text-zinc-400 border border-zinc-100 rounded-full text-[9px] uppercase tracking-widest font-black hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center space-x-2"
                >
                    <Trash2 size={14} />
                    <span>Purge Data</span>
                </button>
                <Link 
                  to="/laboratory/report"
                  className="px-10 py-5 bg-[#1A1A1A] text-white rounded-full text-[10px] uppercase tracking-[0.4em] font-black hover:bg-brass transition-all shadow-2xl flex items-center space-x-4"
                >
                    <FileText size={18} />
                    <span>Global Monograph</span>
                </Link>
             </div>
             {items.length > 0 && (
               <button 
                 onClick={generateGlobalConsultation}
                 className="w-full px-10 py-6 bg-brass text-white rounded-2xl text-[10px] uppercase tracking-[0.4em] font-black hover:bg-[#1A1A1A] transition-all shadow-[0_20px_50px_rgba(212,175,55,0.3)] flex items-center justify-center space-x-4 border border-brass/50 animate-pulse-slow"
               >
                  <ShieldCheck size={20} />
                  <span>Consult Architect on Selection</span>
               </button>
             )}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-8 md:gap-12 mb-16 border-b border-zinc-100 items-end">
           {(['all', 'style', 'palette', 'spatial', 'project', 'material'] as const).map((type) => (
             <button
               key={type}
               onClick={() => setSelectedType(type)}
               className={`text-[10px] uppercase tracking-[0.3em] font-black transition-all pb-6 relative group ${
                 selectedType === type ? 'text-brass' : 'text-zinc-300 hover:text-zinc-900'
               }`}
             >
               {type}
               <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-brass transition-transform duration-500 ${selectedType === type ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`} />
               <span className="ml-2 text-[8px] font-bold text-zinc-400 opacity-40">
                  [{items.filter(i => type === 'all' || i.type === type).length}]
               </span>
             </button>
           ))}
        </div>

        {/* Dashboard Grid */}
        {items.length === 0 ? (
          <div className="py-32 text-center glass-premium rounded-[3.5rem] border-dashed border-2 border-zinc-200">
             <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-8 text-zinc-200">
                <ShieldCheck size={48} />
             </div>
             <h3 className="text-2xl font-black text-[#1A1A1A] mb-4 tracking-tighter">Your Atelier is Empty</h3>
             <p className="text-zinc-400 max-w-md mx-auto text-sm font-medium">Start populating your workspace by saving projects and choosing materials from our portfolio and vault.</p>
             <div className="flex justify-center space-x-6 mt-10">
                <Link to="/portfolio" className="inline-flex items-center space-x-2 text-zinc-900 text-[10px] font-black uppercase tracking-widest hover:text-brass transition-all">
                    <span>View Projects</span>
                    <ArrowRight size={14} />
                </Link>
                <Link to="/laboratory" className="inline-flex items-center space-x-2 text-brass text-[10px] font-black uppercase tracking-widest hover:translate-x-2 transition-all">
                    <span>Laboratory</span>
                    <ArrowRight size={14} />
                </Link>
             </div>
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
                          {item.type === 'project' && <Heart size={20} />}
                          {item.type === 'material' && <Box size={20} />}
                       </div>
                       <span className="text-[9px] font-black uppercase tracking-widest text-zinc-300">{item.date}</span>
                    </div>
                    <div>
                       <h3 className="text-2xl font-black tracking-tighter leading-tight mb-2 text-[#1A1A1A]">{item.title}</h3>
                       <p className="text-[10px] uppercase tracking-widest font-black text-zinc-400">{item.type} entry</p>
                    </div>
                 </div>
                 
               <div className="pt-10 flex flex-col gap-4">
                  <div className="flex gap-4">
                    <Link 
                      to={item.type === 'project' ? `/portfolio/${item.data.id}` : (item.type === 'material' ? '/vault' : '/laboratory')} 
                      className="flex-grow py-4 bg-zinc-50 text-center rounded-2xl text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:bg-zinc-900 hover:text-white transition-all flex items-center justify-center space-x-2"
                    >
                       <span>View Detail</span>
                       <ExternalLink size={12} />
                    </Link>
                    <button className="p-4 bg-zinc-50 text-zinc-400 rounded-2xl hover:text-brass transition-all" onClick={() => {
                        const whatsappMsg = `*WORKSPACE ITEM: ${item.title}*%0A%0AHi KS Design Studio, I am sending you my ${item.type} selection for my project.`;
                        window.open(`https://wa.me/917020377693?text=${whatsappMsg}`, '_blank');
                    }}>
                       <Download size={18} />
                    </button>
                  </div>
                  <button onClick={() => {
                      const whatsappMsg = `*WORKSPACE ITEM: ${item.title}*%0A%0AHi KS Design Studio, I am interested in discussing this ${item.type} entry from my Atelier.%0A%0AEntry: ${item.title}`;
                      window.open(`https://wa.me/917020377693?text=${whatsappMsg}`, '_blank');
                  }} className="w-full py-4 border border-brass text-brass rounded-2xl text-[9px] uppercase tracking-[0.3em] font-black hover:bg-brass hover:text-white transition-all flex justify-center items-center gap-2">
                     Consult on this Selection <ArrowRight size={12} />
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
           <p className="text-[9px] font-bold uppercase tracking-widest">Atelier Persistent Ledger v4.0</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectVault;
