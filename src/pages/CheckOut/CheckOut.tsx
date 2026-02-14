import { useState } from "react";
import { MoveLeft, Check, ShieldCheck, Truck, MapPin, LocateFixed } from "lucide-react";
import Input from "@/components/Input";
import { Country, State, City } from "country-state-city";
import Billing from "@/pages/CheckOut/Billing";
import Payment from "@/pages/CheckOut/Payment";

function CheckOut() {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedOption, setSelectedOption] = useState(1);

    const [country, setCountry] = useState("RW");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [sector, setSector] = useState("");

    const countries = Country.getAllCountries();
    const states = State.getStatesOfCountry(country);
    const cities = City.getCitiesOfState(country, state);
    const isRwanda = country === "RW";

    const steps = [
        { id: 1, title: "Shipping" },
        { id: 2, title: "Billing" },
        { id: 3, title: "Payment" },
    ];

    const shippingOptions = [
        { id: 1, title: "Delivery Address", description: "Doorstep delivery with our reliable service.", icon: <LocateFixed size={23} />, price: 'FREE' },
        { id: 2, title: "Store Pickup", description: "Pick up your order and enjoy an exclusive in-store experience.", icon: <MapPin size={23} /> },
    ];

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            window.history.back();
        }
    };

    const selectClass = "w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[var(--gold-color)] focus:ring-2 focus:ring-[var(--gold-color)]/20 transition-all appearance-none cursor-pointer";

    return (
        <section className="min-h-screen bg-gray-50/30 pb-20">
            {/* Header */}
            <div className="max-w-7xl mx-auto pt-10 px-6 md:px-10">
                <button onClick={handleBack} className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-(--primary) transition-all">
                    <MoveLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
                    {currentStep === 1 ? "Back to cart" : `Back to ${steps[currentStep - 2].title}`}
                </button>
                <h1 className="text-4xl md:text-5xl font-serif text-(--primary) italic pt-5">Checkout</h1>
            </div>

            <div className="max-w-7xl mx-auto md:px-6 md:px-10 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                <div className="lg:col-span-8 space-y-10">
                    {/* Progress Tracker */}
                    <div className="flex items-center justify-between max-w-2xl mx-auto mb-16 relative px-4">
                        {steps.map((step, idx) => {
                            const isCompleted = currentStep > step.id;
                            const isActive = currentStep === step.id;
                            return (
                                <div key={step.id} className="flex flex-col items-center relative z-10">
                                    <div className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all duration-500 border-2
                                        ${isActive ? "bg-(--primary) border-(--primary) text-white shadow-lg" 
                                        : isCompleted ? "bg-[var(--gold-color)] border-[var(--gold-color)] text-white" 
                                        : "bg-white border-gray-200 text-gray-300"}`}>
                                        {isCompleted ? <Check size={18} /> : <span className="text-xs">{step.id}</span>}
                                    </div>
                                    <h2 className={`mt-3 text-[9px] uppercase tracking-[0.2em] font-black transition-colors ${isActive ? "text-(--primary)" : "text-gray-400"}`}>
                                        {step.title}
                                    </h2>
                                    {idx !== steps.length - 1 && (
                                        <div className="absolute top-5 left-full w-full h-[1px] bg-gray-200 -z-10 min-w-[80px] md:min-w-[150px]">
                                            <div className={`h-full bg-[var(--gold-color)] transition-all duration-700 ${isCompleted ? "w-full" : "w-0"}`} />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* STEP 1: SHIPPING CONTENT */}
                    {currentStep === 1 && (
                        <div className="bg-white rounded-[2.5rem] p-6 md:p-12 shadow-sm border border-gray-100 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="border-b border-gray-50 pb-6">
                                <h3 className="text-2xl font-serif italic text-(--primary)">Shipping Method</h3>
                                <p className="text-sm text-gray-400 mt-1">Select your preferred delivery method.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {shippingOptions.map((option) => (
                                    <div key={option.id} onClick={() => setSelectedOption(option.id)}
                                        className={`relative border-2 rounded-3xl p-6 cursor-pointer transition-all duration-300 flex flex-col gap-4 ${
                                            selectedOption === option.id ? 'border-(--primary) bg-[var(--secondary-cream-white)] shadow-md' : 'border-gray-50 hover:bg-gray-50'
                                        }`}>
                                        <div className="flex justify-between items-start">
                                            <div className={`p-3 rounded-2xl ${selectedOption === option.id ? 'bg-white text-(--primary)' : 'bg-gray-100'}`}>
                                                {option.icon}
                                            </div>
                                            {option.price && <span className="text-[10px] font-black text-[var(--gold-color)] uppercase tracking-widest">{option.price}</span>}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-(--primary)">{option.title}</h3>
                                            <p className="text-xs text-gray-500">{option.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {selectedOption === 1 && (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-500 bg-gray-50/50 p-6 md:p-8 rounded-[2.5rem] border border-gray-100 space-y-6">
                                    <h4 className="font-serif italic text-lg text-(--primary) border-b border-gray-200 pb-2">Delivery Details</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase font-bold text-gray-400 ml-1">Country</label>
                                            <select className={selectClass} value={country} onChange={(e) => { setCountry(e.target.value); setState(""); setCity(""); }}>
                                                {countries.map((c) => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase font-bold text-gray-400 ml-1">State / Province</label>
                                            <select className={selectClass} value={state} onChange={(e) => setState(e.target.value)} disabled={!states.length}>
                                                <option value="">Select State</option>
                                                {states.map((s) => <option key={s.isoCode} value={s.isoCode}>{s.name}</option>)}
                                            </select>
                                        </div>
                                        {isRwanda ? (
                                            <>
                                                <Input label="District" placeholder="e.g. Gasabo" value={district} onChange={(e)=>setDistrict(e.target.value)} />
                                                <Input label="Sector" placeholder="e.g. Kimironko" value={sector} onChange={(e)=>setSector(e.target.value)} />
                                            </>
                                        ) : (
                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase font-bold text-gray-400 ml-1">City</label>
                                                <select className={selectClass} value={city} onChange={(e) => setCity(e.target.value)} disabled={!cities.length}>
                                                    <option value="">Select City</option>
                                                    {cities.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                                                </select>
                                            </div>
                                        )}
                                        <div className="md:col-span-2">
                                            <Input label="House / Street / Landmark" placeholder="e.g. Near Centenary House, Gate 5" value="" onChange={()=>{}}/>
                                        </div>
                                        <label htmlFor="delivery-instructions" className="text-[10px] uppercase font-bold ml-1">Delivery Instructions</label>
                                        <textarea
                                         id="delivery-instructions"
                                         placeholder="Additional delivery instructions (optional)" 
                                         className="md:col-span-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[var(--gold-color)] focus:ring-2 focus:ring-[var(--gold-color)]/20 transition-all resize-none h-24" />
                                    </div>
                                </div>
                            )}
                            {selectedOption === 2 && (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-500 bg-gray-50/50 p-6 md:p-8 rounded-[2.5rem] border border-gray-100 space-y-6">
                                    <h4 className="font-serif italic text-lg text-(--primary) border-b border-gray-200 pb-2">Store Pickup</h4>
                                    <p className="text-sm text-gray-500">You can pick up your order from our store located at:</p>
                                    <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100">
                                        <MapPin size={20} className="text-[var(--gold-color)]" />
                                        <div>
                                            <p className="font-bold text-(--primary)">Kezi Natural Pearl</p>
                                            <p className="text-xs text-gray-500">123 Wellness Ave, Kigali</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                                <button onClick={handleBack} className="text-gray-400 hover:text-(--primary) text-xs font-bold uppercase tracking-widest">Cancel</button>
                                <button onClick={() => setCurrentStep(2)} className="px-12 py-4 rounded-full bg-(--primary) text-white text-[10px] uppercase tracking-widest font-bold shadow-xl hover:scale-105 active:scale-95 transition-all">
                                    Continue to Billing
                                </button>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && <Billing setCurrentStep={setCurrentStep} />}
                    {currentStep === 3 && <Payment setCurrentStep={setCurrentStep} />}
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-4">
                    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl sticky top-10">
                        <h2 className="text-2xl font-serif italic text-(--primary) mb-8">Summary</h2>
                        <div className="flex gap-4 items-center border-b border-gray-50 pb-8 mb-8">
                            <div className="w-16 h-16 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                                <img src="https://i.pinimg.com/1200x/35/7e/ec/357eec5d843c708a7ef5b736966c1047.jpg" className="w-full h-full object-cover" alt="Product" />
                            </div>
                            <div>
                                <p className="text-sm font-black text-(--primary) uppercase tracking-tight">Rosehip Serum</p>
                                <p className="text-xs text-gray-400 italic">Qty: 1</p>
                            </div>
                        </div>
                        <div className="space-y-4 text-sm mb-8">
                            <div className="flex justify-between"><span>Subtotal</span><span className="font-bold text-(--primary)">1,000 RWF</span></div>
                            <div className="flex justify-between items-center italic text-gray-500">
                                <span className="flex items-center gap-2"><Truck size={14}/> Shipping</span>
                                <span className="text-[var(--gold-color)] font-black text-[10px] bg-[var(--gold-color)]/10 px-2 py-1 rounded">Free</span>
                            </div>
                            <div className="flex justify-between font-serif italic text-(--primary) pt-6 border-t text-2xl">
                                <span>Total</span><span className="font-bold not-italic">1,000 RWF</span>
                            </div>
                        </div>
                        <div className="p-5 bg-gray-50 rounded-[2rem] flex items-center gap-4">
                            <ShieldCheck size={24} className="text-[var(--gold-color)]" />
                            <p className="text-[9px] uppercase tracking-widest font-black text-gray-400">Secure Checkout Guaranteed</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CheckOut;