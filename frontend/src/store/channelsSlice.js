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
    removeChannel: (state, action) => {
      const { id } = action.payload;
      const filteredChannels = state.chatInfo.filter((channel) => channel.id !== id);
      state.chatInfo = filteredChannels;
    },
  },
});

export const { addChannels, addChannel, removeChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
