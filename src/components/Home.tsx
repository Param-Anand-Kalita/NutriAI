import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Sprout, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 md:px-8 bg-background">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center flex flex-col items-center gap-6 max-w-3xl mx-auto"
      >
        <div className="w-16 h-16 bg-primary-container rounded-3xl flex items-center justify-center text-on-primary-container shadow-ambient mb-4">
          <Sprout size={32} className="fill-current" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-on-surface leading-tight">
          AI Food Calorie & <br/>Nutrition Analyzer
        </h1>
        
        <p className="text-lg md:text-xl text-secondary leading-relaxed">
          Build your meal and instantly analyze calories, nutrition, and healthier alternatives using AI. Simple, fast, and scientifically backed.
        </p>
        
        <div className="flex justify-center mt-6">
          <Link 
            to="/meal-builder" 
            className="bg-primary text-white px-8 py-4 rounded-full font-bold shadow-ambient hover:bg-primary/90 hover:shadow-high transition-all flex items-center gap-2 group"
          >
            Build Your Meal
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.section>

      {/* Subtle background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full max-w-4xl h-96 bg-primary/5 rounded-full blur-[100px]" />
    </div>
  );
}


