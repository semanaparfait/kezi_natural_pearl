import { useState, useEffect } from "react";
import { DollarSign, Users, ShoppingCart, Package, ArrowUpRight, TrendingUp,  Mail,
  Phone,  CheckCircle,
  XCircle, } from "lucide-react";
import { useGetCurrentUserQuery } from '@/features/auth/authApi';
import { useGetUsersQuery } from '@/features/users/usersApi';
import {useGetProductsQuery} from '@/features/products/productsApi';
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const { data: currentUser } = useGetCurrentUserQuery(undefined);
  const { data: usersData = [], isLoading, isError, refetch } =
    useGetUsersQuery(undefined);
  const { data: products } = useGetProductsQuery(undefined);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Good Morning");
    else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else if (hour >= 17 && hour < 21) setGreeting("Good Evening");
    else setGreeting("Good Night");
  }, []);

  const stats = [
    { title: "Total Revenue", value: "1,245,000", unit: "RWF", trend: "+12%", icon: DollarSign },
    { title: "New Clients", value: "128", unit: "Users", trend: "+5%", icon: Users },
    { title: "Total Orders", value: "456", unit: "Items", trend: "+18%", icon: ShoppingCart },
    { title: "Stock Level", value: "89", unit: "Skus", trend: "Stable", icon: Package },
  ];

  return (
    <section className="space-y-10 animate-in fade-in duration-700">
      <div className="relative overflow-hidden bg-[var(--primary)] rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-serif italic text-white leading-tight">
              {greeting}, <span className="text-[var(--gold-color)]">{currentUser?.fullName || currentUser?.email}</span>
            </h1>
            <p className="text-white/60 text-sm font-light max-w-md">
              Your artisanal collection is performing beautifully today. Here is the morning overview.
            </p>
          </div>
          
          <button className="w-fit px-8 py-3 bg-white text-[var(--primary)] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[var(--gold-color)] hover:text-white transition-all shadow-lg active:scale-95">
            Visit Boutique
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div 
            key={stat.title} 
            className="group bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[var(--primary)]/5 transition-all duration-500 relative overflow-hidden"
          >
            {/* Subtle Hover Icon */}
            <stat.icon className="absolute -right-2 -bottom-2 w-24 h-24 text-gray-50 group-hover:text-[var(--gold-color)]/10 transition-colors duration-500" />
            
            <div className="relative z-10 space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-gray-50 rounded-2xl text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-300">
                  <stat.icon size={20} />
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${stat.trend.includes('+') ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-50'}`}>
                  {stat.trend}
                </span>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">{stat.title}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-serif font-bold text-[var(--primary)]">{stat.value}</span>
                  <span className="text-[10px] text-gray-400 font-medium uppercase">{stat.unit}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50 flex items-center gap-2 text-[9px] text-gray-400 uppercase tracking-tighter">
                <TrendingUp size={10} /> Updated just now
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
          <h3 className="font-serif italic text-xl text-[var(--primary)]">Recent  Products</h3>
          <button

           className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold-color)] hover:underline flex items-center gap-1">
            View All Products <ArrowUpRight size={14} />
          </button>
        </div>
              <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-600">Product</th>
              <th className="p-4 font-semibold text-gray-600">Price</th>
              <th className="p-4 font-semibold text-gray-600">Stock</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>

            </tr>
          </thead>
          <tbody>
            {products?.slice(-5).reverse().map((product) => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-12 h-12 rounded-lg object-cover bg-gray-200"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[200px]">{product.description.slice(0, 70)}...</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-medium text-gray-700">
                  {product.price.toLocaleString()} RWF
                </td>
                <td className="p-4 text-gray-600">
                  {product.stockQuantity} pcs
                </td>
                <td className="p-4">
                  {product.stockQuantity > 0 ? (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                      In Stock
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">
                      Out of Stock
                    </span>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
          <h3 className="font-serif italic text-xl text-[var(--primary)]">Recent  Products</h3>
          <button

           className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold-color)] hover:underline flex items-center gap-1">
            View All Products <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full ">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {[
                    "User",
                    "Contact",
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
                {usersData.slice(-5).reverse().map((user, index) => (
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
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.fullName}
                          </p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4 text-sm text-gray-600 space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail size={14} />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} />
                        {user.phoneNumber ?? "—"}
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

    </section>
  );
}

export default Dashboard;