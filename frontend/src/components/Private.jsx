import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { validateToken } from '../utils/auth'; // Assuming you have an API function to validate token

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const check = async () => {
      const valid = await validateToken();
      setIsValid(valid);
      setLoading(false);
    };
    check();
  }, []);
  if (loading) return <div>Loading...</div>;
  return isValid ? children : <Navigate to="/login" />; // Redirect to login if token is invalid
};

export default PrivateRoute;
