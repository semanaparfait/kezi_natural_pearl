import { ShieldCheck, Leaf,  Award } from 'lucide-react';

function WhyChooseKezi() {
  const reasons = [
    {
      id: "01",
      title: "Artisanal Rwandan Craftsmanship",
      description: "Every product is handcrafted in small batches using traditional wisdom passed down through generations.",
      icon: <Award size={20} />
    },
    {
      id: "02",
      title: "100% Organic & Bio-Active",
      description: "We source pure, nutrient-rich botanicals from local farmers to ensure your skin receives only the best nature offers.",
      icon: <Leaf size={20} />
    },
    {
      id: "03",
      title: "Dermatologically Gentle",
      description: "Our formulas are pH-balanced and free from synthetic chemicals, making them safe for even the most sensitive skin.",
      icon: <ShieldCheck size={20} />
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl z-10">
              <img 
                src="https://i.pinimg.com/1200x/b2/7f/ad/b27fad3c748510883624111a3e78ee08.jpg" 
                alt="Natural Sourcing" 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute bottom-8 -right-4 bg-[var(--primary)] text-white p-6 rounded-2xl shadow-xl hidden md:block">
                <p className="text-3xl font-serif italic mb-1">100%</p>
                <p className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-80">Natural Purity</p>
              </div>
            </div>
            <div className="absolute top-10 left-10 w-full max-w-[400px] aspect-[4/5] border border-[var(--gold-color)] rounded-3xl opacity-20 -translate-x-6 translate-y-6"></div>
          </div>
          <div className="w-full lg:w-1/2 space-y-12">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="h-[1px] w-12 bg-[var(--gold-color)]"></span>
                <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold-color)] font-bold">The Difference</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-[var(--primary)] italic leading-tight">
                Why Choose Kezi.
              </h2>
            </div>

            <div className="space-y-10">
              {reasons.map((reason) => (
                <div key={reason.id} className="group flex gap-6 items-start">
                  <span className="text-sm font-serif text-[var(--gold-color)] opacity-50 mt-1">
                    {reason.id}
                  </span>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-serif text-[var(--primary)] flex items-center gap-3 group-hover:text-[var(--gold-color)] transition-colors">
                      <span className="text-[var(--gold-color)]">{reason.icon}</span>
                      {reason.title}
                    </h3>
                    <p className="text-gray-500 text-sm font-light leading-relaxed max-w-sm">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-8 border-t border-[var(--bolder-gray)]/30">
               <div className="flex items-center gap-8">
                  <div className="flex flex-col">
                    <span className="text-xl font-serif text-[var(--primary)]">5,000+</span>
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Monthly Rituals</span>
                  </div>
                  <div className="h-8 w-[1px] bg-[var(--bolder-gray)]"></div>
                  <div className="flex flex-col">
                    <span className="text-xl font-serif text-[var(--primary)]">4.9/5</span>
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">User Rating</span>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhyChooseKezi;