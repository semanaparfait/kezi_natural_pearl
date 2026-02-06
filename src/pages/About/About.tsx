import { ArrowRight, Leaf, Eye, Target } from 'lucide-react';

function About() {
  return (
    <section className="bg-[var(--secondary-cream-white)] pt-20">
      
      {/* --- SECTION 1: THE MANIFESTO --- */}
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Vertical Brand Stamp */}
        <div className="hidden lg:block lg:col-span-1">
          <p className="rotate-180 [writing-mode:vertical-lr] text-[10px] uppercase tracking-[1em] text-[var(--gold-color)] font-bold opacity-30">
            KEZI NATURAL PEARL • EST 2024
          </p>
        </div>

        {/* Center: Manifesto Text */}
        <div className="lg:col-span-6 space-y-8">
          <div className="inline-block px-4 py-1 border border-[var(--gold-color)] rounded-full text-[9px] uppercase tracking-widest text-[var(--gold-color)] font-bold">
            The Manifesto
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-[var(--primary)] leading-[1.1]">
            Beauty as a <br />
            <span className="italic">Sacred Ritual.</span>
          </h1>
          <p className="text-gray-500 font-light text-lg leading-relaxed max-w-md italic">
            We believe that skincare should not be a chore, but a moment of stillness—a bridge between the soul and the soil of Rwanda.
          </p>
        </div>

        {/* Right: Asymmetric Image Frame */}
        <div className="lg:col-span-5 relative">
          <div className="relative w-full aspect-[3/4] rounded-t-full overflow-hidden border-[12px] border-white shadow-2xl">
            <img 
              src="https://i.pinimg.com/1200x/8e/77/70/8e77709e232a2dd225b952ededbd32e6.jpg" 
              alt="Organic Beauty" 
              className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
            />
          </div>
          {/* Decorative Gold Badge */}
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[var(--gold-color)] rounded-full flex items-center justify-center p-4 text-center shadow-xl">
             <span className="text-[8px] font-black uppercase tracking-tighter text-white leading-none">Handcrafted In Kigali</span>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: VISION & MISSION (Horizontal Scroll Style) --- */}
      <div className="bg-[var(--primary)] py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
            
            {/* Vision */}
            <div className="space-y-6 group">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[var(--gold-color)] group-hover:bg-white transition-all duration-500">
                <Eye size={20} />
              </div>
              <h3 className="text-white font-serif text-3xl italic">Our Vision</h3>
              <p className="text-white/60 text-sm font-light leading-relaxed">
                To weave the purity of African botanicals into the global fabric of luxury skincare, ensuring a future where beauty is synonymous with integrity.
              </p>
            </div>

            {/* Mission */}
            <div className="space-y-6 group translate-y-0 md:translate-y-12">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[var(--gold-color)] group-hover:bg-white transition-all duration-500">
                <Leaf size={20} />
              </div>
              <h3 className="text-white font-serif text-3xl italic">Our Mission</h3>
              <p className="text-white/60 text-sm font-light leading-relaxed">
                To empower local Rwandan communities through sustainable sourcing while delivering bio-active, toxin-free results to the modern individual.
              </p>
            </div>

            {/* Goal */}
            <div className="space-y-6 group translate-y-0 md:translate-y-24">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[var(--gold-color)] group-hover:bg-white transition-all duration-500">
                <Target size={20} />
              </div>
              <h3 className="text-white font-serif text-3xl italic">Our Goal</h3>
              <p className="text-white/60 text-sm font-light leading-relaxed">
                To maintain a zero-waste artisanal process that protects our environment while perfecting the science of radiant, healthy skin.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* --- SECTION 3: THE PROCESS (Clean Split) --- */}
      <div className="py-32 bg-white px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--primary)] italic mb-12">The Artisanal Standard</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
                {[
                  { label: "Sourcing", val: "Local" },
                  { label: "Production", val: "Small Batch" },
                  { label: "Ingredients", val: "Raw" },
                  { label: "Packaging", val: "Sustainable" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <span className="text-[var(--gold-color)] text-xl font-serif italic">{item.val}</span>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">{item.label}</span>
                  </div>
                ))}
            </div>
            
            <div className="mt-20">
               <button className="px-12 py-4 bg-[var(--primary)] text-white text-[11px] font-bold uppercase tracking-[0.4em] rounded-full hover:bg-[var(--gold-color)] transition-colors shadow-xl">
                  Explore the Ritual
               </button>
            </div>
        </div>
      </div>

    </section>
  );
}

export default About;