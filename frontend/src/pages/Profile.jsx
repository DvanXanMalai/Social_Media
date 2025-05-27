import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; // your axios instance
import UserPosts from '../components/UserPosts';

const Profile = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    bio: '',
    image: '',
    imagePreview: '',
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    axios.get('/profile').then((res) => {
      setUser(res.data);
    });
  }, []);

  // const handleChange = (e) => {
  //   setFormData({ ...formData });
  // };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('username', user.username);
      formData.append('email', user.email);
      formData.append('bio', user.bio);

      if (user.image instanceof File) {
        formData.append('image', user.image);
      }

      const res = await axios.put('/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUser(res.data);
      console.log(res);
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
              {user.imagePreview ? (
                <img src={user.imagePreview} alt="User Avatar" />
              ) : (
                <img src={user.image} alt="User Avatar" />
              )}
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
          {/*image field*/}
          <div className="flex flex-col w-full max-w-xs">
            <label htmlFor="image" className="text-lg mb-1">
              Image:
            </label>

            <input
              type="file"
              name="image"
              accept="image/*"
              className="file-input file-input-info"
              onChange={(e) => {
                const file = e.target.files[0];
                setUser({
                  ...user,
                  image: file,
                  imagePreview: URL.createObjectURL(file), // 👈 add this
                });
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
              <img src={user.image ? user.image : ' '} alt="User Avatar" />
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

          <p className="text-lg">
            <strong>My Posts:</strong>{' '}
          </p>

          <UserPosts />
        </div>
      )}
    </div>
  );
};
export default Profile;
