import React, { useState, useEffect } from 'react';
import { recipes } from './data/recipes';
import { blogPosts } from './data/blog';
import { seoIdeas } from './data/seoIdeas';
import { affiliateProducts } from './data/affiliateProducts';

// Subcomponents
import { RecipeDetail } from './components/RecipeDetail';
import { MealPlanner } from './components/MealPlanner';
import { WeightLossCalc } from './components/WeightLossCalc';
import { SeoIndexingPortal } from './components/SeoIndexingPortal';
import { EmailSequenceSimulator } from './components/EmailSequenceSimulator';
import { AffiliateShop } from './components/AffiliateShop';
import { AdSenseBlock } from './components/AdSenseBlock';
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
  Scale,
  Sparkles,
  ChevronRight,
  Send,
  ShieldAlert,
  HelpCircle,
  Play,
  ArrowUpRight,
  Pin,
  Lock,
  Mail,
  ShoppingBag,
  ExternalLink,
  BookOpen,
  Info,
  ArrowLeft,
  Heart,
  ThumbsUp
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [blogSubTab, setBlogSubTab] = useState<'recipes' | 'articles' | 'calculator'>('recipes');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [adsEnabled, setAdsEnabled] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Newsletter Subtitle Hook
  const [optInEmail, setOptInEmail] = useState<string>('');
  const [isOptedIn, setIsOptedIn] = useState<boolean>(false);
  
  // Contact Form Header Hooks
  const [contactName, setContactName] = useState<string>('');
  const [contactMsg, setContactMsg] = useState<string>('');
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);

  // Blog Community Likes State
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

  const handleNavigateToTab = (tab: string, subtab?: 'recipes' | 'articles' | 'calculator') => {
    setActiveTab(tab);
    setSelectedRecipeId(null);
    setSelectedPostId(null);
    if (subtab) {
      setBlogSubTab(subtab);
    }
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
    setActiveTab('blog');
    setBlogSubTab('recipes');
  };

  const handlePostClick = (id: string) => {
    setSelectedPostId(id);
    setSelectedRecipeId(null);
    setActiveTab('blog');
    setBlogSubTab('articles');
  };

  const handleOptIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (optInEmail) {
      setIsOptedIn(true);
      // Auto move user to seeing the automated email sequence as demonstration
      setTimeout(() => {
        setActiveTab('home'); // or keep it
      }, 1500);
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

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#1F1F1F] font-sans selection:bg-[#3CB371]/20 selection:text-emerald-950 flex flex-col justify-between">
      
      {/* MONETIZATION GLOBAL CONTROL STRIP */}
      <div className="bg-[#1F1F1F] text-[#FFF8F0] py-2 px-4 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono border-b border-[#FFF8F0]/10 gap-1.5 z-50 uppercase tracking-wider">
        <div className="flex items-center gap-1.5 text-stone-300">
          <span className="w-1.5 h-1.5 bg-[#3CB371] rounded-full animate-ping"></span>
          <span>Publisher Audit Suite:</span>
          <span className="text-[#FFA94D] font-bold">Healthy Fix Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={adsEnabled}
              onChange={(e) => setAdsEnabled(e.target.checked)}
              className="rounded-xs border-[#FFF8F0]/20 bg-[#1F1F1F] text-[#3CB371] focus:ring-none cursor-pointer"
            />
            <span className={adsEnabled ? 'text-[#3CB371] font-bold' : 'text-stone-400'}>
              {adsEnabled ? 'AdSense Active' : 'AdSense Muted'}
            </span>
          </label>
          <span className="text-[#FFF8F0]/20">|</span>
          <button
            onClick={() => { setActiveTab('seo-suite'); setSelectedRecipeId(null); setSelectedPostId(null); }}
            className="text-[#FFA94D] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-amber-400" /> Sitemaps &amp; Schemas
          </button>
        </div>
      </div>

      {/* COMPACT ADSENSE LEADERBOARD IN HEADER */}
      {adsEnabled && (
        <div className="bg-[#FFF8F0] border-b border-[#1F1F1F]/10 max-w-7xl mx-auto w-full px-4 overflow-hidden">
          <AdSenseBlock slot="top-banner" visible={adsEnabled} />
        </div>
      )}

      {/* HEADER SECTION WITH CLOUDINARY LOGO */}
      <header className="bg-[#FFF8F0] border-b border-[#1F1F1F]/10 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-8 min-h-[5.5rem] py-3 flex items-center justify-between gap-6">
          {/* Logo brand */}
          <button
            onClick={() => { setActiveTab('home'); setSelectedRecipeId(null); setSelectedPostId(null); }}
            className="flex items-center gap-3 shrink-0 focus:outline-none cursor-pointer group"
          >
            <img
              src="https://res.cloudinary.com/dmy2yiax9/image/upload/v1781141120/HEALTHY-removebg-preview_nwygi0.png"
              alt="Healthy Fix Official Logo"
              className="h-20 md:h-26 object-contain transition-transform duration-300 md:group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="text-left hidden xs:block">
              <span className="text-2xl md:text-3xl font-serif font-black tracking-tight uppercase italic block leading-none text-[#1F1F1F]">
                Healthy Fix
              </span>
              <span className="text-[10px] md:text-xs font-bold text-[#3CB371] uppercase tracking-[0.2em] block mt-1 font-sans">
                weight loss &amp; muscle diet
              </span>
            </div>
          </button>

          {/* Nav items */}
          <nav className="hidden lg:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1F1F1F]">
            {[
              { id: 'home', name: 'Home' },
              { id: 'meal-plans', name: 'Meal Plans' },
              { id: 'blog', name: 'Blog & Resources' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedRecipeId(null);
                  setSelectedPostId(null);
                }}
                className={`px-3 py-2 border-b-2 transition-all cursor-pointer ${
                  activeTab === tab.id && !selectedRecipeId && !selectedPostId
                    ? 'border-[#FFA94D] text-[#1F1F1F] font-black'
                    : 'border-transparent text-[#1F1F1F]/60 hover:text-[#1F1F1F] hover:border-[#3CB371]/40'
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
              className="hidden sm:inline-flex bg-[#3CB371] hover:bg-[#329e61] text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-none transition-all active:scale-95 cursor-pointer"
            >
              FREE 7-Day Plan
            </button>

            {/* Mobile burger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1F1F1F] hover:opacity-80 focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION DROPDOWN */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#1F1F1F]/10 bg-[#FFF8F0] py-4 px-6 space-y-2 animate-fade-in text-xs font-semibold uppercase tracking-widest">
            {[
              { id: 'home', name: 'Home' },
              { id: 'meal-plans', name: 'Meal Plans' },
              { id: 'blog', name: 'Blog & Resources' },
              { id: 'seo-suite', name: 'SEO Indexing Suite' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedRecipeId(null);
                  setSelectedPostId(null);
                }}
                className={`w-full text-left py-2.5 px-4 rounded-none transition-all cursor-pointer block ${
                  activeTab === tab.id
                    ? 'border-l-4 border-[#FFA94D] bg-[#1F1F1F]/5 text-[#1F1F1F] font-bold'
                    : 'text-[#1F1F1F]/75 hover:bg-[#1F1F1F]/5'
                }`}
              >
                {tab.name}
              </button>
            ))}
            <div className="pt-2 border-t border-[#1F1F1F]/10 mt-2">
              <button
                onClick={() => { setMobileMenuOpen(false); setAdsEnabled(!adsEnabled); }}
                className="w-full text-left py-2 px-4 rounded-none border border-dashed border-[#1F1F1F]/20 text-[#FFA94D] font-mono font-bold"
              >
                AdSense Simulation: {adsEnabled ? 'Active' : 'Disabled'}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* CENTRAL SWITCHBOARD ROUTING FOR CONTENT PANELS */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
        
        {/* HOMEPAGE VIEW ENTRY BOARD */}
        {activeTab === 'home' && !activeRecipe && !activePost && (
          <div className="space-y-12">
            
            {/* BRAND COVER FEATURED STORY (MAGAZINE HERO) */}
            <div className="border border-[#1F1F1F]/15 bg-[#FFF8F0] rounded-none p-6 md:p-10 relative overflow-hidden flex flex-col lg:flex-row gap-8 items-center">
              <div className="absolute right-0 top-0 w-32 h-32 bg-[#FFA94D]/5 rounded-bl-full pointer-events-none"></div>
              
              {/* Cover Details */}
              <div className="flex-1 space-y-4 text-left z-10">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#3CB371] font-black bg-[#3CB371]/10 border border-[#3CB371]/20 px-2.5 py-1 uppercase rounded-none">
                    ★ Editorial Niche Science
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-[#FFA94D] bg-[#1F1F1F] px-2 py-0.5 uppercase text-stone-100 font-extrabold">
                    Pin Pick
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-serif font-black leading-tight tracking-tight text-[#1F1F1F]">
                  Cottage Cheese: The <span className="italic font-normal">Forgotten</span> Gym Superfood to Fast-Track Recomp
                </h1>

                <p className="text-stone-600 text-xs md:text-sm leading-relaxed max-w-xl font-sans">
                  Is cottage cheese the ultimate weight loss cheat code? Learn why modern fitness experts are completely obsessed with slow-digesting casein curds and how to easily blend them into a silky, luxurious cheese sauce that trims 500+ calories from pasta dinners. 
                </p>

                <div className="flex items-center gap-3.5 text-[10px] font-mono text-stone-400 font-bold uppercase tracking-wider">
                  <span>BY ELENA VASQUEZ</span>
                  <span>•</span>
                  <span>4 MIN READ</span>
                  <span>•</span>
                  <button 
                    onClick={() => handleToggleLike('the-truth-about-cottage-cheese')}
                    className="text-[#3CB371] hover:underline flex items-center gap-0.5 font-bold cursor-pointer"
                  >
                    <Heart className={`w-3 h-3 ${likedItems['the-truth-about-cottage-cheese'] ? 'fill-[#3CB371] text-[#3CB371]' : ''}`} />
                    <span>{likeCounts['the-truth-about-cottage-cheese']} hearts</span>
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handlePostClick('the-truth-about-cottage-cheese')}
                    className="bg-[#1F1F1F] hover:bg-[#3CB371] text-white text-[11px] font-bold uppercase tracking-widest py-3 px-6 rounded-none transition-all cursor-pointer inline-flex items-center gap-1"
                  >
                    Read Cover Story <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Cover Styled Frame Graphic */}
              <div className="shrink-0 relative z-10 w-full lg:w-80 h-64 bg-white border border-[#1F1F1F]/10 p-3 shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800&auto=format&fit=crop"
                  alt="Healthy food with cottage cheese dressing"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute -bottom-3 right-4 bg-[#FFA94D] text-[#1F1F1F] text-[9px] font-mono font-extrabold uppercase px-2.5 py-1 tracking-widest transform rotate-2 shadow-sm">
                  10,400+ Saves
                </span>
              </div>
            </div>

            {/* DUAL-COLUMN BLOG PORTAL GRIDS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* PRIMARY LEFT SIDE COLUMN FEED (8/12) */}
              <div className="lg:col-span-8 space-y-10">
                
                {/* A. RECENT FRESH RECIPES */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-[#1F1F1F]/10 pb-3">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest font-bold text-[#3CB371] uppercase block">
                        Fresh From Elena's Kitchen
                      </span>
                      <h2 className="text-2xl md:text-3xl font-serif font-black italic text-[#1F1F1F] mt-0.5">
                        Metabolism-Boosting Recipes
                      </h2>
                    </div>
                    <button
                      onClick={() => handleNavigateToTab('blog', 'recipes')}
                      className="text-[10px] font-mono tracking-widest font-black text-[#3CB371] hover:underline flex items-center uppercase"
                    >
                      Browse Archive + ({recipes.length})
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recipes.slice(0, 4).map((recipe) => (
                      <div
                        key={recipe.id}
                        className="bg-white border border-[#1F1F1F]/10 rounded-none overflow-hidden hover:border-[#3CB371]/50 transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div onClick={() => handleRecipeClick(recipe.id)} className="cursor-pointer">
                          <div className="relative aspect-video w-full bg-[#FFF8F0]/50 overflow-hidden border-b border-[#1F1F1F]/10">
                            <img
                              src={recipe.image}
                              alt={recipe.title}
                              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute left-3 top-3 bg-white text-[8px] uppercase font-mono tracking-widest font-extrabold px-2 py-1 rounded-none text-[#3CB371] border border-[#1F1F1F]/10">
                              {recipe.category.replace('-', ' ')}
                            </span>
                            <span className="absolute right-3 top-3 bg-[#1F1F1F] text-[9px] font-bold text-white px-2 py-0.5 rounded-none font-mono">
                              {recipe.calories} kcal
                            </span>
                          </div>
                          
                          <div className="p-5 text-left space-y-1.5">
                            <h3 className="text-base font-serif font-bold italic leading-snug text-[#1F1F1F] group-hover:text-[#3CB371] transition-all">
                              {recipe.title}
                            </h3>
                            <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                              {recipe.description}
                            </p>
                          </div>
                        </div>

                        {/* Interactive footer card */}
                        <div className="px-5 pb-4 pt-3 border-t border-[#1F1F1F]/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                          <button
                            onClick={() => handleToggleLike(recipe.id)}
                            className="flex items-center gap-1.5 hover:text-rose-500 font-bold cursor-pointer text-[10px] uppercase tracking-wider"
                          >
                            <Heart className={`w-3.5 h-3.5 ${likedItems[recipe.id] ? 'fill-rose-500 text-rose-500' : 'text-gray-400 group-hover:text-rose-500 animate-pulse'}`} />
                            <span>{likeCounts[recipe.id] || 0} Likes</span>
                          </button>
                          
                          <button
                            onClick={() => handleRecipeClick(recipe.id)}
                            className="text-[#3CB371] font-bold group-hover:underline flex items-center gap-0.5 uppercase tracking-widest text-[9px] cursor-pointer"
                          >
                            Scale Recipe →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AD BETWEEN SECTIONS */}
                <AdSenseBlock slot="content-middle" visible={adsEnabled} />

                {/* B. SCIENCE & LIFESTYLE ARTICLES FEED */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-[#1F1F1F]/10 pb-3">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest font-bold text-[#FFA94D] uppercase block">
                        Scientific Methodology
                      </span>
                      <h2 className="text-2xl md:text-3xl font-serif font-black italic text-[#1F1F1F] mt-0.5">
                        Deep Niche Lifestyle Reads
                      </h2>
                    </div>
                    <button
                      onClick={() => handleNavigateToTab('blog', 'articles')}
                      className="text-[10px] font-mono tracking-widest font-black text-[#FFA94D] hover:underline flex items-center uppercase"
                    >
                      All Articles + (4)
                    </button>
                  </div>

                  {/* Vertically stacked full layout articles */}
                  <div className="space-y-6">
                    {blogPosts.filter(p => p.id !== 'the-truth-about-cottage-cheese').map((post) => (
                      <div
                        key={post.id}
                        className="bg-white border border-[#1F1F1F]/10 rounded-none overflow-hidden flex flex-col md:flex-row group hover:border-[#3CB371]/40 transition-colors"
                      >
                        {/* Thumbnail */}
                        <div 
                          onClick={() => handlePostClick(post.id)}
                          className="md:w-2/5 aspect-video md:aspect-square shrink-0 bg-stone-100 overflow-hidden cursor-pointer"
                        >
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Summary details */}
                        <div className="p-5 flex flex-col justify-between flex-1 text-left space-y-3">
                          <div onClick={() => handlePostClick(post.id)} className="cursor-pointer space-y-1.5">
                            <div className="flex items-center gap-2 text-[9px] font-mono font-bold text-stone-400">
                              <span className="text-[#3CB371] uppercase tracking-wide">
                                #{post.category}
                              </span>
                              <span>•</span>
                              <span>{post.readTime}</span>
                            </div>
                            
                            <h3 className="text-lg font-serif font-black italic tracking-tight text-[#1F1F1F] leading-snug group-hover:text-[#3CB371] transition-all">
                              {post.title}
                            </h3>
                            
                            <p className="text-xs text-stone-500 leading-relaxed max-w-md">
                              {post.excerpt}
                            </p>
                          </div>

                          {/* Footer details */}
                          <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 font-bold border-t border-dashed border-[#1F1F1F]/5 pt-3">
                            <button
                              onClick={() => handleToggleLike(post.id)}
                              className="flex items-center gap-1 hover:text-[#3CB371] text-[10px] uppercase tracking-wider cursor-pointer"
                            >
                              <Heart className={`w-3.5 h-3.5 ${likedItems[post.id] ? 'fill-[#3CB371] text-[#3CB371]' : 'text-stone-300'}`} />
                              <span>{likeCounts[post.id] || 0} Likes</span>
                            </button>

                            <button
                              onClick={() => handlePostClick(post.id)}
                              className="text-[#3CB371] hover:underline flex items-center gap-0.5 uppercase tracking-widest text-[9px] cursor-pointer"
                            >
                              Read Full Article →
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>



              {/* SIDEBAR RIGHT CONTAINER (4/12) */}
              <div className="lg:col-span-4 gap-8">
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

          </div>
        )}



        {/* MEAL PLANS MODULE */}
        {activeTab === 'meal-plans' && (
          <div className="space-y-8 animate-fade-in text-left">
            <MealPlanner />
          </div>
        )}



        {/* EMAIL FUNNEL SIMULATOR */}
        {activeTab === 'email-funnel' && (
          <div className="space-y-8 animate-fade-in text-left">
            <EmailSequenceSimulator />
          </div>
        )}



        {/* SEO INDEXING PORTAL */}
        {activeTab === 'seo-suite' && (
          <div className="space-y-8 animate-fade-in text-left">
            <SeoIndexingPortal />
            
            {/* 50 SEO NICHE IDEAS SEARCHABLE LIST */}
            <div className="bg-white rounded-none border border-[#1F1F1F]/10 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#1F1F1F]/10">
                <div>
                  <span className="text-xs font-bold tracking-widest text-[#FFA94D] uppercase">Content Strategy Blueprint</span>
                  <h2 className="text-3xl font-serif font-bold italic text-[#1F1F1F] mt-1">
                    50 High-Converting SEO Niche Ideas
                  </h2>
                </div>
                <div className="text-[10px] font-mono text-stone-400 uppercase tracking-widest font-bold">
                  Niche: Healthy Food, Weight Loss, Meal Prep
                </div>
              </div>

              <p className="text-xs text-stone-600 mb-6 leading-relaxed">
                Here is our parsed search database containing the exact 50 niche keywords, custom post headlines, target Pinterest board, and optimized pin search intent guides matching food blogging monetizations. Use this as a map to build your organic traffic pipeline.
              </p>

              <div className="overflow-x-auto border border-[#1F1F1F]/10 rounded-none">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FFF8F0] border-b border-[#1F1F1F]/10 font-bold text-gray-700 font-mono text-[10px] tracking-wider uppercase">
                      <th className="p-3.5 text-center">ID</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Target SEO Keyword</th>
                      <th className="p-3.5">Optimized Title Headline</th>
                      <th className="p-3.5">Search Intent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seoIdeas.map((idea) => (
                      <tr key={idea.id} className="border-b border-[#1F1F1F]/5 hover:bg-stone-50 transition-colors">
                        <td className="p-3.5 text-center font-mono font-bold text-stone-400">{idea.id}</td>
                        <td className="p-3.5 font-sans font-bold text-gray-700">
                          <span className={`px-2 py-0.5 rounded-none text-[9px] uppercase font-mono tracking-widest ${
                            idea.category === 'Meal Prep' ? 'bg-indigo-50 border border-indigo-100 text-indigo-700' :
                            idea.category === 'Weight Loss' ? 'bg-[#FFA94D]/10 border border-amber-200/20 text-amber-800' :
                            idea.category === 'High Protein' ? 'bg-emerald-50 border border-emerald-100 text-emerald-800' :
                            'bg-pink-50 border border-pink-100 text-pink-700'
                          }`}>
                            {idea.category}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono text-[11px] text-[#3CB371] font-bold">{idea.keyword}</td>
                        <td className="p-3.5 font-serif text-gray-905 italic font-bold leading-snug">{idea.title}</td>
                        <td className="p-3.5">
                          <span className={`px-1.5 py-0.5 rounded-none text-[8px] font-mono tracking-widest uppercase font-black ${
                            idea.searchIntent === 'informational' ? 'bg-sky-50 text-sky-700 border border-sky-100' :
                            idea.searchIntent === 'commercial' ? 'bg-orange-50 text-amber-800 border border-amber-100' :
                            'bg-purple-50 text-purple-800 border border-purple-100'
                          }`}>
                            {idea.searchIntent}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* BLOG & RESOURCES CONSOLIDATED MODULE */}
        {activeTab === 'blog' && (
          <div className="space-y-8 animate-fade-in text-left">
            {/* Unified Blog & Tools Header Display - only on main directories, hidden on details */}
            {!activeRecipe && !activePost && (
              <div className="bg-[#FFF8F0] rounded-none border border-[#1F1F1F]/10 p-6 md:p-8 text-center max-w-4xl mx-auto shadow-2xs">
                <span className="text-xs font-bold tracking-widest text-[#3CB371] uppercase">Educational Reading &amp; Tools Directory</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold italic text-gray-900 tracking-tight mt-1 leading-tight">
                  Blog, Recipes &amp; Calorie Planning
                </h2>
                <p className="text-xs text-stone-500 max-w-xl mx-auto mt-2 leading-relaxed font-sans mb-6">
                  Explore our metabolism-boosting calorie-accurate guides, customizable recipes, and protein deficit calculations tailored for sustainable biological fat loss.
                </p>

                {/* Pill Subtabs Switcher */}
                <div className="flex flex-wrap items-center justify-center gap-2 border-t border-[#1F1F1F]/10 pt-6">
                  {[
                    { subId: 'recipes', name: '🍳 Meal Recipes' },
                    { subId: 'articles', name: '📰 Lifestyle Articles' },
                    { subId: 'calculator', name: '🎛️ Deficit Calculator' },
                  ].map((sub) => (
                    <button
                      key={sub.subId}
                      onClick={() => {
                        setBlogSubTab(sub.subId as any);
                        setSelectedRecipeId(null);
                        setSelectedPostId(null);
                      }}
                      className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        blogSubTab === sub.subId
                          ? 'bg-[#1F1F1F] text-white font-black hover:brightness-110'
                          : 'bg-white text-[#1F1F1F] border border-[#1F1F1F]/10 hover:border-[#1F1F1F]'
                      }`}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Subtab Panel 1: Meal Recipes */}
            {blogSubTab === 'recipes' && (
              <div className="space-y-8">
                {activeRecipe ? (
                  <RecipeDetail recipe={activeRecipe} onBack={() => setSelectedRecipeId(null)} adsEnabled={adsEnabled} />
                ) : (
                  <>
                    <div className="flex justify-between items-center max-w-4xl mx-auto">
                      <span className="text-xs font-mono font-bold uppercase text-stone-400 tracking-widest">
                        Currently index: {recipes.length} metabolism-boosting dishes
                      </span>
                    </div>

                    {/* Search Field */}
                    <div className="relative max-w-md mx-auto">
                      <input
                        type="text"
                        placeholder="Search recipes, keywords, or macro targets (e.g. cottage cheese)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-[#1F1F1F]/25 rounded-none py-3 pl-11 pr-4 text-xs text-[#1F1F1F] placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#3CB371]"
                      />
                      <Search className="w-4 h-4 text-stone-400 absolute left-4 top-3.5" />
                    </div>

                    <AdSenseBlock slot="content-top" visible={adsEnabled} />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {recipes.filter(r => 
                        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        r.seoKeywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
                      ).map((recipe) => (
                        <div
                          key={recipe.id}
                          onClick={() => handleRecipeClick(recipe.id)}
                          className="bg-white rounded-none border border-[#1F1F1F]/10 overflow-hidden hover:border-[#3CB371]/60 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                        >
                          <div>
                            <div className="relative aspect-video w-full bg-[#FFF8F0]/50 overflow-hidden border-b border-[#1F1F1F]/10">
                              <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                referrerPolicy="no-referrer"
                              />
                              <span className="absolute left-3 top-3 bg-white text-[9px] uppercase font-mono tracking-widest font-extrabold px-2 py-1 rounded-none text-[#3CB371] border border-[#1F1F1F]/10 shadow-3xs">
                                {recipe.category.replace('-', ' ')}
                              </span>
                              <span className="absolute right-3 top-3 bg-[#1F1F1F] text-[10px] font-bold text-white px-2.5 py-1 rounded-none font-mono">
                                {recipe.calories} kcal
                              </span>
                            </div>
                            <div className="p-5">
                              <h3 className="text-lg font-serif font-bold italic leading-tight text-gray-900 group-hover:text-[#3CB371] transition-all">
                                {recipe.title}
                              </h3>
                              <p className="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed">
                                {recipe.description}
                              </p>
                            </div>
                          </div>

                          <div className="px-5 pb-5 pt-3 border-t border-[#1F1F1F]/10 flex items-center justify-between text-[11px] font-mono text-gray-500">
                            <span className="flex items-center gap-1 font-semibold uppercase tracking-wider">
                              <Flame className="w-3.5 h-3.5 text-[#FFA94D]" /> {recipe.macros.protein}g protein
                            </span>
                            <span className="text-[#3CB371] font-bold group-hover:underline flex items-center gap-0.5 uppercase tracking-widest text-[9px]">
                              Cook &amp; Scale <ArrowUpRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <AdSenseBlock slot="content-end" visible={adsEnabled} />
                  </>
                )}
              </div>
            )}

            {/* Subtab Panel 2: Lifestyle Articles */}
            {blogSubTab === 'articles' && (
              <div className="space-y-8">
                {activePost ? (
                  <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-fade-in text-left relative">
                    
                    {/* Fixed thin reading progress indicator */}
                    <div className="fixed top-0 left-0 w-full h-[4px] bg-[#FFF8F0]/30 z-[100] pointer-events-none">
                      <div 
                        className="h-full bg-[#3CB371] transition-all duration-75"
                        style={{ width: `${scrollPercent}%` }}
                      ></div>
                    </div>

                    {showShareToast && (
                      <div className="fixed bottom-6 right-6 bg-[#1F1F1F] text-[#FFF8F0] px-4 py-3 border border-[#FFF8F0]/10 z-[100] shadow-2xl flex items-center gap-2 font-mono text-[10px] uppercase font-bold animate-fade-in animate-pulse">
                        <Sparkles className="w-4 h-4 text-[#FFA94D]" /> Link copied! Ready for Pinterest!
                      </div>
                    )}

                    <button
                      onClick={() => setSelectedPostId(null)}
                      className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 font-semibold text-xs tracking-wider uppercase cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4 text-[#3CB371]" /> Return to Articles Directory
                    </button>

                    <div className="bg-white rounded-none border border-[#1F1F1F]/10 p-6 md:p-8">
                      <div className="relative aspect-video w-full rounded-none overflow-hidden bg-stone-50 mb-6 border border-[#1F1F1F]/10">
                        <img src={activePost.image} alt={activePost.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2 flex-wrap text-[10px] font-mono font-bold text-stone-400">
                          <span className="bg-[#3CB371]/10 text-[#3CB371] px-2.5 py-1 rounded-none border border-[#3CB371]/20 uppercase tracking-wider font-extrabold">
                            {activePost.category}
                          </span>
                          <span>|</span>
                          <span>BY {activePost.author.toUpperCase()}</span>
                          <span>|</span>
                          <span>PUBLISHED {activePost.date.toUpperCase()}</span>
                          <span>|</span>
                          <span>{activePost.readTime.toUpperCase()}</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-serif font-extrabold italic tracking-tight text-[#1F1F1F] leading-tight">
                          {activePost.title}
                        </h1>

                        {/* Interactive Share / Like Substory Bar */}
                        <div className="flex items-center justify-between border-y border-[#1F1F1F]/10 py-3 mt-4 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest bg-stone-50/50 px-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleToggleLike(activePost.id)}
                              className={`flex items-center gap-1.5 cursor-pointer transition-all ${likedItems[activePost.id] ? 'text-rose-500 font-extrabold' : 'text-gray-500 hover:text-rose-500'}`}
                            >
                              <Heart className={`w-3.5 h-3.5 ${likedItems[activePost.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                              <span>Like Post ({likeCounts[activePost.id] || 0})</span>
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleCopyLink(activePost.slug)}
                              className="flex items-center gap-1 hover:text-[#3CB371] cursor-pointer"
                            >
                              <Share2 className="w-3.5 h-3.5" /> Copy Link
                            </button>
                            <span>|</span>
                            <a
                              href="https://www.pinterest.com/healthyfitfix"
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1 hover:text-[#E60023] text-stone-500 uppercase cursor-pointer"
                            >
                              <Pin className="w-3.5 h-3.5" /> Repin It
                            </a>
                          </div>
                        </div>
                        
                        <p className="text-stone-600 font-serif text-sm font-medium italic border-l-3 border-[#FFA94D] pl-4 text-xs tracking-normal leading-relaxed">
                          {activePost.excerpt}
                        </p>

                        <AdSenseBlock slot="content-top" visible={adsEnabled} />

                        {/* Markdown Layout Parser */}
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
                                <h3 key={idx} className="text-xs font-mono font-black text-gray-905 uppercase tracking-widest pt-4 flex items-center gap-1.5">
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
                                <div key={idx} className="my-6 bg-[#FFF8F0] font-mono text-center p-4 border border-[#1F1F1F]/10 rounded-none text-gray-850 overflow-x-auto font-bold text-xs uppercase tracking-wider">
                                  {para.replace(/\$\$/g, '').trim()}
                                </div>
                              );
                            }
                            return <p key={idx} className="leading-relaxed font-sans text-stone-600">{para}</p>;
                          })}
                        </div>

                        <AdSenseBlock slot="content-middle" visible={adsEnabled} />

                        {/* Tag list */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-6 border-t border-dashed border-[#1F1F1F]/15 mt-8">
                          <span className="text-[10px] font-mono font-bold text-stone-400 uppercase mr-1">Tuned Tags:</span>
                          {activePost.tags.map((tag) => (
                            <span key={tag} className="text-[10px] font-mono font-bold bg-[#FFF8F0] text-stone-600 px-2.5 py-0.5 border border-[#1F1F1F]/10 rounded-none uppercase">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Coach bio footer */}
                        <div className="mt-8 bg-[#FFF8F0] border border-[#1F1F1F]/10 p-5 flex flex-col md:flex-row gap-4 items-center">
                          <img
                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop"
                            alt="Elena Vasquez portrait"
                            className="w-14 h-14 rounded-full object-cover border border-[#3CB371] shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="text-left space-y-1 flex-1">
                            <h4 className="font-serif font-bold italic text-xs text-[#1F1F1F]">Written by Chef Coach Elena Vasquez</h4>
                            <p className="text-[11px] text-stone-500 leading-normal font-sans">
                              Elena is an avid health coach, recipe creator and food blogger. She spent 6 years in biometric food analysis before founding the Healthy Fix blog, where she publishes daily meal prep hacks designed safely for fat loss and active recompositions.
                            </p>
                          </div>
                        </div>

                        {/* Intelligent Related Recipe Connection (Matchmaker) */}
                        {(() => {
                          let relatedRecipeId = '';
                          if (activePost.id === 'the-truth-about-cottage-cheese') relatedRecipeId = 'cottage-cheese-alfredo';
                          else if (activePost.id === 'how-to-start-meal-prepping') relatedRecipeId = 'garlic-herb-chicken-meal-prep';
                          else if (activePost.id === 'non-toxic-kitchenware-essentials') relatedRecipeId = 'garlic-herb-chicken-meal-prep';
                          else if (activePost.id === 'how-many-grams-of-protein') relatedRecipeId = 'lemon-garlic-shrimp-asparagus';

                          const matchedRecipe = recipes.find(r => r.id === relatedRecipeId);
                          if (!matchedRecipe) return null;

                          return (
                            <div className="my-8 bg-[#3CB371]/5 border border-[#3CB371]/20 p-5 md:p-6 text-left space-y-4">
                              <span className="text-[8px] font-mono tracking-widest text-[#3CB371] font-bold uppercase block">
                                ★ Recipe Matchmaker Connection ★
                              </span>
                              <div className="flex flex-col sm:flex-row gap-5 items-center">
                                <img
                                  src={matchedRecipe.image}
                                  alt={matchedRecipe.title}
                                  className="w-full sm:w-32 h-24 object-cover border border-[#1F1F1F]/10 shrink-0"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="flex-1 space-y-1">
                                  <h4 className="font-serif font-black italic text-sm text-gray-950">
                                    Make it at home! {matchedRecipe.title}
                                  </h4>
                                  <p className="text-[11px] text-stone-500 leading-relaxed font-sans">
                                    Inspired by this article? Cook Elena's calorie-accurate, high-protein recipe tonight! Only {matchedRecipe.calories} calories with {matchedRecipe.macros.protein}g protein.
                                  </p>
                                  <button
                                    onClick={() => { setActiveTab('blog'); setBlogSubTab('recipes'); handleRecipeClick(matchedRecipe.id); }}
                                    className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-[#3CB371] hover:underline uppercase pt-1 cursor-pointer"
                                  >
                                    View cooking steps &amp; scale ingredients →
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })()}

                      </div>
                    </div>

                    {/* Interactive readers dialog roundtable comments */}
                    <CommentsBlock contentId={activePost.id} contentType="article" />

                    <AdSenseBlock slot="content-end" visible={adsEnabled} />
                  </div>
                ) : (
                  <>
                    <AdSenseBlock slot="content-top" visible={adsEnabled} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                      {blogPosts.map((post) => (
                        <div
                          key={post.id}
                          onClick={() => handlePostClick(post.id)}
                          className="bg-white rounded-none border border-[#1F1F1F]/10 overflow-hidden hover:border-[#3CB371] hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                        >
                          <div className="aspect-video w-full bg-stone-50 overflow-hidden border-b border-[#1F1F1F]/10">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="p-6 flex flex-col justify-between flex-1 space-y-3">
                            <div>
                              <span className="text-[9px] font-mono font-bold text-stone-400 uppercase tracking-widest block mb-1">
                                BY {post.author.toUpperCase()} • {post.date}
                              </span>
                              <h3 className="text-lg font-serif font-bold italic tracking-tight text-[#1F1F1F] group-hover:text-[#3CB371] leading-tight transition-all">
                                {post.title}
                              </h3>
                              <p className="text-xs text-stone-500 line-clamp-2 mt-2 leading-relaxed font-sans">
                                {post.excerpt}
                              </p>
                            </div>

                            <div className="flex justify-between items-center text-[9px] font-mono text-stone-400 pt-3 border-t border-dashed border-[#1F1F1F]/10 font-black uppercase tracking-widest">
                              <span>{post.readTime}</span>
                              <span className="text-[#3CB371] flex items-center gap-0.5 group-hover:underline font-bold">
                                Read post <ChevronRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <AdSenseBlock slot="content-end" visible={adsEnabled} />
                  </>
                )}
              </div>
            )}

            {/* Subtab Panel 3: Deficit Calculator */}
            {blogSubTab === 'calculator' && (
              <div className="max-w-4xl mx-auto">
                <WeightLossCalc />
              </div>
            )}
          </div>
        )}



        {/* PRIVACY POLICY PAGE SUMMARY */}
        {activeTab === 'privacy-policy' && (
          <div className="max-w-3xl mx-auto bg-white rounded-none border border-[#1F1F1F]/10 p-6 md:p-10 space-y-6 text-left font-sans text-xs">
            <span className="text-[10px] font-mono tracking-widest text-[#3CB371] uppercase font-bold">Regulatory Compliancy Card</span>
            <h2 className="text-3xl font-serif font-bold italic text-gray-950 tracking-tight leading-none mt-1">Privacy Disclosures</h2>
            <p className="text-stone-400 font-mono text-[10px]">Last updated: June 11, 2026</p>

            <div className="space-y-4 text-stone-600 leading-relaxed divide-y divide-[#1F1F1F]/10">
              <div className="pt-2">
                <h3 className="text-sm font-bold text-[#1F1F1F] mb-1 leading-snug">1. Introduction to Privacy Scope</h3>
                <p>
                  At <strong>Healthy Fix</strong>, we respect your confidentiality. This documents how we process emails, cookies, and traffic metrics gathered via opt-in sheets or active browsers. We do not sell or lease user vectors to any external companies.
                </p>
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-bold text-[#1F1F1F] mb-1 leading-snug">2. Google AdSense Cookie Disclosures</h3>
                <p>
                  We compile ads via Google AdSense. In order to render contextualized, safe ads, Google uses DART cookies to customize banners based on user clicks on Healthy Fix and other sites. You may choose to opt out of the DART cookie vectors by verifying the Google Ad privacy parameters.
                </p>
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-bold text-[#1F1F1F] mb-1 leading-snug">3. Affiliate Tracking Policy</h3>
                <p>
                  We are standard participants in Amazon Services LLC Associates Program. If you click on Amazon links nested on the Affiliate Shop pages, custom cookie trackers carry a secure affiliate identifier block for a 24-hour duration to award commissions on checkout.
                </p>
              </div>

              <div className="pt-4 font-mono text-[10px] uppercase tracking-wider font-extrabold text-[#3CB371]">
                <span>✓ Privacy Compliance Verified for AdSense Core Audits</span>
              </div>
            </div>
          </div>
        )}

        {/* DISCLAIMER PAGE REPORT */}
        {activeTab === 'disclaimer' && (
          <div className="max-w-3xl mx-auto bg-white rounded-none border border-[#1F1F1F]/10 p-6 md:p-10 space-y-6 text-left font-sans text-xs">
            <span className="text-[10px] font-mono tracking-widest text-[#FFA94D] uppercase font-bold">FTC &amp; Health Legalities</span>
            <h2 className="text-3xl font-serif font-bold italic text-gray-950 tracking-tight leading-none mt-1">Niche Disclaimers</h2>
            <p className="text-stone-400 font-mono text-[10px]">Last updated: June 11, 2026</p>

            <div className="space-y-4 text-stone-600 leading-relaxed divide-y divide-[#1F1F1F]/10">
              <div className="pt-2">
                <h3 className="text-sm font-bold text-[#1F1F1F] mb-1 leading-snug">1. Professional Health Disclaimer</h3>
                <p>
                  The nutrition calculations, TDEE, BMR estimations, deficit recommendations, and high protein meal prep outlines present on <strong>Healthy Fix</strong> are intended strictly for educational metrics. Elena Vasquez is not a medical doctor, registered dietician, or clinical physician. Cooking, eating, or dieting guidelines must be authorized by your primary healthcare supervisor.
                </p>
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-bold text-[#1F1F1F] mb-1 leading-snug">2. Affiliate Partnership Disclosures</h3>
                <p>
                  Under compliance with Federal Trade Commission (FTC) lines, please expect that certain links on this food blog are affiliate links. If clicked to complete a commercial purchase, Healthy Fix receives a percentage commission. This funds our testing kitchen and keeps our content core free to access!
                </p>
              </div>

              <div className="pt-4 font-mono text-[10px] uppercase tracking-wider font-extrabold text-[#FFA94D]">
                <span>⚠️ FTC Disclosure compliant markers loaded</span>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT MODAL OR TAB */}
        {activeTab === 'contact' && (
          <div className="max-w-2xl mx-auto bg-white rounded-none border border-[#1F1F1F]/10 p-6 md:p-8 space-y-6 text-left font-sans">
            <div className="text-center pb-4 border-b border-[#1F1F1F]/10">
              <span className="text-xs font-bold tracking-widest text-[#3CB371] uppercase">Let’s Connect</span>
              <h2 className="text-3xl font-serif font-bold italic text-gray-950 mt-1 leading-tight">Get in Touch with Elena</h2>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Have questions about a recipe, meal plan customizability, or Pinterest growth partnerships? Reach out below!
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-gray-700 uppercase mb-1">Your Name</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="E.g., Julie Finch"
                    className="w-full bg-white border border-[#1F1F1F]/25 rounded-none p-3 focus:outline-none focus:ring-1 focus:ring-[#3CB371]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold text-gray-700 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="E.g., julie@domain.com"
                    className="w-full bg-white border border-[#1F1F1F]/25 rounded-none p-3 focus:outline-none focus:ring-1 focus:ring-[#3CB371]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-gray-700 uppercase mb-1">Select Inquiry Type</label>
                <select className="w-full bg-white border border-[#1F1F1F]/25 rounded-none p-3 focus:outline-none focus:ring-1 focus:ring-[#3CB371] cursor-pointer font-sans h-11">
                  <option>Recipe Help / Portion Adjustments</option>
                  <option>7-Day Meal plan PDF Retrieval</option>
                  <option>Pinterest Growth Partnership / Collaboration</option>
                  <option>Advertising / Sponsored Posts Reviews</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-gray-700 uppercase mb-1">Your Message</label>
                <textarea
                  rows={4}
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  placeholder="Tell me about your fitness goals..."
                  className="w-full bg-white border border-[#1F1F1F]/25 rounded-none p-3 focus:outline-none focus:ring-1 focus:ring-[#3CB371]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1F1F1F] hover:bg-[#3CB371] text-white py-3.5 px-6 rounded-none font-bold flex items-center justify-center gap-2 uppercase tracking-widest text-xs shadow-xs transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" /> Dispatch Message
              </button>
            </form>

            {contactSuccess && (
              <div className="bg-[#FFF8F0] text-stone-900 border border-[#1F1F1F]/15 text-xs font-semibold p-4 rounded-none text-center animate-fade-in">
                🎉 <strong>Thank you, {contactName || 'there'}!</strong> Your message has bypassed CRM routers and arrived safely inside Elena’s inbox. Please expect research feedbacks within 24 hours.
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
                className="h-20 md:h-24 object-contain invert brightness-0"
                referrerPolicy="no-referrer"
              />
              <div className="text-left font-serif">
                <span className="text-xl md:text-2xl font-black uppercase tracking-tight text-white block">HEALTHY FIX</span>
                <span className="text-[9px] font-mono tracking-widest text-[#3CB371] uppercase leading-none block font-bold">WEIGHT LOSS &amp; DIET</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              We provide clean, non-toxic high-protein recipes, interactive weight-loss deficit calculators, 7-day meal planners and Pinterest growth suites designed to empower modern busy fitness lives.
            </p>
            <div className="text-[10px] text-gray-500 font-mono tracking-tight pt-1">
              ESTABLISHED IN CO-OWNERSHIP WORKSPACE © 2026.
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-3 text-left">
            <h4 className="text-[11px] font-mono font-bold tracking-widest text-[#FFA94D] uppercase">
              Directory Pages
            </h4>
            <div className="flex flex-col gap-2 text-xs font-semibold text-gray-400">
              <button onClick={() => { setActiveTab('home'); setSelectedRecipeId(null); setSelectedPostId(null); }} className="hover:text-white text-left cursor-pointer">Homepage Index</button>
              <button onClick={() => { setActiveTab('blog'); setBlogSubTab('recipes'); setSelectedRecipeId(null); setSelectedPostId(null); }} className="hover:text-white text-left cursor-pointer">Recipes Archive</button>
              <button onClick={() => { setActiveTab('meal-plans'); setSelectedRecipeId(null); setSelectedPostId(null); }} className="hover:text-white text-left cursor-pointer">7-Day Meal Scheduler</button>
              <button onClick={() => { setActiveTab('blog'); setBlogSubTab('calculator'); setSelectedRecipeId(null); setSelectedPostId(null); }} className="hover:text-white text-left cursor-pointer">Deficit Calculator</button>
              <button onClick={() => { setActiveTab('blog'); setBlogSubTab('articles'); setSelectedRecipeId(null); setSelectedPostId(null); }} className="hover:text-white text-left cursor-pointer">Lifestyle Blog</button>
            </div>
          </div>

          {/* Legal disclaimers & contact links */}
          <div className="md:col-span-4 space-y-3 text-left">
            <h4 className="text-[11px] font-mono font-bold tracking-widest text-[#3CB371] uppercase">
              Growth &amp; Legitimacy Disclosures
            </h4>
            <div className="flex flex-col gap-2 text-xs font-semibold text-gray-400">
              <button onClick={() => { setActiveTab('contact'); setSelectedRecipeId(null); setSelectedPostId(null); }} className="hover:text-white text-left cursor-pointer">Get in Touch / Contact</button>
              <button onClick={() => { setActiveTab('privacy-policy'); setSelectedRecipeId(null); setSelectedPostId(null); }} className="hover:text-white text-left cursor-pointer">Google AdSense Privacy Policy</button>
              <button onClick={() => { setActiveTab('disclaimer'); setSelectedRecipeId(null); setSelectedPostId(null); }} className="hover:text-white text-left cursor-pointer">Affiliate &amp; Health Disclaimer</button>
            </div>

            {/* Pinterest Badge */}
            <div className="pt-2">
              <a
                href="https://www.pinterest.com/healthyfitfix"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#E60023] hover:bg-[#b8001c] text-white px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                <div className="w-4 h-4 rounded-full bg-white text-[#E60023] flex items-center justify-center font-bold text-xs font-serif leading-none">P</div>
                Follow on Pinterest
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM LEGAL Disclaimer Banner */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 border-t border-gray-850 mt-12 pt-8 text-center text-[10px] text-gray-500 leading-normal max-w-4xl space-y-2">
          <p>
            <strong>Medical Disclaimer:</strong> The calculations, target proteins, and wellness guides on healthyfix.com are for informational index purposes only. Healthy Fix is a participant in the Amazon Services LLC Associates Program. Google AdSense cookies assist in third-party contextual listings.
          </p>
          <p className="font-mono">
            Securely Compiled with React 19 &amp; Tailwind CSS v4 in developer container boundaries.
          </p>
        </div>
      </footer>

    </div>
  );
}
