export interface DietPlan {
  id: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  meals: number;
  goal: "weight-loss" | "muscle-gain" | "maintenance";
  image: string;
  color: string;
}

export const dietPlans: DietPlan[] = [
  {
    id: "1",
    name: "Lean Warrior",
    description: "High protein, moderate carbs for muscle building",
    calories: 2800,
    protein: 200,
    carbs: 280,
    fats: 80,
    meals: 5,
    goal: "muscle-gain",
    image: "workout-deadlift",
    color: "from-green-600 to-green-800",
  },
  {
    id: "5",
    name: "Shred & Burn",
    description: "Low carb, high protein for rapid fat loss",
    calories: 1600,
    protein: 140,
    carbs: 90,
    fats: 55,
    meals: 4,
    goal: "weight-loss",
    image: "challenge-running",
    color: "from-orange-600 to-orange-800",
  },
  {
    id: "6",
    name: "Balanced Life",
    description: "Perfect for maintaining your current physique",
    calories: 2200,
    protein: 160,
    carbs: 220,
    fats: 65,
    meals: 5,
    goal: "maintenance",
    image: "workout-squats",
    color: "from-blue-600 to-blue-800",
  },
  {
    id: "7",
    name: "Vegan Muscle",
    description: "Plant-based, high protein for muscle gain",
    calories: 2700,
    protein: 180,
    carbs: 300,
    fats: 70,
    meals: 5,
    goal: "muscle-gain",
    image: "workout-pushups",
    color: "from-lime-600 to-lime-800",
  },
  {
    id: "8",
    name: "Quick Start",
    description: "Simple, easy-to-follow plan for beginners",
    calories: 2000,
    protein: 120,
    carbs: 200,
    fats: 60,
    meals: 3,
    goal: "weight-loss",
    image: "workout-lunges",
    color: "from-pink-600 to-pink-800",
  },
  {
    id: "2",
    name: "Fat Burner",
    description: "Calorie deficit plan for maximum fat loss",
    calories: 1800,
    protein: 150,
    carbs: 150,
    fats: 60,
    meals: 4,
    goal: "weight-loss",
    image: "challenge-running",
    color: "from-red-600 to-red-800",
  },
  {
    id: "3",
    name: "Performance Fuel",
    description: "Balanced nutrition for athletic performance",
    calories: 2400,
    protein: 180,
    carbs: 240,
    fats: 70,
    meals: 5,
    goal: "maintenance",
    image: "workout-squats",
    color: "from-purple-600 to-purple-800",
  },
  {
    id: "4",
    name: "Mass Builder",
    description: "High calorie plan for serious muscle gain",
    calories: 3500,
    protein: 220,
    carbs: 400,
    fats: 100,
    meals: 6,
    goal: "muscle-gain",
    image: "workout-pushups",
    color: "from-yellow-600 to-yellow-800",
  },
];
