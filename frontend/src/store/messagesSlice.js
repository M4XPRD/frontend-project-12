/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      const { channelId, body } = action.payload;
      state.messages.push({ channelId, body });
    },
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
