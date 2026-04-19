import React from 'react';
import AboutComp from '../components/About';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 bg-white min-h-screen">
      <div className="bg-white py-32 px-6 text-center text-charcoal relative overflow-hidden border-b border-slate-50">
        <div className="absolute inset-0 architect-grid opacity-5"></div>
        <div className="relative z-10">
          <h1 className="text-6xl md:text-8xl mb-6 leading-none">Our <span className="italic font-light text-slate-100">Legacy.</span></h1>
          <p className="text-brass tracking-[0.6em] uppercase text-[10px] font-black">Transforming Pune's Landscapes since 2016</p>
        </div>
      </div>
      <AboutComp />
    </div>
  );
};

export default AboutPage;