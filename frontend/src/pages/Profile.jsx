import React, { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import UserPosts from '../components/UserPosts';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';

const Profile = () => {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({
    username: '',
    email: '',
    bio: '',
    image: '',
    id: null,
  });
  const { myId } = useParams();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!myId) return;
    axios.get(`/profile/${myId}`).then((res) => {
      setUser(res.data);
    });
  }, [myId]);

  return (
    <div className="p-6 flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-semibold">Profile</h2>
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src={user.image || '/default-avatar.png'} alt="User Avatar" />
        </div>
      </div>
      <p className="text-lg">
        <strong>Username:</strong> {user.username}
      </p>
      <p className="text-lg">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="text-lg text-center max-w-sm">
        <strong>Bio:</strong> {user.bio || 'No bio yet.'}
      </p>
      {('userid', user.id)}
      {currentUser?.id !== user?.id ? (
        <UserPosts userId={user.id} />
      ) : (
        <UserPosts />
      )}
    </div>
  );
};

export default Profile;
