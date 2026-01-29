import Button from "@/components/Button"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import Heroimg from '@/assets/hero/hero.jpeg'

function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden ">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${Heroimg})`,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backgroundBlendMode: 'screen',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>
      <div className="relative  z-10 mx-auto max-w-7xl px-6 md:px-8 py-20 md:py-14 min-h-screen flex items-center">
        <div className="max-w-2xl space-y-6 md:space-y-8">
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight text-white">
              Pure Nature,
              <br />
              <span className="text-[var(--primary)]">Pure Care</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-xl leading-relaxed">
              Natural soaps crafted for kids and young adults. Experience the gentle touch of nature in every wash. Healthy skin starts here.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/shop">
              <Button 
                variant="primary" 

                className="group"
                rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />}
              >
                Shop Now
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                variant="secondary" 
              >
                Learn More
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-3 pt-8 border-t border-white/20 items-center">
              <div className="flex -space-x-3">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
                  alt="Family member 1"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" 
                  alt="Family member 2"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" 
                  alt="Family member 3"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              </div>
              <p className="text-white">Trusted by 2,000 + families</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <p className="text-sm text-white/80">Discover More</p>
        <div className="animate-bounce">
          <svg className="w-5 h-5 text-[var(--gold-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero