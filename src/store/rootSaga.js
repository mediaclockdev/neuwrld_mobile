import { all } from 'redux-saga/effects';
import { authSaga } from '../features/auth/authSaga';
import { appSaga } from '../features/appScreens/appSaga';

export default function* RootSaga() {
  yield all([
    authSaga(),
    appSaga(),
  ]);
}
