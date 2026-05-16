import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Activity, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FOOD_DATABASE, FoodItem } from '../data/foods';

import { useMeal } from '../context/MealContext';

export default function MealBuilder() {
  const { 
    mealItems, addToMeal, removeFromMeal, updateQuantity, 
    totalCalories, totalProtein, totalCarbs, totalFat 
  } = useMeal();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<FoodItem[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = FOOD_DATABASE.filter(food =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filtered);
  }, [searchTerm]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddToMeal = (food: FoodItem) => {
    addToMeal(food);
    setSearchTerm('');
    setIsFocused(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col lg:flex-row gap-8 relative items-start"
    >
      {/* Left Column: Meal Builder Canvas */}
      <div className="flex-grow flex flex-col gap-8 w-full lg:w-auto">
        <div ref={searchRef} className="relative w-full z-20">
          <div className="relative shadow-high rounded-3xl bg-white overflow-hidden group">
            <Sparkles className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" size={24} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="Search for food items to add to your meal..." 
              className="w-full pl-16 pr-20 py-5 bg-transparent border-none focus:ring-2 focus:ring-primary outline-none text-lg text-on-surface placeholder:text-secondary"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface p-2"
              >
                <X size={20} />
              </button>
            )}
          </div>

          <AnimatePresence>
            {isFocused && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-high border border-surface-container overflow-hidden max-h-[480px] overflow-y-auto custom-scrollbar"
              >
                {(() => {
                  const grouped = suggestions.reduce((acc, food) => {
                    if (!acc[food.category]) acc[food.category] = [];
                    acc[food.category].push(food);
                    return acc;
                  }, {} as Record<string, FoodItem[]>);

                  const HEALTH_PRIORITY: Record<string, number> = {
                    'Fruits': 1,
                    'Vegetables': 2,
                    'Proteins': 3,
                    'Grains & Pantry': 4,
                    'Snacks': 5,
                    'Drinks': 6,
                    'Fast Food': 7
                  };

                  return Object.entries(grouped)
                    .sort(([catA], [catB]) => {
                      const pA = HEALTH_PRIORITY[catA] || 99;
                      const pB = HEALTH_PRIORITY[catB] || 99;
                      return pA - pB;
                    })
                    .map(([category, items]) => (
                      <div key={category} className="border-b border-surface-container last:border-0">
                        <div className="bg-surface-container-lowest px-6 py-2">
                          <span className="text-[10px] font-extrabold text-secondary uppercase tracking-[0.2em]">
                            {category}
                          </span>
                        </div>
                        {items.map((food) => (
                          <button
                            key={food.id}
                            onClick={() => handleAddToMeal(food)}
                            className="group w-full flex items-center gap-4 px-6 py-4 hover:bg-surface-container-low transition-colors text-left"
                          >
                            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-surface-container">
                              <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors">{food.name}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-secondary">{food.calories} kcal</span>
                                <span className="text-secondary opacity-30">•</span>
                                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">{food.category}</span>
                              </div>
                            </div>
                            <div className="text-right flex flex-col items-end">
                              <span className="font-bold text-primary block">{food.calories} kcal</span>
                              <div className="flex gap-2 mt-0.5 opacity-80">
                                <span className="text-[9px] font-bold text-secondary uppercase">C: {food.carbs}g</span>
                                <span className="text-[9px] font-bold text-secondary uppercase">F: {food.fat}g</span>
                                <span className="text-[9px] font-bold text-primary uppercase">P: {food.protein}g</span>
                              </div>
                            </div>
                            <Plus size={20} className="text-primary opacity-0 group-hover:opacity-100 ml-2 transition-all" />
                          </button>
                        ))}
                      </div>
                    ));
                })()}
                {suggestions.length === 0 && (
                  <div className="p-8 text-center">
                    <p className="text-secondary">No foods found matching "{searchTerm}"</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-on-surface">Current Meal</h2>
          <div className="flex flex-col gap-4">
            {mealItems.map((item, index) => (
              <div 
                key={item.id} 
                className="bg-white p-4 md:p-6 rounded-3xl shadow-ambient flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:shadow-high transition-all border border-transparent"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-highest text-secondary font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="w-16 h-16 bg-surface-container-high rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-on-surface truncate">{item.name}</h3>
                    <p className="text-sm text-secondary truncate">{item.serving}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end gap-4 md:gap-8 border-t sm:border-t-0 pt-4 sm:pt-0">
                  <div className="flex items-center bg-surface-container-low rounded-2xl p-1 border border-surface-container">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all font-bold ${
                        (item.quantity || 1) === 1 
                          ? 'text-error hover:bg-error/10' 
                          : 'text-secondary hover:text-on-surface hover:bg-white'
                      }`}
                    >
                      {(item.quantity || 1) === 1 ? <Trash2 size={14} /> : '-'}
                    </button>
                    <span className="w-10 text-center font-bold text-on-surface text-sm">
                      {item.quantity || 1}x
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center text-secondary hover:text-on-surface hover:bg-white rounded-xl transition-all font-bold"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="text-right min-w-[100px]">
                    <span className="text-lg font-bold text-primary block">{Math.round(item.calories * (item.quantity || 1))} kcal</span>
                    <div className="flex gap-2 justify-end mt-0.5">
                      <span className="text-[10px] font-bold text-secondary uppercase tracking-tight">C:{Math.round(item.carbs * (item.quantity || 1))}g</span>
                      <span className="text-[10px] font-bold text-secondary uppercase tracking-tight">F:{Math.round(item.fat * (item.quantity || 1))}g</span>
                      <span className="text-[10px] font-bold text-primary uppercase tracking-tight">P:{Math.round(item.protein * (item.quantity || 1))}g</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => removeFromMeal(item.id)}
                    className="text-secondary hover:text-error transition-colors p-2 rounded-full hover:bg-error-container"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}
            {mealItems.length === 0 && (
              <div className="p-12 text-center border-2 border-dashed border-surface-container rounded-3xl">
                <p className="text-secondary">Your meal is empty. Search for foods above to get started!</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Right Column: Summary Panel */}
      <aside className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6 bg-surface-container-low p-6 rounded-3xl lg:sticky lg:top-24 max-h-[calc(100vh-8rem)] overflow-y-auto shadow-ambient">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <Activity className="text-primary fill-primary/20" size={24} />
            <h2 className="text-lg font-bold text-on-surface">Meal Summary</h2>
          </div>

        </div>
        <p className="text-sm text-secondary -mt-6 mb-4">
          {mealItems.length === 0 ? "Add items to see analysis" : "Real-time AI analysis active"}
        </p>

        <div className="bg-white rounded-2xl p-8 flex flex-col items-center shadow-ambient">
          <div className="relative w-40 h-40 flex items-center justify-center mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle className="text-surface-container-highest" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="12" />
              <circle 
                className="text-primary transition-all duration-700 ease-out" 
                cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" 
                strokeDasharray="251.2" 
                strokeDashoffset={251.2 - (Math.min(100, (totalCalories / 2500) * 100) / 100) * 251.2} 
                strokeLinecap="round" strokeWidth="12" 
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-bold text-on-surface">{totalCalories}</span>
              <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Kcal</span>
            </div>
          </div>
          <div className="w-full flex justify-between gap-2 px-2">
            <div className="text-center">
              <span className="block text-lg font-bold text-on-surface">{Math.round(totalCarbs)}g</span>
              <span className="block text-[10px] text-secondary font-semibold uppercase">Carbs</span>
            </div>
            <div className="text-center">
              <span className="block text-lg font-bold text-on-surface">{Math.round(totalFat)}g</span>
              <span className="block text-[10px] text-secondary font-semibold uppercase">Fat</span>
            </div>
            <div className="text-center">
              <span className="block text-lg font-bold text-primary">{Math.round(totalProtein)}g</span>
              <span className="block text-[10px] text-primary font-bold uppercase">Protein</span>
            </div>
          </div>
        </div>

        <Link 
          to="/detailed-nutrition" 
          className="mt-4 w-full py-4 bg-primary text-white font-bold text-center rounded-full hover:bg-primary/90 transition-all shadow-ambient active:scale-95 px-4"
        >
          Detailed Nutrition Breakdown
        </Link>
      </aside>
    </motion.div>
  );
}

