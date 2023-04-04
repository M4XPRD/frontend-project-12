import { useState, useMemo, useCallback } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const initialState = JSON.parse(localStorage.getItem('userInfo'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(initialState ?? null);

  const logIn = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  const setUserInfo = useCallback((data) => {
    localStorage.clear();
    localStorage.setItem('userInfo', data);
    setUser(JSON.parse(data));
  }, []);

  const getUserInfo = useCallback(() => user, [user]);

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
