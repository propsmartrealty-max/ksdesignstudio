import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOGS } from '../constants';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const blog = BLOGS.find(b => b.id === id);

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
           <span className="text-brass tracking-[0.4em] uppercase text-[10px] font-black block">{blog.category}</span>
           <h1 className="text-4xl md:text-6xl text-charcoal leading-tight">{blog.title}</h1>
           <div className="flex items-center justify-center space-x-8 text-charcoal/30 text-[10px] uppercase tracking-widest font-black pt-4">
              <span className="flex items-center"><Calendar size={12} className="mr-2" /> {blog.date}</span>
              <span className="flex items-center"><User size={12} className="mr-2" /> {blog.author}</span>
           </div>
        </div>

        <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-20 shadow-2xl">
           <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-stone max-w-none text-stone-600 space-y-8 leading-relaxed text-lg font-light">
           <p className="text-xl font-medium text-charcoal italic">{blog.excerpt}</p>
           <p>
             The architectural landscape of Pune is undergoing a rapid transformation, moving away from generic housing towards spaces that prioritize tectonic honesty and functional sculpture. At KS Design Studio, we believe that interior design is not about decoration, but about the rigorous shaping of volume and light.
           </p>
           <h2 className="text-2xl text-charcoal pt-8">Spatial Integrity</h2>
           <p>
             Every space we design in micro-markets like Baner and Wakad is a response to the local light conditions and the structural silhouette of the building. We prioritize natural materials—wood, stone, and metal—allowing their inherent qualities to define the atmosphere.
           </p>
           <div className="bg-slate-50 p-10 rounded-2xl border-l-4 border-brass my-12 italic text-charcoal/80 border-y border-r border-slate-100 shadow-sm">
             "A well-designed space is a silent narrative that unfolds as you move through it. It doesn't scream for attention; it commands presence through quiet luxury."
           </div>
           <p>
             Whether it's a 3BHK in Lodha Belmondo or a standalone bungalow in Bavdhan, our approach remains grounded in architectural principles rather than fleeting trends. We invite you to explore our project monographs to see these guidelines in action.
           </p>
        </div>

        <div className="mt-20 pt-12 border-t border-stone-100 flex items-center justify-between">
           <div className="flex items-center space-x-4">
              <span className="text-[10px] uppercase tracking-widest font-black text-stone-400">Share Insight:</span>
              <button className="p-2 hover:text-brass transition-colors"><Share2 size={16} /></button>
           </div>
           <Link to="/contact" className="text-[10px] uppercase tracking-widest font-black text-charcoal hover:text-brass transition-colors border-b border-charcoal hover:border-brass pb-1">
              Start Workspace Transformation
           </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
