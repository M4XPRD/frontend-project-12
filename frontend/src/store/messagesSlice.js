/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      const { id, text } = action.payload;
      state.messages.push({ id, text });
    },
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
