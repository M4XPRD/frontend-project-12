import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './pages/Main';
import AuthProvider from './contexts/AuthProvider';
import NetworkProvider from './contexts/NetworkProvider';
import SocketProvider from './contexts/SocketProvider';

const App = ({ socket }) => (
  <SocketProvider socket={socket}>
    <NetworkProvider>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </NetworkProvider>
  </SocketProvider>
);

export default App;
