import {call, put, select, takeLatest, all} from 'redux-saga/effects';
import {
  getAllCategoriesFailure,
  getAllCategoriesSuccess,
  getCustomerDashFailure,
  getCustomerDashSuccess,
  getProductDetailsSuccess,
  getProductFailure,
  getProductSuccess,
  getSubcategoryByCategoriesIdFailure,
  getSubcategoryByCategoriesIdSuccess,
} from './appReducer';
import {ALL_APi_LIST} from '../../utils/apis';
import {getErrorMessage} from '../../utils/errorHandler';
import {getApi} from '../../api/requestApi';

const DASHBOARD_TTL = 30 * 1000;
const selectProfile = state => state.App;

function* getCustomerDash(action) {
  try {
    const {customerDash, lastFetched, isLoading} = yield select(selectProfile);
    const now = Date.now();
    const isStale = !lastFetched || now - lastFetched > DASHBOARD_TTL;

    if (!isStale && customerDash && Object.keys(customerDash).length) {
      yield put(getCustomerDashSuccess(customerDash));
      return;
    }

    const response = yield call(getApi, ALL_APi_LIST.dashboard);
    const data = response?.data?.data ?? response?.data ?? {};
    yield put(getCustomerDashSuccess(data));
  } catch (error) {
    getErrorMessage(error?.status || 500, error?.message);
    yield put(getCustomerDashFailure(error));
  }
}

function* getAllCategories(action) {
  try {
    const response = yield call(getApi, ALL_APi_LIST.allCategories);
    const data = response?.data?.data ?? response?.data ?? {};
    yield put(getAllCategoriesSuccess(data));
  } catch (error) {
    getErrorMessage(error?.status || 500, error?.message);
    yield put(getAllCategoriesFailure(error));
  }
}

function* getSubCategoryByCategoriesId(action) {
  let categories_id = action?.payload;
  try {
    const response = yield call(
      getApi,
      ALL_APi_LIST.allCategories + '/' + categories_id,
    );
    const data = response?.data?.data ?? response?.data ?? {};
    yield put(getSubcategoryByCategoriesIdSuccess(data));
  } catch (error) {
    getErrorMessage(error?.status || 500, error?.message);
    yield put(getSubcategoryByCategoriesIdFailure(error));
  }
}

function* getProducts(action) {
  let sub_categories_slug = action?.payload;
  try {
    const response = yield call(
      getApi,
      `${ALL_APi_LIST.productList}/${sub_categories_slug}`,
    );
    const data = response?.data?.data ?? response?.data ?? {};
    yield put(getProductSuccess(data));
  } catch (error) {
    getErrorMessage(error?.status || 500, error?.message);
    yield put(getProductFailure(error));
  }
}

function* getProductDetails(action) {
  let product_id = action?.payload;
  try {
    const response = yield call(
      getApi,
      `${ALL_APi_LIST.product_details}/${product_id}`,
    );
    const data = response?.data?.data ?? response?.data ?? {};
    yield put(getProductDetailsSuccess(data));
  } catch (error) {
    getErrorMessage(error?.status || 500, error?.message);
    yield put(getProductFailure(error));
  }
}
// ✅ Watcher Saga
function* appSaga() {
  yield all([takeLatest('app/getCustomerDashRequest', getCustomerDash)]);
  yield all([takeLatest('app/getAllCategoriesRequest', getAllCategories)]);
  yield all([takeLatest('app/getProductRequest', getProducts)]);
  yield all([
    takeLatest(
      'app/getSubcategoryByCategoriesIdRequest',
      getSubCategoryByCategoriesId,
    ),
  ]);
  yield all([takeLatest('app/getProductDetailsRequest', getProductDetails)]);
}

// ✅ Correct export
export default appSaga;
