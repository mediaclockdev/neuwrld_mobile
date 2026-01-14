import {call, put, select, takeLatest, all, delay} from 'redux-saga/effects';
import {
  addToWishlistFailure,
  addToWishlistSuccess,
  clearProfileError,
  clearWishlistOverride,
  getAddressFailure,
  getAddressSuccess,
  getAllCategoriesFailure,
  getAllCategoriesSuccess,
  getAllOrdersFailure,
  getAllOrdersSuccess,
  getCartFailure,
  getCartSuccess,
  getCouponFailure,
  getCouponSuccess,
  getCustomerDashFailure,
  getCustomerDashSuccess,
  getProductDetailsSuccess,
  getProductFailure,
  getProductSuccess,
  getSubcategoryByCategoriesIdFailure,
  getSubcategoryByCategoriesIdSuccess,
  getUserProfileFailure,
  getUserProfileSuccess,
  getWishlistFailure,
  getWishlistSuccess,
  handleCartFailure,
  handleCartRemoveSuccess,
  handleCartSuccess,
  rempoveFromWishlistFailure,
  rempoveFromWishlistSuccess,
  setWishlistOverride,
} from './appReducer';
import {ALL_APi_LIST} from '../../utils/apis';
import {errorHandler} from '../../utils/errorHandler';
import {getApi, postApi} from '../../api/requestApi';
import {clearProfileAuthError} from '../auth/authReducer';
import {navigate} from '../../utils/rootNavigation';

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
    errorHandler(error?.status || 500, error?.message);
    yield put(getCustomerDashFailure(error));
  }
}

function* getCustomerProfile(action) {
  try {
    const {customerDash, lastFetched, isLoading} = yield select(selectProfile);
    const now = Date.now();
    const isStale = !lastFetched || now - lastFetched > DASHBOARD_TTL;

    if (!isStale && customerDash && Object.keys(customerDash).length) {
      yield put(getUserProfileSuccess(customerDash));
      return;
    }

    const response = yield call(getApi, ALL_APi_LIST.userProfile);
    const data = response?.data?.data ?? response?.data ?? {};
    yield put(getUserProfileSuccess(data));
  } catch (error) {
    if (error?.status === 401) {
      try {
        yield call(getCustomerRefreshToken); // ← Fixed: no ()
      } catch (refreshError) {
        // Refresh failed → probably logout
        errorHandler(refreshError?.status || 500, refreshError?.message);
        yield put(getUserProfileFailure(refreshError));
        // Optionally: yield put(logout());
        return;
      }
    }

    // Normal error handling
    errorHandler(error?.status || 500, error?.message);
    yield put(getUserProfileFailure(error));
  }
}
function* updateCustomerProfile(action) {
  try {
    const response = yield call(
      postApi,
      ALL_APi_LIST.userProfile,
      action.payload,
    );
    const data = response?.data?.data ?? response?.data ?? {};
    yield put(getUserProfileSuccess(data));
  } catch (error) {
    if (error?.status === 401) {
      try {
        yield call(getCustomerRefreshToken); // ← Fixed: no ()
      } catch (refreshError) {
        // Refresh failed → probably logout
        errorHandler(refreshError?.status || 500, refreshError?.message);
        yield put(getUserProfileFailure(refreshError));
        // Optionally: yield put(logout());
        return;
      }
    }

    // Normal error handling
    errorHandler(error?.status || 500, error?.message);
    yield put(getUserProfileFailure(error));
  }
}
function* getCustomerRefreshToken(action) {
  try {
    const response = yield call(postApi, ALL_APi_LIST.refreshToken);
    const data = response?.data?.data ?? response?.data ?? {};
    yield call(getCustomerProfile);
  } catch (error) {
    if (error?.status === 401) {
      yield put(clearProfileAuthError());
      yield put(clearProfileError());
    }
    errorHandler(error?.status || 500, error?.message);
    yield put(getUserProfileFailure(error));
  }
}

function* getAllCategories(action) {
  try {
    const response = yield call(getApi, ALL_APi_LIST.allCategories);
    const data = response?.data?.data ?? response?.data ?? {};
    yield put(getAllCategoriesSuccess(data));
  } catch (error) {
    errorHandler(error?.status || 500, error?.message);
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
    errorHandler(error?.status || 500, error?.message);
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
    navigate('ProductList');
  } catch (error) {
    errorHandler(error?.status || 500, error?.message);
    yield put(getProductFailure(error));
  }
}

function* getProductDetails(action) {
  let product_id = action?.payload ?? action;
  try {
    const response = yield call(
      getApi,
      `${ALL_APi_LIST.product_details}/${product_id}`,
    );
    const data = response?.data?.data ?? response?.data ?? {};
    yield put(getProductDetailsSuccess(data));
    navigate('ProductDetailsScreen');
  } catch (error) {
    errorHandler(error?.status || 500, error?.message);
    yield put(getProductFailure(error));
  }
}

function* wishlistSaga(action) {
  let sku = action?.payload?.sku;

  let screen = action?.payload?.screen;
  const {payload} = action.payload;
  const productId = payload.product_variant_id;

  try {
    const response = yield call(postApi, ALL_APi_LIST.wishlist, payload);

    if (screen === 'ProductDetailsScreen') {
      yield call(getProductDetails, sku);
    }
    const data = response?.data?.data ?? response?.data ?? {};
    yield put(getWishlistSuccess(data));

    // 🧹 Clear override after refresh
    yield delay(300);
    // yield put(clearWishlistOverride(productId));
  } catch (error) {
    // ❌ Rollback UI
    yield put(
      setWishlistOverride({
        productId,
        isWishlisted: payload.action === 'remove',
      }),
    );
  }
}

function* removewishlistSaga(action) {
  try {
    const response = yield call(
      postApi,
      ALL_APi_LIST.removeWish,
      action?.payload,
    );
    const data = response?.data?.data ?? response?.data ?? {};
    yield put(rempoveFromWishlistSuccess(data));
  } catch (error) {
    console.log('errorerror', error);
    const code = error?.response?.status;
    const message = error?.response?.data?.message;
    if (error?.status === 401) {
      try {
        yield call(getCustomerRefreshToken); // ← Fixed: no ()
      } catch (refreshError) {
        // Refresh failed → probably logout
        errorHandler(refreshError?.status || 500, refreshError?.message);
        yield put(getUserProfileFailure(refreshError));
        // Optionally: yield put(logout());
        return;
      }
    }

    errorHandler(code, message, 'rempoveFromWishlistFailure');
    yield put(
      rempoveFromWishlistFailure({
        status: code,
        message: message || 'Something went wrong',
      }),
    );
  }
}

function* cartHandleSaga(action) {
  try {
    const response = yield call(
      postApi,
      ALL_APi_LIST.addToCart,
      action.payload,
    );
    const data = response?.data?.data ?? response?.data ?? {};
    yield put(handleCartSuccess(data));
  } catch (error) {
    const code = error?.response?.status;
    const message = error?.response?.data?.message;
    if (error?.status === 401) {
      try {
        yield call(getCustomerRefreshToken); // ← Fixed: no ()
      } catch (refreshError) {
        // Refresh failed → probably logout
        errorHandler(refreshError?.status || 500, refreshError?.message);
        yield put(getUserProfileFailure(refreshError));
        // Optionally: yield put(logout());
        return;
      }
    }

    errorHandler(code, message, 'handleCartFailure');
    yield put(
      handleCartFailure({
        status: code,
        message: message || 'Something went wrong',
      }),
    );
  }
}
function* removeCartHandleSaga(action) {
  console.log('action0001', action.payload);
  try {
    const response = yield call(
      postApi,
      ALL_APi_LIST.removeCart,
      action.payload?.payload ?? action?.payload,
    );
    const data = response?.data?.data ?? response?.data ?? {};
    yield put(handleCartRemoveSuccess(data));
    // yield call(cartGetHandleSaga);
  } catch (error) {
    const code = error?.response?.status;
    const message = error?.response?.data?.message;
    if (error?.status === 401) {
      try {
        yield call(getCustomerRefreshToken); // ← Fixed: no ()
      } catch (refreshError) {
        // Refresh failed → probably logout
        errorHandler(refreshError?.status || 500, refreshError?.message);
        yield put(getUserProfileFailure(refreshError));
        // Optionally: yield put(logout());
        return;
      }
    }

    errorHandler(code, message, 'getCartFailure');
    yield put(
      getCartFailure({
        status: code,
        message: message || 'Something went wrong',
      }),
    );
  }
}
function* cartGetHandleSaga(action) {
  console.log('getCartRequest', action, action.payload);
  let coupon_code = action.payload;
  try {
    const response = yield call(
      getApi,
      coupon_code
        ? `${ALL_APi_LIST.getCart}?per_page=10&coupon_code=${coupon_code}`
        : ALL_APi_LIST.getCart,
    );
    const data = response?.data?.data ?? response?.data ?? {};
    yield put(getCartSuccess(data));
  } catch (error) {
    const code = error?.response?.status;
    const message = error?.response?.data?.message;
    if (error?.status === 401) {
      try {
        yield call(getCustomerRefreshToken); // ← Fixed: no ()
      } catch (refreshError) {
        // Refresh failed → probably logout
        errorHandler(refreshError?.status || 500, refreshError?.message);
        yield put(getUserProfileFailure(refreshError));
        // Optionally: yield put(logout());
        return;
      }
    }

    errorHandler(code, message, 'getCartFailure');
    yield put(
      getCartFailure({
        status: code,
        message: message || 'Something went wrong',
      }),
    );
  }
}

function* getWishlistSaga(action) {
  try {
    const response = yield call(
      getApi,
      `${ALL_APi_LIST.getWishlist}?per_page=30`,
    );
    const data = response?.data?.data ?? response?.data ?? {};
    yield put(getWishlistSuccess(data));
  } catch (error) {
    const code = error?.response?.status;
    const message = error?.response?.data?.message;
    if (error?.status === 401) {
      try {
        yield call(getCustomerRefreshToken); // ← Fixed: no ()
      } catch (refreshError) {
        // Refresh failed → probably logout
        errorHandler(refreshError?.status || 500, refreshError?.message);
        yield put(getUserProfileFailure(refreshError));
        // Optionally: yield put(logout());
        return;
      }
    }

    errorHandler(code, message, 'getWishlistFailure');
    yield put(
      getWishlistFailure({
        status: code,
        message: message || 'Something went wrong',
      }),
    );
  }
}

function* cartCouponSaga(action) {
  try {
    const response = yield call(getApi, ALL_APi_LIST.couponGet);
    const data = response?.data?.data ?? response?.data ?? {};
    yield put(getCouponSuccess(data));
  } catch (error) {
    const code = error?.response?.status;
    const message = error?.response?.data?.message;
    if (error?.status === 401) {
      try {
        yield call(getCustomerRefreshToken); // ← Fixed: no ()
      } catch (refreshError) {
        // Refresh failed → probably logout
        errorHandler(refreshError?.status || 500, refreshError?.message);
        yield put(getUserProfileFailure(refreshError));
        // Optionally: yield put(logout());
        return;
      }
    }

    errorHandler(code, message, 'getCouponFailure');
    yield put(
      getCouponFailure({
        status: code,
        message: message || 'Something went wrong',
      }),
    );
  }
}

function* getAddressSaga(action) {
  try {
    const response = yield call(getApi, ALL_APi_LIST.address);
    const data = response?.data?.data ?? response?.data ?? {};
    yield put(getAddressSuccess(data));
  } catch (error) {
    const code = error?.response?.status;
    const message = error?.response?.data?.message;
    if (error?.status === 401) {
      try {
        yield call(getCustomerRefreshToken); // ← Fixed: no ()
      } catch (refreshError) {
        // Refresh failed → probably logout
        errorHandler(refreshError?.status || 500, refreshError?.message);
        yield put(getAddressFailure(refreshError));
        // Optionally: yield put(logout());
        return;
      }
    }
    errorHandler(code, message, 'getAddressFailure');
    yield put(
      getAddressFailure({
        status: code,
        message: message || 'Something went wrong',
      }),
    );
  }
}
function* getAllOrders(action) {
  const filter = action.payload ?? 'all';
  try {
    const response = yield call(
      getApi,
      `${ALL_APi_LIST.my_orders}?per_page=10&filter=${filter}`,
    );
    const data = response?.data?.data ?? response?.data ?? [];
    yield put(getAllOrdersSuccess(data));
    navigate('MyOrdersScreen');
  } catch (error) {
    const code = error?.response?.status;
    const message = error?.response?.data?.message;
    if (error?.status === 401) {
      try {
        yield call(getCustomerRefreshToken); // ← Fixed: no ()
      } catch (refreshError) {
        // Refresh failed → probably logout
        errorHandler(refreshError?.status || 500, refreshError?.message);
        yield put(getAllOrdersFailure(refreshError));
        // Optionally: yield put(logout());
        return;
      }
    }
    errorHandler(code, message, 'getAllOrdersFailure');
    yield put(
      getAllOrdersFailure({
        status: code,
        message: message || 'Something went wrong',
      }),
    );
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
  yield all([takeLatest('app/getUserProfile', getCustomerProfile)]);
  yield all([takeLatest('app/updateUserProfileDetails', updateCustomerProfile)]);
  yield all([takeLatest('app/addToWishlistRequest', wishlistSaga)]);
  yield all([takeLatest('app/handleCartRequest', cartHandleSaga)]);
  yield all([takeLatest('app/getCartRequest', cartGetHandleSaga)]);
  yield all([takeLatest('app/getCouponRequest', cartCouponSaga)]);
  yield all([takeLatest('app/handleCartRemoveRequest', removeCartHandleSaga)]);
  yield all([takeLatest('app/getWishlistRequest', getWishlistSaga)]);
  yield all([takeLatest('app/getAddressRequest', getAddressSaga)]);
  yield all([takeLatest('app/getAllOrdersRequest', getAllOrders)]);
  yield all([takeLatest('app/rempoveFromWishlistRequest', removewishlistSaga)]);
}

// ✅ Correct export
export default appSaga;
