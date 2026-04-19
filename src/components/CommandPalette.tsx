import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Command, ArrowRight, Zap, Target, Box, MapPin, FolderHeart, Layout } from 'lucide-react';
import { PROJECTS, SERVICES } from '../constants';
import { SEO_LOCATIONS } from '../registry/seo_registry';

interface IndexItem {
  id: string;
  title: string;
  category: 'Project' | 'Service' | 'City' | 'Laboratory';
  path: string;
  icon: React.ReactNode;
}

const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Build the Index
  const index: IndexItem[] = [
    ...PROJECTS.map(p => ({
      id: p.id,
      title: p.title,
      category: 'Project' as const,
      path: `/portfolio/${p.id}`,
      icon: <Target size={16} />
    })),
    ...SERVICES.map(s => ({
      id: s.id,
      title: s.title,
      category: 'Service' as const,
      path: s.path,
      icon: <Box size={16} />
    })),
    { id: 'lab-palette', title: 'Color Palette Generator', category: 'Laboratory', path: '/laboratory', icon: <Zap size={16} /> },
    { id: 'signature-series', title: 'Tectonic Signature Series', category: 'Laboratory', path: '/tectonic-series', icon: <Layout size={16} /> },
    { id: 'lab-vision', title: 'Spatial Vision Lab', category: 'Laboratory', path: '/laboratory', icon: <Zap size={16} /> },
    { id: 'lab-vault', title: 'Material Intelligence Vault', category: 'Laboratory', path: '/laboratory', icon: <Zap size={16} /> },
    { id: 'sovereign-vault', title: 'Sovereign Project Vault', category: 'Laboratory', path: '/vault', icon: <FolderHeart size={16} /> },
    ...Object.entries(SEO_LOCATIONS).flatMap(([region, cities]) => 
      cities.map(city => ({
        id: `city-${city}`,
        title: `${city} Interiors`,
        category: 'City' as const,
        path: `/cities/${city.toLowerCase().replace(/\s+/g, '-')}`,
        icon: <MapPin size={16} />
      }))
    )
  ];

  const filteredItems = search.trim() === '' 
    ? [] 
    : index.filter(item => 
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 8);

  const togglePalette = useCallback(() => setIsOpen(prev => !prev), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        togglePalette();
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePalette]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-[15vh] px-4 font-sans">
      <div className="absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-xl" onClick={() => setIsOpen(false)} />
      
      <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-[0_50px_100px_rgba(0,0,0,0.3)] border border-white/40 glass-premium overflow-hidden animate-slide-up relative z-10">
        <div className="p-8 border-b border-zinc-100 flex items-center space-x-6">
          <Search className="text-zinc-400" size={24} />
          <input 
            autoFocus
            type="text"
            placeholder="Search Design Index (⌘K)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow bg-transparent text-xl font-medium text-[#1A1A1A] outline-none placeholder:text-zinc-300"
          />
          <div className="flex items-center space-x-3 text-[10px] font-black text-zinc-300 uppercase tracking-widest border border-zinc-100 px-3 py-1.5 rounded-lg bg-zinc-50">
            <Command size={10} />
            <span>K</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 text-zinc-400 hover:text-[#1A1A1A] transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {search.trim() === '' ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-zinc-300">
                <Command size={32} />
              </div>
              <p className="text-zinc-400 text-sm font-medium">Search for projects, materials, or locations instantly.</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="p-12 text-center text-zinc-400 text-sm font-medium">
              No results found for "{search}"
            </div>
          ) : (
            <div className="p-4 space-y-2">
              {filteredItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.path);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-zinc-50 transition-all border border-transparent hover:border-zinc-100 group"
                >
                  <div className="flex items-center space-x-5">
                    <div className="w-10 h-10 bg-white border border-zinc-100 rounded-xl flex items-center justify-center text-zinc-400 group-hover:text-brass group-hover:border-brass/20 transition-colors">
                      {item.icon}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-[#1A1A1A]">{item.title}</p>
                      <p className="text-[9px] uppercase tracking-widest font-black text-zinc-400">{item.category}</p>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-zinc-300 transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 bg-zinc-50/50 border-t border-zinc-100 flex items-center justify-between">
           <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <kbd className="text-[9px] bg-white border border-zinc-200 px-1.5 py-0.5 rounded shadow-sm text-zinc-500 font-bold">↵</kbd>
                <span className="text-[9px] text-zinc-400 uppercase font-black tracking-widest leading-none">Select</span>
              </div>
              <div className="flex items-center space-x-2">
                <kbd className="text-[9px] bg-white border border-zinc-200 px-1.5 py-0.5 rounded shadow-sm text-zinc-500 font-bold">↑↓</kbd>
                <span className="text-[9px] text-zinc-400 uppercase font-black tracking-widest leading-none">Navigate</span>
              </div>
           </div>
           <p className="text-[9px] text-zinc-300 font-bold uppercase tracking-[0.2em]">Atelier Index</p>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
