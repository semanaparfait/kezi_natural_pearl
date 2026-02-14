import { ArrowUpRight, Calendar } from 'lucide-react'
import { motion } from "framer-motion"
import type{ Variants } from "framer-motion"

function Blogs() {

  const blogsPost = [
    {
      id: 1,
      title: "The Beauty of Natural Pearls",
      excerpt: "Discover the timeless elegance and natural allure of pearls in modern skincare rituals.",
      imageUrl: "https://i.pinimg.com/1200x/d8/5c/d8/d85cd86800c90ca33446ac3dfbb9e1bd.jpg",
      date: "Feb 05, 2026"
    },
    {
      id: 2,
      title: "Sustainable Skincare Practices",
      excerpt: "Learn how to care for your skin while honoring the planet through artisanal sourcing.",
      imageUrl: "https://i.pinimg.com/736x/16/c5/99/16c5999c5378d8a225e1c0abe58a2e6a.jpg",
      date: "Jan 28, 2026"
    },
    {
      id: 3,
      title: "Top 5 Natural Ingredients",
      excerpt: "Explore the potent botanicals that promote a radiant, healthy glow.",
      imageUrl: "https://i.pinimg.com/1200x/e4/7c/5f/e47c5f10048ed7692c601fda0f4be29a.jpg",
      date: "Jan 15, 2026"
    }
  ]

  // stagger container
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.25 }
    }
  }

  // each card animation
  const card: Variants = {
    hidden: { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  }

  return (
    <section className="py-24 bg-[var(--secondary-cream-white)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8 md:px-10"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1px] w-8 bg-[var(--gold-color)]"></span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold-color)] font-bold">
                The Journal
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl text-[var(--primary)] italic leading-tight">
              Insight into <br /> Our Blog
            </h1>
          </div>

          <div className="md:text-right max-w-sm">
            <p className="text-gray-400 text-sm font-light italic leading-relaxed">
              A curated space for skincare rituals, sustainability stories, and the science of natural beauty.
            </p>
          </div>
        </motion.div>

        {/* BLOG GRID */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-10 md:gap-14 md:px-10"
        >
          {blogsPost.map((post) => (
            <motion.div
              key={post.id}
              variants={card}
              whileHover={{ y: -8 }}
              className="group cursor-pointer rounded-2xl bg-white shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* IMAGE */}
              <div className="relative aspect-[5/4] overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* CONTENT */}
              <div className="flex flex-col flex-grow px-6 py-5 space-y-3">

                {/* DATE */}
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <Calendar size={13} className="text-[var(--gold-color)]" />
                  {post.date}
                </div>

                {/* TITLE */}
                <h2 className="font-serif text-lg text-[var(--primary)] italic leading-snug group-hover:text-[var(--gold-color)] transition-colors">
                  {post.title}
                </h2>

                {/* TEXT */}
                <p className="text-gray-500 text-sm font-light leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                {/* LINK */}
                <div className="mt-auto pt-3">
                  <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--primary)] group-hover:text-[var(--gold-color)] transition">
                    Read Article
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <button className="px-10 py-3 rounded-full border border-[var(--primary)] text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300">
            Explore All Stories
          </button>
        </motion.div>

      </div>
    </section>
  )
}

export default Blogs
