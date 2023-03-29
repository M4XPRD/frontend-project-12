/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// const channelsSlice = createSlice({
//   name: 'channels',
//   initialState: {
//     allChannels: [],
//     currentActiveId: null,
//     userInitiator: null,
//   },
  reducers: {
    addChannels: (state, action) => {
      state.allChannels = action.payload;
    },
    addChannel: (state, action) => {
      state.currentActiveId = state.userInitiator ? action.payload.id : state.currentActiveId;
      state.allChannels.push(action.payload);
      state.userInitiator = null;
    },
    removeChannel: (state, action) => {
      const { id } = action.payload;
      const filteredChannels = state.allChannels.filter((channel) => channel.id !== id);
      state.allChannels = filteredChannels;
      state.currentActiveId = state.currentActiveId === id ? 1 : state.currentActiveId;
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const updatedChannels = state.allChannels.map((channel) => {
        if (channel.id === id) {
          return { ...channel, name };
        }
        return channel;
      });
      state.currentActiveId = state.currentActiveId === id ? id : state.currentActiveId;
      state.allChannels = updatedChannels;
    },
    setActiveChannel: (state, action) => {
      state.currentActiveId = action.payload;
    },
    setUserInitiator: (state, action) => {
      state.userInitiator = action.payload;
    },
  },
});

export const {
  addChannels,
  addChannel,
  removeChannel,
  renameChannel,
  setActiveChannel,
  setUserInitiator,
} = channelsSlice.actions;

export default channelsSlice.reducer;
