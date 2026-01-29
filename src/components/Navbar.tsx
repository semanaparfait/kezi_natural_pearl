import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import { useLocation } from 'react-router-dom';
import { Globe,  ShoppingCart,} from 'lucide-react';
import logo from '@/assets/logo-Kezi (1).svg'

function Navbar() {
    const Pathanme = useLocation().pathname;
    const Links = [
        {name: "Home", link: "/"},
        {name: "Shop", link: "/shop"},
        {name: "About", link: "/about"},
        {name: "Contact Us", link: "/contact-us"},
    ]
  return (
    <header className='absolute top-0 z-50 w-full text-white '>
        <nav className='flex items-center justify-between px-4 bg-transparent '>
            <div>
                <img src={logo} alt="KEZI Logo" className='w-15 h-15 brightness-0 invert' />
            </div>
            <ul className='md:flex hidden gap-4 bg-white/10 px-10 py-2 rounded-full'>
                {Links.map((link) => (
                    <li key={link.name} >
                        <Link to={link.link} className={`${Pathanme === link.link ? "text-[var(--gold-color)] underline font-semibold" : ""}`}>
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className='flex items-center gap-4'>
                <div className='flex items-center gap-2'>
                    <Globe/>

                <select >
                    <option value="en">EN</option>
                    <option value="es">ES</option>
                    <option value="fr">FR</option>
                </select>
                </div>
                <ShoppingCart/>
                <Link to="/account">
                <Button variant="primary" size="md">
                    Sign Up
                </Button>
                </Link>
            </div>

        </nav>
    </header>
  )
}

export default Navbar