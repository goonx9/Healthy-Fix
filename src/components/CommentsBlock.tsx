import React, { useState, useEffect } from 'react';
import { Send, MessageSquare, ThumbsUp, Heart, Sparkles } from 'lucide-react';

interface Comment {
  id: string;
  name: string;
  message: string;
  date: string;
  likes: number;
  userLiked?: boolean;
  isOfficial?: boolean;
  avatar?: string;
  role?: string;
}

interface CommentsBlockProps {
  contentId: string;
  contentType: 'article' | 'recipe';
}

const PRESEEDED_COMMENTS: { [key: string]: Comment[] } = {
  "how-to-start-meal-prepping": [
    {
      id: "p1-c1",
      name: "Marcus Kane",
      message: "The Formula Method finally made meal prep click for me! I spent months trying to cook individual elaborate dinners and would burn out by Tuesday. Making a protein base and roasted vegetables in simple bulk, then dividing it is a game-changer. Also, just ordered 2 sets of glass borosilicate containers, tossing all my scratched plastic!",
      date: "3 days ago",
      likes: 18,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
      role: "Verified Prep Enthusiast"
    },
    {
      id: "p1-c2",
      name: "Elena Vasquez",
      message: "Oh, Marcus, this makes my heart so happy! Yes, starting simple is the absolute golden rule. Designing the container combos makes it feel like an elegant buffet rather than a duty. Let me know when your new glass containers arrive—you will never go back!",
      date: "2 days ago",
      likes: 31,
      isOfficial: true,
      avatar: "https://res.cloudinary.com/dmy2yiax9/image/upload/v1781141120/HEALTHY-removebg-preview_nwygi0.png",
      role: "Author"
    },
    {
      id: "p1-c3",
      name: "Julie Finch",
      message: "Do you freeze your prepped glass meals, or do they stay fresh in the fridge for all 5 days? I am always nervous about broccoli getting soggy on day 4.",
      date: "1 day ago",
      likes: 4,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
    },
    {
      id: "p1-c4",
      name: "Elena Vasquez",
      message: "Hi Julie! I always keep my meals in the fridge instead of the freezer. The secret is to let them cool down fully before snapping the lid closed (Step 3). This stops steam condensation inside, which is the main culprit for soggy day-4 broccoli. Also, roasting broccoli at a higher heat keeps it nice and firm!",
      date: "18 hours ago",
      likes: 14,
      isOfficial: true,
      avatar: "https://res.cloudinary.com/dmy2yiax9/image/upload/v1781141120/HEALTHY-removebg-preview_nwygi0.png",
      role: "Author"
    }
  ],
  "the-truth-about-cottage-cheese": [
    {
      id: "p2-c1",
      name: "Sophia Carter",
      message: "Unbelievable. Tried blending cottage cheese last night with garlic powder, dill, and a dash of lemon juice for a raw baby carrot dip. I hate the curd texture, but blended, it literally turns into premium luxury ranch! My kids couldn't even tell. This is a complete macro cheat code.",
      date: "5 days ago",
      likes: 42,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      role: "Verified Buyer"
    },
    {
      id: "p2-c2",
      name: "Chef Dave L.",
      message: "As a professional culinary coach, I completely vouch for the blended method. Folded into hot whole wheat pasta with some splash water, it retains amazing structure and tastes like premium cream sauce. Just make sure not to boil it once integrated, or the proteins can coagulate. Elegant write-up Elena!",
      date: "4 days ago",
      likes: 27,
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100",
      role: "Kitchen Master"
    },
    {
      id: "p2-c3",
      name: "Damian Moss",
      message: "Does anyone know if goat milk cottage cheese blends just as well? I have a slight cow dairy sensitivity.",
      date: "2 days ago",
      likes: 2,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
    }
  ],
  "how-many-grams-of-protein": [
    {
      id: "p3-c1",
      name: "Trevor Vance",
      message: "Being in a 500-calorie deficit while hiking 4 miles a day was destroying my legs. I recalculated using your formula and realized I was only getting 70g of protein at 84kg body weight! Bumped up to 150g (mostly with chicken breasts, eggs, and Greek yogurt) and my muscle recovery and energy feels stellar. Wish I knew this TDEE math sooner.",
      date: "1 week ago",
      likes: 54,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      role: "Calorie Precision Tracker"
    },
    {
      id: "p3-c2",
      name: "Chloe Miller",
      message: "Is the Thermic Effect of Food (TEF) really that high? I had no idea that digesting chicken consumes 30% of its intake. That theoretically means a high-protein calorie deficit is even deeper than basic app tracking shows!",
      date: "4 days ago",
      likes: 12,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
    },
    {
      id: "p3-c3",
      name: "Elena Vasquez",
      message: "Spot-on, Chloe! Thermogenically, protein food is incredibly expensive for your system to isolate and absorb. That is exactly why calorie tracking can sometimes have a pleasant margin of safety if your macros are heavily protein-dominant. Keep fueling that clean fire!",
      date: "3 days ago",
      likes: 22,
      isOfficial: true,
      avatar: "https://res.cloudinary.com/dmy2yiax9/image/upload/v1781141120/HEALTHY-removebg-preview_nwygi0.png",
      role: "Author"
    }
  ],
  "non-toxic-kitchenware-essentials": [
    {
      id: "p4-c1",
      name: "Diana Ross",
      message: "Just threw out my scratched Teflon frying pan. I feel so guilty for using it for so long, but excited to buy a beautiful ceramic pan. Does the ceramic coating wear off quickly? I cook healthy eggs every single morning.",
      date: "2 weeks ago",
      likes: 19,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
      role: "Clean Living Advocate"
    },
    {
      id: "p4-c2",
      name: "Elena Vasquez",
      message: "Hi Diana! Please don't feel guilty—most people are never told about the scratching hazards. Yes, premium ceramic nonstick pans require a little care. The secret to making them last for years is: 1) Never use metal utensils (stick to wood, bamboo, or soft silicone), and 2) Let it cool fully before washing, and hand-wash only with a soft sponge. Never put it hot in a cold-water sink!",
      date: "13 days ago",
      likes: 38,
      isOfficial: true,
      avatar: "https://res.cloudinary.com/dmy2yiax9/image/upload/v1781141120/HEALTHY-removebg-preview_nwygi0.png",
      role: "Author"
    },
    {
      id: "p4-c3",
      name: "Kevin Vance",
      message: "The top tip about microplastics on plastic microwave lids snapped on was a wake-up call. I used to pack hot glass meal prep and microwave them with the plastic covers slightly loose, but they still steam hot. Swapping to draping clean damp paper towels today!",
      date: "6 days ago",
      likes: 11,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100"
    }
  ],
  "cottage-cheese-alfredo": [
    {
      id: "r1-c1",
      name: "Alice Parker",
      message: "This cottage cheese alfredo pasta is absolutely genius. I was incredibly skeptical. I thought it would taste like sour dairy curds or get grainy when heated, but blending it with hot pasta water was a total cheat code. It's so smooth, glossy, and perfectly creamy. 10/10 will cook this every single weekly prep!",
      date: "4 days ago",
      likes: 35,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
      role: "Verified Chef"
    },
    {
      id: "r1-c2",
      name: "Tommy Sparks",
      message: "Added about 100g of sauteed mushrooms and active chili flakes on top of mine. Mind-blowing. It feels like eating an $18 restaurant meal, but the protein is incredible and it doesn't leave you feeling bloated or food-coma-prone. Absolute gold star recipe.",
      date: "3 days ago",
      likes: 14,
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100",
      role: "High-Protein Builder"
    }
  ]
};

export const CommentsBlock: React.FC<CommentsBlockProps> = ({ contentId, contentType }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  // Load comments
  useEffect(() => {
    const stored = localStorage.getItem(`comments_${contentId}`);
    if (stored) {
      setComments(JSON.parse(stored));
    } else {
      // Load preseeded if any, or default clean empty state
      const seed = PRESEEDED_COMMENTS[contentId] || [
        {
          id: `default-c1`,
          name: "Healthy Food Lover",
          message: `This is an absolute masterpiece of a ${contentType}! Can't wait of seeing more of these high-volume recipes and non-toxic meal tips on the Pinterest feed. Highly recommend sharing this link!`,
          date: "Yesterday",
          likes: 5,
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
        }
      ];
      setComments(seed);
      localStorage.setItem(`comments_${contentId}`, JSON.stringify(seed));
    }
  }, [contentId, contentType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newComment: Comment = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      message: message.trim(),
      date: "Just now",
      likes: 1,
      userLiked: true,
      avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(name.trim())}`
    };

    const updated = [...comments, newComment];
    setComments(updated);
    localStorage.setItem(`comments_${contentId}`, JSON.stringify(updated));

    setName('');
    setMessage('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleLike = (commentId: string) => {
    const updated = comments.map(c => {
      if (c.id === commentId) {
        const isLiked = !c.userLiked;
        return {
          ...c,
          userLiked: isLiked,
          likes: isLiked ? c.likes + 1 : c.likes - 1
        };
      }
      return c;
    });
    setComments(updated);
    localStorage.setItem(`comments_${contentId}`, JSON.stringify(updated));
  };

  return (
    <div id="comments-section" className="bg-white border border-[#1F1F1F]/10 rounded-none p-6 md:p-8 space-y-6 text-left">
      <div className="flex items-center justify-between border-b border-[#1F1F1F]/10 pb-4">
        <h3 className="text-xl font-serif font-black italic text-[#1F1F1F] flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#3CB371]" /> Comments ({comments.length})
        </h3>
        <span className="text-[10px] font-mono uppercase bg-[#FFA94D]/10 text-[#amber-800] px-2 py-0.5 font-bold">
          Active Reader Roundtable
        </span>
      </div>

      {/* Stream of Comments */}
      <div className="space-y-4 max-h-[38rem] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-stone-200">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className={`flex gap-4 p-4 border transition-all ${
              comment.isOfficial 
                ? 'bg-[#3CB371]/5 border-[#3CB371]/30' 
                : 'bg-stone-50/50 border-[#1F1F1F]/5 hover:bg-white hover:border-[#1F1F1F]/10'
            }`}
          >
            {/* User Avatar */}
            <div className="shrink-0">
              <img
                src={comment.avatar || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(comment.name)}`}
                alt={comment.name}
                className={`w-10 h-10 border object-cover ${
                  comment.isOfficial ? 'border-[#3CB371] p-0.5 bg-white' : 'border-stone-200'
                }`}
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Comment Body */}
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-serif font-bold text-xs text-[#1F1F1F] italic">
                    {comment.name}
                  </span>
                  {comment.role && (
                    <span className={`text-[8px] font-bold font-mono uppercase tracking-widest px-1.5 py-0.5 ${
                      comment.isOfficial 
                        ? 'bg-[#3CB371] text-white' 
                        : 'bg-[#FFA94D]/10 text-amber-800 border border-amber-200/10'
                    }`}>
                      {comment.role}
                    </span>
                  )}
                </div>
                <span className="text-[9px] font-mono text-stone-400 font-semibold uppercase">
                  {comment.date}
                </span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed font-sans font-medium whitespace-pre-line">
                {comment.message}
              </p>

              {/* Interaction row */}
              <div className="flex items-center gap-4 text-[10px] font-mono pt-1.5 text-stone-400 font-bold border-t border-dotted border-stone-200">
                <button
                  onClick={() => handleLike(comment.id)}
                  className={`flex items-center gap-1 hover:text-[#3CB371] cursor-pointer ${
                    comment.userLiked ? 'text-[#3CB371] font-bold' : ''
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{comment.likes} {comment.likes === 1 ? 'upvote' : 'upvotes'}</span>
                </button>
                
                {comment.isOfficial && (
                  <span className="text-[#3CB371] font-bold uppercase tracking-wider flex items-center gap-0.5 text-[8px] italic">
                    <Sparkles className="w-3 h-3 text-amber-400" /> Host Certified Solution
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comment Form */}
      <div className="pt-4 border-t border-[#1F1F1F]/10">
        <h4 className="text-xs font-mono font-bold text-[#1F1F1F] uppercase tracking-wider mb-3">
          Share Your Questions or Cook Feedback
        </h4>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[8px] font-mono font-extrabold text-stone-400 uppercase tracking-widest mb-1.5">
                Reader Name
              </label>
              <input
                type="text"
                placeholder="E.g., Clara Jenkins"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-stone-50 border border-[#1F1F1F]/15 rounded-none p-3 text-xs placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#3CB371] focus:bg-white transition-all font-sans"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[8px] font-mono font-extrabold text-stone-400 uppercase tracking-widest mb-1.5">
              Your Comment Message
            </label>
            <textarea
              rows={3}
              placeholder="Ask a macro question, offer an ingredient substitution idea, or let Elena know how it tasted!"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-stone-50 border border-[#1F1F1F]/15 rounded-none p-3 text-xs placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#3CB371] focus:bg-white transition-all font-sans"
              required
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-1.5 bg-[#1F1F1F] hover:bg-[#3CB371] text-white text-[10px] font-bold uppercase tracking-widest px-5 py-3 rounded-none transition-all active:scale-95 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" /> Submit Comment
          </button>
        </form>

        {success && (
          <div className="mt-4 bg-emerald-50 text-emerald-800 border border-emerald-200/50 rounded-none p-3.5 text-xs text-center font-bold animate-fade-in">
            🎉 Your comment has been published to the reader feed! Thank you for participating.
          </div>
        )}
      </div>
    </div>
  );
};
