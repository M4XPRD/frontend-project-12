/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'chat',
  initialState: {
    chatInfo: [],
  },
  reducers: {
    addChannels: (state, action) => {
      state.chatInfo = action.payload;
    },
    addChannel: (state, action) => {
      state.chatInfo.push(action.payload);
    },
  },
});

export const { addChannels, addChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
