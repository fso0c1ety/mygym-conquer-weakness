// Meal notification system
import { getUserKey } from './userData';

export interface MealNotification {
  mealName: string;
  time: string;
  calories: number;
}

// Request notification permission
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

// Schedule notifications for a diet plan
export const scheduleMealNotifications = (planId: string, meals: MealNotification[]) => {
  // Store the scheduled plan
  localStorage.setItem(getUserKey('scheduledMealPlan'), JSON.stringify({
    planId,
    meals,
    scheduledAt: new Date().toISOString()
  }));

  // Check and send notifications every minute
  checkMealNotifications();
};

// Check if it's time to send notifications
export const checkMealNotifications = () => {
  const scheduled = localStorage.getItem(getUserKey('scheduledMealPlan'));
  if (!scheduled) return;

  const { planId, meals } = JSON.parse(scheduled);
  const now = new Date();
  const currentTime = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
  const today = now.toISOString().split('T')[0];

  // Get already sent notifications for today
  const sentKey = getUserKey(`sentNotifications-${today}`);
  const sentToday = localStorage.getItem(sentKey);
  const sentMeals = sentToday ? JSON.parse(sentToday) : [];

  // Clean up old notification records (keep only last 7 days)
  cleanupOldNotifications();

  meals.forEach((meal: MealNotification) => {
    // Convert meal time to 24-hour format for comparison
    const mealTime24 = convertTo24Hour(meal.time);
    
    // Check if it's within 5 minutes of meal time and not already sent
    if (isWithinTimeWindow(currentTime, mealTime24, 5) && !sentMeals.includes(meal.mealName)) {
      sendMealNotification(meal);
      sentMeals.push(meal.mealName);
      localStorage.setItem(sentKey, JSON.stringify(sentMeals));
    }
  });
};

// Convert 12-hour time to 24-hour format
const convertTo24Hour = (time12: string): string => {
  const [time, period] = time12.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  
  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }
  
  return `${hours}:${String(minutes).padStart(2, '0')}`;
};

// Check if current time is within X minutes of target time
const isWithinTimeWindow = (current: string, target: string, windowMinutes: number): boolean => {
  const [currentH, currentM] = current.split(':').map(Number);
  const [targetH, targetM] = target.split(':').map(Number);
  
  const currentMinutes = currentH * 60 + currentM;
  const targetMinutes = targetH * 60 + targetM;
  
  const diff = Math.abs(currentMinutes - targetMinutes);
  return diff <= windowMinutes;
};

// Send a meal notification
const sendMealNotification = (meal: MealNotification) => {
  if (Notification.permission === 'granted') {
    new Notification('🍽️ Time to Eat!', {
      body: `${meal.mealName} - ${meal.calories} calories\nIt's time for your scheduled meal!`,
      icon: '/logo.png',
      badge: '/logo.png',
      tag: meal.mealName,
      requireInteraction: false,
      silent: false
    });
  }
};

// Start notification checker (call this on app startup)
export const startNotificationService = () => {
  // Check immediately
  checkMealNotifications();
  
  // Check every minute
  setInterval(checkMealNotifications, 60000);
};

// Cancel all meal notifications
export const cancelMealNotifications = () => {
  localStorage.removeItem(getUserKey('scheduledMealPlan'));
};

// Get active meal plan notifications
export const getActiveMealPlan = () => {
  const scheduled = localStorage.getItem(getUserKey('scheduledMealPlan'));
  return scheduled ? JSON.parse(scheduled) : null;
};

// Clean up old notification records
const cleanupOldNotifications = () => {
  const keys = Object.keys(localStorage);
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) return;
  
  const prefix = `${userEmail}_sentNotifications-`;
  
  keys.forEach(key => {
    if (key.startsWith(prefix)) {
      const dateStr = key.replace(prefix, '');
      const notificationDate = new Date(dateStr);
      
      if (notificationDate < sevenDaysAgo) {
        localStorage.removeItem(key);
      }
    }
  });
};
