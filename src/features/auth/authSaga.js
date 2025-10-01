import { call, put, takeLatest, all } from 'redux-saga/effects';
import { postApi } from '../../api/requestApi';
import { ALL_APi_LIST } from '../../utils/apis';
import { getErrorMessage } from '../../utils/errorHandler';
import { tokenFailure, tokenSuccess } from './authReducer';

export function* tokenRequestSaga(action) {
  try {
    const response = yield call(postApi, ALL_APi_LIST.user, action.payload);

    // check response
    console.log('API response >>>', response?.data);

    yield put(tokenSuccess(response?.data?.data || {}));
  } catch (error) {
    getErrorMessage(
      error?.response?.data?.response_code,
      error?.response?.data?.message
    );
    yield put(tokenFailure(error?.response || error));
  }
}

// ✅ Proper watcher
export function* authSaga() {
  yield all([takeLatest('Auth/tokenRequest', tokenRequestSaga)]);
}
