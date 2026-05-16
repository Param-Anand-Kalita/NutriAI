import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const NAV_LINKS = [
    { path: '/', label: 'Home' },
    { path: '/meal-builder', label: 'Meal Builder' },
    { path: '/detailed-nutrition', label: 'Nutrition' },
  ];

  return (
    <header className="bg-surface shadow-sm sticky top-0 w-full z-50">
      <div className="flex items-center justify-between w-full px-4 md:px-8 py-4 max-w-7xl mx-auto">
        <div className="flex-1 flex justify-start">
          <Link 
            to="/" 
            className="text-2xl font-bold text-primary flex items-center gap-2 hover:opacity-80 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          >
            <Sprout className="fill-current" size={28} />
            <span>NutriAI</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center justify-center gap-6 flex-1">
          {NAV_LINKS.map(link => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`font-medium text-sm transition-all px-2 py-1 rounded-md ${
                isActive(link.path) ? 'text-primary border-b-2 border-primary' : 'text-secondary hover:text-primary hover:bg-surface-container-low'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1 flex justify-end">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-on-surface p-2 rounded-full hover:bg-surface-container-low"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-surface-container overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-2">
              {NAV_LINKS.map(link => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl font-bold transition-colors ${
                    isActive(link.path) ? 'bg-primary/10 text-primary' : 'text-secondary hover:bg-surface-container-low'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
