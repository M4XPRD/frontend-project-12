import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import channelReducer from './channelSlice';
import messagesReducer from './messagesSlice';

const store = configureStore({
  reducer: {
    chat: chatReducer,
    channel: channelReducer,
    messages: messagesReducer,
  },
});

export default store;
