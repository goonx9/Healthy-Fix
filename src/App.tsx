import React, { useState, useEffect } from 'react';
import { recipes } from './data/recipes';
import { blogPosts } from './data/blog';
import { affiliateProducts } from './data/affiliateProducts';

// Subcomponents
import { RecipeDetail } from './components/RecipeDetail';
import { MealPlanner } from './components/MealPlanner';
import { CommentsBlock } from './components/CommentsBlock';
import { BlogSidebar } from './components/BlogSidebar';

// Icons
import {
  Menu,
  X,
  Share2,
  Calendar,
  Flame,
  Search,
  Sparkles,
  ChevronRight,
  Send,
  Pin,
  Mail,
  ShoppingBag,
  ArrowLeft,
  Heart,
  Dumbbell,
  Clock,
  CheckCircle,
  ArrowRight,
  Info,
  BookOpen,
  CheckSquare,
  Compass,
  DollarSign
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Newsletter States
  const [optInEmail, setOptInEmail] = useState<string>('');
  const [isOptedIn, setIsOptedIn] = useState<boolean>(false);
  
  // Contact Form States
  const [contactName, setContactName] = useState<string>('');
  const [contactMsg, setContactMsg] = useState<string>('');
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);

  // Likes State
  const [likedItems, setLikedItems] = useState<{[key: string]: boolean}>(() => {
    const stored = localStorage.getItem('blog_likes');
    try {
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  });
  
  const [likeCounts, setLikeCounts] = useState<{[key: string]: number}>({
    'how-to-start-meal-prepping': 142,
    'the-truth-about-cottage-cheese': 289,
    'how-many-grams-of-protein': 304,
    'non-toxic-kitchenware-essentials': 95,
    'cottage-cheese-alfredo': 241,
    'garlic-herb-chicken-meal-prep': 188,
    'peanut-butter-protein-balls': 320,
    'turkey-taco-lettuce-boats': 145,
    'molten-chocolate-protein-mug': 412,
    'lemon-garlic-shrimp-asparagus': 118
  });

  const handleToggleLike = (itemId: string) => {
    const previouslyLiked = likedItems[itemId];
    const updatedLikes = { ...likedItems, [itemId]: !previouslyLiked };
    setLikedItems(updatedLikes);
    localStorage.setItem('blog_likes', JSON.stringify(updatedLikes));

    setLikeCounts(prev => ({
      ...prev,
      [itemId]: previouslyLiked ? ((prev[itemId] || 1) - 1) : ((prev[itemId] || 0) + 1)
    }));
  };

  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [showShareToast, setShowShareToast] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollPercent((window.scrollY / docHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = (pathSlug: string) => {
    try {
      navigator.clipboard.writeText(`${window.location.origin}/#/${pathSlug}`);
    } catch (e) {
      // safe fallback
    }
    setShowShareToast(true);
    setTimeout(() => {
      setShowShareToast(false);
    }, 2500);
  };

  const handleNavigateToTab = (tab: string, recipeId?: string) => {
    setActiveTab(tab);
    setSelectedRecipeId(recipeId || null);
    setSelectedPostId(null);
  };

  // Auto Scroll To Top on change tab
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setMobileMenuOpen(false);
  }, [activeTab, selectedRecipeId, selectedPostId]);

  const activeRecipe = recipes.find(r => r.id === selectedRecipeId);
  const activePost = blogPosts.find(p => p.id === selectedPostId);

  const handleRecipeClick = (id: string) => {
    setSelectedRecipeId(id);
    setSelectedPostId(null);
    setActiveTab('recipes');
  };

  const handlePostClick = (id: string) => {
    setSelectedPostId(id);
    setSelectedRecipeId(null);
    setActiveTab('blog');
  };

  const handleOptIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (optInEmail) {
      setIsOptedIn(true);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactName('');
      setContactMsg('');
    }, 3000);
  };

  // Home Page custom sorted lists
  const latestRecipesList = [...recipes].reverse();
  const popularRecipesList = recipes.filter(r => r.id === 'cottage-cheese-alfredo' || r.id === 'peanut-butter-protein-balls' || r.id === 'lemon-garlic-shrimp-asparagus');
  const highProteinRecipesList = recipes.filter(r => r.category === 'high-protein');
  const weightLossRecipesList = recipes.filter(r => r.category === 'weight-loss');
  const mealPrepRecipesList = recipes.filter(r => r.category === 'meal-prep');

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#1F1F1F] font-sans selection:bg-[#3CB371]/20 selection:text-emerald-950 flex flex-col justify-between">
      
      {/* HEADER SECTION */}
      <header className="bg-[#FFF8F0] border-b border-[#1F1F1F]/10 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-8 min-h-[5.5rem] py-3 flex items-center justify-between gap-6">
          {/* Logo brand */}
          <button
            onClick={() => { setActiveTab('home'); setSelectedRecipeId(null); setSelectedPostId(null); }}
            className="flex items-center gap-3 shrink-0 focus:outline-none cursor-pointer group"
            id="brand-logo-btn"
          >
            <img
              src="https://res.cloudinary.com/dmy2yiax9/image/upload/v1781141120/HEALTHY-removebg-preview_nwygi0.png"
              alt="Healthy Fix Official Logo"
              className="h-16 md:h-22 object-contain transition-transform duration-300 md:group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="text-left hidden xs:block">
              <span className="text-xl md:text-2xl font-serif font-black tracking-tight uppercase italic block leading-none text-[#1F1F1F]">
                Healthy Fix
              </span>
              <span className="text-[9px] md:text-xxs font-bold text-[#3CB371] uppercase tracking-[0.2em] block mt-1 font-sans">
                weight loss &amp; muscle diet
              </span>
            </div>
          </button>

          {/* Nav items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#1F1F1F]" id="desktop-routing-nav">
            {[
              { id: 'home', name: 'Home' },
              { id: 'recipes', name: 'Recipes' },
              { id: 'meal-plans', name: 'Meal Plans' },
              { id: 'healthy-living', name: 'Healthy Living' },
              { id: 'blog', name: 'Blog' },
              { id: 'about', name: 'About' },
              { id: 'contact', name: 'Contact' }
            ].map(tab => (
              <button
                key={tab.id}
                id={`nav-${tab.id}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedRecipeId(null);
                  setSelectedPostId(null);
                }}
                className={`px-3 py-1.5 border-b-2 transition-all cursor-pointer ${
                  activeTab === tab.id && !selectedRecipeId && !selectedPostId
                    ? 'border-[#3CB371] text-[#3CB371] font-black'
                    : 'border-transparent text-[#1F1F1F]/60 hover:text-[#3CB371] hover:border-[#3CB371]/40'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* CTA header button */}
            <button
              onClick={() => { setActiveTab('meal-plans'); setSelectedRecipeId(null); setSelectedPostId(null); }}
              className="hidden sm:inline-flex bg-[#3CB371] hover:bg-[#329e61] text-white text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full transition-all active:scale-95 cursor-pointer shadow-sm"
              id="header-free-plan-btn"
            >
              Get Free Meal Plan
            </button>

            {/* Mobile burger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1F1F1F] hover:opacity-80 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
              id="mobile-hamburger-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION DROPDOWN */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#1F1F1F]/10 bg-[#FFF8F0] py-4 px-6 space-y-1.5 animate-fade-in text-[11px] font-mono font-bold uppercase tracking-wider" id="mobile-routing-dropdown">
            {[
              { id: 'home', name: 'Home' },
              { id: 'recipes', name: 'Recipes' },
              { id: 'meal-plans', name: 'Meal Plans' },
              { id: 'healthy-living', name: 'Healthy Living' },
              { id: 'blog', name: 'Blog' },
              { id: 'about', name: 'About' },
              { id: 'contact', name: 'Contact' }
            ].map(tab => (
              <button
                key={tab.id}
                id={`mobile-nav-${tab.id}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedRecipeId(null);
                  setSelectedPostId(null);
                }}
                className={`w-full text-left py-2.5 px-4 rounded-xl transition-all cursor-pointer block ${
                  activeTab === tab.id
                    ? 'border-l-4 border-[#3CB371] bg-[#3CB371]/5 text-[#3CB371] font-black'
                    : 'text-[#1F1F1F]/70 hover:bg-[#3CB371]/5 hover:text-[#3CB371]'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* CENTRAL SWITCHBOARD ROUTING FOR CONTENT PANELS */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
        
        {/* HOMEPAGE VIEW */}
        {activeTab === 'home' && (
          <div className="space-y-12 animate-fade-in" id="home-view-container">
            
            {/* HERO SECTION */}
            <div className="bg-[#1F1F1F] text-white rounded-3xl p-8 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-xl">
              <div className="absolute right-0 top-0 w-44 h-44 bg-[#3CB371]/10 rounded-bl-full pointer-events-none"></div>
              <div className="absolute left-10 bottom-0 w-32 h-32 bg-[#FFA94D]/10 rounded-tr-full pointer-events-none"></div>
              <div className="flex-1 space-y-5 text-left z-10">
                <span className="bg-[#3CB371]/20 text-[#3CB371] font-mono text-[10px] font-bold tracking-widest px-3.5 py-1 uppercase rounded-full border border-[#3CB371]/30 inline-block">
                  ✦ Clean Wellness &amp; Metabolic Science
                </span>
                <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight leading-tight">
                  Healthy meals <br /><span className="text-[#3CB371] italic font-normal">made simple</span>
                </h1>
                <p className="text-stone-300 text-xs md:text-sm leading-relaxed max-w-xl font-sans">
                  No bland restrictions, no chalky powders. Chef Coach Elena Vasquez crafts calorie-accurate, high-protein recipes to satisfy your cravings while keeping you in a secure fat loss deficit.
                </p>
                <div className="flex flex-wrap gap-3.5 pt-2">
                  <button
                    onClick={() => handleNavigateToTab('recipes')}
                    className="bg-[#3CB371] hover:bg-[#329e61] text-white font-bold text-xs uppercase tracking-widest py-3.5 px-7 rounded-full shadow-md transition-all active:scale-95 cursor-pointer"
                    id="hero-browse-recipes-btn"
                  >
                    Browse Recipes
                  </button>
                  <button
                    onClick={() => handleNavigateToTab('meal-plans')}
                    className="bg-transparent hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest py-3.5 px-7 rounded-full border border-white/20 transition-all active:scale-95 cursor-pointer"
                    id="hero-get-plan-btn"
                  >
                    Get Free Meal Plan
                  </button>
                </div>
              </div>
              <div className="shrink-0 relative z-10 w-full md:w-80 h-72 bg-white rounded-2xl border border-white/10 p-3 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop"
                  alt="Healthy organic meal bowl"
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute -bottom-3 right-4 bg-[#FFA94D] text-[#1F1F1F] text-[10px] font-mono font-black uppercase px-3 py-1 tracking-widest rounded-lg shadow-md">
                  ★ Diet Coach Approved ★
                </span>
              </div>
            </div>

            {/* MEALS LIST GRID CONVERGENCE */}
            <div className="space-y-12 text-left">
              
              {/* 1. LATEST RECIPES */}
              <div className="space-y-6" id="home-latest-recipes">
                <div className="flex justify-between items-end border-b border-[#1F1F1F]/10 pb-3">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest font-bold text-[#3CB371] uppercase block">Fresh Out the Oven</span>
                    <h2 className="text-2xl md:text-3xl font-serif font-black italic text-[#1F1F1F]">Latest Healthy Recipes</h2>
                  </div>
                  <button
                    onClick={() => handleNavigateToTab('recipes')}
                    className="text-[10px] font-mono tracking-widest font-black text-[#3CB371] hover:underline"
                  >
                    View All Recipes →
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {latestRecipesList.slice(0, 3).map(recipe => (
                    <div key={`latest-${recipe.id}`} className="bg-white rounded-2xl border border-[#1F1F1F]/10 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                      <div onClick={() => handleRecipeClick(recipe.id)} className="cursor-pointer">
                        <div className="relative aspect-video w-full bg-[#FFF8F0] overflow-hidden">
                          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <span className="absolute left-3 top-3 bg-[#3CB371] text-white text-[9px] font-mono uppercase font-black px-2.5 py-1 rounded-md shadow-sm">
                            {recipe.category.replace('-', ' ')}
                          </span>
                          <span className="absolute right-3 top-3 bg-[#1F1F1F]/80 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md">
                            {recipe.calories} kcal
                          </span>
                        </div>
                        <div className="p-5 space-y-2">
                          <h3 className="text-base font-serif font-black italic leading-snug text-[#1F1F1F] group-hover:text-[#3CB371] transition-colors">{recipe.title}</h3>
                          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">{recipe.description}</p>
                        </div>
                      </div>
                      <div className="px-5 pb-5 pt-3 border-t border-[#1F1F1F]/5 flex justify-between items-center text-[10px] font-mono font-bold text-stone-400">
                        <span>P: {recipe.macros.protein}g | C: {recipe.macros.carbs}g</span>
                        <button onClick={() => handleRecipeClick(recipe.id)} className="text-[#3CB371] hover:underline uppercase">Cook &amp; Scale →</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. POPULAR RECIPES */}
              <div className="space-y-6" id="home-popular-recipes">
                <div className="flex justify-between items-end border-b border-[#1F1F1F]/10 pb-3">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest font-bold text-[#FFA94D] uppercase block">User Favorites</span>
                    <h2 className="text-2xl md:text-3xl font-serif font-black italic text-[#1F1F1F]">Popular Recipes</h2>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {popularRecipesList.slice(0, 3).map(recipe => (
                    <div key={`pop-${recipe.id}`} className="bg-white rounded-2xl border border-[#1F1F1F]/10 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                      <div onClick={() => handleRecipeClick(recipe.id)} className="cursor-pointer">
                        <div className="relative aspect-video w-full bg-[#FFF8F0] overflow-hidden">
                          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <span className="absolute left-3 top-3 bg-[#FFA94D] text-[#1F1F1F] text-[9px] font-mono uppercase font-black px-2.5 py-1 rounded-md shadow-sm">
                            ★ POPULAR
                          </span>
                          <span className="absolute right-3 top-3 bg-[#1F1F1F]/80 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md">
                            {recipe.calories} kcal
                          </span>
                        </div>
                        <div className="p-5 space-y-2">
                          <h3 className="text-base font-serif font-black italic leading-snug text-[#1F1F1F] group-hover:text-[#FFA94D] transition-colors">{recipe.title}</h3>
                          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">{recipe.description}</p>
                        </div>
                      </div>
                      <div className="px-5 pb-5 pt-3 border-t border-[#1F1F1F]/5 flex justify-between items-center text-[10px] font-mono font-bold text-stone-400">
                        <span>P: {recipe.macros.protein}g | Fats: {recipe.macros.fat}g</span>
                        <button onClick={() => handleRecipeClick(recipe.id)} className="text-[#3CB371] hover:underline uppercase">Cook &amp; Scale →</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* BENTO GRID OF SPECIFIC METABOLIC SECTIONS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
                
                {/* 3. HIGH PROTEIN MEALS */}
                <div className="space-y-4 bg-white border border-[#1F1F1F]/10 rounded-3xl p-6">
                  <div className="border-b border-[#1F1F1F]/10 pb-2 flex justify-between items-center">
                    <h3 className="text-lg font-serif font-black italic flex items-center gap-1.5 text-stone-800">
                      <Dumbbell className="w-5 h-5 text-[#3CB371]" /> High Protein
                    </h3>
                    <span className="text-[10px] font-mono text-[#3CB371] font-bold uppercase">{highProteinRecipesList.length} items</span>
                  </div>
                  <div className="space-y-4">
                    {highProteinRecipesList.slice(0, 2).map(recipe => (
                      <div key={`hp-${recipe.id}`} onClick={() => handleRecipeClick(recipe.id)} className="flex gap-3 items-center group cursor-pointer border-b border-dashed border-[#1F1F1F]/10 pb-3 last:border-b-0 last:pb-0">
                        <img src={recipe.image} alt={recipe.title} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                        <div>
                          <h4 className="text-xs font-serif font-black text-stone-800 group-hover:text-[#3CB371] line-clamp-1">{recipe.title}</h4>
                          <span className="text-[10px] font-mono font-bold text-[#3CB371]">{recipe.macros.protein}g protein • {recipe.calories} kcal</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. WEIGHT LOSS RECIPES */}
                <div className="space-y-4 bg-white border border-[#1F1F1F]/10 rounded-3xl p-6">
                  <div className="border-b border-[#1F1F1F]/10 pb-2 flex justify-between items-center">
                    <h3 className="text-lg font-serif font-black italic flex items-center gap-1.5 text-stone-800">
                      <Flame className="w-5 h-5 text-[#FFA94D]" /> Weight Loss Meals
                    </h3>
                    <span className="text-[10px] font-mono text-[#FFA94D] font-bold uppercase">{weightLossRecipesList.length} items</span>
                  </div>
                  <div className="space-y-4">
                    {weightLossRecipesList.slice(0, 2).map(recipe => (
                      <div key={`wl-${recipe.id}`} onClick={() => handleRecipeClick(recipe.id)} className="flex gap-3 items-center group cursor-pointer border-b border-dashed border-[#1F1F1F]/10 pb-3 last:border-b-0 last:pb-0">
                        <img src={recipe.image} alt={recipe.title} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                        <div>
                          <h4 className="text-xs font-serif font-black text-stone-800 group-hover:text-[#FFA94D] line-clamp-1">{recipe.title}</h4>
                          <span className="text-[10px] font-mono font-bold text-[#FFA94D]">{recipe.calories} kcal • P: {recipe.macros.protein}g</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. MEAL PREP IDEAS */}
                <div className="space-y-4 bg-white border border-[#1F1F1F]/10 rounded-3xl p-6">
                  <div className="border-b border-[#1F1F1F]/10 pb-2 flex justify-between items-center">
                    <h3 className="text-lg font-serif font-black italic flex items-center gap-1.5 text-stone-800">
                      <Calendar className="w-5 h-5 text-indigo-500" /> Meal Prep Ideas
                    </h3>
                    <span className="text-[10px] font-mono text-indigo-500 font-bold uppercase">{mealPrepRecipesList.length} items</span>
                  </div>
                  <div className="space-y-4">
                    {mealPrepRecipesList.slice(0, 2).map(recipe => (
                      <div key={`mprep-${recipe.id}`} onClick={() => handleRecipeClick(recipe.id)} className="flex gap-3 items-center group cursor-pointer border-b border-dashed border-[#1F1F1F]/10 pb-3 last:border-b-0 last:pb-0">
                        <img src={recipe.image} alt={recipe.title} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                        <div>
                          <h4 className="text-xs font-serif font-black text-stone-800 group-hover:text-indigo-500 line-clamp-1">{recipe.title}</h4>
                          <span className="text-[10px] font-mono font-bold text-stone-500">{recipe.calories} kcal • {recipe.difficulty} prep</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* 6. EMAIL NEWSLETTER SIGNUP SECTION */}
              <div className="pt-8">
                <div id="newsletter-signup" className="bg-[#FFF8F0] border-2 border-dashed border-[#3CB371]/30 rounded-3xl p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden text-left">
                  <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-[#3CB371]/5 rounded-full pointer-events-none"></div>
                  <div className="space-y-2 flex-1">
                    <span className="text-[10px] font-mono tracking-widest text-[#3CB371] font-black uppercase">✦ Join 14,000+ Readers ✦</span>
                    <h3 className="text-2xl font-serif font-black italic text-gray-900">
                      Get Free Weekly Custom Deficit Planners
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed font-sans max-w-md">
                      Subscribe to get clean protein recipes, grocery shopping guides, and metabolic recomposition hacks delivered free straight to your inbox.
                    </p>
                  </div>
                  <div className="w-full md:w-auto shrink-0 z-10 font-sans">
                    {!isOptedIn ? (
                      <form onSubmit={handleOptIn} className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="email"
                          placeholder="Your email address..."
                          value={optInEmail}
                          onChange={(e) => setOptInEmail(e.target.value)}
                          className="bg-white border border-[#1F1F1F]/20 rounded-full px-5 py-3 text-xs w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#3CB371]"
                          required
                        />
                        <button
                          type="submit"
                          className="bg-[#1F1F1F] hover:bg-[#3CB371] text-white text-xs font-bold uppercase tracking-widest py-3 px-6 rounded-full transition-all active:scale-95 text-center cursor-pointer font-sans"
                        >
                          Sign Up Free
                        </button>
                      </form>
                    ) : (
                      <div className="bg-emerald-50 text-emerald-800 border border-dashed border-emerald-200 rounded-2xl p-4 text-xs font-semibold animate-fade-in flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#3CB371]" /> Successfully subscribed! Check your inbox soon.
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* RECIPES ARCHIVE TAB */}
        {activeTab === 'recipes' && (
          <div className="space-y-8 animate-fade-in">
            {activeRecipe ? (
              <RecipeDetail recipe={activeRecipe} onBack={() => setSelectedRecipeId(null)} />
            ) : (
              <div className="space-y-8 text-left" id="recipes-archive-view">
                
                {/* Search & Category Filter Section */}
                <div className="bg-white border border-[#1F1F1F]/10 rounded-3xl p-6 md:p-8 space-y-6">
                  <div className="text-center space-y-2">
                    <span className="text-xs font-mono font-black uppercase text-[#3CB371]">★ Clean Food Database</span>
                    <h1 className="text-3xl md:text-4xl font-serif font-black italic text-gray-900 tracking-tight">Recipes Directory</h1>
                    <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                      Every dish is calorie-accurate with dynamic serving scaling, complete with structured protein, carbs, and fat breakdowns.
                    </p>
                  </div>

                  <div className="relative max-w-xl mx-auto">
                    <input
                      type="text"
                      placeholder="Search recipes, ingredients or health keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#FFF8F0]/35 border border-[#1F1F1F]/20 rounded-full py-3.5 pl-12 pr-5 text-sm text-[#1F1F1F] focus:outline-none focus:ring-2 focus:ring-[#3CB371]"
                    />
                    <Search className="w-5 h-5 text-stone-400 absolute left-4.5 top-3.5" />
                  </div>
                </div>

                {/* Recp Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recipes.filter(r => 
                    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    r.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    r.seoKeywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
                  ).map((recipe) => (
                    <div
                      key={`rectab-${recipe.id}`}
                      onClick={() => handleRecipeClick(recipe.id)}
                      className="bg-white rounded-2xl border border-[#1F1F1F]/10 overflow-hidden hover:border-[#3CB371]/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="relative aspect-video w-full bg-[#FFF8F0]/50 overflow-hidden">
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute left-3 top-3 bg-white text-[9px] uppercase font-mono tracking-widest font-extrabold px-2.5 py-1 rounded-md text-[#3CB371] border border-[#1F1F1F]/10">
                            {recipe.category.replace('-', ' ')}
                          </span>
                          <span className="absolute right-3 top-3 bg-[#1F1F1F]/90 text-[10px] font-bold text-white px-2.5 py-1 rounded-md font-mono">
                            {recipe.calories} kcal
                          </span>
                        </div>
                        <div className="p-5 space-y-2">
                          <h3 className="text-lg font-serif font-bold italic leading-tight text-gray-900 group-hover:text-[#3CB371] transition-colors">
                            {recipe.title}
                          </h3>
                          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                            {recipe.description}
                          </p>
                        </div>
                      </div>

                      <div className="px-5 pb-5 pt-3 border-t border-[#1F1F1F]/10 flex items-center justify-between text-[11px] font-mono font-bold text-gray-500">
                        <span className="flex items-center gap-1">
                          <Flame className="w-4 h-4 text-[#FFA94D]" /> {recipe.macros.protein}g protein
                        </span>
                        <span className="text-[#3CB371] group-hover:underline flex items-center gap-0.5 text-[9px] uppercase tracking-wider">
                          Cook &amp; Scale →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>
        )}

        {/* MEAL PLANS TAB */}
        {activeTab === 'meal-plans' && (
          <div className="space-y-8 animate-fade-in text-left">
            <MealPlanner />
          </div>
        )}

        {/* HEALTHY LIVING TAB */}
        {activeTab === 'healthy-living' && (
          <div className="space-y-12 animate-fade-in text-left max-w-5xl mx-auto" id="healthy-living-view">
            
            {/* Header Banner */}
            <div className="bg-[#FFF8F0] border border-[#1F1F1F]/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 bg-[#3CB371]/5 p-24 rounded-full pointer-events-none"></div>
              <span className="text-xs font-mono font-black text-[#3CB371] uppercase tracking-widest block mb-1">Coach Credentials &amp; Philosophy</span>
              <h1 className="text-3xl md:text-5xl font-serif font-black italic text-[#1F1F1F] leading-tight">Simple Nutrition Tips for Sustainable Living</h1>
              <p className="text-stone-500 text-xs md:text-sm max-w-2xl font-sans mt-3 leading-relaxed">
                Unlock the biological cheat codes to consistency. Chef Coach Elena Vasquez brings her 6 years of Biometric Food Analysis to clear the noise and lay down authentic fat loss rules.
              </p>
            </div>

            {/* bento grid of nutrition tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Tip 1 */}
              <div className="bg-white border border-[#1F1F1F]/10 rounded-3xl p-6 space-y-4">
                <span className="bg-[#3CB371]/10 text-[#3CB371] font-mono text-[9px] font-bold px-2.5 py-1 rounded-md uppercase inline-block">Rule 01 • The Casein Sleep Secret</span>
                <h3 className="text-xl font-serif font-black italic text-stone-800">Cure Morning Cravings Overnight</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Unlike quick-absorbing whey, 80% of cottage cheese consists of <strong>Casein protein</strong>. Casein releases amino acids slowly over an 8-hour window. Eating a cup of blended cottage cheese or Greek yogurt before sleep prevents midnight cortisol spikes, keeping muscle tissues fed and metabolism humming.
                </p>
              </div>

              {/* Tip 2 */}
              <div className="bg-white border border-[#1F1F1F]/10 rounded-3xl p-6 space-y-4">
                <span className="bg-[#FFA94D]/10 text-[#FFA94D] font-mono text-[9px] font-bold px-2.5 py-1 rounded-md uppercase inline-block">Rule 02 • Thermic Effect optimization</span>
                <h3 className="text-xl font-serif font-black italic text-stone-800">Thermodynamics: Eat More to Burn More</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Did you know digestion expends energy? Fat burns just 3% during breakdown, and carbs use 10%. But **protein burns a massive 30% of its calories simply being digested**. Consuming 100 kcal of chicken breast requires your stomach to burn 30 kcal just to absorb it, leaving your net intake at only 70 kcal!
                </p>
              </div>

              {/* Tip 3 */}
              <div className="bg-white border border-[#1F1F1F]/10 rounded-3xl p-6 space-y-4">
                <span className="bg-indigo-50 text-indigo-600 font-mono text-[9px] font-bold px-2.5 py-1 rounded-md uppercase inline-block">Rule 03 • The Cooking Gear Swaps</span>
                <h3 className="text-xl font-serif font-black italic text-stone-800">Swan-Song Scratched Teflon Cookware</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Your clean meal preps shouldn’t be coated in toxins. Scratched Teflon nonstick pans release millions of endocrine-disrupting PFAS (forever chemicals) sub-particles when heated above 500°F. Swap them for Sol-Gel <strong>Ceramic-coated cookware</strong>, seasoned cast iron, or clinical grade stainless steel which keep food completely non-toxic.
                </p>
              </div>

              {/* Tip 4 */}
              <div className="bg-white border border-[#1F1F1F]/10 rounded-3xl p-6 space-y-4">
                <span className="bg-pink-50 text-pink-600 font-mono text-[9px] font-bold px-2.5 py-1 rounded-md uppercase inline-block">Rule 04 • Volume Eating Strategy</span>
                <h3 className="text-xl font-serif font-black italic text-stone-800">Fill the Plate, Not Your Calorie Total</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Starvation is the number one cause of diet relapse. Choose high-volume, low-density vegetables (like raw cucumbers, air-fried broccoli, and celery stalks) combined with high-protein sources. This expands the stomach lining, firing off vagus nerve receptors signaling raw fullness to the host brain under 400 calories.
                </p>
              </div>

            </div>

            {/* SEARCH INFRASTRUCTURE COMPLIANCY MAP (SEO & INDEXING MAPS) */}
            <div className="bg-[#1F1F1F] text-[#FFF8F0] border border-[#FFF8F0]/10 rounded-3xl p-6 md:p-8 space-y-4 text-left">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#3CB371]" />
                <h3 className="text-lg font-mono font-black uppercase tracking-wider text-white">Google &amp; Pinterest Indexing Map</h3>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                This organic food portal is fully structured to welcome traffic with search compliance signals:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px] font-mono pt-2">
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <span className="text-[#3CB371] font-bold block mb-1">✓ Robots.txt Verified</span>
                  <span className="text-stone-400">Public search crawlers are allowed indexing permissions on core files.</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <span className="text-[#3CB371] font-bold block mb-1">✓ XML Sitemap Active</span>
                  <span className="text-stone-400">Dynamic sitemap indexes are mapped out inside <code>/sitemap.xml</code> directory.</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <span className="text-[#3CB371] font-bold block mb-1">✓ Recipe Schema Injection</span>
                  <span className="text-stone-400">Microdata LD+JSON markup is generated on recipe cook pages for organic rich snippet results on Google Search.</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* REFINED LIFESTYLE BLOG TAB */}
        {activeTab === 'blog' && (
          <div className="space-y-8 animate-fade-in text-left">
            
            {activePost ? (
              <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-fade-in relative text-left">
                {/* Thin reading progress indicator */}
                <div className="fixed top-0 left-0 w-full h-[4px] bg-[#FFF8F0]/30 z-[100] pointer-events-none">
                  <div 
                    className="h-full bg-[#3CB371] transition-all duration-75"
                    style={{ width: `${scrollPercent}%` }}
                  ></div>
                </div>

                {showShareToast && (
                  <div className="fixed bottom-6 right-6 bg-[#1F1F1F] text-[#FFF8F0] px-4 py-3 border border-[#FFF8F0]/10 z-[100] shadow-2xl flex items-center gap-2 font-mono text-[10px] uppercase font-bold animate-pulse rounded-xl">
                    <Sparkles className="w-4 h-4 text-[#FFA94D]" /> Link copied! Ready for Pinterest!
                  </div>
                )}

                <button
                  onClick={() => setSelectedPostId(null)}
                  className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 font-semibold text-xs tracking-wider uppercase cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-[#3CB371]" /> Return to Articles Directory
                </button>

                <div className="bg-white rounded-3xl border border-[#1F1F1F]/10 p-6 md:p-8 space-y-6">
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-stone-50 border border-[#1F1F1F]/10">
                    <img src={activePost.image} alt={activePost.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 flex-wrap text-[10px] font-mono font-bold text-stone-400">
                      <span className="bg-[#3CB371]/10 text-[#3CB371] px-2.5 py-1 rounded-sm border border-[#3CB371]/20 uppercase tracking-wider font-extrabold">
                        {activePost.category}
                      </span>
                      <span>|</span>
                      <span>BY {activePost.author.toUpperCase()}</span>
                      <span>|</span>
                      <span>PUBLISHED {activePost.date.toUpperCase()}</span>
                      <span>|</span>
                      <span>{activePost.readTime.toUpperCase()}</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-serif font-black italic tracking-tight text-[#1F1F1F] leading-tight">
                      {activePost.title}
                    </h1>

                    {/* Interactive Share / Like substory */}
                    <div className="flex items-center justify-between border-y border-[#1F1F1F]/10 py-3 mt-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest bg-stone-50/50 px-4">
                      <button
                        onClick={() => handleToggleLike(activePost.id)}
                        className={`flex items-center gap-1.5 cursor-pointer transition-all ${likedItems[activePost.id] ? 'text-rose-500 font-extrabold' : 'text-gray-500 hover:text-rose-500'}`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${likedItems[activePost.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                        <span>Like ({likeCounts[activePost.id] || 0})</span>
                      </button>
                      <div className="flex items-center gap-3">
                        <button onClick={() => handleCopyLink(activePost.slug)} className="flex items-center gap-1 hover:text-[#3CB371] cursor-pointer">
                          <Share2 className="w-3.5 h-3.5" /> Copy Link
                        </button>
                        <span>|</span>
                        <a href="https://www.pinterest.com/healthyfitfix" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#E60023] text-stone-500 uppercase cursor-pointer">
                          <Pin className="w-3.5 h-3.5" /> Save
                        </a>
                      </div>
                    </div>

                    <p className="text-stone-600 font-serif text-sm font-medium italic border-l-3 border-[#FFA94D] pl-4 leading-relaxed">
                      {activePost.excerpt}
                    </p>

                    {/* Content Markdown layout */}
                    <div className="prose prose-stone max-w-none text-xs md:text-sm text-gray-800 leading-relaxed font-sans space-y-4 pt-4 border-t border-[#1F1F1F]/10 pr-2">
                      {activePost.content.split('\n\n').map((para, idx) => {
                        if (para.startsWith('##')) {
                          return (
                            <h2 key={idx} className="text-2xl font-serif font-black italic text-gray-900 pt-6 pb-2 border-b border-[#1F1F1F]/10 flex items-center gap-2">
                              <span className="w-1.5 h-6 bg-[#3CB371] inline-block"></span>
                              {para.replace('##', '').trim()}
                            </h2>
                          );
                        }
                        if (para.startsWith('###')) {
                          return (
                            <h3 key={idx} className="text-xs font-mono font-black text-gray-950 uppercase tracking-widest pt-4 flex items-center gap-1.5">
                              ✦ {para.replace('###', '').trim()}
                            </h3>
                          );
                        }
                        if (para.startsWith('*')) {
                          return (
                            <ul key={idx} className="list-disc pl-5 space-y-1.5 py-2">
                              {para.split('\n').map((li, lIdx) => (
                                <li key={lIdx} className="text-xs text-stone-700 leading-relaxed pl-1" style={{ listStyleType: 'square' }}>
                                  <strong>{li.replace('*', '').split(':')[0]}:</strong>
                                  {li.replace('*', '').split(':')[1]}
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        if (para.startsWith('$$')) {
                          return (
                            <div key={idx} className="my-6 bg-[#FFF8F0] font-mono text-center p-4 border border-[#1F1F1F]/10 rounded-xl text-gray-800 overflow-x-auto font-bold text-xs uppercase tracking-wider">
                              {para.replace(/\$\$/g, '').trim()}
                            </div>
                          );
                        }
                        return <p key={idx} className="leading-relaxed font-sans text-stone-600">{para}</p>;
                      })}
                    </div>

                    {/* Coach description card */}
                    <div className="mt-8 bg-[#FFF8F0] border border-[#1F1F1F]/10 p-5 rounded-2xl flex flex-col md:flex-row gap-4 items-center">
                      <img
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop"
                        alt="Elena Vasquez portrait"
                        className="w-14 h-14 rounded-full object-cover border border-[#3CB371] shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-left space-y-1 flex-1">
                        <h4 className="font-serif font-bold italic text-xs text-[#1F1F1F]">Written by Chef Coach Elena Vasquez</h4>
                        <p className="text-[11px] text-stone-500 leading-normal font-sans">
                          Elena spent 6 years inside biometric food laboratories tracking carbohydrate absorption and ghrelin satiety counters before starting the Healthy Fix blog. She writes clean recipes aimed at sustainable recomposition.
                        </p>
                      </div>
                    </div>

                    {/* MATCHMAKER DYNAMIC RELATED POSTS */}
                    {(() => {
                      let relatedRecipeId = '';
                      if (activePost.id === 'the-truth-about-cottage-cheese') relatedRecipeId = 'cottage-cheese-alfredo';
                      else if (activePost.id === 'how-to-start-meal-prepping') relatedRecipeId = 'garlic-herb-chicken-meal-prep';
                      else if (activePost.id === 'non-toxic-kitchenware-essentials') relatedRecipeId = 'garlic-herb-chicken-meal-prep';
                      else if (activePost.id === 'how-many-grams-of-protein') relatedRecipeId = 'lemon-garlic-shrimp-asparagus';

                      const matchedRecipe = recipes.find(r => r.id === relatedRecipeId);
                      if (!matchedRecipe) return null;

                      return (
                        <div className="my-8 bg-[#3CB371]/5 border border-[#3CB371]/20 p-5 md:p-6 rounded-2xl text-left space-y-4">
                          <span className="text-[8px] font-mono tracking-widest text-[#3CB371] font-bold uppercase block">
                            ★ Related Recipe Matchmaker ★
                          </span>
                          <div className="flex flex-col sm:flex-row gap-5 items-center">
                            <img
                              src={matchedRecipe.image}
                              alt={matchedRecipe.title}
                              className="w-full sm:w-32 h-24 object-cover border border-[#1F1F1F]/10 rounded-xl shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="flex-1 space-y-1">
                              <h4 className="font-serif font-black italic text-sm text-gray-950">
                                Cook it tonight! {matchedRecipe.title}
                              </h4>
                              <p className="text-[11px] text-stone-500 leading-relaxed font-sans">
                                Inspired by the science in this post? Sauté Elena's customized portion-accurate recipe tonight! Only {matchedRecipe.calories} calories with {matchedRecipe.macros.protein}g protein.
                              </p>
                              <button
                                onClick={() => handleRecipeClick(matchedRecipe.id)}
                                className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#3CB371] hover:underline uppercase pt-1 cursor-pointer"
                              >
                                View full cooking steps &amp; scale →
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                  </div>
                </div>

                <CommentsBlock contentId={activePost.id} contentType="article" />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* LIST OF POSTS (8/12) */}
                <div className="lg:col-span-8 space-y-8">
                  <div className="bg-white rounded-3xl border border-[#1F1F1F]/10 p-6 md:p-8 space-y-2">
                    <span className="text-xs font-mono font-black text-[#3CB371] uppercase">Education Section</span>
                    <h1 className="text-3xl font-serif font-black italic text-[#1F1F1F]">Lifestyle &amp; Diet Blog</h1>
                    <p className="text-stone-500 text-xs">Stay informed with the latest scientific and practical fat loss recommendations.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {blogPosts.map((post) => (
                      <div
                        key={`blogtab-${post.id}`}
                        onClick={() => handlePostClick(post.id)}
                        className="bg-white rounded-2xl border border-[#1F1F1F]/10 overflow-hidden hover:border-[#3CB371] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                      >
                        <div className="aspect-video w-full bg-stone-50 overflow-hidden border-b border-[#1F1F1F]/10">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="p-6 flex flex-col justify-between flex-1 space-y-3">
                          <div>
                            <span className="text-[9px] font-mono font-bold text-stone-400 uppercase tracking-widest block mb-1">
                              BY {post.author.toUpperCase()} • {post.date}
                            </span>
                            <h3 className="text-lg font-serif font-bold italic tracking-tight text-[#1F1F1F] group-hover:text-[#3CB371] leading-tight transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-xs text-stone-500 line-clamp-2 mt-2 leading-relaxed font-sans">
                              {post.excerpt}
                            </p>
                          </div>

                          <div className="flex justify-between items-center text-[9px] font-mono text-stone-400 pt-3 border-t border-dashed border-[#1F1F1F]/10 font-black uppercase tracking-widest">
                            <span>{post.readTime}</span>
                            <span className="text-[#3CB371] flex items-center gap-0.5 font-bold">
                              Read Post <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SIDEBAR (4/12) */}
                <div className="lg:col-span-4">
                  <BlogSidebar
                    onNavigateToTab={handleNavigateToTab}
                    onNavigatePost={handlePostClick}
                    onNavigateRecipe={handleRecipeClick}
                    optInEmail={optInEmail}
                    setOptInEmail={setOptInEmail}
                    isOptedIn={isOptedIn}
                    handleOptIn={handleOptIn}
                  />
                </div>

              </div>
            )}
          </div>
        )}

        {/* ABOUT COACH TAB */}
        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto space-y-10 animate-fade-in text-left" id="about-us-view">
            
            {/* Magazine Portrait Section */}
            <div className="bg-white border border-[#1F1F1F]/10 rounded-3xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-[#1F1F1F]/10">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop"
                  alt="Elena Vasquez Profile Portrait"
                  className="w-full h-full object-cover rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="md:col-span-7 space-y-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#3CB371] font-black">Biometric Food Analyst &amp; Founder</span>
                <h1 className="text-3xl md:text-5xl font-serif font-black italic text-gray-900 tracking-tight leading-none mt-1">Elena Vasquez</h1>
                <p className="text-stone-500 font-serif italic text-sm">"The healthy lifestyle shouldn't taste like cardboard boxes."</p>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Elena spent 6 years in biometric food analysis, testing how metabolic systems absorb nutrients and suppress stress hormones. Finding herself sick of dry boiled chicken breasts and boring diet sheets, she set out to reformulate comfort foods into premium, macro-accurate fitness dishes.
                </p>
                <div className="pt-2">
                  <button onClick={() => setActiveTab('contact')} className="bg-[#1F1F1F] hover:bg-[#3CB371] text-white text-xs font-bold uppercase tracking-widest py-3 px-6 rounded-full transition-all cursor-pointer">
                    Book Private Coaching
                  </button>
                </div>
              </div>
            </div>

            {/* Core Values / Philosophy */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs">
              
              <div className="bg-white border border-[#1F1F1F]/10 rounded-2xl p-6 space-y-2">
                <strong className="font-serif italic text-base text-gray-950 block">01. Premium Aesthetics First</strong>
                <p className="text-stone-500 leading-relaxed">
                  We believe beautiful foods lead to happier habits. Our recipes are designed with Pinterest boards in selection, because high visual satiety curbs real hunger.
                </p>
              </div>

              <div className="bg-white border border-[#1F1F1F]/10 rounded-2xl p-6 space-y-2">
                <strong className="font-serif italic text-base text-gray-950 block">02. Niche Bio Evidence</strong>
                <p className="text-stone-500 leading-relaxed">
                  No empty claims. Our ingredients leverage muscle retention values, slow digestion times (casein kinetics), and the thermic effect of whole protein profiles.
                </p>
              </div>

              <div className="bg-white border border-[#1F1F1F]/10 rounded-2xl p-6 space-y-2">
                <strong className="font-serif italic text-base text-gray-950 block">03. Non-toxic Ecosystems</strong>
                <p className="text-stone-500 leading-relaxed">
                  Pure eating goes beyond standard grocery items. We show users how to swap scratched Teflon nonstick pans and microwave glass dishes to bypass plasticizers.
                </p>
              </div>

            </div>

          </div>
        )}

        {/* REGULAR CONTACT PATH TAB */}
        {activeTab === 'contact' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#1F1F1F]/10 p-6 md:p-8 space-y-6 text-left font-sans animate-fade-in" id="contact-us-view">
            <div className="text-center pb-4 border-b border-[#1F1F1F]/10">
              <span className="text-xs font-bold tracking-widest text-[#3CB371] uppercase font-mono">Pinterest Partnerships &amp; Support</span>
              <h2 className="text-3xl font-serif font-black italic text-gray-905 mt-1 leading-tight">Get in Touch with Coach Elena</h2>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Have questions about a recipe or seeking professional fitness recommendations? Dispatch a secure query below!
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-mono font-bold text-gray-600 uppercase mb-1">Your Name</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="E.g., Julie Finch"
                    className="w-full bg-[#FFF8F0]/30 border border-[#1F1F1F]/10 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-[#3CB371]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-mono font-bold text-gray-600 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="E.g., julie@domain.com"
                    className="w-full bg-[#FFF8F0]/30 border border-[#1F1F1F]/10 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-[#3CB371]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-mono font-bold text-gray-600 uppercase mb-1">Select Inquiry Type</label>
                <select className="w-full bg-[#FFF8F0]/30 border border-[#1F1F1F]/10 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-[#3CB371] cursor-pointer h-11">
                  <option>Recipe help / portion conversions</option>
                  <option>Grocery shopping checklist retrieval</option>
                  <option>Pinterest collaboration / Guest posting</option>
                  <option>Custom premium PDF delivery assistance</option>
                </select>
              </div>

              <div>
                <label className="block text-[9px] font-mono font-bold text-gray-600 uppercase mb-1">Your Message</label>
                <textarea
                  rows={4}
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  placeholder="Tell Elena about your specific nutrition goals..."
                  className="w-full bg-[#FFF8F0]/30 border border-[#1F1F1F]/10 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-[#3CB371]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1F1F1F] hover:bg-[#3CB371] text-white py-3.5 px-6 rounded-full font-bold flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" /> Dispatch Message
              </button>
            </form>

            {contactSuccess && (
              <div className="bg-[#FFF8F0] text-stone-900 border-2 border-dashed border-[#3CB371]/35 text-xs font-semibold p-4 rounded-2xl text-center animate-fade-in shadow-xs">
                🎉 Thank you, {contactName || 'there'}! Your message arrived directly in Elena Vasquez's coaching inbox. Expect detailed research feedback within 24 hours.
              </div>
            )}
          </div>
        )}

      </main>

      {/* FOOTER SECTION */}
      <footer className="bg-[#1F1F1F] text-white border-t border-gray-800 pt-16 pb-8 mt-16 font-sans">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Intro column */}
          <div className="md:col-span-5 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <img
                src="https://res.cloudinary.com/dmy2yiax9/image/upload/v1781141120/HEALTHY-removebg-preview_nwygi0.png"
                alt="Healthy Fix Footer Logo"
                className="h-16 object-contain invert brightness-0"
                referrerPolicy="no-referrer"
              />
              <div className="text-left font-serif">
                <span className="text-lg md:text-xl font-black uppercase tracking-tight text-white block">HEALTHY FIX</span>
                <span className="text-[9px] font-mono tracking-widest text-[#3CB371] uppercase leading-none block font-bold">WEIGHT LOSS &amp; DIET</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              We provide clean, high-protein recipes, customized shopping lists, and Pinterest-friendly meal preps.
            </p>
            <div className="text-[10px] text-gray-500 font-mono tracking-tight pt-1">
              COPYRIGHT © 2026 HEALTHY FIX BRAND CORP.
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-3 text-left">
            <h4 className="text-[11px] font-mono font-bold tracking-widest text-[#FFA94D] uppercase">
              Directory Pages
            </h4>
            <div className="flex flex-col gap-2.5 text-xs font-semibold text-gray-400">
              <button onClick={() => handleNavigateToTab('home')} className="hover:text-white text-left cursor-pointer transition-colors">Home</button>
              <button onClick={() => handleNavigateToTab('recipes')} className="hover:text-white text-left cursor-pointer transition-colors">Recipes</button>
              <button onClick={() => handleNavigateToTab('meal-plans')} className="hover:text-white text-left cursor-pointer transition-colors">Meal Plans</button>
              <button onClick={() => handleNavigateToTab('healthy-living')} className="hover:text-white text-left cursor-pointer transition-colors">Healthy Living</button>
              <button onClick={() => handleNavigateToTab('blog')} className="hover:text-white text-left cursor-pointer transition-colors">Blog</button>
              <button onClick={() => handleNavigateToTab('about')} className="hover:text-white text-left cursor-pointer transition-colors">About</button>
              <button onClick={() => handleNavigateToTab('contact')} className="hover:text-white text-left cursor-pointer transition-colors">Contact</button>
            </div>
          </div>

          {/* Legal / Pinterest badge */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="text-[11px] font-mono font-bold tracking-widest text-[#3CB371] uppercase">
              Legitimacy &amp; Pinterest Community
            </h4>
            <p className="text-xs text-gray-400 leading-normal">
              We participate in healthy food recomposition programs and support non-toxic lifestyle models. Check our boards for daily updates!
            </p>

            <div className="pt-2">
              <a
                href="https://www.pinterest.com/healthyfitfix"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#E60023] hover:bg-[#b8001c] text-white px-5 py-2.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                <div className="w-4 h-4 rounded-full bg-white text-[#E60023] flex items-center justify-center font-bold text-xs font-serif leading-none">P</div>
                Follow on Pinterest
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM LEGAL Disclaimer Banner */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 border-t border-gray-800 mt-12 pt-8 text-center text-[10px] text-gray-500 leading-normal space-y-2">
          <p>
            <strong>Medical Disclaimer:</strong> The nutritional calculations, recipes, and estimates on healthyfix.com are for informational purposes only. Consult with your healthcare provider before beginning any active deficit diet.
          </p>
          <p className="font-mono text-gray-600">
            Securely Compiled with React &amp; Tailwind CSS.
          </p>
        </div>
      </footer>

    </div>
  );
}
