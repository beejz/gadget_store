import React, { createContext, useState, useEffect, useContext } from 'react';
import { authUser, registerUser } from '../services/api';

const AuthContext = createContext();

/**
 * AuthProvider wraps your app and provides auth state and methods
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // On mount, load user/token from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  /**
   * Login with email/password, store user & token
   */
  const login = async ({ email, password }) => {
    const data = await authUser({ email, password });
    const { id, name, email: userEmail, token: jwt } = data;
    setUser({ id, name, email: userEmail });
    setToken(jwt);
    localStorage.setItem('user', JSON.stringify({ id, name, email: userEmail }));
    localStorage.setItem('token', jwt);
  };

  /**
   * Register new user, store user & token
   */
  const register = async ({ name, email, password }) => {
    const data = await registerUser({ name, email, password });
    const { id, name: userName, email: userEmail, token: jwt } = data;
    setUser({ id, name: userName, email: userEmail });
    setToken(jwt);
    localStorage.setItem('user', JSON.stringify({ id, name: userName, email: userEmail }));
    localStorage.setItem('token', jwt);
  };

  /**
   * Logout user and clear storage
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
