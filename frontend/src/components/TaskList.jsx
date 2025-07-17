import { useState } from 'react';
import axios from '../axios';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks, loading, onDelete }) => {
    const [filter, setFilter] = useState('All');

    const handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm('Are you sure you want to delete this task?');
            if (!confirmDelete) return;
            await axios.delete(`/tasks/${id}`);
            onDelete();
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    const filteredTasks = tasks.filter(task =>
        filter === 'All' ? true : task.status === filter
    );

    return (
        <div className="max-w-3xl mx-auto px-4 py-6">
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
                {['All', 'Pending', 'Completed'].map(status => (
                    <button
                        key={status}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            filter === status
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
                        }`}
                        onClick={() => setFilter(status)}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {loading ? (
                <p className="text-center text-gray-500">Loading tasks...</p>
            ) : filteredTasks.length === 0 ? (
                <p className="text-center text-gray-500">No tasks to show.</p>
            ) : (
                <div className="flex flex-col gap-6">
                    {filteredTasks.map(task => (
                        <div
                            key={task._id}
                            className="w-full bg-white shadow-lg rounded-xl p-6 flex flex-row items-center justify-between border border-gray-100 hover:shadow-xl transition-shadow"
                        >
                            <div className="flex-1">
                                <h3 className="text-xl font-bold mb-1 text-gray-900">{task.title}</h3>
                                <p className="mb-2 text-gray-700">{task.description}</p>
                                <div className="flex gap-6 text-sm text-gray-500 mb-2">
                                    <span>
                                        <strong>Due:</strong> {task.dueDate?.split('T')[0]}
                                    </span>
                                    <span>
                                        <strong>Priority:</strong> {task.priority}
                                    </span>
                                    <span>
                                        <strong>Status:</strong> 
                                        <span className={`ml-1 px-2 py-0.5 rounded-full ${
                                            task.status === 'Completed'
                                                ? 'bg-green-100 text-green-700'
                                                : task.status === 'Pending'
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : 'bg-gray-100 text-gray-700'
                                        }`}>
                                            {task.status}
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 ml-6">
                                <Link
                                    to={`/edit/${task._id}`}
                                    className="px-4 py-2 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600 transition-colors shadow"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(task._id)}
                                    className="px-4 py-2 rounded-md bg-red-500 text-white text-sm hover:bg-red-600 transition-colors shadow"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
