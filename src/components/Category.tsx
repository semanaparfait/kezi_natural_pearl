
import { ArrowRight } from 'lucide-react'
function Category() {
  const categories = [
    { name: 'Face Care', image: "https://i.pinimg.com/736x/68/8d/b3/688db3abdc40f6d4111f72b0c34e38a3.jpg", description: 'Gentle cleansers for delicate skin' },
    { name: 'Face Care', image: "https://i.pinimg.com/1200x/88/c5/30/88c530df33dbeeb9e72ff4667d08d3f5.jpg", description: 'Hydrating moisturizers for daily care' },
    { name: 'Face Care', image: "https://i.pinimg.com/1200x/fb/04/4b/fb044bc8dd66189574cb992b0abf6f9a.jpg", description: 'Nourishing serums for mature skin' },
  ]
  return (
    <section className='mb-8 mt-16'>
<div className="max-w-7xl mx-auto text-center mb-16">
  <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold-color)] font-bold mb-4 block">
          Our Collections
        </span>
        <h1 className='font-serif text-4xl md:text-5xl text-[var(--primary)] mb-4 italic'>Shop By Category</h1>
        <div className="flex items-center justify-center gap-4">
            <span className="h-[1px] w-12 bg-[var(--gold-color)] opacity-40"></span>
            <p className='text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold'>Formulated for every age</p>
            <span className="h-[1px] w-12 bg-[var(--gold-color)] opacity-40"></span>
        </div>
      </div>
      <div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 md:px-8">
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