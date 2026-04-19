import React from 'react';
import { Link } from 'react-router-dom';
import { Blog } from '../../types';
import { ArrowUpRight, Calendar, User } from 'lucide-react';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <Link to={`/knowledge/${blog.id}`} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden transition-luxury hover:shadow-2xl border border-charcoal/5 block">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={blog.imageUrl} 
          alt={blog.alt || `KS Design Studio Pune | ${blog.title}`} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-brass text-white px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-full">
          {blog.category}
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center space-x-4 text-charcoal/40 text-[10px] uppercase tracking-widest font-bold mb-4">
          <span className="flex items-center">
            <Calendar size={12} className="mr-1" />
            {blog.date}
          </span>
          <span className="flex items-center">
            <User size={12} className="mr-1" />
            {blog.author}
          </span>
        </div>
        
        <h3 className="text-xl  text-charcoal mb-4 group-hover:text-brass transition-colors leading-tight">
          {blog.title}
        </h3>
        
        <p className="text-charcoal/60 text-sm mb-8 line-clamp-2">
          {blog.excerpt}
        </p>
        
        <div className="mt-auto pt-6 border-t border-charcoal/5 flex items-center justify-between text-charcoal/40 text-[10px] uppercase font-bold tracking-widest group-hover:text-brass transition-colors">
          <span>Read Insight</span>
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
