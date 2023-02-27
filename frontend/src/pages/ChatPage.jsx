/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import useAuth from '../hooks/index';

const ChatPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    axios.get('/api/v1/data', {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
      },
    }).then((responce) => console.log(responce.data));
  }, []);

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
