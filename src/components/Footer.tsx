import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const regions = [
    {
      name: 'North',
      cities: ['Delhi', 'Gurgaon', 'Noida', 'Indore', 'Lucknow']
    },
    {
      name: 'South',
      cities: ['Bangalore', 'Hyderabad', 'Chennai', 'Kochi', 'Mysore']
    },
    {
      name: 'West',
      cities: ['Pune', 'Mumbai', 'Goa', 'Ahmedabad', 'Surat']
    },
    {
      name: 'East',
      cities: ['Kolkata', 'Bhubaneswar', 'Guwahati', 'Patna', 'Ranchi']
    }
  ];

  return (
    <footer className="bg-white text-charcoal pt-32 pb-16 border-t border-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 architect-grid opacity-[0.02] pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-16 mb-24">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-black mb-8 tracking-tighter flex flex-col border-l-[3px] border-brass pl-5">
              <span>KS <span className="text-brass">DESIGN</span></span>
              <span className="text-[10px] tracking-[0.7em] uppercase font-bold text-zinc-400 mt-1">STUDIO</span>
            </h3>
            <p className="text-zinc-600 text-base leading-relaxed mb-10 font-medium max-w-sm">
              The premier destination for luxury interior design across <span className="text-charcoal font-bold">Pune, Mumbai, Indore, and Goa</span>. Designing beautiful sanctuaries for elite residential patrons.
            </p>
            <div className="flex space-x-8 mb-12">
               {['Instagram', 'Facebook', 'LinkedIn'].map(social => (
                 <a key={social} href="#" className="text-[10px] uppercase tracking-[0.3em] font-black text-charcoal/50 hover:text-brass transition-colors">{social}</a>
               ))}
            </div>
            <div className="p-8 border border-charcoal/5 bg-slate-50/50 rounded-2xl">
               <span className="text-brass tracking-[0.5em] uppercase text-[9px] font-black block mb-4">Official Enquiry Host</span>
               <a href="mailto:info@ksdesignstudio.in" className="text-lg font-medium hover:text-brass transition-colors">info@ksdesignstudio.in</a>
               <p className="mt-4 text-charcoal/60 text-[11px]">+91 20 6700 0000 / +91 70203 77693</p>
            </div>
          </div>
          
          {/* Links Clusters */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-12">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-brass mb-10">Offerings</h4>
              <ul className="space-y-4 text-[11px] text-charcoal/60 uppercase tracking-widest font-bold">
                <li><Link to="/modular" className="hover:text-brass transition-colors">Modular Kitchens</Link></li>
                <li><Link to="/portfolio" className="hover:text-brass transition-colors">Our Projects</Link></li>
                <li><Link to="/luxury" className="hover:text-brass transition-colors">Luxury Interiors</Link></li>
                <li><Link to="/renovations" className="hover:text-brass transition-colors">Home Renovations</Link></li>
                <li><Link to="/commercial" className="hover:text-brass transition-colors">Commercial</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-brass mb-10">Design Ideas</h4>
              <ul className="space-y-4 text-[11px] text-charcoal/60 uppercase tracking-widest font-bold">
                <li><Link to="/design-ideas/kitchen" className="hover:text-brass transition-colors">Kitchen</Link></li>
                <li><Link to="/design-ideas/living" className="hover:text-brass transition-colors">Living Room</Link></li>
                <li><Link to="/design-ideas/bedroom" className="hover:text-brass transition-colors">Bedroom</Link></li>
                <li><Link to="/design-ideas/wardrobe" className="hover:text-brass transition-colors">Wardrobe</Link></li>
                <li><Link to="/magazine" className="hover:text-brass transition-colors">Magazine</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-brass mb-10">Partners</h4>
              <ul className="space-y-4 text-[11px] text-charcoal/60 uppercase tracking-widest font-bold">
                <li><Link to="/partners" className="hover:text-brass transition-colors">Own a Franchise</Link></li>
                <li><Link to="/partners" className="hover:text-brass transition-colors">Partner Designer</Link></li>
                <li><Link to="/refer" className="hover:text-brass transition-colors">Refer a Friend</Link></li>
                <li><Link to="/careers" className="hover:text-brass transition-colors">Careers</Link></li>
                <li><Link to="/policies" className="hover:text-brass transition-colors">Policies</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-brass mb-10">Calculators</h4>
              <ul className="space-y-4 text-[11px] text-charcoal/60 uppercase tracking-widest font-bold">
                <li><Link to="/pricing" className="hover:text-brass transition-colors">Kitchen Estimate</Link></li>
                <li><Link to="/pricing" className="hover:text-brass transition-colors">Full Home Estimate</Link></li>
                <li><Link to="/pricing" className="hover:text-brass transition-colors">Wardrobe Estimate</Link></li>
                <li><Link to="/location" className="hover:text-brass transition-colors">Store Locator</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Design Laboratory Topics */}
        <div className="pt-20 border-t border-charcoal/5 mb-24">
           <h4 className="text-[10px] uppercase tracking-[0.5em] font-black text-charcoal/30 mb-12">Laboratory Perspectives</h4>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { title: 'Thematic Research', links: ['Japandi Flow', 'Modern Maratha Heritage', 'Industrial Luxe Logic', 'Biophilic Tectonics'] },
                { title: 'The Interior Code', links: ['Material Honesty', 'Spatial Flow Metrics', 'Lighting Architecture', 'Acoustic Sculpting'] },
                { title: 'Material Intelligence', links: ['Sourced Stones', 'Timber Hub', 'Brass Joinery', 'Neural Fabrics'] },
                { title: 'Studio Records', links: ['Laboratory Insights', 'Design Monographs', 'Process Documentation', 'Patron Journals'] }
              ].map(cluster => (
                <div key={cluster.title}>
                  <span className="text-[9px] uppercase tracking-widest font-black text-brass block mb-6">{cluster.title}</span>
                  <div className="flex flex-col space-y-3">
                    {cluster.links.map(link => (
                      <Link key={link} to="/laboratory" className="text-[10px] text-charcoal/60 hover:text-charcoal transition-colors uppercase tracking-wider">{link}</Link>
                    ))}
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Pune Design Ecosystem: pSEO Hub */}
        <div className="pt-20 border-t border-charcoal/5 mb-24">
           <h4 className="text-[10px] uppercase tracking-[0.5em] font-black text-charcoal/30 mb-8">Pune Design Ecosystem</h4>
           <div className="flex flex-wrap gap-x-12 gap-y-6">
              {[
                { label: 'Interiors in Baner', link: '/interiors-in/baner' },
                { label: 'Wakad Interior Designers', link: '/interiors-in/wakad' },
                { label: 'Furniture Hinjewadi', link: '/interiors-in/hinjewadi' },
                { label: 'Luxury Aundh', link: '/interiors-in/aundh' },
                { label: 'Modular Kitchen Pune', link: '/modular' },
                { label: 'Renovation Specialists', link: '/renovations' },
                { label: 'Office Interior Pune', link: '/services' },
                { label: 'Bungalow Architects', link: '/ateliers' },
                { label: 'Koregaon Park Luxury', link: '/interiors-in/koregaon-park' },
                { label: 'Kothrud Design Hub', link: '/interiors-in/kothrud' },
                { label: 'Viman Nagar Interiors', link: '/interiors-in/viman-nagar' },
                { label: 'Kharadi IT Scapes', link: '/interiors-in/kharadi' },
                { label: 'Magarpatta Home Design', link: '/interiors-in/magarpatta' }
              ].map(item => (
                <Link key={item.label} to={item.link} className="text-[9px] uppercase tracking-widest font-bold text-zinc-400 hover:text-brass transition-colors">
                  {item.label}
                </Link>
              ))}
           </div>
        </div>

        {/* Global Bottom Bar */}
        <div className="pt-12 border-t border-charcoal/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-bold">
              © {new Date().getFullYear()} KS DESIGN STUDIO GLOBAL
            </p>
            <div className="flex space-x-10 text-charcoal/60 text-[9px] uppercase tracking-[0.3em] font-black">
              <a href="#" className="hover:text-brass transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brass transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-brass transition-colors">Sitemap</a>
            </div>
          </div>
          <p className="text-[9px] uppercase tracking-[0.6em] font-black text-brass/30">DECCAN_TECTONICS_V_5.2</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;