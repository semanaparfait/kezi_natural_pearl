import React, { useState } from 'react';
import { useGetAllOrdersQuery } from '@/features/orders/OrderApi';
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
  ChevronRight
} from "lucide-react";


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
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300">
        <button 
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all z-20" 
          onClick={onClose}
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

const ViewOrders = () => {
  const { data: orders, error, isLoading } = useGetAllOrdersQuery(undefined);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getStatusStyle = (status: string) => {
    const s = status?.toLowerCase() || '';
    if (['paid', 'delivered', 'shipped'].includes(s)) 
      return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    if (['pending', 'processing'].includes(s)) 
      return 'bg-amber-50 text-amber-700 border-amber-100';
    if (['failed', 'cancelled', 'refunded'].includes(s)) 
      return 'bg-rose-50 text-rose-700 border-rose-100';
    return 'bg-slate-50 text-slate-600 border-slate-100';
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#fcfcfc]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-slate-900"></div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Loading Registry</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-12 bg-[#fcfcfc]">
        <div className="max-w-md mx-auto p-6 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 flex items-center gap-4">
          <AlertCircle size={24} />
          <div className="text-sm font-medium">Unable to synchronize order data. Please refresh.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-900 font-sans selection:bg-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:px-12 space-y-12">

        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-2">
            <h1 className="text-5xl font-serif text-slate-900 tracking-tight">Registry</h1>
            <p className="text-slate-500 font-light max-w-sm leading-relaxed">
              Consolidated transaction record for <span className="italic font-serif text-slate-800">Kezi Natural Pearl</span>.
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search references..." 
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-slate-100 transition-all outline-none shadow-sm placeholder:text-slate-400"
              />
            </div>
            <button className="flex items-center gap-2 px-5 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
              <Filter size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Filter</span>
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Total Volume', value: orders?.length || 0, icon: Package },
            { label: 'Revenue ', value: `${orders?.reduce((acc: any, curr: any) => acc + curr.finalAmount, 0).toLocaleString()} RWF`, icon: CheckCircle2 },
            { label: 'Open Inquiries', value: orders?.filter((o: any) => o.orderStatus === 'pending').length || 0, icon: Clock },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm group hover:shadow-md transition-all duration-500">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">{stat.label}</p>
                  <p className="text-4xl font-serif text-slate-900 leading-none">{stat.value}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl text-slate-300 group-hover:text-slate-900 group-hover:bg-slate-100 transition-all">
                  <stat.icon size={22} strokeWidth={1.5} />
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 border-b border-slate-100">Reference</th>
                  <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 border-b border-slate-100">Customer</th>
                  <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 border-b border-slate-100">Status Tracking</th>
                  <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 border-b border-slate-100 text-right">Settlement</th>
                  <th className="px-8 py-5 border-b border-slate-100"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {orders?.map((order: Order) => (
                  <tr key={order.id} className="group hover:bg-slate-50/30 transition-all">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-serif font-bold text-slate-900 text-base mb-1">#{order.orderNumber}</span>
                        <span className="text-[11px] text-slate-400 font-medium tracking-wide">
                          {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800 text-sm leading-snug">{order.shippingAddressSnapshot.fullName}</span>
                        <span className="text-[11px] text-slate-400 italic font-serif">
                          {order.shippingAddressSnapshot.city}, {order.shippingAddressSnapshot.country}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex gap-2">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border uppercase tracking-widest ${getStatusStyle(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border uppercase tracking-widest ${getStatusStyle(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <span className="font-bold text-slate-900 text-sm">
                        {order.finalAmount.toLocaleString()} RWF
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button
                        onClick={() => { setSelectedOrder(order); setModalOpen(true); }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all group/btn"
                      >
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">View Record</span>
                        <ArrowRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-8 py-6 bg-slate-50/30 border-t border-slate-100 flex justify-between items-center">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.15em]">
              Showing {orders?.length || 0} entries
            </span>
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-900 transition-colors disabled:opacity-30 uppercase tracking-widest group" disabled>
                <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Prev
              </button>
              <button className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-900 transition-colors disabled:opacity-30 uppercase tracking-widest group" disabled>
                Next <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </section>
      </div>


      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {selectedOrder && (
          <div className="flex flex-col max-h-[90vh]">

            <div className="px-10 py-8 border-b border-slate-100 bg-slate-50/50">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-2">Internal Record</p>
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-serif text-slate-900">Order #{selectedOrder.orderNumber}</h2>
                  <p className="text-xs text-slate-500 mt-1 font-light tracking-wide">
                    Authored on {new Date(selectedOrder.createdAt).toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' })}
                  </p>
                </div>
                <div className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border uppercase tracking-[0.15em] ${getStatusStyle(selectedOrder.orderStatus)}`}>
                  {selectedOrder.orderStatus}
                </div>
              </div>
            </div>

            <div className="px-10 py-10 overflow-y-auto space-y-10 custom-scrollbar">
              <div className="grid grid-cols-2 gap-12">
                <section>
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 border-b border-slate-50 pb-2">Client Information</h3>
                  <p className="text-sm font-bold text-slate-900">{selectedOrder.shippingAddressSnapshot.fullName}</p>
                  <p className="text-sm text-slate-600 mt-1 font-light leading-relaxed">
                    {selectedOrder.shippingAddressSnapshot.phoneNumber}<br />
                    {selectedOrder.shippingAddressSnapshot.addressLine1}
                  </p>
                </section>
                <section>
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 border-b border-slate-50 pb-2">Logistics</h3>
                  <address className="text-sm text-slate-600 not-italic font-light leading-relaxed">
                    {selectedOrder.shippingAddressSnapshot.city}, {selectedOrder.shippingAddressSnapshot.province}<br />
                    {selectedOrder.shippingAddressSnapshot.country}
                  </address>
                </section>
              </div>

              <section>
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Manifest</h3>
                  <span className="text-[10px] text-slate-400 font-medium italic">{(selectedOrder.items?.length || 0)} unique line items</span>
                </div>
                <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50/50">
                      <tr>
                        <th className="px-4 py-3 text-[9px] uppercase font-bold text-slate-400 tracking-widest">Item</th>
                        <th className="px-4 py-3 text-[9px] uppercase font-bold text-slate-400 tracking-widest text-center">Qty</th>
                        <th className="px-4 py-3 text-[9px] uppercase font-bold text-slate-400 tracking-widest text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedOrder.items?.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-50 rounded border border-slate-100 overflow-hidden flex-shrink-0">
                              {item.product?.image ? (
                                <img src={item.product.image} className="w-full h-full object-cover" alt="" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-200"><Package size={16} /></div>
                              )}
                            </div>
                            <span className="font-medium text-slate-800 line-clamp-1">{item.product?.name}</span>
                          </td>
                          <td className="px-4 py-4 text-center text-slate-600 font-light">{item.quantity}</td>
                          <td className="px-4 py-4 text-right font-semibold text-slate-900">{item.totalPrice?.toLocaleString()} RWF</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Financial Summary */}
              <section className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl shadow-slate-200">
                <div className="space-y-3">
                  <div className="flex justify-between text-xs text-slate-400 uppercase tracking-widest">
                    <span>Gross Total</span>
                    <span>${selectedOrder.totalAmount?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-rose-400 uppercase tracking-widest">
                    <span>Adjustments/Discounts</span>
                    <span>-${selectedOrder.discountAmount?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 uppercase tracking-widest">
                    <span>Shipping Premium</span>
                    <span>${selectedOrder.shippingCost?.toLocaleString()}</span>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-800 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-1">Total Settlement</p>
                      <p className="text-xs text-slate-400 font-light italic">All taxes included where applicable.</p>
                    </div>
                    <p className="text-4xl font-serif tracking-tighter">${selectedOrder.finalAmount?.toLocaleString()}</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Modal Footer */}
            <div className="p-8 bg-white border-t border-slate-100 flex justify-between items-center">
               <div className="flex items-center gap-4">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Tracking:</span>
                  <span className="text-xs font-mono text-slate-600">{selectedOrder.trackingNumber || 'NOT_ASSIGNED'}</span>
               </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
                >
                  Dismiss
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-slate-200">
                  <Printer size={14} />
                  Print Invoice
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Custom Scrollbar CSS */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default ViewOrders;