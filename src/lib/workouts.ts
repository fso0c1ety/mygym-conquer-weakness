export interface Workout {
  id: string;
  title: string;
  duration: number;
  calories: number;
  exercises: string[];
  category: "lower" | "upper" | "all";
  color: string;
  image: string;
}

export const workouts: Workout[] = [
  {
    id: "1",
    title: "Lower body workout",
    duration: 30,
    calories: 450,
    exercises: ["Squats", "Glutes", "Hamstrings"],
    category: "lower",
    color: "purple",
    image: "workout-squats",
  },
  {
    id: "2",
    title: "Upper body workout",
    duration: 28,
    calories: 380,
    exercises: ["Push-ups", "Chest", "Triceps"],
    category: "upper",
    color: "pink",
    image: "workout-pushups",
  },
  {
    id: "3",
    title: "Leg power workout",
    duration: 35,
    calories: 520,
    exercises: ["Lunges", "Quads", "Calves"],
    category: "lower",
    color: "yellow",
    image: "workout-lunges",
  },
  {
    id: "4",
    title: "Full body strength",
    duration: 40,
    calories: 600,
    exercises: ["Deadlifts", "Core", "Back"],
    category: "all",
    color: "green",
    image: "workout-deadlift",
  },
  {
    id: "5",
    title: "Upper body power",
    duration: 32,
    calories: 420,
    exercises: ["Bicep curls", "Shoulders", "Arms"],
    category: "upper",
    color: "purple",
    image: "workout-seated",
  },
];

export interface ActivityData {
  date: string;
  steps: number;
  caloriesBurned: number;
  caloriesRemaining: number;
  caloriesGoal: number;
}

export const todayActivity: ActivityData = {
  date: new Date().toISOString(),
  steps: 8342,
  caloriesBurned: 1429,
  caloriesRemaining: 840,
  caloriesGoal: 2340,
};

export const getTodaysChallenge = () => ({
  title: "Casey's Challenge",
  description: "Urban area start | 3:00 PM",
  image: "challenge-running",
});
