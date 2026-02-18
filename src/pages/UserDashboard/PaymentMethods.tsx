import { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Check, 
  ShieldCheck, 
  ArrowRight,
  Info,
  CreditCard
} from "lucide-react";


const SAVED_METHODS = [
  {
    id: "1",
    type: "MTN",
    logo:"https://i.pinimg.com/736x/7f/eb/02/7feb0256dc66ee941c1a5d4c945ed60b.jpg",
    provider: "MTN Mobile Money",
    accountName: "Semana Kezi",
    number: "+250 788 ••• •89",
    color: "bg-[#FFCC00]", // MTN Yellow
    textColor: "text-black",
  },
  {
    id: "2",
    type: "AIRTEL",
    logo: "https://i.pinimg.com/736x/29/c6/7d/29c67ddcd038c021558b44235314c82c.jpg",
    provider: "Airtel Money",
    accountName: "Semana Kezi",
    number: "+250 733 ••• •12",
    color: "bg-[#ED1C24]", // Airtel Red
    textColor: "text-white",
  }
];

function PaymentMethods() {
  const [selectedId, setSelectedId] = useState("1");

  return (
    <section className="min-h-screen bg-[#FAF9F6] selection:bg-[var(--gold-color)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3">
              <div className="w-10 h-px bg-[var(--gold-color)]" />
            </div>
            <h1 className="text-5xl  font-serif text-(--primary) italic tracking-tighter">
              Payment Methods<span className="text-[var(--gold-color)]">.</span>
            </h1>
          </div>
          <button className="flex items-center gap-3 px-8 py-4 bg-(--primary) text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all hover:scale-105 active:scale-95">
            <Plus size={16} /> Add New Method
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          

          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SAVED_METHODS.map((method) => {
                const isSelected = selectedId === method.id;
                return (
                  <div 
                    key={method.id}
                    onClick={() => setSelectedId(method.id)}
                    className={`group relative h-64 rounded-[2.5rem] p-8 cursor-pointer transition-all duration-700 overflow-hidden border-2
                      ${isSelected 
                        ? "border-(--primary) shadow-2xl scale-[1.02] -translate-y-2" 
                        : "border-transparent bg-white hover:border-gray-100 shadow-md"}`}
                  >

                    <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity">
                       {method.type === "MTN" ? 
                        <div className="text-9xl font-black italic">MoMo</div> : 
                        <div className="text-9xl font-black italic">Airtel</div>
                       }
                    </div>

                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="flex justify-between items-start">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg `}>

                           <img src={method.logo} alt={method.provider} className="rounded-md" />
                        </div>
                        {isSelected && (
                          <div className="bg-(--primary) text-white p-2 rounded-full animate-in zoom-in duration-300">
                            <Check size={14} />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                          {method.provider}
                        </p>
                        <h3 className="text-xl font-bold text-(--primary) tracking-tight">
                          {method.accountName}
                        </h3>
                        <p className="text-lg font-serif italic text-gray-600">
                          {method.number}
                        </p>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                         <span className="text-[9px] font-black uppercase tracking-widest text-green-500">Active Account</span>
                         <button className="text-gray-300 hover:text-red-500 transition-colors">
                           <Trash2 size={16} />
                         </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>


            <div className="bg-[var(--secondary-cream-white)] rounded-[2rem] p-8 border border-[var(--gold-color)]/10 flex items-center gap-6">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[var(--gold-color)] shadow-sm">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-(--primary) uppercase tracking-wider">End-to-End Encryption</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Your payment details are strictly encrypted and stored in a secure vault. Kezi Pearl does not have direct access to your MoMo credentials.
                </p>
              </div>
            </div>
          </div>


          <div className="lg:col-span-5">
            <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-gray-50 sticky top-10">
              <h2 className="text-2xl font-serif italic text-(--primary) mb-8">Account Details</h2>
              
              <div className="space-y-6">
                <div className="p-6 rounded-[2rem] bg-gray-50 border border-gray-100 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-400">
                       <CreditCard size={18} />
                     </div>
                     <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Preferred Method</p>
                       <p className="text-sm font-bold text-(--primary)">{selectedId === "1" ? "MTN Rwanda" : "Airtel Rwanda"}</p>
                     </div>
                   </div>
                   <ArrowRight size={18} className="text-gray-300" />
                </div>

                <div className="p-8 space-y-4">
                  <div className="flex items-start gap-4">
                    <Info size={16} className="text-[var(--gold-color)] shrink-0 mt-1" />
                    <p className="text-xs text-gray-500 leading-relaxed">
                      This method will be used as your default for all <strong>Kezi Pearl</strong> orders.
                    </p>
                  </div>
                </div>

                <button className="w-full py-6 bg-(--primary) text-white rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-xl hover:bg-black transition-all group">
                   Manage Linked Accounts
                </button>
                
                <p className="text-[9px] text-center text-gray-300 font-bold uppercase tracking-[0.2em] mt-6">
                  Certified by Rwanda Utilities Regulatory Authority (RURA)
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

export default PaymentMethods;