import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PaymentInfoForm from './PaymentInfoForm.js';
import ProfileForm from './ProfileForm.js';
import JobList from '../jobs/JobList.js';
import Notifications from './Notifications.js';

const FreelancerDashboard = () => {
  const { t } = useTranslation();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch jobs related to the freelancer
    // setJobs(fetchedJobs);
  }, []);

  return (
    <div>
      <h1>{t('Freelancer Dashboard')}</h1>
      <ProfileForm />
      <PaymentInfoForm />
      <JobList jobs={jobs} />
      <Notifications />
    </div>
  );
};

export default FreelancerDashboard;

