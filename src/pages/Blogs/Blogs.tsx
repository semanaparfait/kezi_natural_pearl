import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { ArrowRight } from "lucide-react"

function Blogs() {
  const Blogs = [
    {
      title: 'The Ultimate Guide to Natural Skincare: Embrace the Power of Botanicals',
      description: 'Discover the transformative benefits of natural skincare with our comprehensive guide. Learn how to harness the power of botanicals for radiant, healthy skin.',
      image: 'https://i.pinimg.com/736x/fb/04/4b/fb044bc8dd66189574cb992b0abf6f9a.jpg',
      link: '#'
    },
    {
      title: '5 Must-Have Ingredients for Glowing Skin: Nature’s Best Kept Secrets',
      description: 'Unlock the secrets to glowing skin with our top 5 must-have natural ingredients. From nourishing oils to potent extracts, discover how to enhance your skincare routine.',
      image: 'https://i.pinimg.com/736x/fb/04/4b/fb044bc8dd66189574cb992b0abf6f9a.jpg',
      link: '#'
    },
    {
      title: 'Skincare Rituals from Around the World: Embrace Global Beauty Traditions',
      description: 'Explore skincare rituals from around the world and embrace global beauty traditions. Discover how different cultures harness nature’s bounty for radiant skin.',
      image: 'https://i.pinimg.com/736x/fb/04/4b/fb044bc8dd66189574cb992b0abf6f9a.jpg',
      link: '#'
    }
  ]


  return (
    <section>
      <Navbar />
      <div 
        className="relative h-[50vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://i.pinimg.com/1200x/79/04/3d/79043d911c5bd921ccb771df66434cd0.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="text-white text-center z-10 px-6 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[var(--gold-color)]">Knowledge & Purity</span>
          <h1 className="font-serif italic text-5xl md:text-7xl">The Journal</h1>
          <p className="max-w-xl mx-auto font-light text-gray-200 italic leading-relaxed text-sm md:text-base">
            Insights into wellness, beauty rituals, and nature's secrets.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-24 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {Blogs.map((blog, index) => (
            <a key={index} href={blog.link} className="group block rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <div className="relative h-64">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6 bg-white">
                <h2 className="text-xl font-semibold mb-2">{blog.title.slice(0, 40)}...</h2>
                <p className="text-gray-700">{blog.description.slice(0, 100)}...</p>
              </div>
              <p className="text-[var(--primary)] flex items-center gap-1 pl-6 pb-6">Learn More <ArrowRight /></p>

            </a>
          ))}
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default Blogs