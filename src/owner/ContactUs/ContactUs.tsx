import React, { useState } from 'react';
import { 
  Search, Inbox, Star, Clock, CheckCircle2, 
  Menu, X, ChevronLeft, Send, Trash2, Reply, 
  MoreVertical, Search as SearchIcon
} from 'lucide-react';

const MESSAGES = [
  { id: 1, name: 'Alice Umutoni', email: 'alice@example.com', subject: 'Custom Order Inquiry', message: 'Hello, I would like to know if you can deliver custom pearls to Kimironko by Friday?', status: 'unread', date: '2 mins ago' },
  { id: 2, name: 'Jean Bosco', email: 'jb@provider.rw', subject: 'Payment Issue', message: 'My transaction failed but money was deducted from my MoMo.', status: 'read', date: '1 hour ago' },
  { id: 3, name: 'Sarah Jones', email: 'sj@global.com', subject: 'Partnership', message: 'We love your brand and want to discuss a wholesale partnership.', status: 'replied', date: 'Yesterday' },
];

function ContactUs() {
  const [selectedMsg, setSelectedMsg] = useState<typeof MESSAGES[0] | null>(MESSAGES[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [reply, setReply] = useState("");

  return (
    <div className="flex h-screen bg-white text-slate-900 overflow-hidden">
      
      {/* 1. MOBILE SIDEBAR OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      {/* 2. NAVIGATION SIDEBAR (Hidden on mobile, slide-in) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-50 border-r border-slate-200 transform transition-transform duration-300 lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-serif italic font-bold">Kezi Admin</h2>
            <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}><X size={20}/></button>
          </div>
          <nav className="space-y-1">
            <NavItem icon={<Inbox size={18}/>} label="Inbox" count={12} active />
            <NavItem icon={<Star size={18}/>} label="Starred" />
            <NavItem icon={<Clock size={18}/>} label="Pending" count={5} />
            <NavItem icon={<CheckCircle2 size={18}/>} label="Resolved" />
          </nav>
        </div>
      </aside>

      {/* 3. MESSAGE LIST COLUMN */}
      <section className={`
        flex-col w-full lg:w-96 border-r border-slate-200 bg-white
        ${selectedMsg ? 'hidden lg:flex' : 'flex'}
      `}>
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg">
            <Menu size={20} />
          </button>
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" placeholder="Search..." 
              className="w-full bg-slate-100 border-none rounded-xl py-2 pl-10 text-sm focus:ring-2 focus:ring-gold/20"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {MESSAGES.map((msg) => (
            <div 
              key={msg.id}
              onClick={() => setSelectedMsg(msg)}
              className={`p-5 cursor-pointer border-b border-slate-50 transition-colors relative ${selectedMsg?.id === msg.id ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}
            >
              {selectedMsg?.id === msg.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-900" />}
              <div className="flex justify-between items-start mb-1">
                <span className={`text-sm ${msg.status === 'unread' ? 'font-black' : 'font-bold'}`}>{msg.name}</span>
                <span className="text-[10px] text-slate-400 font-bold">{msg.date}</span>
              </div>
              <p className="text-xs font-semibold text-slate-600 truncate mb-1">{msg.subject}</p>
              <p className="text-xs text-slate-400 line-clamp-2">{msg.message}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CONTENT READER COLUMN */}
      <main className={`
        flex-1 flex-col bg-white
        ${!selectedMsg ? 'hidden lg:flex' : 'flex'}
      `}>
        {selectedMsg ? (
          <>
            {/* Header */}
            <header className="p-4 lg:p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => setSelectedMsg(null)} className="lg:hidden p-2 -ml-2 hover:bg-slate-50 rounded-full">
                  <ChevronLeft size={20} />
                </button>
                <div className="hidden sm:flex w-10 h-10 rounded-full bg-slate-900 text-white items-center justify-center font-bold text-sm">
                  {selectedMsg.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-sm lg:text-base leading-tight">{selectedMsg.name}</h3>
                  <p className="text-[11px] text-slate-400">{selectedMsg.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={18}/></button>
                <button className="p-2 text-slate-400"><MoreVertical size={18}/></button>
              </div>
            </header>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-10">
              <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                  <h1 className="text-2xl lg:text-4xl font-serif italic mb-4">{selectedMsg.subject}</h1>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-black uppercase tracking-tighter text-slate-500">Inbound Message</span>
                  </div>
                </div>

                <div className="text-slate-700 leading-relaxed text-sm lg:text-base bg-slate-50 p-6 lg:p-8 rounded-[2rem] border border-slate-100">
                  {selectedMsg.message}
                </div>

                {/* Reply Section */}
                <div className="mt-10">
                  <div className="flex items-center gap-2 mb-4 text-slate-400 ml-2">
                    <Reply size={16}/>
                    <span className="text-[10px] font-black uppercase tracking-widest">Reply to Customer</span>
                  </div>
                  <div className="border border-slate-200 rounded-[1.5rem] lg:rounded-[2.5rem] overflow-hidden focus-within:ring-4 focus-within:ring-slate-100 transition-all">
                    <textarea 
                      className="w-full p-6 lg:p-8 min-h-[150px] border-none focus:ring-0 text-sm lg:text-base resize-none"
                      placeholder="Write your response..."
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                    />
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end items-center gap-4">
                      <button className="hidden sm:block text-[10px] font-black uppercase text-slate-400 hover:text-slate-600">Discard</button>
                      <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95">
                        Send <Send size={14}/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-300">
            <Inbox size={48} strokeWidth={1} />
            <p className="mt-4 font-serif italic text-lg text-slate-400">Select a message to read</p>
          </div>
        )}
      </main>
    </div>
  );
}

function NavItem({ icon, label, count, active = false }: any) {
  return (
    <div className={`
      flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all
      ${active ? 'bg-slate-900 text-white shadow-lg' : 'hover:bg-slate-200/50 text-slate-500'}
    `}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-xs font-black uppercase tracking-widest">{label}</span>
      </div>
      {count && <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${active ? 'bg-white/20' : 'bg-slate-200 text-slate-400'}`}>{count}</span>}
    </div>
  );
}

export default ContactUs;