export interface Recipe {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  prepTime: number; // in mins
  cookTime: number; // in mins
  servings: number;
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  ingredients: {
    amount: number;
    unit: string;
    name: string;
  }[];
  directions: string[];
  category: 'weight-loss' | 'high-protein' | 'meal-prep' | 'healthy-snacks';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  seoKeywords: string[];
  pinterestPinUrl?: string; // or mockup
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'nutrition' | 'weight-loss' | 'meal-prep' | 'fitness' | 'lifestyle';
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  schemaType: string;
}

export interface SeoIdea {
  id: number;
  keyword: string;
  title: string;
  pinterestDescription: string;
  pinIdea: string;
  searchIntent: 'informational' | 'transactional' | 'commercial';
  category: 'Weight Loss' | 'High Protein' | 'Meal Prep' | 'Healthy Snacks';
}

export interface AffiliateProduct {
  id: string;
  name: string;
  category: 'kitchen-tools' | 'containers' | 'fitness';
  price: string;
  rating: number;
  image: string;
  affiliateUrl: string;
  description: string;
  pros: string[];
  cons: string[];
}
