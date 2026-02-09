import { products } from '@/components/products'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

function Trendings() {
  const sectionRef = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true)
        }
      },
      { threshold: 0.2 } // trigger when 20% visible
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-10 overflow-hidden">
      {/* HEADER */}
      <div className={`text-center transition-all duration-700 ease-out transform
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}>
        <h2 className="text-xl font-bold uppercase mb-2">Trending Products</h2>
        <p className="text-gray-500 text-sm italic mb-6">
          One Girl's Journey To Making Her Fashion Dreams Come True In Elements Jewellers
        </p>

        <div className="flex justify-center gap-8 text-xs font-bold tracking-widest border-b border-gray-100 pb-4 max-w-xs mx-auto">
          <button className="text-black border-b-2 border-black pb-4 -mb-4">FEATURED</button>
          <button className="text-gray-400 hover:text-black transition-colors">BEST SELLERS</button>
          <button className="text-gray-400 hover:text-black transition-colors">NEW ARRIVALS</button>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="mx-auto mt-8 w-full max-w-6xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {products.slice(0, 4).map((product, i) => (
            <Link
              to="/shop"
              key={product.id}
              className={`group flex flex-col items-center relative rounded-2xl border border-gray-100 bg-white shadow-sm
                transition-all duration-700 ease-out transform
                ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
              `}
              style={{ transitionDelay: `${i * 200}ms` }} // staggered animation
            >
              <div className="relative bg-[#f7eff0] w-[13rem] h-[17rem] flex items-center justify-center overflow-hidden rounded-t-2xl">
                {/* {product.onSale && (
                  <span className="absolute top-3 left-3 bg-white text-[10px] px-2 py-0.5 shadow-sm uppercase text-gray-400 rounded-full">
                    sale
                  </span>
                )} */}

                <img 
                  src={product.image instanceof Array ? product.image[0] : product.image} 
                  alt={product.name} 
                  className="object-contain group-hover:scale-110 transition-transform duration-500"
                />

                {!product.stock && (
                  <div className="absolute inset-0 bg-white/40 flex items-center justify-center">
                    <div className="bg-[#f8d7da] text-[#721c24] text-[10px] font-bold px-4 py-2 uppercase tracking-widest shadow-sm rounded-full">
                      Out of Stock
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full text-center flex flex-col gap-1.5 px-4 py-3">
                <h3 className="text-gray-500 text-[13px] font-medium leading-tight line-clamp-2 min-h-[1.5rem]">
                  {product.name}
                </h3>

                <div className="flex items-center justify-center gap-2">
                  {product.oldPrice && (
                    <span className="text-gray-400 text-xs line-through">
                      {product.oldPrice} 
                    </span>
                  )}
                  <span className="text-gray-800 text-[14px] font-semibold">
                    {product.price} 
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* SHOP MORE BUTTON */}
      <div className={`mt-8 flex justify-center transition-all duration-700 ease-out transform
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}>
        <Link
          to="/shop"
          className="inline-flex items-center justify-center rounded-full border-2 border-black px-6 py-2 text-xs font-semibold tracking-widest hover:bg-black hover:text-white transition-colors"
        >
          SHOP MORE
        </Link>
      </div>
    </section>
  )
}

export default Trendings
