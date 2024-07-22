import React from 'react';
import { useTranslation } from 'react-i18next';

const EmployerDashboard = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('employerDashboard')}</h1>
    </div>
  );
};

export default EmployerDashboard;
