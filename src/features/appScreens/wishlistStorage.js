// src/features/wishlist/wishlistStorage.ts
import {storage} from '../../utils/storage';

const WISHLIST_KEY = 'WISHLIST_IDS';

export const saveWishlist = async wishlistIds => {
  storage.set(WISHLIST_KEY, JSON.stringify(wishlistIds));
};

export const loadWishlist = async () => {
  const data = storage.getString(WISHLIST_KEY);
  return data ? JSON.parse(data) : [];
};

export const clearWishlist = async () => {
  storage.delete(WISHLIST_KEY);
};
