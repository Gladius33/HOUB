import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from '../../axiosConfig.js';

const JobPostingForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    maxDailyRate: '',
    missionDuration: '',
    remote: false,
    location: '',
    workHours: '',
    companyName: '',
    companyAvatar: '',
    shortDescription: '',
    sector: '',
    country: '',
  });

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify(formData);
      await axios.post('/api/jobs', body, config);
      navigate('/dashboard/employer');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>{t('Job Title')}</label>
      <input type="text" name="title" value={formData.title} onChange={onChange} />
      <label>{t('Description')}</label>
      <textarea name="description" value={formData.description} onChange={onChange} />
      <label>{t('Category')}</label>
      <input type="text" name="category" value={formData.category} onChange={onChange} />
      <label>{t('Max Daily Rate')}</label>
      <input type="number" name="maxDailyRate" value={formData.maxDailyRate} onChange={onChange} />
      <label>{t('Mission Duration (days)')}</label>
      <input type="number" name="missionDuration" value={formData.missionDuration} onChange={onChange} />
      <label>{t('Remote Work')}</label>
      <input type="checkbox" name="remote" checked={formData.remote} onChange={(e) => setFormData({ ...formData, remote: e.target.checked })} />
      <label>{t('Location')}</label>
      <input type="text" name="location" value={formData.location} onChange={onChange} />
      <label>{t('Company Name')}</label>
      <input type="text" name="companyName" value={formData.companyName} onChange={onChange} />
      <label>{t('Company Avatar URL')}</label>
      <input type="text" name="companyAvatar" value={formData.companyAvatar} onChange={onChange} />
      <label>{t('Short Description')}</label>
      <textarea name="shortDescription" value={formData.shortDescription} onChange={onChange} />
      <label>{t('Sector')}</label>
      <input type="text" name="sector" value={formData.sector} onChange={onChange} />
      <label>{t('Country')}</label>
      <input type="text" name="country" value={formData.country} onChange={onChange} />
      <button type="submit">{t('Post Job')}</button>
    </form>
  );
};

export default JobPostingForm;

