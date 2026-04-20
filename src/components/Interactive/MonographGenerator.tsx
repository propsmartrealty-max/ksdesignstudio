import React, { useState } from 'react';
import { generateMonograph } from '../../services/gemini';
import { FileText, Lock, Send, Download, Phone, MapPin, Ruler, Home } from 'lucide-react';
import { safeStorageGet, safeStorageSet } from '../../utils/storage';

const MonographGenerator: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [monograph, setMonograph] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: '',
    type: '3BHK Apartment',
    style: 'Modern Minimalist',
    location: 'Baner'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLeadCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Dispatch Dual Lead to Sovereign Pipeline
    const message = `*NEW MONOGRAPH REQUEST*%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Area:* ${formData.area} sqft%0A*Type:* ${formData.type}%0A*Location:* ${formData.location}%0A*Style:* ${formData.style}`;
    const whatsappUrl = `https://wa.me/917020377693?text=${message}`;
    
    // Open in background/new tab
    window.open(whatsappUrl, '_blank');

    // 2. Local Storage Vault Lead
    const leads = safeStorageGet<any[]>('ks_leads', []);
    leads.push({ ...formData, date: new Date().toISOString(), source: 'Monograph Generator' });
    safeStorageSet('ks_leads', leads);

    // 3. Generate Monograph
    try {
      const result = await generateMonograph(formData);
      setMonograph(result);
      setStep(3);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatMarkdown = (text: string) => {
    return text
      .replace(/## (.*?)\n/g, '<h2 class="text-2xl font-black text-[#1A1A1A] mt-8 mb-4 tracking-tight">$1</h2>')
      .replace(/# (.*?)\n/g, '<h1 class="text-3xl font-black text-brass mb-6 pb-4 border-b border-stone-100">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-brass font-black">$1</strong>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="bg-white border border-stone-100 rounded-[3rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <FileText size={160} className="text-zinc-900" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center">
              <span className="text-[10px] text-brass uppercase tracking-[0.4em] font-black block mb-4">Tectonic AI Engine</span>
              <h3 className="text-4xl text-[#1A1A1A] font-black mb-4">Generate Your Monograph.</h3>
              <p className="text-zinc-500 font-medium leading-relaxed">
                Input your spatial parameters, and our AI Architect will synthesize a highly personalized, 4-page design proposal for your exact square footage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-zinc-400 tracking-widest flex items-center gap-2"><Ruler size={12}/> Square Footage</label>
                <input required type="number" name="area" value={formData.area} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium focus:ring-2 focus:ring-brass/20 focus:border-brass outline-none" placeholder="e.g. 1500" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-zinc-400 tracking-widest flex items-center gap-2"><Home size={12}/> Property Type</label>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium focus:ring-2 focus:ring-brass/20 focus:border-brass outline-none">
                  <option>2BHK Apartment</option>
                  <option>3BHK Apartment</option>
                  <option>4BHK+ Penthouse</option>
                  <option>Luxury Bungalow</option>
                  <option>Commercial Office</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-zinc-400 tracking-widest flex items-center gap-2"><MapPin size={12}/> Location (Pune region)</label>
                <input required type="text" name="location" value={formData.location} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium focus:ring-2 focus:ring-brass/20 focus:border-brass outline-none" placeholder="e.g. Baner, Kharadi" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-zinc-400 tracking-widest flex items-center gap-2">Style DNA</label>
                <select name="style" value={formData.style} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium focus:ring-2 focus:ring-brass/20 focus:border-brass outline-none">
                  <option>Modern Minimalist</option>
                  <option>Japandi Flow</option>
                  <option>Industrial Luxe</option>
                  <option>Classic Opulence</option>
                  <option>Biophilic Architecture</option>
                </select>
              </div>
            </div>

            <button onClick={() => setStep(2)} disabled={!formData.area || !formData.location} className="w-full py-6 mt-8 rounded-2xl bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.4em] font-black hover:bg-brass transition-all flex justify-center items-center gap-3 disabled:opacity-50">
              Proceed to Synthesis <Send size={14} />
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleLeadCapture} className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-brass/10 rounded-full flex items-center justify-center mb-6">
                 <Lock className="text-brass" size={24} />
              </div>
              <h3 className="text-3xl text-[#1A1A1A] font-black mb-4">Secure Your Monograph</h3>
              <p className="text-zinc-500 font-medium leading-relaxed">
                Provide your WhatsApp number to unlock and immediately download your AI-generated spatial proposal for your {formData.type} in {formData.location}.
              </p>
            </div>

            <div className="space-y-6 pt-6 max-w-md mx-auto">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-zinc-400 tracking-widest flex items-center gap-2">Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium focus:ring-2 focus:ring-brass/20 focus:border-brass outline-none" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-zinc-400 tracking-widest flex items-center gap-2"><Phone size={12}/> WhatsApp Number</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium focus:ring-2 focus:ring-brass/20 focus:border-brass outline-none" placeholder="+91 XXXXX XXXXX" />
              </div>

              <button type="submit" disabled={loading} className="w-full py-6 rounded-2xl bg-brass text-white text-[10px] uppercase tracking-[0.4em] font-black hover:bg-[#1A1A1A] transition-all flex justify-center items-center gap-3 shadow-2xl disabled:opacity-70">
                {loading ? 'Synthesizing...' : 'Unlock Proposal'}
              </button>
            </div>
          </form>
        )}

        {step === 3 && monograph && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
             <div className="flex justify-between items-center mb-8 border-b border-stone-100 pb-6">
                <div>
                   <span className="text-[10px] uppercase tracking-[0.4em] font-black text-emerald-600 block mb-2">Synthesis Complete</span>
                   <p className="text-sm font-bold text-zinc-500 line-clamp-1 truncate">KS_MONOGRAPH_{formData.location.toUpperCase()}_{new Date().getFullYear()}</p>
                </div>
                <button className="h-12 w-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-brass hover:text-white hover:border-brass transition-all text-zinc-400">
                   <Download size={16} />
                </button>
             </div>
             
             <div 
               className="prose prose-sm md:prose-base max-w-none text-zinc-600 font-medium leading-relaxed"
               dangerouslySetInnerHTML={{ __html: formatMarkdown(monograph) }}
             />
             
             <div className="mt-16 p-8 bg-slate-50 rounded-2xl border border-charcoal/5 flex justify-between items-center">
                <div>
                   <p className="text-charcoal font-black text-lg mb-1">Architectural Consultation Request Sent</p>
                   <p className="text-xs text-zinc-500 font-medium">Our Principal Architect has received your brief on WhatsApp.</p>
                </div>
                <button onClick={() => window.location.reload()} className="px-6 py-3 border border-charcoal text-charcoal text-[9px] uppercase tracking-widest font-black rounded-full hover:bg-charcoal hover:text-white transition-colors">Start Over</button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonographGenerator;
