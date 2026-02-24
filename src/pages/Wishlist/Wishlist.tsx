import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Heart, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useGetWishlistQuery, useRemoveFromWishlistMutation } from '@/features/wishlist/wishlist';
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Wishlist() {
  const { data: wishlist, isLoading, error, refetch } = useGetWishlistQuery(undefined);
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center font-serif italic text-rose-500">
        Error loading your collections. Please try again.
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    try {
      await removeFromWishlist(id).unwrap();
      refetch();
      toast.success('Item removed from wishlist');
    } catch (err: any) {
      toast.error('Failed to remove item: ' + err.message);
    }
  };

  return (
    <section className="min-h-screen bg-[#fcfcfc] flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 lg:px-12 pt-40 pb-20">
        {/* Header Section */}
        <header className="space-y-4 mb-16">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">
            <Heart size={12} className="fill-slate-400 text-slate-400" /> 
            Saved Collections
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="text-6xl md:text-7xl font-serif text-slate-950 tracking-tighter">
              The <span className="italic">Wishlist</span>
            </h1>
            <p className="text-slate-500 font-light max-w-xs leading-relaxed border-l border-slate-200 pl-6">
              A curated selection of your most desired natural pearls and jewelry pieces.
            </p>
          </div>
        </header>

        {/* Wishlist Content */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {!wishlist || wishlist.length === 0 ? (
            <div className="py-32 flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                <Heart size={32} strokeWidth={1} />
              </div>
              <div className="space-y-2">
          <h3 className="text-xl font-serif italic text-slate-400">
            Nothing saved yet
          </h3>

          <p className="text-sm text-slate-400 max-w-xs mx-auto">
            Explore our timeless pearl creations and add the ones you love to your wishlist.
          </p>
              </div>
              <Link 
                to="/shop" 
                className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--primary)] text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
              >
                Start Shopping <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {wishlist.map((item: any) => (
                <div 
                  key={item.id} 
                  className="group relative flex flex-col sm:flex-row items-center gap-8 p-8 hover:bg-slate-50/50 transition-all duration-500"
                >
                  {/* Product Image */}
                  <div className="relative shrink-0 overflow-hidden rounded-xl border border-slate-100 w-40 h-40 sm:w-32 sm:h-32">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col sm:flex-row justify-between items-center sm:items-start w-full gap-6">
                    <div className="space-y-2 text-center sm:text-left">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                          {item.product.category.name}
                        </span>
                        <h3 className="text-2xl font-serif text-slate-900 leading-tight">
                          {item.product.name}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-500 font-light line-clamp-2 max-w-md italic">
                        "{item.product.description}"
                      </p>
                    </div>

                    {/* Price & Actions */}
                    <div className="flex flex-col items-center sm:items-end gap-4 min-w-[140px]">
                      <p className="text-xl font-serif text-slate-900">
                        {item.product.price.toLocaleString()} <span className="text-xs font-sans text-slate-400">RWF</span>
                      </p>
                      
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all duration-300"
                          title="Remove from wishlist"
                        >
                          <Trash2 size={18} strokeWidth={1.5} />
                        </button>
                        <Link 
                          to={`/productdetails/${item.product.id}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm"
                        >
                          <ShoppingBag size={14} /> View Piece
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </section>
  );
}

export default Wishlist;