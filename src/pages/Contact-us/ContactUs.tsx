import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Input from "@/components/Input";
import Navbar from "@/components/Navbar";
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import  { useState } from "react";
import {useSubmitContactFormMutation} from '@/features/contactUs/contactUsApi'
import toast from "react-hot-toast";

function ContactUs() {
  const [submitContactForm] = useSubmitContactFormMutation();
  const contactInfo = [
    { 
      type: 'Phone', 
      value: '+250 788 000 000', 
      detail: 'Mon-Fri from 8am to 6pm',
      icon: <Phone size={24} className="text-[var(--gold-color)]" /> 
    },
    { 
      type: 'Email', 
      value: 'hello@kezinaura.com', 
      detail: 'Our support team is online',
      icon: <Mail size={24} className="text-[var(--gold-color)]" /> 
    },
    { 
      type: 'Address', 
      value: 'Kigali, Rwanda', 
      detail: 'Centenary House, Level 3',
      icon: <MapPin size={24} className="text-[var(--gold-color)]" /> 
    },
  ];

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContactForm(form).unwrap();
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message.");
    }
  };

  return (
    <section className="bg-[var(--secondary-cream-white)] min-h-screen mt-7">
      <div className="bg-[var(--primary)] shadow-md">
        <Navbar />
      </div>
      <header className="relative py-24 px-6 overflow-hidden border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-serif italic text-[var(--primary)] mb-6 tracking-tight">
            Connect With Us
          </h1>
          <div className="flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.4em] text-[var(--gold-color)] font-black">
            <span>Inquiry</span> <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold-color)]/30"></div> 
            <span>Support</span> <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold-color)]/30"></div> 
            <span>Testimony</span>
          </div>
        </div>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-serif text-black/[0.02] select-none pointer-events-none uppercase tracking-widest italic">
            KEZI
        </span>
      </header>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <div className="space-y-8 animate-in fade-in slide-in-from-left-6 duration-700">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black leading-[0.9] text-[var(--primary)] uppercase">
                Let's <br /> 
                <span className="text-[var(--gold-color)] ml-8">Get In</span> <br /> 
                <span className="ml-16">Touch</span>
              </h2>
              <p className="text-gray-500 text-lg font-light leading-relaxed max-w-md italic">
                We'd love to hear from you. Whether you have questions about our artisanal collection or just want to share your experience.
              </p>
            </div>
            <div className="p-8 bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-[var(--primary)]/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--gold-color)] opacity-5 rounded-bl-full transition-transform group-hover:scale-110"></div>
                <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-2">Our Promise</p>
                <p className="text-[var(--primary)] font-serif italic text-xl">"Each message is handled with the same care we give to our products."</p>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-[var(--primary)]/5 border border-gray-50 animate-in fade-in slide-in-from-right-6 duration-700">
            <form className="space-y-5 flex flex-col" onSubmit={handleSubmit}> 
              <Input
                  label="Name"
                  type="text"
                  placeholder="Your full name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />           
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              
              <div className="space-y-1">
                <label htmlFor="subject" className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 text-gray-900 px-4 py-3 text-sm focus:border-[var(--gold-color)] focus:ring-2 focus:ring-[var(--gold-color)]/20 transition appearance-none cursor-pointer outline-none"
                >
                  <option value="" disabled>Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="testimony">Testimony</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell us what's on your mind..."
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder-gray-400 px-4 py-3 text-sm focus:border-[var(--gold-color)] focus:ring-2 focus:ring-[var(--gold-color)]/20 transition resize-none outline-none"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                className="py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-black shadow-xl hover:translate-y-[-2px] active:translate-y-0 transition-all flex items-center justify-center gap-2"
              >
                Send Message <Send size={14} />
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map((info, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-100 hover:border-[var(--gold-color)] transition-all duration-500 group shadow-sm hover:shadow-xl hover:shadow-[var(--primary)]/5">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {info.icon}
                </div>
                <h4 className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-1">{info.type}</h4>
                <p className="text-[var(--primary)] font-bold text-lg mb-1">{info.value}</p>
                <p className="text-gray-400 text-xs italic">{info.detail}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 mb-20 max-w-7xl mx-auto">
        <div className="relative rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl h-[450px]">
            <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127593.18182741913!2d30.007629630325853!3d-1.9515904838382713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4258ed8e797%3A0xf52b87289416c6c2!2sKigali!5e0!3m2!1sen!2srw!4v1700000000000!5m2!1sen!2srw" 
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(0.5) contrast(1.2)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
      </div>

      <Footer />
    </section>
  );
}

export default ContactUs;