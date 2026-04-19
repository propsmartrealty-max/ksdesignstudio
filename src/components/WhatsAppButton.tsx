import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "917020377693";
  const message = encodeURIComponent("Hello KS Design Studio! I'm interested in your interior design services.");
  
  return (
    <a 
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-24 right-8 z-[55] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center group"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle size={24} />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 whitespace-nowrap text-xs font-bold uppercase tracking-widest">
        WhatsApp Us
      </span>
    </a>
  );
};

export default WhatsAppButton;