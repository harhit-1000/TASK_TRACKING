// // src/components/TaskForm.jsx
// import { useState, useEffect } from 'react';
// import axios from '../axios'; // ✅ Use configured axios with token
// import { useNavigate, useParams } from 'react-router-dom';

// const initialState = {
//   title: '',
//   description: '',
//   dueDate: '',
//   priority: 'Medium',
//   status: 'Pending',
// };

// const TaskForm = ({ onSuccess }) => {
//   const [task, setTask] = useState(initialState);
//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchTask = async () => {
//       try {
//         const res = await axios.get(`/tasks/${id}`);
//         setTask(res.data);
//       } catch (err) {
//         console.error('Failed to fetch task', err);
//       }
//     };

//     if (id) fetchTask();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTask((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (id) {
//         await axios.put(`/tasks/${id}`, task);
//       } else {
//         await axios.post('/tasks', task);
//       }

//       setTask(initialState);
//       if (onSuccess) onSuccess();
//       navigate('/');
//     } catch (err) {
//       console.error('Error saving task:', err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="task-form">
//       <input
//         name="title"
//         placeholder="Title"
//         value={task.title}
//         onChange={handleChange}
//         required
//       />
//       <textarea
//         name="description"
//         placeholder="Description"
//         value={task.description}
//         onChange={handleChange}
//       />
//       <input
//         type="date"
//         name="dueDate"
//         value={task.dueDate?.split('T')[0]}
//         onChange={handleChange}
//       />
//       <select name="priority" value={task.priority} onChange={handleChange}>
//         <option>Low</option>
//         <option>Medium</option>
//         <option>High</option>
//       </select>
//       <select name="status" value={task.status} onChange={handleChange}>
//         <option>Pending</option>
//         <option>Completed</option>
//       </select>
//       <button type="submit">{id ? 'Update' : 'Add'} Task</button>
//     </form>
//   );
// };

// export default TaskForm;

// src/components/TaskForm.jsx
import { useState, useEffect } from 'react';
import axios from '../axios';
import { useNavigate, useParams } from 'react-router-dom';

const initialState = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'Medium',
  status: 'Pending',
};

const TaskForm = ({ onSuccess }) => {
  const [task, setTask] = useState(initialState);
  const navigate = useNavigate();
  const { id } = useParams();

  // Load task data for editing
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`/tasks/${id}`);
        setTask(res.data);
      } catch (err) {
        console.error('Failed to fetch task', err);
      }
    };

    if (id) fetchTask();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form for create/update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await axios.put(`/tasks/${id}`, task);
      } else {
        await axios.post('/tasks', task);
      }

      setTask(initialState);

      // Trigger list refresh
      if (onSuccess) onSuccess();

      // Optional: redirect only on edit
      if (id) navigate('/');
    } catch (err) {
      console.error('Error saving task:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        name="title"
        placeholder="Title"
        value={task.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleChange}
      />
      <input
        type="date"
        name="dueDate"
        value={task.dueDate?.split('T')[0] || ''}
        onChange={handleChange}
      />
      <select name="priority" value={task.priority} onChange={handleChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <select name="status" value={task.status} onChange={handleChange}>
        <option>Pending</option>
        <option>Completed</option>
      </select>
      <button type="submit">{id ? 'Update' : 'Add'} Task</button>
    </form>
  );
};

export default TaskForm;
