/* eslint-disable react/destructuring-assignment */

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import React from 'react';
import { Provider as RollbalProvider, ErrorBoundary } from '@rollbar/react';
import i18n from './i18n';
import App from './App';
import './index.css';
import { addMessage } from './slices/messagesSlice';
import {
  addChannel, removeChannel, renameChannel,
} from './slices/channelsSlice';
import store from './slices/index';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  payload: {
    environment: 'production',
  },
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const Init = (socket) => {
  socket.on('newMessage', (data) => {
    store.dispatch(addMessage(data));
  });
  socket.on('newChannel', (data) => {
    store.dispatch(addChannel(data));
  });
  socket.on('removeChannel', (data) => {
    store.dispatch(removeChannel(data));
    // store.dispatch(removeMessages(data));
  });
  socket.on('renameChannel', (data) => {
    store.dispatch(renameChannel(data));
  });

  return (
    <React.StrictMode>
      <BrowserRouter>
        <RollbalProvider config={rollbarConfig}>
          <ErrorBoundary>
            <Provider store={store}>
              <I18nextProvider i18n={i18n}>
                <App socket={socket} />
              </I18nextProvider>
            </Provider>
          </ErrorBoundary>
        </RollbalProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default Init;
