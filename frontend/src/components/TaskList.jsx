// // src/components/TaskList.jsx
// import { useState, useEffect } from 'react';
// import axios from '../axios'; // ✅ axios with token in header
// import { Link } from 'react-router-dom';

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);
//   const [filter, setFilter] = useState('All');
//   const [loading, setLoading] = useState(true);

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get('/tasks');
//       setTasks(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error fetching tasks:', err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/tasks/${id}`);
//       fetchTasks(); // refresh task list after deletion
//     } catch (err) {
//       console.error('Error deleting task:', err);
//     }
//   };

//   const filteredTasks = tasks.filter(task =>
//     filter === 'All' ? true : task.status === filter
//   );

//   return (
//     <div>
//       <div className="filter">
//         <button onClick={() => setFilter('All')}>All</button>
//         <button onClick={() => setFilter('Pending')}>Pending</button>
//         <button onClick={() => setFilter('Completed')}>Completed</button>
//       </div>

//       {loading ? (
//         <p>Loading tasks...</p>
//       ) : filteredTasks.length === 0 ? (
//         <p>No tasks to show.</p>
//       ) : (
//         filteredTasks.map(task => (
//           <div key={task._id} className="task-card">
//             <h3>{task.title}</h3>
//             <p>{task.description}</p>
//             <p><strong>Due:</strong> {task.dueDate?.split('T')[0]}</p>
//             <p><strong>Priority:</strong> {task.priority}</p>
//             <p><strong>Status:</strong> {task.status}</p>
//             <div className="actions">
//               <Link to={`/edit/${task._id}`}>Edit</Link>
//               <button onClick={() => handleDelete(task._id)}>Delete</button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default TaskList;

import { useState } from 'react';
import axios from '../axios';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks, loading, onDelete }) => {
  const [filter, setFilter] = useState('All');

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      onDelete(); // refresh task list after deletion
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const filteredTasks = tasks.filter(task =>
    filter === 'All' ? true : task.status === filter
  );

  return (
    <div>
      <div className="filter">
        <button onClick={() => setFilter('All')}>All</button>
        <button onClick={() => setFilter('Pending')}>Pending</button>
        <button onClick={() => setFilter('Completed')}>Completed</button>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : filteredTasks.length === 0 ? (
        <p>No tasks to show.</p>
      ) : (
        filteredTasks.map(task => (
          <div key={task._id} className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><strong>Due:</strong> {task.dueDate?.split('T')[0]}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <div className="actions">
              <Link to={`/edit/${task._id}`}>Edit</Link>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
