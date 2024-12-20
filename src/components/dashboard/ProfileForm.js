
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../../axiosConfig.js';
import { updateProfile } from '../../redux/slices/profileSlice.js';

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    avatar: '',
    shortDescription: '',
    detailedDescription: '',
    education: '',
    experience: '',
    rate: '',
    minDuration: '',
    maxDuration: '',
    workPreference: 'full-time',
    location: '',
    geographicZone: '',
    categories: ''
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile({ ...profile, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoi des données du profil au serveur
      const response = await axios.put('/api/profile', profile);
      // Dispatch de l'action pour mettre à jour le store Redux
      dispatch(updateProfile(response.data));
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil', error);
      // Gestion des erreurs
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Profile</h2>
      <div>
        <label>Avatar:</label>
        <input type="file" name="avatar" onChange={handleChange} />
      </div>
      <div>
        <label>Short Description:</label>
        <textarea name="shortDescription" value={profile.shortDescription} onChange={handleChange}></textarea>
      </div>
      <div>
        <label>Detailed Description:</label>
        <textarea name="detailedDescription" value={profile.detailedDescription} onChange={handleChange}></textarea>
      </div>
      <div>
        <label>Education:</label>
        <input type="text" name="education" value={profile.education} onChange={handleChange} />
      </div>
      <div>
        <label>Experience:</label>
        <input type="text" name="experience" value={profile.experience} onChange={handleChange} />
      </div>
      <div>
        <label>Rate (Daily):</label>
        <input type="number" name="rate" value={profile.rate} onChange={handleChange} />
      </div>
      <div>
        <label>Min Duration (Days):</label>
        <input type="number" name="minDuration" value={profile.minDuration} onChange={handleChange} />
      </div>
      <div>
        <label>Max Duration (Days):</label>
        <input type="number" name="maxDuration" value={profile.maxDuration} onChange={handleChange} />
      </div>
      <div>
        <label>Work Preference:</label>
        <select name="workPreference" value={profile.workPreference} onChange={handleChange}>
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="remote">Remote</option>
          <option value="on-site">On-Site</option>
        </select>
      </div>
      <div>
        <label>Location (for on-site work):</label>
        <input type="text" name="location" value={profile.location} onChange={handleChange} />
      </div>
      <div>
        <label>Geographic Zone:</label>
        <input type="text" name="geographicZone" value={profile.geographicZone} onChange={handleChange} />
      </div>
      <div>
        <label>Categories:</label>
        <input type="text" name="categories" value={profile.categories} onChange={handleChange} />
      </div>
      <button type="submit">Save Profile</button>
    </form>
  );
};

export default ProfileForm;
