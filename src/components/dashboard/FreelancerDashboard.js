import React from 'react';
import { useTranslation } from 'react-i18next';

const FreelancerDashboard = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('freelancerDashboard')}</h1>
    </div>
  );
};

export default FreelancerDashboard;
