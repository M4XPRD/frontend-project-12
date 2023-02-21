import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './pages/Main';
import AuthProvider from './contexts/AuthProvider';
// import AuthContext from './contexts/AuthContext';

const App = () => (
  <AuthProvider>
    <Main />
  </AuthProvider>
);

export default App;
