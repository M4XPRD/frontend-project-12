import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import {
  Button, Nav,
} from 'react-bootstrap';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import ErrorPage from './ErrorPage';
import SignUpPage from './SignUpPage';
import ChatPage from './ChatPage';
import SignInPage from './SignInPage';
import useAuth from '../hooks/authHook';
import useNetwork from '../hooks/networkHook';
import NetworkError from '../images/NetworkError.png';
import UK from '../images/UK.png';
import RU from '../images/RU.png';
import routes from '../routes/routes';
import useLang from '../hooks/langHook';
import Modals from './Modals';

const PrivateRoute = ({ children }) => {
  const hasToken = localStorage.getItem('userInfo');
  const location = useLocation();

  return hasToken ? (
    children
  ) : (
    <Navigate to={routes.loginPage()} state={{ from: location }} />
  );
};

const Main = () => {
  const { t } = useTranslation();
  const network = useNetwork();
  const auth = useAuth();
  const lang = useLang();
  const navigate = useNavigate();
  const parseToken = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    window.addEventListener('online', network.handleNetworkChange);
    window.addEventListener('offline', network.handleNetworkChange);
  }, [network]);

  const handleChangeLanguage = () => {
    lang.setActiveLang();
  };

  useEffect(() => {
    if (lang.activeLanguage) {
      lang.setLocalLanguage();
    }
  }, [lang]);

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">
                {t('mainPage.hexlet')}
              </a>
              <div id="img-logout-lngs">
                <img
                  alt="Network error"
                  id="main-network-img"
                  src={NetworkError}
                  className={`d-inline-block img-fluid mr-3 ml-auto ${
                    !parseToken ? 'invisible' : ''
                  }`}
                  style={{
                    opacity: network.isOnline ? 0 : 1,
                  }}
                />
                {parseToken && (
                <Button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    auth.logOut();
                    navigate(routes.loginPage());
                  }}
                >
                  {t('mainPage.signOut')}
                </Button>
                )}
                <Button
                  type="button"
                  variant="white"
                  id="language-button"
                  onClick={() => handleChangeLanguage()}
                >
                  <img alt="Change language" src={lang.activeLanguage === 'ru' ? UK : RU} id="change-lang-img" />
                </Button>
              </div>
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
            <Route path="/login" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Modals />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Main;
