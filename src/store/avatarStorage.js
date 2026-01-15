import { storage } from "../utils/storage";

const KEY = 'USER_AVATAR';

export const saveAvatar = (avatar) => {
  storage.set(KEY, JSON.stringify(avatar));
};

export const loadAvatar = () => {
  const data = storage.getString(KEY);
  return data ? JSON.parse(data) : null;
};

export const clearAvatar = () => {
  storage.delete(KEY);
};
