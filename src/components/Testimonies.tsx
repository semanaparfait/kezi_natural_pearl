import { Star } from "lucide-react"
import { motion } from "framer-motion"
import type{ Variants } from "framer-motion"

function Testimonies() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Mother of Two",
      image: "https://i.pinimg.com/736x/18/bf/81/18bf8194fdbbf6a61282d526bbbb4d0c.jpg",
      rating: 5,
      text: "My kids absolutely love Kezi soap! Their skin has never been healthier.",
    },
    {
      name: "Michael Chen",
      role: "Teenager, 16",
      image: "https://i.pinimg.com/1200x/b6/43/2e/b6432eac4b587715cf9b1800f5e5419f.jpg",
      rating: 5,
      text: "As a teenager dealing with sensitive skin, Kezi has been a game-changer.",
    },
    {
      name: "Emily Rodriguez",
      role: "Young Adult, 22",
      image: "https://i.pinimg.com/736x/8e/77/70/8e77709e232a2dd225b952ededbd32e6.jpg",
      rating: 5,
      text: "I've tried so many products, but Kezi is the only one that's truly natural.",
    },
  ]


  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const card: Variants = {
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
    <section className="py-24 bg-[var(--secondary-cream-white)] overflow-hidden">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-20"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold-color)] font-bold mb-3 block">
          Voices of Kezi
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-[var(--primary)] italic mb-4">
          Loved by Our Customers
        </h2>
        <p className="text-sm text-gray-500 font-light leading-relaxed">
          See how our artisanal soaps have helped people feel confident and refreshed in their natural skin.
        </p>
      </motion.div>

      {/* TESTIMONIAL CARDS */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-10"
      >
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            variants={card}
            whileHover={{ y: -5 }}
            className="group relative bg-white p-8 rounded-2xl shadow border border-[var(--bolder-gray)]
              hover:border-[var(--gold-color)]/50 transition-all duration-500 flex flex-col"
          >
            {/* IMAGE + CONTENT */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="w-24 h-24 overflow-hidden rounded-md flex-shrink-0">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-2 flex-1">
                <h4 className="font-semibold text-[var(--primary)] text-md leading-none">
                  {testimonial.name}
                </h4>
                <p className="text-gray-600 font-light italic text-sm leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[var(--gold-color)] text-[var(--gold-color)]" />
                ))}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                {testimonial.role}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* FOOTER LINE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 0.5, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mt-16 flex justify-center items-center gap-4"
      >
        <div className="h-[1px] w-12 bg-gray-300"></div>
        <span className="text-[9px] font-bold tracking-widest uppercase text-gray-400">
          Join 10,000+ Glowing Customers
        </span>
        <div className="h-[1px] w-12 bg-gray-300"></div>
      </motion.div>
    </section>
  )
}

export default Testimonies
