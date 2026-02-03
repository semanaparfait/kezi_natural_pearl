import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import { useLocation } from 'react-router-dom';
import { Globe, ShoppingCart, ChevronDown, Package, LayoutDashboard, LogOut,  CircleUser } from 'lucide-react';
import logo from '@/assets/logo-Kezi (1).svg';
import '@/components/Navbar.css';
import { useGetCurrentUserQuery } from '@/features/auth/authApi';
import { useState } from 'react';

function Navbar() {
  const pathname = useLocation().pathname;
  const isHomePage = pathname === '/';
  const token = localStorage.getItem('token');
  const { data: currentUser } = useGetCurrentUserQuery(undefined, { skip: !token });
  console.log('Current User:', currentUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const Links = [
    { name: 'Home', link: '/' },
    { name: 'Shop', link: '/shop' },
    { name: 'About', link: '/about' },
    { name: 'Contact Us', link: '/contact-us' },
  ];

  const handleDropdown = () => setDropdownOpen((prev) => !prev);
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <header className={` top-0 z-50 w-full text-white ${!isHomePage ? 'bg-[#9FCC66] ' : 'absolute'}`}>
      <nav className="flex items-center justify-between px-4">
        <div>
          <img src={logo} alt="KEZI Logo" className="w-16 h-16 brightness-0 invert" />
        </div>
        <ul className="md:flex hidden gap-4 bg-white/10 px-10 py-2 rounded-full">
          {Links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.link}
                className={
                  pathname === link.link ? 'text-[#9FCC66] underline font-semibold' : ''
                }
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Globe />
            <select className="bg-[var(--gold-color)] text-[var(--primary)] rounded-md p-1 outline-none">
              <option value="en">EN</option>
              <option value="kiny">KI</option>
              <option value="fr">FR</option>
            </select>
          </div>
          <ShoppingCart />
          <div className="relative">
{currentUser ? (
  <>
    <div
      className="flex items-center gap-2 bg-black/20 px-5 py-2 rounded-full cursor-pointer"
      onClick={handleDropdown}
    >
      <div className="w-8 h-8 bg-[var(--gold-color)] rounded-full flex items-center justify-center text-white font-semibold">
        {currentUser.email.charAt(0).toUpperCase()}
      </div>
      <p>{currentUser.email.split('@')[0].replace(/\d+/g, '')}</p>

      <ChevronDown size={16} />
    </div>

    {dropdownOpen && (
      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg text-black">
        <div className="px-4 py-3 border-b">
          <p className="font-semibold">{currentUser.email}</p>
          <p className="text-sm ">{currentUser.role}</p>
        </div>

        {currentUser.role === 'customer' && (
          <>
                                <Link 
              to="/owner/dashboard" 
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              <Package className="w-4 h-4" />
              My Orders
            </Link>
                                  <Link 
              to="/owner/dashboard" 
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              <CircleUser className="w-4 h-4" />
              Profile
            </Link>
                      <Link 
              to="/userDashboard" 
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          </>
        )}
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
  <Link to="/account">
    <Button variant="primary">Sign Up</Button>
  </Link>
)}

          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;