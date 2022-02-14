import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAccount } from './loginAPI';
import { User } from '../../models/User';
import { ResponseLogin } from './responseLogin';
import { RootState } from '../../store';

interface LoginState {
  user: User | null;
  response: ResponseLogin | null;
  loading: boolean;
}
const initialState: LoginState = {
  user: null,
  response: null,
  loading: false
};
export const loginAsync = createAsyncThunk(
  '/login/fetchAccount',
  async (value: User, { rejectWithValue }) => {
    try {
      const response = await fetchAccount(value);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.data);
    }
  }
);
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.response = action.payload as ResponseLogin;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.response = action.payload as ResponseLogin;
      state.loading = false;
    });
  }
});

export const loginSelector = (state: RootState) => state.login;
export const loginReducer = loginSlice.reducer;
