// Workout history tracking
import { getUserKey } from './userData';

export interface WorkoutHistory {
  workoutId: string;
  workoutName: string;
  date: string;
  duration: number;
  caloriesBurned: number;
  exercisesCompleted: number;
  totalSets: number;
}

export interface DailyStats {
  date: string;
  calories: number;
  workouts: number;
  minutes: number;
}

// Get all workout history from localStorage
export const getWorkoutHistory = (): WorkoutHistory[] => {
  const history = localStorage.getItem(getUserKey('workoutHistory'));
  return history ? JSON.parse(history) : [];
};

// Save workout to history
export const saveWorkoutToHistory = (workout: WorkoutHistory) => {
  const history = getWorkoutHistory();
  history.push(workout);
  localStorage.setItem(getUserKey('workoutHistory'), JSON.stringify(history));
  
  // Dispatch custom event to notify components
  window.dispatchEvent(new CustomEvent('workoutUpdated'));
};

// Check for newly unlocked achievements after saving workout
export const checkNewAchievements = () => {
  const previousAchievements = localStorage.getItem(getUserKey('unlockedAchievements'));
  const previousUnlocked = previousAchievements ? JSON.parse(previousAchievements) : [];
  
  const currentAchievements = getAchievements();
  const currentUnlocked = currentAchievements.filter(a => a.unlocked).map(a => a.title);
  
  // Find newly unlocked achievements
  const newlyUnlocked = currentAchievements.filter(
    a => a.unlocked && !previousUnlocked.includes(a.title)
  );
  
  // Update stored achievements
  localStorage.setItem(getUserKey('unlockedAchievements'), JSON.stringify(currentUnlocked));
  
  return newlyUnlocked;
};

// Get stats for last N days
export const getStatsForLastDays = (days: number): DailyStats[] => {
  const history = getWorkoutHistory();
  const stats: { [date: string]: DailyStats } = {};
  
  // Initialize last N days
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    stats[dateStr] = {
      date: dateStr,
      calories: 0,
      workouts: 0,
      minutes: 0
    };
  }
  
  // Aggregate workout data
  history.forEach(workout => {
    const dateStr = workout.date.split('T')[0];
    if (stats[dateStr]) {
      stats[dateStr].calories += workout.caloriesBurned;
      stats[dateStr].workouts += 1;
      stats[dateStr].minutes += workout.duration;
    }
  });
  
  return Object.values(stats);
};

// Get today's stats
export const getTodayStats = () => {
  const history = getWorkoutHistory();
  const today = new Date().toISOString().split('T')[0];
  
  const todayWorkouts = history.filter(w => w.date.split('T')[0] === today);
  
  return {
    calories: todayWorkouts.reduce((sum, w) => sum + w.caloriesBurned, 0),
    workouts: todayWorkouts.length,
    minutes: todayWorkouts.reduce((sum, w) => sum + w.duration, 0)
  };
};

// Get total stats
export const getTotalStats = () => {
  const history = getWorkoutHistory();
  
  return {
    totalWorkouts: history.length,
    totalCalories: history.reduce((sum, w) => sum + w.caloriesBurned, 0),
    totalMinutes: history.reduce((sum, w) => sum + w.duration, 0),
    totalSets: history.reduce((sum, w) => sum + w.totalSets, 0)
  };
};

// Get current streak
export const getCurrentStreak = (): number => {
  const history = getWorkoutHistory();
  if (history.length === 0) return 0;
  
  // Sort by date descending
  const sorted = [...history].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  // Check if there's a workout today or yesterday
  const lastWorkout = new Date(sorted[0].date);
  lastWorkout.setHours(0, 0, 0, 0);
  const daysSinceLastWorkout = Math.floor(
    (currentDate.getTime() - lastWorkout.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  if (daysSinceLastWorkout > 1) return 0;
  
  // Count consecutive days
  const uniqueDates = [...new Set(sorted.map(w => w.date.split('T')[0]))];
  
  for (let i = 0; i < uniqueDates.length; i++) {
    const workoutDate = new Date(uniqueDates[i]);
    workoutDate.setHours(0, 0, 0, 0);
    const expectedDate = new Date(currentDate);
    expectedDate.setDate(expectedDate.getDate() - i);
    expectedDate.setHours(0, 0, 0, 0);
    
    if (workoutDate.getTime() === expectedDate.getTime()) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

// Get achievements based on workout history
export const getAchievements = () => {
  const { totalWorkouts, totalCalories } = getTotalStats();
  const streak = getCurrentStreak();
  
  return [
    { 
      icon: '🏆', 
      title: 'First Milestone', 
      description: '10 workouts completed', 
      unlocked: totalWorkouts >= 10 
    },
    { 
      icon: '💪', 
      title: 'Strength Beast', 
      description: '50 strength workouts', 
      unlocked: totalWorkouts >= 50 
    },
    { 
      icon: '🔥', 
      title: 'Week Warrior', 
      description: '7-day streak', 
      unlocked: streak >= 7 
    },
    { 
      icon: '⚡', 
      title: 'Speed Demon', 
      description: 'Complete 30+ workouts', 
      unlocked: totalWorkouts >= 30 
    },
    { 
      icon: '🎯', 
      title: 'Perfect Month', 
      description: '30-day streak', 
      unlocked: streak >= 30 
    },
    { 
      icon: '👑', 
      title: 'Gym Legend', 
      description: '100 workouts', 
      unlocked: totalWorkouts >= 100 
    }
  ];
};
