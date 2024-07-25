import React, { useState } from 'react';

const JobPostingForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [maxRate, setMaxRate] = useState('');
  const [duration, setDuration] = useState('');
  const [workType, setWorkType] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoie les informations de l'offre d'emploi au backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Job Posting</h2>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <label>Category:</label>
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      <label>Maximum Rate:</label>
      <input type="number" value={maxRate} onChange={(e) => setMaxRate(e.target.value)} />
      <label>Duration (days):</label>
      <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
      <label>Work Type:</label>
      <select value={workType} onChange={(e) => setWorkType(e.target.value)}>
        <option value="remote">Remote</option>
        <option value="on-site">On-Site</option>
      </select>
      <label>Location (if on-site):</label>
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      <button type="submit">Post Job</button>
    </form>
  );
};

export default JobPostingForm;
