import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {useGetCategoriesQuery} from '@/features/category/categoryApi'

function Category() {
  const { data: categories, isLoading, error } = useGetCategoriesQuery()

  const sectionRef = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true)
        }
      },
      { threshold: 0.7 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500 text-lg animate-pulse">Loading categories...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center h-32">
          <p className="text-red-500 text-lg font-semibold">
            Oops! Something went wrong while loading categories.
          </p>
        </div>
      );
    }


  // const categories = [
  //   { name: 'Face Care', image: "https://i.pinimg.com/736x/68/8d/b3/688db3abdc40f6d4111f72b0c34e38a3.jpg", description: 'Gentle cleansers for delicate skin' },
  //   { name: 'Face Care', image: "https://i.pinimg.com/1200x/88/c5/30/88c530df33dbeeb9e72ff4667d08d3f5.jpg", description: 'Hydrating moisturizers for daily care' },
  //   { name: 'Face Care', image: "https://i.pinimg.com/1200x/fb/04/4b/fb044bc8dd66189574cb992b0abf6f9a.jpg", description: 'Nourishing serums for mature skin' },
  // ]

  return (
    <section ref={sectionRef} className='mb-8 mt-16 '>
      <div className={`max-w-7xl mx-auto text-center mb-16 transition-all duration-700 ease-out transform
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}>
        <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold-color)] font-bold mb-4 block">
          Our Collections
        </span>

        <h1 className='font-serif text-4xl md:text-5xl text-[var(--primary)] mb-4 italic'>
          Shop By Category
        </h1>

        <div className="flex items-center justify-center gap-4">
          <span className="h-[1px] w-12 bg-[var(--gold-color)] opacity-40"></span>
          <p className='text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold'>
            Formulated for every age
          </p>
          <span className="h-[1px] w-12 bg-[var(--gold-color)] opacity-40"></span>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-6 md:px-8">
        {categories?.map((category, i) => (
          <div
            key={i}
            className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl 
            transition-all duration-700 ease-out transform
            ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
            `}
            style={{ transitionDelay: `${i * 200}ms` }}   
          >
            <div className="relative h-80 overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
              <p className="text-sm text-gray-200 mb-3">{category.description.slice(0, 50)}...</p>

              <p className='flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all'>
                Explore <ArrowRight className="w-4 h-4" />
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Category
