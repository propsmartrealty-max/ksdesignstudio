import React from 'react';
import { Search, Bookmark, Monitor, PenTool, Key } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'Initial Consultation',
      desc: 'Connect with our lead interior designer to understand your vision for your 2BHK, 3BHK or Bungalow.',
      icon: <Search size={24} />,
      status: 'Understanding_Needs'
    },
    {
      id: 2,
      title: 'Project Booking',
      desc: 'Lock in your design timeline with our studio to begin planning your complete home makeover.',
      icon: <Bookmark size={24} />,
      status: 'Studio_Reserved'
    },
    {
      id: 3,
      title: '3D Design & Planning',
      desc: 'Collaboration on realistic 3D designs, material selection, and layout optimization.',
      icon: <Monitor size={24} />,
      status: 'Design_Freeze'
    },
    {
      id: 4,
      title: 'Rigorous Execution',
      desc: 'Precision manufacturing and protocol-led site installation overseen by our lead architects.',
      icon: <PenTool size={24} />,
      status: 'Site_Deployment'
    },
    {
      id: 5,
      title: 'Final Handover',
      desc: 'Your dream home revealed. Move into your beautiful new interior backed by our solid warranty.',
      icon: <Key size={24} />,
      status: 'Mission_Complete'
    }
  ];

  return (
    <section className="py-40 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-32">
          <span className="text-brass tracking-[0.6em] uppercase text-[10px] font-black block mb-6">Execution Methodology</span>
          <h2 className="text-6xl md:text-8xl text-charcoal">The 5-Step <br/><span className="italic font-light">Design Process.</span></h2>
          <div className="h-[1px] w-24 bg-brass/30 mx-auto mt-12" />
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-0">
          {/* Connecting Line - Horizontal for LG viewports */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-charcoal/5 -translate-y-1/2 hidden lg:block" />
          
          {steps.map((step, idx) => (
            <div key={step.id} className="relative group text-center px-8 mb-20 lg:mb-0">
              {/* Step Number Badge */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-charcoal/[0.03] text-9xl font-black select-none pointer-events-none group-hover:text-brass/5 transition-colors duration-1000">
                0{step.id}
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-white border border-charcoal/5 flex items-center justify-center mb-10 group-hover:border-brass group-hover:bg-brass group-hover:text-white transition-luxury shadow-lg group-hover:shadow-brass/20">
                  {step.icon}
                </div>
                
                <span className="text-[9px] uppercase tracking-[0.4em] font-black text-brass mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">{step.status}</span>
                
                <h3 className="text-2xl text-charcoal mb-6">{step.title}</h3>
                
                <p className="text-stone-500 font-light leading-relaxed text-sm max-w-xs">
                  {step.desc}
                </p>
              </div>

              {/* Mobile Connector */}
              {idx < steps.length - 1 && (
                <div className="h-20 w-px bg-charcoal/10 mx-auto mt-10 lg:hidden" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-40 text-center">
           <button className="px-16 py-8 bg-charcoal text-white uppercase tracking-[0.4em] text-[10px] font-black hover:bg-brass transition-luxury group flex items-center mx-auto space-x-6">
              <span>Initiate Discovery Phase</span>
              <div className="w-12 h-px bg-white/20 group-hover:w-20 transition-all duration-700" />
           </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
