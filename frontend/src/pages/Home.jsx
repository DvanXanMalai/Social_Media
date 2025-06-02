import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import CreatePostModal from '../components/CreatePostModal';
import Feed from '../components/Feed';
import GetAllUsers from '../components/GetAllUsers'; // adjust path if needed

function Home() {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 sm:p-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Welcome, {user?.username || 'User'} 👋
          </h1>
          <p className="text-sm text-gray-500">Let’s share something today!</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feed Section: appears first on mobile */}
        <main className="order-1 lg:order-2 lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-semibold">Feed</h2>
            <div className="w-full sm:w-auto">
              <CreatePostModal />
            </div>
          </div>

          {/* Placeholder for posts */}
          <div className="card bg-base-100 shadow p-4">
            <Feed />
            <p className="text-gray-500 text-center"></p>
          </div>
        </main>

        {/* Sidebar: appears second on mobile, left on desktop */}
        <aside className="order-3 lg:order-1 space-y-6">
          {/* Profile Card */}
          <div className="card bg-base-100 shadow-md p-4 sm:p-6 flex flex-col items-center gap-4">
            <Link to="/me" className="avatar hover:opacity-80 transition">
              <div className="w-20 sm:w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {user?.image ? (
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
              <h2 className="text-lg sm:text-xl font-semibold">
                {user?.username}
              </h2>
              <p className="text-sm text-gray-500 break-all">{user?.email}</p>
            </div>
          </div>

          {/* Discover Users */}
          <div className="order-2,">
            <h3 className="text-lg font-semibold mb-2">Discover Users</h3>
            <GetAllUsers />
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Home;
