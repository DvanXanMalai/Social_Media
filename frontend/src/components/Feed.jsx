import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx'; // Import AuthContext to access current user
import axios from '../api/axios'; // Import axios for API calls
const Feed = () => {
  const { user } = useContext(AuthContext); // Get current user from AuthContext

  const myId = user?.id; // Get current user's ID
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await axios.get('/posts/feed');
        setFeed(res.data);
      } catch (error) {
        setFeed(null);
      }
    };
    fetchFeed();
  }, []);

  return (
    <div className="p-4 space-y-6 max-w-2xl w-full mx-auto rounded-2xl">
      {feed.length === 0 ? (
        <div>No posts to display. Share something!</div>
      ) : (
        feed.map((post) => {
          const isLiked = post.likes.some((like) => like.userId === myId);
          const likeCount = post.likes.length;

          return (
            <div key={post.id} className="card w-full bg-base-100  shadow-xl  ">
              <div className="card-body bg-base-200 ">
                <div className="flex gap-4">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      {user?.image ? (
                        <img src={user?.image} alt="User Avatar" />
                      ) : null}
                    </div>
                  </div>

                  <p className="text-lg">
                    <strong></strong> {user?.username}
                  </p>
                </div>
                {/* Post content here... */}
                <strong>{post.content}</strong>

                <div className="rounded-2xl shadow-xl overflow-hidden">
                  {post.image ? (
                    <div className="w-full h-80 flex items-center justify-center ">
                      <img
                        src={post.image}
                        alt=" "
                        className="w-full h-full object-cover rounded-2xl transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  ) : null}
                </div>

                {/* Like button */}
                <button
                  className={`btn btn-outline btn-accent max-w-2xs ${isLiked ? 'btn-active' : ''}`}
                  onClick={() => handleToggleLike(post)}
                >
                  {isLiked ? '💖' : '🤍'} {likeCount}{' '}
                  {likeCount === 1 ? 'like' : 'likes'}
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Feed;
