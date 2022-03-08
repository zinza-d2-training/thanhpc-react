import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAccount } from './loginAPI';
import { User } from '../../models/User';
import { LoginQueryResponse } from './responseLogin';
import { RootState } from '../../store';

interface LoginState {
  response: LoginQueryResponse | null;
  loading: boolean;
}
const initialState: LoginState = {
  response: null,
  loading: false
};
export const loginAsync = createAsyncThunk(
  '/login/fetchAccount',
  async (value: User, { rejectWithValue }) => {
    try {
      const response = await fetchAccount(value);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.data);
    }
  }
);
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout(state) {
      console.log('state', state.response);
      state.response = null;
      state.loading = false;
    }
  },
  extraReducers(builder) {
    builder.addCase(loginAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.response = action.payload as LoginQueryResponse;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.response = action.payload as LoginQueryResponse;
      state.loading = false;
    });
  }
});

export const loginSelector = (state: RootState) => state.login;
export const { logout } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
