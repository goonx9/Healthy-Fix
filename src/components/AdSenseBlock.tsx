import React from 'react';

interface AdSenseBlockProps {
  slot: 'top-banner' | 'sidebar' | 'content-top' | 'content-middle' | 'content-end';
  visible: boolean;
}

export const AdSenseBlock: React.FC<AdSenseBlockProps> = ({ slot, visible }) => {
  if (!visible) return null;

  const getConfig = () => {
    switch (slot) {
      case 'top-banner':
        return {
          dimensions: '728 x 90 (Leaderboard)',
          desc: 'Header Billboard - Maximum visibility on load. Drives high CTR.',
          bgColor: 'bg-amber-50/70 border-amber-200 text-amber-800',
        };
      case 'sidebar':
        return {
          dimensions: '300 x 600 (Half Page or Large Tower)',
          desc: 'Sidebar Banner - Stays visible as reader scrolls recipes.',
          bgColor: 'bg-emerald-50/70 border-emerald-200 text-emerald-800',
        };
      case 'content-top':
        return {
          dimensions: 'Responsive / 336 x 280 (Large Rectangle)',
          desc: 'Article Top - Positioned above H1. Incredible AdSense yield.',
          bgColor: 'bg-sky-50/70 border-sky-100 text-sky-800',
        };
      case 'content-middle':
        return {
          dimensions: 'Responsive (In-feed text)',
          desc: 'Article Mid-section - Placed naturally between steps.',
          bgColor: 'bg-purple-50/70 border-purple-100 text-purple-800',
        };
      case 'content-end':
        return {
          dimensions: '300 x 250 (Medium Rectangle) or Native Ad Grid',
          desc: 'Bottom Recommendation - Captures highly engaged post-read clicks.',
          bgColor: 'bg-rose-50/70 border-rose-100 text-rose-800',
        };
    }
  };

  const config = getConfig();

  return (
    <div className={`my-6 border border-dashed rounded-xl p-4 flex flex-col justify-center items-center font-sans tracking-tight ${config.bgColor} transition-all duration-300 shadow-sm`}>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-[10px] font-mono tracking-wider bg-black/5 px-1.5 py-0.5 rounded text-gray-500 uppercase">
          AdSense Placeholder
        </span>
        <span className="text-[10px] font-mono font-semibold opacity-75">
          {config.dimensions}
        </span>
      </div>
      <p className="text-xs font-medium text-center max-w-[500px] mb-2">
        {config.desc}
      </p>
      <div className="w-full flex justify-center items-center py-4 bg-white/40 border border-current border-opacity-10 rounded-lg text-[11px] font-mono text-gray-500 select-none">
        &lt;ins class=&quot;adsbygoogle&quot; style=&quot;display:block&quot; data-ad-slot=&quot;{slot}&quot;&gt;&lt;/ins&gt;
      </div>
    </div>
  );
};
