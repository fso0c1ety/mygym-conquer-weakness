// Workout reminder notification system
import { getUserKey } from './userData';

export interface WorkoutReminder {
  workoutId: string;
  workoutName: string;
  time: string; // HH:MM format
  enabled: boolean;
  days: number[]; // 0-6, Sunday-Saturday
}

// Request notification permission
export const requestWorkoutNotificationPermission = async (): Promise<boolean> => {
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

// Save workout reminder
export const saveWorkoutReminder = (reminder: WorkoutReminder) => {
  const reminders = getWorkoutReminders();
  const existingIndex = reminders.findIndex(r => r.workoutId === reminder.workoutId);
  
  if (existingIndex >= 0) {
    reminders[existingIndex] = reminder;
  } else {
    reminders.push(reminder);
  }
  
  localStorage.setItem(getUserKey('workoutReminders'), JSON.stringify(reminders));
};

// Get all workout reminders
export const getWorkoutReminders = (): WorkoutReminder[] => {
  const reminders = localStorage.getItem(getUserKey('workoutReminders'));
  return reminders ? JSON.parse(reminders) : [];
};

// Get reminder for specific workout
export const getWorkoutReminder = (workoutId: string): WorkoutReminder | null => {
  const reminders = getWorkoutReminders();
  return reminders.find(r => r.workoutId === workoutId) || null;
};

// Delete workout reminder
export const deleteWorkoutReminder = (workoutId: string) => {
  const reminders = getWorkoutReminders();
  const filtered = reminders.filter(r => r.workoutId !== workoutId);
  localStorage.setItem(getUserKey('workoutReminders'), JSON.stringify(filtered));
};

// Check if it's time to send workout reminders
export const checkWorkoutReminders = () => {
  const reminders = getWorkoutReminders();
  const now = new Date();
  const currentTime = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
  const currentDay = now.getDay();
  const today = now.toISOString().split('T')[0];

  // Get already sent reminders for today
  const sentKey = getUserKey(`sentWorkoutReminders-${today}`);
  const sentToday = localStorage.getItem(sentKey);
  const sentReminders = sentToday ? JSON.parse(sentToday) : [];

  // Clean up old reminder records
  cleanupOldWorkoutReminders();

  reminders.forEach((reminder: WorkoutReminder) => {
    if (!reminder.enabled) return;
    
    // Check if today is a scheduled day
    if (!reminder.days.includes(currentDay)) return;
    
    // Check if it's within 5 minutes of reminder time and not already sent
    if (isWithinTimeWindow(currentTime, reminder.time, 5) && !sentReminders.includes(reminder.workoutId)) {
      sendWorkoutReminder(reminder);
      sentReminders.push(reminder.workoutId);
      localStorage.setItem(sentKey, JSON.stringify(sentReminders));
    }
  });
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

// Send a workout reminder notification
const sendWorkoutReminder = (reminder: WorkoutReminder) => {
  if (Notification.permission === 'granted') {
    new Notification('💪 Time to Work Out!', {
      body: `${reminder.workoutName}\nYour scheduled workout is starting now. Let's crush it!`,
      icon: '/logo.png',
      badge: '/logo.png',
      tag: `workout-${reminder.workoutId}`,
      requireInteraction: false,
      silent: false
    });
  }
};

// Clean up old workout reminder records
const cleanupOldWorkoutReminders = () => {
  const keys = Object.keys(localStorage);
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) return;
  
  const prefix = `${userEmail}_sentWorkoutReminders-`;
  
  keys.forEach(key => {
    if (key.startsWith(prefix)) {
      const dateStr = key.replace(prefix, '');
      const reminderDate = new Date(dateStr);
      
      if (reminderDate < sevenDaysAgo) {
        localStorage.removeItem(key);
      }
    }
  });
};

// Start workout reminder checker
export const startWorkoutReminderService = () => {
  // Check immediately
  checkWorkoutReminders();
  
  // Check every minute
  setInterval(checkWorkoutReminders, 60000);
};
