import {call, put, takeLatest, all} from 'redux-saga/effects';
import {postApi} from '../../api/requestApi';
import {ALL_APi_LIST} from '../../utils/apis';
import {errorHandler} from '../../utils/errorHandler';
import {
  signInFailure,
  signInSuccess,
  signUpFailure,
  signUpRequest,
  signUpSuccess,
} from './authReducer';

// Worker Saga
function* signUpRequestSaga(action) {
  try {
    const response = yield call(postApi, ALL_APi_LIST.register, action.payload);
    yield put(signUpSuccess(response?.data?.data || {}));
  } catch (error) {
    const code = error?.response?.status;
    const message = error?.response?.data?.message;
    errorHandler(code, message, 'signUpFailure');
    yield put(
      signUpFailure({
        status: code,
        message: message || 'Something went wrong',
      }),
    );
  }
}

function* siginInRequestSaga(action) {
  try {
    const response = yield call(postApi, ALL_APi_LIST.login, action.payload);
    yield put(signInSuccess(response?.data?.data || {}));
  } catch (error) {
    const message = error?.response?.data?.message;
    errorHandler(code, message, 'loginRequest');
    yield put(
      signInFailure({
        status: code,
        message: message || 'Something went wrong',
      }),
    );
  }
}

// Watcher Saga
function* authSaga() {
  yield all([takeLatest('Auth/signUpRequest', signUpRequestSaga)]);
  yield all([takeLatest('Auth/signInRequest', siginInRequestSaga)]);
}

// ✅ Correct export
export default authSaga;
