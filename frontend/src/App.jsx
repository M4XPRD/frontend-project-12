import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './pages/Main';
import AuthProvider from './contexts/AuthProvider';

const App = () => (
  <AuthProvider>
    <Main />
  </AuthProvider>
);

export default App;
