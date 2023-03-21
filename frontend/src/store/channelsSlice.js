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
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const updatedChannels = state.chatInfo.map((channel) => {
        if (channel.id === id) {
          return { ...channel, name };
        }
        return channel;
      });
      state.chatInfo = updatedChannels;
    },
  },
});

export const {
  addChannels, addChannel, removeChannel, renameChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
