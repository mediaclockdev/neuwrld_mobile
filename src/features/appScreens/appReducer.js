// slices/ProfileSlice.js
import {createSlice} from '@reduxjs/toolkit';
import {navigate} from '../../utils/rootNavigation';
import {setUser} from '../../utils/authStorage';

const initialState = {
  profile_status: '',
  error: null,
  cart_load: false,
  wishlist_load: false,
  isLoading: false, // for main blocking loads (show full-screen loader)
  isRefreshing: false, // for background refreshes (silent refresh; small spinner if needed)
  customerDash: {},
  lastFetched: null, // timestamp in ms when customerDash was last successfully fetched
  allCategories: [],
  subCategory: [],
  products: [],
  productDetails: {},
  userdetails: null,
  addedToWishlist: {},
  wishlist_data: [],
  coupon_codes: [],
  cartData: [],
  addedToCart: false,
  appliedCoupon: {},
};

const AppSlice = createSlice({
  name: 'app',
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
      state.userdetails = null;
      setUser({userType: 'guest'});
    },
    updateUserProfile(state, action) {
      state.userdetails = action?.payload;
      state.error = null;
    },
    clearCustomerDash(state) {
      state.customerDash = {};
      state.lastFetched = null;
    },
    getUserProfile(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    getUserProfileSuccess(state, action) {
      state.userdetails = action?.payload;
      setUser({userType: action?.payload});
      (state.isLoading = false), (state.error = null);
    },
    getUserProfileFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getAllCategoriesRequest(state, action) {
      state.isLoading = true;
      state.profile_status = action.type;
      state.error = null;
    },

    getAllCategoriesSuccess(state, action) {
      state.profile_status = action.type;
      state.isLoading = false;
      state.allCategories = action.payload?.categories_nested || [];
      state.error = null;
    },

    getAllCategoriesFailure(state, action) {
      state.profile_status = action.type;
      state.isLoading = false;
      state.error = action.payload || null;
    },

    getSubcategoryByCategoriesIdRequest(state, action) {
      state.isLoading = true;
      state.profile_status = action.type;
      state.error = null;
    },

    getSubcategoryByCategoriesIdSuccess(state, action) {
      state.profile_status = action.type;
      state.isLoading = false;
      state.subCategory = action.payload || [];
      state.error = null;
    },

    getSubcategoryByCategoriesIdFailure(state, action) {
      state.profile_status = action.type;
      state.isLoading = false;
      state.error = action.payload || null;
    },

    getProductRequest(state, action) {
      state.isLoading = true;
      state.profile_status = action.type;
      state.error = null;
    },

    getProductSuccess(state, action) {
      state.profile_status = action.type;
      state.isLoading = false;
      let data = action.payload;
      state.products = data || [];
      navigate('ProductList');
      state.error = null;
    },

    getProductFailure(state, action) {
      state.profile_status = action.type;
      state.isLoading = false;
      state.error = action.payload || null;
    },
    getProductDetailsRequest(state, action) {
      state.isLoading = true;
      state.profile_status = action.type;
      state.error = null;
    },

    getProductDetailsSuccess(state, action) {
      state.profile_status = action.type;
      state.isLoading = false;
      let data = action.payload;
      state.productDetails = data || {};
      navigate('ProductDetailsScreen');
      state.error = null;
    },

    getProductDetailsFailure(state, action) {
      state.profile_status = action.type;
      state.isLoading = false;
      state.error = action.payload || null;
    },
    addToWishlistRequest(state, action) {
      state.wishlist_load = true;
      state.profile_status = action.type;
      state.error = null;
    },

    addToWishlistSuccess(state, action) {
      state.profile_status = action.type;
      state.wishlist_load = false;
      let data = action.payload;
      state.addedToWishlist = data || {};
      state.error = null;
    },

    addToWishlistFailure(state, action) {
      state.profile_status = action.type;
      state.wishlist_load = false;
      state.error = action.payload || null;
    },

    getWishlistRequest(state, action) {
      state.isLoading = true;
      state.profile_status = action.type;
      state.error = null;
    },

    getWishlistSuccess(state, action) {
      state.profile_status = action.type;
      state.isLoading = false;
      let data = action.payload;
      state.wishlist_data = data || [];
      state.error = null;
    },

    getWishlistFailure(state, action) {
      state.profile_status = action.type;
      state.isLoading = false;
      state.error = action.payload || null;
    },

    handleCartRequest(state, action) {
      state.cart_load = true;
      state.profile_status = action.type;
      state.addedToCart = false;
      state.error = null;
    },

    handleCartSuccess(state, action) {
      state.profile_status = action.type;
      state.cart_load = false;
      state.isLoading = false;
      state.addedToCart = true;
      let data = action.payload;
      state.error = null;
    },

    handleCartFailure(state, action) {
      state.profile_status = action.type;
      state.cart_load = false;
      state.addedToCart = false;
      state.error = action.payload || null;
      state.isLoading = false;
    },
    handleCartRemoveRequest(state, action) {
      state.isLoading = true;
      state.error = null;
    },

    setAppliedCoupon(state, action) {
      state.appliedCoupon = action.payload;
    },

    getCartRequest(state, action) {
      state.isLoading = true;
      state.profile_status = action.type;
      state.error = null;
    },

    getCartSuccess(state, action) {
      state.profile_status = action.type;
      state.isLoading = false;
      let data = action.payload;
      state.cartData = data || [];
      state.error = null;
    },

    getCartFailure(state, action) {
      state.profile_status = action.type;
      state.isLoading = false;
      state.error = action.payload || null;
    },

    getCouponRequest(state, action) {
      state.isLoading = true;
      state.profile_status = action.type;
      state.error = null;
    },

    getCouponSuccess(state, action) {
      state.profile_status = action.type;
      state.isLoading = false;
      let data = action.payload;
      state.coupon_codes = data || [];
      state.error = null;
    },

    getCouponFailure(state, action) {
      state.profile_status = action.type;
      state.isLoading = false;
      state.error = action.payload || null;
    },
  },
});

export const {
  getCustomerDashRequest,
  getCustomerDashSuccess,
  getCustomerDashFailure,
  clearProfileError,
  clearCustomerDash,

  getUserProfile,
  getUserProfileSuccess,
  getUserProfileFailure,

  getAllCategoriesRequest,
  getAllCategoriesSuccess,
  getAllCategoriesFailure,

  getProductRequest,
  getProductSuccess,
  getProductFailure,

  getSubcategoryByCategoriesIdRequest,
  getSubcategoryByCategoriesIdSuccess,
  getSubcategoryByCategoriesIdFailure,

  getProductDetailsRequest,
  getProductDetailsSuccess,
  getProductDetailsFailure,

  addToWishlistRequest,
  addToWishlistSuccess,
  addToWishlistFailure,

  handleCartRequest,
  handleCartSuccess,
  handleCartFailure,

  setAppliedCoupon,
  getCartRequest,
  getCartSuccess,
  getCartFailure,

  getCouponRequest,
  getCouponSuccess,
  getCouponFailure,

  handleCartRemoveRequest,

  getWishlistRequest,
  getWishlistSuccess,
  getWishlistFailure,

  updateUserProfile,
} = AppSlice.actions;

export default AppSlice.reducer;
