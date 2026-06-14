import { Recipe } from '../types';

export const recipes: Recipe[] = [
  {
    id: "cottage-cheese-alfredo",
    title: "Blended Cottage Cheese Alfredo Pasta",
    slug: "cottage-cheese-alfredo",
    description: "The ultimate weight loss hack! Standard Alfredo pasta can pack 900+ calories. This version blends cottage cheese into a thick, luxurious, high-protein Alfredo sauce that has only 420 calories per plate and a massive 35g of protein. Creamy, cheesy, and delicious guilt-free comfort food.",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=800&auto=format&fit=crop",
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    calories: 420,
    macros: {
      protein: 35,
      carbs: 52,
      fat: 10
    },
    ingredients: [
      { amount: 150, unit: "g", name: "High-fiber whole wheat pasta (dry weight)" },
      { amount: 1, unit: "cup", name: "Low-fat cottage cheese (2% fat)" },
      { amount: 30, unit: "g", name: "Freshly grated Parmesan cheese" },
      { amount: 2, unit: "cloves", name: "Garlic, minced" },
      { amount: 0.5, unit: "cup", name: "Reserved pasta boiling water" },
      { amount: 120, unit: "g", name: "Grilled chicken breast, sliced (optional protein boost)" },
      { amount: 1, unit: "tsp", name: "Olive oil" },
      { amount: 0.25, unit: "tsp", name: "Sea salt & cracked black pepper" },
      { amount: 1, unit: "pinch", name: "Fresh nutmeg" },
      { amount: 1, unit: "tbsp", name: "Fresh parsley, chopped for garnish" }
    ],
    directions: [
      "Bring a large pot of salted water to a boil. Cook your whole wheat pasta according to packet directions until al dente. Critical step: Before draining, scoop out at least 1 cup of the hot pasta water and set it aside.",
      "While pasta is cooking, heat olive oil in a pan over medium heat. Sauté the minced garlic for 1-2 minutes until fragrant and golden. Watch closely so it doesn't burn.",
      "In a high-speed blender, combine the cottage cheese, freshly grated Parmesan, sautéed garlic (along with the oil from the pan), sea salt, cracked black pepper, a pinch of nutmeg, and 1/4 cup of the reserved hot pasta water.",
      "Blend on high speed for 1-2 minutes until completely smooth, silky, and warm. Ensure there are absolutely no cottage cheese curds remaining. It should look like rich heavy cream sauce. If too thick, splash in more pasta water.",
      "Drain the pasta and return it to the warm pot. Pour the blended cottage cheese sauce directly over the hot pasta. Toss continuously on very low heat for 1 minute until well coated. (Do not overheat or boil, which can cause the cottage cheese proteins to separate).",
      "Fold in the cooked sliced chicken breast if using. Plate immediately, garnishing with fresh cracked pepper, extra Parmesan, and minced fresh parsley."
    ],
    category: "high-protein",
    difficulty: "Easy",
    seoKeywords: ["cottage cheese pasta", "high protein recipes", "healthy alfredo", "weight loss meals"]
  },
  {
    id: "garlic-herb-chicken-meal-prep",
    title: "Garlic Herb Chicken & Rainbow Veggie Meal Prep",
    slug: "garlic-herb-chicken-meal-prep",
    description: "Say goodbye to dry, tasteless meal preps in plastic boxes! These garlic-herb glazed chicken breasts are exceptionally tender, roasted on a single sheet pan alongside charred bell peppers, broccoli, and sweet potato cubes. Keeps perfectly for 5 days in glass meal prep containers.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    calories: 380,
    macros: {
      protein: 42,
      carbs: 28,
      fat: 12
    },
    ingredients: [
      { amount: 600, unit: "g", name: "Chicken breasts, trimmed & cut into 1-inch cubes" },
      { amount: 2, unit: "medium", name: "Sweet potatoes, scrubbed and cubed into small bite sizes" },
      { amount: 1, unit: "medium", name: "Broccoli head, cut into bite-size florets" },
      { amount: 2, unit: "whole", name: "Bell peppers (red & yellow), deseeded and sliced" },
      { amount: 2, unit: "tbsp", name: "Extra virgin olive oil" },
      { amount: 1, unit: "tbsp", name: "Italian seasoning (oregano, basil, rosemary, thyme)" },
      { amount: 1, unit: "tbsp", name: "Garlic powder" },
      { amount: 1, unit: "tsp", name: "Smoked paprika" },
      { amount: 0.5, unit: "tsp", name: "Sea salt" },
      { amount: 0.5, unit: "tsp", name: "Cracked black pepper" }
    ],
    directions: [
      "Preheat your oven to 400°F (200°C). Line a large rimmed sheet pan with heavy-duty parchment paper.",
      "In a large mixing bowl, combine the cubed sweet potato, broccoli florets, and sliced bell peppers. Drizzle with 1 tablespoon of extra virgin olive oil, half the garlic powder, Italian seasoning, salt, and pepper. Toss until fully glazed.",
      "Spread the vegetables evenly across the sheet pan, leaving some pockets open for the chicken.",
      "In the same mixing bowl (saves dish washing!), place the cubed chicken breast. Drizzle with the remaining olive oil, remaining garlic powder, smoked paprika, Italian seasoning, salt, and pepper. Toss until fully coated.",
      "Add the seasoned chicken breasts in the open spaces of the sheet pan in a single layer to ensure they roast cleanly rather than steaming.",
      "Roast in the center rack of the oven for 22-25 minutes, or until the sweet potatoes are fork-tender and the chicken reaches an internal safe temperature of 165°F (74°C). Sieve details of caramelized borders.",
      "Allow to cool for 15 minutes before dividing into 4 equal compartments of glass meal prep containers. Seal and store in the refrigerator for up to 5 days. High volume, super colorful fat loss fuel!"
    ],
    category: "meal-prep",
    difficulty: "Easy",
    seoKeywords: ["chicken meal prep", "sheet pan dinners", "easy lean meals", "high protein prep"]
  },
  {
    id: "peanut-butter-protein-balls",
    title: "10-Min No-Bake Oatmeal Protein Balls",
    slug: "peanut-butter-protein-balls",
    description: "The absolute perfect clean sweet-tooth cure! When you get hit by 3 PM afternoon sugar crashes, skip the cookie stack and grab one of these sweet, salty, and chewy protein bites. Packed with whole food dietary fiber and healthy nut fats to keep blood sugar extremely steady.",
    image: "https://images.unsplash.com/photo-1604497074173-f36de4042b6f?q=80&w=800&auto=format&fit=crop",
    prepTime: 10,
    cookTime: 0,
    servings: 12,
    calories: 110,
    macros: {
      protein: 6,
      carbs: 10,
      fat: 5
    },
    ingredients: [
      { amount: 1, unit: "cup", name: "Rolled oats (traditional old-fashioned)" },
      { amount: 0.5, unit: "cup", name: "All-natural creamy peanut butter (just peanuts & salt)" },
      { amount: 2, unit: "scoops", name: "Vanilla whey or plant-based protein powder (approx 60g)" },
      { amount: 2, unit: "tbsp", name: "Organic honey or pure maple syrup" },
      { amount: 1, unit: "tbsp", name: "Chia seeds (omega-3 & dietary fiber)" },
      { amount: 2, unit: "tbsp", name: "Sugar-free mini dark chocolate chips (optional)" },
      { amount: 2, unit: "tbsp", name: "Water or unsweetened almond milk (adjust for stickiness)" },
      { amount: 1, unit: "pinch", name: "Flaky sea salt for dusting" }
    ],
    directions: [
      "In a medium mixing bowl, combine the rolled oats, protein powder, chia seeds, and sugar-free mini dark chocolate chips. Stir dry ingredients until blended.",
      "Add the creamy peanut butter and honey/maple syrup. Use a sturdy spatula to fold the wet ingredients into the dry oats. It will start as a crumbly texture.",
      "Slowly add water or almond milk, starting with just 1 tablespoon. Continue stirring vigorously. You want a thick, sticky dough that holds together when squeezed but isn't dry or watery.",
      "Use a small cookie scoop or tablespoon to scoop out portions. Roll the dough between your palms into tight bite-sized balls (about 12 equal balls).",
      "Arrange the bites on a parched flat dish. Sprinkle with a tiny dusting of flaky sea salt for that premium sweet-and-salty balance.",
      "Refrigerate for at least 30 minutes to set. They will firm up, lose stickiness, and develop a beautiful chewy, cookie-dough texture. Keep in an airtight container for up to 2 weeks!"
    ],
    category: "healthy-snacks",
    difficulty: "Easy",
    seoKeywords: ["protein balls", "no-bake snacks", "healthy sweet snacks", "peanut butter protein"]
  },
  {
    id: "turkey-taco-lettuce-boats",
    title: "Crispy Air-Fried Turkey Taco Lettuce Boats",
    slug: "turkey-taco-lettuce-boats",
    description: "Craving Taco Tuesday but watching the waistline? Swap heavy corn taco shells for crisp, fresh romaine lettuce leaves. Fill them with spiced lean ground turkey and your favorite healthy Mexican taco toppings. Perfect for volume eating under 350 calories for a massive plate.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop",
    prepTime: 10,
    cookTime: 12,
    servings: 3,
    calories: 320,
    macros: {
      protein: 34,
      carbs: 12,
      fat: 14
    },
    ingredients: [
      { amount: 450, unit: "g", name: "Lean ground turkey (93% lean or higher)" },
      { amount: 1, unit: "tbsp", name: "Homemade taco seasoning (cumin, chili powder, paprika, onion)" },
      { amount: 0.5, unit: "cup", name: "Organic tomato sauce" },
      { amount: 2, unit: "whole", name: "Romaine lettuce stalks (use outer firm leaves as boats)" },
      { amount: 0.5, unit: "cup", name: "Diced tomatoes (cherry or vine-ripe)" },
      { amount: 0.25, unit: "cup", name: "Diced red onion" },
      { amount: 1, unit: "whole", name: "Avocado, halved and diced for rich healthy fats" },
      { amount: 0.25, unit: "cup", name: "Shredded low-fat cheddar cheese" },
      { amount: 1, unit: "whole", name: "Lime, sliced into wedges" },
      { amount: 2, unit: "tbsp", name: "Fresh cilantro leaves" }
    ],
    directions: [
      "In a large skillet over medium-high heat, brown the ground turkey for 6-8 minutes, breaking it up with a wooden spoon as it cooks. Ensure there is no pink remainder.",
      "Drain any excess fat. Sprinkle the taco seasoning over the meat, then pour in the tomato sauce and 2 tablespoons of warm water. Stir to integrate.",
      "Reduce heat to low and let simmer for 3-4 minutes until the sauce reduces, coating the ground turkey in a glossy rich glaze. Taste and adjust salt.",
      "Carefully separate, wash, and pat dry the romaine lettuce leaves. They should be crisp, fresh, and stand rigid like a scoop boat.",
      "Divide the spiced taco turkey meat evenly into the lettuce boats (approx. 2-3 boats per serving).",
      "Top with the shredded cheddar, chopped red onion, diced tomatoes, fresh cilantro, and avocado. Squeeze a fresh splash of lime juice across the boats just before serving. Incredible crunch, zero processed carbs!"
    ],
    category: "weight-loss",
    difficulty: "Easy",
    seoKeywords: ["turkey tacos", "low carb weight loss", "lettuce wraps", "healthy dinner ideas"]
  },
  {
    id: "molten-chocolate-protein-mug",
    title: "1-Minute Chocolate Molten Protein Mug Cake",
    slug: "molten-chocolate-protein-mug",
    description: "The quickest healthy dessert on earth! Under an intensive caloric deficit, restricting chocolate can cause intense willpower failure. This 1-minute microwave cake uses oat flour and chocolate protein powder, hiding a delicious gooey chocolate core that satisfies sugar desires instantly.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop",
    prepTime: 3,
    cookTime: 1,
    servings: 1,
    calories: 210,
    macros: {
      protein: 24,
      carbs: 18,
      fat: 4
    },
    ingredients: [
      { amount: 1, unit: "scoop", name: "Chocolate whey or casein protein powder (regular brand)" },
      { amount: 1.5, unit: "tbsp", name: "Oat flour (or blended flour of choice)" },
      { amount: 1, unit: "tbsp", name: "Unsweetened dark cocoa powder" },
      { amount: 0.25, unit: "tsp", name: "Baking powder" },
      { amount: 4, unit: "tbsp", name: "Unsweetened dark almond milk" },
      { amount: 1, unit: "tbsp", name: "Sugar-free maple maple syrup or monkfruit extract" },
      { amount: 10, unit: "g", name: "Sugar-free dark chocolate chips or 1 dark truffle square" }
    ],
    directions: [
      "Select a large microwave-safe mug (approx. 12oz) and spray the inside lightly with coconut oil or baking spray.",
      "Add the dry ingredients directly into the mug: protein powder, oat flour, dark cocoa powder, and baking powder. Combine thoroughly with a tiny fork.",
      "Drizzle in the almond milk and sugar-free maple syrup. Whisk with the fork until a smooth, thick cake-batter consistency forms. Scrape down any batter stuck to the bottoms or edges.",
      "Press your chocolate square or dark chocolate chips right into the geometric center of the batter until it is completely submerged and covered. This forms the molten core as it cooks!",
      "Microwave on high power for 45 to 60 seconds. Do not overcook! The top should just look firm and spring back slightly when poked, but the center will remain slightly soft.",
      "Let cool for 2 minutes before eating directly from the hot mug. Top with dry raspberries or low-calorie whipped topping for an elite, instant fat-loss dessert."
    ],
    category: "healthy-snacks",
    difficulty: "Easy",
    seoKeywords: ["protein mug cake", "healthy dessert microwave", "weight loss sweet", "low calorie cake"]
  },
  {
    id: "lemon-garlic-shrimp-asparagus",
    title: "20-Min Lemon Garlic Shrimp & Asparagus Skillet",
    slug: "lemon-garlic-shrimp-asparagus",
    description: "An incredibly fast, premium-tasting low calorie dinner perfect for busy weeknights! Fresh shrimp cook in minutes, absorbing the savory garlic-lemon pan sauce while asparagus spears maintain an amazing crisp bite. Only 260 calories for an extremely satisfying, lean fitness plate.",
    image: "https://images.unsplash.com/photo-1559742811-82410b49c405?q=80&w=800&auto=format&fit=crop",
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    calories: 260,
    macros: {
      protein: 36,
      carbs: 8,
      fat: 9
    },
    ingredients: [
      { amount: 350, unit: "g", name: "Raw shrimp, peeled, deveined, and tails removed" },
      { amount: 1, unit: "bunch", name: "Fresh asparagus, ends trimmed & cut into 2-inch pieces" },
      { amount: 1.5, unit: "tbsp", name: "Unsalted organic grass-fed butter or ghee" },
      { amount: 4, unit: "cloves", name: "Garlic, minced exceptionally fine" },
      { amount: 1, unit: "whole", name: "Fresh lemon, zested and juiced" },
      { amount: 0.5, unit: "tsp", name: "Crushed red pepper flakes for subtle heat" },
      { amount: 0.25, unit: "tsp", name: "Sea salt" },
      { amount: 0.25, unit: "tsp", name: "Coarse black pepper" }
    ],
    directions: [
      "Pat raw shrimp fully dry using a paper towel. Season them with half the sea salt, black pepper, and crushed red pepper flakes in a bowl.",
      "Melt 1 tablespoon of butter in a large heavy skillet or cast-iron pan over medium-high heat. Add the trimmed asparagus pieces and cook for 4-5 minutes, tossing occasionally, until they turn bright green and slightly charred.",
      "Transfer the cooked asparagus spears onto a plate and set aside, keeping the skillet hot on the burner.",
      "Melt the remaining half tablespoon of butter in the pan. Toss in the raw shrimp and minced garlic in a single layer. Cook for about 2 minutes without moving, letting them sear a gorgeous golden color.",
      "Flip the shrimp and cook for another 1-2 minutes until pink and cooked through entirely. Do not overcook, or shrimp will turn rubbery.",
      "Return the asparagus to the pan, splash the fresh lemon juice and lemon zest directly over the shrimp and asparagus. Toss quickly for 30 seconds to allow the lemon butter pan sauce to coat everything. Plate instantly, hot, fresh, and exceptionally lean."
    ],
    category: "weight-loss",
    difficulty: "Easy",
    seoKeywords: ["shrimp recipe weight loss", "low calorie skillet", "easy seafood dinner", "ketogenic shrimp"]
  }
];
