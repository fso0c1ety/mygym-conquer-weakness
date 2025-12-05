// User-specific data management
// All data is scoped to the currently logged-in user

export const getCurrentUserEmail = (): string | null => {
  return localStorage.getItem('userEmail');
};

// Get user-specific key
export const getUserKey = (key: string): string => {
  const userEmail = getCurrentUserEmail();
  if (!userEmail) return key; // Fallback to global key if no user
  return `${userEmail}_${key}`;
};

// User-specific localStorage methods
export const setUserData = (key: string, value: any): void => {
  const userKey = getUserKey(key);
  localStorage.setItem(userKey, JSON.stringify(value));
};

export const getUserData = (key: string): any => {
  const userKey = getUserKey(key);
  const data = localStorage.getItem(userKey);
  return data ? JSON.parse(data) : null;
};

export const removeUserData = (key: string): void => {
  const userKey = getUserKey(key);
  localStorage.removeItem(userKey);
};

// Migrate existing data to user-specific data (call once on login)
// This should only happen for the FIRST user, not for new signups
export const migrateToUserData = (email: string): void => {
  // Check if migration has already happened globally
  const migrationDone = localStorage.getItem('globalDataMigrated');
  if (migrationDone) {
    // Global data was already migrated to another user, don't copy to new users
    return;
  }

  const keysToMigrate = [
    'workoutHistory',
    'unlockedAchievements',
    'activeDietPlan',
    'scheduledMealPlan',
    'workoutReminders'
  ];
  
  // Check if there's any global data to migrate
  const hasGlobalData = keysToMigrate.some(key => localStorage.getItem(key));
  
  if (!hasGlobalData) {
    // No global data exists, this is a fresh start - don't set migration flag
    return;
  }
  
  keysToMigrate.forEach(key => {
    const globalData = localStorage.getItem(key);
    const userKey = `${email}_${key}`;
    
    // Migrate global data to this user
    if (globalData) {
      localStorage.setItem(userKey, globalData);
    }
  });
  
  // Also migrate meal completion data (last 7 days)
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const mealKey = `meals-${dateStr}`;
    const globalMeals = localStorage.getItem(mealKey);
    const userMealKey = `${email}_${mealKey}`;
    
    if (globalMeals) {
      localStorage.setItem(userMealKey, globalMeals);
    }
  }
  
  // Mark that migration has happened - future users won't get this data
  localStorage.setItem('globalDataMigrated', email);
};
