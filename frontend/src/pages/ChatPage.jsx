import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { setInfo } from '../store/chatSlice';
import Channels from './chatPages/Channels';
import Messages from './chatPages/Messages';
import { addMessage } from '../store/messagesSlice';

const ChatPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('/api/v1/data', {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
      },
    }).then((responce) => {
      // {channels: Array(2), messages: Array(0), currentChannelId: 1}
      // console.log(responce.data.messages);
      dispatch(setInfo(responce.data));
      responce.data.messages.forEach((message) => {
        dispatch(addMessage(message));
      });
    }).catch((error) => console.log(error));
  }, [dispatch]);

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
