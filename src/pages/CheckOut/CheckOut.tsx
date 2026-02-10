import { useState } from "react";
import { MoveLeft, Check, ShieldCheck, Truck,MapPin, Mic, ArrowRight, LocateFixed } from "lucide-react";
import Button from "@/components/Button";

function CheckOut() {
    const [currentStep, setCurrentStep] = useState(1);
    const steps = [
        { id: 1, title: "Shipping" },
        { id: 2, title: "Billing" },
        { id: 3, title: "Payment" },
    ];

    return (
        <section className="min-h-screen  pb-20">
            <div className="max-w-7xl mx-auto pt-10 px-6 md:px-10">
                <button 
                    onClick={() => window.history.back()}
                    className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-[var(--primary)] transition-all"
                >
                    <MoveLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
                    Back to cart
                </button>
                <h1 className="text-4xl md:text-5xl font-serif text-[var(--primary)] italic pt-5">Checkout</h1>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-10 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
            
                <div className="lg:col-span-8 space-y-12">
                    
                    {/* PROFESSIONAL STEPS COMPONENT */}
                    <div className="flex items-center justify-between max-w-2xl mx-auto mb-16 relative">
                        {steps.map((step, idx) => {
                            const isCompleted = currentStep > step.id;
                            const isActive = currentStep === step.id;

                            return (
                                <div key={step.id} className="flex flex-col items-center relative z-10">
                                    <div
                                        className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all duration-500 border-2
                                        ${isActive 
                                            ? "bg-[var(--primary)] border-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20" 
                                            : isCompleted 
                                            ? "bg-[var(--gold-color)] border-[var(--gold-color)] text-white" 
                                            : "bg-white border-[var(--bolder-gray)]/30 text-gray-300"}`}
                                    >
                                        {isCompleted ? <Check size={18} /> : <span className="text-xs">{step.id.toString().padStart(2, '0')}</span>}
                                    </div>
                                    <h2 className={`mt-3 text-[9px] uppercase tracking-[0.2em] font-black transition-colors ${isActive ? "text-[var(--primary)]" : "text-gray-400"}`}>
                                        {step.title}
                                    </h2>

                                    {/* Line Connector */}
                                    {idx !== steps.length - 1 && (
                                        <div className="absolute top-5 left-full w-full h-[1px] bg-[var(--bolder-gray)]/20 -z-10 min-w-[120px] md:min-w-[180px]">
                                            <div className={`h-full bg-[var(--gold-color)] transition-all duration-700 ${isCompleted ? "w-full" : "w-0"}`} />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-[var(--bolder-gray)]/20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="border-b border-gray-100 pb-4">
                            <h3 className="text-xl font-serif italic text-[var(--primary)]">Shipping Information</h3>
                        </div>

                        <div className="space-y-3">
                            <div className="border">
                                
                            </div>
                            <div></div>
                            <div className="border rounded-lg p-6 flex items-center justify-between cursor-pointer hover:bg-[var(--secondary-cream-white)] transition-colors">
                                <div className="flex items-center gap-3">
                                <LocateFixed size={23} className="text-[var(--gold-color)]" />
                                <div>
                                <h3 className="font-medium text-xl italic text-[var(--primary)] leading-tight">Store Pickup</h3>
                                <p className="text-sm italic text-gray-500">Visit our store to pick up your order and enjoy an exclusive in-store experience.</p>
                                </div>

                                </div>
                                <p className="text-[var(--gold-color)] font-bold uppercase text-[15px]">FREE</p>
                            </div>
                            <div className="border rounded-lg p-6 flex flex-col md:flex-row items-center justify-between cursor-pointer hover:bg-[var(--secondary-cream-white)] transition-colors">
                                <div className="flex items-center gap-3">
                                <MapPin size={23} className="text-[var(--gold-color)]" />
                            <div className="flex-1">
                                <h3 className="font-medium text-xl italic text-[var(--primary)] leading-tight">Send Voice Location</h3>
                                <p className="text-sm italic text-gray-500">
                                Record a voice message to share your exact location for delivery.
                                </p>
                            </div>
                                </div>
                            <button
                                onClick={() => {
                                console.log("Start voice recording");
                                }}
                                className="mt-4 md:mt-0 px-6 py-2 bg-[var(--gold-color)] text-white font-bold rounded-lg hover:brightness-110 transition-all"
                            >
                                Record Voice
                            </button>
                            </div>

                        </div>
                        

                        <div className="pt-6">
                            <Button className="w-full md:w-auto px-12 py-4 rounded-full bg-[var(--primary)] text-white text-[10px] uppercase tracking-widest font-bold shadow-xl hover:brightness-110" onClick={() => setCurrentStep(2)}>
                                Continue to Billing
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-4">
                    <div className="bg-white rounded-[2rem] p-8 border border-[var(--bolder-gray)]/20 shadow-sm sticky top-10">
                        <h2 className="text-xl font-serif italic text-[var(--primary)] mb-6">Order Summary</h2>
                        
                        <div className="space-y-4 border-b border-gray-100 pb-6 mb-6">
                            <div className="flex justify-between items-center group">
                                <div className="flex gap-3 items-center">
                                    <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden">
                                        <img src="https://i.pinimg.com/1200x/35/7e/ec/357eec5d843c708a7ef5b736966c1047.jpg" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[var(--primary)]">Rosehip Serum</p>
                                        <p className="text-[10px] text-gray-400 italic">Qty: 1</p>
                                    </div>
                                </div>
                                <p className="text-xs font-bold">1,000 RWF</p>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm italic text-gray-500 mb-6">
                            <div className="flex justify-between"><span>Subtotal</span><span>1,000 RWF</span></div>
                            <div className="flex justify-between"><span className="flex items-center gap-1"><Truck size={14}/> Shipping</span><span className="text-[var(--gold-color)] font-bold uppercase text-[10px]">Free</span></div>
                            <div className="flex justify-between font-bold text-[var(--primary)] pt-3 border-t border-gray-50 text-base not-italic">
                                <span>Total</span>
                                <span>1,000 RWF</span>
                            </div>
                        </div>

                        <div className="p-4 bg-[var(--secondary-cream-white)] rounded-2xl flex items-center gap-3">
                            <ShieldCheck size={20} className="text-[var(--gold-color)]" />
                            <p className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Secure Artisanal Checkout</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CheckOut;