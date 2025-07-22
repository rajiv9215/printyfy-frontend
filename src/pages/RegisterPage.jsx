import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://printyfy-backend.onrender.com/api/auth/admin/register', formData);
      setMessage('Registered successfully. You can login now!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Name" onChange={handleChange} className="border p-2 w-full mb-2" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mb-2" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mb-2" />
        <button type="submit" className="bg-green-500 text-white px-4 py-2">Register</button>
      </form>
      {message && <p className="mt-2 text-green-500">{message}</p>}

      <button onClick={() => navigate("/admin/login")} >Login</button>
    </div>
  );
};

export default RegisterPage;
