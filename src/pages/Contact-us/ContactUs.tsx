import { useState } from "react"
import Button from "@/components/Button"
import Footer from "@/components/Footer"
import Input from "@/components/Input"
import Navbar from "@/components/Navbar"
import {Mail, Phone, MapPin} from 'lucide-react'

function ContactUs() {
 const contactInfo = [
    { type: 'phone' , value: '+1 (555) 123-4567', icon: <Phone /> },
    { type: 'email' , value: 'contact@example.com', icon: <Mail /> },
    { type: 'address' , value: '123 Main St, Anytown, USA', icon: <MapPin /> },
 ]

  return (
    <section>
      <Navbar />
      
      <div className="min-h-screen  flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2  items-center">
          <div className="flex flex-col justify-center  md:ml-3.5">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black  leading-tight">
                LET'S
                <br />
                <p className="ml-8">GET IN</p>
                <p className="ml-18">TOUCH</p>
              </h1>
              <p className="0 text-base sm:text-lg max-w-md">
                We'd love to hear from you. Whether you have questions, feedback, or need support, feel free to reach out to us.
              </p>
            </div>
          </div>


          <div className="w-full ">
            <form  className="space-y-3  flex flex-col"> 
              <Input
                  label="Name"
                  type="text"
                  placeholder="Your full name"
                  required
                  className="outline-none"
                />           
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="outline-none"
                />
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full rounded-2xl border border-gray-300 bg-white text-gray-900 px-4 py-2 text-sm focus:border-[var(--gold-color)] focus:ring-2 focus:ring-[var(--gold-color)] transition appearance-none cursor-pointer outline-none"
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="testimony">Testimony</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"

                  required
                  placeholder="Tell us what's on your mind..."
                  rows={5}
                  className="w-full rounded-2xl outline-none border border-gray-300 bg-white text-gray-900 placeholder-gray-400 px-4 py-2 text-sm focus:border-[var(--gold-color)] focus:ring-2 focus:ring-[var(--gold-color)] transition resize-none"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                className="py-3 text-base font-semibold"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="px-4 mb-4">
        <iframe
         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.4730576220622!2d30.098852474015416!3d-1.9646178980175963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca9b295f0ced9%3A0x3cb73a2a3f5aa7c5!2sSOLVIT%20AFRICA%20Training%20Center!5e0!3m2!1sen!2srw!4v1769590230322!5m2!1sen!2srw" 
           allowfullscreen="" 
           height={350}
           className="w-full rounded-2xl"
           referrerpolicy="no-referrer-when-downgrade">

           </iframe>
      </div>

      <Footer />
    </section>
  )
}

export default ContactUs