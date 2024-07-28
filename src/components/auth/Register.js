import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { name, email, password, confirmPassword, userType } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else if (!userType) {
      setError('Please select a user type');
    } else {
      try {
        const response = await axios.post('/api/auth/register', { name, email, password, userType });
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          navigate('/dashboard');
        } else {
          setError('Failed to register');
        }
      } catch (err) {
        setError('Failed to register');
      }
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={onSubmit}>
        <div>
          <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} required />
        </div>
        <div>
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required />
        </div>
        <div>
          <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
        </div>
        <div>
          <input type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={onChange} required />
        </div>
        <div>
          <label>
            <input type="radio" name="userType" value="freelance" onChange={onChange} required />
            I'm a freelance
          </label>
        </div>
        <div>
          <label>
            <input type="radio" name="userType" value="employer" onChange={onChange} required />
            I'm looking for a freelance
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
