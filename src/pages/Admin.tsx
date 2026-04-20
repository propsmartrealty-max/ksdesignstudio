import React, { useState, useEffect } from 'react';
import { Database, Lock, Eye, Trash2, CheckCircle, Clock, Search, LogOut } from 'lucide-react';
import { safeStorageGet, safeStorageSet } from '../utils/storage';

interface Lead {
  id: number;
  name: string;
  email: string;
  projectType: string;
  message: string;
  timestamp: string;
  status: string;
}

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Default passkey for initial setup
  const SECRET_PASSKEY = "KS_PREMIUM_2025";

  useEffect(() => {
    if (isAuthenticated) {
      setLeads(safeStorageGet<Lead[]>('ks_leads', []));
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkey === SECRET_PASSKEY) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid Protocol Access Key");
    }
  };

  const deleteLead = (id: number) => {
    if (window.confirm("Permanently purge this lead from the Sovereign Vault?")) {
      const updatedLeads = leads.filter(l => l.id !== id);
      setLeads(updatedLeads);
      safeStorageSet('ks_leads', updatedLeads);
    }
  };

  const toggleStatus = (id: number) => {
    const updatedLeads = leads.map(l => 
      l.id === id ? { ...l, status: l.status === 'Resolved' ? 'Unread' : 'Resolved' } : l
    );
    setLeads(updatedLeads);
    safeStorageSet('ks_leads', updatedLeads);
  };

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.projectType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-charcoal text-white flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 architect-grid opacity-5 pointer-events-none" />
        <div className="max-w-md w-full text-center space-y-10 relative z-10">
          <div className="space-y-4">
             <div className="w-20 h-20 bg-brass/10 border border-brass/20 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse">
                <Lock className="text-brass" size={32} />
             </div>
             <h1 className="text-4xl ">Sovereign Vault</h1>
             <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-black">Restricted Access // KS_STUDIO_PROTOCOL</p>
          </div>
          
          <form onSubmit={handleLogin} className="bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl">
            <div className="space-y-6">
               <input 
                type="password" 
                placeholder="Enter Access Token" 
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className="w-full bg-charcoal/50 p-5 rounded-2xl outline-none border border-white/10 focus:border-brass text-center text-sm font-mono tracking-widest transition-all"
              />
              <button type="submit" className="w-full py-5 bg-brass text-white font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl hover:bg-white hover:text-charcoal transition-all shadow-xl">
                Initiate Retrieval
              </button>
            </div>
          </form>
          <p className="text-[8px] uppercase tracking-[0.2em] font-black text-white/20">Authorized Terminal Access Only</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
           <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-charcoal text-white rounded-2xl flex items-center justify-center shadow-xl">
                 <Database size={28} />
              </div>
              <div>
                 <h1 className="text-4xl  text-charcoal leading-none">Lead Monograph</h1>
                 <p className="text-charcoal/40 text-[9px] uppercase tracking-[0.4em] font-black mt-2">Active Intelligence Vault</p>
              </div>
           </div>
           
           <div className="flex items-center space-x-6 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={16} />
                 <input 
                   type="text" 
                   placeholder="Search Leads..." 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="pl-12 pr-6 py-4 bg-white border border-stone-100 rounded-full text-xs outline-none focus:ring-2 focus:ring-brass/20 focus:border-brass w-full md:w-64"
                 />
              </div>
              <button 
                onClick={() => setIsAuthenticated(false)}
                className="p-4 bg-white border border-stone-100 rounded-full text-charcoal/40 hover:text-red-500 hover:border-red-100 transition-all shadow-sm"
                title="Logout"
              >
                 <LogOut size={20} />
              </button>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
           {filteredLeads.length > 0 ? (
             filteredLeads.map((lead) => (
               <div key={lead.id} className="bg-white border border-stone-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group">
                  <div className="flex flex-col lg:flex-row justify-between gap-8">
                     <div className="flex-grow space-y-4">
                        <div className="flex items-center space-x-4">
                           <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${lead.status === 'Resolved' ? 'bg-sage/10 text-sage' : 'bg-brass/10 text-brass'}`}>
                              {lead.status}
                           </span>
                           <span className="flex items-center text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                              <Clock size={12} className="mr-2" /> {lead.timestamp}
                           </span>
                        </div>
                        <h3 className="text-2xl  text-charcoal">{lead.name}</h3>
                        <p className="text-charcoal/40 text-sm font-medium">{lead.email} | <span className="text-brass italic">{lead.projectType}</span></p>
                        <div className="bg-white/30 p-6 rounded-2xl text-stone-600 text-sm leading-relaxed border-l-2 border-stone-100 italic">
                           "{lead.message}"
                        </div>
                     </div>
                     <div className="flex lg:flex-col justify-end gap-3 shrink-0">
                        <button 
                          onClick={() => toggleStatus(lead.id)}
                          className={`p-4 rounded-2xl border transition-all flex items-center space-x-3 ${lead.status === 'Resolved' ? 'bg-stone-50 border-stone-100 text-stone-400' : 'bg-sage/10 border-sage/20 text-sage hover:bg-sage hover:text-white'}`}
                        >
                           <CheckCircle size={20} />
                           <span className="text-[10px] uppercase font-black tracking-widest lg:hidden">Status</span>
                        </button>
                        <button 
                          onClick={() => deleteLead(lead.id)}
                          className="p-4 bg-red-50 border border-red-100 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all flex items-center space-x-3"
                        >
                           <Trash2 size={20} />
                           <span className="text-[10px] uppercase font-black tracking-widest lg:hidden">Purge</span>
                        </button>
                     </div>
                  </div>
               </div>
             ))
           ) : (
             <div className="py-40 text-center space-y-6 bg-white/50 rounded-[3rem] border border-stone-100 border-dashed">
                <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto opacity-40">
                   <Eye size={32} />
                </div>
                <p className="text-charcoal/30 text-[10px] uppercase tracking-[0.4em] font-black">No active enquiries in the vault</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
