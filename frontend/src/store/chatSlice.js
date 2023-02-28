import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatInfo: {},
  },
  reducers: {
    setInfo: (state, action) => ({ ...state, chatInfo: action.payload }),
  },
});

export const { setInfo } = chatSlice.actions;
export default chatSlice.reducer;
