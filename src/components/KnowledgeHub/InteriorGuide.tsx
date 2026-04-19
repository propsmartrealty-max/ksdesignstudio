import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { GUIDELINES } from '../../constants';

const InteriorGuide: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 px-4">
          <span className="text-brass font-bold uppercase tracking-[0.3em] text-xs mb-4 block animate-fade-in">
            Expert Wisdom
          </span>
          <h2 className="text-4xl md:text-5xl  text-charcoal mb-6">
            Interior Design Guidelines
          </h2>
          <p className="text-charcoal/60 max-w-2xl mx-auto text-lg">
            Master the art of tectonic living with our curated list of professional design principles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {GUIDELINES.map((guide, index) => (
            <div 
              key={guide.id}
              className="glass p-10 rounded-2xl transition-luxury hover:shadow-2xl hover:-translate-y-2 group"
            >
              <h3 className="text-2xl  text-charcoal mb-4 flex items-center justify-between">
                {guide.title}
                <span className="text-brass/20 text-4xl group-hover:text-brass transition-colors">
                  0{index + 1}
                </span>
              </h3>
              <p className="text-charcoal/70 mb-8 italic">
                {guide.description}
              </p>

              <div className="space-y-8">
                <div>
                  <h4 className="flex items-center text-emerald-700 font-bold uppercase tracking-widest text-xs mb-4">
                    <CheckCircle2 size={16} className="mr-2" />
                    The Elite Approach (Dos)
                  </h4>
                  <ul className="space-y-3">
                    {guide.dos.map((item, i) => (
                      <li key={i} className="text-charcoal/80 flex items-start text-sm">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 mr-3 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-charcoal/5">
                  <h4 className="flex items-center text-rose-700 font-bold uppercase tracking-widest text-xs mb-4">
                    <XCircle size={16} className="mr-2" />
                    Avoid at all Costs (Don'ts)
                  </h4>
                  <ul className="space-y-3">
                    {guide.donts.map((item, i) => (
                      <li key={i} className="text-charcoal/80 flex items-start text-sm">
                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-1.5 mr-3 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteriorGuide;
