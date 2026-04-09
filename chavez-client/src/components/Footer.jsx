import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-2 text-center">
          <p className="text-sm text-white/60 italic">
            "Surviving the horrors of Raccoon City and beyond."
          </p>
        </div>

        <div className="mb-6 text-center">
          <p className="text-xs text-white/30">
            Dedicated to surviving the zombie apocalypse since 1996
          </p>
        </div>

        <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-white/50 order-2 md:order-1">
            &copy; {currentYear} Timeless Company. All rights reserved.
          </p>
          
          <NavLink to="/" className="order-1 md:order-2">
            <div className="flex items-center justify-center rounded-full bg-white px-6 py-2">
              <img
                src={logo}
                alt="Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;