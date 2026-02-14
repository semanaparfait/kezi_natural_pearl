import { useState, useMemo } from "react";
import { ShoppingBag, Heart, ArrowUpDown, Zap, Mail, X, User, Search, RotateCcw } from "lucide-react";
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
  const { data: currentUser } = useGetCurrentUserQuery(undefined);
  const { data: categoriesData, isLoading: catLoading } = useGetCategoriesQuery(undefined);
  const { data: products, isLoading: prodLoading } = useGetProductsQuery(undefined);

  // States
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("asc");
  const [currentPage, setCurrentPage] = useState(0);
  const [notifyEmailModal, setNotifyEmailModal] = useState(false);

  const productsPerPage = 6;

  // 1. FILTERING & SEARCH LOGIC
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    return products.filter(p => {
      const matchesCategory = selectedCategory === "All" || p?.category === selectedCategory;
      const matchesSearch = p?.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesPrice = true;
      if (priceRange === "1000-2000") matchesPrice = p.price >= 1000 && p.price <= 2000;
      if (priceRange === "2000-5000") matchesPrice = p.price > 2000 && p.price <= 5000;
      if (priceRange === "5000-up") matchesPrice = p.price > 5000;

      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [products, selectedCategory, searchQuery, priceRange]);

  // 2. SORTING LOGIC
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => 
      sort === "asc" ? Number(a.price) - Number(b.price) : Number(b.price) - Number(a.price)
    );
  }, [filteredProducts, sort]);

  // 3. PAGINATION LOGIC
  const pageCount = Math.ceil(sortedProducts.length / productsPerPage);
  const currentProducts = sortedProducts.slice(
    currentPage * productsPerPage, 
    (currentPage + 1) * productsPerPage
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setPriceRange("all");
    setSearchQuery("");
    setCurrentPage(0);
  };

  if (prodLoading) return <div className="min-h-screen flex items-center justify-center italic font-serif text-[var(--primary)]">Preparing the collection...</div>;

  return (
    <div className="min-h-screen bg-[var(--secondary-cream-white)] text-gray-800">
      <div className="bg-[var(--primary)] shadow-md"><Navbar /></div>
      
      {/* Hero Header */}
      <header className="relative py-24 px-6 overflow-hidden border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-serif text-[var(--primary)] mb-6 tracking-tight italic">The Collection</h1>
          <div className="flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.4em] text-[var(--gold-color)] font-black">
            <span>Natural</span> <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold-color)]/30"></div> 
            <span>Organic</span> <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold-color)]/30"></div> 
            <span>Handmade</span>
          </div>
        </div>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-serif text-black/[0.02] select-none pointer-events-none uppercase tracking-widest italic">
            Artisanal
        </span>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* SIDEBAR FILTERS */}
          <aside className="lg:w-72 space-y-12 md:sticky top-24 self-start">
            
            {/* Search */}
            <div className="relative">
              <input 
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-12 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/5 transition-all shadow-sm"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              {searchQuery && <X onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer hover:text-red-500" size={16} />}
            </div>

            {/* Categories */}
            <div>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-[11px] uppercase tracking-[0.2em] font-black text-[var(--primary)]">Collections</h2>
                <button onClick={resetFilters} className="text-[9px] uppercase tracking-widest text-gray-400 hover:text-[var(--gold-color)] flex items-center gap-1 transition-colors">
                    <RotateCcw size={10} /> Reset
                </button>
              </div>
              <div className="space-y-3">
                {["All", ...(categoriesData?.map(c => c.name) || [])].map((cat) => (
                  <label key={cat} className="group flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat}
                        onChange={() => {setSelectedCategory(cat); setCurrentPage(0);}}
                        className="peer hidden"
                      />
                      <div className={`w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center transition-all ${selectedCategory === cat ? 'border-[var(--primary)] bg-[var(--primary)]' : 'group-hover:border-[var(--primary)]'}`}>
                        {selectedCategory === cat && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <span className={`text-sm tracking-tight transition-colors ${selectedCategory === cat ? 'text-black font-bold' : 'text-gray-500 group-hover:text-[var(--primary)]'}`}>
                        {cat}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h2 className="text-[11px] uppercase tracking-[0.2em] font-black text-[var(--primary)] mb-6">Price Range</h2>
              <div className="space-y-3">
                {[
                  { label: "All Prices", val: "all" },
                  { label: "Under 2,000 RWF", val: "1000-2000" },
                  { label: "2,000 - 5,000 RWF", val: "2000-5000" },
                  { label: "Above 5,000 RWF", val: "5000-up" }
                ].map((range) => (
                  <label key={range.val} className="group flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === range.val}
                      onChange={() => {setPriceRange(range.val); setCurrentPage(0);}}
                      className="peer hidden"
                    />
                    <div className={`w-4 h-4 rounded-sm border border-gray-300 flex items-center justify-center transition-all ${priceRange === range.val ? 'bg-[var(--primary)] border-[var(--primary)]' : 'group-hover:border-[var(--primary)]'}`}>
                      {priceRange === range.val && <Check size={12} className="text-white" />}
                    </div>
                    <span className={`text-sm transition-colors ${priceRange === range.val ? 'text-black font-bold' : 'text-gray-500 group-hover:text-[var(--primary)]'}`}>
                      {range.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN GRID */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-12 pb-4 border-b border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">
                Showing <span className="text-[var(--primary)]">{sortedProducts.length}</span> Treasures
              </p>
              
              <div className="flex items-center gap-2">
                <ArrowUpDown size={12} className="text-gray-400" />
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="bg-transparent text-[10px] font-black uppercase tracking-widest focus:outline-none cursor-pointer text-[var(--primary)]"
                >
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {currentProducts.length === 0 ? (
              <div className="py-32 text-center">
                <p className="font-serif italic text-2xl text-gray-300">No items found matching your criteria.</p>
                <button onClick={resetFilters} className="mt-4 text-[10px] uppercase tracking-widest font-bold text-[var(--primary)] hover:underline">Clear all filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-16">
                {currentProducts.map(product => {
                  const isOutOfStock = product.stockQuantity === 0;
                  return (
                    <div 
                      key={product.id}
                      onClick={() => !isOutOfStock ? navigate(`/productdetails/${product.id}`) : setNotifyEmailModal(true)}
                      className="group flex flex-col h-full cursor-pointer animate-in fade-in duration-700"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white border border-gray-100 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[var(--primary)]/5 group-hover:-translate-y-1">
                        {isOutOfStock && (
                          <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
                            <span className="bg-gray-900 text-white text-[8px] font-black px-4 py-1.5 rounded-full tracking-[0.2em] uppercase">Sold Out</span>
                          </div>
                        )}
                        <img
                          src={product.images?.[0] || product.image}
                          alt={product.name}
                          className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${isOutOfStock && 'grayscale'}`}
                        />
                        <button className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-all hover:bg-[var(--primary)] hover:text-white shadow-sm">
                          <Heart size={16} />
                        </button>
                      </div>

                      <div className="mt-6 px-2 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] uppercase font-black tracking-widest text-[var(--gold-color)]">{product.category}</span>
                          {product.stockQuantity < 5 && !isOutOfStock && <span className="text-[8px] font-bold text-red-500 animate-pulse uppercase">Rare</span>}
                        </div>
                        <h3 className="font-serif text-lg text-[var(--primary)] leading-tight group-hover:text-black transition-colors">{product.name}</h3>
                        <p className="text-sm font-bold text-gray-900">{product.price?.toLocaleString()} RWF</p>
                        
                        <button className={`w-full mt-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${isOutOfStock ? 'bg-gray-100 text-gray-400' : 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/10 hover:brightness-110'}`}>
                          {isOutOfStock ? "Notify Me" : "Add to Ritual"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {pageCount > 1 && (
              <div className="mt-24 flex justify-center">
                <ReactPaginate
                  previousLabel="PREV"
                  nextLabel="NEXT"
                  pageCount={pageCount}
                  onPageChange={handlePageChange}
                  containerClassName="flex items-center gap-4"
                  pageLinkClassName="w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 text-[10px] font-bold hover:bg-[var(--primary)] hover:text-white transition-all"
                  activeLinkClassName="!bg-[var(--primary)] !text-white !border-[var(--primary)] shadow-lg"
                  previousLinkClassName="text-[10px] font-black tracking-widest text-gray-400 hover:text-[var(--primary)]"
                  nextLinkClassName="text-[10px] font-black tracking-widest text-gray-400 hover:text-[var(--primary)]"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Login Required Modal */}
      {notifyEmailModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[var(--primary)]/20 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white rounded-[3rem] p-12 max-w-sm w-full text-center relative shadow-2xl">
              <X onClick={() => setNotifyEmailModal(false)} className="absolute top-8 right-8 text-gray-300 cursor-pointer" size={20} />
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[var(--gold-color)] shadow-inner"><User size={28} /></div>
              <h2 className="text-2xl font-serif italic text-[var(--primary)] mb-2">Join the Ritual</h2>
              <p className="text-sm text-gray-500 font-light mb-8">Sign in to receive back-in-stock alerts and exclusive artisanal updates.</p>
              <Button onClick={() => navigate('/account')} className="w-full py-4 rounded-full text-[10px] uppercase tracking-widest">Login to Continue</Button>
           </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Shop;