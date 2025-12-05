export type WorkoutCategory = 
  | "strength" 
  | "cardio" 
  | "flexibility" 
  | "core" 
  | "upper" 
  | "lower" 
  | "full-body"
  | "hiit";

export type WorkoutDifficulty = "beginner" | "intermediate" | "advanced";

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: number; // rest time in seconds
  instructions: string[];
  targetMuscles: string[];
  videoUrl: string;
}

export interface Workout {
  id: string;
  title: string;
  duration: number;
  calories: number;
  exercises: Exercise[];
  category: WorkoutCategory;
  difficulty: WorkoutDifficulty;
  color: string;
  image: string;
  description?: string;
}

export const workouts: Workout[] = [
  // Lower Body Workouts
  {
    id: "1",
    title: "Lower body workout",
    duration: 30,
    calories: 450,
    exercises: [
      {
        name: "Barbell Squats",
        sets: 4,
        reps: "8-12",
        rest: 90,
        instructions: [
          "Stand with feet shoulder-width apart",
          "Lower your body as if sitting back into a chair",
          "Keep chest up and knees behind toes",
          "Push through heels to return to start"
        ],
        targetMuscles: ["Quads", "Glutes", "Hamstrings"],
        videoUrl: "https://www.youtube-nocookie.com/embed/ultWZbUMPL8"
      },
      {
        name: "Romanian Deadlifts",
        sets: 3,
        reps: "10-12",
        rest: 60,
        instructions: [
          "Hold barbell with overhand grip",
          "Keep slight bend in knees",
          "Hinge at hips, lowering bar along shins",
          "Feel the stretch in hamstrings, then return"
        ],
        targetMuscles: ["Hamstrings", "Glutes", "Lower Back"],
        videoUrl: "https://www.youtube-nocookie.com/embed/JAi1YlloudQ"
      },
      {
        name: "Walking Lunges",
        sets: 3,
        reps: "12 each leg",
        rest: 60,
        instructions: [
          "Step forward with one leg",
          "Lower hips until both knees bent at 90°",
          "Push off back foot to next lunge",
          "Alternate legs with each step"
        ],
        targetMuscles: ["Quads", "Glutes", "Hamstrings"],
        videoUrl: "https://www.youtube-nocookie.com/embed/L8fvypPrzzs"
      }
    ],
    category: "lower",
    difficulty: "intermediate",
    color: "purple",
    image: "workout-squats",
    description: "Build strong legs and glutes",
  },
  {
    id: "3",
    title: "Leg power workout",
    duration: 35,
    calories: 520,
    exercises: [
      {
        name: "Jump Squats",
        sets: 4,
        reps: "10-15",
        rest: 45,
        instructions: [
          "Start in squat position",
          "Explode upward jumping as high as possible",
          "Land softly and immediately go into next rep",
          "Keep core tight throughout"
        ],
        targetMuscles: ["Quads", "Glutes", "Calves"],
        videoUrl: "https://www.youtube-nocookie.com/embed/A-cFYWvaHr0"
      },
      {
        name: "Bulgarian Split Squats",
        sets: 3,
        reps: "10 each leg",
        rest: 60,
        instructions: [
          "Place back foot on elevated surface",
          "Front foot far enough forward",
          "Lower until front thigh parallel to ground",
          "Push through front heel to return"
        ],
        targetMuscles: ["Quads", "Glutes"],
        videoUrl: "https://www.youtube-nocookie.com/embed/2C-uNgKwPLE"
      },
      {
        name: "Calf Raises",
        sets: 4,
        reps: "15-20",
        rest: 30,
        instructions: [
          "Stand on edge of step or platform",
          "Raise heels as high as possible",
          "Hold at top for 1 second",
          "Lower slowly below step level"
        ],
        targetMuscles: ["Calves"],
        videoUrl: "https://www.youtube-nocookie.com/embed/gwLzBJYoWlI"
      }
    ],
    category: "lower",
    difficulty: "intermediate",
    color: "yellow",
    image: "workout-lunges",
    description: "Explosive leg power training",
  },

  // Upper Body Workouts
  {
    id: "2",
    title: "Upper body workout",
    duration: 28,
    calories: 380,
    exercises: [
      {
        name: "Push-ups",
        sets: 3,
        reps: "12-15",
        rest: 45,
        instructions: [
          "Start in plank position, hands shoulder-width",
          "Lower chest to ground, elbows at 45°",
          "Push back up to start",
          "Keep core tight, body in straight line"
        ],
        targetMuscles: ["Chest", "Triceps", "Shoulders"],
        videoUrl: "https://www.youtube-nocookie.com/embed/IODxDxX7oi4"
      },
      {
        name: "Dumbbell Chest Press",
        sets: 3,
        reps: "10-12",
        rest: 60,
        instructions: [
          "Lie on bench with dumbbells at chest level",
          "Press weights up until arms extended",
          "Lower slowly back to start",
          "Keep shoulder blades retracted"
        ],
        targetMuscles: ["Chest", "Triceps"],
        videoUrl: "https://www.youtube-nocookie.com/embed/VmB1G1K7v94"
      },
      {
        name: "Tricep Dips",
        sets: 3,
        reps: "10-12",
        rest: 45,
        instructions: [
          "Grip edge of bench, legs extended",
          "Lower body by bending elbows",
          "Push back up to start",
          "Keep elbows close to body"
        ],
        targetMuscles: ["Triceps", "Shoulders"],
        videoUrl: "https://www.youtube-nocookie.com/embed/0326dy_-CzM"
      }
    ],
    category: "upper",
    difficulty: "beginner",
    color: "pink",
    image: "workout-pushups",
    description: "Build upper body strength",
  },
  {
    id: "5",
    title: "Upper body power",
    duration: 32,
    calories: 420,
    exercises: [
      {
        name: "Dumbbell Shoulder Press",
        sets: 4,
        reps: "8-10",
        rest: 60,
        instructions: [
          "Stand with dumbbells at shoulder height",
          "Press weights overhead until arms extended",
          "Lower back to shoulders with control",
          "Keep core engaged"
        ],
        targetMuscles: ["Shoulders", "Triceps"],
        videoUrl: "https://www.youtube-nocookie.com/embed/qEwKCR5JCog"
      },
      {
        name: "Barbell Curls",
        sets: 3,
        reps: "10-12",
        rest: 45,
        instructions: [
          "Stand holding barbell with underhand grip",
          "Curl weight up to shoulders",
          "Squeeze biceps at top",
          "Lower slowly, keep elbows stationary"
        ],
        targetMuscles: ["Biceps"],
        videoUrl: "https://www.youtube-nocookie.com/embed/kwG2ipFRgfo"
      },
      {
        name: "Lateral Raises",
        sets: 3,
        reps: "12-15",
        rest: 45,
        instructions: [
          "Hold dumbbells at sides",
          "Raise arms out to sides to shoulder height",
          "Keep slight bend in elbows",
          "Lower with control"
        ],
        targetMuscles: ["Shoulders"],
        videoUrl: "https://www.youtube-nocookie.com/embed/3VcKaXpzqRo"
      }
    ],
    category: "upper",
    difficulty: "intermediate",
    color: "purple",
    image: "workout-seated",
    description: "Power up your upper body",
  },

  // Core Workouts
  {
    id: "7",
    title: "Core Strengthening",
    duration: 20,
    calories: 250,
    exercises: [
      {
        name: "Plank",
        sets: 3,
        reps: "60 seconds",
        rest: 30,
        instructions: [
          "Start in push-up position on forearms",
          "Keep body in straight line from head to heels",
          "Engage core, don't let hips sag",
          "Hold for prescribed time"
        ],
        targetMuscles: ["Core", "Abs", "Shoulders"],
        videoUrl: "https://www.youtube-nocookie.com/embed/ASdvN_XEl_c"
      },
      {
        name: "Russian Twists",
        sets: 3,
        reps: "20 each side",
        rest: 30,
        instructions: [
          "Sit with knees bent, feet off ground",
          "Lean back slightly, keep back straight",
          "Rotate torso side to side",
          "Touch floor beside you each rep"
        ],
        targetMuscles: ["Obliques", "Core"],
        videoUrl: "https://www.youtube-nocookie.com/embed/wkD8rjkodUI"
      },
      {
        name: "Leg Raises",
        sets: 3,
        reps: "12-15",
        rest: 30,
        instructions: [
          "Lie on back, legs straight",
          "Raise legs up to 90 degrees",
          "Lower slowly without touching ground",
          "Keep lower back pressed to floor"
        ],
        targetMuscles: ["Lower Abs", "Hip Flexors"],
        videoUrl: "https://www.youtube-nocookie.com/embed/JB2oyawG9KI"
      }
    ],
    category: "core",
    difficulty: "beginner",
    color: "blue",
    image: "workout-deadlift",
    description: "Build a strong foundation",
  },

  // Full Body Workouts
  {
    id: "4",
    title: "Full body strength",
    duration: 40,
    calories: 600,
    exercises: [
      {
        name: "Deadlifts",
        sets: 4,
        reps: "6-8",
        rest: 120,
        instructions: [
          "Stand with barbell over mid-foot",
          "Bend down and grip bar outside knees",
          "Keep back straight, lift by extending hips and knees",
          "Stand fully upright, then lower with control"
        ],
        targetMuscles: ["Back", "Glutes", "Hamstrings", "Core"],
        videoUrl: "https://www.youtube-nocookie.com/embed/op9kVnSso6Q"
      },
      {
        name: "Bench Press",
        sets: 4,
        reps: "8-10",
        rest: 90,
        instructions: [
          "Lie on bench, grip bar slightly wider than shoulders",
          "Lower bar to chest with control",
          "Press back up explosively",
          "Keep feet flat on floor"
        ],
        targetMuscles: ["Chest", "Triceps", "Shoulders"],
        videoUrl: "https://www.youtube-nocookie.com/embed/rT7DgCr-3pg"
      },
      {
        name: "Pull-ups",
        sets: 3,
        reps: "8-12",
        rest: 90,
        instructions: [
          "Hang from bar with overhand grip",
          "Pull yourself up until chin over bar",
          "Lower with control",
          "Engage lats throughout"
        ],
        targetMuscles: ["Back", "Biceps"],
        videoUrl: "https://www.youtube-nocookie.com/embed/eGo4IYlbE5g"
      }
    ],
    category: "full-body",
    difficulty: "advanced",
    color: "green",
    image: "workout-deadlift",
    description: "Total body strength training",
  },

  // HIIT/Cardio Workouts
  {
    id: "6",
    title: "HIIT Cardio Blast",
    duration: 25,
    calories: 500,
    exercises: [
      {
        name: "Burpees",
        sets: 4,
        reps: "45 sec on / 15 sec rest",
        rest: 15,
        instructions: [
          "Start standing, drop into squat",
          "Kick feet back to plank position",
          "Do a push-up",
          "Jump feet forward, explode up"
        ],
        targetMuscles: ["Full Body", "Cardio"],
        videoUrl: "https://www.youtube-nocookie.com/embed/TU8QYVW0gDU"
      },
      {
        name: "Mountain Climbers",
        sets: 4,
        reps: "45 sec on / 15 sec rest",
        rest: 15,
        instructions: [
          "Start in plank position",
          "Drive knees toward chest alternately",
          "Move as fast as possible",
          "Keep hips level"
        ],
        targetMuscles: ["Core", "Shoulders", "Cardio"],
        videoUrl: "https://www.youtube-nocookie.com/embed/nmwgirgXLYM"
      },
      {
        name: "Jump Squats",
        sets: 4,
        reps: "45 sec on / 15 sec rest",
        rest: 15,
        instructions: [
          "Squat down",
          "Explode up jumping high",
          "Land softly",
          "Immediately go into next rep"
        ],
        targetMuscles: ["Legs", "Glutes", "Cardio"],
        videoUrl: "https://www.youtube-nocookie.com/embed/A-cFYWvaHr0"
      },
      {
        name: "High Knees",
        sets: 4,
        reps: "45 sec on / 15 sec rest",
        rest: 15,
        instructions: [
          "Run in place",
          "Drive knees up to hip height",
          "Pump arms vigorously",
          "Maintain fast pace"
        ],
        targetMuscles: ["Legs", "Core", "Cardio"],
        videoUrl: "https://www.youtube-nocookie.com/embed/8opcQdC-V-U"
      }
    ],
    category: "hiit",
    difficulty: "intermediate",
    color: "red",
    image: "workout-squats",
    description: "High-intensity fat burning",
  },
];

// Helper functions
export const getWorkoutsByCategory = (category: WorkoutCategory) => {
  return workouts.filter(w => w.category === category);
};

export const getWorkoutsByDifficulty = (difficulty: WorkoutDifficulty) => {
  return workouts.filter(w => w.difficulty === difficulty);
};

export const getCategoryLabel = (category: WorkoutCategory): string => {
  const labels: Record<WorkoutCategory, string> = {
    "lower": "Lower Body",
    "upper": "Upper Body",
    "full-body": "Full Body",
    "core": "Core",
    "hiit": "HIIT",
    "cardio": "Cardio",
    "strength": "Strength",
    "flexibility": "Flexibility",
  };
  return labels[category];
};

export const getCategoryIcon = (category: WorkoutCategory): string => {
  const icons: Record<WorkoutCategory, string> = {
    "lower": "🦵",
    "upper": "💪",
    "full-body": "🏋️",
    "core": "🔥",
    "hiit": "⚡",
    "cardio": "❤️",
    "strength": "💯",
    "flexibility": "🧘",
  };
  return icons[category];
};

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

export interface Challenge {
  title: string;
  description: string;
  image: string;
}

export const getTodaysChallenges = (): Challenge[] => [
  {
    title: "Casey's Challenge",
    description: "Urban area start | 3:00 PM",
    image: "challenge-running",
  },
  {
    title: "Mountain Sprint",
    description: "Hill sprints | 5:00 PM",
    image: "workout-squats",
  },
  {
    title: "Endurance Ride",
    description: "Cycle 20km | 7:00 AM",
    image: "workout-lunges",
  },
  {
    title: "Core Crusher",
    description: "Abs & Core | 6:30 PM",
    image: "workout-pushups",
  },
];
