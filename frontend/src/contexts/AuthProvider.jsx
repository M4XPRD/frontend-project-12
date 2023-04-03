import { useState, useMemo, useCallback } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logIn = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
  }, []);

  const setUserInfo = useCallback((data) => {
    localStorage.clear();
    localStorage.setItem('userInfo', data);
  }, []);

  const getUserInfo = useCallback(() => JSON.parse(localStorage.getItem('userInfo')), []);

  const providedData = useMemo(() => ({
    isLoggedIn,
    logIn,
    logOut,
    setUserInfo,
    getUserInfo,
  }), [isLoggedIn, logIn, logOut, setUserInfo, getUserInfo]);

  return (
    <AuthContext.Provider value={providedData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
