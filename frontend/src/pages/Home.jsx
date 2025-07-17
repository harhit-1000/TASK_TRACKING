import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import axios from '../axios';

const Home = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/tasks');
      setTasks(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="home-page min-h-screen bg-gray-50 px-4 py-6 sm:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Task Tracker</h1>
        <button
          className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="max-w-2xl mx-auto w-full">
        <TaskForm onSuccess={fetchTasks} />
        <hr className="my-6 border-gray-300" />
        <TaskList tasks={tasks} loading={loading} onDelete={fetchTasks} />
      </div>
    </div>
  );
};

export default Home;
