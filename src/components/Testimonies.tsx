import { Star, Quote } from "lucide-react"

function Testimonies() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Mother of Two",
      image: "https://i.pinimg.com/1200x/db/c6/e0/dbc6e0f2e6c25f06631a0a395e19fb3a.jpg",
      rating: 5,
      text: "My kids absolutely love Kezi soap! Their skin has never been healthier, .",
    },
    {
      name: "Michael Chen",
      role: "Teenager, 16",
      image: "https://i.pinimg.com/1200x/db/c6/e0/dbc6e0f2e6c25f06631a0a395e19fb3a.jpg",
      rating: 5,
      text: "As a teenager dealing with sensitive skin, Kezi has been a game-changer. ",
    },
    {
      name: "Emily Rodriguez",
      role: "Young Adult, 22",
      image: "https://i.pinimg.com/736x/95/3f/80/953f80d9ab3b7b1f8018e71f22e494b5.jpg",
      rating: 5,
      text: "I've tried so many products, but Kezi is the only one that's truly natural  .",
    },
  ]

  return (
    <section className="py-24 bg-[var(--secondary-cream-white)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 rounded-2xl shadow border border-[var(--bolder-gray)] transition-all duration-500 hover:border-[var(--gold-color)]/50 hover:-translate-y-2"
            >

              <div className=" flex flex-row-reverse gap-3.5 items-center justify-center ">
                <div className=" flex items-center flex-col gap-1 justify-center ">
                  
                    <h4 className="font-semibold text-[var(--primary)] text-md leading-none mb-1">
                        {testimonial.name}
                    </h4>


              <p className="text-gray-600 font-light italic text-sm leading-relaxed mb-8 min-h-[80px]">
                "{testimonial.text}"
              </p>
                </div>

              <div className="flex items-center gap-4 pt-6">
                <div className="w-20 h-25  overflow-hidden ">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover rounded-md transition-all duration-700"
                  />
                </div>
              </div>
              </div>
              <div className="flex items-center justify-between">
                    <div className="flex gap-1 ">
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
        <div className="mt-16 flex justify-center items-center gap-4 opacity-50">
            <div className="h-[1px] w-12 bg-gray-300"></div>
            <span className="text-[9px] font-bold tracking-widest uppercase text-gray-400">Join 10,000+ Glowing Customers</span>
            <div className="h-[1px] w-12 bg-gray-300"></div>
        </div>
      </div>
    </section>
  )
}

export default Testimonies