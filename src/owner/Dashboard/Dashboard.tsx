import { useState, useEffect } from "react";
import { DollarSign, Users, ShoppingCart, Package, ArrowUpRight, Mail, Phone, CheckCircle, XCircle, Calendar as CalendarIcon, AlertCircle } from "lucide-react";
import { useGetCurrentUserQuery } from '@/features/auth/authApi';
import { useGetUsersQuery } from '@/features/users/usersApi';
import { useGetProductsQuery } from '@/features/products/productsApi';

function Dashboard() {

  const [greeting, setGreeting] = useState("");
  const { data: currentUser } = useGetCurrentUserQuery(undefined);
  const { data: usersData = [] } = useGetUsersQuery(undefined);
  const { data: products = [] } = useGetProductsQuery(undefined);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Good Morning");
    else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else if (hour >= 17 && hour < 21) setGreeting("Good Evening");
    else setGreeting("Good Night");
  }, []);

  const stats = [
    { title: "Total Revenue", value: "1,245,000", unit: "RWF", trend: "+12%", icon: DollarSign },
    { title: "New Clients", value: usersData.length, unit: "Users", trend: "+5%", icon: Users },
    { title: "Total Orders", value: "456", unit: "Items", trend: "+18%", icon: ShoppingCart },
    { title: "Products", value: products.length, unit: "Skus", trend: "Stable", icon: Package },
  ];

  const outOfStock = products?.filter(p => (p?.stockQuantity ?? 0) <= 0) ?? [];

  return (
    <main className="flex flex-col xl:flex-row gap-8 p-4 md:p-0">
      
      {/* LEFT AREA: DASHBOARD OVERVIEW */}
      <section className="flex-1 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Editorial Welcome Header */}
        <div className="relative overflow-hidden bg-[var(--primary)] rounded-[2.5rem] p-8 md:p-12 shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold-color)] font-bold">Administrative Portal</p>
              <h1 className="text-3xl md:text-4xl font-serif italic text-white leading-tight">
                {greeting}, <span className="text-[var(--gold-color)]">{currentUser?.fullName || "Director"}</span>
              </h1>
              <p className="text-white/60 text-sm font-light max-w-md">Your collection is flourishing. Here is your overview for today.</p>
            </div>
            <button className="w-fit px-8 py-3 bg-white text-[var(--primary)] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[var(--gold-color)] hover:text-white transition-all shadow-lg active:scale-95">
              Live Boutique
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
              <stat.icon className="absolute -right-2 -bottom-2 w-16 h-16 text-gray-50 group-hover:text-[var(--gold-color)]/10 transition-colors" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-gray-50 rounded-2xl text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all">
                    <stat.icon size={18} />
                  </div>
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">{stat.trend}</span>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{stat.title}</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-serif font-bold text-[var(--primary)]">{stat.value}</span>
                  <span className="text-[9px] text-gray-400 font-medium uppercase">{stat.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Inventory & Users Split View */}
        <div className="grid grid-cols-1 gap-8">
          {/* Recent Products Table */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
              <h3 className="font-serif italic text-xl text-[var(--primary)]">Recent Additions</h3>
              <button className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold-color)] hover:underline flex items-center gap-1">
                View Inventory <ArrowUpRight size={14} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-gray-400">
                    <th className="pb-4">Product</th>
                    <th className="pb-4">Price</th>
                    <th className="pb-4">Stock</th>
                    <th className="pb-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products?.slice(-4).reverse().map((product) => (
                    <tr key={product.id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <img src={product.images?.[0]} className="w-10 h-10 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-gray-800 truncate">{product.name}</p>
                            <p className="text-[10px] text-gray-400 line-clamp-1">{product.description?.slice(0, 40)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-sm font-bold text-gray-700">{product.price?.toLocaleString()} RWF</td>
                      <td className="py-4 text-sm text-gray-500">{product.stockQuantity} pcs</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${product.stockQuantity > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                          {product.stockQuantity > 0 ? "Available" : "Sold Out"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Registrations View */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
              <h3 className="font-serif italic text-xl text-[var(--primary)]">Recent Registrations</h3>
              <button className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold-color)] hover:underline">CRM Portal</button>
            </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full ">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {[
                    "User",
                    "Role",
                    "Status",
                    "Verified",

                  ].map(h => (
                    <th
                      key={h}
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y">
                {usersData.map((user, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition"
                  >
                    {/* User */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.profile ? (
                          <img
                            src={user.profile}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center font-semibold text-white">
                            {user.email?.charAt(0).toUpperCase()}
                          </div>
                        )}
                    <div className="px-6  text-sm text-gray-600 space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail size={14} />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} />
                        {user.phoneNumber ?? "—"}
                      </div>
                    </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.status === "active" ? (
                          <CheckCircle size={12} />
                        ) : (
                          <XCircle size={12} />
                        )}
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          user.emailVerifiedAt
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.emailVerifiedAt ? (
                          <CheckCircle size={12} />
                        ) : (
                          <XCircle size={12} />
                        )}
                        {user.emailVerifiedAt ? "Verified" : "Unverified"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t text-sm text-gray-600">
            Showing {usersData.length} users
          </div>
        </div>
          </div>
        </div>
      </section>

      {/* RIGHT SIDEBAR: MANAGEMENT TOOLS */}
      <aside className="w-full xl:w-80 space-y-8">
        
        {/* Professional Calendar Widget */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <CalendarIcon size={18} className="text-[var(--gold-color)]" />
            <h4 className="font-serif italic text-lg text-[var(--primary)]">Operational Schedule</h4>
          </div>
          <div className="flex gap-4">
            <div className="bg-[var(--primary)] text-white p-4 rounded-3xl text-center min-w-[70px] shadow-lg shadow-[var(--primary)]/20">
              <p className="text-[10px] uppercase font-bold opacity-70">Feb</p>
              <p className="text-2xl font-bold font-serif">14</p>
              <p className="text-[9px] uppercase font-bold mt-1">Today</p>
            </div>
            <div className="flex-1 space-y-3">
              <div className="p-3 bg-gray-50 rounded-2xl border-l-4 border-[var(--gold-color)]">
                <p className="text-[10px] font-bold text-gray-400 uppercase">10:00 AM</p>
                <p className="text-xs font-bold text-[var(--primary)]">Inventory Audit</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl border-l-4 border-blue-200">
                <p className="text-[10px] font-bold text-gray-400 uppercase">03:00 PM</p>
                <p className="text-xs font-bold text-[var(--primary)] opacity-50 line-through">Supplier Meet</p>
              </div>
            </div>
          </div>
        </div>

        {/* Restock Alerts - Focused and Minimalist */}
        <div className="bg-red-50/50 rounded-[2.5rem] p-8 border border-red-100 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-red-900">
              <AlertCircle size={18} />
              <h4 className="font-serif italic text-lg leading-none">Restock Alerts</h4>
            </div>
            <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black">{outOfStock.length}</span>
          </div>
          <div className="space-y-3">
            {outOfStock.length > 0 ? outOfStock.slice(0, 3).map(p => (
              <div key={p.id} className="flex items-center gap-3 p-3 bg-white rounded-2xl shadow-sm border border-red-50 group cursor-pointer hover:border-red-200 transition-all">
                <img src={p.images?.[0]} className="w-8 h-8 rounded-lg object-cover grayscale opacity-60" alt="" />
                <p className="text-[10px] font-bold text-gray-700 truncate flex-1 uppercase tracking-tighter">{p.name}</p>
                <ArrowUpRight size={12} className="text-red-300 group-hover:text-red-500" />
              </div>
            )) : (
              <p className="text-xs text-red-400 italic text-center py-4">Inventory levels are stable.</p>
            )}
          </div>
        </div>

        {/* Brand Identity Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
           <Package className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 rotate-12 transition-transform group-hover:scale-110" />
           <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-[var(--gold-color)] mb-2">Artisanal Standard</p>
           <h4 className="font-serif italic text-xl mb-4">Pure Nature. <br/>Pure Rwanda.</h4>
           <p className="text-xs text-white/50 leading-relaxed font-light">Ensure every fulfillment cycle adheres to the artisanal promise of the Kezi collection.</p>
        </div>

      </aside>
    </main>
  );
}

export default Dashboard;