import { useState, useContext } from 'react';
import axios from '../axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // ✅ import
const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext); // ✅ Use `login` not `setToken`
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', form);
      login(res.data.token); // ✅ Proper method
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button className='button' type="submit">Login</button>
    </form>
    

{/* inside return, after<button> */}
<p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;
