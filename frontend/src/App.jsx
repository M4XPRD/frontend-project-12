import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import Main from './pages/Main';
import AuthProvider from './contexts/AuthProvider';
import SocketProvider from './contexts/SocketProvider';
import { addMessage } from './store/messagesSlice';

const App = ({ socket }) => {
  const dispatch = useDispatch();
  socket.on('newMessage', (data) => {
    dispatch(addMessage(data));
  });
  return (
    <SocketProvider socket={socket}>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </SocketProvider>
  );
};

export default App;
