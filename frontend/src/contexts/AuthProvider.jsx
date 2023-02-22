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

  const logIn = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
  }, []);

  const providedData = useMemo(() => ({
    isLoggedIn,
    logIn,
    logOut,
  }), [isLoggedIn, logIn, logOut]);

  return (
    <AuthContext.Provider value={providedData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
