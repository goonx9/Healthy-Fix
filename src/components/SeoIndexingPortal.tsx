import React, { useState } from 'react';
import { recipes } from '../data/recipes';
import { Terminal, CheckCircle2, Copy, Eye, FileText, Globe } from 'lucide-react';

export const SeoIndexingPortal: React.FC = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [selectedRecipeId, setSelectedRecipeId] = useState(recipes[0].id);

  const activeRecipe = recipes.find(r => r.id === selectedRecipeId) || recipes[0];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const getSitemapXml = () => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Static Pages -->
  <url>
    <loc>https://healthyfix.com/</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://healthyfix.com/recipes</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://healthyfix.com/meal-plans</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://healthyfix.com/weight-loss-tips</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://healthyfix.com/blog</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Recipe Dynamic Details (Schema Ready) -->
${recipes.map(r => `  <url>
    <loc>https://healthyfix.com/recipes/${r.slug}</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;
  };

  const getRobotsTxt = () => {
    return `# Robots.txt for Healthy Fix Food Blog
User-agent: *
Allow: /
Allow: /recipes/
Allow: /blog/
Allow: /meal-plans/
Disallow: /admin/
Disallow: /checkout/success/

# SEO Sitemap Link
Sitemap: https://healthyfix.com/sitemap.xml`;
  };

  const getSchemaMarkup = () => {
    const macroString = `Protein: ${activeRecipe.macros.protein}g, Carbs: ${activeRecipe.macros.carbs}g, Fat: ${activeRecipe.macros.fat}g`;
    return `{
  "@context": "https://schema.org/",
  "@type": "Recipe",
  "name": "${activeRecipe.title}",
  "image": [
    "${activeRecipe.image}"
  ],
  "author": {
    "@type": "Person",
    "name": "Elena Vasquez"
  },
  "datePublished": "2026-06-11",
  "description": "${activeRecipe.description}",
  "prepTime": "PT${activeRecipe.prepTime}M",
  "cookTime": "PT${activeRecipe.cookTime}M",
  "totalTime": "PT${activeRecipe.prepTime + activeRecipe.cookTime}M",
  "recipeYield": "${activeRecipe.servings} servings",
  "recipeCategory": "${activeRecipe.category}",
  "nutrition": {
    "@type": "NutritionInformation",
    "calories": "${activeRecipe.calories} calories",
    "proteinContent": "${activeRecipe.macros.protein}g",
    "carbohydrateContent": "${activeRecipe.macros.carbs}g",
    "fatContent": "${activeRecipe.macros.fat}g"
  },
  "recipeIngredient": [
    ${activeRecipe.ingredients.map(i => `"${i.amount} ${i.unit} ${i.name}"`).join(',\n    ')}
  ],
  "recipeInstructions": [
    ${activeRecipe.directions.map((d, index) => `{
      "@type": "HowToStep",
      "text": "${d}"
    }`).join(',\n    ')}
  ]
}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
        <div>
          <span className="text-xs font-semibold tracking-widest text-[#3CB371] uppercase">SEO &amp; Indexing Suite</span>
          <h2 className="text-2xl font-sans font-medium tracking-tight text-gray-900 mt-1">Google Search Console Setup</h2>
        </div>
        <div className="flex items-center gap-2 bg-[#3CB371]/10 px-3 py-1.5 rounded-full">
          <Globe className="w-4 h-4 text-[#3CB371]" />
          <span className="text-xs font-medium text-[#3CB371]">Production Integration Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium tracking-tight text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#3CB371]" />
            Indexing Blueprint: Step-by-Step Guide
          </h3>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            For a brand new blog like <strong className="text-gray-900">Healthy Fix</strong>, Google bots won't automatically crawl immediately. Follow our exact growth checklist to get indexed by Google in 24-48 hours:
          </p>

          <ol className="relative border-l border-emerald-100 ml-3 space-y-6">
            <li className="pl-6 relative">
              <span className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-emerald-50 border-2 border-[#3CB371] flex items-center justify-center text-[10px] font-bold text-[#3CB371]">1</span>
              <h4 className="text-sm font-semibold text-gray-900">Establish Google Search Console Account</h4>
              <p className="text-xs text-gray-600 mt-1">
                Go to `search.google.com/search-console` and register your domain URL. Select the <strong>URL Prefix</strong> option and input `https://healthyfix.com`.
              </p>
            </li>
            <li className="pl-6 relative">
              <span className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-emerald-50 border-2 border-[#3CB371] flex items-center justify-center text-[10px] font-bold text-[#3CB371]">2</span>
              <h4 className="text-sm font-semibold text-gray-900">Authorize Ownership Verification</h4>
              <p className="text-xs text-gray-600 mt-1">
                Choose the <strong>HTML tag</strong> option. Copy the meta-tag. In AI Studio, your code injects this meta tag dynamically: <code>&lt;meta name=&quot;google-site-verification&quot; content=&quot;HEALTHY_FIX_TOKEN&quot; /&gt;</code> inside the HTML head.
              </p>
            </li>
            <li className="pl-6 relative">
              <span className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-emerald-50 border-2 border-[#3CB371] flex items-center justify-center text-[10px] font-bold text-[#3CB371]">3</span>
              <h4 className="text-sm font-semibold text-gray-900">Submit sitemap.xml to Google Bots</h4>
              <p className="text-xs text-gray-600 mt-1">
                Once verified, double-click the Sitemap index tab inside the GSC dashboard. Paste <code>sitemap.xml</code> into the input field and click Submit.
              </p>
            </li>
            <li className="pl-6 relative">
              <span className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-emerald-50 border-2 border-[#3CB371] flex items-center justify-center text-[10px] font-bold text-[#3CB371]">4</span>
              <h4 className="text-sm font-semibold text-gray-900">Pinterest-to-Blog Interlinking Strategy</h4>
              <p className="text-xs text-gray-600 mt-1">
                Create high-relevance back-links! Google treats Pinterest as an authoritative source. Pinning your recipe pins back to our direct blog URLs triggers faster bots on-site!
              </p>
            </li>
          </ol>
        </div>

        {/* CODE TABS */}
        <div className="flex flex-col gap-6">
          {/* Sitemaps */}
          <div>
            <div className="flex justify-between items-center bg-[#1F1F1F] px-4 py-2.5 rounded-t-lg">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#FFA94D]" />
                <span className="text-xs font-mono font-bold text-gray-200">sitemap.xml</span>
              </div>
              <button
                onClick={() => handleCopy(getSitemapXml(), 'sitemap')}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 font-mono cursor-pointer"
              >
                {copiedText === 'sitemap' ? 'Copied' : <><Copy className="w-3 h-3" /> Copy</>}
              </button>
            </div>
            <pre className="p-4 bg-gray-50 border border-gray-200 border-t-0 rounded-b-lg overflow-x-auto text-[11px] font-mono text-gray-700 max-h-[160px]">
              {getSitemapXml()}
            </pre>
          </div>

          {/* Robots.txt */}
          <div>
            <div className="flex justify-between items-center bg-[#1F1F1F] px-4 py-2.5 rounded-t-lg">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#3CB371]" />
                <span className="text-xs font-mono font-bold text-gray-200">robots.txt</span>
              </div>
              <button
                onClick={() => handleCopy(getRobotsTxt(), 'robots')}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 font-mono cursor-pointer"
              >
                {copiedText === 'robots' ? 'Copied' : <><Copy className="w-3 h-3" /> Copy</>}
              </button>
            </div>
            <pre className="p-4 bg-gray-50 border border-gray-200 border-t-0 rounded-b-lg overflow-x-auto text-[11px] font-mono text-gray-700 max-h-[150px]">
              {getRobotsTxt()}
            </pre>
          </div>

          {/* JSON Schema visualizer */}
          <div>
            <div className="flex flex-col bg-[#1F1F1F] rounded-t-lg border-b border-gray-800">
              <div className="flex justify-between items-center px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#FFA94D]" />
                  <span className="text-xs font-mono font-bold text-gray-200">Google JSON-LD Recipe Schema</span>
                </div>
                <button
                  onClick={() => handleCopy(getSchemaMarkup(), 'schema')}
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 font-mono cursor-pointer"
                >
                  {copiedText === 'schema' ? 'Copied' : <><Copy className="w-3 h-3" /> Copy</>}
                </button>
              </div>
              <div className="px-4 pb-2 flex items-center gap-2">
                <label className="text-[10px] font-mono font-semibold text-gray-400">Select Recipe:</label>
                <select
                  value={selectedRecipeId}
                  onChange={(e) => setSelectedRecipeId(e.target.value)}
                  className="text-xs bg-gray-800 text-gray-200 border-none rounded px-2 py-0.5 focus:outline-none"
                >
                  {recipes.map(r => (
                    <option key={r.id} value={r.id}>{r.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <pre className="p-4 bg-gray-50 border border-gray-200 border-t-0 rounded-b-lg overflow-x-auto text-[11px] font-mono text-gray-700 max-h-[180px]">
              {getSchemaMarkup()}
            </pre>
            <p className="text-[11px] text-gray-500 italic mt-1.5 leading-snug">
              * Note: This schema code runs dynamically in index.html to enable Google indexing rich search panels (star reviews, calories, preparation time badges) explicitly when bots index our urls.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
