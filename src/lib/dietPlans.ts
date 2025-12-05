export interface Meal {
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  foods: string[];
}

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
  mealPlan: Meal[];
}

const createDefaultMeals = (totalCals: number, protein: number, carbs: number, fats: number, mealCount: number): Meal[] => {
  const calsPerMeal = Math.round(totalCals / mealCount);
  const proteinPerMeal = Math.round(protein / mealCount);
  const carbsPerMeal = Math.round(carbs / mealCount);
  const fatsPerMeal = Math.round(fats / mealCount);
  
  const mealTimes = ["7:00 AM", "10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "9:00 PM"];
  const mealNames = ["Breakfast", "Mid-Morning", "Lunch", "Afternoon", "Dinner", "Evening Snack"];
  
  return Array.from({ length: mealCount }, (_, i) => ({
    name: mealNames[i],
    time: mealTimes[i],
    calories: calsPerMeal,
    protein: proteinPerMeal,
    carbs: carbsPerMeal,
    fats: fatsPerMeal,
    foods: []
  }));
};

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
    mealPlan: [
      {
        name: "Breakfast",
        time: "7:00 AM",
        calories: 600,
        protein: 45,
        carbs: 60,
        fats: 18,
        foods: ["4 whole eggs scrambled", "2 slices whole wheat toast", "1 cup oatmeal", "1 banana"]
      },
      {
        name: "Mid-Morning",
        time: "10:00 AM",
        calories: 350,
        protein: 30,
        carbs: 40,
        fats: 8,
        foods: ["Protein shake (whey)", "1 apple", "10-12 almonds"]
      },
      {
        name: "Lunch",
        time: "1:00 PM",
        calories: 700,
        protein: 50,
        carbs: 70,
        fats: 18,
        foods: ["8oz grilled chicken", "2 cups brown rice", "Mixed vegetables", "Olive oil"]
      },
      {
        name: "Pre-Workout",
        time: "4:00 PM",
        calories: 400,
        protein: 25,
        carbs: 50,
        fats: 10,
        foods: ["Greek yogurt", "Granola", "Berries", "Honey"]
      },
      {
        name: "Dinner",
        time: "7:00 PM",
        calories: 750,
        protein: 50,
        carbs: 60,
        fats: 26,
        foods: ["8oz salmon", "Sweet potato", "Broccoli", "Avocado"]
      }
    ]
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
    mealPlan: [
      {
        name: "Breakfast",
        time: "7:00 AM",
        calories: 350,
        protein: 35,
        carbs: 20,
        fats: 15,
        foods: ["3 egg whites + 1 whole egg", "Spinach", "1/2 avocado", "Black coffee"]
      },
      {
        name: "Lunch",
        time: "12:00 PM",
        calories: 450,
        protein: 45,
        carbs: 25,
        fats: 18,
        foods: ["6oz grilled chicken", "Large salad", "Olive oil dressing", "Cherry tomatoes"]
      },
      {
        name: "Snack",
        time: "3:00 PM",
        calories: 250,
        protein: 25,
        carbs: 15,
        fats: 10,
        foods: ["Protein shake", "Celery sticks", "2 tbsp almond butter"]
      },
      {
        name: "Dinner",
        time: "6:00 PM",
        calories: 550,
        protein: 35,
        carbs: 30,
        fats: 12,
        foods: ["6oz lean beef", "Cauliflower rice", "Asparagus", "Mushrooms"]
      }
    ]
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
    mealPlan: [
      {
        name: "Breakfast",
        time: "7:00 AM",
        calories: 450,
        protein: 30,
        carbs: 50,
        fats: 14,
        foods: ["3 eggs", "2 toast", "Peanut butter", "Orange juice"]
      },
      {
        name: "Snack",
        time: "10:00 AM",
        calories: 250,
        protein: 20,
        carbs: 30,
        fats: 8,
        foods: ["Protein bar", "Greek yogurt"]
      },
      {
        name: "Lunch",
        time: "1:00 PM",
        calories: 600,
        protein: 40,
        carbs: 60,
        fats: 18,
        foods: ["Turkey sandwich", "Quinoa salad", "Mixed nuts"]
      },
      {
        name: "Snack",
        time: "4:00 PM",
        calories: 300,
        protein: 20,
        carbs: 35,
        fats: 10,
        foods: ["Fruit smoothie", "Protein powder", "Flax seeds"]
      },
      {
        name: "Dinner",
        time: "7:00 PM",
        calories: 600,
        protein: 50,
        carbs: 45,
        fats: 15,
        foods: ["Grilled fish", "Roasted vegetables", "Quinoa", "Side salad"]
      }
    ]
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
    mealPlan: [
      {
        name: "Breakfast",
        time: "7:00 AM",
        calories: 550,
        protein: 35,
        carbs: 65,
        fats: 15,
        foods: ["Tofu scramble", "Whole grain toast", "Avocado", "Berries", "Almond milk"]
      },
      {
        name: "Snack",
        time: "10:00 AM",
        calories: 400,
        protein: 30,
        carbs: 50,
        fats: 12,
        foods: ["Vegan protein shake", "Banana", "Chia seeds", "Oat milk"]
      },
      {
        name: "Lunch",
        time: "1:00 PM",
        calories: 650,
        protein: 40,
        carbs: 75,
        fats: 18,
        foods: ["Lentil curry", "Brown rice", "Chickpeas", "Spinach"]
      },
      {
        name: "Snack",
        time: "4:00 PM",
        calories: 350,
        protein: 25,
        carbs: 45,
        fats: 10,
        foods: ["Hummus", "Whole wheat pita", "Veggies", "Tahini"]
      },
      {
        name: "Dinner",
        time: "7:00 PM",
        calories: 750,
        protein: 50,
        carbs: 65,
        fats: 15,
        foods: ["Tempeh stir-fry", "Quinoa", "Edamame", "Mixed vegetables", "Cashews"]
      }
    ]
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
    mealPlan: [
      {
        name: "Breakfast",
        time: "8:00 AM",
        calories: 600,
        protein: 35,
        carbs: 65,
        fats: 20,
        foods: ["2 eggs", "Toast", "Yogurt", "Fruit", "Coffee"]
      },
      {
        name: "Lunch",
        time: "1:00 PM",
        calories: 700,
        protein: 45,
        carbs: 70,
        fats: 22,
        foods: ["Chicken breast", "Rice", "Vegetables", "Olive oil"]
      },
      {
        name: "Dinner",
        time: "7:00 PM",
        calories: 700,
        protein: 40,
        carbs: 65,
        fats: 18,
        foods: ["Fish or lean meat", "Pasta or potato", "Salad", "Dressing"]
      }
    ]
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
    mealPlan: createDefaultMeals(1800, 150, 150, 60, 4)
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
    mealPlan: createDefaultMeals(2400, 180, 240, 70, 5)
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
    mealPlan: createDefaultMeals(3500, 220, 400, 100, 6)
  },
];
