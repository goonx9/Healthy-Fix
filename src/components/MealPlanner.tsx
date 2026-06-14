import React, { useState } from 'react';
import { Calendar, Apple, CheckSquare, Sparkles, CreditCard, Check, ShoppingBag } from 'lucide-react';

interface MealPlanDay {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  snack: string;
}

export const MealPlanner: React.FC = () => {
  const [calorieGoal, setCalorieGoal] = useState<1500 | 1800 | 2200>(1500);
  const [dietPref, setDietPref] = useState<'high-protein' | 'low-carb' | 'balanced' | 'plant-based'>('high-protein');
  const [shoppingChecked, setShoppingChecked] = useState<{ [key: string]: boolean }>({});
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);
  const [purchasedProduct, setPurchasedProduct] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; price: string } | null>(null);

  // Generate dynamic meal plan data based on selections
  const generatePlan = (): MealPlanDay[] => {
    switch (dietPref) {
      case 'high-protein':
        return [
          { day: 'Mon', breakfast: 'High-Protein Egg White & Spinach Scramble with Whole Wheat Toast', lunch: 'Lemon Garlic Grilled Chicken Breast over seasoned Quinoa and Broccoli florets', dinner: 'Blended Cottage Cheese Alfredo Pasta with sliced grilled chicken', snack: '1 cup Greek Yogurt with handful of raspberries & honey drizzle' },
          { day: 'Tue', breakfast: 'Protein Oats cooked in Almond Milk with Vanilla Whey, chia seeds & berries', lunch: 'Slow-Cooker Shredded Turkey Taco Salad Bowls with black beans, avocado, cherry tomato', dinner: 'Pan-Seared Salmon fillet with roasted Asparagus spears and garlic mashed cauliflower', snack: 'Handful of raw almond kernels & standard boiled egg' },
          { day: 'Wed', breakfast: 'Blended Cottage Cheese Pancake stack topped with fresh organic strawberry slices', lunch: 'Blended Cottage Cheese Alfredo Pasta (leftover serving) with steamed broccoli', dinner: 'Crispy Air-Fried Turkey Taco Lettuce Boats with spiced chili red onion and cheddar', snack: 'Chocolate Molten Protein Mug Cake (Ready in 1 Min!)' },
          { day: 'Thu', breakfast: 'High-Protein Egg White & Spinach Scramble with sliced avocado', lunch: 'Garlic Herb Chicken & Rainbow Veggie Meal Prep container (Serving 1)', dinner: 'Lean Turkey Meatballs over High-Fiber whole-wheat pasta with marinara', snack: '1 scoop Whey Protein shake mix with almond milk' },
          { day: 'Fri', breakfast: 'Protein Overnight Oats Jar (Chocolate Cookie Dough flavor)', lunch: 'Garlic Herb Chicken & Rainbow Veggie Meal Prep container (Serving 2)', dinner: 'Lemon Garlic Shrimp & Asparagus Skillet with side of wild rice', snack: 'Two Peanut Butter Chocolate Oatmeal Protein Balls' },
          { day: 'Sat', breakfast: 'Veggie Folded Omelet with three eggs, sliced tomatoes, low-fat feta cheese', lunch: 'Cold Lemon Herb Shrimp and Quinoa Salad jar', dinner: 'Seared Lean Sirloin Steak with baked sweet potatoes and seasoned green beans', snack: 'Celery stick boat filled with natural peanut butter' },
          { day: 'Sun', breakfast: 'Protein Pancakes cooked with mashed bananas and vanilla essence', lunch: 'Leftover sirloin steak sliced over rich organic arugula greens and honey mustard dressing', dinner: 'Slow Cooker Lean Beef Chili loaded with kidney beans and spinach', snack: 'Two Peanut Butter Chocolate Oatmeal Protein Balls' }
        ];
      case 'low-carb':
        return [
          { day: 'Mon', breakfast: 'Three Eggs scrambled in butter with spinach, feta & cherry tomatoes', lunch: 'Crispy Ground Turkey Taco Lettuce Boats loaded with red onion & cheddar', dinner: 'Seared Salmon fillet with lemon butter and charred asparagus spears', snack: 'Celery sticks filled with warm organic almond butter' },
          { day: 'Tue', breakfast: 'Hard-boiled eggs (2) with sliced avocado, seasoned with chili flakes', lunch: 'Garlic Herb Cubed Chicken and Broccoli florets pan-seared in olive oil', dinner: 'Baked White Cod over bed of buttered cauliflower mash & side of spinach', snack: 'Handful of unsalted macadamia nuts' },
          { day: 'Wed', breakfast: 'Keto Bacon & Egg Breakfast Muffins (2)', lunch: 'Tuna Salad Salad Bowls with Greek yogurt mayo, diced celery and walnuts', dinner: 'Air-Fried Pork Chop with sautéed garlic green beans', snack: '1 slice of cheddar cheese folded with organic turkey dry deli slices' },
          { day: 'Thu', breakfast: 'Three Eggs folded with cream cheese, spinach and organic mushrooms', lunch: 'Seasoned shredded turkey salad boats with romaine lettuce shells', dinner: 'Baked lemon herb Chicken thighs with roasted zucchini medallions', snack: '1 cup of unsweetened almond milk blended with spinach and protein powder' },
          { day: 'Fri', breakfast: 'Chia seed pudding made with heavy cream, water, vanilla and clean berries', lunch: 'Leftover baked healthy chicken thighs with zucchini', dinner: 'Beef Burger patties cooked in olive oil wrapped in butter lettuce with avocado', snack: 'Handful of cracked black pepper pumpkin seeds' },
          { day: 'Sat', breakfast: 'Fried Eggs (2) with crispy bacon strip & sautéed mushrooms', lunch: 'Aesthetic Greek salad containing cucumbers, tomatoes, feta, olives, red oil', dinner: 'Lemon Garlic Shrimp Skillet tossed in olive oil over zucchini noodles', snack: 'Deviled eggs made with Greek yogurt mayo (2)' },
          { day: 'Sun', breakfast: 'No-carb egg white waffles coated in sliced fresh raspberries', lunch: 'Leftover shrimp skillet over zucchini noodles', dinner: 'Loaded Chicken Bacon Ranch salad with shredded greens and clean bacon crumbles', snack: 'Handful of salted sunflower seeds' }
        ];
      case 'balanced':
        return [
          { day: 'Mon', breakfast: 'Spelt bread slice toasted topped with avocado rosette, dry egg, chili', lunch: 'Brown rice bowl containing grilled shredded chicken and mixed roasting veggies', dinner: 'High fiber pasta tossed in light bolognese beef meat sauce & mushrooms', snack: 'Green apple slices coated with small organic peanut butter scoop' },
          { day: 'Tue', breakfast: 'Traditional oats cooked with banana coins, walnut pieces & organic honey', lunch: 'Whole-wheat tortilla wrap containing turkey deli meat, greens, avocado, red onion', dinner: 'Teriyaki glazed Salmon fillet with stir-fried snap peas & jasmine rice', snack: 'One orange with handful of dry cashews' },
          { day: 'Wed', breakfast: 'Yogurt parfaits with rolled oats, blueberries, scoop maple and seed seeds', lunch: 'High-protein lentil stew served with artisanal sourdough slice', dinner: 'Roasted turkey breast medallions over roasted sweet potatoes and carrots', snack: 'Vibrant green smoothie with spinach, half banana, whey powder' },
          { day: 'Thu', breakfast: 'Fruity fiber smoothie with spinach, organic strawberries, whey, chia', lunch: 'Quinoa Greek bowl with cucumber, olives, red peppers, tofu cubes, vinaigrette', dinner: 'Grilled flank steak over red potatoes and roasted garlic butter green beans', snack: 'High fiber oats cookie' },
          { day: 'Fri', breakfast: 'Scrambled eggs (2) with whole wheat english muffin and raspberry preserve', lunch: 'Leftover flank steak over brown warm rice and peppers', dinner: 'Shrimp fried rice executed with brown grains, organic egg, scallions, drops oil', snack: 'Two healthy oat protein energy balls' },
          { day: 'Sat', breakfast: 'French toast made with high fiber bread and egg whites topped with fruit', lunch: 'Mediterranean chickpea bean salad tossed with parsley & lemon oil', dinner: 'Chicken fajita sheet pan bowls with warm corn tortillas and salsa', snack: 'One pear slices with cheese cubes' },
          { day: 'Sun', breakfast: 'Mixed fruit waffle plate with high fiber organic batter and maple maple', lunch: 'Hearty barley vegetable broth soup with roasted chicken shreds', dinner: 'Baked lean pork tenderloin with side of roasted butternut squash slices', snack: 'Two sweet-craving cocoa protein balls' }
        ];
      case 'plant-based':
        return [
          { day: 'Mon', breakfast: 'Organic tofu scramble cooked with spinach, nutritional yeast & turmeric toast', lunch: 'Mediterranean chickpea salad bowl with cucumbers, red onion, hummus', dinner: 'High-protein Lentil and Kidney bean thick red chili over brown jasmine rice', snack: 'Chia seed coconut pudding topped with sliced fresh mango coins' },
          { day: 'Tue', breakfast: 'Traditional steel-cut oats bowl cooked with flaxseeds and organic blueberries', lunch: 'Earthy baked Tempeh cubes roasted with sweet potatoes and green beans', dinner: 'Crispy pan-fried Tofu sticks with garlic-ginger glaze & brown jasmin grains', snack: 'Edamame pods steamed and salted' },
          { day: 'Wed', breakfast: 'Earthy green smoothie containing spinach, half avocado, pea vegetable protein', lunch: 'Cold Med chickpea salad bowl wrapped inside high fiber whole wheat tortilla', dinner: 'Black bean burger patty served over large green arugula salad with avocado', snack: 'Crispy baked spiced organic chickpeas' },
          { day: 'Thu', breakfast: 'Toasted spelt bread with mashed avocado, cherry tomatoes and black salt', lunch: 'Leftover black bean chili over side of roasted sweet potato cubes', dinner: 'Roasted cauliflower steak over garlic lentil mash and tahini glaze', snack: 'Handful of raw walnuts & dark dried raisins' },
          { day: 'Fri', breakfast: 'Banana oats bowl made with dry berries, almond kernels and maple', lunch: 'High protein quinoa tabouleh mixed with cucumber threads & mint salad', dinner: 'Rich yellow curry made with organic peas, potatoes, carrots, coconut milk', snack: 'Raw carrot sticks with red pepper hummus' },
          { day: 'Sat', breakfast: 'Soy flour protein waffles topped with sliced dynamic organic bananas', lunch: 'Leftover yellow curry over brown rice bowl', dinner: 'Tofu stir fry with baby bok choy, mushrooms, sesame oil & brown noodles', snack: 'One organic apple slices' },
          { day: 'Sun', breakfast: 'Earthy berry oatmeal bowl with pecans, sunflower seeds and syrup', lunch: 'Tempeh club sandwich styled with vegan mayo, tomatoes, crisp romaine', dinner: 'Slow cooker lentil stew containing cubed butternut pumpkin and sage oil', snack: 'Aesthetic raw dark chocolate bites (70% cocoa)' }
        ];
    }
  };

  const getGroceryList = () => {
    switch (dietPref) {
      case 'high-protein':
        return [
          'Lean chicken breasts (1.2 kg)',
          'Low-fat Cottage Cheese (3 tubs)',
          'Parmesan Cheese (block)',
          'High-fiber whole wheat pasta',
          'Sweet Potatoes (4 large)',
          'Fresh Broccoli & Asparagus bun',
          'Romaine Lettuce stalks (2)',
          'Lean Ground Turkey (93% lean, 1 kg)',
          'Avocados (5 whole)',
          'Greek Yogurt (unflavored, 2% fat)',
          'Vanilla Whey Protein powder',
          'Traditional Rolled Oats (1 bag)',
          'Shredded cheddar cheese',
          'Fresh Raspberries & Strawberries',
          'Chia Seeds & Peanut butter'
        ];
      case 'low-carb':
        return [
          'Fresh organic Eggs (3 dozen)',
          'Lean chicken breasts / thighs (1.5 kg)',
          'Fresh Salmon fillet (600g)',
          'Lean ground turkey (1 kg)',
          'Organic Bacon (1 thick pack)',
          'Romaine lettuce / Butter lettuce',
          'Fresh Spinach blocks (3)',
          'Cucumbers & Cherry tomatoes',
          'Cauliflower heads (2 for mash & rice)',
          'Zucchini (4 for zoodles)',
          'Standard Cheddar/Feta cheese slabs',
          'Avocados (8 whole)',
          'Almonds/Macadamias/Sunflower seeds'
        ];
      default:
        return [
          'Organic Tofu blocks (3)',
          'Tempeh slabs (2 packs)',
          'Canned chickpeas & Kidney beans',
          'Organic green spinach & arugula',
          'Brown Jasmine Rice (1 bag)',
          'Dry Lentils (green or red)',
          'Aesthetic sweet potatoes (1 bag)',
          'Butternut squash / zucchini',
          'Avocados (6 whole)',
          'Natural Peanut/Almond butter',
          'Flaxseeds & Chia seeds',
          'Organic Oats & Plant protein'
        ];
    }
  };

  const handleToggleGrocery = (item: string) => {
    setShoppingChecked(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleOpenCheckout = (product: { name: string; price: string }) => {
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

  const activePlan = generatePlan();
  const activeGroceries = getGroceryList();

  return (
    <div className="space-y-8">
      {/* MEAL PLAN GENERATOR BOX */}
      <div className="bg-white rounded-none border border-[#1F1F1F]/10 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#1F1F1F]/10">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#3CB371] uppercase flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#3CB371]" /> 7-Day meal plan builder
            </span>
            <h2 className="text-3xl font-serif font-bold italic text-[#1F1F1F] mt-1">Personalized Meal Scheduler</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Calories filter */}
            <div className="flex bg-[#FFF8F0] border border-[#1F1F1F]/10 p-1 rounded-none text-xs font-bold">
              {[1500, 1800, 2200].map(cal => (
                <button
                  key={cal}
                  onClick={() => setCalorieGoal(cal as any)}
                  className={`px-3 py-1.5 rounded-none transition-all cursor-pointer ${
                    calorieGoal === cal ? 'bg-[#1F1F1F] text-white shadow-xs' : 'text-[#1F1F1F]/60 hover:text-[#1F1F1F]'
                  }`}
                >
                  {cal} kcal
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* DIET PREFERENCE SELECTOR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {[
            { id: 'high-protein', name: 'High Protein 🔥', desc: 'Accelerates muscle weight, max volume satiety' },
            { id: 'low-carb', name: 'Low Carb / Keto 🥑', desc: 'Accelerates biological fat adaptation' },
            { id: 'balanced', name: 'Balanced Living 🌿', desc: 'Sustainable, whole-food nutrition for health' },
            { id: 'plant-based', name: '100% Plant-Based 🌱', desc: 'Nourishing fiber-dense vegan dishes' }
          ].map(diet => (
            <button
              key={diet.id}
              onClick={() => setDietPref(diet.id as any)}
              className={`p-4 rounded-none border text-left transition-all flex flex-col cursor-pointer ${
                dietPref === diet.id
                  ? 'border-[#1F1F1F] bg-[#FFF8F0] text-[#1F1F1F] ring-1 ring-[#1F1F1F] font-bold'
                  : 'border-[#1F1F1F]/10 text-[#1F1F1F]/60 hover:bg-stone-50'
              }`}
            >
              <span className="text-xs font-black tracking-tight uppercase leading-none">{diet.name}</span>
              <span className="text-[10px] text-stone-500 leading-tight mt-1.5">{diet.desc}</span>
            </button>
          ))}
        </div>

        {/* 7-DAY SCHEDULE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {activePlan.map((dayPlan) => (
            <div
              key={dayPlan.day}
              className="bg-[#FFF8F0]/30 rounded-none border border-[#1F1F1F]/10 p-4 hover:bg-white hover:border-[#3CB371]/60 hover:shadow-lg transition-all duration-300 flex flex-col group text-left"
            >
              <div className="border-b border-[#1F1F1F]/10 pb-2 mb-3 flex items-center justify-between">
                <span className="text-sm font-bold text-[#1F1F1F] tracking-wider uppercase font-mono group-hover:text-[#3CB371]">
                  {dayPlan.day}
                </span>
                <span className="text-[9px] font-bold bg-white border border-[#1F1F1F]/10 px-2 py-0.5 rounded-none text-[#3CB371] font-mono">
                  {calorieGoal / 3 === 500 ? '500 kcal' : Math.round(calorieGoal / 3)} / meal
                </span>
              </div>

              <div className="space-y-3.5 flex-1 flex flex-col justify-between text-xs">
                <div>
                  <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block mb-0.5">Breakfast</span>
                  <p className="text-[#1F1F1F] leading-snug font-sans font-medium">{dayPlan.breakfast}</p>
                </div>

                <div>
                  <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block mb-0.5">Lunch</span>
                  <p className="text-[#1F1F1F] leading-snug font-sans font-medium">{dayPlan.lunch}</p>
                </div>

                <div>
                  <span className="text-[9px] font-bold text-[#FFA94D] uppercase tracking-wider block mb-0.5">Dinner</span>
                  <p className="text-[#1F1F1F] leading-snug font-sans font-black">{dayPlan.dinner}</p>
                </div>

                <div className="pt-2 border-t border-dashed border-[#1F1F1F]/10 mt-2">
                  <span className="text-[9px] font-bold text-[#3CB371] uppercase tracking-wider block mb-0.5">Healthy Snack</span>
                  <p className="text-stone-500 text-xs leading-snug italic font-serif font-medium">{dayPlan.snack}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* OPT-IN FREE MAGNET */}
        <div className="bg-[#FFF8F0] border border-[#1F1F1F]/10 rounded-none p-6 md:p-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute left-0 top-0 bg-[#FFA94D]/5 p-20 rounded-full shrink-0 -translate-x-12 -translate-y-12 pointer-events-none"></div>

          <div className="space-y-2 max-w-xl z-10 text-left">
            <span className="bg-[#FFA94D]/20 text-[#1F1F1F] font-mono text-[9px] font-extrabold px-2.5 py-1 rounded-none uppercase tracking-widest inline-block border border-[#FFF8F0]/20">
              Free Lead Magnet
            </span>
            <h3 className="text-2xl md:text-3xl font-serif font-bold italic tracking-tight text-[#1F1F1F]">
              Download the Complete &ldquo;7-Day High-Protein Prep Blueprint&rdquo; PDF 
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Unlock our professional grocery shopping lists, swap matrix guidelines, macro summaries, and Pinterest pin growth templates completely free! Over 45,000+ fitness fans have already downloaded.
            </p>
          </div>

          <div className="w-full md:w-auto z-10">
            <a
              href="#newsletter-signup"
              className="w-full md:w-auto text-center inline-block bg-[#1F1F1F] hover:brightness-125 text-white font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-none transition-all active:scale-95 cursor-pointer"
            >
              Get My Free PDF Guide
            </a>
          </div>
        </div>
      </div>

      {/* GROCERY BUILDER & DIGITAL STORE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* GROCERY LIST */}
        <div className="lg:col-span-8 bg-white rounded-none border border-[#1F1F1F]/10 p-6 md:p-8">
          <h3 className="text-xl font-serif font-bold italic tracking-tight text-gray-900 mb-4 flex items-center justify-between border-b border-[#1F1F1F]/10 pb-4 text-left">
            <span className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-[#3CB371]" /> Interactive Shopping List
            </span>
            <span className="text-[11px] font-mono text-gray-400 uppercase">
              {dietPref.replace('-', ' ')} Ingredients
            </span>
          </h3>
          <p className="text-sm text-stone-500 mb-6 font-sans text-left">
            We extracted the total ingredients needed to execute your generated 7-day meal plan above. Check them off as you shop or stock your pantry!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeGroceries.map((item) => (
              <div
                key={item}
                onClick={() => handleToggleGrocery(item)}
                className={`flex items-center justify-between gap-3 p-4 rounded-none border border-[#1F1F1F]/10 transition-all cursor-pointer select-none text-left ${
                  shoppingChecked[item]
                    ? 'bg-stone-50 border-stone-200 line-through text-[#1F1F1F]/30'
                    : 'bg-[#FFF8F0]/30 hover:bg-white hover:border-[#3CB371]/40 text-stone-800'
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-wide font-sans">{item}</span>
                <div
                  className={`w-5 h-5 rounded-none border flex items-center justify-center shrink-0 transition-all ${
                    shoppingChecked[item] ? 'border-[#3CB371] bg-[#3CB371] text-white' : 'border-[#1F1F1F]/20 bg-white'
                  }`}
                >
                  {shoppingChecked[item] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DIGITAL PRODUCTS CONVERSION MODULE */}
        <div className="lg:col-span-4 bg-white rounded-none border border-[#1F1F1F]/10 p-6 flex flex-col justify-between text-left">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#FFA94D] uppercase block mb-1">
              Healthy Fix Store
            </span>
            <h3 className="text-2xl font-serif font-bold italic text-gray-900 mb-2 flex items-center gap-1.5">
              <ShoppingBag className="w-5 h-5 text-gray-905" /> Digital Blueprints
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed mb-6 font-sans">
              Skip the complexity. Download instant, beautifully formatted premium print files to accelerate your fitness success story.
            </p>

            <div className="space-y-4">
              {[
                { name: 'Personal Calorie & Deficit Tracker Sheet', price: '$3.00', originalPrice: '$9.00', desc: 'Google Sheets & Notion tracker configured with custom calorie deficit formulas.', tag: 'SPECIAL PROMO' },
                { name: '7-Day Free Plan + Calorie Calc Sheet Bundle', price: '$4.99', originalPrice: '$19.99', desc: 'Step-by-step deficited meal plan PDF combined with the automated calorie tracking template.', tag: 'BEST VALUE' },
                { name: 'Ultimate 30-Day Fat Loss Recomposition Guide', price: '$9.00', originalPrice: '$24.99', desc: 'Comprehensive guide covering meal preps, macro splits, and fat loss techniques.', tag: 'LIMITED DEAL' }
              ].map((prod) => (
                <div
                  key={prod.name}
                  className="bg-[#FFF8F0] border border-[#1F1F1F]/10 rounded-none p-4 relative group hover:bg-[#FFF8F0]/60 transition-all"
                >
                  <span className="absolute right-3 top-3 text-[8px] font-mono font-bold bg-[#1F1F1F] text-white px-2 py-0.5 rounded-none">
                    {prod.tag}
                  </span>
                  <h4 className="text-xs font-black text-gray-950 pr-12 tracking-tight uppercase leading-none font-sans">{prod.name}</h4>
                  <p className="text-[11px] text-stone-500 mt-1.5 font-sans leading-relaxed">{prod.desc}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#1F1F1F]/10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[10px] text-stone-400 line-through font-mono">{prod.originalPrice}</span>
                      <span className="text-xs font-black text-[#1F1F1F] font-mono">{prod.price}</span>
                    </div>
                    <button
                      onClick={() => handleOpenCheckout({ name: prod.name, price: prod.price })}
                      className="bg-[#1F1F1F] hover:brightness-125 text-white font-bold text-[9px] tracking-widest uppercase px-3.5 py-1.5 rounded-none cursor-pointer transition-all"
                    >
                      Instant Purchase
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core success tracking */}
          {purchasedProduct && (
            <div className="bg-emerald-50 text-emerald-800 rounded-none p-4 text-xs font-medium border border-emerald-200 mt-4 leading-normal animate-fade-in">
              🎉 <strong>Payment Successful!</strong> You purchased: <em>{purchasedProduct}</em>. The high-resolution PDF print files has been transmitted directly to your checkout email. Review your spam folders in 2 mins if not landed!
            </div>
          )}
        </div>
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
              <h4 className="text-xl font-serif font-bold italic text-gray-900 mt-3">
                Order: {selectedProduct.name}
              </h4>
              <p className="text-xs text-stone-500 mt-1">
                Enter any sample credentials below to test the shopping car conversion funnel.
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
