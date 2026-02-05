import Category from '@/components/Category'
import Community from '@/components/Community'
import Footer from '@/components/Footer'
import FQA from '@/components/FQA'
import Hero2 from '@/components/Hero2'
import Navbar from '@/components/Navbar'
import Testimonies from '@/components/Testimonies'
import Trendings from '@/components/Trendings'
// import  WhyChooseKezi from '@/components/WhyChooseKezi'
import Voice from '@/Voice/Voice'
function Home() {
  return (
    <div>
        <Navbar />
        <Voice />
        <Hero2 />
        <Category />
        {/* <WhyChooseKezi /> */}
        <Trendings/>
        <Testimonies />
        <FQA />
        <Community />
        <Footer />
    </div>
  )
}

export default Home