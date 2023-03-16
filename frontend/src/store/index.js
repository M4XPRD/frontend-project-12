import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './channelsSlice';
import channelReducer from './activeChannelSlice';
import messagesReducer from './messagesSlice';

const store = configureStore({
  reducer: {
    chat: chatReducer,
    channel: channelReducer,
    messages: messagesReducer,
  },
});

export default store;
