import {  Star } from "lucide-react"

function Testimonies() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Mother of Two",
      image: "https://i.pinimg.com/736x/08/68/77/0868770695ca2340b89e5933e8aa4c78.jpg",
      rating: 5,
      text: "My kids absolutely love Kezi soap! Their skin has never been healthier, and I love that it's all natural. The pearl essence gives their skin a beautiful glow.",

    },
    {
      name: "Michael Chen",
      role: "Teenager, 16",
      image: "https://i.pinimg.com/1200x/db/c6/e0/dbc6e0f2e6c25f06631a0a395e19fb3a.jpg",
      rating: 5,
      text: "As a teenager dealing with sensitive skin, Kezi has been a game-changer. No more irritation, just clean, fresh feeling skin every day.",

    },
    {
      name: "Emily Rodriguez",
      role: "Young Adult, 22",
      image: "https://i.pinimg.com/736x/95/3f/80/953f80d9ab3b7b1f8018e71f22e494b5.jpg",
      rating: 5,
      text: "I've tried so many products, but Kezi is the only one that's truly natural and effective. My skin feels soft, looks radiant, and I love supporting a brand that cares about purity.",

    },
    
  ]

  return (
    <section className=" bg-white overflow-hidden hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Star className="w-6 h-6 fill-[var(--gold-color)] text-[var(--gold-color)]" />
            <Star className="w-6 h-6 fill-[var(--gold-color)] text-[var(--gold-color)]" />
            <Star className="w-6 h-6 fill-[var(--gold-color)] text-[var(--gold-color)]" />
            <Star className="w-6 h-6 fill-[var(--gold-color)] text-[var(--gold-color)]" />
            <Star className="w-6 h-6 fill-[var(--gold-color)] text-[var(--gold-color)]" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary)] mb-4">
            Hear From Our Community
          </h2>
          <p className="text-lg text-gray-600">
            Real stories from real customers who transformed their skincare with Kezi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl border border-gray-100 hover:border-[var(--gold-color)]/30 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-100 rounded-t-2xl">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover object-[50%_25%] transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/15 via-transparent to-black/10" />
                <div className="absolute inset-0 pointer-events-none ring-1 ring-black/5" />

              </div>

              <div className="p-6 bg-[var(--primary)] text-white flex flex-col gap-4 rounded-b-2xl flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-white/80">{testimonial.role}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[var(--gold-color)] text-[var(--gold-color)]"
                      />
                    ))}
                  </div>
                </div>

                <p className="text-white/90 leading-relaxed flex-1">
                  "{testimonial.text}"
                </p>


              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  )
}

export default Testimonies