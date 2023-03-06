import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { io } from 'socket.io-client';
import App from './App';
import store from './store';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const socket = io();
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App socket={socket} />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
