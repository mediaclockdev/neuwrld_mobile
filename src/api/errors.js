// services/errors.js
export class ApiError extends Error {
  constructor({ message, status = null, code = null, original = null }) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.original = original;
  }
}



//for // APP.js 

// import { replayQueueWhenOnline, getQueue } from './services/offlineQueue';
// import api from './services/apiClient';

// useEffect(() => {
//   const unsub = replayQueueWhenOnline(async (item) => {
//     // item: { method, url, data, headers }
//     await api({ method: item.method, url: item.url, data: item.data, headers: item.headers });
//   });
//   // optionally try replay once on startup
//   (async () => { const q = await getQueue(); /* replay logic */ })();
//   return () => unsub();
// }, []);
