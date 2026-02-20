
import { useGetAllOrdersQuery } from '@/features/orders/OrderApi';
import { 
  Package, 
  MoreHorizontal, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Search,
  Filter
} from "lucide-react";

export interface Order {
  id: string;
  createdAt: string;
  updatedAt: string;
  orderNumber: string;
  userId: string | null;
  user: any | null;
  guestId: string;
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
  notes: null;
  trackingNumber: null;
  estimatedDelivery: null;
  deliveredAt: null;
}

const ViewOrders = () => {
  const { data: orders, error, isLoading } = useGetAllOrdersQuery(undefined);


  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
      case 'delivered':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'pending':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'failed':
      case 'cancelled':
        return 'bg-rose-50 text-rose-600 border-rose-100';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--gold-color)]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-rose-50 rounded-[2rem] text-rose-600 flex items-center gap-3">
        <AlertCircle />
        <span>Error loading orders. Please check your connection.</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 lg:p-10 bg-[#fafafa] min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-serif italic text-[var(--primary)]">Order Registry</h1>
          <p className="text-sm text-gray-500 font-light mt-1">Manage and track all customer transactions for Kezi Natural Pearl.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search Order #" 
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-full text-sm focus:ring-2 ring-[var(--gold-color)]/20 transition-all outline-none w-64 shadow-sm"
            />
          </div>
          <button className="p-2.5 bg-white border border-gray-100 rounded-full text-gray-500 hover:text-[var(--primary)] shadow-sm">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Volume', value: orders?.length || 0, icon: Package },
          { label: 'Revenue', value: `$${orders?.reduce((acc: any, curr: any) => acc + curr.finalAmount, 0).toLocaleString()}`, icon: CheckCircle2 },
          { label: 'Pending Action', value: orders?.filter((o: any) => o.orderStatus === 'pending').length || 0, icon: Clock },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[var(--secondary-cream-white)] rounded-2xl flex items-center justify-center text-[var(--gold-color)]">
              <stat.icon size={24} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-black text-gray-400">{stat.label}</p>
              <p className="text-xl font-bold text-[var(--primary)]">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-black text-gray-400 border-b border-gray-100">Order ID</th>
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-black text-gray-400 border-b border-gray-100">Customer</th>
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-black text-gray-400 border-b border-gray-100">Status</th>
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-black text-gray-400 border-b border-gray-100 text-right">Final Amount</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-black text-gray-400 border-b border-gray-100 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders?.map((order: Order) => (
                <tr key={order.id} className="group hover:bg-gray-50/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-[var(--primary)] text-sm">{order.orderNumber}</span>
                      <span className="text-[10px] text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700 text-sm">{order.shippingAddressSnapshot.fullName}</span>
                      <span className="text-[11px] text-gray-400">{order.shippingAddressSnapshot.city}, {order.shippingAddressSnapshot.country}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusStyle(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusStyle(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <span className="font-black text-[var(--primary)] text-sm">
                      ${order.finalAmount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 hover:bg-[var(--secondary-cream-white)] rounded-xl text-[var(--gold-color)] transition-colors" title="View Details">
                        <ExternalLink size={18} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {orders?.length === 0 && (
          <div className="p-20 text-center">
            <Package className="mx-auto text-gray-200 mb-4" size={48} strokeWidth={1} />
            <h3 className="text-lg font-serif italic text-gray-400">No orders found yet</h3>
          </div>
        )}

        {/* Pagination Placeholder */}
        <div className="px-8 py-5 bg-gray-50/30 border-t border-gray-50 flex justify-between items-center">
          <span className="text-xs text-gray-400 font-medium tracking-tight">Showing {orders?.length} transactions</span>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 text-[10px] font-bold border border-gray-200 rounded-full disabled:opacity-30" disabled>PREV</button>
            <button className="px-4 py-1.5 text-[10px] font-bold border border-gray-200 rounded-full disabled:opacity-30" disabled>NEXT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrders;