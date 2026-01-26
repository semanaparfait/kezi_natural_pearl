import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import { useLocation } from 'react-router-dom';
import { Globe,  ShoppingCart,} from 'lucide-react';
import logo from '@/assets/logo-Kezi (1).svg'

function Navbar() {
    const Pathanme = useLocation().pathname;
    const Links = [
        {name: "Home", link: "/"},
        {name: "About", link: "/about"},
        {name: "Contact Us", link: "/contact-us"},
        {name: "Account", link: "/account"},
    ]
  return (
    <header>
        <nav className='flex items-center justify-between px-4 bg-[var(--primary)] text-white'>
            <div>
                <img src={logo} alt="KEZI Logo" className='w-15 h-15 brightness-0 invert' />
            </div>
            <ul className='flex gap-4'>
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
                <Button variant="primary" size="md">
                    Sign Up
                </Button>
            </div>

        </nav>
    </header>
  )
}

export default Navbar