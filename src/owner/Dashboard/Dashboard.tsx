import { useState, useEffect } from "react";
import { DollarSign, Users, ShoppingCart, Package, ArrowUpRight, TrendingUp } from "lucide-react";

function Dashboard() {
  const [greeting, setGreeting] = useState("");

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
            <h1 className="text-4xl md:text-5xl font-serif italic text-white leading-tight">
              {greeting}, <span className="text-[var(--gold-color)]">Semana</span>
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
        {stats.map((stat, i) => (
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

      {/* Placeholder for Recent Activity */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
          <h3 className="font-serif italic text-xl text-[var(--primary)]">Recent Acquisitions</h3>
          <button className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold-color)] hover:underline flex items-center gap-1">
            View All Orders <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="py-12 text-center">
            <p className="text-gray-300 italic font-serif">Awaiting the next artisanal request...</p>
        </div>
      </div>

    </section>
  );
}

export default Dashboard;