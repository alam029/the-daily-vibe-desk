import { createContext, useContext, useEffect, useState } from 'react';
import { setAuthToken } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('dwd-token'));
  const [username, setUsername] = useState(() => localStorage.getItem('dwd-username'));

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const login = (newToken, user) => {
    localStorage.setItem('dwd-token', newToken);
    localStorage.setItem('dwd-username', user.username);
    setToken(newToken);
    setUsername(user.username);
  };

  const logout = () => {
    localStorage.removeItem('dwd-token');
    localStorage.removeItem('dwd-username');
    setToken(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ token, username, isAuthed: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
