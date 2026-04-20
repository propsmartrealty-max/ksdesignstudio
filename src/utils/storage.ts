/**
 * Sovereign Storage Utilities
 * Provides defensive mechanisms for localStorage interactions to prevent application crashes
 */

export const safeStorageGet = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    
    // Handle simple strings that aren't JSON-encoded as strings
    if (typeof defaultValue === 'string' && !item.startsWith('{') && !item.startsWith('[')) {
      return item as unknown as T;
    }
    
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`KS Design Storage Error: Failed to parse key "${key}". Reverting to default.`, error);
    return defaultValue;
  }
};

export const safeStorageSet = (key: string, value: any): void => {
  try {
    const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`KS Design Storage Error: Failed to set key "${key}".`, error);
    // Handle QuotaExceededError if necessary by purging old data
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      console.warn("Storage quota exceeded. Consider purging legacy DNA data.");
    }
  }
};

export const safeStorageRemove = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`KS Design Storage Error: Failed to remove key "${key}".`, error);
  }
};
