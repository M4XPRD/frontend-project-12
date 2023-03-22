import axios from 'axios';
import { useEffect } from 'react';
import Channels from './chatPages/Channels';
import Messages from './chatPages/Messages';
import { addMessages } from '../store/messagesSlice';
import { addChannels } from '../store/channelsSlice';
import store from '../store/index';
import { setActiveChannel } from '../store/activeChannelSlice';
import routes from '../routes/routes';

const ChatPage = () => {
  useEffect(() => {
    const getData = async () => {
      axios.get(routes.dataPath(), {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
        },
      }).then((responce) => {
      // {channels: Array(2), messages: Array(0), currentChannelId: 1}
        const { channels, messages, currentChannelId } = responce.data;
        const filteredChannels = channels.filter((channel) => channel.id === currentChannelId);
        const [currentActiveChannel] = filteredChannels;
        store.dispatch(setActiveChannel(currentActiveChannel));
        store.dispatch(addChannels(channels));
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
