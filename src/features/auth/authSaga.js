import {call, put, takeLatest, all} from 'redux-saga/effects';
import {postApi} from '../../api/requestApi';
import {ALL_APi_LIST} from '../../utils/apis';
import {getErrorMessage} from '../../utils/errorHandler';
import {signInFailure, signInSuccess, signUpFailure, signUpRequest, signUpSuccess} from './authReducer';

// Worker Saga
function* signUpRequestSaga(action) {
  try {
    const response = yield call(postApi, ALL_APi_LIST.register, action.payload);
    yield put(signUpSuccess(response?.data?.data || {}));
  } catch (error) {
    getErrorMessage(
      error?.response?.data?.response_code,
      error?.response?.data?.message,
    );
    yield put(signUpFailure(error?.response || error));
  }
}

function* siginInRequestSaga(action) {
  try {
    const response = yield call(postApi, ALL_APi_LIST.login, action.payload);
    yield put(signInSuccess(response?.data?.data || {}));
  } catch (error) {
    getErrorMessage(
      error?.response?.data?.response_code,
      error?.response?.data?.message,
    );
    yield put(signInFailure(error?.response || error));
  }
}

// Watcher Saga
function* authSaga() {
  yield all([takeLatest('Auth/signUpRequest', signUpRequestSaga)]);
  yield all([takeLatest('Auth/signInRequest', siginInRequestSaga)]);
}

// ✅ Correct export
export default authSaga;
