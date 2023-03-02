/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelSlice = createSlice({
  name: 'channel',
  initialState: {
    activeChannel: 'general',
  },
  reducers: {
    setActiveChannel: (state, action) => {
      state.activeChannel = action.payload;
    },
  },
});

export const { setActiveChannel } = channelSlice.actions;
export default channelSlice.reducer;
