// Performance utilities for debouncing and throttling

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Cache localStorage reads
const cache = new Map<string, { value: any; timestamp: number }>();
const CACHE_DURATION = 1000; // 1 second cache

export const getCachedItem = (key: string): string | null => {
  const cached = cache.get(key);
  const now = Date.now();
  
  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.value;
  }
  
  const value = localStorage.getItem(key);
  cache.set(key, { value, timestamp: now });
  return value;
};

export const setCachedItem = (key: string, value: string): void => {
  localStorage.setItem(key, value);
  cache.set(key, { value, timestamp: Date.now() });
};

export const removeCachedItem = (key: string): void => {
  localStorage.removeItem(key);
  cache.delete(key);
};

export const clearCache = (): void => {
  cache.clear();
};
