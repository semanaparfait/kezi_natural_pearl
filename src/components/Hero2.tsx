import Button from "@/components/Button"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import Heroimg from '@/assets/hero/hero2.jpeg'

function Hero2() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden ">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage: `url(${Heroimg})`,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backgroundBlendMode: 'screen',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 " />
      </div>
      <div className="relative  z-10 mx-auto max-w-6xl pl-9  min-h-screen flex items-center">

        {/* ----------new design----------- */}

        <div className="text-white ">
            <div className="text-5xl ">
                <h1 className="uppercase font-semibold pb-3 ">Cleans <span className="text-[#9FCC66]"> beauty</span> </h1>
                <h1 className="uppercase pb-4 font-semibold">begins with  <span className="text-[#9FCC66]">nature</span></h1>
            </div>
            <p className="pb-5 text-lg w-xl">Made with pure ingredients from nature, gently crafted foreveryday care, because your skin deserves the best.</p>
            <button className="bg-[#9FCC66] py-1.5 px-3.5 rounded-md">Shop Now</button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <p className="text-sm text-white/80">Discover More</p>
        <div className="animate-bounce">
          <svg className="w-5 h-5 text-[#9FCC66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero2