import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import JobPostingForm from './JobPostingForm';
import FreelanceSearch from './FreelanceSearch';
import JobList from '../Jobs/JobList';
import Notifications from './Notifications';

const EmployerDashboard = () => {
  const { t } = useTranslation();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch jobs posted by the employer
    // setJobs(fetchedJobs);
  }, []);

  return (
    <div>
      <h1>{t('Employer Dashboard')}</h1>
      <FreelanceSearch />
      <JobPostingForm />
      <JobList jobs={jobs} />
      <Notifications />
    </div>
  );
};

export default EmployerDashboard;

