import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOGS } from '../constants';
import { ArrowLeft, Calendar, User, Share2, BrainCircuit, Sparkles, Wand2 } from 'lucide-react';
import { executeTectonicAI } from '../services/gemini';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const blog = BLOGS.find(b => b.id === id);
  const [aiContent, setAiContent] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    async function generateContent() {
      if (blog?.isVirtual) {
        setIsGenerating(true);
        try {
          const prompt = `
            Write a high-fidelity, professional architectural blog post for the topic: "${blog.title}".
            
            Context:
            - Excerpt: ${blog.excerpt}
            - Category: ${blog.category}
            - Target Market: Pune Interior Design
            
            Requirements:
            1. Use a visionary, minimalistic, and expert tone.
            2. Structure the content with 4-5 deep-dive paragraphs.
            3. Include specific material callouts (e.g. Statuario marble, charcoal oak, Venetian plaster).
            4. Focus on 'Spatial Flow' and 'Material Honesty'.
            5. Avoid generic advice; provide "Atelier-level" design intelligence.
          `;
          const content = await executeTectonicAI(prompt);
          setAiContent(content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-charcoal">$1</strong>'));
        } catch (error) {
          console.error("AI Blog Generation Error:", error);
        } finally {
          setIsGenerating(false);
        }
      }
    }
    generateContent();
  }, [blog]);

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-charcoal">
        <h1 className="text-4xl mb-4">Insight Not Found</h1>
        <Link to="/knowledge" className="text-brass uppercase tracking-widest text-xs font-bold hover:underline">Return to Hub</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-white min-h-screen">
      <article className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16 space-y-6">
           <Link to="/knowledge" className="inline-flex items-center space-x-2 text-charcoal/40 hover:text-brass transition-colors mb-8 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] uppercase tracking-widest font-bold">Back to Knowledge Hub</span>
           </Link>
           <div className="flex items-center justify-center space-x-3 mb-2">
             <span className="text-brass tracking-[0.4em] uppercase text-[10px] font-black">{blog.category}</span>
             {blog.isVirtual && (
               <>
                 <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                 <Wand2 size={12} className="text-brass animate-pulse" />
                 <span className="text-zinc-400 text-[8px] uppercase tracking-widest font-bold">AI Synthesized</span>
               </>
             )}
           </div>
           <h1 className="text-5xl md:text-7xl text-charcoal leading-tight tracking-tighter font-black">{blog.title}</h1>
           <div className="flex items-center justify-center space-x-8 text-charcoal/30 text-[10px] uppercase tracking-widest font-black pt-4">
              <span className="flex items-center"><Calendar size={12} className="mr-2" /> {blog.date}</span>
              <span className="flex items-center"><User size={12} className="mr-2" /> {blog.author}</span>
           </div>
        </div>

        <div className="aspect-[21/9] rounded-[3rem] overflow-hidden mb-20 shadow-2xl relative group">
           <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]" />
           <div className="absolute inset-0 bg-charcoal/10" />
        </div>

        <div className="prose prose-stone max-w-none text-stone-600 space-y-10 leading-relaxed text-lg font-light">
           <p className="text-2xl font-medium text-charcoal italic border-l-4 border-brass/20 pl-10 mb-16">{blog.excerpt}</p>
           
           {isGenerating ? (
             <div className="space-y-8 animate-pulse pt-10">
                <div className="h-4 bg-zinc-100 rounded w-full" />
                <div className="h-4 bg-zinc-100 rounded w-5/6" />
                <div className="h-4 bg-zinc-100 rounded w-4/6" />
                <div className="mt-12 flex items-center space-x-3 text-brass">
                   <BrainCircuit size={20} className="animate-spin" />
                   <span className="text-[10px] uppercase font-black tracking-widest">Synthesizing Design Intelligence...</span>
                </div>
             </div>
           ) : (
             <div 
               className="blog-content whitespace-pre-line text-xl leading-[1.8] font-light text-zinc-600"
               dangerouslySetInnerHTML={{ __html: aiContent || `
                 The architectural landscape of Pune is undergoing a rapid transformation, moving away from generic housing towards spaces that prioritize tectonic honesty and functional sculpture. At KS Design Studio, we believe that interior design is not about decoration, but about the rigorous shaping of volume and light.
                 
                 Every space we design in micro-markets like Baner and Wakad is a response to the local light conditions and the structural silhouette of the building. We prioritize natural materials—wood, stone, and metal—allowing their inherent qualities to define the atmosphere.
                 
                 A well-designed space is a silent narrative that unfolds as you move through it. It doesn't scream for attention; it commands presence through quiet luxury. Whether it's a 3BHK in Lodha Belmondo or a standalone bungalow in Bavdhan, our approach remains grounded in architectural principles rather than fleeting trends.
               `}} 
             />
           )}
           
           {blog.isVirtual && !isGenerating && (
             <div className="mt-20 p-12 bg-charcoal rounded-[2.5rem] text-white flex items-center justify-between">
                <div className="flex items-center space-x-6 text-zinc-100/50">
                  <Sparkles size={32} className="text-brass/60" />
                  <div>
                    <h4 className="text-xl font-bold tracking-tight text-white italic">Localized Insight Complete.</h4>
                    <p className="text-[10px] uppercase tracking-[0.3em] font-black mt-1">Sourced from Studio_Knowledge_Registry_V8</p>
                  </div>
                </div>
                <Link to="/contact" className="px-10 py-5 glass-premium rounded-2xl text-[10px] uppercase font-black tracking-[0.4em] hover:bg-brass transition-all">Consult Principal</Link>
             </div>
           )}
        </div>

        <div className="mt-24 pt-12 border-t border-stone-100 flex items-center justify-between">
           <div className="flex items-center space-x-4">
              <span className="text-[10px] uppercase tracking-widest font-black text-stone-400">Registry Reference:</span>
              <button className="p-2 hover:text-brass transition-colors"><Share2 size={16} /></button>
           </div>
           <Link to="/contact" className="text-[10px] uppercase tracking-widest font-black text-charcoal hover:text-brass transition-colors border-b border-charcoal hover:border-brass pb-1">
              Initiate Spatial Transformation
           </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
