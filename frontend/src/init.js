/* eslint-disable react/destructuring-assignment */

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import App from './App';
import './index.css';
import { addMessage } from './store/messagesSlice';
import store from './store/index';
import { setInfo } from './store/chatSlice';

const Init = (socket) => {
  socket.on('newMessage', (data) => {
    store.dispatch(addMessage(data));
  });
  socket.on('newChannel', (data) => {
    store.dispatch(setInfo(data));
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

/*
const getMessage = useCallback(() => {
  socket.on('newMessage', (payload) => {
    console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
  });
}, [socket]);

const getChannel = useCallback(() => {
  socket.on('newChannel', (payload) => {
    console.log(payload); // { id: 6, name: "new channel", removable: true }
  });
}, [socket]);

const getRemovedChannel = useCallback(() => {
  socket.on('removeChannel', (payload) => {
    console.log(payload); // { id: 6 };
  });
}, [socket]);

const getRenamedChannel = useCallback(() => {
  socket.on('renameChannel', (payload) => {
    console.log(payload); // { id: 7, name: "new name channel", removable: true }
  });
}, [socket]);
*/
