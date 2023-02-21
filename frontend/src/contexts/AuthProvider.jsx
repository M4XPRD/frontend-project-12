import { useState, useMemo, useCallback } from 'react';
import AuthContext from './AuthContext';

/*
const AuthProvider = ({ children }) => {
  const savedUserData = JSON.parse(localStorage.getItem('user'));

  const [user, setUser] = useState(savedUserData ? { username: savedUserData.username } : null);

  const logIn = useCallback((userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const providedData = useMemo(() => ({
    logIn,
    logOut,
    user,
  }), [logIn, logOut, user]);

  return (
    <AuthContext value={providedData}>{children}</AuthContext>
  );
};

export default AuthProvider;
*/

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleAuth = useCallback(() => {
    setIsLoggedIn(!isLoggedIn);
  }, [isLoggedIn]);

  const providedData = useMemo(() => ({
    isLoggedIn,
    toggleAuth,
  }), [isLoggedIn, toggleAuth]);

  return (
    <AuthContext.Provider value={providedData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
