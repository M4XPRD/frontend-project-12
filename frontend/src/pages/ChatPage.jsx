import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { setInfo } from '../store/chatSlice';
import useAuth from '../hooks/index';

const ChatPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const dispatch = useDispatch();
  const chatInfo = useSelector((state) => state.chat.chatInfo);

  useEffect(() => {
    axios.get('/api/v1/data', {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
      },
    }).then((responce) => {
      // {channels: Array(2), messages: Array(0), currentChannelId: 1}
      dispatch(setInfo(responce.data));
    });
  }, [dispatch]);

  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      navigate('/login');
    }
  }, [navigate]);

  const deleteToken = () => {
    auth.logOut();
  };

  return (
    <div>
      {chatInfo.channels ? <div>КАНАЛЫ ЕСТЬ</div> : <p>ПУСТО</p>}
      <br />
      {auth.isLoggedIn && (<button type="button"><Link to="/login">Выход</Link></button>)}
      <br />
      <button type="button"><Link to="/login">Просто назад</Link></button>
      <br />
      <br />
      <br />
      <button type="button" onClick={deleteToken}>Удалить токен</button>
    </div>
  );
};

export default ChatPage;
