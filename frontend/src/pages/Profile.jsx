import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; // your axios instance
import UserPosts from '../components/UserPosts'; // Assuming you have a UserPosts component
import { useParams } from 'react-router-dom'; // Import useParams to get userId from URL

const Profile = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    bio: '',
    image: '',
  });
  const { userId } = useParams();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    axios.get(`/profile/${userId}`).then((res) => {
      setUser(res.data);
    });
  }, []);

  //
  return (
    <div className="p-6 flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-semibold">Profile</h2>
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src={user.image ? user.image : ' '} alt="User Avatar" />{' '}
        </div>
      </div>
      <p className="text-lg">
        <strong>Username:</strong> {user.username}
      </p>

      <p className="text-lg">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="text-lg text-center max-w-sm">
        {' '}
        <strong>Bio:</strong> {user.bio || 'No bio yet.'}
      </p>
    </div>
  );
};
export default Profile;
