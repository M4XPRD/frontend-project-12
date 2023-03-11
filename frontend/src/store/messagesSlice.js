/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    allMessages: [],
  },
  reducers: {
    addMessages: (state, action) => {
      state.allMessages = action.payload;
    },
    addMessage: (state, action) => {
      state.allMessages.push(action.payload);
    },
  },
});

export const { addMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
