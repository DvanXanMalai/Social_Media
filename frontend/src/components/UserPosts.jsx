import { useEffect, useState, useContext } from 'react';
import axios from '../api/axios.js';
import { AuthContext } from '../contexts/AuthContext.jsx';

const UserPosts = () => {
  const user = useContext(AuthContext);
  const userId = user?.user?.id;
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const fetchFeed = async () => {
      try {
        const response = await axios.get(`/posts/${userId}/posts`);
        setFeed(response.data);
      } catch (error) {
        console.error('Error fetching feed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [userId]);

  // const handleLike = async (postId) => {
  //   const response = await axios.post(`/like/${postId}`);
  //   console.log('response while liked', response);
  // };

  // Handle like or unlike action
  const handleToggleLike = async (post) => {
    const isLiked = post.likes.some((like) => like.userId === userId);
    try {
      let response;
      if (isLiked) {
        // Unlike the post
        response = await axios.post(`/unlike/${post.id}`);
      } else {
        // Like the post
        response = await axios.post(`/like/${post.id}`);
      }

      // Update the specific post's likes array in local state from backend response
      if (response?.data?.likes) {
        setFeed((prevFeed) =>
          prevFeed.map((p) =>
            p.id === post.id ? { ...p, likes: response.data.likes } : p,
          ),
        );
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  if (loading) return <div className="p-4">Loading feed...</div>;

  return (
    <div className="p-4 space-y-6 max-w-2xl w-full mx-auto border border-gray-500 rounded-md">
      {feed.length === 0 ? (
        <div>No posts to display. Share something!</div>
      ) : (
        feed.map((post) => {
          const isLiked = post.likes.some((like) => like.userId === userId);
          const likeCount = post.likes.length;

          return (
            <div
              key={post.id}
              className="card w-full bg-base-100 shadow-xl border border-base-200"
            >
              <div className="card-body">
                {/* Post content here... */}
                <p>{post.content}</p>

                {/* Like button */}
                <button
                  className={`btn btn-soft btn-accent ${isLiked ? 'btn-active' : ''}`}
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

export default UserPosts;
