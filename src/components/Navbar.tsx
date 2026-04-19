import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Mail, MapPin, Search, FolderHeart } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Design Ideas', href: '/design-ideas' },
    { name: 'Our Projects', href: '/portfolio' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Laboratory', href: '/laboratory' },
    { name: 'Tectonic Series', href: '/tectonic-series' },
    { name: 'Sovereign Vault', href: '/vault' },
  ];

  const utilityLinks = [
    { name: 'Cities', href: '/cities' },
    { name: 'Partner with Us', href: '/partners' },
    { name: 'Refer & Earn', href: '/refer' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed w-full z-[150] transition-all duration-700 pointer-events-none">
      {/* Layer 1: Top Utility Bar (Hides on scroll for focus) */}
      <div className={`hidden md:block w-full border-b transition-all duration-700 ${
        scrolled ? 'h-0 opacity-0 overflow-hidden border-transparent' : 'h-10 opacity-100 border-white/10 bg-white/5'
      }`}>
        <div className="max-w-[1440px] mx-auto h-full flex justify-between items-center px-6 lg:px-12 pointer-events-auto">
          <div className="flex items-center space-x-8">
            {utilityLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className="text-[9px] uppercase tracking-[0.3em] font-black text-white/80 hover:text-brass transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-6">
             <a href="tel:+912067000000" className="text-[9px] uppercase tracking-[0.3em] font-black text-white/90 hover:text-white transition-colors">Enquiry: +91 20 6700 0000</a>
             <div className="h-2 w-[1px] bg-white/10" />
             <div className="flex space-x-4">
               <Instagram size={12} className="text-white/20 hover:text-white transition-colors cursor-pointer" />
               <Mail size={12} className="text-white/20 hover:text-white transition-colors cursor-pointer" />
             </div>
          </div>
        </div>
      </div>

      {/* Layer 2: Primary Branding & Action Bar */}
      <div className={`w-full py-6 lg:py-8 transition-all duration-700 ${scrolled ? 'pt-4' : ''}`}>
        <div className="max-w-[1440px] mx-auto flex justify-between items-center px-6 lg:px-12 pointer-events-auto">
          {/* Brand Identity */}
          <Link to="/" className="flex items-center group relative whitespace-nowrap shrink-0">
            <div className={`flex flex-col border-l-[3px] border-brass pl-5 transition-all duration-500 group-hover:pl-7 ${scrolled ? 'drop-shadow-sm' : 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]'}`}>
              <span className={`text-3xl font-black tracking-tighter leading-none transition-all duration-700 ${scrolled ? 'text-[#1A1A1A]' : 'text-white'}`}>
                KS <span className="text-brass drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">DESIGN</span>
              </span>
              <div className="flex items-center space-x-2 mt-1.5">
                <span className={`text-[10px] tracking-[0.9em] uppercase font-bold transition-all duration-700 ${scrolled ? 'text-zinc-500' : 'text-zinc-200'}`}>
                  STUDIO
                </span>
                <span className="w-1.5 h-1.5 bg-brass rounded-full animate-pulse shadow-[0_0_10px_#D4AF37]" />
              </div>
            </div>
          </Link>

          {/* Floating Pill Navigation */}
          <div className={`hidden lg:flex items-center transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] xl:px-8 lg:px-5 py-4 rounded-full border transition-luxury ${
            scrolled 
              ? 'bg-white/70 backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-white/50' 
              : 'bg-white/10 border-white/20 backdrop-blur-xl shadow-lg'
          }`}>
            <div className="flex items-center xl:space-x-8 lg:space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-[13px] uppercase xl:tracking-[0.15em] lg:tracking-[0.05em] font-black transition-all duration-500 relative group/link py-1 whitespace-nowrap ${
                    isActive(link.href) 
                      ? 'text-brass drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] font-black' 
                      : (scrolled ? 'text-brass/90 hover:text-[#1A1A1A]' : 'text-brass hover:text-white')
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brass transition-all duration-500 group-hover/link:w-2 ${isActive(link.href) ? 'w-2' : ''}`} />
                </Link>
              ))}
            </div>

            <div className={`flex items-center xl:ml-8 lg:ml-4 xl:pl-8 lg:pl-4 border-l transition-colors duration-700 h-6 ${
              scrolled ? 'border-zinc-900/10' : 'border-white/20'
            }`}>
              <Link 
                to="/contact" 
                className={`text-[13px] uppercase tracking-[0.15em] font-black transition-all duration-500 xl:px-8 lg:px-5 py-3 rounded-full whitespace-nowrap shadow-xl ${
                  scrolled ? 'bg-[#1A1A1A] text-white hover:bg-brass' : 'bg-brass text-white hover:bg-white hover:text-[#1A1A1A]'
                }`}
              >
                Book Session
              </Link>

              {/* Vault Trigger */}
              <Link
                to="/vault"
                className={`ml-6 p-3 rounded-full transition-all duration-500 flex items-center space-x-3 group ${
                  scrolled ? 'text-zinc-400 hover:text-brass' : 'text-white/40 hover:text-white'
                }`}
              >
                <FolderHeart size={18} className="group-hover:scale-110 transition-transform" />
              </Link>

              {/* Search Trigger */}
              <button 
                onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
                className={`ml-6 p-3 rounded-full transition-all duration-500 flex items-center space-x-3 group ${
                  scrolled ? 'text-zinc-400 hover:text-[#1A1A1A]' : 'text-white/40 hover:text-white'
                }`}
              >
                <Search size={18} className="group-hover:scale-110 transition-transform" />
                <span className="hidden xl:block text-[9px] font-black uppercase tracking-widest bg-white/10 px-2 py-1 rounded">⌘K</span>
              </button>
            </div>
          </div>

          {/* Mobile Toggle Button */}
          <button 
            className={`lg:hidden p-3 rounded-2xl transition-all duration-500 border ${
              scrolled ? 'bg-charcoal text-white border-charcoal shadow-lg' : 'bg-white/10 text-white border-white/20 backdrop-blur-md'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-charcoal z-[200] flex flex-col justify-center items-center transition-all duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] lg:hidden ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 architect-grid opacity-5 pointer-events-none" />
        <button 
          className="absolute top-8 right-8 text-white/20 p-4 hover:text-brass transition-all duration-500" 
          onClick={() => setIsOpen(false)}
        >
          <X size={32} strokeWidth={1} />
        </button>
        
        <div className="space-y-10 text-center relative z-10 w-full px-8 overflow-y-auto max-h-[80vh]">
          <span className="text-brass tracking-[1em] uppercase text-[9px] font-black block mb-6 opacity-60">Premium Interiors</span>
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={`block text-3xl  transition-all duration-700 hover:tracking-[0.1em] ${
                isActive(link.href) ? 'text-brass italic' : 'text-white hover:text-brass'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-8 grid grid-cols-2 gap-4">
             {utilityLinks.map((link) => (
               <Link key={link.name} to={link.href} className="text-[10px] text-white/80 uppercase tracking-widest hover:text-brass">{link.name}</Link>
             ))}
          </div>
          
          <div className="pt-10 flex flex-col items-center space-y-6">
             <Link to="/contact" className="w-full bg-brass text-white py-6 rounded-xl uppercase tracking-[0.3em] font-black text-xs">Book Free Session</Link>
             <div className="flex space-x-10">
               <Instagram size={24} className="text-white/20 hover:text-brass transition-all" />
               <Mail size={24} className="text-white/20 hover:text-brass transition-all" />
             </div>
             <p className="text-white/40 text-[8px] uppercase tracking-[0.4em] font-black">KS DESIGN STUDIO PUNE</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;