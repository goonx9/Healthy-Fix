import React, { useState } from 'react';
import { Flame, Dumbbell, GlassWater, Sparkles, Scale, RefreshCw, ShoppingBag, CreditCard, Check } from 'lucide-react';

export const WeightLossCalc: React.FC = () => {
  const [weight, setWeight] = useState<number>(70); // in kg
  const [height, setHeight] = useState<number>(170); // in cm
  const [age, setAge] = useState<number>(26);
  const [gender, setGender] = useState<'female' | 'male'>('female');
  const [activity, setActivity] = useState<number>(1.375); // Light active default
  const [deficitTarget, setDeficitTarget] = useState<number>(500); // 500 kcal default

  const [results, setResults] = useState<{
    bmr: number;
    tdee: number;
    targetCalories: number;
    proteinGrams: number;
    waterLiters: number;
  } | null>(null);

  // Digital shop product checkout states
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; price: string } | null>(null);
  const [purchasedProduct, setPurchasedProduct] = useState<string | null>(null);

  const handleBuyProduct = (product: { name: string; price: string }) => {
    setSelectedProduct(product);
    setShowCheckoutModal(true);
  };

  const handleExecuteCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProduct) {
      setPurchasedProduct(selectedProduct.name);
      setTimeout(() => {
        setShowCheckoutModal(false);
      }, 2000);
    }
  };

  const calculateMetrics = (e: React.FormEvent) => {
    e.preventDefault();

    // Harris-Benedict Equation for BMR
    let bmr = 0;
    if (gender === 'female') {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    } else {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    }

    const tdee = bmr * activity;
    const targetCalories = Math.max(1200, tdee - deficitTarget);

    // Dynamic clean weight loss protein math: 1.8g TO 2.0g per kg
    const proteinGrams = Math.round(weight * 1.9);

    // Water rule of thumb: 35ml per kg of weight
    const waterLiters = Math.round((weight * 0.035) * 10) / 10;

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      proteinGrams,
      waterLiters
    });
  };

  return (
    <div className="bg-white rounded-none border border-[#1F1F1F]/10 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#1F1F1F]/10">
        <div className="text-left">
          <span className="text-xs font-bold tracking-widest text-[#3CB371] uppercase flex items-center gap-1">
            <Scale className="w-3.5 h-3.5" /> Interactive Fitness Tool
          </span>
          <h2 className="text-3xl font-serif font-bold italic text-[#1F1F1F] mt-1">Deficit &amp; Protein Calculator</h2>
        </div>
        <p className="text-xs text-stone-500 max-w-sm text-left font-sans">
          Stop guessing. Get precision metrics calculated using proven nutritional formulas specifically for muscle protection and safe fat loss.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT FIELDS */}
        <form onSubmit={calculateMetrics} className="lg:col-span-5 space-y-4 text-left">
          <div className="bg-[#FFF8F0]/30 p-4 rounded-none border border-[#1F1F1F]/10 space-y-4">
            {/* Gender Toggle */}
            <div>
              <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-2">Gender</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-2 px-4 rounded-none text-xs font-bold text-center transition-all cursor-pointer border uppercase tracking-widest ${
                    gender === 'female'
                      ? 'border-[#1F1F1F] bg-[#1F1F1F] text-white shadow-xs'
                      : 'border-[#1F1F1F]/10 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Female (18-35)
                </button>
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-2 px-4 rounded-none text-xs font-bold text-center transition-all cursor-pointer border uppercase tracking-widest ${
                    gender === 'male'
                      ? 'border-[#1F1F1F] bg-[#1F1F1F] text-white shadow-xs'
                      : 'border-[#1F1F1F]/10 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Male
                </button>
              </div>
            </div>

            {/* Metrics inputs */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Math.max(30, Number(e.target.value)))}
                  className="w-full text-sm border border-[#1F1F1F]/20 rounded-none p-2.5 bg-white text-gray-850 text-center font-bold font-mono focus:outline-none focus:ring-1 focus:ring-[#3CB371]"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Math.max(100, Number(e.target.value)))}
                  className="w-full text-sm border border-[#1F1F1F]/20 rounded-none p-2.5 bg-white text-gray-850 text-center font-bold font-mono focus:outline-none focus:ring-1 focus:ring-[#3CB371]"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">Age (years)</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Math.max(10, Number(e.target.value)))}
                  className="w-full text-sm border border-[#1F1F1F]/20 rounded-none p-2.5 bg-white text-gray-850 text-center font-bold font-mono focus:outline-none focus:ring-1 focus:ring-[#3CB371]"
                  required
                />
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <label className="block text-[9px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">Activity Level</label>
              <select
                value={activity}
                onChange={(e) => setActivity(Number(e.target.value))}
                className="w-full text-xs font-medium border border-[#1F1F1F]/20 rounded-none p-2.5 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#3CB371] cursor-pointer"
              >
                <option value={1.2}>Sedentary (Desk Job, Zero Exercise)</option>
                <option value={1.375}>Lightly Active (1-3 Days Soft Gym/Walks)</option>
                <option value={1.55}>Moderately Active (3-5 Days Weight Training)</option>
                <option value={1.725}>Very Active (6-7 Days Heavy Training / Athlete)</option>
              </select>
            </div>

            {/* Desired Deficit Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[9px] font-bold text-stone-500 uppercase tracking-widest">Deficit Intensity</label>
                <span className="text-xs font-black text-[#FFA94D] font-mono">{deficitTarget} kcal / day</span>
              </div>
              <input
                type="range"
                min={200}
                max={800}
                step={50}
                value={deficitTarget}
                onChange={(e) => setDeficitTarget(Number(e.target.value))}
                className="w-full accent-[#3CB371] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-0.5">
                <span>Safe (200k)</span>
                <span>Optimized (500k)</span>
                <span>Aggressive (800k)</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1F1F1F] hover:brightness-125 text-white py-3.5 px-6 rounded-none font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-[#FFF8F0]" /> Calculate Fat Loss Blueprint
          </button>
        </form>

        {/* RESULTS GRID */}
        <div className="lg:col-span-7">
          {!results ? (
            <div className="h-full min-h-[300px] rounded-none border border-dashed border-[#1F1F1F]/20 flex flex-col items-center justify-center p-6 text-center bg-[#FFF8F0]/25">
              <Dumbbell className="w-10 h-10 text-stone-300 mb-3" />
              <h3 className="text-lg font-serif font-black italic text-gray-900">No Calculation Completed</h3>
              <p className="text-xs text-stone-500 max-w-xs mt-1 font-sans">
                Fill in your biometrics and choose your preferred deficit level on the left to see your personalized macro profile immediately.
              </p>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in text-left">
              <div className="bg-[#FFF8F0] border border-[#1F1F1F]/10 rounded-none p-5 text-center relative overflow-hidden">
                <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 bg-[#FFA94D]/10 rounded-full w-20 h-20 flex items-center justify-center pointer-events-none">
                  <Flame className="w-10 h-10 text-[#FFA94D] opacity-30" />
                </div>

                <span className="text-xs font-bold tracking-widest text-[#FFA94D] uppercase">Target Nutrition Goal</span>
                <div className="text-4xl font-black font-mono text-[#1F1F1F] tracking-tight mt-1.5 flex items-center justify-center gap-1.5">
                  {results.targetCalories} <span className="text-sm font-normal text-stone-500">kcal / day</span>
                </div>
                <p className="text-xs text-stone-600 mt-2 max-w-sm mx-auto leading-relaxed">
                  Consume this target quantity daily to lose roughly <strong>{(deficitTarget * 7) / 7700 === 0.45 ? '0.5' : Math.round(((deficitTarget * 7) / 7700) * 10) / 10} kg</strong> of pure body fat weekly while guarding muscle.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Protein */}
                <div className="bg-white border border-[#1F1F1F]/10 rounded-none p-4 flex items-start gap-3.5">
                  <div className="bg-emerald-50 rounded-none border border-emerald-100 p-2 text-[#3CB371] flex items-center justify-center shrink-0">
                    <Dumbbell className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Daily Protein Target</span>
                    <strong className="text-xl font-bold font-mono text-[#3CB371] block mt-0.5">
                      {results.proteinGrams}g
                    </strong>
                    <span className="text-[10px] text-stone-500 mt-1 block">
                      Protects muscle mass and stays off hunger signals.
                    </span>
                  </div>
                </div>

                {/* Hydration */}
                <div className="bg-white border border-[#1F1F1F]/10 rounded-none p-4 flex items-start gap-3.5">
                  <div className="bg-sky-50 rounded-none border border-sky-100 p-2 text-sky-600 flex items-center justify-center shrink-0">
                    <GlassWater className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Core Hydration Target</span>
                    <strong className="text-xl font-bold font-mono text-sky-700 block mt-0.5">
                      {results.waterLiters} L
                    </strong>
                    <span className="text-[10px] text-stone-500 mt-1 block">
                      Enhances cellular metabolic clearance speed.
                    </span>
                  </div>
                </div>
              </div>

              {/* TDEE info table */}
              <div className="bg-[#FFF8F0]/30 border border-[#1F1F1F]/10 rounded-none p-4 text-xs font-mono space-y-2 text-stone-700">
                <div className="flex justify-between border-b border-[#1F1F1F]/5 pb-1.5">
                  <span>Basal Metabolic Rate (BMR):</span>
                  <strong className="text-stone-900">{results.bmr} kcal</strong>
                </div>
                <div className="flex justify-between border-b border-[#1F1F1F]/5 pb-1.5">
                  <span>Total Daily Energy Expenditure (TDEE):</span>
                  <strong className="text-stone-900">{results.tdee} kcal</strong>
                </div>
                <div className="flex justify-between">
                  <span>Selected Deficit Burn:</span>
                  <strong className="text-[#FFA94D] font-bold">-{deficitTarget} kcal</strong>
                </div>
              </div>

              <div className="bg-[#FFF8F0] rounded-none p-4 border border-[#1F1F1F]/10 text-xs text-stone-700 leading-relaxed flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#3CB371] shrink-0" />
                <span>
                  <strong>Did you know?</strong> Pair this caloric plan with our <strong>Blended Cottage Cheese Alfredo Pasta</strong> (35g protein, 420 kcal) for a highly satisfying fat loss lunch. Find it under our Recipes page!
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PREMIUM DIGITAL PRODUCTS OFFERING */}
      <div className="mt-8 pt-8 border-t border-[#1F1F1F]/10 text-left">
        <div className="bg-[#1F1F1F] text-white p-6 md:p-8 rounded-none relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 bg-[#3CB371]/10 p-24 rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#FFA94D] bg-[#FFA94D]/10 px-2.5 py-1 rounded-none uppercase inline-block">
                Healthy Fix Digital Product Store
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold italic text-white flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-[#3CB371]" /> Personal Calorie Calc &amp; Sheets Templates
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed max-w-xl">
                Tired of tracking offline? Get our precision built templates and planner bundles. These fully automated spreadsheet files allow you to log meals, adjust deficit parameters, track body recomposition weights, and plan meals on autopilot.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3">
              {/* Product 1 */}
              <div className="bg-white/5 border border-white/10 p-3.5 flex items-center justify-between gap-4 rounded-none hover:bg-white/10 transition-colors">
                <div className="space-y-0.5 text-left">
                  <h4 className="text-xs font-black uppercase text-white tracking-widest leading-none">Calorie Calc Sheet Template</h4>
                  <p className="text-[10px] text-stone-400">Custom Google Sheets &amp; Notion tracker formatted with daily deficit logs.</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[10px] text-stone-500 line-through">$9.00</span>
                    <span className="text-xs font-black text-[#FFA94D] font-mono">$3.00</span>
                  </div>
                  <button
                    onClick={() => handleBuyProduct({ name: 'Personal Calorie & Deficit Tracker Sheet', price: '$3.00' })}
                    className="bg-[#3CB371] hover:bg-[#329e61] text-white text-[9px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-none cursor-pointer duration-200"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Product 2 */}
              <div className="bg-white/5 border border-white/10 p-3.5 flex items-center justify-between gap-4 rounded-none hover:bg-white/10 transition-colors">
                <div className="space-y-0.5 text-left">
                  <h4 className="text-xs font-black uppercase text-white tracking-widest leading-none">Free 7-Day Plan + Calc Sheet</h4>
                  <p className="text-[10px] text-stone-400 font-sans">Full printable calorie deficit manual combined with interactive sheets.</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[10px] text-stone-500 line-through">$19.99</span>
                    <span className="text-xs font-black text-[#FFA94D] font-mono">$4.99</span>
                  </div>
                  <button
                    onClick={() => handleBuyProduct({ name: '7-Day Free Plan + Calorie Calc Sheet Bundle', price: '$4.99' })}
                    className="bg-[#FFA94D] hover:bg-[#ff9e30] text-[#1F1F1F] text-[9px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-none cursor-pointer duration-200"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {purchasedProduct && (
          <div className="bg-emerald-50 text-emerald-800 text-xs font-semibold p-4 border border-emerald-200 mt-4 text-center animate-fade-in">
            🎉 <strong>Payment Successful!</strong> Your order: <em>{purchasedProduct}</em> is approved. Your instant spreadsheet downloading and PDF activation links are transmitted directly to your target email. Enjoy the metrics!
          </div>
        )}
      </div>

      {/* CHECKOUT SIMULATION MODAL */}
      {showCheckoutModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <form
            onSubmit={handleExecuteCheckout}
            className="bg-white rounded-none max-w-sm w-full border border-[#1F1F1F]/15 overflow-hidden shadow-2xl p-6 relative animate-scale-up"
          >
            <div className="text-center mb-6">
              <span className="text-[10px] font-mono font-bold bg-[#FFA94D]/15 px-2.5 py-1 rounded-none text-[#1F1F1F] uppercase tracking-widest border border-[#1F1F1F]/10">
                Mock Checkout Secure
              </span>
              <h4 className="text-lg font-serif font-bold italic text-gray-900 mt-3">
                Order: {selectedProduct.name}
              </h4>
              <p className="text-xs text-stone-500 mt-1">
                Enter any sample credentials below to test the shopping bag conversion funnel.
              </p>
            </div>

            <div className="space-y-3 mb-6 text-xs text-left">
              <div>
                <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue="test-customer@healthyfix.com"
                  className="w-full border border-[#1F1F1F]/20 rounded-none p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#3CB371]"
                  required
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Card Number (Mock)</label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="4111 2222 3333 4444"
                    className="w-full border border-[#1F1F1F]/20 rounded-none p-2.5 pl-9 text-xs focus:outline-none focus:ring-1 focus:ring-[#3CB371]"
                    required
                  />
                  <CreditCard className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Expiry Date</label>
                  <input
                    type="text"
                    defaultValue="12 / 28"
                    className="w-full border border-[#1F1F1F]/20 rounded-none p-2.5 text-xs text-center focus:outline-none focus:ring-1 focus:ring-[#3CB371]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">CVC Code</label>
                  <input
                    type="text"
                    defaultValue="321"
                    className="w-full border border-[#1F1F1F]/20 rounded-none p-2.5 text-xs text-center focus:outline-none focus:ring-1 focus:ring-[#3CB371]"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowCheckoutModal(false)}
                className="flex-1 border border-[#1F1F1F]/20 hover:bg-stone-50 py-3 rounded-none font-bold text-xs text-stone-600 cursor-pointer uppercase tracking-widest"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-[#1F1F1F] hover:brightness-125 py-3 rounded-none font-bold text-xs text-white flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-widest"
              >
                <Check className="w-3.5 h-3.5 text-[#FFA94D]" /> Verify {selectedProduct.price}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
