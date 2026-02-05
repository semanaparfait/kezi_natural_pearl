import { Star } from "lucide-react"
import { useRef, useEffect, useState } from "react"

function Testimonies() {
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

  return (
    <section ref={sectionRef} className="py-24 bg-[var(--secondary-cream-white)] overflow-hidden">

      {/* HEADER */}
      <div className={`text-center max-w-2xl mx-auto mb-20 transition-all duration-700 ease-out transform
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}>
        <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold-color)] font-bold mb-3 block">
          Voices of Kezi
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-[var(--primary)] italic mb-4">
          Loved by Our Customers
        </h2>
        <p className="text-sm text-gray-500 font-light leading-relaxed">
          See how our artisanal soaps have helped people feel confident and refreshed in their natural skin.
        </p>
      </div>

      {/* TESTIMONIAL CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`group relative bg-white p-8 rounded-2xl shadow border border-[var(--bolder-gray)]
              transition-all duration-700 ease-out transform
              hover:border-[var(--gold-color)]/50 hover:-translate-y-2
              ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
            `}
            style={{ transitionDelay: `${index * 200}ms` }} // staggered animation
          >
            <div className="flex flex-row-reverse gap-3.5 items-center justify-center">
              <div className="flex items-center flex-col gap-1 justify-center">
                <h4 className="font-semibold text-[var(--primary)] text-md leading-none mb-1">
                  {testimonial.name}
                </h4>
                <p className="text-gray-600 font-light italic text-sm leading-relaxed mb-8 min-h-[80px]">
                  "{testimonial.text}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6">
                <div className="w-20 h-25 overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover rounded-md transition-all duration-700"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className="fill-[var(--gold-color)] text-[var(--gold-color)]"
                  />
                ))}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                {testimonial.role}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER LINE */}
      <div className={`mt-16 flex justify-center items-center gap-4 opacity-50 transition-all duration-700 ease-out transform
        ${show ? "opacity-50 translate-y-0" : "opacity-0 translate-y-10"}
      `}>
        <div className="h-[1px] w-12 bg-gray-300"></div>
        <span className="text-[9px] font-bold tracking-widest uppercase text-gray-400">
          Join 10,000+ Glowing Customers
        </span>
        <div className="h-[1px] w-12 bg-gray-300"></div>
      </div>

    </section>
  )
}

export default Testimonies
