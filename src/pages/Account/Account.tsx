import { useState} from "react"
import Button from "@/components/Button"
import Footer from "@/components/Footer"
import Input from "@/components/Input"
import Navbar from "@/components/Navbar"
import image from '@/assets/account/illistrator.svg'
import { toast } from "react-hot-toast"
import {useLoginMutation,useRegisterMutation} from '@/features/auth/authApi'

function Account() {
  const [action, setAction] = useState<'signup' | 'signin'>('signup');
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phonenumber: '',
    password: '',
  });
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (action === 'signup') {
      try {
        await register({
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password,
          phonenumber: formData.phonenumber,
        }).unwrap();

        toast.success('Account created successfully! Please log in.');

        // Switch to login form and keep the email for convenience
        setAction('signin');
        setFormData({
          email: formData.email,
          password: '',
          fullname: '',
          phonenumber: ''
        });
      } catch (err: any) {
        console.error('Signup error:', err);
        const errorMsg = err?.data?.message || 'Signup failed';
        toast.error(errorMsg);
      }
      return;
    }

    // Sign in flow
    try {
      await login({ email: formData.email, password: formData.password }).unwrap();
      toast.success('Signed in successfully!');
    } catch (err: any) {
      console.error('Signin error:', err);
      const errorMsg = err?.data?.message || 'Signin failed';
      toast.error(errorMsg);
    }
  };


  return (
    <section className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex flex-1 flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-6 md:px-12 lg:px-24 ">
          <div className="md:flex hidden">
            <img
              src={image}
              alt="Account Illustration"
              className="w-full h-auto max-w-md mx-auto"
            />
          </div>
      <div className="flex-1 flex items-center justify-center  py-16 ">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-full p-1 gap-1">
              <button
                type="button"
                onClick={() => setAction('signup')}
                aria-pressed={action === 'signup'}
                className={`px-8 py-2.5 rounded-full font-medium text-sm transition-all ${action === 'signup' ? 'bg-[var(--primary)] text-white shadow-md' : 'text-gray-600 hover:text-[var(--primary)]'}`}
              >
                Sign up
              </button>
              <button
                type="button"
                onClick={() => setAction('signin')}
                aria-pressed={action === 'signin'}
                className={`px-8 py-2.5 rounded-full font-medium text-sm transition-all ${action === 'signin' ? 'bg-[var(--primary)] text-white shadow-md' : 'text-gray-600 hover:text-[var(--primary)]'}`}
              >
                Sign in
              </button>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[var(--primary)] text-center mb-6">
            {action === 'signup' ? 'Create Account' : 'Welcome Back'}
          </h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {action === 'signup' && (
              <Input 
                label="Name" 
                type="text" 
                placeholder="Enter your name" 
                required
                className="outline-none"
                value={formData.fullname}
                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
              />
            )}
            <Input 
              label="Email" 
              type="email" 
              placeholder="Enter your email"
              required 
              className="outline-none" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input 
              label="Phone Number" 
              type="tel"
              placeholder="Enter your phone number"
              required 
              className="outline-none"
              value={formData.phonenumber}
              onChange={(e) => setFormData({ ...formData, phonenumber: e.target.value })}
            />
            <Input 
              label="Password" 
              type="password" 
              placeholder="Enter your password"
              required 
              className="outline-none"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <Button variant="primary" size="md" fullWidth disabled={isLoginLoading || isRegisterLoading}>
              {(isLoginLoading || isRegisterLoading) ? 'loading...' : (action === 'signup' ? 'Sign Up' : 'Sign In')}
            </Button>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or {action === 'signup' ? 'sign up' : 'sign in'} with</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {/* Google */}
              <button type="button" className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>
              
              {/* Facebook */}
              <button type="button" className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              
              {/* GitHub */}
              <button type="button" className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </button>
            </div>
          </form>

        </div>
      </div>
      </div>
      <Footer />
    </section>
  )
}

export default Account