/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    allChannels: [],
    activeChannel: {
      name: null,
      id: null,
    },
    mode: {
      type: null,
      initiator: null,
      status: null,
      newChannel: {
        id: null,
        name: null,
      },
    },
  },
  reducers: {
    addChannels: (state, action) => {
      state.allChannels = action.payload;
    },
    addChannel: (state, action) => {
      state.mode.newChannel.id = action.payload.id;
      state.mode.newChannel.name = action.payload.name;
      state.mode.status = 'loaded';
      state.allChannels.push(action.payload);
    },
    setMode: (state, action) => {
      const { type, username } = action.payload;
      state.mode.type = type;
      state.mode.initiator = username;
    },
    resetMode: (state) => {
      state.mode.type = null;
      state.mode.initiator = null;
      state.mode.status = null;
      state.mode.newChannel.id = null;
      state.mode.newChannel.name = null;
    },
    removeChannel: (state, action) => {
      const { id } = action.payload;
      const filteredChannels = state.allChannels.filter((channel) => channel.id !== id);
      state.allChannels = filteredChannels;
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const updatedChannels = state.allChannels.map((channel) => {
        if (channel.id === id) {
          return { ...channel, name };
        }
        return channel;
      });
      state.allChannels = updatedChannels;
    },
    setActiveChannel: (state, action) => {
      const { name, id } = action.payload;
      state.activeChannel.name = name;
      state.activeChannel.id = id;
    },
  },
});

export const {
  addChannels, addChannel, removeChannel, renameChannel, setMode, resetMode, setActiveChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
