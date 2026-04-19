import React from 'react';
import { ShieldCheck, Calendar, CheckSquare, Clock } from 'lucide-react';

const guarantees = [
  {
    icon: ShieldCheck,
    title: 'Service Warranty',
    value: '10-Year',
    description: 'A decade of material and finish coverage for all our premium interior projects.'
  },
  {
    icon: Clock,
    title: 'Installation Promise',
    value: '45-Day',
    description: 'Guaranteed move-in timelines from design approval to final handover.'
  },
  {
    icon: CheckSquare,
    title: 'Quality Matrix',
    value: '146-Point',
    description: 'Rigorous interior quality checklists covering every detail of execution.'
  },
  {
    icon: Calendar,
    title: 'Service Lifecycle',
    value: 'Lifetime',
    description: 'Dedicated studio support and maintenance protocol for the lifecycle of your home.'
  }
];

const GuaranteeProtocol: React.FC = () => {
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white opacity-[0.5] -skew-x-12 translate-x-1/4" />
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-24">
          <span className="text-brass tracking-[0.8em] uppercase text-[10px] font-black block mb-4">The KS Promise</span>
          <h2 className="text-5xl md:text-7xl text-charcoal tracking-tighter leading-none">
            Unmatched <span className="italic font-light text-brass/70">Quality.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guarantees.map((item, i) => (
            <div 
              key={item.title} 
              className="group bg-white p-12 rounded-[3.5rem] border border-charcoal/5 hover:border-brass/30 transition-all duration-700 hover:shadow-2xl"
            >
              <div className="w-16 h-16 rounded-3xl bg-brass/5 flex items-center justify-center text-brass mb-8 group-hover:bg-brass group-hover:text-white transition-all duration-700">
                <item.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-charcoal/60 mb-2">{item.title}</h3>
              <div className="text-4xl font-black text-charcoal mb-6 flex items-baseline">
                {item.value} 
                <span className="h-1.5 w-1.5 bg-brass rounded-full ml-2" />
              </div>
              <p className="text-charcoal/70 font-light text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
           <div className="inline-flex items-center space-x-6 px-10 py-4 bg-charcoal rounded-full text-white text-[10px] uppercase tracking-[0.5em] font-black cursor-pointer hover:bg-brass transition-all duration-500">
             <span>View Full Warranty</span>
             <ShieldCheck size={14} className="text-brass" />
           </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeProtocol;
