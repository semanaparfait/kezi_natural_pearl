import { Mail, MessageCircle, Phone } from "lucide-react";

function Support() {
  const contactMethods = [
    { icon: <MessageCircle size={20} />, title: "Live Chat", detail: "Average response: 5m", link: "#" },
    { icon: <Mail size={20} />, title: "Email Us", detail: "care@kezipearl.com", link: "mailto:care@kezipearl.com" },
    { icon: <Phone size={20} />, title: "Call Center", detail: "+250 788 000 000", link: "tel:+250788000000" },
  ];

  return (
    <section className="min-h-screen bg-white text-gray-800">
      <div className="py-20 px-6 bg-[var(--secondary-cream-white)] text-center">
        <h1 className="text-4xl md:text-5xl font-serif italic text-[var(--primary)] mb-4">Support Rituals</h1>
        <p className="text-gray-500 max-w-lg mx-auto text-sm italic font-light">
          We are here to ensure your journey with Kezi is as pure as our products. 
          Choose your preferred way to connect.
        </p>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {contactMethods.map((method, i) => (
            <a 
              key={i} 
              href={method.link}
              className="group p-8 border border-[var(--bolder-gray)]/30 rounded-3xl hover:border-[var(--gold-color)] hover:shadow-xl hover:shadow-[var(--gold-color)]/5 transition-all duration-500"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--secondary-cream-white)] flex items-center justify-center text-[var(--primary)] mb-6 group-hover:bg-[var(--gold-color)] group-hover:text-white transition-colors">
                {method.icon}
              </div>
              <h3 className="font-serif text-xl italic text-[var(--primary)] mb-2">{method.title}</h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{method.detail}</p>
            </a>
          ))}
        </div>

        <div className="mt-24 text-center">
            <p className="text-gray-400 text-xs italic mb-4">Still need assistance?</p>
            <button className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--primary)] border-b border-[var(--gold-color)] pb-2 hover:text-[var(--gold-color)] transition-colors">
                Open a Support Ticket
            </button>
        </div>
      </main>
    </section>
  );
}

export default Support;