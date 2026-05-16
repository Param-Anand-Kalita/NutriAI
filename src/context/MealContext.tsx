import React, { createContext, useContext, useState, useEffect } from 'react';
import { FoodItem, FOOD_DATABASE } from '../data/foods';

interface MealContextType {
  mealItems: FoodItem[];
  addToMeal: (food: FoodItem) => void;
  removeFromMeal: (id: string) => void;
  clearMeal: () => void;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  mealScore: number;
  replaceInMeal: (oldId: string, newFood: FoodItem) => void;
  updateQuantity: (id: string, delta: number) => void;
}

const MealContext = createContext<MealContextType | undefined>(undefined);

export const MealProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mealItems, setMealItems] = useState<FoodItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('nutriai-meal');

    if (saved) {
      setMealItems(JSON.parse(saved));
    }
    setIsInitialized(true);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem('nutriai-meal', JSON.stringify(mealItems));
  }, [mealItems, isInitialized]);

  const addToMeal = (food: FoodItem) => {
    setMealItems(prev => {
      const existing = prev.find(item => item.id.startsWith(food.id));
      if (existing) {
        return prev.map(item => 
          item.id === existing.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 } 
            : item
        );
      }
      return [...prev, { ...food, quantity: 1, id: `${food.id}-${Date.now()}` }];
    });
  };

  const removeFromMeal = (id: string) => {
    setMealItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setMealItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, (item.quantity || 1) + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearMeal = () => {
    setMealItems([]);
  };

  const replaceInMeal = (oldId: string, newFood: FoodItem) => {
    setMealItems(prev => prev.map(item => 
      item.id === oldId ? { ...newFood, id: `${newFood.id}-${Date.now()}` } : item
    ));
  };

  const totalCalories = mealItems.reduce((acc, curr) => acc + (curr.calories * (curr.quantity || 1)), 0);
  const totalProtein = mealItems.reduce((acc, curr) => acc + (curr.protein * (curr.quantity || 1)), 0);
  const totalCarbs = mealItems.reduce((acc, curr) => acc + (curr.carbs * (curr.quantity || 1)), 0);
  const totalFat = mealItems.reduce((acc, curr) => acc + (curr.fat * (curr.quantity || 1)), 0);

  const calculateScore = () => {
    if (mealItems.length === 0) return 0;
    const pPct = (totalProtein * 4) / (totalCalories || 1);
    const cPct = (totalCarbs * 4) / (totalCalories || 1);
    const fPct = (totalFat * 9) / (totalCalories || 1);
    const pDiff = Math.abs(pPct - 0.3);
    const cDiff = Math.abs(cPct - 0.4);
    const fDiff = Math.abs(fPct - 0.3);
    const score = 10 - (pDiff + cDiff + fDiff) * 10;
    return Math.max(0, Math.min(10, +score.toFixed(1)));
  };

  const mealScore = calculateScore();

  return (
    <MealContext.Provider value={{ 
      mealItems, addToMeal, removeFromMeal, clearMeal, replaceInMeal, updateQuantity,
      totalCalories, totalProtein, totalCarbs, totalFat, mealScore
    }}>
      {children}
    </MealContext.Provider>
  );
};

export const useMeal = () => {
  const context = useContext(MealContext);
  if (!context) throw new Error('useMeal must be used within a MealProvider');
  return context;
};
