import bananaImg from '../photos/banana.png';
import appleImg from '../photos/apple.jpg';
import blueberriesImg from '../photos/blueberries.jpg';
import grapesImg from '../photos/grapes.jpg';
import orangeImg from '../photos/orange.jpg';
import pineappleImg from '../photos/pineapple.jpg';
import bellPepperImg from '../photos/bell pepper.jpg';
import broccoliImg from '../photos/broccoli.jpg';
import carrotImg from '../photos/carrot.jpg';
import cucumberImg from '../photos/cucumber.jpg';
import lettuceImg from '../photos/lettuce.jpg';
import sweetPotatoImg from '../photos/sweet potato.jpg';
import tomatoImg from '../photos/tomato.jpg';
import eggsImg from '../photos/eggs.jpg';
import scrambledEggsImg from '../photos/scrambled eggs.jpg';
import eggWhitesImg from '../photos/egg whites.jpg';
import paneerImg from '../photos/paneer.jpg';
import tofuImg from '../photos/tofu.jpg';
import greekYogurtImg from '../photos/greek yogurt.jpg';
import turkeyImg from '../photos/turkey.jpg';
import tunaImg from '../photos/tuna.jpg';

import almondsImg from '../photos/almonds.jpg';
import chipsImg from '../photos/chips.jpg';
import popcornImg from '../photos/popcorn.jpg';
import proteinBarImg from '../photos/protein bar.jpg';
import butterImg from '../photos/butter.jpg';
import honeyImg from '../photos/honey.jpg';
import multigrainBreadImg from '../photos/multigrain bread.jpg';
import oatmealImg from '../photos/oatmeal.jpg';
import peanutButterImg from '../photos/peanut butter.jpg';
import strawberryJamImg from '../photos/strawberry jam.jpg';
import whiteBreadImg from '../photos/white bread.jpg';
import wholeWheatBreadImg from '../photos/whole wheat bread.jpg';
import milkImg from '../photos/milk.jpg';
import greenTeaImg from '../photos/green tea.jpg';
import proteinShakeImg from '../photos/protein shake.jpg';
import friesImg from '../photos/fries.jpg';

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: string;
  image: string;
  serving: string;
}

export const FOOD_DATABASE: FoodItem[] = [
  // PROTEINS
  {
    id: 'chicken-breast',
    name: 'Chicken Breast',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    category: 'Proteins',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=200&auto=format&fit=crop',
    serving: '100g'
  },
  {
    id: 'grilled-chicken',
    name: 'Grilled Chicken',
    calories: 190,
    protein: 32,
    carbs: 0,
    fat: 6,
    category: 'Proteins',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=200&auto=format&fit=crop',
    serving: '100g'
  },
  {
    id: 'salmon',
    name: 'Salmon',
    calories: 208,
    protein: 20,
    carbs: 0,
    fat: 13,
    category: 'Proteins',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=200&auto=format&fit=crop',
    serving: '100g'
  },
  {
    id: 'tuna',
    name: 'Tuna',
    calories: 132,
    protein: 28,
    carbs: 0,
    fat: 1,
    category: 'Proteins',
    image: tunaImg,
    serving: '1 can (150g)'
  },
  {
    id: 'eggs',
    name: 'Eggs',
    calories: 155,
    protein: 13,
    carbs: 1.1,
    fat: 11,
    category: 'Proteins',
    image: eggsImg,
    serving: '2 large eggs'
  },
  {
    id: 'scrambled-eggs',
    name: 'Scrambled Eggs',
    calories: 196,
    protein: 13,
    carbs: 1.5,
    fat: 15,
    category: 'Proteins',
    image: scrambledEggsImg,
    serving: '2 large eggs'
  },
  {
    id: 'egg-whites',
    name: 'Egg Whites',
    calories: 52,
    protein: 11,
    carbs: 0.7,
    fat: 0.2,
    category: 'Proteins',
    image: eggWhitesImg,
    serving: '100g'
  },
  {
    id: 'paneer',
    name: 'Paneer',
    calories: 265,
    protein: 18,
    carbs: 1.2,
    fat: 20,
    category: 'Proteins',
    image: paneerImg,
    serving: '100g'
  },
  {
    id: 'tofu',
    name: 'Tofu',
    calories: 76,
    protein: 8,
    carbs: 1.9,
    fat: 4.8,
    category: 'Proteins',
    image: tofuImg,
    serving: '100g'
  },
  {
    id: 'greek-yogurt',
    name: 'Greek Yogurt',
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fat: 0.4,
    category: 'Proteins',
    image: greekYogurtImg,
    serving: '100g'
  },
  {
    id: 'turkey',
    name: 'Turkey',
    calories: 189,
    protein: 29,
    carbs: 0.1,
    fat: 7,
    category: 'Proteins',
    image: turkeyImg,
    serving: '100g'
  },
  {
    id: 'beef-steak',
    name: 'Beef Steak',
    calories: 250,
    protein: 26,
    carbs: 0,
    fat: 15,
    category: 'Proteins',
    image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?q=80&w=200&auto=format&fit=crop',
    serving: '100g'
  },

  // FRUITS
  {
    id: 'banana',
    name: 'Banana',
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fat: 0.3,
    category: 'Fruits',
    image: bananaImg,
    serving: '1 medium (118g)'
  },
  {
    id: 'apple',
    name: 'Apple',
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fat: 0.2,
    category: 'Fruits',
    image: appleImg,
    serving: '1 small (100g)'
  },
  {
    id: 'orange',
    name: 'Orange',
    calories: 47,
    protein: 0.9,
    carbs: 12,
    fat: 0.1,
    category: 'Fruits',
    image: orangeImg,
    serving: '1 small (100g)'
  },
  {
    id: 'mango',
    name: 'Mango',
    calories: 60,
    protein: 0.8,
    carbs: 15,
    fat: 0.4,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=200&auto=format&fit=crop',
    serving: '100g'
  },
  {
    id: 'blueberries',
    name: 'Blueberries',
    calories: 57,
    protein: 0.7,
    carbs: 14,
    fat: 0.3,
    category: 'Fruits',
    image: blueberriesImg,
    serving: '100g'
  },
  {
    id: 'strawberries',
    name: 'Strawberries',
    calories: 32,
    protein: 0.7,
    carbs: 7.7,
    fat: 0.3,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=200&auto=format&fit=crop',
    serving: '100g'
  },
  {
    id: 'watermelon',
    name: 'Watermelon',
    calories: 30,
    protein: 0.6,
    carbs: 8,
    fat: 0.2,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=200&auto=format&fit=crop',
    serving: '100g'
  },
  {
    id: 'pineapple',
    name: 'Pineapple',
    calories: 50,
    protein: 0.5,
    carbs: 13,
    fat: 0.1,
    category: 'Fruits',
    image: pineappleImg,
    serving: '100g'
  },
  {
    id: 'grapes',
    name: 'Grapes',
    calories: 69,
    protein: 0.7,
    carbs: 18,
    fat: 0.2,
    category: 'Fruits',
    image: grapesImg,
    serving: '100g'
  },

  // VEGETABLES
  {
    id: 'broccoli',
    name: 'Broccoli',
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
    category: 'Vegetables',
    image: broccoliImg,
    serving: '100g'
  },
  {
    id: 'spinach',
    name: 'Spinach',
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=200&auto=format&fit=crop',
    serving: '100g'
  },
  {
    id: 'carrot',
    name: 'Carrot',
    calories: 41,
    protein: 0.9,
    carbs: 10,
    fat: 0.2,
    category: 'Vegetables',
    image: carrotImg,
    serving: '100g'
  },
  {
    id: 'cucumber',
    name: 'Cucumber',
    calories: 15,
    protein: 0.7,
    carbs: 3.6,
    fat: 0.1,
    category: 'Vegetables',
    image: cucumberImg,
    serving: '100g'
  },
  {
    id: 'lettuce',
    name: 'Lettuce',
    calories: 15,
    protein: 1.4,
    carbs: 2.9,
    fat: 0.2,
    category: 'Vegetables',
    image: lettuceImg,
    serving: '100g'
  },
  {
    id: 'mixed-salad',
    name: 'Mixed Salad',
    calories: 25,
    protein: 1.5,
    carbs: 5,
    fat: 0.3,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=200&auto=format&fit=crop',
    serving: '1 bowl'
  },
  {
    id: 'bell-pepper',
    name: 'Bell Pepper',
    calories: 31,
    protein: 1,
    carbs: 6,
    fat: 0.3,
    category: 'Vegetables',
    image: bellPepperImg,
    serving: '100g'
  },
  {
    id: 'tomato',
    name: 'Tomato',
    calories: 18,
    protein: 0.9,
    carbs: 3.9,
    fat: 0.2,
    category: 'Vegetables',
    image: tomatoImg,
    serving: '100g'
  },

  // FAST FOOD
  {
    id: 'cheeseburger',
    name: 'Cheeseburger',
    calories: 303,
    protein: 16,
    carbs: 33,
    fat: 12,
    category: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200&auto=format&fit=crop',
    serving: '1 burger'
  },
  {
    id: 'fries',
    name: 'Fries',
    calories: 312,
    protein: 3.4,
    carbs: 41,
    fat: 15,
    category: 'Fast Food',
    image: friesImg,
    serving: 'Medium portion (117g)'
  },
  {
    id: 'pizza',
    name: 'Pizza',
    calories: 266,
    protein: 11,
    carbs: 33,
    fat: 10,
    category: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200&auto=format&fit=crop',
    serving: '1 slice (100g)'
  },
  {
    id: 'fried-chicken',
    name: 'Fried Chicken',
    calories: 246,
    protein: 19,
    carbs: 12,
    fat: 14,
    category: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=200&auto=format&fit=crop',
    serving: '1 piece (100g)'
  },
  {
    id: 'tacos',
    name: 'Tacos',
    calories: 226,
    protein: 10,
    carbs: 20,
    fat: 12,
    category: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=200&auto=format&fit=crop',
    serving: '1 taco'
  },
  {
    id: 'hot-dog',
    name: 'Hot Dog',
    calories: 290,
    protein: 10,
    carbs: 18,
    fat: 20,
    category: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1541214113241-21578d2d9b62?q=80&w=200&auto=format&fit=crop',
    serving: '1 hot dog'
  },

  // DRINKS
  {
    id: 'soda',
    name: 'Soda',
    calories: 140,
    protein: 0,
    carbs: 39,
    fat: 0,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=200&auto=format&fit=crop',
    serving: '1 can (355ml)'
  },
  {
    id: 'coffee',
    name: 'Coffee',
    calories: 2,
    protein: 0.3,
    carbs: 0.1,
    fat: 0.1,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=200&auto=format&fit=crop',
    serving: '1 cup (240ml)'
  },
  {
    id: 'green-tea',
    name: 'Green Tea',
    calories: 1,
    protein: 0.1,
    carbs: 0,
    fat: 0,
    category: 'Drinks',
    image: greenTeaImg,
    serving: '1 cup (240ml)'
  },
  {
    id: 'orange-juice',
    name: 'Orange Juice',
    calories: 45,
    protein: 0.7,
    carbs: 10,
    fat: 0.2,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=200&auto=format&fit=crop',
    serving: '100ml'
  },
  {
    id: 'milk',
    name: 'Milk',
    calories: 61,
    protein: 3.3,
    carbs: 4.8,
    fat: 3.3,
    category: 'Drinks',
    image: milkImg,
    serving: '100ml'
  },
  {
    id: 'protein-shake',
    name: 'Protein Shake',
    calories: 150,
    protein: 25,
    carbs: 5,
    fat: 3,
    category: 'Drinks',
    image: proteinShakeImg,
    serving: '1 shake'
  },

  // SNACKS
  {
    id: 'almonds',
    name: 'Almonds',
    calories: 579,
    protein: 21,
    carbs: 22,
    fat: 49,
    category: 'Snacks',
    image: almondsImg,
    serving: '100g'
  },
  {
    id: 'protein-bar',
    name: 'Protein Bar',
    calories: 220,
    protein: 20,
    carbs: 22,
    fat: 7,
    category: 'Snacks',
    image: proteinBarImg,
    serving: '1 bar (60g)'
  },
  {
    id: 'chips',
    name: 'Chips',
    calories: 536,
    protein: 7,
    carbs: 53,
    fat: 35,
    category: 'Snacks',
    image: chipsImg,
    serving: '100g'
  },
  {
    id: 'popcorn',
    name: 'Popcorn',
    calories: 375,
    protein: 11,
    carbs: 74,
    fat: 4,
    category: 'Snacks',
    image: popcornImg,
    serving: '100g'
  },
  {
    id: 'dark-chocolate',
    name: 'Dark Chocolate',
    calories: 546,
    protein: 5,
    carbs: 46,
    fat: 31,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=200&auto=format&fit=crop',
    serving: '100g'
  },

  // GRAINS & PANTRY
  {
    id: 'white-bread',
    name: 'White Bread',
    calories: 265,
    protein: 9,
    carbs: 49,
    fat: 3.2,
    category: 'Grains & Pantry',
    image: whiteBreadImg,
    serving: '2 slices (100g)'
  },
  {
    id: 'whole-wheat-bread',
    name: 'Whole Wheat Bread',
    calories: 247,
    protein: 13,
    carbs: 41,
    fat: 3.4,
    category: 'Grains & Pantry',
    image: wholeWheatBreadImg,
    serving: '2 slices (100g)'
  },
  {
    id: 'butter',
    name: 'Butter',
    calories: 717,
    protein: 0.9,
    carbs: 0.1,
    fat: 81,
    category: 'Grains & Pantry',
    image: butterImg,
    serving: '100g'
  },
  {
    id: 'strawberry-jam',
    name: 'Strawberry Jam',
    calories: 278,
    protein: 0.6,
    carbs: 69,
    fat: 0,
    category: 'Grains & Pantry',
    image: strawberryJamImg,
    serving: '100g'
  },
  {
    id: 'peanut-butter',
    name: 'Peanut Butter',
    calories: 588,
    protein: 25,
    carbs: 20,
    fat: 50,
    category: 'Grains & Pantry',
    image: peanutButterImg,
    serving: '100g'
  },
  {
    id: 'honey',
    name: 'Honey',
    calories: 304,
    protein: 0.3,
    carbs: 82,
    fat: 0,
    category: 'Grains & Pantry',
    image: honeyImg,
    serving: '100g'
  },
  {
    id: 'white-rice',
    name: 'White Rice',
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fat: 0.3,
    category: 'Grains & Pantry',
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=200&auto=format&fit=crop',
    serving: '100g cooked'
  },
  {
    id: 'oatmeal',
    name: 'Oatmeal',
    calories: 68,
    protein: 2.4,
    carbs: 12,
    fat: 1.4,
    category: 'Grains & Pantry',
    image: oatmealImg,
    serving: '100g cooked'
  },
  {
    id: 'multigrain-bread',
    name: 'Multigrain Bread',
    calories: 250,
    protein: 12,
    carbs: 43,
    fat: 4,
    category: 'Grains & Pantry',
    image: multigrainBreadImg,
    serving: '2 slices (100g)'
  },
  {
    id: 'sweet-potato',
    name: 'Sweet Potato',
    calories: 86,
    protein: 1.6,
    carbs: 20,
    fat: 0.1,
    category: 'Vegetables',
    image: sweetPotatoImg,
    serving: '100g'
  },
];
