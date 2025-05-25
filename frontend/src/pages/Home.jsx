import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import CreatePostModal from '../components/CreatePostModal';

function Home() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      <CreatePostModal />
      <p>feed</p>
    </div>
  );
}

export default Home;
