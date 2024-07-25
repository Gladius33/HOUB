import React, { useState } from 'react';

const ProfileForm = () => {
  const [shortDescription, setShortDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [rate, setRate] = useState('');
  const [minDuration, setMinDuration] = useState('');
  const [maxDuration, setMaxDuration] = useState('');
  const [workPreference, setWorkPreference] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoie les informations du profil au backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Profile</h2>
      <label>Short Description:</label>
      <input type="text" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
      <label>Detailed Description:</label>
      <textarea value={detailedDescription} onChange={(e) => setDetailedDescription(e.target.value)} />
      <label>Skills:</label>
      <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} />
      <label>Experience:</label>
      <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} />
      <label>Rate:</label>
      <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
      <label>Minimum Duration (days):</label>
      <input type="number" value={minDuration} onChange={(e) => setMinDuration(e.target.value)} />
      <label>Maximum Duration (days):</label>
      <input type="number" value={maxDuration} onChange={(e) => setMaxDuration(e.target.value)} />
      <label>Work Preference:</label>
      <select value={workPreference} onChange={(e) => setWorkPreference(e.target.value)}>
        <option value="full-time">Full-Time</option>
        <option value="part-time">Part-Time</option>
        <option value="remote">Remote</option>
        <option value="on-site">On-Site</option>
      </select>
      <label>Location (for on-site work):</label>
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      <button type="submit">Save Profile</button>
    </form>
  );
};

export default ProfileForm;
