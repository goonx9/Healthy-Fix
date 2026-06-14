import React, { useState } from 'react';
import { Mail, ShieldCheck, ArrowRight, Star, ExternalLink, Calendar, Check } from 'lucide-react';

interface EmailTemplate {
  step: number;
  subject: string;
  triggerTime: string;
  sender: string;
  objective: string;
  body: string;
  hasAffiliate: boolean;
  affiliateOffer?: string;
}

export const EmailSequenceSimulator: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [testEmailInjected, setTestEmailInjected] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [simulatedLoad, setSimulatedLoad] = useState<boolean>(false);

  const emails: EmailTemplate[] = [
    {
      step: 1,
      subject: "🎁 Your Free Plan: Healthy Fix 7-Day High-Protein Blueprint is here!",
      triggerTime: "Instant (0 mins post-signup)",
      sender: "Elena from Healthy Fix <wellness@healthyfix.com>",
      objective: "Establish trust, deliver high-value promised PDF files immediately, and prompt social cues.",
      body: `Hey fitness friend! 

First off—thank you so much for joining our Healthy Fix newsletter family. I am absolutely thrilled to support you on your wellness and weight loss journey!

As promised, here is the direct link to download your printable workbook:
👉 [DOWNLOAD: Healthy Fix 7-Day Prep Blueprint (PDF)](https://healthyfix.com/mock-pdf-download)

Inside, you will find total macro counts already calculated, the master grocery list matching your calorie goals, and my secret ingredient swap matrices.

### What to expect next:
I'm not going to bombard your inbox with junk. Over the next three days, I'm going to send you my absolute best calorie deficit hacks, some secret blender recipes, and my honest recommendations for a toxic-free kitchen space. 

If this sounds like a fit, click below to follow our daily growth boards on Pinterest (we pin 5 new high-protein meals under 400 calories daily!):
📌 [FOLLOW: Healthy Fix Pinterest Boards](https://www.pinterest.com/healthyfitfix)

Talk soon,
Elena Vasquez
founder, Healthy Fix`,
      hasAffiliate: false
    },
    {
      step: 2,
      subject: "🙋‍♀️ Calorie Deficits: The 'Volume Eating' metabolic cheat codes...",
      triggerTime: "Day 1 (24 hours later)",
      sender: "Elena from Healthy Fix <wellness@healthyfix.com>",
      objective: "Provide actionable fitness tips, explain thermodynamic calorie deficits, and retain readership.",
      body: `Hey friend,

Yesterday, you grabbed your 7-Day meal plan. Today, let's talk about the exact science of keeping fat off permanently without torturing yourself in a hungry cage.

Most fail because they believe a "calorie deficit" means eating smaller piles of food. This is a cognitive trap.

### Introducing 'Volume Eating'
To lose fat, you must burn more energy than you eat. But your stomach has stretch receptors that signal your brain when you are full. 

If you replace high-density calories with low-density high-volume items, your stretch receptors fire, ghrelin drops, and you stay in a deficit completely full!

*   **Standard Rice (200 kcal):** Just 1/2 cup of grains. Barely coats your stomach.
*   **Volumized Rice (200 kcal):** 1/4 cup of rice blended with 1.5 cups of Cauliflower rice! The pile is massive, loaded with digestion fiber, and feels like a massive steakhouse side dish.

Tomorrow, I am going to share my absolute favorite kitchen recipe hack. It contains a forgotten ingredient that has been rebranded inside fitness spaces. If you love Creamy Alfredos but hate 1000 calorie plates, you MUST open tomorrow's mail.

Stay strong and eat lots!
Elena`,
      hasAffiliate: false
    },
    {
      step: 3,
      subject: "🤫 My secret ingredient hack: Creamy Alfredo under 430 Calories...",
      triggerTime: "Day 2 (48 hours later)",
      sender: "Elena from Healthy Fix <wellness@healthyfix.com>",
      objective: "Fulfill recipe content delivery, drive traffic back to the dynamic recipe screen on-site.",
      body: `Hey friend,

I won't keep you waiting. The secret superfood is... **Cottage Cheese!**

Now, wait—don't hit unsubscribe if you hate the clumpy texture! I used to hate it too. 

But fitness food creators discovered that if you throw low-fat cottage cheese in a blender with minced sautéed garlic, Parmesan cheese, and a splash of hot pasta boiling water... 

It transforms it into a **silky, velvety, thick Alfredo cream sauce** that tastes exactly like heavy dairy cream!

### The Macros Comparison:
*   **Traditional restaurant Alfredo:** 920 kcal | 15g protein | 40g fat
*   **Healthy Fix Blended Alfredo:** 420 kcal | 35g protein | 10g fat

I wrote out the complete step-by-step pan-sear instructions, serving sliders, and cooking timers on our blog. Tap below to see the recipe right now:

👉 [VIEW RECIPE: Blended Cottage Cheese Alfredo Pasta on Healthy Fix](https://healthyfix.com/recipes/cottage-cheese-alfredo)

Go blend some sauce!
Elena`,
      hasAffiliate: false
    },
    {
      step: 4,
      subject: "🍳 Toxic Frypans? Swapping PFAS forever-chemicals on a budget...",
      triggerTime: "Day 3 (72 hours later)",
      sender: "Elena from Healthy Fix <wellness@healthyfix.com>",
      objective: "Demonstrate affiliate conversion. Review non-toxic cookware and recommend high-quality commercial tools.",
      body: `Hey friend,

Elena here with our final sequence step. Today, we need to inspect what is actually leaking into your healthy meal prep bowls.

Did you know that scratching a typical black non-stick Teflon skillet can release over 9,000 microplastic particles into a single egg?

Teflon is coated with fluoropolymers (PFAS) which are hormone disruptors. When they heat up, they find their way into our cells and slow down metabolic fat clearance.

### My Non-Toxic Recommended Kitchen gear:
Here is what I actively cook-prep with inside my own home, and which our readers swear by for keeping prep times under 30 minutes!

1.  **Always Pure 10-Inch Ceramic Pan ($65.00):** Made from sand-derived minerals, completely nonstick, and contains ZERO chemical binders. 
    👉 [Amazon Affiliate: Check Ceramic Frying Pan Colors](https://amazon.com/mock-affiliate)
    
2.  **Clear Borosilicate Glass Prep Bowls (10-Pack, $29.99):** Swap stale plastic containers for these snap-locking leakproof glass boxes. Perfect for crisp veg storage.
    👉 [Amazon Affiliate: Check Glass Container Sets](https://amazon.com/mock-affiliate)

3.  **Cyclone Fusion Protein Blender ($89.99):** The precise 1200W blender I use to blend my cottage cheese sauce and morning spinach smoothies instantly.
    👉 [Amazon Affiliate: View Cyclone Fusion Blender](https://amazon.com/mock-affiliate)

*Note: The links above are affiliate links, meaning if you buy using my code, I get a small support commission at zero extra cost to you. I only recommend gear I've thoroughly vetted for safety and quality!*

Thank you so much for following our 4-day sequence. From here on, you will receive our standard weekly dispatch packed with new recipes and fat loss tip calculators!

With love & wellness,
Elena`,
      hasAffiliate: true,
      affiliateOffer: "Cookware and storage container reviews with direct affiliate tracking codes linked."
    }
  ];

  const activeEmail = emails.find(e => e.step === activeStep) || emails[0];

  const handleInjectTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) return;
    setSimulatedLoad(true);
    setTimeout(() => {
      setSimulatedLoad(false);
      setTestEmailInjected(true);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
        <div>
          <span className="text-xs font-semibold tracking-widest text-[#3CB371] uppercase flex items-center gap-1">
            <Mail className="w-3.5 h-3.5" /> Funnel Automation Suite
          </span>
          <h2 className="text-2xl font-sans font-medium tracking-tight text-gray-900 mt-1">High-Conversion Email Funnel Sequence</h2>
        </div>
        <p className="text-xs text-gray-500 max-w-sm">
          Simulate the automated welcome lifecycle triggered the second an organic visitor signs up for our &ldquo;Free 7-Day Meal Plan&rdquo; lead magnet on the homepage.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* EMAIL SELECTOR SIDER */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-150 space-y-3">
            <strong className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
              Welcome Sequence Steps
            </strong>

            <div className="space-y-2">
              {emails.map((email) => (
                <button
                  key={email.step}
                  onClick={() => setActiveStep(email.step)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                    activeStep === email.step
                      ? 'border-[#3CB371] bg-white text-gray-900 shadow-sm font-semibold'
                      : 'border-transparent text-gray-600 hover:bg-white/40'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                    activeStep === email.step ? 'bg-[#3CB371] text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {email.step}
                  </span>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 font-bold block">
                      {email.triggerTime}
                    </span>
                    <p className="text-xs line-clamp-1 mt-0.5 font-sans">{email.subject}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* SIMULATE TEST BOX */}
          <div className="bg-[#FFF8F0]/30 border border-amber-100/50 p-4 rounded-2xl">
            <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-[#FFA94D]" /> Test Trigger Simulator
            </h4>
            <p className="text-[11px] text-gray-500 leading-normal mb-3">
              Input your email inside the lead box to trigger the sequence and study how affiliate cookie tracking builds passive income streams.
            </p>

            <form onSubmit={handleInjectTest} className="space-y-2">
              <input
                type="email"
                placeholder="yours@domain.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-lg p-2.5 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#3CB371]"
                required
              />
              <button
                type="submit"
                disabled={simulatedLoad}
                className="w-full bg-[#1F1F1F] hover:bg-gray-800 text-white font-bold text-[10px] tracking-widest uppercase py-2 rounded-lg cursor-pointer transition-all active:scale-95 disabled:bg-gray-400"
              >
                {simulatedLoad ? 'Simulating Delivery...' : 'Trigger Welcome Email'}
              </button>
            </form>

            {testEmailInjected && (
              <div className="bg-emerald-50 text-emerald-800 rounded-lg p-3 text-[10px] font-medium border border-[#3CB371]/30 mt-3 animate-fade-in flex items-center gap-2">
                <Check className="w-4 h-4 text-[#3CB371]" />
                <span>Test sent! sequence Step 1 loaded in background sandbox under CRM trackers.</span>
              </div>
            )}
          </div>
        </div>

        {/* EMAIL RENDER COPT */}
        <div className="lg:col-span-8 flex flex-col border border-gray-100 rounded-2xl overflow-hidden shadow-xs bg-gray-50">
          {/* Header detail */}
          <div className="bg-white border-b border-gray-150 p-4 font-mono text-xs text-gray-600 space-y-1 bg-gradient-to-r from-cream to-white">
            <div className="flex justify-between flex-wrap gap-1">
              <div>
                <span className="font-semibold text-gray-400">From:</span> {activeEmail.sender}
              </div>
              <span className="text-[10px] bg-[#3CB371]/10 px-2 rounded-full text-[#3CB371] font-bold">
                {activeEmail.triggerTime}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-400">Subject:</span> <strong className="text-gray-900 font-sans">{activeEmail.subject}</strong>
            </div>
            <div className="pt-2 text-[10px] block border-t border-dashed border-gray-200 mt-2 italic flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-[#FFA94D] shrink-0" />
              <span><strong>Marketing Objective:</strong> {activeEmail.objective}</span>
            </div>
          </div>

          {/* HTML view frame */}
          <div className="p-6 md:p-8 bg-white overflow-y-auto max-h-[380px] font-sans text-sm text-gray-800 leading-relaxed space-y-4 border-b border-gray-100">
            {activeEmail.body.split('\n\n').map((para, pIdx) => {
              if (para.startsWith('###')) {
                return (
                  <h4 key={pIdx} className="text-base font-bold text-gray-900 pt-2 border-b border-gray-100 pb-1.5">
                    {para.replace('###', '').trim()}
                  </h4>
                );
              }
              if (para.startsWith('*')) {
                return (
                  <ul key={pIdx} className="list-disc pl-5 space-y-1 text-xs text-gray-700">
                    {para.split('\n').map((li, lIdx) => (
                      <li key={lIdx}>{li.replace('*', '').trim()}</li>
                    ))}
                  </ul>
                );
              }
              if (para.startsWith('👉') || para.startsWith('📌')) {
                return (
                  <div key={pIdx} className="my-4 bg-[#FFF8F0]/80 border border-amber-100/60 p-3 rounded-xl flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-900">{para}</span>
                    <span className="text-[10px] font-bold text-[#FFA94D] flex items-center gap-0.5">
                      Link <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                );
              }
              return <p key={pIdx}>{para}</p>;
            })}
          </div>

          <div className="bg-gray-100/70 p-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500 font-mono tracking-tight">
            <span>Automation: HealthyFix CRM CRM-V1</span>
            {activeEmail.hasAffiliate ? (
              <span className="text-[#FFA94D] font-bold flex items-center gap-1">
                ⚠️ Contains Affiliate Tracking link IDs
              </span>
            ) : (
              <span className="text-gray-400 uppercase text-[10px] font-bold">Safe Content Link</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
