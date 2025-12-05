// Utility to reset all user data - useful for development/testing
// This clears ALL user-specific data from localStorage

export const clearAllUserData = () => {
  const keys = Object.keys(localStorage);
  
  // Remove all user-specific keys (those with email_ prefix)
  keys.forEach(key => {
    if (key.includes('@') && key.includes('_')) {
      localStorage.removeItem(key);
    }
  });
  
  // Remove old global data keys
  const globalKeys = [
    'workoutHistory',
    'unlockedAchievements',
    'activeDietPlan',
    'scheduledMealPlan',
    'workoutReminders',
    'globalDataMigrated'
  ];
  
  globalKeys.forEach(key => {
    localStorage.removeItem(key);
  });
  
  // Remove meal tracking keys
  keys.forEach(key => {
    if (key.startsWith('meals-') || key.includes('_meals-')) {
      localStorage.removeItem(key);
    }
    if (key.startsWith('sentNotifications-') || key.includes('_sentNotifications-')) {
      localStorage.removeItem(key);
    }
    if (key.startsWith('sentWorkoutReminders-') || key.includes('_sentWorkoutReminders-')) {
      localStorage.removeItem(key);
    }
  });
  
  console.log('✅ All user data cleared!');
};

// Clear data for a specific user
export const clearUserData = (userEmail: string) => {
  const keys = Object.keys(localStorage);
  const prefix = `${userEmail}_`;
  
  keys.forEach(key => {
    if (key.startsWith(prefix)) {
      localStorage.removeItem(key);
    }
  });
  
  console.log(`✅ Data cleared for ${userEmail}`);
};

// Development helper - expose to window for easy console access
if (typeof window !== 'undefined') {
  (window as any).clearAllUserData = clearAllUserData;
  (window as any).clearUserData = clearUserData;
}
