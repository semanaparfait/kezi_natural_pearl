import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Globe, ShoppingCart, ChevronDown, Package, LayoutDashboard, LogOut,  CircleUser } from 'lucide-react';
import logo from '@/assets/logo.png';
import { useGetCurrentUserQuery } from '@/features/auth/authApi';
import { useState,useEffect } from 'react';
import {motion} from 'framer-motion'
import {useGetCartItemsQuery} from '@/features/cart/cartApi'

function Navbar() {
  const pathname = useLocation().pathname;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHomePage = pathname === '/';
  const token = localStorage.getItem('token');
  const { data: currentUser } = useGetCurrentUserQuery(undefined, { skip: !token });
  const { data: cartItems } = useGetCartItemsQuery(undefined);
  const cart = cartItems?.items || [];
  // console.log('Current User:', currentUser);


  const Links = [
    { name: 'Home', link: '/' },
    { name: 'Shop', link: '/shop' },
    { name: 'About', link: '/about' },
    { name: 'Community', link: '/community' },
    { name: 'Contact Us', link: '/contact-us' },
  ];

  const handleDropdown = () => setDropdownOpen((prev) => !prev);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    window.location.reload();
  };

  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
     className={` top-0 z-50 w-full text-white fixed  ${!isHomePage ? 'bg-(--primary) ' : 'absolute'} ${scrolled ? 'bg-(--primary)' : ''}`}>
      <nav className="flex items-center justify-between px-6 ">
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <Link to="/">
          <img src={logo} alt="KEZI Logo" className="w-20 h-20  " />
          </Link>
        </motion.div>
        <ul className="md:flex hidden gap-4 px-10 py-2 bg-transparent bg-white/10  rounded-full ">
          {Links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.link}
                className={
                  pathname === link.link ? 'text-(--primary)  font-semibold' : ''
                }
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 hidden">
            <Globe />
            <select className=" rounded-md p-1 outline-none">
              <option value="en">EN</option>
              <option value="kiny">KI</option>
              <option value="fr">FR</option>
            </select>
          </div>
          <Link to="/cart" className="relative">
          <ShoppingCart />
          {cart.length > 0 && (
            <span className="absolute top-[-0.75rem] right-[-0.75rem] inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {cart.length}
            </span>
          )}
          </Link>
          <div className="relative">
  {currentUser ? (
  <>
    <div
      className="flex items-center gap-2 bg-black/20 md:px-5 px-2 py-2 rounded-full cursor-pointer"
      onClick={handleDropdown}
    >
      <div className="md:w-8 md:h-8 w-5 h-5 bg-[var(--gold-color)] rounded-full flex items-center justify-center text-white font-semibold">
        {currentUser.email.charAt(0).toUpperCase()}
      </div>
      <p className='md:text-base text-[11px]'>{currentUser.email.split('@')[0].replace(/\d+/g, '')}</p>

      <ChevronDown size={16} />
    </div>

    {dropdownOpen && (
      <div className="absolute right-0 mt-2 w-fit  bg-white rounded-lg shadow-lg text-black z-50">
        <div className="px-4 py-3 border-b">
          <p className="font-semibold">{currentUser.email}</p>
          <p className="text-sm ">{currentUser.role}</p>
        </div>

        {/* {currentUser.role === 'customer' && ( */}
          <>
              <Link 
              to="/orderhistory" 
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              <Package className="w-4 h-4" />
              My Orders
            </Link>
            <Link 
              to="/userDashboard" 
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              <CircleUser className="w-4 h-4" />
              Profile
            </Link>
                      <Link 
              to="/userDashboard" 
              className="flex hidden items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            {currentUser.role === 'admin' && (
              <Link 
                to="/adminPage"
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                <LayoutDashboard className="w-4 h-4" />
                Admin Dashboard
              </Link>
            )}
          </>
        {/* // )} */}
        

            <button
      onClick={handleLogout}
      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100 mt-1"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
      </div>
    )}
  </>
) : (
  <Link to="/account2">
    <button className='text-black bg-white rounded-md px-3 py-2'>Sign Up</button>
  </Link>
)}

          </div>
        </div>
      </nav>
    </motion.header>
  );
}

export default Navbar;