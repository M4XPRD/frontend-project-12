import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatInfo: {},
    // [{{id: 1, name: 'general', removable: false}}, {{id: 2, name: 'random', removable: false}}]
  },
  reducers: {
    setInfo: (state, action) => ({ ...state, chatInfo: action.payload }),
  },
});

export const { setInfo } = chatSlice.actions;
export default chatSlice.reducer;
