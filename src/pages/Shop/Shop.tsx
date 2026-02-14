import { useState } from "react";
import {  ShoppingBag, Heart, ArrowUpDown, Zap, Mail, X,User } from "lucide-react";
// import {products} from "@/components/products"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import toast from "react-hot-toast";
import { useGetCurrentUserQuery } from '@/features/auth/authApi';
import Button from "@/components/Button";
import ReactPaginate from 'react-paginate';
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from '@/features/category/categoryApi';
import { useGetProductsQuery } from '@/features/products/productsApi';



function Shop() {
  const navigate = useNavigate();
  const { data: currentUser, isLoading, error } = useGetCurrentUserQuery(undefined);
  const { data: categoriesData } = useGetCategoriesQuery(undefined);
  const { data: products } = useGetProductsQuery(undefined);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("asc");
  const [notifyEmail, setNotifyEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 6;
  
  const productsList = products ?? [];
  // const categories = ["All", ...Array.from(new Set(productsList.map(p => p.category)))].filter(Boolean);
  const filtered = productsList.filter(p => selectedCategory === "All" || p.category === selectedCategory);
  const sorted = [...filtered].sort((a, b) => sort === "asc" ? Number(a.price) - Number(b.price) : Number(b.price) - Number(a.price));

  const pageCount = Math.ceil(sorted.length / productsPerPage);
  const indexOfFirstProduct = currentPage * productsPerPage;
  const indexOfLastProduct = indexOfFirstProduct + productsPerPage;
  const currentProducts = sorted.reverse().slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (event: { selected: number }) => {
    setCurrentPage(event.selected);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[var(--secondary-cream-white)] text-gray-800">
      <div className="bg-(--primary) shadow-md"><Navbar /></div>
      <header className="relative py-20 px-6 overflow-hidden border-b border-[var(--bolder-gray)]">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
            <h1 className="text-5xl md:text-6xl font-serif text-(--primary) mb-4 tracking-tight">Our Collection</h1>
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
    <aside className="lg:w-64 space-y-12 md:sticky top-24 self-start">
  <div>
    <h2 className="text-[11px] uppercase tracking-[0.25em] font-bold text-(--primary) mb-8 flex items-center justify-between">
      Categories
      <span className="h-[1px] w-12 bg-[var(--bolder-gray)]"></span>
    </h2>
    
    <div className="space-y-4">
      {categoriesData?.map((category) => (
        <label 
          key={category.name} 
          className="group flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={selectedCategory === category.name}
                onChange={() => setSelectedCategory(category.name)}
                className="peer appearance-none w-4 h-4 border border-[var(--bolder-gray)] rounded-sm bg-white checked:bg-(--primary) checked:border-(--primary) transition-all cursor-pointer"
              />
              <svg 
                className="absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"
              >
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className={`text-sm transition-colors ${selectedCategory === category.name ? 'text-black font-semibold' : 'text-gray-500 group-hover:text-(--primary)'}`}>
              {category.name}
            </span>
          </div>
          <span className="text-[10px] font-bold text-gray-300 group-hover:text-[var(--gold-color)]">
            {productsList.filter(p => p.category === category.name || category.name === "All").length}
          </span>
        </label>
      ))}
    </div>
  </div>
  <div>
    <h2 className="text-[11px] uppercase tracking-[0.25em] font-bold text-(--primary) mb-8 flex items-center justify-between">
      Price Range
      <span className="h-[1px] w-12 bg-[var(--bolder-gray)]"></span>
    </h2>
    
    <div className="space-y-4">
      {[
        { label: "All", range: "all" },
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
              className="peer appearance-none w-4 h-4 border border-[var(--bolder-gray)] rounded-sm bg-white checked:bg-(--primary) checked:border-(--primary) transition-all cursor-pointer"
            />
            <svg 
              className="absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"
            >
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-sm text-gray-500 group-hover:text-(--primary) transition-colors">
            {price.label}
          </span>
        </label>
      ))}
    </div>
  </div>
  <div className="relative p-6 bg-[var(--secondary-beige)] rounded-2xl overflow-hidden border border-[var(--bolder-gray)] group hover:border-[var(--gold-color)] transition-all duration-500">
    <div className="absolute -top-4 -right-4 w-12 h-12 bg-[var(--gold-color)] opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
    
    <h3 className="text-sm font-serif text-(--primary) mb-3 italic">
      Natural Promise
    </h3>
    <p className="text-[11px] text-gray-500 leading-relaxed font-light">
      Crafted with <span className="text-(--primary) font-medium">100% artisanal</span> Rwandan methods. Zero synthetics, pure nature.
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
          <span className="text-(--primary)">{sorted.length}</span> Curated Items
        </p>
        
        <div className="flex items-center gap-2">
          <ArrowUpDown size={12} className="text-gray-400" />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="bg-transparent text-[10px] font-bold uppercase tracking-widest focus:outline-none cursor-pointer text-(--primary)"
          >
            <option value="asc">Price: Low - High</option>
            <option value="desc">Price: High - Low</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3  gap-x-4 gap-y-12">
        {currentProducts.reverse().map(product => {
          const isOutOfStock = product.stockQuantity === 0;
          return (
            <div
              key={product.id}
              onClick={() => {
                if (isLoading) return;
                if (product.stockQuantity > 0) {
                  navigate(`/productdetails/${product.id}`);
                  return;
                }
                if (error || !currentUser) {
                  setNotifyEmail("notify");
                  return;
                }
                toast.success("We will notify you when product is back ");
              }}
              className={`group flex flex-col h-full cursor-pointer ${product.stockQuantity === 0 ? 'opacity-70' : ''}`}
            >

              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-white border border-[var(--bolder-gray)] transition-all duration-500 hover:shadow-md">
                {isOutOfStock ? (
                  <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
                    <span className="bg-gray-800 text-white text-[9px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                      Out of Stock
                    </span>
                  </div>
                ) : product.stockQuantity < 5 && (
                  <div className="absolute top-2 left-2 z-10 bg-[var(--error-red)] text-white text-[8px] font-black px-1.5 py-0.5 rounded-sm flex items-center gap-1 shadow-sm">
                    <Zap size={8} fill="currentColor" /> LOW STOCK
                  </div>
                )}
                
                <img
                  src={typeof product.images === 'string' ? product.images : product.images[0]}
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

                  <h3 className="font-serif text-[15px] text-(--primary) leading-tight line-clamp-1 group-hover:text-black transition-colors">
                    {product.name}
                  </h3>
                </div>
                
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-sm font-bold text-gray-900">
                    {product.price.toLocaleString()} RWF
                  </span>
                  <span className="text-[10px] text-gray-400 line-through">
                    {product.price.toLocaleString()} RWF
                  </span>
                </div>
                <div className="mt-auto flex items-center gap-2 pt-1">
                  <button 
                    
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all active:scale-95 shadow-sm
                      ${isOutOfStock 
                        ? 'bg-gray-100 text-gray-400 cursor-pointer' 
                        : 'bg-(--primary) text-white hover:bg-[var(--primary-color)]'}`}
                  >
                    
                      {isOutOfStock ? (<> Notify Me <Mail size={12} /> </>) : (<>Add to Cart <ShoppingBag size={12} /></>
            )}
                  </button>

                  
                  <button className="p-2 border border-[var(--bolder-gray)] text-(--primary) rounded-lg hover:bg-red-50 hover:border-red-100 hover:text-red-500 transition-all active:scale-95 bg-white shadow-sm">
                    <Heart size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {pageCount > 1 && (
        <div className="mt-12 flex justify-center">
          <ReactPaginate
            previousLabel="← Previous"
            nextLabel="Next →"
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName="flex items-center gap-2"
            pageClassName=""
            pageLinkClassName="px-3 py-2 rounded-lg border border-[var(--bolder-gray)] text-[10px] font-bold text-gray-600 hover:bg-(--primary) hover:text-white transition-all"
            activeLinkClassName="bg-(--primary) cursor-pointer  font-bold rounded-lg text-white border-(--primary) "
            previousClassName=""
            previousLinkClassName="px-4 py-2 rounded-lg border  border-[var(--bolder-gray)] text-[10px] font-bold text-gray-600 hover:bg-(--primary) hover:text-white transition-all disabled:opacity-50"
            nextClassName=""
            nextLinkClassName="px-4 py-2 rounded-lg border border-[var(--bolder-gray)] text-[10px] font-bold text-gray-600 hover:bg-(--primary) hover:text-white transition-all disabled:opacity-50"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      )}
    </div>
        </div>
      {notifyEmail && (
        <div className="fixed inset-0 z-[100] w-full h-screen flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-(--primary)/30 backdrop-blur-md transition-opacity animate-in fade-in duration-500"
            onClick={() => setNotifyEmail("")}
          />
          
          <div className="relative w-full max-w-sm bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-black/30 border border-white/50 p-10 space-y-8 overflow-hidden transition-all duration-500 animate-in zoom-in-95 duration-300">
            <div className="absolute top-0 left-0 w-32 h-32 bg-[var(--gold-color)] opacity-10 rounded-br-full -z-10"></div>
            <X 
              className="absolute top-6 right-8 text-gray-300 hover:text-[var(--gold-color)] cursor-pointer transition-colors" 
              size={20} 
              onClick={() => setNotifyEmail("")}
            />
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--secondary-cream-white)] shadow-inner">
                <User className="text-[var(--gold-color)]" size={24} />
              </div>
              
              <div className="space-y-1">
                <h1 className="text-[10px] font-bold text-[var(--gold-color)] uppercase tracking-[0.5em]">
                  Authentication Required
                </h1>
                <h2 className="text-2xl font-serif italic text-(--primary)">
                  Join the Ritual
                </h2>
              </div>
            </div>
            <div className="text-center px-2">
              <p className="text-lg text-gray-500 leading-relaxed font-light italic">
                To receive personalized notifications and artisanal updates, please sign in to your Kezi account.
              </p>
            </div>
            <div className="pt-2">
              <Button 
                onClick={() => window.location.href = '/account'}
                variant="primary"
                className="w-full py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-(--primary)/20 active:scale-95 transition-all"
              >
                Login to Continue
              </Button>
              
              <p className="text-center mt-6 text-[9px] uppercase tracking-widest text-gray-300 font-bold">
                Kezi Natural Pearl • Kigali
              </p>
            </div>
          </div>
        </div>
      )}
      </section>

      <div className="bg-[var(--dark-background)]"><Footer /></div>
    </div>
  );
}

export default Shop;