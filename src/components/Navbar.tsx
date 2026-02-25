import { Link, useLocation } from 'react-router-dom';
import { Globe, ShoppingCart, ChevronDown, Package, LayoutDashboard, LogOut, CircleUser, Heart, Menu, X } from 'lucide-react';
import logo from '@/assets/logo.png';
import { useGetCurrentUserQuery } from '@/features/auth/authApi';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetCartItemsQuery } from '@/features/cart/cartApi';
import { useGetWishlistQuery } from '@/features/wishlist/wishlist';

function Navbar() {
  const pathname = useLocation().pathname;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHomePage = pathname === '/';
  const token = localStorage.getItem('token');
  
  const { data: currentUser } = useGetCurrentUserQuery(undefined, { skip: !token });
  const { data: cartItems } = useGetCartItemsQuery(undefined, { skip: !token });
  const cart = cartItems?.items || [];

  const { data: wishlistItems } = useGetWishlistQuery(undefined, { skip: !token });
  const wishlistCount = wishlistItems?.length || 0;

  const Links = [
    { name: 'Home', link: '/' },
    { name: 'Shop', link: '/shop' },
    { name: 'About', link: '/about' },
    { name: 'Community', link: '/community' },
    { name: 'Contact Us', link: '/contact-us' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => setMobileMenuOpen(false), [pathname]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        !isHomePage || scrolled ? 'bg-(--primary) shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="flex items-center justify-between px-4 md:px-10 h-20 max-w-7xl mx-auto">
        
        {/* Mobile: Menu Toggle */}
        <button 
          className="md:hidden text-white p-2" 
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="KEZI Logo" className="w-16 h-16 object-contain" />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 px-8 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
          {Links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.link}
                className={`text-sm tracking-widest uppercase font-medium transition-colors hover:text-[var(--gold-color)] ${
                  pathname === link.link ? 'text-[var(--gold-color)]' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Icons Area */}
        <div className="flex items-center gap-3 md:gap-6">
          {currentUser && (
            <Link to="/wishlist" className="relative text-white hover:text-[var(--gold-color)] transition-colors">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center h-4 w-4 text-[10px] font-bold bg-red-600 rounded-full text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
          )}

          <Link to="/cart" className="relative text-white hover:text-[var(--gold-color)] transition-colors">
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center h-4 w-4 text-[10px] font-bold bg-[var(--gold-color)] rounded-full text-white">
                {cart.length}
              </span>
            )}
          </Link>

          {/* User Profile / Login */}
          <div className="relative">
            {currentUser ? (
              <div 
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full cursor-pointer transition-all border border-white/5"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="w-7 h-7 bg-[var(--gold-color)] rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {currentUser.email.charAt(0).toUpperCase()}
                </div>
                <ChevronDown size={14} className={`text-white transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            ) : (
          <Link to="/account2">
            <button className='text-black bg-white rounded-md px-3 py-2'>Sign Up</button>
          </Link>
            )}

            {/* Desktop Dropdown */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl overflow-hidden text-slate-800 border border-slate-100"
                >
                  <div className="px-5 py-4 bg-slate-50/50 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Account</p>
                    <p className="text-sm font-semibold truncate">{currentUser?.email}</p>
                  </div>
                  <div className="p-2">
                    <Link to="/orderhistory" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-50 rounded-lg transition-colors">
                      <Package size={16} className="text-slate-400" /> My Orders
                    </Link>
                    <Link to="/userDashboard" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-50 rounded-lg transition-colors">
                      <CircleUser size={16} className="text-slate-400" /> Profile
                    </Link>
                    {currentUser?.role === 'admin' && (
                      <Link to="/adminPage" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-50 rounded-lg transition-colors text-blue-600 font-semibold">
                        <LayoutDashboard size={16} /> Admin Panel
                      </Link>
                    )}
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors border-t border-slate-50 mt-2">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-(--primary) z-[70] p-8 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <img src={logo} alt="Logo" className="w-16 h-16" />
                <button onClick={() => setMobileMenuOpen(false)} className="text-white/60 hover:text-white">
                  <X size={28} />
                </button>
              </div>

              <ul className="flex flex-col gap-6">
                {Links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.link}
                      className={`text-2xl font-serif italic transition-colors ${
                        pathname === link.link ? 'text-[var(--gold-color)]' : 'text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-10 border-t border-white/10">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4 font-bold">Kezi Essentials</p>
                <div className="flex gap-4">
                  <div className="p-3 bg-white/5 rounded-full text-white hover:bg-white/10"><Globe size={18}/></div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;