import { useState } from 'react'
import { MoveLeft, Minus, Plus, Trash2, ShieldCheck, Truck } from 'lucide-react'
import Button from '@/components/Button'
import { Link } from 'react-router-dom'

function Cart() {
  const [count, setCount] = useState(1)

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
              Reviewing items for <span className="text-[var(--gold-color)] font-bold">Semana Shema Parfait</span>
            </p>
          </div>
          <p className="text-xs text-gray-400 italic">3 Items in your bag</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
    
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[2rem] shadow-sm border border-[var(--bolder-gray)]/30 overflow-hidden">
            <div className="p-8 space-y-8">
              <div className="flex flex-col sm:flex-row gap-8 items-center py-4 border-b border-gray-50 last:border-0">
                <div className="relative group shrink-0">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border border-[var(--bolder-gray)]/20">
                    <img 
                      src="https://i.pinimg.com/1200x/35/7e/ec/357eec5d843c708a7ef5b736966c1047.jpg"
                      alt="product name"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-wrap items-center justify-between w-full">

                <div className="flex flex-col space-y-2 text-center sm:text-left">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[var(--gold-color)]">Face Care</span>
                  <h3 className="text-xl font-serif text-[var(--primary)] italic leading-tight">Rosehip Night Serum</h3>
                <div className="flex items-center justify-center gap-4 bg-[var(--secondary-cream-white)] rounded-md px-4 py-2 border border-[var(--bolder-gray)]/20">
                  <button onClick={() => setCount(m => Math.max(1, m-1))} className="text-[var(--primary)] hover:text-[var(--gold-color)] transition-colors">
                    <Minus size={14}/>
                  </button>
                  <span className="w-8 text-center text-sm font-bold tabular-nums">{count}</span>
                  <button onClick={() => setCount(m => m+1)} className="text-[var(--primary)] hover:text-[var(--gold-color)] transition-colors">
                    <Plus size={14}/>
                  </button>
                </div>
                </div>

                <div className="text-right flex flex-col items-end gap-4 min-w-[100px]">
                 <p className="font-serif text-lg text-[var(--primary)]">{(1000 * count).toLocaleString()} RWF</p>
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
                </div>
              </div>
            </div>
          </div>
          
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
                <span>1,000 RWF</span>
              </div>
              <div className="flex justify-between text-sm font-light text-white/70 italic">
                <span>Standard Shipping</span>
                <span className="text-[var(--gold-color)] font-bold uppercase text-[10px] tracking-widest">Free</span>
              </div>
              <div className="flex justify-between text-sm font-light text-white/70 italic">
                <span>Estimated Tax</span>
                <span>500 RWF</span>
              </div>
              
              <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-end">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--gold-color)] font-black"> Total</p>
                  <p className="text-3xl font-serif italic mt-1">1,500 RWF</p>
                </div>
              </div>

              <div className="pt-8 flex flex-col space-y-4">
                <Button className="w-full py-5 rounded-full  text-[var(--primary)] hover:bg-[var(--gold-color)] hover:text-white transition-all duration-500 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                  Proceed to Checkout
                </Button>
                <Link to="/shop" className="w-full border py-5 rounded-md border-white text-center text-[9px] uppercase tracking-[0.3em] text-white/40 hover:text-[var(--gold-color)] transition-colors font-bold">
                  Continue Shopping
                </Link>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  )
}

export default Cart