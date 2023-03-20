/* eslint-disable react/destructuring-assignment */
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import App from './App';
import './index.css';
import { addMessage } from './store/messagesSlice';
import { addChannel, removeChannel } from './store/channelsSlice';
import store from './store/index';
import { setActiveChannel } from './store/activeChannelSlice';

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
const getRenamedChannel = useCallback(() => {
  socket.on('renameChannel', (payload) => {
    console.log(payload); // { id: 7, name: "new name channel", removable: true }
  });
}, [socket]);
*/
