import { useState } from "react";
import { MoveLeft, Check, ShieldCheck, Truck, MapPin, LocateFixed, Loader2 } from "lucide-react";
import Input from "@/components/Input";
import { Country, State, City } from "country-state-city";
import Payment from "@/pages/CheckOut/Payment";
import { useGetCartItemsQuery } from '@/features/cart/cartApi'
import { toast } from "react-hot-toast";
import { useAddAddressMutation,useGetAddressesQuery } from '@/features/Address/Address'

function CheckOut() {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedOption, setSelectedOption] = useState(1);
    const { data: cartData } = useGetCartItemsQuery();
    const { data: getAddresses, isLoading: isLoadingAddresses } = useGetAddressesQuery();
    const [addAddress, { isLoading: isSending }] = useAddAddressMutation();


    const [country, setCountry] = useState("RW");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        addressLine1: "",
        postalCode: "",
        district: "", // Rwanda specific
        sector: "",   // Rwanda specific
    });

    const isRwanda = country === "RW";
    const countries = Country.getAllCountries();
    const states = State.getStatesOfCountry(country);
    const cities = City.getCitiesOfState(country, state);

    const steps = [{ id: 1, title: "Shipping" }, { id: 2, title: "Payment" }];

    const shippingOptions = [
        { id: 1, title: "Delivery Address", description: "Doorstep delivery with our reliable service.", icon: <LocateFixed size={23} />, price: 'FREE' },
        { id: 2, title: "Store Pickup", description: "Pick up your order and enjoy an exclusive in-store experience.", icon: <MapPin size={23} /> },
    ];

console.log("Cart Data:", getAddresses);
    const handleSubmitAddress = async () => {
        // Basic Validation
        if (!formData.fullName || !formData.phoneNumber) {
            return toast.error("Full Name and Phone Number are required.");
        }

        if (selectedOption === 1) {
            if (!formData.addressLine1) return toast.error("Please provide a street address.");
            if (isRwanda && (!formData.district || !formData.sector)) {
                return toast.error("Please provide District and Sector for delivery.");
            }
        }

        try {
            // Mapping state to AddresRequest DTO
            const addressData = {
                fullName: formData.fullName,
                phoneNumber: formData.phoneNumber,
                country: Country.getCountryByCode(country)?.name || country,
                state: State.getStateByCodeAndCountry(state, country)?.name || state,
                city: isRwanda ? formData.district : (cities.find(c => c.name === city)?.name || city),
                district: formData.district,
                sector: formData.sector,
                addressLine1: formData.addressLine1,
                postalCode: formData.postalCode,
                // Add province if your backend expects it for RW
                province: isRwanda ? State.getStateByCodeAndCountry(state, country)?.name : ""
            };

            // Trigger the mutation
            await addAddress(addressData).unwrap();
            
            toast.success("Shipping address saved!");
            setCurrentStep(2); // Move to Payment Step
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to save address. Please try again.");
            console.error("Address Submission Error:", error);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
        else window.history.back();
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

            <div className="max-w-7xl mx-auto md:px-10 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-10">
                    {/* Progress Tracker */}
                    <div className="flex items-center justify-center gap-8 md:gap-16 max-w-xl mx-auto mb-16 relative px-4">
                        {steps.map((step, idx) => {
                            const isCompleted = currentStep > step.id;
                            const isActive = currentStep === step.id;
                            return (
                                <div key={step.id} className="flex flex-col items-center relative">
                                    <div className={`w-12 h-12 flex items-center justify-center rounded-full font-bold transition-all duration-500 border-2 shadow-md
                                        ${isActive ? "bg-[var(--primary)] border-[var(--primary)] text-white shadow-[var(--primary)]/20" 
                                        : isCompleted ? "bg-[var(--gold-color)] border-[var(--gold-color)] text-white shadow-[var(--gold-color)]/20" 
                                        : "bg-white border-gray-300 text-gray-400"}`}>
                                        {isCompleted ? <Check size={20} /> : <span className="text-sm">{idx + 1}</span>}
                                    </div>
                                    <h2 className={`mt-4 text-[10px] uppercase tracking-[0.25em] font-black transition-colors whitespace-nowrap ${isActive ? "text-(--primary)" : "text-gray-400"}`}>
                                        {step.title}
                                    </h2>
                                    {idx !== steps.length - 1 && (
                                        <div className="absolute top-6 left-[calc(100%+0.5rem)] w-[4rem] h-[2px] bg-gray-300">
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
                                <div>
                                    <div className="grid grid-col-2">
                                        {getAddresses?.map((address: any) => (
                                            <div key={address.id} className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-4">
                                            <p>{address.country}</p>
                                            </div>
                                        ))}
                                    </div>
                                <div className="animate-in fade-in slide-in-from-top-2 duration-500 bg-gray-50/50 p-6 md:p-8 rounded-[2.5rem] border border-gray-100 space-y-6">
                                    <h4 className="font-serif italic text-lg text-(--primary) border-b border-gray-200 pb-2">Delivery Details</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <Input label="Full Name" placeholder="e.g. Jane Doe" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                                        <Input label="Phone Number" placeholder="e.g. +250 788 123 456" value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} />
                                        
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
                                                <Input label="District" placeholder="e.g. Gasabo" value={formData.district} onChange={(e)=>setFormData({...formData, district: e.target.value})} />
                                                <Input label="Sector" placeholder="e.g. Kimironko" value={formData.sector} onChange={(e)=>setFormData({...formData, sector: e.target.value})} />
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
                                            <Input label="House / Street / Landmark" placeholder="e.g. Near Centenary House, Gate 5" value={formData.addressLine1} onChange={(e) => setFormData({...formData, addressLine1: e.target.value})}/>
                                        </div>
                                    </div>
                                </div>
                                    
                                </div>
                            )}

                            {selectedOption === 2 && (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-500 bg-gray-50/50 p-6 md:p-8 rounded-[2.5rem] border border-gray-100 space-y-6">
                                    <h4 className="font-serif italic text-lg text-(--primary) border-b border-gray-200 pb-2">Store Pickup</h4>
                                    <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                        <MapPin size={20} className="text-[var(--gold-color)]" />
                                        <div>
                                            <p className="font-bold text-(--primary)">Kezi Pearl Production</p>
                                            <p className="text-xs text-gray-500">123 Wellness Ave, Kigali</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                                <button onClick={handleBack} className="text-gray-400 hover:text-(--primary) text-xs font-bold uppercase tracking-widest">Cancel</button>
                                
                                {/* 3. UPDATED CONTINUE BUTTON */}
                                <button 
                                    onClick={handleSubmitAddress} 
                                    disabled={isSending}
                                    className="px-12 py-4 rounded-full bg-(--primary) text-white text-[10px] uppercase tracking-widest font-bold shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-70"
                                >
                                    {isSending ? (
                                        <>
                                            <Loader2 size={14} className="animate-spin" /> Saving...
                                        </>
                                    ) : (
                                        "Continue to Payment"
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && <Payment setCurrentStep={setCurrentStep} />}
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-4">
                    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl sticky top-10">
                        <h2 className="text-2xl font-serif italic text-(--primary) mb-8">Summary</h2>
                        <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto">
                            {cartData?.items?.map((item: any) => (
                                <div key={item.id} className="flex gap-4 items-center pb-4 border-b border-gray-50 last:border-0">
                                    <div className="w-16 h-16 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shrink-0">
                                        <img src={item.image} className="w-full h-full object-cover" alt={item.product} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-black text-(--primary) uppercase tracking-tight truncate">{item.product}</p>
                                        <p className="text-xs text-gray-400 italic">Qty: {item.quantity}</p>
                                        <p className="text-xs font-bold text-gray-600 mt-1">{item.totalPrice.toLocaleString()} RWF</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-4 text-sm mb-8 pt-4 border-t border-gray-100">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-bold text-(--primary)">
                                    {cartData?.items ? cartData.items.reduce((sum: number, item: any) => sum + item.totalPrice, 0).toLocaleString() : 0} RWF
                                </span>
                            </div>
                            <div className="flex justify-between items-center italic text-gray-500">
                                <span className="flex items-center gap-2"><Truck size={14}/> Shipping</span>
                                <span className="text-[var(--gold-color)] font-black text-[10px] bg-[var(--gold-color)]/10 px-2 py-1 rounded">FREE</span>
                            </div>
                            <div className="flex justify-between font-serif italic text-(--primary) pt-6 border-t text-2xl">
                                <span>Total</span>
                                <span className="font-bold not-italic">
                                    {cartData?.items ? cartData.items.reduce((sum: number, item: any) => sum + item.totalPrice, 0).toLocaleString() : 0} RWF
                                </span>
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