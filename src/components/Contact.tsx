import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';

const Contact: React.FC = () => {
  const contactPhone = "917020377693";
  const displayPhone = "+91 70203 77693";
  const contactEmail = "info@ksdesignstudio.in";
  const studioAddress = "623, Vision One Mall, Bhumkar Chowk, Wakad-411057, Pune";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Residential Interior',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const formattedMessage = `*NEW DESIGN ENQUIRY* %0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Project:* ${formData.projectType}%0A*Message:* ${formData.message}`;
    
    // Construct WhatsApp Link
    const whatsappUrl = `https://wa.me/${contactPhone}?text=${formattedMessage}`;
    
    // Construct Email Link
    const emailSubject = `Design Enquiry: ${formData.projectType} - ${formData.name}`;
    const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\n\nMessage:\n${formData.message}`;
    const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Execute Dual Dispatch
    setTimeout(() => {
      // 1. Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      
      // 2. Trigger Email Client (slight delay to prevent browser block)
      window.location.href = mailtoUrl;
      
      // 3. Save to Sovereign Vault (localStorage)
      const newLead = { 
        ...formData, 
        id: Date.now(), 
        timestamp: new Date().toLocaleString(),
        status: 'Unread'
      };
      const existingLeads = JSON.parse(localStorage.getItem('ks_leads') || '[]');
      localStorage.setItem('ks_leads', JSON.stringify([newLead, ...existingLeads]));
      
      setStatus('success');
      setFormData({ name: '', email: '', projectType: 'Residential Interior', message: '' });
      
      // Reset status after a few seconds
      setTimeout(() => setStatus('idle'), 5000);
    }, 1200);
  };

  return (
    <section className="py-32 px-6 lg:px-12 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] -z-10" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brass/0 via-brass/40 to-brass/0" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10">
        <div>
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-brass tracking-[0.6em] uppercase text-[10px] font-black block">Contact Us</span>
            <div className="h-[1px] w-12 bg-brass/30" />
          </div>
          
          <h2 className="text-5xl md:text-8x text-[#1A1A1A] mb-10 tracking-tighter leading-[0.9] font-black">
            Request a Private <br /><span className="italic font-light text-zinc-400 font-medium">Consultation.</span>
          </h2>
          
          <p className="text-zinc-600 mb-16 text-xl font-medium leading-relaxed max-w-lg">
            We operate on a professional design mandate for premium residential projects. Share your project intent below to initiate our <span className="text-[#1A1A1A] font-bold">Privacy-First</span> design protocol.
          </p>

          <div className="space-y-10">
            <a href={`tel:+${contactPhone}`} className="flex items-center space-x-8 group transition-all">
              <div className="w-14 h-14 rounded-2xl border border-stone-100 flex items-center justify-center group-hover:bg-brass group-hover:border-brass group-hover:text-white transition-all shadow-sm">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-400 font-bold mb-1">Direct Line</p>
                <p className="text-charcoal text-xl font-bold group-hover:text-brass transition-colors">{displayPhone}</p>
              </div>
            </a>

            <a href={`mailto:${contactEmail}`} className="flex items-center space-x-8 group transition-all">
              <div className="w-14 h-14 rounded-2xl border border-stone-200 flex items-center justify-center group-hover:bg-brass group-hover:border-brass group-hover:text-white transition-all shadow-sm">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-400 font-bold mb-1">Official Email</p>
                <p className="text-charcoal text-xl font-bold group-hover:text-brass transition-colors">{contactEmail}</p>
              </div>
            </a>

            <div className="flex items-center space-x-8 group">
              <div className="w-14 h-14 rounded-2xl border border-slate-200 flex items-center justify-center group-hover:bg-brass group-hover:border-brass group-hover:text-white transition-all shadow-sm">
                <CheckCircle2 size={20} className="text-brass group-hover:text-white" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-400 font-bold mb-1">Privacy Protocol</p>
                <p className="text-charcoal text-xl font-bold leading-tight max-w-[280px]">Your spatial data is stored in our Sovereign Vault.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-premium p-12 lg:p-20 rounded-[4rem] border-white/60 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-[3s]">
            <Send size={120} className="text-brass" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-500">Your Full Name</label>
                  <input 
                    required
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/50 backdrop-blur-md border border-white/40 rounded-2xl p-5 text-sm focus:ring-2 focus:ring-brass/20 focus:border-brass outline-none transition-all placeholder:text-zinc-400 text-zinc-900 font-medium" 
                    placeholder="Enter your name" 
                  />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-500">Email Address</label>
                  <input 
                    required
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/50 backdrop-blur-md border border-white/40 rounded-2xl p-5 text-sm focus:ring-2 focus:ring-brass/20 focus:border-brass outline-none transition-all placeholder:text-zinc-400 text-zinc-900 font-medium" 
                    placeholder="Enter your email" 
                  />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-500">Project Type</label>
                <select 
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full bg-white/50 backdrop-blur-md border border-white/40 rounded-2xl p-5 text-sm focus:ring-2 focus:ring-brass/20 focus:border-brass outline-none appearance-none cursor-pointer transition-all text-zinc-900 font-medium"
                >
                <option>2BHK Apartment Interior</option>
                <option>3BHK Apartment Interior</option>
                <option>4BHK Apartment Interior</option>
                <option>Luxury Bungalow Interior</option>
                <option>Home Renovation</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-500">Project Requirements</label>
                <textarea 
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5} 
                  className="w-full bg-white/50 backdrop-blur-md border border-white/40 rounded-3xl p-6 text-sm focus:ring-2 focus:ring-brass/20 focus:border-brass outline-none transition-all resize-none placeholder:text-zinc-400 text-zinc-900 font-medium" 
                  placeholder="Tell us about your home design requirements..."
                ></textarea>
            </div>

            <button 
              disabled={status !== 'idle'}
              className={`w-full py-8 rounded-2xl text-[11px] uppercase tracking-[0.5em] font-black transition-all duration-700 flex items-center justify-center space-x-4 shadow-xl ${
                status === 'success' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-[#1A1A1A] text-white hover:bg-brass'
              } disabled:opacity-50 text-white font-bold opacity-100`}
            >
              {status === 'idle' && (
                <>
                  <Send size={16} />
                  <span>Send Enquiry</span>
                </>
              )}
              {status === 'submitting' && (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Sending Message...</span>
                </>
              )}
              {status === 'success' && (
                <>
                  <CheckCircle2 size={16} />
                  <span>Enquiry Sent Successfully</span>
                </>
              )}
            </button>
            
            <p className="text-center text-[8px] uppercase tracking-[0.3em] font-black text-zinc-500">
              *Enquiry will be sent to our WhatsApp & Email
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;