import Button from "@/components/Button";
import Input from "@/components/Input";
import { MoveLeft, User, ShoppingBag } from "lucide-react";
import { useState } from "react";
import {useNavigate } from "react-router-dom";

function Account1() {
    const Navigate = useNavigate();
  const [authType, setAuthType] = useState("guest");
  const [action, setAction] = useState<'signup' | 'signin'>('signin');

  return (
    <section 
      className="fixed inset-0 w-screen h-screen bg-cover bg-center flex flex-col overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url("https://i.pinimg.com/1200x/c3/82/86/c38286de6783eaf772c9d932fa991be7.jpg")`
      }}
    >
      {/* Top Navigation */}
      <div className="absolute top-10 left-13 z-20">
        <button
          onClick={() => Navigate("/")}
          className="group flex items-center gap-2 text-[13px] uppercase tracking-[0.3em] text-white/80 hover:text-white transition-all"
        >
          <MoveLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 w-full h-full overflow-hidden">
        <div className="hidden lg:flex items-end p-10 xl:p-16">
          <div className="max-w-sm space-y-4 animate-in fade-in slide-in-from-left-6 duration-1000">
            <p className="text-white/60 text-xs uppercase tracking-[0.4em] font-bold">Nature's Essence</p>
            <h3 className="text-white text-3xl xl:text-4xl font-serif italic leading-tight">
            "Skincare inspired by timeless rituals."
            </h3>
            <div className="w-12 h-[1px] bg-[var(--gold-color)]"></div>
          </div>
        </div>
        <div className="flex  items-center justify-center p-4 md:p-8 backdrop-blur-sm lg:backdrop-blur-none bg-black/10 lg:bg-transparent overflow-y-auto scrollbar-hide">
          <div className="w-full  max-w-md space-y-4 animate-in fade-in slide-in-from-right-6 duration-700">
            <div className=" bg-white flex flex-col  space-y-3 justify-center md:h-screen rounded-2xl p-6 md:p-6 shadow-2xl border border-white/20">
            <div className="space-y-2 text-center mb-3">
              <h1 className="text-3xl md:text-4xl font-serif italic drop-shadow-md">Identify Yourself</h1>
              <p className="text-xs  font-light">Choose how you would like to proceed.</p>
            </div>
              <div className="flex bg-gray-50 p-1 rounded-xl mb-5">
                <button 
                  onClick={() => setAuthType("guest")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${authType === 'guest' ? 'bg-white shadow-sm text-(--primary)' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <ShoppingBag size={12} /> Guest
                </button>
                <button 
                  onClick={() => setAuthType("customer")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${authType === 'customer' ? 'bg-white shadow-sm text-(--primary)' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <User size={12} /> Customer
                </button>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {authType === 'customer' ? (
                  <div className="animate-in fade-in zoom-in-95 duration-500 space-y-5">
                    <h1 className="text-3xl font-bold text-(--primary) text-center ">
                    {action === 'signup' ? 'Create Account' : 'Welcome Back'}
                </h1>
                    <div className="flex justify-center mb-2">
                      <div className="inline-flex bg-gray-100 rounded-full p-0.5 gap-0.5">
                        <button
                          type="button"
                          onClick={() => setAction('signup')}
                          className={`px-4 py-1.5 rounded-full font-bold text-[8px] uppercase tracking-widest transition-all ${action === 'signup' ? 'bg-(--primary) text-white shadow-sm' : 'text-gray-500 hover:text-(--primary)'}`}
                        >
                          Sign up
                        </button>
                        <button
                          type="button"
                          onClick={() => setAction('signin')}
                          className={`px-4 py-1.5 rounded-full font-bold text-[8px] uppercase tracking-widest transition-all ${action === 'signin' ? 'bg-(--primary) text-white shadow-md' : 'text-gray-500 hover:text-(--primary)'}`}
                        >
                          Sign in
                        </button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Input
                        label="Email"
                        type="email"
                        placeholder="ritual@nature.com"
                        required
                        fullWidth
                        value=""
                        onChange={() => {}}
                        className="text-sm"
                      />
                      
                      {action === 'signup' && (
                        <Input
                          label="Phone"
                          type="tel"
                          placeholder="+250 78X XXX XXX"
                          required
                          fullWidth
                          value=""
                          onChange={() => {}}
                          className="text-sm"
                        />
                      )}

                      <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        required
                        fullWidth
                        value=""
                        onChange={() => {}}
                        className="text-sm"
                      />
                    </div>

                    <Button variant="primary" className="w-full py-3 rounded-lg font-bold text-[9px] uppercase tracking-[0.2em] shadow-lg mt-1">
                      {action === 'signup' ? 'Create Account' : 'Sign In'}
                    </Button>
                  </div>
                ) : (
                  <div className="animate-in fade-in zoom-in-95 duration-500 py-4 text-center space-y-4">
                    <div className="w-14 h-14 bg-[var(--secondary-cream-white)] rounded-full flex items-center justify-center mx-auto shadow-inner text-[var(--gold-color)]">
                      <ShoppingBag size={20} />
                    </div>
                    <p className="text-xs text-gray-500 italic leading-snug">No account needed. Provide shipping details at checkout.</p>
                    <Button variant="primary" className="w-full py-3 rounded-lg font-bold text-[9px] uppercase tracking-[0.2em] shadow-lg">
                      Proceed as Guest
                    </Button>
                  </div>
                )}
              </form>
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
                <div className="relative flex justify-center text-[8px] uppercase tracking-[0.3em] font-bold text-gray-300"><span className="bg-white px-3">Or continue with</span></div>
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
            
            <p className="text-center text-[8px] text-white/60 font-medium uppercase tracking-[0.2em]">
              Kezi Natural Pearl • Kigali
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

export default Account1;