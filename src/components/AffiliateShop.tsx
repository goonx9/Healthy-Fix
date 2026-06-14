import React, { useState } from 'react';
import { affiliateProducts } from '../data/affiliateProducts';
import { Star, CheckCircle, AlertTriangle, ExternalLink, ShoppingCart } from 'lucide-react';

interface AffiliateShopProps {
}

export const AffiliateShop: React.FC<AffiliateShopProps> = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'kitchen-tools' | 'containers' | 'fitness'>('all');
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  const filteredProducts = activeCategory === 'all'
    ? affiliateProducts
    : affiliateProducts.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-8">
      {/* Intro Hero */}
      <div className="bg-gradient-to-r from-cream via-white to-cream rounded-3xl border border-gray-150 p-6 md:p-8 text-center max-w-4xl mx-auto shadow-2xs">
        <span className="text-[10px] font-bold tracking-widest text-[#3CB371] bg-[#3CB371]/10 px-3 py-1 rounded-full uppercase inline-block mb-3">
          Tried &amp; Trusted Cookware &amp; Fitness Gear
        </span>
        <h2 className="text-2xl md:text-3xl font-sans font-medium tracking-tight text-gray-900 leading-tight">
          Elena&apos;s Non-Toxic Kitchen &amp; Fitness Shop
        </h2>
        <p className="text-sm text-stone-600 max-w-xl mx-auto mt-2 leading-relaxed">
          Unlike most blogs that review products they&apos;ve never touched, we purchase and torture-test every container, pan, and blender listed below. Zero PFAS, zero BPA, maximum longevity.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {[
            { id: 'all', name: 'Show All Products' },
            { id: 'kitchen-tools', name: 'Ceramic Cookware & Blenders' },
            { id: 'containers', name: 'Borosilicate Glass Storage' },
            { id: 'fitness', name: 'Smart Composition Scales' }
          ].map(tag => (
            <button
              key={tag.id}
              onClick={() => setActiveCategory(tag.id as any)}
              className={`text-xs px-4 py-2 rounded-xl border transition-all cursor-pointer font-semibold ${
                activeCategory === tag.id
                  ? 'bg-gray-900 border-gray-900 text-white shadow-xs'
                  : 'bg-white border-gray-250 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>
      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-3xl border border-gray-100/90 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            onMouseEnter={() => setHoveredProductId(p.id)}
            onMouseLeave={() => setHoveredProductId(null)}
          >
            <div>
              {/* Product Image and pricing label */}
              <div className="relative aspect-video w-full bg-gray-50 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute left-4 top-4 bg-gray-900/90 font-mono text-sm font-bold text-white px-3 py-1 rounded-lg backdrop-blur-xs">
                  {p.price}
                </span>
                <span className="absolute right-4 top-4 bg-[#FFF8F0]/95 font-sans text-xs font-semibold text-[#FFA94D] px-2.5 py-1 rounded-full border border-orange-100 flex items-center gap-1 shadow-sm font-mono">
                  <Star className="w-3.5 h-3.5 fill-[#FFA94D] text-[#FFA94D]" /> {p.rating} / 5
                </span>
              </div>

              {/* Product Details */}
              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#3CB371] uppercase font-bold">
                    {p.category.replace('-', ' ')} Recommendation
                  </span>
                  <h3 className="text-base font-medium tracking-tight text-gray-900 group-hover:text-[#3CB371] transition-all pt-1 leading-snug">
                    {p.name}
                  </h3>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed font-sans">{p.description}</p>

                {/* Pros and Cons lists */}
                <div className="space-y-2.5 pt-4 border-t border-gray-100">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-600 font-extrabold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 stroke-[2.5]" /> Why We Pure Love It:
                    </span>
                    <ul className="space-y-1">
                      {p.pros.map((pro, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-start gap-1.5 leading-relaxed font-sans pl-1">
                          <span className="text-emerald-500 text-[10px] mt-0.5">•</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-rose-500 font-extrabold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> What to Consider:
                    </span>
                    <ul className="space-y-1">
                      {p.cons.map((con, idx) => (
                        <li key={idx} className="text-xs text-gray-500 flex items-start gap-1.5 leading-relaxed font-sans pl-1">
                          <span className="text-rose-400 text-[10px] mt-0.5">•</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA action footer */}
            <div className="p-6 bg-gray-50/50 border-t border-gray-100/60 flex items-center justify-between gap-4">
              <span className="text-[10px] font-mono text-gray-400">
                Amazon ID: healthyfix-20
              </span>
              <a
                href={p.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1F1F1F] hover:bg-black text-white py-2.5 px-4 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm hover:shadow active:scale-95 transition-all text-center shrink-0 cursor-pointer"
              >
                <ShoppingCart className="w-3.5 h-3.5 text-[#FFA94D]" /> Amazon Review &amp; Price <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
