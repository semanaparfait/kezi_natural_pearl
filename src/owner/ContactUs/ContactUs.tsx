import { useState, useRef, useEffect } from 'react';
import { 
  Inbox, Star, Clock, CheckCircle2, 
  Menu, X, ChevronLeft, Send, Trash2, Reply, 
  MoreVertical, Search as SearchIcon, Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useGetContactedMessagesQuery, useReplyMessageMutation } from '@/features/contactUs/contactUsApi';

function ContactUs() {
  const [selectedMsg, setSelectedMsg] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [reply, setReply] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);


  const { data: contactedMessages, isLoading, isError } = useGetContactedMessagesQuery();
  const [replyMessage, { isLoading: isSending }] = useReplyMessageMutation();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [reply]);

  const handleReply = async () => {
    if (!selectedMsg || !reply.trim()) return;
    try {
      await replyMessage({ 
        id: selectedMsg.id, 
        response: reply     
      }).unwrap();
      setReply("");
      toast.success("Reply sent successfully!");
    } catch (error) {
      // console.error("Failed to reply to message:", error);
      toast.error("Failed to send message. Please check your connection.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <Loader2 className="animate-spin text-slate-400" size={40} />
        <p className="text-slate-500 font-medium">Loading your inbox...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <p>Failed to load messages. Please refresh the page.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white text-slate-900 overflow-hidden">
      
      {/* 1. MOBILE SIDEBAR OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      {/* 2. NAVIGATION SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-50 border-r border-slate-200 transform transition-transform duration-300 lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-serif italic font-bold">Kezi Natural Pearl</h2>
            <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}><X size={20}/></button>
          </div>
          <nav className="space-y-1">
            {/* <NavItem icon={<Inbox size={18}/>} label="Inbox" count={contactedMessages?.length || 0} active /> */}
            {contactedMessages?.map((msg: any) => (
              <NavItem
                key={msg.id}
                icon={<Star size={18}/>}
                label={msg.subject}
                count={undefined}
                active={selectedMsg?.id === msg.id}
                onClick={() => setSelectedMsg(msg)}
              />
            ))}
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
              type="text" placeholder="Search messages..." 
              className="w-full bg-slate-100 border-none rounded-xl py-2 pl-10 text-sm focus:ring-2 focus:ring-slate-200 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {contactedMessages?.map((msg: any) => (
            <div 
              key={msg.id}
              onClick={() => setSelectedMsg(msg)}
              className={`p-5 cursor-pointer border-b border-slate-50 transition-colors relative ${selectedMsg?.id === msg.id ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}
            >
              {selectedMsg?.id === msg.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--primary)]" />}
              <div className="flex justify-between items-start mb-1">
                <span className={`text-sm ${msg.status === 'unread' ? 'font-black' : 'font-bold'}`}>{msg.name}</span>
                <span className="text-[10px] text-slate-400 font-bold">{new Date(msg.createdAt).toLocaleDateString()}</span>
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
            <header className="p-4 lg:p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <button onClick={() => setSelectedMsg(null)} className="lg:hidden p-2 -ml-2 hover:bg-slate-50 rounded-full">
                  <ChevronLeft size={20} />
                </button>
                <div className="hidden sm:flex w-10 h-10 rounded-full bg-[var(--primary)] text-white items-center justify-center font-bold text-sm">
                  {selectedMsg.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-sm lg:text-base leading-tight">{selectedMsg.name}</h3>
                  <p className="text-[11px] text-slate-400">{selectedMsg.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                <button className="p-2 text-slate-400"><MoreVertical size={18}/></button>
              </div>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-10">
              <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                  <h1 className="text-2xl lg:text-4xl font-serif italic mb-4">{selectedMsg.subject}</h1>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-black uppercase tracking-tighter text-slate-500">Inbound Message</span>
                  </div>
                </div>

                <div className="text-slate-700 leading-relaxed text-sm lg:text-base bg-slate-50 rounded-2xl p-6 lg:p-8 border border-slate-100 shadow-sm">
                  {selectedMsg.message}
                </div>

                {/* Reply Section */}
                <div className="mt-12 mb-20">
                  <div className="flex items-center gap-2 mb-4 text-slate-400 ml-2">
                    <Reply size={16}/>
                    <span className="text-[10px] font-black uppercase tracking-widest">Reply to Customer</span>
                  </div>
                  
                  <div className={`border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 ${isSending ? 'opacity-50 pointer-events-none' : 'focus-within:ring-4 focus-within:ring-slate-100 focus-within:border-slate-300'}`}>
                    <textarea
                      ref={textareaRef}
                      className="w-full p-6 lg:p-8 min-h-[120px] border-none focus:ring-0 text-sm lg:text-base resize-none placeholder:text-slate-300"
                      placeholder="Type your response here..."
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      disabled={isSending}
                    />
                    
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end items-center gap-4">
                      <button 
                        disabled={isSending || !reply}
                        onClick={() => setReply("")}
                        className="hidden sm:block text-[10px] font-black uppercase text-slate-400 hover:text-slate-600 disabled:opacity-0 transition-all"
                      >
                        Discard
                      </button>
                      <button
                        onClick={handleReply}
                        disabled={isSending || !reply.trim()}
                        className="flex items-center gap-2 bg-[var(--primary)] text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 disabled:bg-slate-300 disabled:cursor-not-allowed shadow-lg shadow-slate-200"
                      >
                        {isSending ? (
                          <>Sending... <Loader2 size={14} className="animate-spin" /></>
                        ) : (
                          <>Send Message <Send size={14}/></>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-300">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Inbox size={40} strokeWidth={1} className="text-slate-200" />
            </div>
            <p className="font-serif italic text-lg text-slate-400">Select a message to view details</p>
          </div>
        )}
      </main>
    </div>
  );
}

// Sub-component for Navigation Items
function NavItem({ icon, label, count, active = false }: any) {
  return (
    <div className={`
      flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all
      ${active ? 'bg-[var(--primary)] text-white shadow-md' : 'hover:bg-slate-200/50 text-slate-500'}
    `}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      {count !== undefined && (
        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${active ? 'bg-white/20' : 'bg-slate-200 text-slate-400'}`}>
          {count}
        </span>
      )}
    </div>
  );
}

export default ContactUs;