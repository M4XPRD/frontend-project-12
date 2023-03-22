import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { useEffect } from 'react';
import ErrorPage from './ErrorPage';
import SignUpPage from './SignUpPage';
import ChatPage from './ChatPage';
import LoginPage from './LoginPage';
import useAuth from '../hooks/authHook';
import useNetwork from '../hooks/networkHook';
import NetworkError from '../images/NetworkError.png';

const PrivateRoute = ({ children }) => {
  const hasToken = localStorage.getItem('userInfo');
  const location = useLocation();

  return hasToken ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

const Main = () => {
  const network = useNetwork();
  const auth = useAuth();
  const navigate = useNavigate();
  const parseToken = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    window.addEventListener('online', network.handleNetworkChange);
    window.addEventListener('offline', network.handleNetworkChange);
  }, [network]);

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">
                Hexlet Chat
              </a>
              <img
                alt="Network error"
                id="main-network-img"
                src={NetworkError}
                className={`d-inline-block img-fluid mr-3 ml-auto ${!parseToken ? 'invisible' : ''}`}
                style={{
                  opacity: network.isOnline ? 0 : 1,
                }}
              />
              {parseToken && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    auth.logOut();
                    navigate('/login');
                  }}
                >
                  Выйти
                </button>
              )}
            </div>
          </Nav>
          <Routes>
            <Route
              path="/"
              element={(
                <PrivateRoute>
                  <ChatPage />
                </PrivateRoute>
              )}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        <div className="Toastify" />
      </div>
    </div>
  );
};

export default Main;
