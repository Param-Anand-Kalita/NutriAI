import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import MealBuilder from './components/MealBuilder';
import DetailedNutrition from './components/DetailedNutrition';

import { MealProvider } from './context/MealContext';

export default function App() {
  return (
    <Router>
      <MealProvider>
        <div className="min-h-screen flex flex-col font-sans bg-background selection:bg-primary/20 selection:text-primary">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/meal-builder" element={<MealBuilder />} />
              <Route path="/detailed-nutrition" element={<DetailedNutrition />} />
              <Route path="/about" element={<div className="max-w-7xl mx-auto px-8 py-20 text-center"><h1 className="text-4xl font-bold mb-4">About NutriAI</h1><p className="text-secondary text-lg">Your intelligent companion for nutritional clarity.</p></div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </MealProvider>
    </Router>
  );
}

