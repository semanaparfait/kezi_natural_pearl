import { ArrowRight } from 'lucide-react'
import { useGetCategoriesQuery } from '@/features/category/categoryApi'
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"

function Category() {
  const { data: categories, isLoading, error } = useGetCategoriesQuery()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-lg animate-pulse">Loading categories...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-red-500 text-lg font-semibold">
          Oops! Something went wrong while loading categories.
        </p>
      </div>
    )
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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
    <section className='mb-8 mt-16'>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto text-center mb-16"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold-color)] font-bold mb-4 block">
          Our Collections
        </span>

        <h1 className='font-serif text-4xl md:text-5xl text-(--primary) mb-4 italic'>
          Shop By Category
        </h1>

        <div className="flex items-center justify-center gap-4">
          <span className="h-[1px] w-12 bg-[var(--gold-color)] opacity-40"></span>
          <p className='text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold'>
            Formulated for every age
          </p>
          <span className="h-[1px] w-12 bg-[var(--gold-color)] opacity-40"></span>
        </div>
      </motion.div>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-6 md:px-8"
      >
        {categories?.map((category) => (
          <motion.div
            key={category.id}
            variants={item}
            whileHover={{ y: -10, scale: 1.03 }}
            className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <div className="relative h-80 overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
              <p className="text-sm text-gray-200 mb-3">
                {category.description?.slice(0, 60)}...
              </p>

              <p className='flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all duration-300'>
                Explore <ArrowRight className="w-4 h-4" />
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Category
