import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from '../api/axios';
import '../index.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      alert(
        err.response?.data?.message || 'Something went wrong, Login failed.',
      );
    }
  };
  return (
    <div className="flex justify-center items-center h-screen font-poppins">
      {' '}
      <div className="card w-96 bg-base-100 card-lg shadow-sm">
        <div className="card-body">
          <p className="card-title">Login</p>
          <input
            type="text"
            placeholder="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
          <a className="link link-secondary" href="/register">
            Dont have and account?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
