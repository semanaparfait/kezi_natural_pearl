import { useState } from "react";
import { MoveLeft, User, ShoppingBag,Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import Input from "@/components/Input";
import toast from "react-hot-toast";
import {useLoginMutation,useRegisterMutation} from '@/features/auth/authApi'
function Account2() {
  const navigate = useNavigate();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [authType, setAuthType] = useState("customer");
  const [action, setAction] = useState<'signup' | 'signin'>('signin');
  const [formData,setFormData] = useState({
    email: '',
    phoneNumber: '',
    password: '',
  })  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (action === 'signup') {
      try {
        await register({
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
        }).unwrap();
          
        toast.success('Account created successfully! Please log in.');
        navigate("/verify-email");

        // setAction('signin');
        // setFormData({
        //   email: formData.email,
        //   password: '',
        //   phoneNumber: ''
        // });
      } catch (err: any) {
        console.error('Signup error:', err);
        const errorMsg = err?.data?.message || 'Signup failed';
        toast.error(errorMsg);
      }
      return;
    }
    try {
      const response = await login({
         email: formData.email,
         password: formData.password }).unwrap();
      toast.success('Signed in successfully!');
      if(response.access_token) {
        localStorage.setItem('token', response.access_token);
      }
      if(response.refresh_token) {
        localStorage.setItem('refreshToken', response.refresh_token);
      }
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      navigate('/');
    } catch (err: any) {
      console.error('Signin error:', err);
      const errorMsg = err?.data?.message || 'Signin failed';
      toast.error(errorMsg);
    }
  };


  const isSubmitting = action === 'signup' ? isRegisterLoading : isLoginLoading;

  return (

    <section className="h-screen w-full flex items-center justify-center bg-[#0d130e] overflow-hidden relative font-sans">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(13, 19, 14, 0.8), rgba(13, 19, 14, 0.6)), url("https://i.pinimg.com/1200x/d0/28/18/d0281827f641f8f4e4536acb7aee0084.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="absolute top-6 left-6 z-30">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-2 px-4 py-2 rounded-full text-[9px] uppercase tracking-widest text-white/80 bg-black/20 backdrop-blur-md border border-white/10 hover:bg-black/40 transition-all"
        >
          <MoveLeft size={14} /> Back Home
        </button>
      </div>

      <div className="relative z-10 w-full max-w-5xl h-[90vh] max-h-[750px] flex shadow-2xl rounded-[24px] overflow-hidden border border-white/10 mx-4 bg-white/10 backdrop-blur-md">
        <div className="hidden lg:flex flex-col justify-end w-1/2 p-12 relative overflow-hidden">
           <img 
            src="https://i.pinimg.com/1200x/d0/28/18/d0281827f641f8f4e4536acb7aee0084.jpg" 
            alt="Skincare" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="relative z-10">
            <h1 className="text-4xl text-white font-serif italic mb-2">Natural Glow</h1>
            <p className="text-white/70 text-[10px] uppercase tracking-[0.4em]">Inspired by kezi Nature pearl</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 h-full flex flex-col bg-white  p-6 md:p-1">
          <div className="max-w-sm mx-auto w-full my-auto">
            <header className="mb-6 text-center">
              <h3 className="text-2xl font-serif text-gray-900 italic">Identify Yourself</h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Select your access</p>
            </header>

            <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
              <button 
                onClick={() => setAuthType("customer")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[9px] font-bold uppercase transition-all ${authType === 'customer' ? 'bg-white shadow text-emerald-900' : 'text-gray-400'}`}
              >
                <User size={14} /> Member
              </button>
              <button 
                onClick={() => setAuthType("guest")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[9px] font-bold uppercase transition-all ${authType === 'guest' ? 'bg-white shadow text-emerald-900' : 'text-gray-400'}`}
              >
                <ShoppingBag size={14} /> Guest
              </button>
            </div>

            {authType === 'customer' ? (
              <div className="space-y-4">
                <div className="flex justify-center gap-1 bg-gray-50 w-fit mx-auto p-1 rounded-full border border-gray-400">
                  <button onClick={() => setAction('signin')} className={`px-4 py-1.5 rounded-full text-[8px] font-bold uppercase ${action === 'signin' ? 'bg-emerald-900 text-white' : 'text-gray-400'}`}>Sign In</button>
                  <button onClick={() => setAction('signup')} className={`px-4 py-1.5 rounded-full text-[8px] font-bold uppercase ${action === 'signup' ? 'bg-emerald-900 text-white' : 'text-gray-400'}`}>Sign Up</button>
                </div>

                <form className="space-y-3" onSubmit={handleSubmit}>
                  <Input
                   label="Email"
                   type="email"
                   placeholder="email@example.com"
                    fullWidth 
                   value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                  {action === 'signup' && 
                  <Input label="Phone" 
                  type="tel" placeholder="+250..."
                   fullWidth  value={formData.phoneNumber} 
                   onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} />}
                  <Input label="Password"
                   type="password"
                    placeholder="••••••••"
                     fullWidth 
                      rightIcon={<Eye size={17}  />} 
                      value={formData.password}
                       onChange={(e) => setFormData({...formData, password: e.target.value})} />
                  
                  <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-emerald-900 text-white font-bold text-[9px] uppercase tracking-widest rounded-lg shadow-lg">
                    {isSubmitting ? 'Please wait...' : action === 'signup' ? 'Create Account' : 'Login'}
                  </Button>
                </form>
              </div>
            ) : (
              <div className="text-center py-4 space-y-4">
                <p className="text-xs text-gray-500 italic px-6 leading-relaxed">Fast-track your order without creating a profile.</p>
                <Button className="w-full py-3 bg-emerald-900 text-white font-bold text-[9px] uppercase tracking-widest rounded-lg shadow-lg">
                  Continue as Guest
                </Button>
              </div>
            )}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
              <span className="relative flex justify-center text-[8px] uppercase text-gray-300 px-2 bg-white mx-auto w-fit">Quick Access</span>
            </div>

              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 py-2.5 px-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all">
                  <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-gray-500 hidden sm:inline">Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 px-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all">
                  <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-gray-500 hidden sm:inline">Facebook</span>
                </button>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Account2;