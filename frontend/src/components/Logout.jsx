// Inside Home.jsx or a Navbar component
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {/* Rest of Home content like TaskForm, TaskList */}
    </div>
  );
};
