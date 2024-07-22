import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('adminDashboard')}</h1>
      <ul>
        <li><Link to="/admin/categories">{t('manageCategories')}</Link></li>
        <li><Link to="/admin/currencies">{t('manageCurrencies')}</Link></li>
        <li><Link to="/admin/translations">{t('manageTranslations')}</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
