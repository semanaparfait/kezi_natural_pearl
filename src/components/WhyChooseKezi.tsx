import { ShieldCheck, Leaf, Award } from 'lucide-react'
import why from '@/assets/who/Crafting The Perfect Soap.jfif.jpeg'
import { motion  } from "framer-motion"
import type{ Variants } from 'framer-motion';

function WhyChooseKezi() {
  const reasons = [
    {
      id: "01",
      title: "Artisanal Craftsmanship",
      description:
        "Every product is handcrafted in small batches using traditional wisdom passed down through generations.",
      icon: <Award size={20} />
    },
    {
      id: "02",
      title: "100% Organic & Bio-Active",
      description:
        "We source pure, nutrient-rich botanicals to ensure your skin receives only the best nature offers.",
      icon: <Leaf size={20} />
    },
    {
      id: "03",
      title: "Dermatologically Gentle",
      description:
        "Our formulas are pH-balanced and free from synthetic chemicals, making them safe for sensitive skin.",
      icon: <ShieldCheck size={20} />
    }
  ]


  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.25 }
    }
  }


  const item: Variants = {
    hidden: { opacity: 0, y: 40 },
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
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">

        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="relative w-full lg:w-1/2 flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl z-10">
              <img
                src={why}
                alt="Natural"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />

              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="absolute bottom-8 -right-4 bg-(--primary) text-white p-6 rounded-2xl shadow-xl hidden md:block"
              >
                <p className="text-3xl font-serif italic mb-1">100%</p>
                <p className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-80">
                  Natural Purity
                </p>
              </motion.div>
            </div>

            <div className="absolute top-10 left-10 w-full max-w-[400px] aspect-[4/5] border border-[var(--gold-color)] rounded-3xl opacity-20 -translate-x-6 translate-y-6"></div>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-12"
          >
            <motion.div variants={item} className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="h-[1px] w-12 bg-[var(--gold-color)]"></span>
                <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold-color)] font-bold">
                  The Difference
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-serif text-(--primary) italic leading-tight">
                Why Choose Kezi.
              </h2>
            </motion.div>
            <motion.div variants={container} className="space-y-10">
              {reasons.map((reason) => (
                <motion.div
                  key={reason.id}
                  variants={item}
                  whileHover={{ x: 6 }}
                  className="group flex gap-6 items-start"
                >
                  <span className="text-sm font-serif text-[var(--gold-color)] opacity-50 mt-1">
                    {reason.id}
                  </span>

                  <div className="space-y-2">
                    <h3 className="text-lg font-serif text-(--primary) flex items-center gap-3 group-hover:text-[var(--gold-color)] transition-colors">
                      <span className="text-[var(--gold-color)]">{reason.icon}</span>
                      {reason.title}
                    </h3>

                    <p className="text-gray-500 text-sm font-light leading-relaxed max-w-sm">
                      {reason.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              variants={item}
              className="pt-8 border-t border-[var(--bolder-gray)]/30"
            >
              <div className="flex items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-xl font-serif text-(--primary)">5,000+</span>
                  <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                    Monthly Customers
                  </span>
                </div>

                <div className="h-8 w-[1px] bg-[var(--bolder-gray)]"></div>

                <div className="flex flex-col">
                  <span className="text-xl font-serif text-(--primary)">4.9/5</span>
                  <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                    User Rating
                  </span>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseKezi
