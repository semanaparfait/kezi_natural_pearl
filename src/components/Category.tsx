import adults from '@/assets/category/nc22.jpeg'
import elders from '@/assets/category/nc33.jpeg'
import kids from '@/assets/category/nc11.jpeg'
import { ArrowRight } from 'lucide-react'
function Category() {
  const categories = [
    { name: 'For Kids', image: kids, description: 'Gentle cleansers for delicate skin' },
    { name: 'For Adults', image: adults, description: 'Hydrating moisturizers for daily care' },
    { name: 'For Elderly', image: elders, description: 'Nourishing serums for mature skin' },
  ]
  return (
    <section className='mb-8 mt-16'>
      <h1 className='text-center text-2xl font-bold'>Shop By Category</h1>
      <p className='text-center text-gray-600'>Specially formulated for every age and skin type</p>
      <div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6 md:px-8">
          {categories.map((category) => (
            <div key={category.name} className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
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
                <p className="text-sm text-gray-200 mb-3">{category.description}</p>
                <p className='flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all'>
                  Explore <ArrowRight className="w-4 h-4" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Category