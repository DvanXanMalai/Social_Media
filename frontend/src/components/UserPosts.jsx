import { useEffect, useState, useContext } from 'react';
import axios from '../api/axios.js';
import { AuthContext } from '../contexts/AuthContext.jsx';

const UserPosts = () => {
  const user = useContext(AuthContext);
  const userId = user.user.id;
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await axios.get(`/posts/${userId}/posts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFeed(response.data);
      } catch (error) {
        console.error('Error fetching feed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  if (loading) return <div className="p-4">Loading feed...</div>;

  return (
    <div className="p-4 space-y-6 max-w-2xl w-full mx-auto border border-gray-500 rounded-md">
      {feed.length === 0 ? (
        <div className="alert alert-info shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current flex-shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>No posts to display. Share something!</span>
          </div>
        </div>
      ) : (
        feed.map((post) => (
          <div
            key={post.id}
            className="card w-full bg-base-100 shadow-xl border border-base-200"
          >
            <div className="card-body">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full">
                    <img
                      src={user.user?.image || ' '}
                      alt="User Avatar"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-lg text-primary">
                    {post.author.username}
                  </span>
                  <span className="text-info text-sm opacity-70">
                    {new Date(post.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <p className="text-lg mb-4 break-words">{post.content}</p>

              {post.image && (
                <figure className="mb-4 rounded-lg overflow-hidden">
                  <img
                    src={post.image}
                    alt="Post media"
                    className="w-full h-auto object-cover max-h-96 rounded-md"
                  />
                </figure>
              )}

              {post.images &&
                Array.isArray(post.images) &&
                post.images.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
                    {post.images.map((imgSrc, index) => (
                      <figure
                        key={index}
                        className="rounded-lg overflow-hidden"
                      >
                        <img
                          src={imgSrc}
                          alt={`Post media ${index + 1}`}
                          className="w-full h-48 object-cover"
                        />
                      </figure>
                    ))}
                  </div>
                )}

              <div className="card-actions justify-start mt-2">
                <div className="badge badge-outline badge-primary">
                  ❤️ {post.likes.length}{' '}
                  {post.likes.length === 1 ? 'like' : 'likes'}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserPosts;
