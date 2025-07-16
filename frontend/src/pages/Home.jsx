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
    <div className="home-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1>Task Tracker</h1>
      <button className='button' onClick={handleLogout}>Logout</button>
      </div>
      <TaskForm onSuccess={fetchTasks} />
      <hr />
      <TaskList tasks={tasks} loading={loading} onDelete={fetchTasks} />
    </div>
  );
};

export default Home;

