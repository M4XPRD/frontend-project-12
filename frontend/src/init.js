/* eslint-disable react/destructuring-assignment */
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import App from './App';
import './index.css';
import { addMessage, removeMessages } from './store/messagesSlice';
import { addChannel, removeChannel, renameChannel } from './store/channelsSlice';
import { setActiveChannel } from './store/activeChannelSlice';
import store from './store/index';

const Init = (socket) => {
  socket.on('newMessage', (data) => {
    store.dispatch(addMessage(data));
  });
  socket.on('newChannel', (data) => {
    store.dispatch(addChannel(data));
    store.dispatch(setActiveChannel(data));
  });
  socket.on('removeChannel', (data) => {
    store.dispatch(removeChannel(data));
    store.dispatch(removeMessages(data));
  });
  socket.on('renameChannel', (data) => {
    store.dispatch(renameChannel(data));
    store.dispatch(setActiveChannel(data));
  });

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App socket={socket} />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default Init;
