/* eslint-disable max-len */
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
import { useEffect, useState } from 'react';
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
  const { t, i18n } = useTranslation();
  const [activeLang, setActiveLang] = useState(i18n.language);
  const network = useNetwork();
  const auth = useAuth();
  const navigate = useNavigate();
  const currentLanguage = i18n.language;
  const parseToken = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    window.addEventListener('online', network.handleNetworkChange);
    window.addEventListener('offline', network.handleNetworkChange);
  }, [network]);

  const handleChangeLanguage = () => {
    const updatedLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
    setActiveLang(updatedLanguage);
  };

  useEffect(() => {
    if (activeLang) {
      localStorage.setItem('currentLanguage', JSON.stringify(activeLang));
      i18n.changeLanguage(activeLang);
    }
  }, [activeLang, currentLanguage, i18n]);

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
                    navigate('/login');
                  }}
                >
                  {t('mainPage.signOut')}
                </Button>
                )}
                {/* {!parseToken && (
                <Button
                  type="button"
                  variant="white"
                  id="language-button"
                  onClick={() => handleChangeLanguage()}
                >
                  <img alt="Change language" src={currentLanguage === 'ru' ? UK : RU} id="change-lang-img" />
                </Button>
                )} */}
                <Button
                  type="button"
                  variant="white"
                  id="language-button"
                  onClick={() => handleChangeLanguage()}
                >
                  <img alt="Change language" src={currentLanguage === 'ru' ? UK : RU} id="change-lang-img" />
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
        </div>
        <div className="Toastify" />
      </div>
    </div>
  );
};

export default Main;
