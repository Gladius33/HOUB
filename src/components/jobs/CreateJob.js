import React, { useState } from 'react';

const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skillsRequired: ''
  });

  const { title, description, skillsRequired } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log('New Job:', formData);
  };

  return (
    <div>
      <h1>Create Job</h1>
      <form onSubmit={onSubmit}>
        <div>
          <input type="text" placeholder="Job Title" name="title" value={title} onChange={onChange} required />
        </div>
        <div>
          <textarea placeholder="Job Description" name="description" value={description} onChange={onChange} required />
        </div>
        <div>
          <input type="text" placeholder="Skills Required" name="skillsRequired" value={skillsRequired} onChange={onChange} required />
        </div>
        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};

export default CreateJob;
