import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from '../hooks/index';

// eslint-disable-next-line max-len
// Сделайте проверку существования токена в localStorage и редирект на форму входа в случае его отсутствия.

const ChatPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  console.log(auth.isLoggedIn);

  const deleteToken = () => {
    localStorage.removeItem('userInfo');
  };

  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      {localStorage.getItem('userInfo') ? (<Link to="/login">Back</Link>) : null}
      <br />
      <br />
      <br />
      <button type="button" onClick={deleteToken}>Удалить токен</button>
    </div>
  );
};

export default ChatPage;
