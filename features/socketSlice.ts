import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

export interface SocketState {
  socket: Socket;
}

export const initialState = {
  socket: {},
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<SocketState>) => {
      return action.payload;
    },
    clearSocket: () => ({ socket: {} }),
  },
});

export const { setSocket, clearSocket } = socketSlice.actions;
export default socketSlice;
