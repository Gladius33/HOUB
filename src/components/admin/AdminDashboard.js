import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [apiKey, setApiKey] = useState('');
  const [currencies, setCurrencies] = useState(['USD', 'EUR', 'GBP']); // Add more as needed

  const onChange = (e) => {
    if (e.target.name === 'apiKey') {
      setApiKey(e.target.value);
    } else {
      const updatedCurrencies = [...currencies];
      updatedCurrencies[e.target.dataset.index] = e.target.value;
      setCurrencies(updatedCurrencies);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/admin/currency', { apiKey, currencies });
      toast.success(t('currencyUpdated'));
    } catch (err) {
      toast.error(t('errorUpdatingCurrency'));
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>{t('adminDashboard')}</h1>
      <div>
        <label>{t('apiKey')}</label>
        <input type="text" name="apiKey" value={apiKey} onChange={onChange} required />
      </div>
      {currencies.map((currency, index) => (
        <div key={index}>
          <label>{t('currency')}</label>
          <input type="text" data-index={index} value={currency} onChange={onChange} required />
        </div>
      ))}
      <button type="submit">{t('updateCurrencies')}</button>
    </form>
  );
};

export default AdminDashboard;
