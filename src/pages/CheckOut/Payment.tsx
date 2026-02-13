import { useState } from "react";
import { CreditCard, Smartphone } from "lucide-react";
import Input from "@/components/Input";

const Payment = ({ setCurrentStep }: { setCurrentStep: (step: number) => void }) => {
  const [paymentMethod, setPaymentMethod] = useState("momo");

  return (
    <div className="bg-white rounded-[2.5rem] p-6 md:p-12 shadow-sm border border-gray-100 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="border-b border-gray-50 pb-6">
        <h3 className="text-2xl font-serif italic text-[var(--primary)]">Payment Method</h3>
        <p className="text-sm text-gray-400 mt-1">Select your preferred secure payment option.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          onClick={() => setPaymentMethod('momo')}
          className={`p-6 rounded-3xl border-2 cursor-pointer transition-all flex items-center gap-4 ${paymentMethod === 'momo' ? 'border-[var(--primary)] bg-[var(--secondary-cream-white)]' : 'border-gray-50'}`}
        >
          <Smartphone className={paymentMethod === 'momo' ? 'text-[var(--primary)]' : 'text-gray-400'} />
          <p className="font-bold text-[var(--primary)]">Mobile Money</p>
        </div>
        <div 
          onClick={() => setPaymentMethod('card')}
          className={`p-6 rounded-3xl border-2 cursor-pointer transition-all flex items-center gap-4 ${paymentMethod === 'card' ? 'border-[var(--primary)] bg-[var(--secondary-cream-white)]' : 'border-gray-50'}`}
        >
          <CreditCard className={paymentMethod === 'card' ? 'text-[var(--primary)]' : 'text-gray-400'} />
          <p className="font-bold text-[var(--primary)]">Card Payment</p>
        </div>
      </div>

      {paymentMethod === 'momo' && (
        <div className="bg-gray-50 p-6 rounded-3xl animate-in zoom-in-95">
          <Input label="MoMo Number" placeholder="078XXXXXXX" value="" onChange={()=>{}} />
          <p className="text-[10px] text-gray-400 mt-2 italic">* A prompt will be sent to this number for your PIN.</p>
        </div>
      )}

      <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
        <button 
          onClick={() => setCurrentStep(2)} 
          className="text-gray-400 hover:text-[var(--primary)] text-xs font-bold uppercase tracking-widest"
        >
          Back
        </button>
        <button className="px-16 py-5 rounded-full bg-[var(--gold-color)] text-white text-[10px] uppercase tracking-[0.3em] font-black shadow-2xl">
          Complete Order
        </button>
      </div>
    </div>
  );
};

export default Payment;