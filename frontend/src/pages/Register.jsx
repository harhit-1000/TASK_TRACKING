import { useState, useContext } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { login } = useContext(AuthContext); // ✅ use login from context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/register', form);
      login(res.data.token);         // ✅ Auto-login
      navigate('/');                 // ✅ Redirect to home
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    
    <div>
      <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
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
      <button className='button' type="submit">Register</button>
    </form>

        <p>Already have an account? <Link to="/login">Login</Link></p>

    </div>
  );
};

export default Register;
