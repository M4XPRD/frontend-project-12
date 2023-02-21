import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ChatPage = () => {
  const navigate = useNavigate();
  const deleteToken = () => {
    localStorage.removeItem('authToken');
  };

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      {localStorage.getItem('authToken') ? (<Link to="/login">Back</Link>) : null}
      <br />
      <br />
      <br />
      <button type="button" onClick={deleteToken}>Удалить токен</button>
    </div>
  );
};

export default ChatPage;
