import axios from 'axios';
import { useEffect } from 'react';
import Channels from './chatPages/Channels';
import Messages from './chatPages/Messages';
import { addMessages } from '../store/messagesSlice';
import { setInfo } from '../store/chatSlice';
import store from '../store/index';

const ChatPage = () => {
  useEffect(() => {
    const getData = () => {
      axios.get('/api/v1/data', {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
        },
      }).then((responce) => {
      // {channels: Array(2), messages: Array(0), currentChannelId: 1}
        const { channels, messages, currentChannelId } = responce.data;
        // console.log('КАНАЛЫ');
        // console.log(channels);
        // console.log('СООБЩЕНИЯ');
        // console.log(messages);
        console.log('ТЕКУЩИЙ ID');
        console.log(currentChannelId);
        store.dispatch(setInfo(channels));
        store.dispatch(addMessages(messages));
      }).catch((error) => {
        console.log('Something wrong happened', error);
        setTimeout(() => getData(), 5000);
      });
    };
    getData();
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </div>
    </div>
  );
};

export default ChatPage;
