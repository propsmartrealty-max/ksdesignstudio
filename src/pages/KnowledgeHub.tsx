import React from 'react';
import { BLOGS, MATERIAL_TAXONOMY, STYLE_MONOLOGUES } from '../constants';
import BlogCard from '../components/KnowledgeHub/BlogCard';
import InteriorGuide from '../components/KnowledgeHub/InteriorGuide';
import Infographics from '../components/Interactive/Infographics';
import { ArrowRight, BookOpen, Lightbulb, PieChart, Shield, Pencil, Sparkles } from 'lucide-react';
import FAQSection from '../components/SEO/FAQSection';

const KnowledgeHub: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1920" 
            alt="Interior Library" 
            className="w-full h-full object-cover opacity-10 scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl px-6">
          <span className="text-brass font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
            Inside the Design Studio
          </span>
          <h1 className="text-5xl md:text-7xl text-charcoal mb-8">
            Knowledge Hub
          </h1>
          <p className="text-stone-500 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            A repository of architectural insights, interior guidelines, and design trends curated by KS Design Studio.
          </p>
        </div>
      </section>

      {/* Navigation Quick Links */}
      <div className="bg-white/80 border-b border-slate-50 sticky top-20 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center space-x-12 py-6 overflow-x-auto no-scrollbar">
            <a href="#blogs" className="flex items-center space-x-2 text-xs uppercase font-bold tracking-widest text-charcoal/40 hover:text-brass transition-colors shrink-0">
              <BookOpen size={14} />
              <span>Interior Blogs</span>
            </a>
            <a href="#guidelines" className="flex items-center space-x-2 text-xs uppercase font-bold tracking-widest text-charcoal/40 hover:text-brass transition-colors shrink-0">
              <Lightbulb size={14} />
              <span>Designer Guides</span>
            </a>
            <a href="#infographics" className="flex items-center space-x-2 text-xs uppercase font-bold tracking-widest text-charcoal/40 hover:text-brass transition-colors shrink-0">
              <PieChart size={14} />
              <span>Visual Infographics</span>
            </a>
          </div>
        </div>
      </div>

      {/* Blogs Section */}
      <section id="blogs" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <div className="max-w-xl">
              <span className="text-brass font-bold uppercase tracking-widest text-[10px] mb-4 block">
                Latest Insights
              </span>
              <h2 className="text-4xl text-charcoal">
                Interior Thought Leadership
              </h2>
            </div>
            <button className="hidden md:flex items-center space-x-2 text-charcoal/40 hover:text-brass transition-colors group">
              <span className="text-[10px] font-bold uppercase tracking-widest">View All Articles</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOGS.map(blog => (
              <div key={blog.id} className="relative group">
                <BlogCard blog={blog} />
                {blog.isVirtual && (
                  <div className="absolute top-4 right-4 bg-brass/90 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center space-x-1 shadow-lg backdrop-blur-sm">
                    <Sparkles size={10} />
                    <span>AI Enhanced</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection category="trends" limit={3} className="border-t border-slate-50" />

      {/* Visual Infographics Section */}
      <div id="infographics">
        <Infographics />
      </div>

      {/* Material Registry Volume */}
      <section className="py-24 bg-white/30 border-y border-charcoal/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-brass font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Intelligence_Module_01</span>
            <h2 className="text-4xl text-charcoal flex items-center gap-4">
              Material Registry <Shield size={24} className="text-brass/20" />
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {MATERIAL_TAXONOMY.map((cat, i) => (
              <div key={i} className="glass p-10 rounded-[2.5rem] border border-stone-100">
                <h3 className="text-[10px] uppercase font-black tracking-[0.5em] text-brass mb-8">{cat.category}</h3>
                <div className="space-y-6">
                  {cat.materials.map((item: any, idx) => (
                    <div key={idx} className="flex justify-between items-end border-b border-slate-50 pb-4 group">
                      <div>
                        <p className="text-xl text-charcoal group-hover:text-brass transition-colors">{item.name}</p>
                        <p className="text-[9px] uppercase font-bold text-charcoal/30 mt-1">{item.origin || 'Bespoke Sourced'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase font-black tracking-widest text-charcoal/60">
                           Pr: {item.property}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style Monologues Volume */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 architect-grid opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-16 text-center">
            <span className="text-brass font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Intelligence_Module_02</span>
            <h2 className="text-4xl text-charcoal">Design Monologues</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STYLE_MONOLOGUES.map((style, i) => (
              <div key={i} className="group p-10 rounded-[2.5rem] border border-slate-50 hover:border-brass transition-luxury bg-white">
                <Pencil size={20} className="text-brass mb-8 opacity-40 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-2xl text-charcoal mb-4 italic leading-none">{style.title}</h3>
                <p className="text-charcoal/40 text-xs leading-relaxed mb-8">{style.description}</p>
                <div className="space-y-4">
                   {style.principles.map((p, idx) => (
                     <div key={idx} className="flex items-center space-x-3 text-[9px] uppercase font-black tracking-[0.3em] text-charcoal/30">
                        <div className="w-1.5 h-1.5 bg-brass rounded-full" />
                        <span>{p}</span>
                     </div>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interior Guidelines (Dos and Don'ts) */}
      <div id="guidelines">
        <InteriorGuide />
      </div>

      {/* Visual Hub / Instagram style */}
      <section className="py-24 bg-white overflow-hidden border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
            <h2 className="text-4xl text-charcoal mb-4">The Visual Narrative</h2>
            <p className="text-stone-500 max-w-xl mx-auto">Follow our daily design explorations on the ground.</p>
        </div>
        
        <div className="flex space-x-4 animate-scroll infinite">
             {/* This would be an items list in a real app */}
             {[1,2,3,4,5,6].map(i => (
                 <div key={i} className="min-w-[300px] aspect-square rounded-xl overflow-hidden glass-dark">
                     <img 
                        src={`https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop&v=${i}`} 
                        alt="Portfolio" 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 cursor-pointer"
                    />
                 </div>
             ))}
        </div>
      </section>
    </div>
  );
};

export default KnowledgeHub;
