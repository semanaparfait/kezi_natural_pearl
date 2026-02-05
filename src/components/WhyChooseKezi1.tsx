import { Leaf } from "lucide-react"

function WhyChooseKezi1() {
  const reasons = [
  {
    id: '01',
    title: 'Purely Natural Ingredients',
    description: 'Our formulations harness the power of nature, using only the finest botanical extracts and natural actives sourced from Rwanda’s rich biodiversity.',
    icon: <Leaf size={20} />
  },
  {
    id: '02',
    title: 'Sustainable & Ethical Sourcing',
    description: 'We are committed to sustainability, partnering with local farmers and communities to ensure our ingredients are ethically sourced and environmentally friendly.',
    icon: <Leaf size={20} />
  },
  {
    id: '03',
    title: 'Gentle on Skin, Tough on Impurities',
    description: 'Our products are formulated to be gentle yet effective, suitable for all skin types, including sensitive skin, while delivering powerful results.',
    icon: <Leaf size={20} />
  }
];
  return (
    <section>
      <div>
        <h1 className="text-center font-semibold text-2xl">Why Choose Kezi</h1>
        <p className="text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo labore in nam officia vel fugit excepturi nemo dicta officiis a. Optio ducimus totam odit nihil dolores placeat officia repudiandae libero?</p>
      </div>
        <div>
        {reasons.map((reason) => (
          <div key={reason.id} className="group flex gap-6 items-start">
            <span className="text-sm font-serif text-[var(--gold-color)] opacity-50 mt-1">
              {reason.id}
            </span>
            <div>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-[var(--gold-color)]">{reason.icon}</span>
                <h3 className="text-lg font-serif text-[var(--primary)] flex items-center gap-3 group-hover:text-[var(--gold-color)] transition-colors">
                  {reason.title}
                </h3>
              </div>
              <p className="text-gray-500 text-sm font-light leading-relaxed max-w-sm">
                {reason.description}
              </p>
            </div>
          </div>  
        ))}
        </div>
      </section>

  )
}

export default WhyChooseKezi1