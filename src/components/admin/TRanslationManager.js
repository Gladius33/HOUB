import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const TranslationManager = () => {
  const { t } = useTranslation();
  const [translations, setTranslations] = useState([]);
  const [language, setLanguage] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchTranslations = async () => {
      const res = await axios.get('/api/translations');
      setTranslations(res.data);
    };

    fetchTranslations();
  }, []);

  const onFileChange = (e) => setFile(e.target.files[0]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', language);

    const res = await axios.post('/api/translations', formData);
    setTranslations([...translations, res.data]);
  };

  return (
    <div>
      <h1>{t('manageTranslations')}</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>{t('language')}</label>
          <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} required />
        </div>
        <div>
          <label>{t('file')}</label>
          <input type="file" onChange={onFileChange} required />
        </div>
        <button type="submit">{t('uploadTranslation')}</button>
      </form>
      <ul>
        {translations.map((translation) => (
          <li key={translation._id}>{translation.language}</li>
        ))}
      </ul>
    </div>
  );
};

export default TranslationManager;
