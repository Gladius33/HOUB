import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="job-list">
      <h2>Available Jobs</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job._id} className="job-item">
            <Link to={`/jobs/${job._id}`}>
              <h3>{job.title}</h3>
              <p>{job.shortDescription}</p>
              <p>Category: {job.category}</p>
              <p>Rate: {job.rate} per day</p>
              <p>Duration: {job.duration} days</p>
              <p>Location: {job.location}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;

