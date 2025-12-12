// // services/offlineQueue.js
// import NetInfo from '@react-native-community/netinfo';
// import { v4 as uuidv4 } from 'uuid';
// import {  getJsonItem,  setJsonItem } from '../utils/authStorage';

// const QUEUE_KEY = 'API_OFFLINE_QUEUE';

// const loadQueue = async () => {
//   const raw = await getJsonItem(QUEUE_KEY);
//   return raw ? JSON.parse(raw) : [];
// };

// const saveQueue = async (q) => {
//   await setJsonItem(QUEUE_KEY, JSON.stringify(q || []));
// };

// export const enqueueRequest = async (item) => {
//   const q = await loadQueue();
//   q.push({ id: uuidv4(), createdAt: Date.now(), item });
//   await saveQueue(q);
// };

// // remove by id
// export const removeQueued = async (id) => {
//   const q = await loadQueue();
//   await saveQueue(q.filter(i => i.id !== id));
// };

// export const getQueue = loadQueue;

// export const replayQueueWhenOnline = (replayCallback) => {
//   const unsub = NetInfo.addEventListener(async (state) => {
//     if (state.isConnected) {
//       const q = await loadQueue();
//       if (!q || q.length === 0) return;
//       for (const entry of q) {
//         try {
//           await replayCallback(entry.item);
//           await removeQueued(entry.id);
//         } catch (e) {
//           // stop on fail (will retry next online event)
//           break;
//         }
//       }
//     }
//   });

//   return unsub;
// };


// services/offlineQueue.js
import NetInfo from '@react-native-community/netinfo';
import { v4 as uuidv4 } from 'uuid';
import {  getJsonItem,  setJsonItem } from '../utils/authStorage';

const QUEUE_KEY = 'API_OFFLINE_QUEUE';

const loadQueue = async () => {
  const raw = await getJsonItem(QUEUE_KEY);
  return raw ? JSON.parse(raw) : [];
};

const saveQueue = async (q) => {
  await setJsonItem(QUEUE_KEY, JSON.stringify(q || []));
};

export const enqueueRequest = async (item) => {
  const q = await loadQueue();
  q.push({ id: uuidv4(), createdAt: Date.now(), item });
  await saveQueue(q);
};

// remove by id
export const removeQueued = async (id) => {
  const q = await loadQueue();
  await saveQueue(q.filter(i => i.id !== id));
};

export const getQueue = loadQueue;

export const replayQueueWhenOnline = (replayCallback) => {
  const unsub = NetInfo.addEventListener(async (state) => {
    if (state.isConnected) {
      const q = await loadQueue();
      if (!q || q.length === 0) return;
      for (const entry of q) {
        try {
          await replayCallback(entry.item);
          await removeQueued(entry.id);
        } catch (e) {
          // stop on fail (will retry next online event)
          break;
        }
      }
    }
  });

  return unsub;
};
