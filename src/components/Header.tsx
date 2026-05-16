import { Link, useLocation } from 'react-router-dom';
import { Sprout, Search, Menu } from 'lucide-react';

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-surface shadow-sm sticky top-0 w-full z-50">
      <div className="grid grid-cols-3 items-center w-full px-4 md:px-8 py-4 max-w-7xl mx-auto">
        <div className="flex justify-start">
          <Link 
            to="/" 
            className="text-2xl font-bold text-primary flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Sprout className="fill-current" size={28} />
            NutriAI
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center justify-center gap-6">
          <Link 
            to="/" 
            className={`font-medium text-sm transition-all px-2 py-1 rounded-md ${
              isActive('/') ? 'text-primary border-b-2 border-primary' : 'text-secondary hover:text-primary hover:bg-surface-container-low'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/meal-builder" 
            className={`font-medium text-sm transition-all px-2 py-1 rounded-md ${
              isActive('/meal-builder') ? 'text-primary border-b-2 border-primary' : 'text-secondary hover:text-primary hover:bg-surface-container-low'
            }`}
          >
            Meal Builder
          </Link>
          <Link 
            to="/detailed-nutrition" 
            className={`font-medium text-sm transition-all px-2 py-1 rounded-md ${
              isActive('/detailed-nutrition') ? 'text-primary border-b-2 border-primary' : 'text-secondary hover:text-primary hover:bg-surface-container-low'
            }`}
          >
            Nutrition
          </Link>
        </nav>

        <div className="flex justify-end">
          <button className="md:hidden text-on-surface p-2 rounded-full hover:bg-surface-container-low">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
