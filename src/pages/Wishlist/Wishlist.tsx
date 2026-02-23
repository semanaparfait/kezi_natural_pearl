import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Heart, Trash } from "lucide-react"
import {useGetWishlistQuery, useRemoveFromWishlistMutation} from '@/features/wishlist/wishlist'
import Loading from "@/components/Loading"
import toast from "react-hot-toast"         


function Wishlist() {
  // const {data: wishlist, isLoading, error} = useGetWishlistQuery(undefined)
    const {data: wishlist, isLoading, error, refetch} = useGetWishlistQuery(undefined)
    const [removeFromWishlist] = useRemoveFromWishlistMutation()
  if (isLoading) {
    return <Loading />
  }
  if (error) {
    return <div className="text-red-500 text-center mt-10">Failed to load wishlist. Please try again later.</div>
  }

  const handleDelete = async (id: string) => {
    await removeFromWishlist(id)
    refetch()
      .unwrap()
      .then(() => {
        toast.success('Item removed from wishlist');
      })
      .catch((error) => {
        toast.error('Failed to remove item from wishlist: ' + error.message);
      });
  }
  // console.log(wishlist)
  return (
    <section>
      <Navbar />
            <div className="space-y-2 mt-30 ml-15">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
              <Heart size={12} className="fill-[var(--primary)] text-[var(--primary)]" /> Saved Collections
            </div>
            <h1 className="text-6xl font-serif italic tracking-tighter text-slate-950">
              The Wishlist
            </h1>
          </div>
          <div className="mb-10">
            {wishlist?.length === 0 ? (
              <div className="flex flex-col items-center gap-4 mt-10">
                <Heart size={48} className="fill-[var(--primary)] text-[var(--primary)]" />
                <p className="text-lg text-slate-500">Your wishlist is empty.</p>
              </div>
            ) : (
              wishlist?.map((item: any) => (
                <div key={item.id} className="bg-white rounded-[2rem] shadow-sm border border-[var(--bolder-gray)]/30 overflow-hidden">
                  <div className="px-5 py-4 space-y-2">
                    <div className="flex flex-col  sm:flex-row gap-8 items-center  border-b border-gray-50 last:border-0">
                      <div className="relative group shrink-0">
                        <div className="w-25 h-25 rounded-2xl overflow-hidden border border-[var(--bolder-gray)]/20">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                      </div>

                      <div className="flex-1 flex flex-wrap items-center justify-between w-full">
                        <div className="flex flex-col space-y-2 text-center sm:text-left">
                          <h3 className="text-xl font-serif text-[var(--primary)] italic leading-tight">{item.product.name}</h3>
                          <p className="text-sm text-slate-500">{item.product.description.slice(0, 70)}...</p>
                          <span className="text-xs text-slate-400">Category: {item.product.category.name}</span>
                        </div>

                        <div className="text-right flex flex-col items-end gap-4 min-w-[100px]">
                          <p className="font-serif text-lg text-[var(--primary)]">{item.product.price.toLocaleString()} RWF</p>
                          {/* Add remove from wishlist button here if needed */}
                        </div>
                        <div>
                          <Trash size={20} className="text-slate-400 hover:text-red-500 cursor-pointer" onClick={() => handleDelete(item.id)} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <Footer />
    </section>
  )
}

export default Wishlist