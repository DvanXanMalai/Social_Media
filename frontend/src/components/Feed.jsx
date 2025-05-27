import { useEffect, useState } from 'react';
import axios from '../api/axios';

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await axios.get('/feed', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // or however your auth token is stored
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
    <div className="p-4 space-y-4 max-w-2xl mx-auto">
      {feed.length === 0 ? (
        <p>No posts to display.</p>
      ) : (
        feed.map((post) => (
          <div
            key={post.id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="font-semibold">{post.author.username}</div>
              <span className="text-gray-400 text-sm">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="mb-3">{post.content}</p>
            <div className="text-sm text-gray-600">
              ❤️ {post.likes.length}{' '}
              {post.likes.length === 1 ? 'like' : 'likes'}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;
