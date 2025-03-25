import { configureStore } from '@reduxjs/toolkit';
import userInfoSlice from './src/features/userInfoSlice';
import socketSlice from './src/features/socketSlice';

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice.reducer,
    socket: socketSlice.reducer,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
