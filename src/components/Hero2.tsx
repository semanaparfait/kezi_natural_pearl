import Heroimg from '@/assets/hero/hero2.jpeg'
import { useRef, useEffect, useState } from 'react';

function Hero2() {
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
    <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden ">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${Heroimg})`,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backgroundBlendMode: 'screen',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 " />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl pl-9 min-h-screen flex items-center">
        <div className="text-white space-y-5">
          <div className={`transition-all duration-1000 transform ease-out
            ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}
          `}>
            <h1 className="uppercase font-semibold pb-3 md:text-5xl text-3xl">
              Cleans <span className="text-(--primary)"> beauty</span>
            </h1>
            <h1 className="uppercase pb-4 font-semibold md:text-5xl text-3xl">
              begins with <span className="text-(--primary)">nature</span>
            </h1>
          </div>
          <p className={`md:text-lg max-w-xl transition-all duration-1000 delay-150 transform ease-out
            ${show ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
          `}>
            Made with pure ingredients from nature, gently crafted for everyday care, because your skin deserves the best.
          </p>
          <button className={`bg-(--primary) py-1.5 px-3.5 rounded-md transition-all duration-1000 delay-300 transform ease-out
            ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
          `}>
            Shop Now
          </button>
        </div>
      </div>
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <p className="text-sm text-white/80">Discover More</p>
        <div className="animate-bounce">
          <svg className="w-5 h-5 text-(--primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
      <div className='bg-(--primary) z-20 text-white flex justify-evenly py-4 absolute bottom-0 w-full text-sm'>
        <p>Fast Shipping</p>
        <p>Quality Products</p>
        <p>Eco-Friendly</p>
        <p>Customer Satisfaction</p>
      </div>
    </section>
  )
}

export default Hero2;
