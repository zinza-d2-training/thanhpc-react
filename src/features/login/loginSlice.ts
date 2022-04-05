import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginQueryResponse, LoginQueryResult } from './responseLogin';
import { RootState } from '../../store';

interface LoginState {
  response: LoginQueryResponse | null;
}
const initialState: LoginState = {
  response: null
};

export const loginAsync = createAsyncThunk(
  '/login/FetchAccount',
  async (value: LoginQueryResult, { rejectWithValue }) => {
    try {
      return {
        data: value,
        statusCode: 200,
        message: 'Đăng nhập thành công!'
      };
    } catch (err: any) {
      return rejectWithValue({
        data: null,
        statusCode: 404,
        message: 'Tài khoản hoặc mật khẩu không chính xác!'
      });
    }
  }
);
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout(state) {
      state.response = null;
    }
  },
  extraReducers(builder) {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.response = action.payload;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.response = action.payload as LoginQueryResponse;
    });
  }
});

export const loginSelector = (state: RootState) => state.login;
export const { logout } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
