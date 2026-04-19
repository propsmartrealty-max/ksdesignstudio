
import React from 'react';

const steps = [
  {
    num: '01',
    title: 'Concept Discovery',
    desc: 'We start by understanding your lifestyle, aspirations, and the unique soul of your space through deep conversation and visual mood-boarding.'
  },
  {
    num: '02',
    title: 'Detailed Curation',
    desc: 'Selection of bespoke materials, custom furniture designs, and precise 3D visualizations that bring the abstract concept to life.'
  },
  {
    num: '03',
    title: 'Seamless Execution',
    desc: 'Our dedicated team manages every aspect of procurement and site supervision, ensuring craftsmanship meets our exacting standards.'
  },
  {
    num: '04',
    title: 'The Final Reveal',
    desc: 'Handing over a space that is not just a house, but a sanctuary designed specifically for the rhythm of your life.'
  }
];

const Process: React.FC = () => {
  return (
    <section className="py-24 px-6 lg:px-12 bg-white overflow-hidden relative border-y border-slate-50">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 transform translate-x-24" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-2xl mb-20">
          <span className="text-brass tracking-widest uppercase text-[10px] font-black block mb-4">Our Way of Working</span>
          <h2 className="text-4xl md:text-5xl text-charcoal">From Concept to <span className="italic font-light text-slate-200">Completion</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step) => (
            <div key={step.num} className="group">
              <span className="text-5xl text-charcoal/[0.03] group-hover:text-brass/20 transition-colors duration-500 block mb-6">
                {step.num}
              </span>
              <h3 className="text-xl font-bold mb-4 text-charcoal group-hover:text-brass transition-colors">
                {step.title}
              </h3>
              <p className="text-stone-500 leading-relaxed font-light text-sm">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
