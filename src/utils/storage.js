import {MMKV} from 'react-native-mmkv';

// initialize storage instance
export const storage = new MMKV({
  id: 'user-storage', // optional unique id
  encryptionKey: 'your-secret-key', // optional for security
});

// ------------------ Helper Functions ------------------

// Save any type (string, number, boolean, object)
export const setItem = (key, value) => {
  try {
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      storage.set(key, value);
    } else {
      storage.set(key, JSON.stringify(value));
    }
  } catch (e) {
    console.log('MMKV setItem error:', e);
  }
};

// Get value
export const getItem = (key, defaultValue = null) => {
  try {
    const value = storage.getString(key);
    if (value == null) return defaultValue;

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  } catch (e) {
    console.log('MMKV getItem error:', e);
    return defaultValue;
  }
};

// Delete key
export const removeItem = (key) => {
  try {
    storage.delete(key);
  } catch (e) {
    console.log('MMKV removeItem error:', e);
  }
};

// Clear everything
export const clearAll = () => {
  try {
    storage.clearAll();
  } catch (e) {
    console.log('MMKV clearAll error:', e);
  }
};



