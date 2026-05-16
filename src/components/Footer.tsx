import { Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface-container-highest w-full mt-12 border-t border-surface-container">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-8 py-10 max-w-7xl mx-auto gap-8">
        <div className="flex flex-col items-center md:items-start gap-2 w-full">
          <div className="text-xl font-bold text-on-surface flex items-center gap-2">
            <Sprout className="text-primary fill-primary" size={24} />
            NutriAI
          </div>
          <p className="text-xs text-secondary text-center md:text-left">
            NutriAI. For informational purposes only. Consult a professional for clinical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
