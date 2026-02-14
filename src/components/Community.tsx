import { Instagram } from "lucide-react";
import { useRef, useEffect, useState } from "react";

function Community() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-[var(--secondary-cream-white)] border-t border-[var(--bolder-gray)] overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-[var(--secondary-light-green)] rounded-full blur-[100px] opacity-30 pointer-events-none"></div>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-20 lg:gap-32">
          <div className="flex items-center gap-8 w-full md:w-1/2 justify-center">
            <div className={`w-44 h-60 md:w-52 md:h-72 rounded-2xl overflow-hidden border border-[var(--bolder-gray)] shadow-2xl -translate-y-8 transition-all duration-700 hover:-translate-y-10 hover:shadow-(--primary)/10
              ${show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}
            `}>
              <img
                src="https://i.pinimg.com/1200x/2e/de/df/2ededf11c548c3640ceb07cae2e00134.jpg"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                alt="Radiant Skin Community"
              />
            </div>

            <div className={`w-44 h-60 md:w-52 md:h-72 rounded-2xl overflow-hidden border border-[var(--bolder-gray)] shadow-2xl translate-y-8 transition-all duration-700 hover:translate-y-6 hover:shadow-(--primary)/10
              ${show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
            `}>
              <img
                src="https://i.pinimg.com/1200x/87/6a/9d/876a9d1563ac49c9c32c06a29c07d4f7.jpg"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                alt="Natural Lifestyle"
              />
            </div>
          </div>
          <div className={`w-full md:w-1/2 space-y-10 text-center md:text-left transition-all duration-700 ease-out transform
            ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}>
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="h-[1px] w-8 bg-[var(--gold-color)]"></span>
                <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold-color)] font-bold">
                  The Community
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-serif text-(--primary) italic leading-tight">
                Join thousands <br /> glowing with Kezi.
              </h2>

              <p className="text-gray-500 font-light text-sm max-w-sm leading-relaxed italic">
                Because skincare is more than just a routine—it's a shared journey toward confidence and natural purity.
              </p>
            </div>

            <div className="pt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-(--primary) transition-all"
              >
                <div className="p-3 rounded-full border border-[var(--bolder-gray)] group-hover:bg-(--primary) group-hover:text-white transition-all duration-500">
                  <Instagram size={18} />
                </div>
                <span className="border-b border-[var(--gold-color)] pb-1 group-hover:text-[var(--gold-color)] transition-colors">
                  Follow our journey
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Community;
