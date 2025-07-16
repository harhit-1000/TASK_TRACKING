import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EditTask from './pages/EditTask';
import TaskForm from './components/TaskForm';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/create" element={
        <ProtectedRoute>
          <TaskForm />
        </ProtectedRoute>
      } />
      <Route path="/edit/:id" element={
        <ProtectedRoute>
          <EditTask />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
