import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';


const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];


const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full px-6 py-2 text-sm font-medium transition-all duration-200',
    isActive
      ? 'bg-white text-black'
      : 'text-white/70 hover:text-white hover:bg-white/10',
  ].join(' ');


const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center">
          <div className="flex items-center justify-center rounded-full bg-white px-6 py-2">
            <img
              src={logo}
              alt="Logo"
              className="h-8 w-auto object-contain"
            />
          </div>
        </NavLink>


        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};


export default NavBar;