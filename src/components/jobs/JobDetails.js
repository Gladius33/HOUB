import React, { useEffect, useState } from 'react';

const JobDetails = ({ match }) => {
  const [job, setJob] = useState(null);

  useEffect(() => {
    setJob({ id: match.params.id, title: 'Web Developer', description: 'Full stack developer needed.' });
  }, [match.params.id]);

  if (!job) return <div>Loading...</div>;

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.description}</p>
    </div>
  );
};

export default JobDetails;
