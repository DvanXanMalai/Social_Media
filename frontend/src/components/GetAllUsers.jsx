import { useState, useEffect } from 'react';
import axios from '../api/axios'; // Adjust the import path as necessary
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate for navigation

const GetAllUsers = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleViewProfile = (userId) => {
    navigate(`/profile/${userId}`); // Navigate to the profile page with the user's ID
  };
  const [users, setUsers] = useState([]);
  // setLoading(true);
  // setError('');
  //

  useEffect(() => {
    // const response = await axios.get(`/users`);
    axios.get('/users').then((res) => {
      const currentUserId = localStorage.getItem('userId'); // or from context if available
      const filtered = res.data.filter((u) => u.id !== parseInt(currentUserId));
      setUsers(filtered);
    });
  }, []);

  //get all users

  return (
    <div className="flex flex-col gap-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="card bg-base-100 shadow-md p-6 flex flex-col items-center text-center rounded-2xl transition hover:shadow-xl border border-base-300"
        >
          <div className="avatar mb-3 cursor-pointer">
            <div
              className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
              onClick={() => handleViewProfile(user.id)}
            >
              <img
                src={user.image || '/default-avatar.png'}
                alt={user.username}
              />
            </div>
          </div>
          <h3 className="text-lg font-bold text-primary">{user.username}</h3>
          <p className="text-sm text-gray-400">{user.email}</p>
          {user.bio && <p className="text-xs text-gray-500 mt-1">{user.bio}</p>}
          <button
            className=" mt-4 px-4 py-2 text-sm font-semibold
    btn btn-primary rounded-lg

    transition-all duration-200 ease-in-out
    transform hover:scale-105 hover:shadow-lg
    focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50"
            onClick={() => handleViewProfile(user.id)}
          >
            View Profile
          </button>
        </div>
      ))}
    </div>
  );
};

export default GetAllUsers;
