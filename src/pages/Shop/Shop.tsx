import { useState } from "react";
import { ChevronRight, Filter, ShoppingBag, Heart, Eye, ArrowUpDown, Zap } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";

const products = [
  { id: 1, name: "Lavender Bliss Soap", price: 1200, oldPrice: 1500,  image: "https://i.pinimg.com/736x/47/51/3e/47513e1567c15cee9f3c3d9d2842f413.jpg", category: "Lavender", stock: 0 },
  { id: 2, name: "Citrus Zest Bar", price: 1000, oldPrice: 1300,  image: "https://i.pinimg.com/736x/62/d2/26/62d2268fcfae76758a799a43fa1428a6.jpg", category: "Citrus", stock: 12 },
  { id: 3, name: "Oatmeal Honey Soap", price: 1400, oldPrice: 1800, image: "https://i.pinimg.com/736x/09/0a/71/090a71baf8ff308245d6596d09e5e27d.jpg", category: "Oatmeal", stock: 3 },
  { id: 4, name: "Charcoal Detox Bar", price: 1500, oldPrice: 2000, image: "https://i.pinimg.com/1200x/c3/a3/d2/c3a3d2a770550aedf72e94c04b8cb867.jpg" , category: "Charcoal", stock: 20 },
  { id: 5, name: "Rose Petal Soap", price: 1300, oldPrice: 1600, image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=600", category: "Rose", stock: 8 },
];

const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("asc");

  const filtered = products.filter(p => selectedCategory === "All" || p.category === selectedCategory);
  const sorted = [...filtered].sort((a, b) => sort === "asc" ? a.price - b.price : b.price - a.price);

  return (
    <div className="min-h-screen bg-[var(--secondary-cream-white)] text-gray-800">
      <div className="bg-[var(--primary)] shadow-md"><Navbar /></div>
      <header className="relative py-20 px-6 overflow-hidden border-b border-[var(--bolder-gray)]">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
            <h1 className="text-5xl md:text-6xl font-serif text-[var(--primary)] mb-4 tracking-tight">Our Collection</h1>
            <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-[var(--gold-color)] font-bold">
                <span>Natural</span> <span className="w-8 h-[1px] bg-[var(--gold-color)]"></span> 
                <span>Organic</span> <span className="w-8 h-[1px] bg-[var(--gold-color)]"></span> 
                <span>Handmade</span>
            </div>
        </div>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] font-serif text-black/[0.03] select-none pointer-events-none uppercase tracking-widest">
            Shop
        </span>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
<aside className="lg:w-64 space-y-12">
  <div>
    <h2 className="text-[11px] uppercase tracking-[0.25em] font-bold text-[var(--primary)] mb-8 flex items-center justify-between">
      Categories
      <span className="h-[1px] w-12 bg-[var(--bolder-gray)]"></span>
    </h2>
    
    <div className="space-y-4">
      {categories.map((cat) => (
        <label 
          key={cat} 
          className="group flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={selectedCategory === cat}
                onChange={() => setSelectedCategory(cat)}
                className="peer appearance-none w-4 h-4 border border-[var(--bolder-gray)] rounded-sm bg-white checked:bg-[var(--primary)] checked:border-[var(--primary)] transition-all cursor-pointer"
              />
              <svg 
                className="absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"
              >
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className={`text-sm transition-colors ${selectedCategory === cat ? 'text-black font-semibold' : 'text-gray-500 group-hover:text-[var(--primary)]'}`}>
              {cat}
            </span>
          </div>
          <span className="text-[10px] font-bold text-gray-300 group-hover:text-[var(--gold-color)]">
            {products.filter(p => p.category === cat || cat === "All").length}
          </span>
        </label>
      ))}
    </div>
  </div>
  <div>
    <h2 className="text-[11px] uppercase tracking-[0.25em] font-bold text-[var(--primary)] mb-8 flex items-center justify-between">
      Price Range
      <span className="h-[1px] w-12 bg-[var(--bolder-gray)]"></span>
    </h2>
    
    <div className="space-y-4">
      {[
        { label: "Under 1,000 RWF", range: "0-1000" },
        { label: "1,000 - 2,000 RWF", range: "1000-2000" },
        { label: "2,000 - 5,000 RWF", range: "2000-5000" },
        { label: "Above 5,000 RWF", range: "5000-up" }
      ].map((price) => (
        <label 
          key={price.range} 
          className="group flex items-center cursor-pointer"
        >
          <div className="relative flex items-center justify-center mr-3">
            <input
              type="checkbox"
              className="peer appearance-none w-4 h-4 border border-[var(--bolder-gray)] rounded-sm bg-white checked:bg-[var(--primary)] checked:border-[var(--primary)] transition-all cursor-pointer"
            />
            <svg 
              className="absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"
            >
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-sm text-gray-500 group-hover:text-[var(--primary)] transition-colors">
            {price.label}
          </span>
        </label>
      ))}
    </div>
  </div>
  <div className="relative p-6 bg-[var(--secondary-beige)] rounded-2xl overflow-hidden border border-[var(--bolder-gray)] group hover:border-[var(--gold-color)] transition-all duration-500">
    <div className="absolute -top-4 -right-4 w-12 h-12 bg-[var(--gold-color)] opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
    
    <h3 className="text-sm font-serif text-[var(--primary)] mb-3 italic">
      Natural Promise
    </h3>
    <p className="text-[11px] text-gray-500 leading-relaxed font-light">
      Crafted with <span className="text-[var(--primary)] font-medium">100% artisanal</span> Rwandan methods. Zero synthetics, pure nature.
    </p>
    <div className="mt-4 flex gap-1.5">
        {[...Array(4)].map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-[var(--gold-color)] opacity-30"></div>
        ))}
    </div>
  </div>
</aside>
<div className="flex-1">
  <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--bolder-gray)]/50">
    <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">
      <span className="text-[var(--primary)]">{sorted.length}</span> Curated Items
    </p>
    
    <div className="flex items-center gap-2">
      <ArrowUpDown size={12} className="text-gray-400" />
      <select
        value={sort}
        onChange={e => setSort(e.target.value)}
        className="bg-transparent text-[10px] font-bold uppercase tracking-widest focus:outline-none cursor-pointer text-[var(--primary)]"
      >
        <option value="asc">Price: Low - High</option>
        <option value="desc">Price: High - Low</option>
      </select>
    </div>
  </div>
  <div className="grid grid-cols-2 md:grid-cols-3  gap-x-4 gap-y-12">
    {sorted.map(product => {
      const isOutOfStock = product.stock === 0;

      return (
        <div key={product.id} className={`group flex flex-col h-full ${isOutOfStock ? 'opacity-75' : ''}`}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-white border border-[var(--bolder-gray)] transition-all duration-500 hover:shadow-md">
            {isOutOfStock ? (
              <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
                <span className="bg-gray-800 text-white text-[9px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                  Out of Stock
                </span>
              </div>
            ) : product.stock < 5 && (
              <div className="absolute top-2 left-2 z-10 bg-[var(--error-red)] text-white text-[8px] font-black px-1.5 py-0.5 rounded-sm flex items-center gap-1 shadow-sm">
                <Zap size={8} fill="currentColor" /> LOW STOCK
              </div>
            )}
            
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-700 ${!isOutOfStock && 'group-hover:scale-105'} ${isOutOfStock && 'grayscale-[0.5]'}`}
            />
          </div>
          <div className="mt-3 flex flex-col flex-1 px-1">
            <div className="mb-2">
              <div className="flex items-center justify-between mb-0.5">
                <p className="text-[9px] uppercase tracking-widest text-[var(--gold-color)] font-bold">{product.category}</p>
                <div className="flex items-center gap-1.5">
                   <span className={`w-1.5 h-1.5 rounded-full ${isOutOfStock ? 'bg-gray-300' : 'bg-[var(--success-green)] animate-pulse'}`} />
                   <span className="text-[8px] font-bold uppercase tracking-tighter text-gray-500">
                    {isOutOfStock ? 'Sold Out' : 'Ready'}
                   </span>
                </div>
              </div>

              <h3 className="font-serif text-[15px] text-[var(--primary)] leading-tight line-clamp-1 group-hover:text-black transition-colors">
                {product.name}
              </h3>
            </div>
            
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-sm font-bold text-gray-900">
                {product.price.toLocaleString()} RWF
              </span>
              <span className="text-[10px] text-gray-400 line-through">
                {product.oldPrice.toLocaleString()}
              </span>
            </div>
            <div className="mt-auto flex items-center gap-2 pt-1">
              <button 
                disabled={isOutOfStock}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all active:scale-95 shadow-sm
                  ${isOutOfStock 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-[var(--primary)] text-white hover:bg-[var(--primary-color)]'}`}
              >
                <ShoppingBag size={12} />
                {isOutOfStock ? 'Notify Me' : 'Add'}
              </button>
              
              <button className="p-2 border border-[var(--bolder-gray)] text-[var(--primary)] rounded-lg hover:bg-red-50 hover:border-red-100 hover:text-red-500 transition-all active:scale-95 bg-white shadow-sm">
                <Heart size={14} />
              </button>
            </div>
          </div>
        </div>
      );
    })}
  </div>
</div>

        </div>
      </section>

      <div className="bg-[var(--dark-background)]"><Footer /></div>
    </div>
  );
}

export default Shop;