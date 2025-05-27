import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // if (localStorage.getItem('token') === null) {
  //   setIsLoading(false);
  // }

  //fetch user profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get('/profile');
      setUser(res.data);
      setIsLoading(false);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  //Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      await fetchProfile();
    } catch (err) {
      throw err;
    }
  };

  //Logoutfunction
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
