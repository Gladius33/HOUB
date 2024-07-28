import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        setError('Acces denied. Invalid credentials.');
      }
    } catch (err) {
      setError('Acces denied. Invalid credentials.');
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={onSubmit}>
        <div>
          <input type="email" placeholder="e-mail address" name="email" value={email} onChange={onChange} required />
        </div>
        <div>
          <input type="password" placeholder="password" name="password" value={password} onChange={onChange} required />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      <p>
        Don't have an account yet ? <a href="/register">Register here !</a>
      </p>
    </div>
  );
};

export default Login;
