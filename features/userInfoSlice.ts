import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfoState } from '../types/userInfoState.interface';

export const initialState: UserInfoState = {
  name: '',
  email: '',
  nickname: '',
  phoneNumber: '',
  createdAt: '',
  detective: {},
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfoState>) => {
      return { ...state, ...action.payload };
    },
    clearUserInfo: () => ({
      name: '',
      email: '',
      nickname: '',
      phoneNumber: '',
      createdAt: '',
    }),
  },
});

export const { setUserInfo, clearUserInfo } = userInfoSlice.actions;
export default userInfoSlice;
