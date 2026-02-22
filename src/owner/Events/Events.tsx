import  { useState } from 'react';
import { 
  Plus, Search, Filter,  Users, Zap, X, 
  ArrowUpRight,  Navigation, Mail,  
  Download,  Globe, CalendarDays
} from 'lucide-react';

// --- SUB-COMPONENT: PARTICIPANT DRAWER ---
const ParticipantDrawer = ({ event, onClose }: { event: any, onClose: () => void }) => {
  const participants = [
    { id: 1, name: "Aime Ndoli", email: "aime@example.com", phone: "+250 788 123 456", status: "Checked-in", joined: "2h ago" },
    { id: 2, name: "Bella Iradukunda", email: "bella@example.com", phone: "+250 785 987 654", status: "Confirmed", joined: "May 12" },
    { id: 3, name: "Cedrick Karera", email: "ced@example.com", phone: "+250 783 111 222", status: "Pending", joined: "May 14" },
  ];

  return (
    <div className="fixed inset-0 z-[120] flex justify-end">
      <div className="absolute inset-0 bg-[var(--primary)]/20 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out">
        <div className="p-8 border-b border-slate-100">
          <div className="flex justify-between items-start mb-6">
            <button onClick={onClose} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-all text-slate-400"><X size={24} /></button>
            <button className="flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200">
              <Download size={14} /> Export Roster
            </button>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-1">Live Management</p>
          <h2 className="text-3xl font-serif italic text-[var(--primary)]">{event.title}</h2>
        </div>

        <div className="p-6 bg-slate-50/50 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input type="text" placeholder="Filter participants..." className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[11px] outline-none focus:border-indigo-400 transition-all" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {participants.map((person) => (
            <div key={person.id} className="group p-6 border-b border-slate-50 hover:bg-slate-50/50 transition-all flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:bg-[var(--primary)] group-hover:text-white transition-all">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{person.name}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1"><Mail size={10} /> {person.email}</span>
                  </div>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${person.status === 'Checked-in' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                {person.status}
              </span>
            </div>
          ))}
        </div>

        <div className="p-8 border-t border-slate-100 bg-white">
          <button className="w-full py-4 border-2 border-[var(--primary)] text-[var(--primary)] rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[var(--primary)] hover:text-white transition-all active:scale-95">
            Broadcast Announcement
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT: EVENTS ---
const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isPlanning, setIsPlanning] = useState(false);
  const [inspectedEvent, setInspectedEvent] = useState<any | null>(null);

  const events = [
    { 
      id: 1, title: "Annual Tech Summit 2026", date: "15", month: "MAY", 
      location: "Kigali Convention Centre", status: "upcoming", attendees: 450, 
      category: "Conference", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      id: 2, title: "Product Launch: Kezi V2", date: "10", month: "JUN", 
      location: "Virtual / Zoom", status: "upcoming", attendees: 1200, 
      category: "Digital", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop"
    },
    { 
      id: 3, title: "Charity Gala Dinner", date: "20", month: "DEC", 
      location: "Marriott Hotel", status: "past", attendees: 200, 
      category: "Gala", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop"
    }
  ];

//   const Cards =[
//     {}
//   ]

  const filteredEvents = events.filter(e => e.status === activeTab);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[var(--primary)] font-sans selection:bg-indigo-100 pb-20">
      
      {/* 1. HEADER */}
      <header className="max-w-7xl mx-auto pt-16 pb-12 px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
              <Zap size={12} className="fill-current" /> Executive Suite
            </div>
            <h1 className="text-7xl font-serif italic tracking-tighter">Event Vault</h1>
          </div>
          <button 
            onClick={() => setIsPlanning(true)}
            className="group relative flex items-center justify-center gap-4 bg-[var(--primary)] text-white px-10 py-5 rounded-full overflow-hidden transition-all active:scale-95 shadow-2xl shadow-slate-200"
          >
            <span className="relative z-10 text-[10px] font-black uppercase tracking-widest">Plan Experience</span>
            <Plus size={18} className="relative z-10 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-sm flex flex-col justify-between ">
          <CalendarDays className="text-[var(--primary)]" size={32} />
          <div>
            <p className="text-4xl font-serif italic">12</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Upcoming Cycles</p>
          </div>
        </div>
        <div className="bg-[var(--primary)] p-10 rounded-[3rem] shadow-2xl shadow-slate-200 flex flex-col justify-between h-52 text-white">
          <Users className="text-indigo-400" size={32} />
          <div>
            <p className="text-4xl font-serif italic">1.8k+</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">Confirmed Guests</p>
          </div>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 p-10 rounded-[3rem] flex flex-col justify-between h-52">
          <Globe className="text-indigo-600" size={32} />
          <div>
            <p className="text-3xl font-serif italic text-indigo-950">Kigali, RW</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mt-1">Regional Hub</p>
          </div>
        </div>
      </section>

      {/* 3. FILTERS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex p-1.5 bg-slate-100/60 backdrop-blur-md rounded-2xl w-full md:w-auto">
          {['upcoming', 'past'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 md:flex-none px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-[var(--primary)] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
            <input type="text" placeholder="Search entries..." className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl text-xs outline-none focus:border-indigo-200 transition-all" />
          </div>
          <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-[var(--primary)] transition-all"><Filter size={18}/></button>
        </div>
      </section>

      {/* 4. GALLERY GRID */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredEvents.map((event) => (
          <div key={event.id} className="group bg-white rounded-[3rem] overflow-hidden border border-slate-100 hover:border-slate-200 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]">
            <div className="relative h-72 overflow-hidden">
              <img src={event.image} alt="" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-5 py-4 rounded-3xl flex flex-col items-center shadow-xl">
                <span className="text-[10px] font-black text-indigo-600 tracking-tighter leading-none mb-1">{event.month}</span>
                <span className="text-2xl font-serif italic leading-none">{event.date}</span>
              </div>
              <div className="absolute bottom-6 left-6 px-4 py-1.5 bg-[var(--primary)]/40 backdrop-blur-md border border-white/20 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-white">
                {event.category}
              </div>
            </div>
            <div className="p-10">
              <h3 className="text-2xl font-bold tracking-tight mb-6 group-hover:text-indigo-600 transition-colors">{event.title}</h3>
              <div className="space-y-4 mb-10 text-slate-500">
                <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-slate-400">
                  <Navigation size={14} /> {event.location}
                </div>
                <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-slate-400">
                  <Users size={14} /> {event.attendees.toLocaleString()} Enrolled
                </div>
              </div>
              <button 
                onClick={() => setInspectedEvent(event)}
                className="w-full py-5 bg-slate-50 group-hover:bg-[var(--primary)] group-hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300"
              >
                Inspect Roster <ArrowUpRight size={14} className="inline ml-1" />
              </button>
            </div>
          </div>
        ))}
        
        {/* Placeholder for "Add" */}
        <button 
          onClick={() => setIsPlanning(true)}
          className="h-full min-h-[500px] rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-6 text-slate-300 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/20 transition-all group"
        >
          <div className="p-6 bg-white rounded-3xl shadow-sm group-hover:shadow-md transition-all"><Plus size={40} /></div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em]">Draft New Experience</p>
        </button>
      </section>

      {/* 5. MODAL: PLAN EVENT */}
      {isPlanning && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[var(--primary)]/20 backdrop-blur-[10px] animate-in fade-in" onClick={() => setIsPlanning(false)} />
          <div className="relative bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl p-12 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-12">
               <div>
                 <h2 className="text-4xl font-serif italic leading-none">New Concept</h2>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Initialize upcoming project</p>
               </div>
               <button onClick={() => setIsPlanning(false)} className="p-4 bg-slate-50 hover:bg-slate-100 rounded-3xl transition-all"><X size={24}/></button>
            </div>
            <div className="space-y-8">
               <div className="relative">
                 <input type="text" placeholder="Title of Experience" className="w-full border-b-2 border-slate-100 py-6 outline-none focus:border-[var(--primary)] text-2xl font-serif italic placeholder:text-slate-200 transition-all" />
               </div>
               <div className="grid grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Target Date</label>
                    <input type="date" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-xs font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Venue / URL</label>
                    <input type="text" placeholder="Location" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-xs font-bold" />
                  </div>
               </div>
               <button className="w-full bg-[var(--primary)] text-white py-6 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-indigo-100 hover:bg-indigo-600 transition-all mt-6 active:scale-95">
                 Publish to World
               </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. DRAWER: PARTICIPANTS */}
      {inspectedEvent && (
        <ParticipantDrawer 
          event={inspectedEvent} 
          onClose={() => setInspectedEvent(null)} 
        />
      )}
    </div>
  );
};

export default Events;