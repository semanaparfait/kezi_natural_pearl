import { Link } from 'react-router-dom'
import { useGetProductsQuery } from '@/features/products/productsApi'
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"

function Trendings() {
  const { data: products, isLoading, error } = useGetProductsQuery()

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <p className="animate-pulse text-gray-500">Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-red-500">Error loading products</p>
      </div>
    )
  }

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }


  const item: Variants = {
    hidden: { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] 
      }
    }
  }

  return (
    <section className="py-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-xl font-bold uppercase mb-2">Trending Products</h2>
        <p className="text-gray-500 text-sm italic mb-6">
          One Girl's Journey To Making Her Fashion Dreams Come True
        </p>

        <div className="flex justify-center gap-8 text-xs font-bold tracking-widest border-b border-gray-100 pb-4 max-w-xs mx-auto">
          <button className="text-black border-b-2 border-black pb-4 -mb-4">FEATURED</button>
          <button className="text-gray-400 hover:text-black">BEST SELLERS</button>
          <button className="text-gray-400 hover:text-black">NEW ARRIVALS</button>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mx-auto mt-8 w-full max-w-6xl px-4 sm:px-6 lg:px-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {products?.slice(0, 4).map((product) => (
            <motion.div key={product.id} variants={item}>
              <Link
                to="/shop"
                className="group flex flex-col items-center relative rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition"
              >
                <div className="relative bg-[#f7eff0] w-[13rem] h-[17rem] flex items-center justify-center overflow-hidden rounded-t-2xl">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="object-contain group-hover:scale-110 transition-transform duration-500"
                  />

                  {!product.stockQuantity && (
                    <div className="absolute inset-0 bg-white/40 flex items-center justify-center">
                      <div className="bg-[#f8d7da] text-[#721c24] text-[10px] font-bold px-4 py-2 uppercase rounded-full">
                        Out of Stock
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full text-center flex flex-col gap-1.5 px-4 py-3">
                  <h3 className="text-gray-500 text-[13px] font-medium line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-gray-800 text-[14px] font-semibold">
                      {product.price} RWF
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-8 flex justify-center"
      >
        <Link
          to="/shop"
          className="inline-flex items-center justify-center rounded-full border-2 border-black px-6 py-2 text-xs font-semibold tracking-widest hover:bg-black hover:text-white transition"
        >
          SHOP MORE
        </Link>
      </motion.div>
    </section>
  )
}

export default Trendings
