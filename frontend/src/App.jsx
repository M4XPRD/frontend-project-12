import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/Main';
import AuthProvider from './contexts/AuthProvider';
import NetworkProvider from './contexts/NetworkProvider';
import SocketProvider from './contexts/SocketProvider';
import LangProvider from './contexts/LanguageProvider';

const App = ({ socket }) => (
  <SocketProvider socket={socket}>
    <NetworkProvider>
      <AuthProvider>
        <LangProvider>
          <Main />
        </LangProvider>
      </AuthProvider>
    </NetworkProvider>
  </SocketProvider>
);

export default App;
