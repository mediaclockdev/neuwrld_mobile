import {createSlice} from '@reduxjs/toolkit';
import {removeItem, storage} from '../../utils/storage';
const initialState = {
  auth_status: '',
  token: null,
  error: null,
  isLoading: true,
  isDataSubmitting: false,
  loginResponse: {},
  singUpData:{},
  guestUser: '',
  isRegisterSuccess: false,
  device_id:'',
  isGuest:false,
  isAuthAction: false
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState: initialState,
  reducers: {
    signInRequest(state, action) {
      state.auth_status = action.type;
      state.isLoading = true;
      state.isDataSubmitting = true;
    },
    signInSuccess(state, action) {
      state.auth_status = action.type;
      state.isLoading = false;
      state.token = action?.payload?.userToken ?? null;
      state.isGuest = false,
      state.isDataSubmitting = false;
    },
    signInFailure(state, action) {
      state.auth_status = action.type;
      state.isLoading = false;
      state.error = action.payload;
    },

     clearProfileAuthError(state) {
          state.token = null;
          state.isGuest = true;
      },

    updateDeviceToken(state,actoin){
      state.device_id = actoin.payload
    },
    updateUser(state,actoin){
      state.isGuest = actoin.payload
    },
    updateUserAuthTogle(state,actoin){
      state.isAuthAction = actoin.payload
    },
    signUpRequest(state, action) {
      state.auth_status = action.type;
      state.isLoading = true;
      state.isDataSubmitting = true;
      state.isRegisterSuccess = false;
    },
    signUpSuccess(state, action) {
      state.auth_status = action.type;
      state.isLoading = false;
      state.singUpData = action.payload,
      state.isDataSubmitting = false;
      state.isRegisterSuccess = true;
    },
    signUpFailure(state, action) {
      state.auth_status = action.type;
      state.isLoading = false;
      state.isDataSubmitting = false;
      state.error = action.payload;
      state.isRegisterSuccess = false;
    },

    userLogout(state, action) {
      state.token = null;
      state.loginResponse = null;
      storage.clearAll();
    },

    AddGuestUser(state, action) {
      state.guestUser = action.payload;
    },
    RemoveGuestUser(state, action) {
      state.guestUser = null;
    },
  },
});

export const {
  signInRequest,
  signInSuccess,
  signInFailure,

  AddGuestUser,
  RemoveGuestUser,
  userLogout,

  signUpRequest,
  signUpSuccess,
  signUpFailure,

  updateUser,
  updateUserAuthTogle,

  updateDeviceToken,
  clearProfileAuthError
} = AuthSlice.actions;
export default AuthSlice.reducer;
