import { useState } from "react";
import { useGetCurrentUserQuery } from '@/features/auth/authApi';

import { ArrowLeft, Backpack, ShoppingBag, Wallet,  User,Package,CreditCard,MapPin,HelpCircle,LogOut, } from "lucide-react";
import Profile from "@/pages/UserDashboard/Profile";
import OrderHistory from "./OrderHistory";
import PaymentMethods from "./PaymentMethods";
import Address from "./Address";
import Support from "./Support";
import Logout from "./Logout";
import { Link } from "react-router-dom";

function UserDashboard() {
      const { data: currentUser } = useGetCurrentUserQuery(undefined);
    const [activeNav, setActiveNav] = useState<string>('Profile');
const navs = [
  { name: 'Profile', icon: User, },
  { name: 'Order History', icon: Package },
  { name: 'Payment Methods', icon: CreditCard },
  { name: 'Address', icon: MapPin },
  { name: 'Support', icon: HelpCircle },
  { name: 'Logout', icon: LogOut },
];
    return (
        <section className="min-h-screen bg-gray-50 py-6 px-2 sm:px-6">
            <div className=" md:max-w-6xl mx-auto">
                <Link to="/" className="flex items-center gap-2 text-(--primary) hover:underline mb-6 transition-colors duration-200">
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Back to home</span>
                </Link>
                <div className="bg-(--primary) text-white/90 rounded-3xl shadow-lg p-6 sm:p-10 flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:gap-0">
                    <div className="flex items-center gap-4 md:gap-6 flex-1 min-w-0">
                        <div>
                        <img
                            src={currentUser?.profile || `https://ui-avatars.com/api/?name=${currentUser?.email.charAt(0).toUpperCase()}&background=3f5f50&color=FFFFFF&size=128`}
                            alt={currentUser?.email || currentUser?.fullName}
                            className="rounded-full w-20 h-20 object-cover border-4 border-white shadow-md"
                        />
                        <div className="hidden w-20 h-20 bg-[var(--gold-color)] rounded-full flex items-center justify-center text-white font-semibold">
                            {currentUser?.email.charAt(0).toUpperCase()}
                        </div>
                        </div>
                        <div className="truncate">
                            <h1 className="text-xl sm:text-2xl font-bold truncate">{currentUser?.email}</h1>
                            <p className="text-sm sm:text-base opacity-80 truncate">{currentUser?.phoneNumber}</p>
                            <p className="text-xs sm:text-sm opacity-70">
                                {currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : ''}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 flex-shrink-0 justify-center">
                        <div className="bg-white/10 rounded-xl px-6 py-4 flex flex-col items-center min-w-[110px] hover:bg-white/20 transition">
                            <p className="flex items-center gap-2 text-lg font-semibold"><Wallet /> 2000.00 <span className="text-xs font-normal">RWF</span></p>
                            <p className="text-xs mt-1 opacity-80">Total Amount</p>
                        </div>
                        <div className="bg-white/10 rounded-xl px-6 py-4 flex flex-col items-center min-w-[110px] hover:bg-white/20 transition">
                            <p className="flex items-center gap-2 text-lg font-semibold"><Backpack /> 10</p>
                            <p className="text-xs mt-1 opacity-80">Total Orders</p>
                        </div>
                        <div className="bg-white/10 rounded-xl px-6 py-4 flex flex-col items-center min-w-[110px] hover:bg-white/20 transition">
                            <p className="flex items-center gap-2 text-lg font-semibold"><ShoppingBag /> 50</p>
                            <p className="text-xs mt-1 opacity-80">Total Items</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:max-w-6xl mx-auto mt-8 rounded-3xl shadow py-4 px-6 mb-4">
                <div className="text-white/90">
                {navs.map((nav, index) => (
                <div
                    onClick={()=> setActiveNav(nav.name)}
                    key={index}
                    className={`inline-flex items-center gap-3 px-5 py-3 cursor-pointer
                    ${activeNav === nav.name
                        ? 'bg-(--primary) text-white font-semibold rounded-2xl'
                        : 'text-gray-600 hover:text-(--primary) transition-colors duration-200'
                    }`}
                >
                    <nav.icon className="w-5 h-5" />
                    <span>{nav.name}</span>
                </div>
                ))}

                </div>

            </div>
            <div>
                {activeNav === 'Profile' && (
                    <Profile />
                )}
                {activeNav === 'Order History' && (
                    <OrderHistory/>

                )}
                {activeNav === 'Payment Methods' && (
                    <PaymentMethods/>
                    
                )}
                {activeNav === 'Address' && (
                    <Address/>
                    
                )}
                {activeNav === 'Support' && (
                    <Support/>
                    
                )}
                {activeNav === 'Logout' && (
                    <Logout/>
                    
                )}
            </div>
        </section>
    );
}

export default UserDashboard;