/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const activeChannelSlice = createSlice({
  name: 'activeChannel',
  initialState: {
    name: '',
    id: null,
  },
  reducers: {
    setActiveChannel: (state, action) => {
      const { name, id } = action.payload;
      state.name = name;
      state.id = id;
    },
  },
});

export const { setActiveChannel } = activeChannelSlice.actions;
export default activeChannelSlice.reducer;
