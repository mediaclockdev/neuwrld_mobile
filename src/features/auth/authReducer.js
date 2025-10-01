import {createSlice} from '@reduxjs/toolkit';
import {removeItem, storage} from '../../utils/storage';
const initialState = {
  auth_status: '',
  token: null,
  error: null,
  isLoading: true,
  loginResponse: {},
  guestUser: '',
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState: initialState,
  reducers: {
    tokenRequest(state, action) {
      state.auth_status = action.type;
      state.isLoading = true;
    },
    tokenSuccess(state, action) {
      state.auth_status = action.type;
      console.log('tokenSuccess >>>>>>>>>>>>>>>>.', action.payload);
      state.isLoading = false;
      state.token = action?.payload?.userToken ?? null;
    },
    tokenFailure(state, action) {
      state.auth_status = action.type;
      state.isLoading = false;
      state.error = action.payload;
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
 

  tokenRequest,
  tokenSuccess,
  tokenFailure,

  AddGuestUser,
  RemoveGuestUser,
  userLogout,
 
} = AuthSlice.actions;
export default AuthSlice.reducer;
