import { Award, Leaf, Shield, Heart } from "lucide-react"

function WhyChooseKezi() {
  const features = [
    {
      icon: Leaf,
      title: "100% Natural",
      description: "Only pure, plant-based ingredients, No harshchemical, parabens, or aritificial additives."
    },
    {
      icon: Shield,
      title: "Dermatologically Tested",
      description: "All our products are tested and approved by dermatologists to ensure safety for sensitive skin."
    },
    {
      icon: Heart,
      title: "Gentle Care",
      description: "Specially formulated for kids and young adults with mild, nourishing ingredients that care for delicate skin."
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Handcrafted with the finest natural pearls, delivering luxury skincare at affordable prices."
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary)] mb-4">
            Why Choose Kezi?
          </h2>
          <p className="text-lg text-gray-600">
            Discover the difference of natural pearl skincare. Our commitment to quality, 
            purity, and your skin's health sets us apart.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[var(--gold-color)]"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--gold-color)]/10 flex items-center justify-center group-hover:bg-[var(--gold-color)]/20 transition-colors duration-300">
                    <Icon 
                      className="w-8 h-8 text-[var(--gold-color)] group-hover:scale-110 transition-transform duration-300" 
                      strokeWidth={1.5}
                    />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-[var(--primary)] group-hover:text-[var(--gold-color)] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseKezi