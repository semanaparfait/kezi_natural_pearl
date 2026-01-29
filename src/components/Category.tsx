import adults from '@/assets/category/c2.jpeg'
import kids from '@/assets/category/c1.jpeg'
import { ArrowRight } from 'lucide-react'
function Category() {
  const categories = [
    { name: 'For Kids', image: kids, description: 'Gentle cleansers for delicate skin' },
    { name: 'For Adults', image: adults, description: 'Hydrating moisturizers for daily care' },
    { name: 'For Elderly', image: adults, description: 'Nourishing serums for mature skin' },
  ]
  return (
    <section className='mb-8 mt-16'>
      <h1 className='text-center text-2xl font-bold'>Shop By Category</h1>
      <p className='text-center text-gray-600'>Specially formulated for every age and skin type</p>
      <div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6 md:px-8">
          {categories.map((category) => (
            <div key={category.name} className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="  flex flex-col justify-end p-4 group-hover:bg-black/60 transition-colors duration-300">

                <h2 className=" text-xl font-semibold">{category.name}</h2>
                <p className=" text-sm text-gray-600">{category.description}</p>
                <p className='flex items-center mt-2'>Explore <ArrowRight /></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Category