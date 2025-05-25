import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; // your axios instance
import input from 'daisyui/components/input';

const Profile = () => {
  const [user, setUser] = useState({ username: '', email: '', bio: ' ' });
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState('');

  useEffect(() => {
    axios.get('/profile').then((res) => {
      setUser(res.data);
      console.log(res.data);
      setBio(res.data.bio);
    });
  }, []);

  // const handleChange = (e) => {
  //   setFormData({ ...formData });
  // };

  const handleUpdate = async () => {
    try {
      const res = await axios.put('/profile', { user });
      setUser(res.data);
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };
  //
  return (
    <div>
      {editing ? (
        <div className="p-6 flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-semibold">Edit Profile</h2>
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src={user.image} alt="User Avatar" />{' '}
            </div>
          </div>

          {/* Username field */}
          <div className="flex flex-col w-full max-w-xs">
            <label htmlFor="username" className="text-lg mb-1">
              Username:
            </label>
            <input
              id="username"
              type="text"
              placeholder="username"
              className="input w-full" // <--- ADDED w-full here
              value={user.username}
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
              }}
            />
          </div>

          {/* Email field */}
          <div className="flex flex-col w-full max-w-xs">
            <label htmlFor="email" className="text-lg mb-1">
              Email:
            </label>
            <input
              id="email"
              type="text"
              placeholder="email"
              className="input w-full" // <--- ADDED w-full here
              value={user.email}
              // onChange handler
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />
          </div>

          {/* Bio field */}
          <div className="flex flex-col w-full max-w-xs">
            <label htmlFor="bio" className="text-lg mb-1">
              Bio:
            </label>
            <input
              id="bio"
              type="text"
              placeholder="bio"
              className="input w-full" // <--- ADDED w-full here
              value={user.bio ? user.bio : ''}
              // onChange handler
              onChange={(e) => {
                setUser({ ...user, bio: e.target.value });
              }}
            />
          </div>

          <button onClick={handleUpdate} className="btn btn-secondary">
            Save
          </button>
        </div>
      ) : (
        <div className="p-6 flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-semibold">Profile</h2>
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src={user.image} alt="User Avatar" />{' '}
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
          <button
            onClick={() => setEditing(true)}
            className="btn btn-secondary"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};
export default Profile;
