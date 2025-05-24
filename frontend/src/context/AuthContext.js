import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return currentUser(null);

      const res = await axios.get("/api/users/me", {
        heaers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentUser(res.data);
    } catch (err) {
      console.error("Failed to fetch current user", err);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const login = (user, token) => {
    localStorage.setItem("token", token);
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };
  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
