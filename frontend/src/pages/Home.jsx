import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import CreatePostModal from '../components/CreatePostModal';

function Home() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome, {user?.username || 'User'} 👋
          </h1>
          <p className="text-sm text-gray-500">Let’s share something today!</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar or Profile Summary */}
        <aside className="lg:col-span-1">
          <div className="card bg-base-100 shadow-md p-6 flex flex-col items-center gap-4">
            <Link to="/profile" className="avatar hover:opacity-80 transition">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {user.image ? (
                  <img
                    src={user.imagePreview || user.image}
                    alt="User Avatar"
                  />
                ) : (
                  <div className="bg-gray-300 w-full h-full flex items-center justify-center text-xl">
                    ?
                  </div>
                )}
              </div>
            </Link>
            <div className="text-center">
              <h2 className="text-xl font-semibold">{user?.username}</h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            {/* Optional future button */}
            {/* <button className="btn btn-sm btn-outline">Edit Profile</button> */}
          </div>
        </aside>

        {/* Feed Section */}
        <main className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Feed</h2>
            <CreatePostModal />
          </div>

          {/* Placeholder for posts */}
          <div className="card bg-base-100 shadow p-4">
            <p className="text-gray-500 text-center">
              No posts yet. Be the first to share something!
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
