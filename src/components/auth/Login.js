import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/slices/authSlice.js';
import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';
import { jwtSecret } from 'config';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [localError, setLocalError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector(state => state.auth);
  const { isAuthenticated, error } = auth;

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Vérification du token dans le cookie
      const token = getCookie('authToken');
      if (token) {
        try {
          jwt.verify(token, jwtSecret);
          navigate('/dashboard');
        } catch (e) {
          setLocalError('Invalid token');
        }
      }
    }
    if (error) {
      setLocalError(error);
    }
  }, [isAuthenticated, error, navigate]);

  return (
    <div>
      <h1>Login</h1>
      {localError && <div style={{ color: 'red' }}>{localError}</div>}
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register here!</a>
      </p>
    </div>
  );
};

export default Login;

