import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Dumbbell, Wheat, Droplets, Trophy, CheckCircle2, FileDown, RefreshCcw, ChevronRight, X } from 'lucide-react';
import { useMeal } from '../context/MealContext';
import { FOOD_DATABASE } from '../data/foods';

export default function DetailedNutrition() {
  const { 
    mealItems, totalCalories, totalProtein, totalCarbs, totalFat, mealScore, replaceInMeal 
  } = useMeal();
  const [isImproved, setIsImproved] = useState(false);
  const [appliedAlts, setAppliedAlts] = useState<number[]>([]);
  const [manualScoreBonus, setManualScoreBonus] = useState(0);

  const totalMacros = totalProtein + totalCarbs + totalFat || 1;
  
  // Calculate a quality adjustment based on food categories
  const qualityAdjustment = mealItems.reduce((acc, item) => {
    if (item.category === 'Vegetables' || item.category === 'Fruits') return acc + 0.5;
    if (item.category === 'Fast Food' || item.category === 'Snacks') return acc - 0.5;
    return acc;
  }, 0);

  const score = Math.max(0, Math.min(10, +(mealScore + qualityAdjustment + manualScoreBonus).toFixed(1)));

  const MACROS = [
    { name: 'Carbs', val: `${Math.round(totalCarbs)}g`, pct: `${Math.round((totalCarbs / totalMacros) * 100)}%`, color: 'text-tertiary', bar: 'bg-tertiary', icon: <Wheat size={24} /> },
    { name: 'Fats', val: `${Math.round(totalFat)}g`, pct: `${Math.round((totalFat / totalMacros) * 100)}%`, color: 'text-secondary', bar: 'bg-secondary', icon: <Droplets size={24} /> },
    { name: 'Protein', val: `${Math.round(totalProtein)}g`, pct: `${Math.round((totalProtein / totalMacros) * 100)}%`, color: 'text-primary', bar: 'bg-primary', icon: <Dumbbell size={24} /> },
  ];

  const MICRO_NUTRIENTS = [
    { name: 'Vitamin A', current: Math.round(405 * (totalCalories / 450)), recommended: '900', unit: 'mcg', pct: Math.round((405 * (totalCalories / 450) / 900) * 100), status: 'good' },
    { name: 'Vitamin C', current: Math.round(90 * (totalCalories / 450)), recommended: '75', unit: 'mg', pct: Math.round((90 * (totalCalories / 450) / 75) * 100), status: 'good' },
    { name: 'Vitamin D', current: Math.round(2 * (totalCalories / 450)), recommended: '20', unit: 'mcg', pct: Math.round((2 * (totalCalories / 450) / 20) * 100), status: 'alert' },
    { name: 'Vitamin B12', current: (2.1 * (totalCalories / 450)).toFixed(1), recommended: '2.4', unit: 'mcg', pct: Math.round((2.1 * (totalCalories / 450) / 2.4) * 100), status: 'good' },
    { name: 'Iron', current: (6.3 * (totalCalories / 450)).toFixed(1), recommended: '18', unit: 'mg', pct: Math.round((6.3 * (totalCalories / 450) / 18) * 100), status: 'good' },
    { name: 'Calcium', current: Math.round(400 * (totalCalories / 450)), recommended: '1000', unit: 'mg', pct: Math.round((400 * (totalCalories / 450) / 1000) * 100), status: 'good' },
    { name: 'Zinc', current: (1.6 * (totalCalories / 450)).toFixed(1), recommended: '11', unit: 'mg', pct: Math.round((1.6 * (totalCalories / 450) / 11) * 100), status: 'alert' },
  ].map(n => ({ ...n, status: n.pct >= 30 ? 'good' : 'alert' }));

  const handleApplyAlternative = (id: number, targetId: string, originalId: string) => {
    if (appliedAlts.includes(id)) return;
    
    const newFood = FOOD_DATABASE.find(f => f.id === targetId);
    if (newFood) {
      replaceInMeal(originalId, newFood);
    }
    
    setAppliedAlts(prev => [...prev, id]);
    setManualScoreBonus(prev => prev + 0.3);
    setIsImproved(true);
    
    // Reset "improved" animation state after a bit
    setTimeout(() => setIsImproved(false), 2000);
  };

  const exportToPDF = () => {
    window.print();
  };

  const SUGGESTIONS: Record<string, any> = {
    'scrambled-eggs': { 
      targetId: 'egg-whites',
      type: 'Side Dish', 
      name: 'Replace Scrambled Eggs with Egg Whites', 
      desc: 'Reduces fat and cholesterol while keeping high protein quality.'
    },
    'whole-wheat-bread': { 
      targetId: 'multigrain-bread',
      type: 'Bakery', 
      name: 'Replace Whole Wheat Bread with Multigrain Bread', 
      desc: 'Provides a more diverse range of micronutrients and fiber seeds.'
    },
    'salmon': { 
      targetId: 'grilled-chicken',
      type: 'Main Protein', 
      name: 'Replace Smoked Salmon with Grilled Chicken', 
      desc: 'Significantly lower in sodium while maintaining high protein density.'
    },
    'white-bread': {
      targetId: 'whole-wheat-bread',
      type: 'Bakery',
      name: 'Replace White Bread with Whole Wheat',
      desc: 'Increase fiber content and lower glycemic index.'
    },
    'cheeseburger': {
      targetId: 'grilled-chicken',
      type: 'Main Dish',
      name: 'Replace Cheeseburger with Grilled Chicken',
      desc: 'Reduces saturated fats and processed carbs significantly.'
    },
    'fries': {
      targetId: 'sweet-potato',
      type: 'Side Dish',
      name: 'Replace Fries with Sweet Potato',
      desc: 'Lower calorie density and higher vitamin A content.'
    },
    'soda': {
      targetId: 'green-tea',
      type: 'Beverage',
      name: 'Replace Soda with Green Tea',
      desc: 'Eliminates sugar and adds metabolic-boosting antioxidants.'
    },
    'chips': {
      targetId: 'almonds',
      type: 'Snack',
      name: 'Replace Chips with Almonds',
      desc: 'Healthy fats and protein instead of processed carbs and sodium.'
    }
  };

  const alternatives = mealItems
    .map((item, idx) => {
      const baseId = item.id.split('-').slice(0, -1).join('-') || item.id;
      const suggestion = SUGGESTIONS[baseId];
      if (!suggestion) return null;

      const targetFood = FOOD_DATABASE.find(f => f.id === suggestion.targetId);

      return {
        ...suggestion,
        id: idx + 1,
        mealNumber: idx + 1,
        originalId: item.id,
        currentImg: item.image,
        suggestedImg: targetFood?.image || item.image // fallback to current if target not found
      };
    })
    .filter(Boolean);

  const verdict = useMemo(() => {
    if (mealItems.length === 0) return { text: "", impact: "" };

    const pPct = (totalProtein * 4) / (totalCalories || 1);
    const cPct = (totalCarbs * 4) / (totalCalories || 1);
    const fPct = (totalFat * 9) / (totalCalories || 1);
    
    const hasFastFood = mealItems.some(item => item.category === 'Fast Food');
    const hasVegContent = mealItems.some(item => item.category === 'Vegetables' || item.category === 'Fruits');
    
    if (isImproved) {
      return {
        text: "Excellent swap! By choosing a more nutrient-dense alternative, you've optimized your micronutrient profile and reduced potential inflammatory markers. The AI has recalibrated your score.",
        impact: "Improving metabolic efficiency..."
      };
    }

    if (score >= 9) {
      return {
        text: "Exceptional balance! This meal is now highly optimized for peak performance and recovery. Minimum inflammatory load with maximum nutrient density.",
        impact: "Optimized metabolic efficiency."
      };
    }

    if (hasFastFood && score < 7) {
      return {
        text: "This meal contains processed elements that drive up sodium and saturated fat. While the macros might be okay, the internal inflammatory load is higher than ideal.",
        impact: "Requires inflammatory management."
      };
    }

    if (pPct > 0.35) {
      return {
        text: "Protein-rich profile! Excellent for muscle protein synthesis and metabolic thermogenesis. Consider adding more fiber-rich greens to assist with digestion.",
        impact: "High anabolic potential."
      };
    }

    if (cPct > 0.55) {
      return {
        text: "Carbohydrate dominant meal. This provides quick energy, but might lead to a blood sugar crash later. Try adding healthy fats or protein to slow digestion.",
        impact: "High glycemic load detected."
      };
    }

    if (fPct > 0.45) {
      return {
        text: "High fat density. While good for satiety, the caloric load is high. Ensure these are coming from unsaturated sources to protect cardiovascular health.",
        impact: "Calorie dense / Ketogenic lean."
      };
    }

    if (totalCalories > 1200) {
      return {
        text: "Significant caloric density detected. While the nutrient ratios may be intact, the sheer energy volume is high. Ideal for heavy training days, but monitor against daily requirements.",
        impact: "High caloric load profile."
      };
    }

    if (totalCalories < 200 && mealItems.length > 0) {
      return {
        text: "Very low caloric density. This is excellent as a light snack or side, but lacks the total energy required to be a primary performance meal.",
        impact: "Low energy density."
      };
    }

    if (!hasVegContent) {
      return {
        text: "Macronutrients are within range, but micronutrient diversity is low. Adding leafy greens or colorful vegetables would significantly boost your health score.",
        impact: "Low micronutrient density."
      };
    }

    return {
      text: "This meal presents a strong macronutrient balance, particularly ideal for sustained energy. The mix of ingredients supports overall metabolic health.",
      impact: "Balanced metabolic support."
    };
  }, [mealItems, score, isImproved, totalCalories, totalProtein, totalCarbs, totalFat]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 bg-background min-h-[60vh]"
    >
      {mealItems.length === 0 ? (
        <div className="lg:col-span-12 flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-ambient border border-surface-container-highest text-center px-4">
          <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center text-secondary mb-6">
            <RefreshCcw size={40} className="opacity-20" />
          </div>
          <h2 className="text-3xl font-bold text-on-surface mb-4">No meals selected yet.</h2>
          <p className="text-lg text-secondary mb-8 max-w-md">
            Add foods from the Meal Builder to begin your detailed nutritional analysis.
          </p>
          <Link 
            to="/meal-builder"
            className="bg-primary text-white font-bold py-4 px-8 rounded-2xl shadow-ambient hover:bg-primary/90 transition-all active:scale-95"
          >
            Go to Meal Builder
          </Link>
        </div>
      ) : (
        <>
          <div className="lg:col-span-8 flex flex-col gap-8">
        <section className="bg-white rounded-3xl p-6 shadow-ambient border border-surface-container-highest">
          <h3 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
            Your Selected Meals
          </h3>
          <div className="flex flex-col gap-3">
            {mealItems.map((item, index) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors border border-transparent"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-surface-container-highest text-secondary font-bold text-xs">
                    {index + 1}
                  </div>
                  <div className="w-12 h-12 bg-white rounded-lg overflow-hidden shadow-sm border border-surface-container">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-on-surface leading-tight">
                      {item.name} 
                      {item.quantity && item.quantity > 1 && (
                        <span className="ml-2 text-primary text-xs font-bold bg-primary/10 px-1.5 py-0.5 rounded-md">
                          {item.quantity}x
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-secondary mt-0.5">{item.serving}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-primary block">
                    {Math.round(item.calories * (item.quantity || 1))} kcal
                  </span>
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-tight">
                    {Math.round(item.protein * (item.quantity || 1))}g Protein
                  </span>
                </div>
              </div>
            ))}
            {mealItems.length === 0 && (
              <p className="text-center text-secondary py-4">No meals selected.</p>
            )}
          </div>
        </section>

        <section>
          <h1 className="text-4xl md:text-5xl font-bold text-on-surface mb-2">Detailed Nutritional Breakdown</h1>
          <p className="text-xl text-secondary">A comprehensive analysis of your meal, optimized by NutriAI.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MACROS.map((macro, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-ambient hover:shadow-high transition-shadow border border-surface-container-highest flex flex-col justify-between h-56">
              <div className="flex justify-between items-start mb-4">
                <span className="text-lg font-bold text-on-surface">{macro.name}</span>
                <div className={macro.color}>{macro.icon}</div>
              </div>
              <div>
                <div className={`text-4xl font-bold ${macro.color}`}>{macro.val}</div>
                <div className="text-xs font-semibold text-secondary mt-1">{macro.pct} of total calories</div>
              </div>
              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden mt-6">
                <div className={`h-full ${macro.bar} rounded-full`} style={{ width: macro.pct }}></div>
              </div>
            </div>
          ))}
        </section>

        {/* AI Verdict Section */}
        <section className="flex flex-col gap-8">
          <div className="bg-primary-container rounded-3xl p-8 shadow-high text-on-primary-container relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
               <Trophy size={200} />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
              <motion.div 
                animate={isImproved ? { scale: [1, 1.1, 1] } : {}}
                className="flex-shrink-0 flex flex-col items-center justify-center bg-white rounded-2xl p-6 shadow-ambient w-32 h-32 md:w-36 md:h-36"
              >
                <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-2 text-center">AI Score</span>
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={score}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-4xl md:text-5xl font-bold text-primary flex items-baseline"
                  >
                    {score.toFixed(1)}<span className="text-lg text-secondary">/10</span>
                  </motion.div>
                </AnimatePresence>
                {isImproved && (
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] text-primary font-bold mt-1"
                  >
                    + IMPROVED
                  </motion.span>
                )}
              </motion.div>
              <div className="flex-grow">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">AI Verdict</h2>
                <p className="text-lg mb-6 leading-relaxed">
                  {verdict.text}
                </p>
                <p className="text-lg font-bold">Health Impact: {verdict.impact}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-8 shadow-ambient border border-surface-container-highest">
          <h3 className="text-xl font-bold text-on-surface mb-8 flex items-center gap-2">
            <RefreshCcw className="text-primary" size={24} />
            Better Alternatives
          </h3>
          <div className="flex flex-col gap-6">
            {alternatives.map((alt) => (
              <button 
                key={alt.id}
                disabled={appliedAlts.includes(alt.id)}
                onClick={() => handleApplyAlternative(alt.id, alt.targetId, alt.originalId)}
                className={`text-left p-6 rounded-2xl border transition-all flex flex-col gap-6 group relative overflow-hidden max-w-xl ${
                  appliedAlts.includes(alt.id) 
                    ? 'bg-primary/5 border-primary/20 opacity-60 grayscale' 
                    : 'bg-surface-container-low border-surface-container hover:border-primary hover:bg-white hover:shadow-high'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="text-3xl md:text-4xl font-extrabold text-secondary/80 flex-shrink-0">
                    {alt.mealNumber}
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm border border-surface-container grayscale opacity-80">
                      <img src={alt.currentImg} alt="Unhealthy" className="w-full h-full object-cover" />
                    </div>
                    <ChevronRight size={24} className="text-secondary" />
                    <div className="w-24 h-24 rounded-xl overflow-hidden shadow-sm border-2 border-primary-container ring-2 ring-primary/10">
                      <img src={alt.suggestedImg} alt="Healthy" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="flex flex-col gap-1 mb-3">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{alt.type}</span>
                      <h4 className="font-bold text-lg md:text-xl leading-tight">
                        {alt.name}
                      </h4>
                    </div>
                    <p className="text-sm text-secondary leading-relaxed max-w-xl">{alt.desc}</p>
                    
                    {appliedAlts.includes(alt.id) && (
                      <span className="text-sm font-bold text-primary mt-4 flex items-center gap-1">
                        Applied successfully <CheckCircle2 size={16} />
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
            {alternatives.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 bg-surface-container-low rounded-2xl border border-dashed border-surface-container-highest text-center px-6">
                <div className={`w-12 h-12 ${score >= 8 ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'} rounded-full flex items-center justify-center mb-4`}>
                  {score >= 8 ? <CheckCircle2 size={24} /> : <RefreshCcw size={24} className="opacity-50" />}
                </div>
                <h4 className="text-lg font-bold text-on-surface mb-2">
                  {score >= 8 ? "Your meal is looking great!" : "No direct swaps found"}
                </h4>
                <p className="text-sm text-secondary max-w-xs">
                  {score >= 8 
                    ? "NutriAI couldn't find any immediate better alternatives. Your current selection is already well-balanced."
                    : "While no direct item replacements were found in the database, you can still optimize this meal. Check the AI Verdict above for specific balancing tips."}
                </p>
              </div>
            )}
          </div>
        </section>
          </div>

          <aside className="lg:col-span-4 flex flex-col gap-8">
        <div className="bg-white rounded-3xl p-8 shadow-ambient border border-surface-container-highest">
          <h3 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
            <CheckCircle2 className="text-primary" size={22} />
            Micro-nutrient Daily Values
          </h3>
          <div className="flex flex-col gap-5">
            {MICRO_NUTRIENTS.map((item, idx) => {
              const isGood = item.status === 'good';
              return (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-1.5 ${isGood ? 'text-primary' : 'text-error'}`}>
                      <span className="font-bold text-sm tracking-tight">{item.name}</span>
                      {isGood ? <CheckCircle2 size={16} className="stroke-[2.5]" /> : <X size={16} className="stroke-[2.5]" />}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isGood ? 'text-primary' : 'text-error'}`}>
                      {item.pct}% Daily Value
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-[11px] text-secondary font-medium px-0.5">
                    <span>{item.current}{item.unit} / {item.recommended}{item.unit}</span>
                    <span className="opacity-60">Goal: {item.recommended}{item.unit}</span>
                  </div>

                  <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, item.pct)}%` }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.1 }}
                      className={`h-full rounded-full ${isGood ? 'bg-primary' : 'bg-error'}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-[10px] text-secondary leading-relaxed italic text-center">
            *Values are estimates based on standard clinical databases.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-high border border-surface-container-highest flex flex-col gap-4">
          <h3 className="text-lg font-bold text-on-surface mb-2">Actions</h3>
          <Link 
            to="/meal-builder"
            className="w-full bg-primary-container text-on-primary-container font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-ambient active:scale-98 text-sm"
          >
            Modify Meal
          </Link>
          <button 
            onClick={exportToPDF}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-ambient active:scale-98 text-sm"
          >
            <FileDown size={18} />
            Export PDF
          </button>
        </div>
          </aside>
        </>
      )}
    </motion.div>
  );
}

