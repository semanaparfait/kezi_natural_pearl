import { useState } from "react";
import { 
  Package, 
  ArrowLeft ,
  Truck, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ExternalLink,
  Search,
  ShoppingBag
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "@/features/orders/OrderApi";
import Loading from "@/components/Loading";




function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  console.log("Fetched Orders:", orders);
  if(isLoading) {
    return <div><Loading/> </div>;
  }
  if(error) {
    return <div>Error fetching orders</div>;
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-50 text-green-600 border-green-100";
      case "In Transit": return "bg-blue-50 text-blue-600 border-blue-100";
      default: return "bg-amber-50 text-amber-600 border-amber-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered": return <CheckCircle2 size={14} />;
      case "In Transit": return <Truck size={14} />;
      default: return <Clock size={14} />;
    }
  };

  return (
    <section className="min-h-screen bg-[#FAF9F6] ">
      <Navbar />
        <div className="pt-10 pl-10 hidden">
    <Link to="/" className="flex items-center gap-2 text-(--primary) hover:underline mb-6 transition-colors duration-200">
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to home</span>
    </Link>
    </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20  pb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="inline-flexx items-center gap-3 hidden">
              <div className="w-10 h-px bg-[var(--gold-color)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Personal Archive</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-(--primary) italic tracking-tighter mt-5">
              Order History<span className="text-[var(--gold-color)]">.</span>
            </h1>
          </div>

          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[var(--gold-color)] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search order ID..."
              className="w-full bg-white border border-gray-100 py-4 pl-14 pr-6 rounded-full outline-none focus:ring-2 focus:ring-[var(--gold-color)]/10 focus:border-[var(--gold-color)]/30 transition-all text-sm shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-8">
          {orders && orders.length > 0 ? (
            orders.slice(0, 3).map((order) => (
              <div key={order.id} className="group bg-white rounded-[2.5rem] border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
                <div className="p-8 md:px-10 border-b border-gray-50 flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-8">
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Order Identifier</p>
                      <h3 className="text-sm font-black text-(--primary) tracking-tight"># {order.orderNumber.slice(0,7)}</h3>
                    </div>
                    <div className="h-8 w-px bg-gray-100 hidden sm:block" />
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Placed On</p>
                      <p className="text-sm font-bold text-gray-600">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${getStatusStyle(order.orderStatus)}`}>
                      {getStatusIcon(order.orderStatus)}
                      {order.orderStatus}
                    </div>
                    <button className="p-3 rounded-full hover:bg-gray-50 text-gray-300 hover:text-(--primary) transition-all">
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>

                <div className="p-6  grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-8">
                    <div className="flex flex-wrap gap-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-gray-50 pr-6 rounded-2xl border border-gray-100 hover:bg-white transition-colors duration-300">
                          <div className="w-20 h-20 overflow-hidden rounded-2xl border-r border-gray-100">
                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-(--primary) uppercase tracking-tight line-clamp-1">{item.product.name}</p>
                            <p className="text-[10px] text-gray-400 font-bold mt-0.5 uppercase tracking-widest">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4 lg:border-l lg:border-gray-50 lg:pl-10 flex flex-row lg:flex-col justify-between lg:justify-center items-center lg:items-start gap-4">
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                      <p className="text-2xl font-serif italic text-(--primary)">{order.finalAmount} RWF</p>
                    </div>
                    <button className="w-full lg:mt-4 px-8 py-4 bg-gray-50 hover:bg-(--primary) hover:text-white text-(--primary) rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-2">
                      Download Invoice <ArrowRight size={14} />
                    </button>
                  </div>

                </div>
              </div>
            ))
          ) : (

            <div className="py-40 text-center space-y-6 bg-white rounded-[3rem] border border-dashed border-gray-200">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                <ShoppingBag size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-serif italic text-(--primary)">No orders yet</h3>
                <p className="text-gray-400 text-sm mt-2">Your wellness journey starts with your first ritual.</p>
              </div>
              <button className="px-10 py-4 bg-(--primary) text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                Explore Products
              </button>
            </div>
          )}
        </div>

        <div className="mt-20 p-10 bg-[var(--secondary-cream-white)] rounded-[2.5rem] border border-[var(--gold-color)]/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
             <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[var(--gold-color)]">
               <Package size={24} />
             </div>
             <div>
               <h4 className="text-sm font-black text-(--primary) uppercase tracking-widest">Need Assistance?</h4>
               <p className="text-xs text-gray-500 mt-1 leading-relaxed font-medium">Our concierge team is available 24/7 for shipping inquiries.</p>
             </div>
          </div>
          <button className="text-[10px] font-black uppercase tracking-widest text-[var(--gold-color)] hover:text-(--primary) transition-colors border-b-2 border-[var(--gold-color)]/20 pb-1">
            Contact Support
          </button>
        </div>

      </div>

      <Footer />
    </section>
  );
}

export default Orders;