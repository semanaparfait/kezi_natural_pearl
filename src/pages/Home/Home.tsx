import Category from '@/components/Category'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Testimonies from '@/components/Testimonies'
import Trendings from '@/components/Trendings'
import  WhyChooseKezi from '@/components/WhyChooseKezi'

function Home() {
  return (
    <div>
        <Navbar />
        <Hero />
        <Category />
        <WhyChooseKezi />
        <Trendings/>
        <Testimonies />
        <Footer />
    </div>
  )
}

export default Home