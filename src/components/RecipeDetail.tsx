import React, { useState, useEffect } from 'react';
import { Recipe } from '../types';
import { CommentsBlock } from './CommentsBlock';
import { Clock, Users, Flame, ChefHat, Tag, ArrowLeft, Play, Pause, Square, CheckSquare, Dumbbell } from 'lucide-react';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack }) => {
  const [servingsMultiplier, setServingsMultiplier] = useState<number>(recipe.servings);
  const [completedDirections, setCompletedDirections] = useState<{ [key: number]: boolean }>({});
  
  // Active Timer State
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timerTotal, setTimerTotal] = useState<number>(recipe.prepTime * 60);

  useEffect(() => {
    setServingsMultiplier(recipe.servings);
    setCompletedDirections({});
    setTimerActive(false);
    setTimerSeconds(0);
    setTimerTotal(recipe.prepTime * 60);

    // Dynamic Google Schema Injection for SEO Bots
    const existingScript = document.getElementById('recipe-ld-json-schema');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'recipe-ld-json-schema';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org/",
      "@type": "Recipe",
      "name": recipe.title,
      "image": [recipe.image],
      "author": {
        "@type": "Person",
        "name": "Elena Vasquez"
      },
      "datePublished": "2026-06-11",
      "description": recipe.description,
      "prepTime": `PT${recipe.prepTime}M`,
      "cookTime": `PT${recipe.cookTime}M`,
      "totalTime": `PT${recipe.prepTime + recipe.cookTime}M`,
      "recipeYield": `${servingsMultiplier} servings`,
      "recipeCategory": recipe.category,
      "nutrition": {
        "@type": "NutritionInformation",
        "calories": `${recipe.calories} calories`,
        "proteinContent": `${recipe.macros.protein}g`,
        "carbohydrateContent": `${recipe.macros.carbs}g`,
        "fatContent": `${recipe.macros.fat}g`
      },
      "recipeIngredient": recipe.ingredients.map(i => `${((i.amount / recipe.servings) * servingsMultiplier).toFixed(1).replace('.0', '')} ${i.unit} ${i.name}`),
      "recipeInstructions": recipe.directions.map(d => ({
        "@type": "HowToStep",
        "text": d
      }))
    });
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('recipe-ld-json-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [recipe]);

  // Timer loop
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timerSeconds < timerTotal) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    } else if (timerSeconds >= timerTotal) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds, timerTotal]);

  const handleToggleTimer = () => {
    setTimerActive(!timerActive);
  };

  const handleResetTimer = () => {
    setTimerActive(false);
    setTimerSeconds(0);
  };

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleDirection = (idx: number) => {
    setCompletedDirections(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-fade-in font-sans">
      {/* Back to recipes line */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 font-serif font-bold italic text-sm cursor-pointer underline decoration-[#3CB371] decoration-2"
      >
        <ArrowLeft className="w-4 h-4 text-[#3CB371]" /> Return to Recipe Archive
      </button>

      {/* Hero Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#FFF8F0] border border-[#1F1F1F]/10 rounded-none p-6 md:p-8">
        <div className="md:col-span-5 aspect-square rounded-none overflow-hidden border border-[#1F1F1F]/10">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] uppercase font-mono tracking-widest bg-white text-[#3CB371] px-2.5 py-1 rounded-none font-extrabold border border-[#1F1F1F]/10">
              {recipe.category.replace('-', ' ')}
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest bg-[#1F1F1F] text-white px-2.5 py-1 rounded-none font-bold">
              Difficulty: {recipe.difficulty}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-serif font-bold italic text-[#1F1F1F] leading-tight">
            {recipe.title}
          </h2>

          <p className="text-sm text-stone-600 leading-relaxed font-sans">{recipe.description}</p>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-4 gap-2 text-center pt-2">
            <div className="bg-white border border-[#1F1F1F]/10 rounded-none p-2.5">
              <Flame className="w-4 h-4 text-[#FFA94D] mx-auto mb-1" />
              <span className="text-[9px] font-mono text-stone-400 block uppercase">Calories</span>
              <strong className="text-xs font-bold font-mono text-[#1F1F1F]">
                {Math.round((recipe.calories / recipe.servings) * servingsMultiplier)}
              </strong>
            </div>

            <div className="bg-white border border-[#1F1F1F]/10 rounded-none p-2.5">
              <Dumbbell className="w-4 h-4 text-[#3CB371] mx-auto mb-1" />
              <span className="text-[9px] font-mono text-stone-400 block uppercase font-bold">Protein</span>
              <strong className="text-xs font-bold font-mono text-[#3CB371]">
                {Math.round((recipe.macros.protein / recipe.servings) * servingsMultiplier)}g
              </strong>
            </div>

            <div className="bg-white border border-[#1F1F1F]/10 rounded-none p-2.5">
              <Users className="w-4 h-4 text-sky-500 mx-auto mb-1" />
              <span className="text-[9px] font-mono text-stone-400 block uppercase font-bold">Carbs</span>
              <strong className="text-xs font-bold font-mono text-sky-700">
                {Math.round((recipe.macros.carbs / recipe.servings) * servingsMultiplier)}g
              </strong>
            </div>

            <div className="bg-white border border-[#1F1F1F]/10 rounded-none p-2.5">
              <ChefHat className="w-4 h-4 text-rose-500 mx-auto mb-1" />
              <span className="text-[9px] font-mono text-stone-400 block uppercase font-bold">Fat</span>
              <strong className="text-xs font-bold font-mono text-rose-700">
                {Math.round((recipe.macros.fat / recipe.servings) * servingsMultiplier)}g
              </strong>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INGREDIENTS LIST & SERVINGS SIZER */}
        <div className="lg:col-span-5 bg-white rounded-none border border-[#1F1F1F]/10 p-6 md:p-8">
          <div className="flex items-center justify-between border-b border-[#1F1F1F]/10 pb-4 mb-4">
            <h3 className="text-xl font-serif font-bold italic text-[#1F1F1F] flex items-center gap-1.5">
              <ChefHat className="w-5 h-5 text-[#3CB371]" /> Ingredients
            </h3>

            {/* Servings multiplier controller */}
            <div className="flex items-center gap-2 bg-[#FFF8F0] border border-[#1F1F1F]/10 p-1 rounded-none">
              <button
                onClick={() => setServingsMultiplier(Math.max(1, servingsMultiplier - 1))}
                className="w-6 h-6 rounded-none bg-white text-gray-600 border border-[#1F1F1F]/10 hover:bg-gray-50 flex items-center justify-center font-bold font-mono text-xs cursor-pointer select-none"
              >
                -
              </button>
              <span className="text-xs font-bold font-mono min-w-14 text-center">
                {servingsMultiplier} srv
              </span>
              <button
                onClick={() => setServingsMultiplier(servingsMultiplier + 1)}
                className="w-6 h-6 rounded-none bg-white text-gray-600 border border-[#1F1F1F]/10 hover:bg-gray-50 flex items-center justify-center font-bold font-mono text-xs cursor-pointer select-none"
              >
                +
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {recipe.ingredients.map((ing, idx) => {
              // Calculate scaled amounts dynamically
              const scaledAmount = (ing.amount / recipe.servings) * servingsMultiplier;
              // format decimals beautifully
              const displayAmount = scaledAmount % 1 === 0 ? scaledAmount : scaledAmount.toFixed(1).replace('.0', '');

              return (
                <div key={idx} className="flex justify-between items-start gap-4 text-xs font-medium font-sans border-b border-dashed border-[#1F1F1F]/10 pb-2 mb-2">
                  <div className="text-gray-800 leading-normal pl-1 relative">
                    <span className="text-[#3CB371] font-bold text-lg leading-none absolute -left-2.5 top-0">•</span>
                    {ing.name}
                  </div>
                  <strong className="text-gray-900 shrink-0 font-mono tracking-tight text-right uppercase">
                    {displayAmount} {ing.unit}
                  </strong>
                </div>
              );
            })}
          </div>

          {/* ACTIVE COOKING COUNTDOWN TIMER DISPLAY */}
          <div className="mt-8 bg-[#FFF8F0] border border-[#1F1F1F]/10 rounded-none p-4 text-center space-y-3">
            <span className="text-[10px] font-bold tracking-widest text-[#FFA94D] uppercase flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Prep / Sauté Active Timer
            </span>

            <div className="text-3xl font-black font-mono text-[#1F1F1F] leading-none">
              {formatTime(timerTotal - timerSeconds)}
            </div>

            <div className="flex items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleToggleTimer}
                className="bg-[#1F1F1F] text-white font-bold text-[10px] tracking-wider uppercase py-1.5 px-3.5 rounded-none flex items-center gap-1 cursor-pointer transition-all active:scale-95 hover:brightness-125"
              >
                {timerActive ? <><Pause className="w-3 h-3 text-[#FFA94D]" /> Pause</> : <><Play className="w-3 h-3 text-[#3CB371]" /> Start</>}
              </button>
              <button
                type="button"
                onClick={handleResetTimer}
                className="bg-white text-gray-600 border border-[#1F1F1F]/10 font-bold text-[10px] tracking-wider uppercase py-1.5 px-3.5 rounded-none flex items-center gap-1 cursor-pointer hover:bg-gray-50 transition-all active:scale-95"
              >
                <Square className="w-3 h-3" /> Reset
              </button>
            </div>

            <div className="flex bg-[#1F1F1F]/10 h-1.5 rounded-none overflow-hidden">
              <div
                style={{ width: `${(timerSeconds / timerTotal) * 100}%` }}
                className="bg-[#3CB371] h-full transition-all duration-1000"
              />
            </div>
          </div>
        </div>

        {/* PREPARATION STEPS DIRECTIONS */}
        <div className="lg:col-span-7 bg-white rounded-none border border-[#1F1F1F]/10 p-6 md:p-8">
          <h3 className="text-xl font-serif font-bold italic text-[#1F1F1F] border-b border-[#1F1F1F]/10 pb-4 mb-4 flex items-center gap-1.5">
            <ChefHat className="w-5 h-5 text-[#3CB371]" /> Prep &amp; Cooking Directions
          </h3>

          <div className="space-y-4">
            {recipe.directions.map((dir, idx) => (
              <div
                key={idx}
                onClick={() => toggleDirection(idx)}
                className={`flex items-start gap-4 p-3.5 border transition-all cursor-pointer rounded-none ${
                  completedDirections[idx]
                    ? 'bg-stone-50 border-[#1F1F1F]/10 line-through text-[#1F1F1F]/40'
                    : 'bg-[#FFF8F0]/30 border-transparent hover:bg-white hover:border-[#3CB371]/40'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-none border flex items-center justify-center font-bold text-xs font-mono shrink-0 mt-0.5 ${
                    completedDirections[idx]
                      ? 'bg-[#3CB371] border-[#3CB371] text-white'
                      : 'border-[#1F1F1F]/10 bg-white text-stone-500'
                  }`}
                >
                  {completedDirections[idx] ? '✓' : idx + 1}
                </div>
                <p className="text-xs text-stone-800 leading-relaxed font-sans">{dir}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#FFF8F0] p-4 border border-[#1F1F1F]/10 text-xs text-stone-700 leading-relaxed rounded-none mt-8 flex items-start gap-2.5">
            <Tag className="w-4 h-4 text-[#3CB371] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold font-serif block text-[#3CB371] mb-0.5">Author SEO keywords tagged inside schema:</span>
              <p className="italic text-stone-500">
                {recipe.seoKeywords.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Interactive Comments Roundtable */}
      <CommentsBlock contentId={recipe.id} contentType="recipe" />
    </div>
  );
};
