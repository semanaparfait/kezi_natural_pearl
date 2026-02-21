
import { Download, Printer, Share2, CheckCircle2, MapPin, Globe, Mail } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Invoice = () => {
  const location = useLocation();
  const invoiceDataFromCheckout: InvoiceData = location.state?.invoiceData;
  console.log("Invoice Data from Checkout:", invoiceDataFromCheckout);

  interface InvoiceData {
    message: string;
    data: {
        orderNumber: string;
        shippingAddressSnapshot: {
            city: string;
            state: string;
            sector: string;
            country: string;
            district: string;
            fullName: string;
            province: string;
            postalCode: string;
            phoneNumber: string;
            addressLine1: string;
        },
        orderStatus: string;
        paymentStatus: string;
        finalAmount: number;
        items: [
            {
                product: {
                    image: string;
                    name: string;
                },
                quantity: number;
                unitPrice: number;
                totalPrice: number;
            }
        ]
    }
}
  
  // Use checkout data if available, otherwise use mock data
  // const invoiceData = invoiceDataFromCheckout || {
  //   id: "#INV-2026-0882",
  //   date: "February 20, 2026",
  //   dueDate: "March 05, 2026",
  //   status: "Paid",
  //   client: {
  //     name: "Alexandria Sterling",
  //     email: "a.sterling@example.com",
  //     address: "123 Elegance Way, Paris, France"
  //   },
  //   items: [
  //     { name: "Premium Branding Package", qty: 1, price: 1200.00 },
  //     { name: "Custom Web Development", qty: 1, price: 2500.00 },
  //     { name: "SEO Optimization (Monthly)", qty: 2, price: 450.00 }
  //   ],
  //   taxRate: 0.10, // 10%
  // };

  // const subtotal = 1000 + 2500 + (2 * 450);
  // const tax = subtotal * invoiceData.taxRate;
  // const total = subtotal + tax;

  // Calculate subtotal, tax, and total based on invoiceDataFromCheckout
  const subtotal = invoiceDataFromCheckout?.data?.items
    ? invoiceDataFromCheckout.data.items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0)
    : 0;

  const total = subtotal ;

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      {/* Action Bar - Hidden on Print */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-wrap justify-between items-center gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-serif italic text-[var(--primary)]">Invoice Details</h1>
          <p className="text-sm text-gray-500">Manage and download your official receipt.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-semibold hover:bg-gray-50 transition-all shadow-sm">
            <Printer size={16} /> Print
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[var(--gold-color)] text-white rounded-full text-sm font-bold shadow-lg shadow-[var(--gold-color)]/20 hover:scale-105 transition-all">
            <Download size={16} /> Download PDF
          </button>
        </div>
      </div>

      {/* Main Invoice Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl shadow-gray-200/60 overflow-hidden border border-gray-100">
        
        {/* Top Decorative Banner */}
        <div className="h-3 bg-[var(--primary)] " />

        <div className="p-8 md:p-16">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-[var(--primary)] rounded-2xl flex items-center justify-center text-[var(--gold-color)] text-2xl font-black italic shadow-xl">
                KEZI
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">KEZI NATURAL PEARL</h2>
                <div className="text-sm text-gray-400 mt-2 space-y-1">
                  <p className="flex items-center gap-2"><MapPin size={12} /> {invoiceDataFromCheckout.data.shippingAddressSnapshot.country}</p>
                  <p className="flex items-center gap-2"><Globe size={12} /> {invoiceDataFromCheckout.data.shippingAddressSnapshot.phoneNumber}</p>
                </div>
              </div>
            </div>

            <div className="text-right space-y-2">
              <div className="inline-block px-4 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-2">
                {invoiceDataFromCheckout.data.orderStatus}
              </div>
              <h3 className="text-4xl font-serif italic text-gray-300"># {invoiceDataFromCheckout.data.orderNumber.slice(0,7)}</h3>
              {/* <p className="text-sm text-gray-500 font-medium">Issued on: {invoiceData.date}</p> */}
            </div>
          </div>

          <hr className="border-gray-50 mb-12" />

          {/* Billing Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-[var(--gold-color)] mb-4">Billed To</p>
              <h4 className="text-lg font-bold text-[var(--primary)]">{invoiceDataFromCheckout.data.shippingAddressSnapshot.fullName}</h4>
              <p className="text-gray-500 text-sm mt-1">{invoiceDataFromCheckout.data.shippingAddressSnapshot.country} , {invoiceDataFromCheckout.data.shippingAddressSnapshot.city},{invoiceDataFromCheckout.data.shippingAddressSnapshot.state}</p>
              {/* is for email */}
              <p className="text-gray-500 text-sm">{invoiceDataFromCheckout.data.shippingAddressSnapshot.phoneNumber}</p> 
            </div>
            <div className="md:text-right">
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-[var(--gold-color)] mb-4">Payment Terms</p>
              <h4 className="text-lg font-bold text-[var(--primary)]">Net 2 Days</h4>
              {/* <p className="text-gray-500 text-sm mt-1">Due Date: {invoiceData.dueDate}</p> */}
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-50">
                  <th className="py-4 text-[10px] uppercase tracking-widest font-black text-gray-400">Description</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-widest font-black text-gray-400 text-center">Qty</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-widest font-black text-gray-400 text-right">Unit Price</th>
                  <th className="py-4 text-[10px] uppercase tracking-widest font-black text-gray-400 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {invoiceDataFromCheckout.data.items.map((item, index) => (
                  <tr key={index} className="group hover:bg-gray-50/50 transition-colors">
                    <div className='flex flex-wrap items-center gap-4 py-6'>
                    <td className="py-6 px-4">
                      <img src={item.product.image} 
                      alt={item.product.name}
                       className="w-12 h-12 object-cover rounded-md" /></td>
                    <td className="py-6 font-bold text-[var(--primary)]">{item.product.name}</td>
                    </div>
                    <td className="py-6 px-4 text-center text-gray-500">{item.quantity}</td>
                    <td className="py-6 px-4 text-right text-gray-500">{item.unitPrice.toLocaleString()} RWF</td>
                    <td className="py-6 text-right font-bold text-[var(--primary)]">{(item.unitPrice * item.quantity).toLocaleString()} RWF</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div className="mt-12 flex justify-end">
            <div className="w-full md:w-64 space-y-3">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>{subtotal.toLocaleString()} RWF</span>
              </div>
              {/* for tax if needed */}
              {/* <div className="flex justify-between text-sm text-gray-500">
                <span>Tax (10%)</span>
                <span>{tax.toLocaleString()} RWF</span>
              </div> */}
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="font-serif italic text-xl text-[var(--primary)]">Total Amount</span>
                <span className="text-2xl font-black text-[var(--gold-color)]">{total.toLocaleString()} RWF</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-20 p-8 bg-[var(--secondary-cream-white)] rounded-[2rem] border border-[var(--gold-color)]/10 text-center">
            <CheckCircle2 className="mx-auto text-[var(--gold-color)] mb-3" size={32} strokeWidth={1} />
            <h5 className="font-serif italic text-lg text-[var(--primary)]">Thank you for your business!</h5>
            <p className="text-xs text-gray-400 mt-2 max-w-sm mx-auto leading-relaxed">
              If you have any questions concerning this invoice, please contact our support at <span className="font-bold">support@kezunatural.com</span>
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-[10px] text-gray-400 uppercase tracking-[0.3em] font-medium print:hidden">
        © 2026 KEZI NATURAL PEARL International
      </div>
    </div>

  );
};

export default Invoice;