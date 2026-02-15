import { useState, useEffect } from 'react';
import { MoveLeft, Minus, Plus, Trash2, ShieldCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useGetCurrentUserQuery } from '@/features/auth/authApi';
import { useGetCartItemsQuery, useAddToCartMutation, useRemoveFromCartMutation } from '@/features/cart/cartApi';

function Cart() {
  const token = localStorage.getItem('token');
  const { data: currentUser } = useGetCurrentUserQuery(undefined, { skip: !token });
  const { data: cartItems, isLoading, error, refetch } = useGetCartItemsQuery(undefined);
  const [updateCartItem] = useAddToCartMutation();
  const [removeCartItem] = useRemoveFromCartMutation();


  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    if (cartItems?.items) {
      setCart(cartItems.items);
    }
  }, [cartItems]);

  if (isLoading) {
    return (
      <section className="min-h-screen bg-[var(--secondary-cream-white)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)] mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading your cart...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-[var(--secondary-cream-white)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Failed to load cart items</p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-6 py-2 bg-[var(--primary)] text-white rounded-full"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  const increment = async (id: string) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    const newQuantity = item.quantity + 1;
    
    // Optimistic UI update
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: newQuantity, totalPrice: newQuantity * item.unitPrice }
          : item
      )
    );

    try {
      await updateCartItem({ productId: item.productId, quantity: newQuantity }).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  const decrement = async (id: string) => {
    const item = cart.find(i => i.id === id);
    if (!item || item.quantity <= 1) return;

    const newQuantity = item.quantity - 1;

    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: newQuantity, totalPrice: newQuantity * item.unitPrice }
          : item
      )
    );

    try {
      await updateCartItem({ productId: item.productId, quantity: newQuantity }).unwrap();
      refetch();

    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  const removeItem = async (id: string) => {
    try {
      await removeCartItem(id).unwrap();
      setCart(prev => prev.filter(item => item.id !== id));
      refetch();
      toast.success(`Item removed from cart`);
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
  const shipping = subtotal > 5000 || cart.length === 0 ? 0 : 500;
  const total = subtotal + shipping;

  return (
    <section className="min-h-screen bg-[var(--secondary-cream-white)] pb-24">
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <button
          onClick={() => window.history.back()}
          className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-[var(--primary)] transition-all"
        >
          <MoveLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Shop
        </button>

        <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--bolder-gray)]/30 pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-[var(--primary)] italic">Shopping Bag</h1>
            <p className="text-[11px] text-gray-400 uppercase tracking-widest mt-2">
              Reviewing items for{' '}
              <span className="text-[var(--gold-color)] font-bold">{currentUser?.fullName || currentUser?.email || 'Guest'}</span>
            </p>
          </div>
          <p className="text-xs text-gray-400 italic">{cart.length} Items in your bag</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-8">
          {cart.map(item => (
            <div key={item.id} className="bg-white rounded-[2rem] shadow-sm border border-[var(--bolder-gray)]/30 overflow-hidden">
              <div className="p-8 space-y-8">
                <div className="flex flex-col sm:flex-row gap-8 items-center py-4 border-b border-gray-50 last:border-0">
                  <div className="relative group shrink-0">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border border-[var(--bolder-gray)]/20">
                      <img
                        src={item.image}
                        alt={item.product}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-wrap items-center justify-between w-full">
                    <div className="flex flex-col space-y-2 text-center sm:text-left">
                      <h3 className="text-xl font-serif text-[var(--primary)] italic leading-tight">{item.product}</h3>
                      <div className="flex items-center justify-center gap-4 bg-[var(--secondary-cream-white)] rounded-md px-4 py-2 border border-[var(--bolder-gray)]/20">
                        <button onClick={() => decrement(item.id)} className="text-[var(--primary)] hover:text-[var(--gold-color)] transition-colors">
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold tabular-nums">{item.quantity}</span>
                        <button onClick={() => increment(item.id)} className="text-[var(--primary)] hover:text-[var(--gold-color)] transition-colors">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end gap-4 min-w-[100px]">
                      <p className="font-serif text-lg text-[var(--primary)]">{(item.totalPrice || 0).toLocaleString()} RWF</p>
                      <button onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {cart.length === 0 && (
             <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-200">
                <p className="text-gray-400 font-serif italic">Your bag is empty.</p>
                <Link to="/shop" className="text-[10px] uppercase tracking-widest text-[var(--primary)] font-bold mt-4 inline-block hover:underline">Start Shopping</Link>
             </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 border border-white">
              <Truck className="text-[var(--gold-color)]" size={20} />
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Free Shipping on orders over 5,000 RWF</p>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 border border-white">
              <ShieldCheck className="text-[var(--gold-color)]" size={20} />
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">100% Secure Artisanal Transaction</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-[var(--primary)] text-white p-10 rounded-[2.5rem] shadow-2xl shadow-[var(--primary)]/20 sticky top-32">
            <h2 className="text-2xl font-serif italic mb-8 border-b border-white/10 pb-4">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between text-sm font-light text-white/70 italic">
                <span>Subtotal</span>
                <span>{subtotal.toLocaleString()} RWF</span>
              </div>
              <div className="flex justify-between text-sm font-light text-white/70 italic">
                <span>Shipping Fees</span>
                <span className="text-[var(--gold-color)] font-bold uppercase text-[10px] tracking-widest">
                  {shipping === 0 ? 'Free' : `${shipping} RWF`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-light text-white/70 italic hidden">
                <span>Estimated Tax (5%)</span>
                <span>{Math.floor(subtotal * 0.05).toLocaleString()} RWF</span>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-end">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--gold-color)] font-black">Total</p>
                  <p className="text-3xl font-serif italic mt-1">{total.toLocaleString()} RWF</p>
                </div>
              </div>

              <div className="pt-8 flex flex-col space-y-4">
                <Link
                  to="/checkout"
                  className={`w-full py-5 bg-[var(--gold-color)] text-center rounded-md text-[var(--primary)] hover:bg-white transition-all duration-500 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl ${cart.length === 0 ? 'pointer-events-none opacity-50' : ''}`}
                >
                  Proceed to Checkout
                </Link>
                <Link
                  to="/shop"
                  className="w-full border py-5 rounded-md border-white text-center text-[9px] uppercase tracking-[0.3em] text-white/40 hover:text-[var(--gold-color)] transition-colors font-bold"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;