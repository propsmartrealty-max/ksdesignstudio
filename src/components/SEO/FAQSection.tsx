import React, { useState } from 'react';
import { PUNE_INTERIOR_FAQS } from '../../registry/faq_registry';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FAQSectionProps {
  category?: string;
  limit?: number;
  className?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({ category, limit, className = "" }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filteredFaqs = category 
    ? PUNE_INTERIOR_FAQS.filter(faq => faq.category === category)
    : PUNE_INTERIOR_FAQS;

  const displayFaqs = limit ? filteredFaqs.slice(0, limit) : filteredFaqs;

  // Generate FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": displayFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className={`py-24 bg-white relative overflow-hidden ${className}`}>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <div className="absolute inset-0 architect-grid opacity-5 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 text-brass mb-6">
            <Sparkles size={16} />
            <span className="text-[10px] uppercase font-black tracking-[0.6em]">Search Optimization Cluster</span>
          </div>
          <h2 className="text-4xl md:text-6xl text-charcoal tracking-tighter leading-none mb-8">
            Interior Intelligence <br /> <span className="italic font-light text-charcoal/40">FAQ Registry.</span>
          </h2>
          <p className="text-charcoal/50 text-sm font-medium max-w-xl mx-auto leading-relaxed">
            Addressing high-velocity search queries for the Pune interior design market with technical precision and architectural transparency.
          </p>
        </div>

        <div className="space-y-4">
          {displayFaqs.map((faq, index) => (
            <div 
              key={index} 
              className={`glass-premium rounded-3xl border border-zinc-200/40 overflow-hidden transition-all duration-500 ${
                activeIndex === index ? 'bg-zinc-50/50 border-brass/20' : 'hover:bg-zinc-50/30'
              }`}
            >
              <button 
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full px-8 py-8 flex items-center justify-between text-left group"
              >
                <div className="flex items-start space-x-6">
                  <HelpCircle size={20} className={`mt-1 transition-colors duration-500 ${
                    activeIndex === index ? 'text-brass' : 'text-zinc-300 group-hover:text-brass/40'
                  }`} />
                  <h3 className="text-lg font-bold text-charcoal tracking-tight pr-8">{faq.question}</h3>
                </div>
                <ChevronDown 
                  size={20} 
                  className={`transition-transform duration-500 shrink-0 ${
                    activeIndex === index ? 'rotate-180 text-brass' : 'text-zinc-300'
                  }`} 
                />
              </button>
              
              <div 
                className={`transition-all duration-500 ease-in-out ${
                  activeIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-20 pb-10">
                  <p className="text-zinc-500 text-sm font-medium leading-relaxed italic border-l-2 border-brass/20 pl-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
           <p className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-400">
             Indexing Status: <span className="text-sage">Active (FAQPage Schema Injected)</span>
           </p>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
