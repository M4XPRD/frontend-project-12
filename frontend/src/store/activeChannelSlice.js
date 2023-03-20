/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const activeChannelSlice = createSlice({
  name: 'channel',
  initialState: {
    activeChannel: {
      name: '',
      id: null,
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

export const { setActiveChannel } = activeChannelSlice.actions;
export default activeChannelSlice.reducer;
