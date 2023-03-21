import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import activeChannelReducer from './activeChannelSlice';
import messagesReducer from './messagesSlice';

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    activeChannel: activeChannelReducer,
    messages: messagesReducer,
  },
});

export default store;
