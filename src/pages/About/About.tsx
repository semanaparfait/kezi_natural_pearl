import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Quote,ArrowRight } from "lucide-react";
import owner from '@/assets/about/WhatsApp Image 2026-01-26 at 1.07.31 PM (2).jpeg'
import Testimonies from "@/components/Testimonies";

function About() {
  const rates = [
    { counts: '15,840 +', title: 'Products Sold' },
    { counts: '12,000 +', title: 'Active Customers' },
    { counts: '98%', title: 'Happy Clients' },
  ]

  return (
    <section className="bg-[var(--secondary-cream-white)]">
      <Navbar />
      <div 
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://i.pinimg.com/1200x/79/04/3d/79043d911c5bd921ccb771df66434cd0.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="text-white text-center z-10 px-6">
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">Since 2020</span>
          <h1 className="font-serif italic text-5xl md:text-7xl mb-4">Our Essence</h1>
          <p className="max-w-xl mx-auto font-light text-gray-200 italic leading-relaxed">
            Revolutionizing the skincare industry through the raw power of Rwandan botanicals and artisanal purity.
          </p>
        </div>
      </div>

      {/* --- story behind kezi section --- */}
      <div className="max-w-7xl mx-auto py-24 px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-[12px] border-white w-full aspect-square md:w-[450px]">
              <img 
                src="https://i.pinimg.com/736x/fb/04/4b/fb044bc8dd66189574cb992b0abf6f9a.jpg" 
                alt="Our Story" 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
              />
            </div>
            {/* Decorative Background Box */}
            <div className="absolute -bottom-10 -right-10 w-full h-full bg-[var(--gold-color)] opacity-10 rounded-2xl -z-10 hidden md:block"></div>
          </div>

          <div className="space-y-8">
            <div className="inline-flex items-center gap-3">
               <span className="h-[1px] w-8 bg-[var(--gold-color)]"></span>
               <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold-color)] font-bold">The Heritage</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-(--primary) italic">A Legacy Crafted by Nature</h2>
            <p className="text-gray-600 font-light leading-relaxed italic">
              Our journey began with a simple observation: nature already holds the secrets to radiance. Founded in 2020, Kezi Natural Pearl was built to bridge the gap between traditional wisdom and modern luxury. 
              <br /><br />
              Every pearl essence and botanical extract is a testament to our commitment to the Rwandan soil and the hands that harvest its bounty.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[var(--bolder-gray)]/30">
              {rates.map((rate, index) => (
                <div key={index} className="text-left group">
                  <h3 className="font-serif text-2xl text-(--primary) group-hover:text-[var(--gold-color)] transition-colors">{rate.counts}</h3>
                  <p className="text-[8px] uppercase tracking-widest text-gray-400 font-bold mt-1">{rate.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- mission we aim --- */}
      <div className="bg-(--primary) py-10 ">
        <div className=" px-6  flex flex-wrap gap-4  items-center justify-evenly">

          <div className=" text-white space-y-8  ">
            <Quote className="text-[var(--gold-color)] opacity-30" size={64} />
            <h2 className="font-serif text-4xl md:text-5xl italic leading-tight">Our Mission is <br /> <span className="text-[var(--gold-color)]">Transparency.</span></h2>
            <p className="text-gray-300 font-light text-lg leading-relaxed italic max-w-lg">
              We exist to empower our community and your skin. By sourcing 100% organic ingredients directly from local Rwandan farmers, we ensure that every drop is as ethical as it is effective.
            </p>
            <div className="pt-4">
               <button className="px-10 py-3 rounded-full border border-[var(--gold-color)] text-[var(--gold-color)] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[var(--gold-color)] hover:text-white transition-all">
                 Read Our Ethics
               </button>
            </div>
          </div>
        <div className=" rounded-md  border border-white/10 shadow-2xl">
          <img 
            src={owner} 
            alt="Mission" 
            className="w-full h-80 object-cover rounded-md transition-transform duration-1000 hover:scale-105" 
          />
        </div>
        </div>
      </div>

            {/* --- mission we aim --- */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="w-full md:w-1/3 order-2 md:order-1">
            <div className="relative group">
              <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden border border-[var(--bolder-gray)]/30 shadow-2xl">
                <img 
                  src={owner} 
                  alt="Our Vision" 
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" 
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-8 order-1 md:order-2">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.5em] text-[var(--gold-color)] font-bold">The Horizon</span>
                <span className="h-[1px] w-12 bg-[var(--gold-color)] opacity-40"></span>
              </div>
              
              <h2 className="font-serif text-4xl md:text-5xl text-(--primary) italic leading-tight">
                A Future Rooted in <br />
                <span className="text-[var(--gold-color)]">Artisanal Luxury.</span>
              </h2>
              
              <p className="text-gray-500 font-light text-lg leading-relaxed italic max-w-lg">
                We envision a world where beauty is no longer defined by synthetic speed, but by the slow, intentional rhythm of nature. Our goal is to set the global standard for Rwandan skincare excellence.
              </p>
            </div>

            <div className="pt-4">
              <button className="group flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-(--primary) border-b border-[var(--gold-color)] pb-2 hover:gap-6 transition-all">
                Explore Our Future <ArrowRight size={14} className="group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>
      </div>
      <div className="py-32 px-6 hidden">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-12">
           <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold-color)] font-bold">Future Horizon</span>
           <h2 className="font-serif text-5xl text-(--primary) italic leading-tight">To be the global signature of <br /> Rwandan Artisanal Luxury.</h2>
           <div className="w-16 h-[1px] bg-[var(--gold-color)]"></div>
           <p className="text-gray-500 font-light italic leading-relaxed max-w-2xl">
             We envision a world where beauty is no longer defined by synthetic speed, but by the slow, intentional rhythm of nature. Our vision is to cultivate a global family that values purity over production.
           </p>
        </div>
      </div>
      <Testimonies />

      <Footer />
    </section>
  );
}

export default About;