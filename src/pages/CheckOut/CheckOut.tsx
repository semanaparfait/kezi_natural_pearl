import { useState } from "react";
import { MoveLeft, Check, ShieldCheck, Truck, MapPin, LocateFixed, Loader2, Plus, Home, Trash2 } from "lucide-react";
import Input from "@/components/Input";
import { Country, State, City } from "country-state-city";
import Payment from "@/pages/CheckOut/Payment";
import { useGetCartItemsQuery } from '@/features/cart/cartApi'
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUserQuery } from '@/features/auth/authApi';
import {useCheckoutMutation} from  '@/features/cart/cartApi'
import { useGetAddressesQuery, useDeleteAddressMutation,useSetDefaultAddressMutation } from '@/features/Address/Address'

function CheckOut() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedOption, setSelectedOption] = useState(1);
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const [showNewAddressForm, setShowNewAddressForm] = useState(false);


    const { data: cartData } = useGetCartItemsQuery();
    const { data: getAddresses } = useGetAddressesQuery(undefined, { skip: !localStorage.getItem('token') });
    const [deleteAddress, { isLoading: isDeleting }] = useDeleteAddressMutation();
    const [setDefaultAddress] = useSetDefaultAddressMutation();
    const [isSending, setIsSending] = useState(false);
    const [guestAddressSnapshot, setGuestAddressSnapshot] = useState<any>(null);
    const token = localStorage.getItem('token');
    const { data: currentUser } = useGetCurrentUserQuery(undefined, { skip: !token });
    const [checkout] = useCheckoutMutation();
    const [country, setCountry] = useState("RW");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [formData, setFormData] = useState({
        fullName: currentUser?.fullName || "",
        phoneNumber: currentUser?.phoneNumber || "",
        email: currentUser?.email || "",
        addressLine1: "",
        postalCode: "",
        district: "",
        sector: "",
        saveAddress: false,
    });

    const isRwanda = country === "RW";
    const countries = Country.getAllCountries();
    const states = State.getStatesOfCountry(country);
    const cities = City.getCitiesOfState(country, state);

    const steps = [{ id: 1, title: "Shipping" }, { id: 2, title: "Payment" }];

    const shippingOptions = [
        { id: 1, title: "Delivery Address", description: "Doorstep delivery with our reliable service.", icon: <LocateFixed size={23} />, price: 'FREE' },
        { id: 2, title: "Store Pickup", description: "Pick up your order and enjoy an exclusive experience.", icon: <MapPin size={23} /> },
    ];



    const handleDeleteAddress = async (addressId: string) => {
        try {
            await deleteAddress(addressId).unwrap();
            toast.success("Address deleted successfully!");
            if (selectedAddressId === addressId) {
                setSelectedAddressId(null);
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete address.");
        }
    };

    const handleCheckout = async (event: React.MouseEvent<HTMLButtonElement>) => {
        // Only move to payment step, do not place checkout here
        event.preventDefault();
        const token = localStorage.getItem('token');
        if (token) {
            if (!selectedAddressId && !(showNewAddressForm && formData.addressLine1 && formData.fullName && formData.phoneNumber && formData.saveAddress)) {
                toast.error("Please select a shipping address or add a new one.");
                return;
            }
        } else {
            // For guests, set guestAddressSnapshot if form is filled
            if (!guestAddressSnapshot) {
                if (formData.fullName && formData.phoneNumber && formData.addressLine1) {
                    setGuestAddressSnapshot({
                        ...formData,
                        country,
                        state,
                        city,
                    });
                } else {
                    toast.error("Please provide your shipping address.");
                    return;
                }
            }
        }
        setCurrentStep(2);
    };
    const selectClass = "w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[var(--gold-color)] focus:ring-2 focus:ring-[var(--gold-color)]/20 transition-all appearance-none cursor-pointer";

    return (
        <section className="min-h-screen bg-gray-50/30 pb-20">
            {/* Header */}
            <div className="max-w-7xl mx-auto pt-10 px-6 md:px-10">
                <button onClick={() => navigate('/cart')} className="group flex items-center gap-2 text-[10px] uppercase font-black tracking-[0.3em] text-gray-400 hover:text-[var(--primary)] transition-all">
                    <MoveLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
                    {currentStep === 1 ? "Back to cart" : `Back to ${steps[currentStep - 2].title}`}
                </button>
                <h1 className="text-4xl md:text-5xl font-serif text-(--primary) italic pt-5 tracking-tight">Checkout</h1>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-10 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-10">
                    
                    {/* Progress Tracker */}
                    <div className="flex items-center justify-center gap-8 md:gap-16 max-w-xl mx-auto mb-16 relative">
                        {steps.map((step, idx) => {
                            const isCompleted = currentStep > step.id;
                            const isActive = currentStep === step.id;
                            return (
                                <div key={step.id} className="flex flex-col items-center relative z-10">
                                    <div className={`w-12 h-12 flex items-center justify-center rounded-full font-bold transition-all duration-700 border-2 shadow-xl
                                        ${isActive ? "bg-(--primary) border-(--primary) text-white scale-110" 
                                        : isCompleted ? "bg-[var(--gold-color)] border-[var(--gold-color)] text-white" 
                                        : "bg-white border-gray-200 text-gray-300"}`}>
                                        {isCompleted ? <Check size={20} /> : <span className="text-sm font-black">{idx + 1}</span>}
                                    </div>
                                    <h2 className={`mt-4 text-[9px] uppercase tracking-[0.3em] font-black transition-colors ${isActive ? "text-(--primary)" : "text-gray-400"}`}>
                                        {step.title}
                                    </h2>
                                </div>
                            );
                        })}
                        <div className="absolute top-6 left-0 w-full h-[2px] bg-gray-200 -z-0" />
                    </div>

                    {/* STEP 1: SHIPPING CONTENT */}
                    {currentStep === 1 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                            
                            {/* Shipping Options Selection */}
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100 space-y-8">
                                <div className="border-b border-gray-50 pb-6">
                                    <h3 className="text-2xl font-serif italic text-(--primary)">Shipping Method</h3>
                                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Select your preference</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {shippingOptions.map((option) => (
                                        <div key={option.id} onClick={() => setSelectedOption(option.id)}
                                            className={`relative border-2 rounded-[2rem] p-6 cursor-pointer transition-all duration-500 flex flex-col gap-4 ${
                                                selectedOption === option.id ? 'border-(--primary) bg-[var(--secondary-cream-white)] shadow-inner' : 'border-gray-50 hover:bg-gray-50'
                                            }`}>
                                            <div className="flex justify-between items-center">
                                                <div className={`p-3 rounded-2xl ${selectedOption === option.id ? 'bg-white text-(--primary) shadow-sm' : 'bg-gray-100 text-gray-400'}`}>
                                                    {option.icon}
                                                </div>
                                                {option.price && <span className="text-[10px] font-black text-[var(--gold-color)] uppercase tracking-widest">{option.price}</span>}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-(--primary)">{option.title}</h3>
                                                <p className="text-xs text-gray-500 leading-relaxed">{option.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            {selectedOption === 1 && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between px-2">
                                        <h3 className="text-xl font-serif italic text-(--primary)">Saved Addresses</h3>
                                        <button 
                                            onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                                            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--gold-color)] hover:text-(--primary) transition-colors"
                                        >
                                            {showNewAddressForm ? "Select from list" : <><Plus size={14}/> Add New Address</>}
                                        </button>
                                    </div>

                                    {!showNewAddressForm ? (

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {getAddresses?.map((address: any) => {
                                                const isSelected = selectedAddressId === address.id;
                                                
                                                const handleSelectAddress = async (addressId: string) => {
                                                    setSelectedAddressId(addressId);
                                                    try {
                                                        await setDefaultAddress(addressId).unwrap();
                                                        toast.success("Address set as default!");
                                                    } catch (error: any) {
                                                        toast.error(error?.data?.message || "Failed to set default address");
                                                    }
                                                };
                                                
                                                return (
                                                    <div key={address.id} onClick={() => handleSelectAddress(address.id)}
                                                        className={`group relative cursor-pointer rounded-[2rem] p-8 transition-all duration-500 border-2 
                                                        ${isSelected ? "border-(--primary) bg-[var(--secondary-cream-white)] shadow-2xl scale-[1.02]" 
                                                        : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-md"}`}>
                                                        <div className={`absolute top-6 right-6 flex items-center gap-2 px-3 py-1 rounded-full transition-all duration-300
                                                            ${isSelected ? "bg-(--primary)" : "bg-gray-100 opacity-0 group-hover:opacity-100"}`}>
                                                            <span className={`text-[9px] font-black uppercase tracking-tighter ${isSelected ? "text-white" : "text-gray-400"}`}>
                                                                {isSelected ? "Selected" : "Deliver Here"}
                                                            </span>
                                                            {isSelected && <Check size={10} className="text-white" />}
                                                        </div>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteAddress(address.id);
                                                            }}
                                                            disabled={isDeleting}
                                                            className="absolute bottom-6 right-6 p-2 rounded-lg bg-red-50 text-red-500  group-hover:opacity-100 transition-all duration-300 hover:bg-red-100 disabled:opacity-50"
                                                            title="Delete address"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                        <div className="flex flex-col gap-4">
                                                            <div className="flex items-center gap-4">
                                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isSelected ? "bg-white text-(--primary)" : "bg-gray-50 text-gray-400"}`}>
                                                                    <Home size={20} />
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-bold text-(--primary) tracking-tight">{address.fullName}</h4>
                                                                    <p className="text-[10px] font-black text-[var(--gold-color)] uppercase tracking-widest">{address.country}</p>
                                                                </div>
                                                            </div>
                                                            <div className="pl-16 space-y-1">
                                                                <p className="text-sm text-gray-600 font-medium">{address.addressLine1}</p>
                                                                <p className="text-xs text-gray-500">{address.district || address.city}, {address.state}</p>
                                                                <p className="text-xs font-bold text-gray-700 mt-2">{address.phoneNumber}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        /* NEW ADDRESS FORM */
                                        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100 animate-in zoom-in-95 duration-500 ">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <Input label="Full Name" placeholder="e.g. Jane Doe" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                                                <Input label="Phone Number" placeholder="e.g. +250 788..." value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} />
                                                <Input label="Email Address" placeholder="e.g. jane.doe@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                                                <div className="space-y-1">
                                                    <label className="text-[10px] uppercase font-black text-gray-400 ml-1">Country</label>
                                                    <select className={selectClass} value={country} onChange={(e) => { setCountry(e.target.value); setState(""); setCity(""); }}>
                                                        {countries.map((c) => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>)}
                                                    </select>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] uppercase font-black text-gray-400 ml-1">State / Province</label>
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

                                            </div>
                                                <div className="w-full pt-5 ">
                                                    <label className="text-[10px] uppercase font-black text-gray-400 ml-1">Street Address</label>
                                                    <textarea className="border rounded-lg resize-none p-5 border-gray-300 w-full"  rows={5} placeholder="e.g. Near Centenary House" value={formData.addressLine1} onChange={(e) => setFormData({...formData, addressLine1: e.target.value})}></textarea>
                                                    {/* <Input label="House / Street " fullWidth placeholder="e.g. Near Centenary House" value={formData.addressLine1} onChange={(e) => setFormData({...formData, addressLine1: e.target.value})}/> */}
                                                </div>
                                                {currentUser && (
                                                <div className="pt-4">
                                                    <input type="checkbox" name="saveAddress" id="saveAddress" className="mr-2" checked={formData.saveAddress} onChange={(e) => setFormData({...formData, saveAddress: e.target.checked})} />
                                                    <label htmlFor="saveAddress" className="text-sm text-gray-500">Do you want to save this address for future orders?</label>
                                                </div>
                                                    )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Store Pickup View */}
                            {selectedOption === 2 && (
                                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex items-center gap-6 animate-in fade-in duration-500">
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-[var(--secondary-cream-white)] flex items-center justify-center text-(--primary) shadow-inner">
                                        <MapPin size={28} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xl text-(--primary) tracking-tight">Kezi Pearl Production</h4>
                                        <p className="text-sm text-gray-500">123 Wellness Ave, Kigali, Rwanda</p>
                                        <p className="text-[10px] font-black text-[var(--gold-color)] uppercase tracking-widest mt-1">Ready in 24 hours</p>
                                    </div>
                                </div>
                            )}

                            {/* Action Footer */}
                            <div className="pt-10 flex justify-between items-center">
                                <button onClick={() => navigate('/cart')} className="text-gray-400 hover:text-[var(--primary)] text-xs font-black uppercase tracking-widest transition-colors">Cancel</button>
                                <button 
                                    onClick={handleCheckout} 
                                    disabled={isSending || (!selectedAddressId && !showNewAddressForm && selectedOption === 1)}
                                    className="px-14 py-5 rounded-full bg-(--primary) text-white text-[11px] uppercase tracking-[0.2em] font-black shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-40 disabled:hover:scale-100"
                                >
                                    {isSending ? <Loader2 size={16} className="animate-spin" /> : "Continue to Payment"}
                                </button>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <Payment
                            setCurrentStep={setCurrentStep}
                            // Pass address and cart info to Payment
                            addressData={selectedAddressId ? { addressId: selectedAddressId } : showNewAddressForm && formData.saveAddress ? {
                                shippingAddressSnapshot: {
                                    ...formData,
                                    country,
                                    state,
                                    city,
                                },
                                saveAddress: formData.saveAddress,
                            } : guestAddressSnapshot ? { shippingAddressSnapshot: guestAddressSnapshot } : null}
                            cartData={cartData}
                        />
                    )}
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-4">
                    <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-2xl sticky top-10">
                        <h2 className="text-3xl font-serif italic text-(--primary) mb-10 border-b border-gray-50 pb-6">Summary</h2>
                        <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {cartData?.items?.map((item: any) => (
                                <div key={item.id} className="flex gap-5 items-center">
                                    <div className="w-20 h-20 bg-gray-50 rounded-[1.5rem] overflow-hidden border border-gray-100 shrink-0 shadow-sm">
                                        <img src={item.product.image} className="w-full h-full object-cover" alt={item.product.name} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-black text-[var(--primary)] uppercase tracking-tight truncate">{item.product.name}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Quantity: {item.quantity}</p>
                                        <p className="text-xs font-black text-gray-800 mt-2">{item.totalPrice.toLocaleString()} RWF</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-5 text-sm mb-10 pt-6 border-t border-gray-100">
                            <div className="flex justify-between text-gray-500 font-medium">
                                <span>Subtotal</span>
                                <span className="text-[var(--primary)] font-black">{cartData?.items ? cartData.items.reduce((sum: number, item: any) => sum + item.totalPrice, 0).toLocaleString() : 0} RWF</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-500 italic">
                                <span className="flex items-center gap-2"><Truck size={16}/> Shipping</span>
                                <span className="text-(--gold-color) font-black text-[10px] bg-(--gold-color)/10 px-3 py-1 rounded-full uppercase">Complimentary</span>
                            </div>
                            <div className="flex justify-between font-serif italic text-(--primary) pt-8 border-t text-3xl">
                                <span>Total</span>
                                <span className="font-bold not-italic">{cartData?.items ? cartData.items.reduce((sum: number, item: any) => sum + item.totalPrice, 0).toLocaleString() : 0} RWF</span>
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-[2rem] flex items-center gap-5 border border-gray-100">
                            <ShieldCheck size={28} className="text-(--gold-color)" />
                            <p className="text-[10px] uppercase tracking-[0.15em] font-black text-gray-400 leading-relaxed">Secure, Encrypted Checkout</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CheckOut;