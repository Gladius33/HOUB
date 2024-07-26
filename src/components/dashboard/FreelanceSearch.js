import React, { useState } from 'react';

const FreelanceSearch = () => {
  const [category, setCategory] = useState('');
  const [experience, setExperience] = useState('');
  const [rate, setRate] = useState('');
  const [duration, setDuration] = useState('');
  const [workType, setWorkType] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    // Logic for searching freelancers based on the criteria
  };

  return (
    <div>
      <h2>Find Freelancers</h2>
      <label>Category:</label>
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      <label>Experience:</label>
      <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} />
      <label>Rate (Max):</label>
      <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
      <label>Duration (days):</label>
      <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
      <label>Work Type:</label>
      <select value={workType} onChange={(e) => setWorkType(e.target.value)}>
        <option value="remote">Remote</option>
        <option value="on-site">On-Site</option>
      </select>
      {workType === 'on-site' && (
        <div>
          <label>Location (if on-site):</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
      )}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default FreelanceSearch;

