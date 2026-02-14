import { useState, useRef, useEffect } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

function FQA() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

  const faqs = [
    {
      question: "What is Kezi Natural Pearl?",
      answer: "Kezi Natural Pearl is an artisanal skincare brand dedicated to merging traditional Rwandan botanical wisdom with modern purity. We offer natural, effective products designed to enhance your skin's innate health."
    },
    {
      question: "Are Kezi products suitable for all skin types?",
      answer: "Absolutely. Our formulas are pH-balanced and dermatologically gentle, making them ideal for all skin types—including extremely sensitive or reactive skin."
    },
    {
      question: "How do I choose the right products for my skin?",
      answer: "We believe skincare is personal. You can consult with our experts via our contact page or take our 2-minute skin ritual quiz to find your perfect match."
    },
    {
      question: "What ingredients are used in Kezi products?",
      answer: "We source local, organic ingredients like cold-pressed aloe vera, calming chamomile, and green tea extracts, enriched with therapeutic-grade essential oils."
    },
    {
      question: "How can I track my order?",
      answer: "Once your handcrafted order is on its way, you will receive a tracking link via email to follow its journey from our studio to your doorstep."
    }
  ];

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto py-24 px-6 lg:px-12 overflow-hidden bg-[var(--secondary-cream-white)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className={`lg:col-span-5 space-y-6 transition-all duration-700 ease-out transform
          ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}>
          <div className="flex items-center gap-3 text-[var(--gold-color)] mb-4">
            <HelpCircle size={20} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Support Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-(--primary) italic leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500 font-light leading-relaxed max-w-md">
            Skincare can be complex, so we’ve gathered the most common questions to help guide you on your journey to healthy, beautiful skin. 
          </p>
          <div className="pt-4">
            <button className="text-[11px] font-bold uppercase tracking-widest text-(--primary) border-b-2 border-[var(--gold-color)] pb-1 hover:text-[var(--gold-color)] transition-all">
              Still need help? Contact us
            </button>
          </div>
        </div>
        <div className="lg:col-span-7 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-2xl transition-all duration-700 ease-out transform overflow-hidden
                  ${isOpen 
                    ? "border-[var(--gold-color)] bg-white shadow-xl shadow-(--primary)/5" 
                    : "border-[var(--bolder-gray)] bg-transparent hover:border-(--primary)"}
                  ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
                `}
                style={{ transitionDelay: `${index * 150}ms` }} 
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between py-4 px-8 text-left"
                >
                  <span className={`font-serif text-lg transition-colors ${isOpen ? "text-(--primary)" : "text-gray-700"}`}>
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full transition-all ${isOpen ? "bg-(--primary) text-white rotate-180" : "bg-gray-100 text-(--primary)"}`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <div className={`transition-all duration-500 ease-in-out ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="px-8 pb-8 text-sm text-gray-500 font-light leading-relaxed border-t border-gray-50 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default FQA;
