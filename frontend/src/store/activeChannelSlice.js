/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const activeChannelSlice = createSlice({
  name: 'channel',
  initialState: {
    activeChannel: {
      name: 'general',
      id: 1,
    },
  },
  reducers: {
    setActiveChannel: (state, action) => {
      const { name, id } = action.payload;
      state.activeChannel.name = name;
      state.activeChannel.id = id;
    },
  },
});

export const { setActiveChannel, addMessage } = activeChannelSlice.actions;
export default activeChannelSlice.reducer;
