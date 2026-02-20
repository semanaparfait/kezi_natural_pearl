import { useState } from 'react'
import Input from '@/components/Input'
import Button from '@/components/Button'
import logo from '@/assets/logo.png'
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail,MapPin } from 'lucide-react'

function Footer() {
  const [email, setEmail] = useState('')

  return (
    <section className='bg-(--primary) text-white'>
      <div className='mx-auto max-w-7xl px-6 py-12'>
        <div className='flex flex-wrap gap-12'>
          {/* Brand & Newsletter */}
          <div className='flex flex-col gap-4 flex-1 min-w-[280px]'>
            <div >
              <img src={logo} alt="KEZI Logo" className='w-20 h-20 brightness-0 invert' />
              <p className='mt-2 text-sm text-white/80'>Premium natural pearls and sustainable beauty products.</p>
            </div>
            <div className='flex flex-col gap-2'>
              <Input 
                type='email'
                placeholder='Enter your email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='!border-white/30 !bg-white/10 !text-white placeholder:!text-white/50'
              />
              <Button fullWidth>Subscribe</Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className='flex flex-col gap-3 flex-1 min-w-[200px]'>
            <h2 className='font-semibold text-lg'>Quick Links</h2>
            <ul className='flex flex-col gap-2'>
              <li><a href='/' className='text-sm text-white/80 hover:text-white transition'>Home</a></li>
              <li><a href='/about' className='text-sm text-white/80 hover:text-white transition'>About Us</a></li>
              <li><a href='/shop' className='text-sm text-white/80 hover:text-white transition'>Shop</a></li>
              <li><a href='/contact-us' className='text-sm text-white/80 hover:text-white transition'>Contact</a></li>
            </ul>
          </div>

          {/* Shop */}
          <div className='flex flex-col gap-3 flex-1 min-w-[200px]'>
            <h2 className='font-semibold text-lg'>Shop</h2>
            <ul className='flex flex-col gap-2'>
              <li><a href='/shop' className='text-sm text-white/80 hover:text-white transition'>All Products</a></li>
              <li><a href='/shop?sort=best' className='text-sm text-white/80 hover:text-white transition'>Best Sellers</a></li>
              <li><a href='/shop?sort=new' className='text-sm text-white/80 hover:text-white transition'>New Arrivals</a></li>
              <li><a href='/shop?filter=sale' className='text-sm text-white/80 hover:text-white transition'>Special Offers</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className='flex flex-col gap-3 flex-1 min-w-[200px]'>
            <h2 className='font-semibold text-lg'>Contact Us</h2>
            <ul className='flex flex-col gap-2'>
              <li className='text-sm text-white/80 flex gap-2'><MapPin/> 123 Main St, City, Country</li>
              <li><a href='mailto:info@kezi.com' className='text-sm text-white/80 hover:text-white transition flex gap-2'><Mail/> info@kezi.com</a></li>
              <li><a href='tel:+1234567890' className='text-sm text-white/80 hover:text-white transition flex gap-2'><Phone/> +123 456 7890</a></li>
            </ul>
            <div className='flex gap-3 mt-2'>
              <a href='#' aria-label='Facebook' className='flex items-center justify-center w-9 h-9 rounded-full bg-[var(--gold-color)] text-white hover:bg-[var(--accent-color)] transition'>
                <Facebook className='w-5 h-5' />
              </a>
              <a href='#' aria-label='Instagram' className='flex items-center justify-center w-9 h-9 rounded-full bg-[var(--gold-color)] text-white hover:bg-[var(--accent-color)] transition'>
                <Instagram className='w-5 h-5' />
              </a>
              <a href='#' aria-label='Twitter' className='flex items-center justify-center w-9 h-9 rounded-full bg-[var(--gold-color)] text-white hover:bg-[var(--accent-color)] transition'>
                <Twitter className='w-5 h-5' />
              </a>
              <a href='#' aria-label='Youtube' className='flex items-center justify-center w-9 h-9 rounded-full bg-[var(--gold-color)] text-white hover:bg-[var(--accent-color)] transition'>
                <Youtube className='w-5 h-5' />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <footer className='border-t border-white/20 px-6 py-6'>
        <div className='mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-sm text-white/70'>&copy; {new Date().getFullYear()} Kezi Natural Pearls. All rights reserved.</p>
          <div className='flex gap-6 text-sm text-white/70'>
            <a href='#' className='hover:text-white transition'>Privacy Policy</a>
            <a href='#' className='hover:text-white transition'>Terms of Service</a>
          </div>
        </div>
      </footer>
    </section>
  )
}

export default Footer