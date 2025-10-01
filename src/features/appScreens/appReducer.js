// slices/ProfileSlice.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  profile_status: '',
  error: null,
  isLoading: false, // for main blocking loads (show full-screen loader)
  isRefreshing: false, // for background refreshes (silent refresh; small spinner if needed)
  customerDash: {},
  lastFetched: null, // timestamp in ms when customerDash was last successfully fetched
};

const MainSlice = createSlice({
  name: 'Main',
  initialState,
  reducers: {
    // payload can be anything; if caller wants a background refresh, pass:
    // action.payload = { ...whatever, __apiOptions: { background: true, signal } }
    getCustomerDashRequest(state, action) {
      state.profile_status = action.type;
      state.error = null;

      const isBackground = !!action?.payload?.__apiOptions?.background;

      if (isBackground) {
        // do not block UI; just mark refreshing
        state.isRefreshing = true;
      } else {
        state.isLoading = true;
      }
    },

    // action.payload should be the dashboard object (e.g., response.data.data)
    getCustomerDashSuccess(state, action) {
      state.profile_status = action.type;
      state.customerDash = action.payload || {};
      state.isLoading = false;
      state.isRefreshing = false;
      state.error = null;
      state.lastFetched = Date.now();
    },

    // action.payload should be the error object (keep whatever your saga sends)
    getCustomerDashFailure(state, action) {
      state.profile_status = action.type;
      state.error = action.payload || null;
      state.isLoading = false;
      state.isRefreshing = false;
      // keep lastFetched untouched so stale cache remains available
    },

    // optional helpers you might find handy
    clearProfileError(state) {
      state.error = null;
    },
    clearCustomerDash(state) {
      state.customerDash = {};
      state.lastFetched = null;
    },
  },
});

export const {
  getCustomerDashRequest,
  getCustomerDashSuccess,
  getCustomerDashFailure,
  clearProfileError,
  clearCustomerDash,
} = MainSlice.actions;

export default MainSlice.reducer;