import {createSlice} from '@reduxjs/toolkit';
import {removeItem, storage} from '../../utils/storage';
const initialState = {
  auth_status: '',
  token: null,
  error: null,
  isLoading: true,
  isDataSubmitting: false,
  loginResponse: {},
  guestUser: '',
  isRegisterSuccess: false,
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
      state.isDataSubmitting = false;
    },
    signInFailure(state, action) {
      state.auth_status = action.type;
      state.isLoading = false;
      state.error = action.payload;
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
      state.isDataSubmitting = false;
      state.isRegisterSuccess = true;
      // state.token = action?.payload?.userToken ?? null;
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
} = AuthSlice.actions;
export default AuthSlice.reducer;
