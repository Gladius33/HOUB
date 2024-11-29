import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/slices/authSlice.js';
import jwt from 'jsonwebtoken';
import { getCookie } from 'cookies-next';
import { jwtSecret } from 'config';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: ''
  });
  const [localError, setLocalError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    const token = getCookie('jwtToken');
    if (token) {
      const decodedToken = jwt.verify(token, jwtSecret);
      if (decodedToken) {
        navigate('/dashboard');
      }
    }
  }, [auth.token, navigate]);

  const { name, email, password, confirmPassword, userType } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
    } else if (!userType) {
      setLocalError('Please select a user type');
    } else {
      setLocalError(null);
      dispatch(register(formData));
    }
  };

  useEffect(() => {
    if (auth.error) {
      setLocalError(auth.error);
    }
  }, [auth.error]);

  return (
    <div>
      <h1>Register</h1>
      {localError && <div style={{ color: 'red' }}>{localError}</div>}
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