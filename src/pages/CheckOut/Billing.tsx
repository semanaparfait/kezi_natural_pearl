import Input from "@/components/Input";

interface BillingProps {
  setCurrentStep: (step: number) => void;
}

const Billing = ({ setCurrentStep }: BillingProps) => {
  return (
    <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-gray-100 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="border-b border-gray-50 pb-6">
        <h3 className="text-2xl font-serif italic text-(--primary)">Billing Information</h3>
        <p className="text-sm text-gray-400 mt-1">Enter your details for the order invoice.</p>
      </div>
      <div className="flex items-center gap-2 text-sm ">
        <input type="checkbox" />
        <p>same as shipping address</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Full Name" placeholder="John Doe" value="" onChange={()=>{}} />
        <Input label="Email Address" placeholder="john@example.com" value="" onChange={()=>{}} />
        {/* <div className="md:col-span-2"> */}
          <Input label="address" placeholder="123 Main Street, City, Country" value="" onChange={()=>{}} />
        {/* </div> */}
      </div>

      <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
        <button 
          onClick={() => setCurrentStep(1)} 
          className="text-gray-400 hover:text-(--primary) text-xs font-bold uppercase tracking-widest"
        >
          Back
        </button>
        <button 
          className="px-12 py-4 rounded-full bg-(--primary) text-white text-[10px] uppercase tracking-widest font-bold shadow-xl hover:scale-105 transition-all"
          onClick={() => setCurrentStep(3)}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default Billing;