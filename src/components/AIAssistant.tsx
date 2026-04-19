import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2, Sparkles, ExternalLink, MapPin, Globe, ArrowRight, Image as ImageIcon, Paperclip, Camera } from 'lucide-react';
import { getDesignAdviceWithGrounding } from '../services/gemini.ts';

interface GroundingLink {
  title: string;
  uri: string;
  type: 'web' | 'maps';
}

interface Message {
  role: 'user' | 'ai';
  text: string;
  image?: string;
  links?: GroundingLink[];
}

const QUICK_PROMPTS = [
  "Analyze my spatial layout",
  "Tectonic trends 2025",
  "Pune's elite marble hubs",
  "Minimalist material palette"
];

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Welcome to the KS Private Atelier Concierge. I am calibrated in the KS Design Code—grounded in Pune's architectural intelligence and our global material taxonomy. How shall we refine your spatial vision today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | undefined>();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.log("Location access denied", err)
      );
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e?: React.FormEvent, customInput?: string) => {
    if (e) e.preventDefault();
    const query = customInput || input;
    const currentImage = selectedImage;
    
    if (!query.trim() && !currentImage) return;

    const userMessage = query.trim() || (currentImage ? "Analyze this design reference for structural integrity and aesthetic balance." : "");
    
    setInput('');
    setSelectedImage(null);
    setMessages(prev => [...prev, { 
      role: 'user', 
      text: userMessage,
      image: currentImage || undefined
    }]);
    setIsLoading(true);

    try {
      const base64Data = currentImage ? currentImage.split(',')[1] : undefined;
      const result = await getDesignAdviceWithGrounding(userMessage, userLocation, base64Data);
      
      const links: GroundingLink[] = (result.groundingChunks || []).map((chunk: any) => {
        if (chunk.web) return { title: chunk.web.title, uri: chunk.web.uri, type: 'web' };
        if (chunk.maps) return { title: chunk.maps.title, uri: chunk.maps.uri, type: 'maps' };
        return null;
      }).filter(Boolean) as GroundingLink[];

      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: result.text || "Recalibrating vision. Please try again.",
        links: links.length > 0 ? links : undefined
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Connection interrupted. Our studio protocol requires a brief refresh." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[110] font-sans">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-700 group border border-white/40 glass-premium text-[#1A1A1A] hover:scale-110 relative z-[210]`}
        aria-label="Atelier Concierge"
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />}
      </button>

      {/* Immersive Sidebar Overlay */}
      <div className={`fixed inset-0 z-[200] transition-all duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Click-to-close Backdrop */}
        <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-md" onClick={() => setIsOpen(false)} />
        
        <div className={`absolute top-0 right-0 w-full md:w-[600px] h-full bg-white shadow-[-40px_0_80px_rgba(0,0,0,0.1)] transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Header */}
          <div className="p-10 border-b border-zinc-100 flex items-center justify-between bg-white relative">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-[#1A1A1A] rounded-2xl flex items-center justify-center shadow-xl">
                <Bot size={28} className="text-brass" />
              </div>
              <div>
                <h3 className="text-3xl font-black tracking-tighter text-[#1A1A1A]">Atelier <span className="italic font-light text-brass">Consultant</span></h3>
                <div className="flex items-center space-x-2 mt-1">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                   <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-400 font-bold">Neural Intelligence Hub v4.0</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-4 hover:bg-zinc-50 rounded-full transition-all text-zinc-400">
               <X size={24} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-12 space-y-12 bg-zinc-50/20">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-fade-in`}>
                <div 
                  className={`max-w-[85%] p-8 rounded-[2rem] text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[#1A1A1A] text-white rounded-tr-none shadow-2xl' 
                      : 'bg-white text-[#1A1A1A] rounded-tl-none border border-zinc-100 shadow-xl'
                  }`}
                >
                  {msg.image && (
                    <img src={msg.image} alt="Spatial Reference" className="w-full rounded-2xl mb-5 border border-white/10" />
                  )}
                  <div className="whitespace-pre-wrap font-light">{msg.text}</div>
                  
                  {msg.links && msg.links.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-stone-100 space-y-3">
                      <p className="text-[9px] uppercase tracking-[0.4em] font-black text-stone-300">Grounded Resources</p>
                      {msg.links.map((link, lIdx) => (
                        <a 
                          key={lIdx} 
                          href={link.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-between group/link bg-stone-50 p-4 rounded-2xl hover:bg-brass transition-all"
                        >
                          <div className="flex items-center space-x-4 text-xs">
                            {link.type === 'maps' ? <MapPin size={14} className="text-brass group-hover/link:text-white" /> : <Globe size={14} className="text-brass group-hover/link:text-white" />}
                            <span className="truncate max-w-[190px] font-bold group-hover/link:text-white transition-colors">{link.title || 'View Resource'}</span>
                          </div>
                          <ArrowRight size={14} className="text-stone-300 group-hover/link:text-white transition-all -translate-x-2 opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {messages.length === 1 && (
              <div className="space-y-4 pt-4">
                <p className="text-[9px] uppercase tracking-[0.4em] font-black text-stone-300 pl-1">Atelier Inquiries</p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_PROMPTS.map(p => (
                    <button 
                      key={p}
                      onClick={() => handleSubmit(undefined, p)}
                      className="px-5 py-3 bg-white border border-stone-100 rounded-full text-[10px] font-black uppercase tracking-widest text-charcoal hover:border-brass hover:text-brass transition-all shadow-sm"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-6 rounded-3xl rounded-tl-none border border-stone-100 flex items-center space-x-4">
                  <Loader2 className="animate-spin text-brass" size={20} />
                  <span className="text-[9px] text-stone-400 uppercase tracking-[0.4em] font-black">Synthesizing Spatial Logic...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-10 bg-white border-t border-zinc-100">
            {selectedImage && (
              <div className="mb-6 relative inline-block group">
                <img src={selectedImage} alt="Reference" className="h-28 w-28 object-cover rounded-2xl border-4 border-white shadow-2xl relative z-10" />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2 shadow-xl hover:scale-110 transition-all z-20"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex items-center space-x-4">
              <div className="flex-grow bg-zinc-100 rounded-full flex items-center px-8 border-2 border-transparent focus-within:border-brass/30 focus-within:bg-white transition-all duration-700">
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-4 text-zinc-400 hover:text-brass transition-all"
                >
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about materials, cost, or style..."
                  className="flex-grow bg-transparent p-6 text-sm outline-none placeholder:text-zinc-400 font-medium"
                />
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageSelect} 
                />
              </div>
              <button 
                disabled={isLoading || (!input.trim() && !selectedImage)}
                className="w-16 h-16 bg-[#1A1A1A] text-white rounded-full flex items-center justify-center hover:bg-brass transition-all disabled:opacity-20 shadow-2xl"
                aria-label="Submit Inquiry"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;