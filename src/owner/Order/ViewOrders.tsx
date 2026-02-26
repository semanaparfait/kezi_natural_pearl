import React, { useState, useMemo } from 'react';
import { 
  useGetAllOrdersQuery, 
  useCancelOrderMutation, 
  useConfirmOrderMutation, 
  useShipOrderMutation, 
  useDeliverOrderMutation 
} from '@/features/orders/OrderApi';
import { 
  Package, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Search,
  Filter,
  X,
  ArrowRight,
  Printer,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface OrderItem {
  product: {
    name: string;
    image?: string;
  };
  quantity: number;
  unitPrice?: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  createdAt: string;
  updatedAt: string;
  orderNumber: string;
  shippingAddressSnapshot: {
    city: string;
    state: string;
    sector: string;
    country: string;
    district: string;
    fullName: string;
    province: string;
    postalCode?: string;
    phoneNumber: string;
    addressLine1: string;
  };
  orderStatus: string;
  paymentStatus: string;
  totalAmount: number;
  shippingCost: number;
  discountAmount: number;
  finalAmount: number;
  notes: string | null;
  trackingNumber: string | null;
  estimatedDelivery: string | null;
  deliveredAt: string | null;
  items?: OrderItem[];
}

const Modal = ({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-[var(--primary)]/60 backdrop-blur-md" 
        onClick={onClose} 
      />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full relative z-10 overflow-hidden"
      >
        <button 
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-[var(--primary)] hover:bg-slate-100 rounded-full transition-all z-20" 
          onClick={onClose}
        >
          <X size={20} />
        </button>
        {children}
      </motion.div>
    </div>
  );
};

const ViewOrders = () => {
  const { data: orders, error, isLoading } = useGetAllOrdersQuery(undefined);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const [cancelOrder] = useCancelOrderMutation();
  const [confirmOrder] = useConfirmOrderMutation();
  const [shipOrder] = useShipOrderMutation();
  const [deliverOrder] = useDeliverOrderMutation();

  // Dynamic Status Logic
  const dynamicStatuses = useMemo(() => {
    if (!orders) return ["All"];
    const unique = Array.from(new Set(orders.map((o: Order) => o.orderStatus)));
    return ["All", ...unique];
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders?.filter((order: Order) => {
      const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            order.shippingAddressSnapshot.fullName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = activeFilter === "All" || order.orderStatus === activeFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, activeFilter]);

  const getStatusStyle = (status: string) => {
    const s = status?.toLowerCase() || '';
    if (['paid', 'delivered', 'shipped', 'confirmed'].includes(s)) 
      return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    if (['pending', 'processing'].includes(s)) 
      return 'bg-amber-50 text-amber-700 border-amber-100';
    if (['failed', 'cancelled', 'refunded'].includes(s)) 
      return 'bg-rose-50 text-rose-700 border-rose-100';
    return 'bg-slate-50 text-slate-600 border-slate-100';
  };

  const handleStatusChange = async (orderId: string, status: string) => {
    if (!status) return;
    setUpdatingOrderId(orderId);
    try {
      if (status === 'Cancel') await cancelOrder(orderId).unwrap();
      else if (status === 'Confirm') await confirmOrder(orderId).unwrap();
      else if (status === 'Ship') await shipOrder(orderId).unwrap();
      else if (status === 'Delivered') await deliverOrder(orderId).unwrap();
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  if (isLoading) return (
    <div className="flex h-screen items-center justify-center bg-[#fcfcfc]">
      <div className="flex flex-col items-center gap-6">
        <div className="w-12 h-12 border-4 border-slate-100 border-t-[var(--primary)] rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Synchronizing Data</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen p-12 bg-[#fcfcfc] flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-white border border-rose-100 rounded-3xl text-center shadow-xl shadow-rose-50">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-xl font-serif italic mb-2">Sync Error</h2>
        <p className="text-sm text-slate-500 mb-6">Unable to retrieve the order registry at this time.</p>
        <button onClick={() => window.location.reload()} className="px-8 py-3 bg-[var(--primary)] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all">Reload</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[var(--primary)] font-sans selection:bg-slate-200 pb-20">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:px-12 space-y-12">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[var(--primary)]"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Master Registry</span>
            </div>
            <h1 className="text-6xl font-serif text-[var(--primary)] tracking-tighter">Orders.</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text" 
                placeholder="Search by reference or name..." 
                className="w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-slate-50 transition-all outline-none shadow-sm placeholder:text-slate-300"
              />
            </div>
          </div>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Registry Volume', value: orders?.length || 0, icon: Package },
            { label: 'Settled Revenue', value: `${orders?.reduce((acc: any, curr: any) => acc + curr.finalAmount, 0).toLocaleString()} RWF`, icon: CheckCircle2 },
            { label: 'Pending Action', value: orders?.filter((o: any) => o.orderStatus === 'pending').length || 0, icon: Clock },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
              <div className="flex justify-between items-start">
                <div className="space-y-4">
                  <p className="text-[10px] uppercase tracking-[0.25em] font-black text-slate-300">{stat.label}</p>
                  <p className="text-4xl font-serif text-[var(--primary)] tracking-tight leading-none">{stat.value}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-[var(--primary)] group-hover:bg-slate-100 transition-all">
                  <stat.icon size={24} strokeWidth={1.2} />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Dynamic Filter Navigation */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
             <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">Filter Records</h3>
             <span className="text-[11px] italic font-serif text-slate-400">{filteredOrders?.length || 0} Entries Found</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {dynamicStatuses.map((status) => {
              const isActive = activeFilter === status;
              return (
                <button
                  key={status}
                  onClick={() => setActiveFilter(status)}
                  className={`relative px-6 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-500
                    ${isActive ? "text-white" : "text-slate-400 bg-white border border-slate-100 hover:border-slate-300"}
                  `}
                >
                  {isActive && (
                    <motion.div layoutId="filterPill" className="absolute inset-0 bg-[var(--primary)] rounded-full z-0" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                  )}
                  <span className="relative z-10">{status}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Orders Table */}
        <section className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 border-b border-slate-100">Reference</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 border-b border-slate-100">Customer</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 border-b border-slate-100">Tracking Status</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 border-b border-slate-100 text-right">Settlement</th>
                  <th className="px-10 py-6 border-b border-slate-100"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredOrders?.map((order: Order) => (
                  <tr key={order.id} className="group hover:bg-slate-50/40 transition-all">
                    <td className="px-10 py-8">
                      <div className="flex flex-col">
                        <span className="font-serif font-bold text-[var(--primary)] text-lg mb-1 tracking-tighter">#{order.orderNumber}</span>
                        <span className="text-[11px] text-slate-400 font-medium tracking-wide">
                          {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 text-sm">{order.shippingAddressSnapshot.fullName}</span>
                        <span className="text-[11px] text-slate-400 italic font-serif">
                          {order.shippingAddressSnapshot.city}, {order.shippingAddressSnapshot.country}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black border uppercase tracking-widest ${getStatusStyle(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-8 py-8 text-right">
                      <span className="font-serif font-bold text-[var(--primary)] text-base italic">
                        {order.finalAmount.toLocaleString()} RWF
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center justify-end gap-4">
                        <div className="relative group/select">
                          <select
                            className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-[var(--primary)] focus:outline-none transition-all cursor-pointer disabled:opacity-50"
                            value=""
                            onChange={e => handleStatusChange(order.id, e.target.value)}
                            disabled={updatingOrderId === order.id}
                          >
                            <option value="">Update</option>
                            <option value="Cancel">Cancel</option>
                            <option value="Confirm">Confirm</option>
                            <option value="Ship">Ship</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                          <ChevronDown size={12} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover/select:text-[var(--primary)] transition-colors" />
                        </div>

                        <button
                          onClick={() => { setSelectedOrder(order); setModalOpen(true); }}
                          className="p-3 bg-[var(--primary)] text-white rounded-xl hover:bg-slate-700 hover:scale-110 active:scale-95 transition-all shadow-lg shadow-slate-100"
                        >
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-10 py-8 bg-slate-50/30 border-t border-slate-100 flex justify-between items-center">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
              Archive Records: {filteredOrders?.length || 0}
            </span>
            <div className="flex items-center gap-8">
              <button className="flex items-center gap-2 text-[11px] font-black text-slate-300 hover:text-[var(--primary)] transition-colors disabled:opacity-20 uppercase tracking-widest group" disabled>
                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Prev
              </button>
              <button className="flex items-center gap-2 text-[11px] font-black text-slate-300 hover:text-[var(--primary)] transition-colors disabled:opacity-20 uppercase tracking-widest group" disabled>
                Next <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {selectedOrder && (
          <div className="flex flex-col max-h-[90vh]">
            <div className="px-12 py-10 border-b border-slate-100 bg-slate-50/30">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Transaction Record</p>
                  <h2 className="text-4xl font-serif text-[var(--primary)] italic tracking-tighter">#{selectedOrder.orderNumber}</h2>
                  <p className="text-xs text-slate-400 font-medium tracking-wide">
                    {new Date(selectedOrder.createdAt).toLocaleString(undefined, { dateStyle: 'full' })}
                  </p>
                </div>
                <span className={`px-5 py-2 rounded-full text-[10px] font-black border uppercase tracking-[0.2em] ${getStatusStyle(selectedOrder.orderStatus)}`}>
                  {selectedOrder.orderStatus}
                </span>
              </div>
            </div>

            <div className="px-12 py-10 overflow-y-auto space-y-12 custom-scrollbar">
              <div className="grid grid-cols-2 gap-16">
                <section>
                  <h3 className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-[var(--primary)]"></span> Client
                  </h3>
                  <div className="space-y-1">
                    <p className="text-base font-bold text-[var(--primary)]">{selectedOrder.shippingAddressSnapshot.fullName}</p>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">
                      {selectedOrder.shippingAddressSnapshot.phoneNumber}<br />
                      {selectedOrder.shippingAddressSnapshot.addressLine1}
                    </p>
                  </div>
                </section>
                <section>
                  <h3 className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-[var(--primary)]"></span> Logistics
                  </h3>
                  <address className="text-sm text-slate-500 not-italic font-light leading-relaxed">
                    {selectedOrder.shippingAddressSnapshot.city}, {selectedOrder.shippingAddressSnapshot.province}<br />
                    {selectedOrder.shippingAddressSnapshot.country}
                  </address>
                </section>
              </div>

              <section>
                <h3 className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.3em] mb-6">Manifest Content</h3>
                <div className="border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50/50">
                      <tr>
                        <th className="px-6 py-4 text-[9px] uppercase font-black text-slate-400 tracking-widest">Item</th>
                        <th className="px-6 py-4 text-[9px] uppercase font-black text-slate-400 tracking-widest text-center">Qty</th>
                        <th className="px-6 py-4 text-[9px] uppercase font-black text-slate-400 tracking-widest text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedOrder.items?.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-5 flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200">
                              {item.product?.image ? (
                                <img src={item.product.image} className="w-full h-full object-cover" alt="" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300"><Package size={20} /></div>
                              )}
                            </div>
                            <span className="font-bold text-slate-800 text-sm">{item.product?.name}</span>
                          </td>
                          <td className="px-6 py-5 text-center text-slate-500 font-medium">{item.quantity}</td>
                          <td className="px-6 py-5 text-right font-serif font-bold text-[var(--primary)] italic">{item.totalPrice?.toLocaleString()} RWF</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="bg-slate-950 text-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-widest font-black">
                    <span>Subtotal</span>
                    <span>RWF {selectedOrder.totalAmount?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-rose-500 uppercase tracking-widest font-black">
                    <span>Incentive Deductions</span>
                    <span>-RWF {selectedOrder.discountAmount?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-widest font-black">
                    <span>Shipping Premium</span>
                    <span>RWF {selectedOrder.shippingCost?.toLocaleString()}</span>
                  </div>
                  <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-2">Total Settlement</p>
                      <p className="text-[10px] text-white/30 font-light italic">All relevant taxes included in full.</p>
                    </div>
                    <p className="text-5xl font-serif italic tracking-tighter">RWF {selectedOrder.finalAmount?.toLocaleString()}</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="p-10 bg-white border-t border-slate-100 flex justify-between items-center">
               <div className="flex flex-col gap-1">
                  <span className="text-[9px] text-slate-300 font-black uppercase tracking-widest">Tracking Reference</span>
                  <span className="text-xs font-mono font-bold text-[var(--primary)] tracking-tighter">{selectedOrder.trackingNumber || 'UNASSIGNED_LOGISTICS'}</span>
               </div>
              <div className="flex gap-4">
                <button onClick={() => setModalOpen(false)} className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[var(--primary)] transition-colors">Close</button>
                <button className="flex items-center gap-3 px-8 py-4 bg-[var(--primary)] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-800 hover:-translate-y-1 transition-all shadow-xl shadow-slate-200">
                  <Printer size={16} />
                  Print Record
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default ViewOrders;