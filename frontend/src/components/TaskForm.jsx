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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (id) {
                await axios.put(`/tasks/${id}`, task);
            } else {
                await axios.post('/tasks', task);
            }

            setTask(initialState);

            if (onSuccess) onSuccess();

            if (id) navigate('/');
        } catch (err) {
            console.error('Error saving task:', err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="task-form mx-auto max-w-lg w-full bg-white shadow-lg rounded-xl p-6 flex flex-col gap-5
                sm:p-8 sm:gap-6
                "
        >
            <input
                name="title"
                placeholder="Title"
                value={task.title}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
            />
            <textarea
                name="description"
                placeholder="Description"
                value={task.description}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full min-h-[80px] resize-y"
            />
            <input
                type="date"
                name="dueDate"
                value={task.dueDate?.split('T')[0] || ''}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
            />
            <div className="flex flex-col sm:flex-row gap-4">
                <select
                    name="priority"
                    value={task.priority}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
                >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
                <select
                    name="status"
                    value={task.status}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
                >
                    <option>Pending</option>
                    <option>Completed</option>
                </select>
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white rounded-md px-6 py-2 font-semibold hover:bg-blue-700 transition w-full"
            >
                {id ? 'Update' : 'Add'} Task
            </button>
        </form>
    );
};

export default TaskForm;
