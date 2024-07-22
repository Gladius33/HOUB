import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const { name, email, message } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact', formData);
      alert(t('success'));
    } catch (err) {
      alert(t('error'));
    }
  };

  return (
    <div>
      <h1>{t('contact')}</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>{t('name')}</label>
          <input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div>
          <label>{t('email')}</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div>
          <label>{t('message')}</label>
          <textarea name="message" value={message} onChange={onChange} required />
        </div>
        <button type="submit">{t('send')}</button>
      </form>
    </div>
  );
};

export default Contact;
