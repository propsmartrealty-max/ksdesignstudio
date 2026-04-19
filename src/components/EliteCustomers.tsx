import React from 'react';
import { ELITE_CUSTOMERS } from '../constants';

const EliteCustomers: React.FC = () => {
  return (
    <section className="py-32 bg-white overflow-hidden border-y border-zinc-200/40">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between relative z-10">
        <div className="max-w-xl">
          <h2 className="text-5xl md:text-7xl text-[#1A1A1A] tracking-tighter leading-[0.9] font-black">
            National Registry <br className="hidden md:block" /> of <span className="italic font-light text-zinc-400 font-medium">Elite Palettes.</span>
          </h2>
        </div>
        <p className="text-zinc-500 text-lg md:mt-0 font-medium max-w-xs leading-relaxed">
          Trusted by patrons across India’s most coveted residential micro-markets.
        </p>
      </div>

      <div className="relative flex overflow-x-hidden">
        <div className="py-12 animate-marquee flex whitespace-nowrap items-center">
          {ELITE_CUSTOMERS.concat(ELITE_CUSTOMERS).map((customer, i) => (
            <div 
              key={i} 
              className="mx-16 text-4xl md:text-7xl font-black text-zinc-900/5 hover:text-brass transition-colors duration-700 cursor-default select-none tracking-tighter"
            >
              {customer}
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default EliteCustomers;
