/* eslint-disable react/destructuring-assignment */
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import App from './App';
import './index.css';
import { addMessage } from './store/messagesSlice';
import { addChannel } from './store/chatSlice';
import store from './store/index';

const Init = (socket) => {
  socket.on('newMessage', (data) => {
    store.dispatch(addMessage(data));
  });
  socket.on('newChannel', (data) => {
    console.log(data);
    store.dispatch(addChannel(data));
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
