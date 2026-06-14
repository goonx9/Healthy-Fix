import React, { useState } from 'react';
import { affiliateProducts } from '../data/affiliateProducts';
import { Mail, Pin, Heart, Scale, Flame, ArrowUpRight, ShoppingBag, Sparkles } from 'lucide-react';

interface BlogSidebarProps {
  onNavigateToTab: (tab: string, subtab?: 'recipes' | 'articles' | 'calculator') => void;
  onNavigatePost: (postId: string) => void;
  onNavigateRecipe: (recipeId: string) => void;
  optInEmail: string;
  setOptInEmail: (email: string) => void;
  isOptedIn: boolean;
  handleOptIn: (e: React.FormEvent) => void;
}

export const BlogSidebar: React.FC<BlogSidebarProps> = ({
  onNavigateToTab,
  onNavigatePost,
  onNavigateRecipe,
  optInEmail,
  setOptInEmail,
  isOptedIn,
  handleOptIn
}) => {
  // Mini Calculator State
  const [weight, setWeight] = useState<string>('');
  const [goal, setGoal] = useState<'loss' | 'recomp'>('loss');
  const [resultCalories, setResultCalories] = useState<number | null>(null);
  const [resultProtein, setResultProtein] = useState<number | null>(null);

  const calculateMiniDeficit = (e: React.FormEvent) => {
    e.preventDefault();
    const wNum = parseFloat(weight);
    if (!wNum || isNaN(wNum)) return;

    // Standard baseline estimation: multiplier weight (lbs) x 14 for maintenance
    // Convert kg/lbs if needed - assume lbs for simplicity
    const maintaining = wNum * 14;
    const targets = goal === 'loss' ? maintaining - 500 : maintaining - 200;
    
    // Protein targets: 1g per lb of body weight
    const proteinTarget = Math.round(wNum * 0.9);

    setResultCalories(Math.round(targets));
    setResultProtein(proteinTarget);
  };

  // Select two affiliate spotlight items
  const gearSpotlight = affiliateProducts.slice(0, 2);

  return (
    <div className="space-y-8 animate-fade-in text-left">
      
      {/* 1. MEET THE COACH BIOMETRIC PROFILE CARD */}
      <div className="bg-white border border-[#1F1F1F]/10 rounded-none p-5 text-center relative overflow-hidden group">
        <div className="absolute right-0 top-0 w-12 h-12 bg-[#3CB371]/10 rounded-bl-full pointer-events-none"></div>
        
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop"
          alt="Elena Vasquez, Food Blogger & Coach"
          className="w-24 h-24 rounded-full mx-auto border-2 border-[#3CB371] object-cover hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
        
        <div className="mt-3">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#3CB371] font-black">Founder & Chef Coach</span>
          <h4 className="text-lg font-serif font-bold italic text-gray-900 mt-0.5 leading-tight">Elena Vasquez</h4>
          <p className="text-xs text-stone-500 leading-relaxed font-sans mt-2.5">
            "I reject toxic restrictions and standard cardboards meal preps. I formulate high-volume, clean protein recipes to rebuild your metabolism safely."
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 pt-4 mt-4 border-t border-dashed border-[#1F1F1F]/10">
          <a
            href="https://www.pinterest.com/healthyfitfix"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 bg-[#E60023] hover:bg-[#b8001c] text-white px-3 py-1.5 rounded-none text-[9px] font-bold uppercase tracking-wider transition-all"
          >
            <div className="w-3.5 h-3.5 rounded-full bg-white text-[#E60023] flex items-center justify-center font-bold text-[10px] font-serif">P</div>
            Save Pins
          </a>
          
          <button
            onClick={() => onNavigateToTab('contact')}
            className="flex items-center gap-1.5 border border-[#1F1F1F] hover:bg-[#1F1F1F] hover:text-[#FFF8F0] text-[#1F1F1F] px-3 py-1.5 rounded-none text-[9px] font-bold uppercase tracking-wider transition-all bg-transparent cursor-pointer"
          >
            Coach Me
          </button>
        </div>
      </div>

      {/* 2. SIDEBAR NEWSLETTER ACTION BOX */}
      <div className="bg-[#FFF8F0] border border-[#1F1F1F]/10 rounded-none p-5 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 bg-[#3CB371]/5 p-8 rounded-full pointer-events-none"></div>
        <span className="text-[9px] font-mono tracking-widest text-[#3CB371] font-extrabold uppercase block mb-1">
          ✦ Live Upgrades ✦
        </span>
        <h4 className="text-base font-serif font-bold italic tracking-tight text-[#1F1F1F]">
          Healthy Fix Daily Feed
        </h4>
        <p className="text-xs text-stone-500 font-sans mt-1 leading-relaxed">
          Daily high-protein recipes & calorie deficit worksheets. Join 14,000+ readers free!
        </p>

        {!isOptedIn ? (
          <form onSubmit={handleOptIn} className="mt-3 space-y-2">
            <input
              type="email"
              placeholder="Your email address..."
              value={optInEmail}
              onChange={(e) => setOptInEmail(e.target.value)}
              className="w-full bg-white border border-[#1F1F1F]/15 rounded-none px-3 py-2 text-xs placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#3CB371]"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#1F1F1F] hover:bg-[#3CB371] text-white text-[10px] font-bold uppercase tracking-widest py-2 px-4 rounded-none transition-all active:scale-95 text-center cursor-pointer block"
            >
              Sign Up Free
            </button>
          </form>
        ) : (
          <div className="bg-emerald-50 text-emerald-800 border border-dashed border-emerald-200 rounded-none p-3 text-[11px] font-semibold mt-3 animate-fade-in">
            ✓ Successfully subscribed! Welcome to Elena's circle.
          </div>
        )}
      </div>

      {/* 3. DYNAMIC MINI DEFICIT ESTIMATOR */}
      <div className="bg-white border border-[#1F1F1F]/10 rounded-none p-5">
        <h4 className="text-sm font-mono font-bold tracking-wider text-[#1F1F1F] uppercase mb-1.5 flex items-center gap-1">
          <Scale className="w-4 h-4 text-[#3CB371]" /> Deficit Calculator
        </h4>
        <p className="text-[11px] text-stone-400 font-sans leading-normal mb-3">
          Get an instant estimated calorie deficit target based on biological weights.
        </p>

        <form onSubmit={calculateMiniDeficit} className="space-y-2.5">
          <div>
            <label className="block text-[9px] font-mono font-bold text-stone-500 uppercase mb-1">
              Current Weight (lbs)
            </label>
            <input
              type="number"
              placeholder="E.g., 165"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-stone-50 border border-[#1F1F1F]/15 rounded-none px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#3CB371] focus:bg-white transition-all font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-[9px] font-mono font-bold text-stone-500 uppercase mb-1">
              Select Deficit Goal
            </label>
            <div className="grid grid-cols-2 gap-1.5 font-sans">
              <button
                type="button"
                onClick={() => setGoal('loss')}
                className={`py-1 px-2 text-[10px] font-semibold border rounded-none tracking-wider uppercase transition-colors text-center cursor-pointer ${
                  goal === 'loss'
                    ? 'bg-[#1F1F1F] text-white border-[#1F1F1F] font-bold'
                    : 'bg-stone-50 text-stone-600 border-[#1F1F1F]/10 hover:bg-stone-100'
                }`}
              >
                Fat Loss (-500)
              </button>
              <button
                type="button"
                onClick={() => setGoal('recomp')}
                className={`py-1 px-2 text-[10px] font-semibold border rounded-none tracking-wider uppercase transition-colors text-center cursor-pointer ${
                  goal === 'recomp'
                    ? 'bg-[#1F1F1F] text-white border-[#1F1F1F] font-bold'
                    : 'bg-stone-50 text-stone-600 border-[#1F1F1F]/10 hover:bg-stone-100'
                }`}
              >
                Recomp (-200)
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1F1F1F] hover:bg-[#3CB371] text-white text-[9px] font-bold uppercase tracking-widest py-2 rounded-none transition-all cursor-pointer block"
          >
            Calculate targets
          </button>
        </form>

        {resultCalories !== null && resultProtein !== null && (
          <div className="mt-4 bg-[#FFF8F0] border border-[#FFA94D]/20 rounded-none p-3 animate-fade-in space-y-2 text-xs">
            <span className="text-[10px] font-mono text-[#FFA94D] font-extrabold uppercase tracking-wide block">
              ★ Estimated Macro Plan:
            </span>
            <div className="flex justify-between items-center text-[11px] font-mono border-b border-stone-200/50 pb-1 font-semibold leading-normal">
              <span className="text-stone-500 uppercase font-black tracking-wide text-[9px]">Calorie Budget:</span>
              <strong className="text-gray-900">{resultCalories} kcal/day</strong>
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono pt-0.5 font-semibold leading-normal">
              <span className="text-stone-500 uppercase font-black tracking-wide text-[9px]">Daily Protein:</span>
              <strong className="text-[#3CB371]">{resultProtein}g /day</strong>
            </div>
            <span onClick={() => onNavigateToTab('blog', 'calculator')} className="text-[9px] text-[#3CB371] hover:underline block pt-1 cursor-pointer font-bold uppercase tracking-wider z-10">
              Run Advanced Calculations →
            </span>
          </div>
        )}
      </div>

      {/* 4. PIN MONETIZATION GEAR SPOTLIGHT */}
      <div className="space-y-3.5">
        <h4 className="text-sm font-mono font-bold tracking-wider text-[#1F1F1F] uppercase border-b border-[#1F1F1F]/10 pb-2 flex items-center gap-1.5">
          <ShoppingBag className="w-4 h-4 text-[#FFA94D]" /> Kitchen Essentials
        </h4>

        <div className="space-y-4">
          {gearSpotlight.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-[#1F1F1F]/10 p-3 flex gap-3 rounded-none hover:border-[#3CB371] transition-colors group"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover border border-stone-200 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col justify-between items-start space-y-1">
                <div className="space-y-0.5">
                  <h5 className="font-serif font-bold italic text-xs text-gray-900 line-clamp-1 leading-snug group-hover:text-[#3CB371] transition-all">
                    {product.name}
                  </h5>
                  <p className="text-[10px] text-stone-400 line-clamp-1 leading-relaxed">
                    {product.description}
                  </p>
                </div>
                <div className="flex items-center justify-between w-full pt-1">
                  <span className="text-xs font-mono font-bold text-gray-800">{product.price}</span>
                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[9px] font-mono font-black text-[#FFA94D] hover:underline flex items-center tracking-normal uppercase"
                  >
                    Shop Amazon <ArrowUpRight className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. CUTE RETRO PIN CLOUD BADGE */}
      <div className="bg-[#1F1F1F] text-[#FFF8F0] p-4 text-center rounded-none space-y-2 relative overflow-hidden border border-[#FFF8F0]/10">
        <div className="absolute left-0 bottom-0 w-8 h-8 bg-[#FFA94D]/10 rounded-tr-full pointer-events-none"></div>
        <div className="w-6 h-6 bg-[#E60023] rounded-full flex items-center justify-center font-bold text-xs text-white mx-auto font-serif">P</div>
        <h5 className="font-serif font-black italic text-xs tracking-tight">
          Love Pinterest Meal preps?
        </h5>
        <p className="text-[10px] text-stone-300 leading-relaxed font-sans">
          Click any of our recipe "Cook & Scale" tags to save detailed layouts direct on your board.
        </p>
      </div>

    </div>
  );
};
