import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React, { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext.jsx';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home.jsx';
import PrivateRoute from './components/Private.jsx';
import Profile from './pages/Profile';
import NavBar from './components/NavBar.jsx';

const App = () => {
  // const { isLoading } = useContext(AuthContext);
  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <span className="loading loading-spinner text-primary"></span>
  //     </div>
  //   );
  // }
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
