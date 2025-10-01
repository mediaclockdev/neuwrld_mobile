// sagas/profileSaga.js
import {call, put, select, takeLatest} from 'redux-saga/effects';

import {postApi} from '../../services/postApi';
import {
  getCustomerDashFailure,
  getCustomerDashRequest,
  getCustomerDashSuccess,
} from './appReducer';
import {ALL_APi_LIST} from '../../utils/apis';
import { getErrorMessage } from '../../utils/errorHandler';

const DASHBOARD_TTL = 30 * 1000; // 30s
const selectProfile = state => state.MainReducer;

export function* getCustomerDash(action) {
  // read flags from action payload
  const isBackground = !!action?.payload?.__apiOptions?.background;
  const signal = action?.payload?.__apiOptions?.signal;
  // optional: a forced refresh flag
  const force = !!action?.payload?.force;

  try {
    const {customerDash, lastFetched, isLoading} = yield select(selectProfile);

    const now = Date.now();
    const isStale = !lastFetched || now - lastFetched > DASHBOARD_TTL;

    // If a full blocking load is in progress, don't start another
    if (isLoading && !isBackground) return;

    // If data exists and not stale and not forced -> return cached result
    if (
      !isStale &&
      customerDash &&
      Object.keys(customerDash).length &&
      !force
    ) {
      // re-dispatch success to ensure UI has the cached payload (safe no-op)
      yield put(getCustomerDashSuccess(customerDash));
      return;
    }

    // Call the API. postApi/requestApi should forward __apiOptions.signal & timeout to network layer.
    const payload = action?.payload || {};
    const response = yield call(
      postApi,
      ALL_APi_LIST.customer_Dash,
      payload,
      false,
    );

    // normalize data and dispatch success
    const data = response?.data?.data ?? response?.data ?? {};
    yield put(getCustomerDashSuccess(data));
  } catch (error) {
    // If request was cancelled (AbortController), quietly ignore (no failure)
    const isCancelled =
      error?.code === 'CANCELLED' ||
      error?.name === 'AbortError' ||
      (error?.message && error.message.toLowerCase().includes('canceled')) ||
      (error?.original &&
        (error.original.name === 'AbortError' ||
          error.original?.code === 'ERR_CANCELED'));

    if (isCancelled) {
      return;
    }

    // For background fetches: fail silently (no user toast), but still dispatch failure so other parts can react if needed
    const status = error?.status || error?.response?.status;
    const serverMessage =
      error?.original?.response?.data?.message ||
      error?.response?.data?.message ||
      error?.message ||
      null;

    if (!isBackground) {
      // show friendly toast for interactive requests
      getErrorMessage(status || 500, serverMessage);
    }
    // dispatch failure (keeps UI state consistent)
    yield put(getCustomerDashFailure(error?.response || error));
  }
}

export function* ProfileSagaWatcher() {
  yield takeLatest(getCustomerDashRequest.type, getCustomerDash);
}
