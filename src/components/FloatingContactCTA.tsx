import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Phone, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingContactCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end space-y-6">
      {/* Expanded Menu */}
      {isOpen && (
        <div className="flex flex-col space-y-4 mb-4 animate-in fade-in slide-in-from-bottom-5">
          <Link 
            to="/pricing"
            className="bg-white text-charcoal px-6 py-4 rounded-full shadow-2xl flex items-center space-x-4 border border-stone-100 hover:border-brass transition-all group"
          >
            <span className="text-[10px] uppercase font-black tracking-widest">Get Tectonic Quote</span>
            <div className="w-8 h-8 rounded-full bg-brass/10 flex items-center justify-center text-brass group-hover:bg-brass group-hover:text-white transition-colors">
              <MessageSquare size={16} />
            </div>
          </Link>
          <a 
            href="tel:+917020377693"
            className="bg-white text-charcoal px-6 py-4 rounded-full shadow-2xl flex items-center space-x-4 border border-stone-100 hover:border-brass transition-all group"
          >
            <span className="text-[10px] uppercase font-black tracking-widest">Architect Callback</span>
            <div className="w-8 h-8 rounded-full bg-brass/10 flex items-center justify-center text-brass group-hover:bg-brass group-hover:text-white transition-colors">
              <Phone size={16} />
            </div>
          </a>
        </div>
      )}

      {/* Main Trigger Buttons */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={scrollToTop}
          className="bg-white/90 backdrop-blur-md text-charcoal w-14 h-14 rounded-full shadow-xl flex items-center justify-center border border-white/20 hover:bg-brass hover:text-white transition-all transform hover:scale-110"
        >
          <ArrowUp size={20} />
        </button>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-20 h-20 rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-105 relative overflow-hidden group ${
            isOpen ? 'bg-charcoal text-white rotate-90' : 'bg-brass text-white'
          }`}
        >
          {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
          
          {!isOpen && (
            <div className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none" />
          )}
          
          {/* Badge */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-4 border-sand flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            </div>
          )}
        </button>
      </div>

      <div className="bg-charcoal/80 backdrop-blur-md text-white px-6 py-3 rounded-full text-[9px] uppercase tracking-[0.3em] font-black border border-white/10 hidden lg:block opacity-0 translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
         Inquiry Protocol_Active
      </div>
    </div>
  );
};

export default FloatingContactCTA;
