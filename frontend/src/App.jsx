import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './pages/Main';
import AuthProvider from './contexts/AuthProvider';
import SocketProvider from './contexts/SocketProvider';

const App = ({ socket }) => (
  <SocketProvider socket={socket}>
    <AuthProvider>
      <Main />
    </AuthProvider>
  </SocketProvider>
);

export default App;
