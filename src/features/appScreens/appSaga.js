import {call, put, select, takeLatest, all} from 'redux-saga/effects';
import {getCustomerDashFailure, getCustomerDashSuccess} from './appReducer';
import {ALL_APi_LIST} from '../../utils/apis';
import {getErrorMessage} from '../../utils/errorHandler';
import { getApi } from '../../api/requestApi';

const DASHBOARD_TTL = 30 * 1000;
const selectProfile = state => state.App;

function* getCustomerDash(action) {
  try {
    const {customerDash, lastFetched, isLoading} = yield select(selectProfile);
    console.log('getCustomerDash got request', customerDash);
    const now = Date.now();
    const isStale = !lastFetched || now - lastFetched > DASHBOARD_TTL;

    // if (isLoading) return;
    if (!isStale && customerDash && Object.keys(customerDash).length) {
      yield put(getCustomerDashSuccess(customerDash));
      return;
    }
    console.log('Calling dashboard API...');

    const response = yield call(getApi, ALL_APi_LIST.dashboard);
    console.log('API Response =>', response);

    const data = response?.data?.data ?? response?.data ?? {};
    yield put(getCustomerDashSuccess(data));
  } catch (error) {
    getErrorMessage(error?.status || 500, error?.message);
    yield put(getCustomerDashFailure(error));
  }
}

// ✅ Watcher Saga
function* appSaga() {
  yield all([takeLatest('app/getCustomerDashRequest', getCustomerDash)]);
}

// ✅ Correct export
export default appSaga;
