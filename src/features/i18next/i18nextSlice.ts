import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface I18NextSlice {
  language: 'vn' | 'en';
}
const initialState: I18NextSlice = {
  language: 'vn'
};
export const i18nextSlice = createSlice({
  name: 'i18next',
  initialState,
  reducers: {
    changeLanguage(state, action) {
      state.language = action.payload;
    }
  }
});

export const i18nextReducer = i18nextSlice.reducer;
export const { changeLanguage } = i18nextSlice.actions;
export const i18nextSelector = (state: RootState) => state.i18next;
