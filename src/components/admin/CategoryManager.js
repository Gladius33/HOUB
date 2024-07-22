import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const CategoryManager = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const { name, description } = formData;

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    };

    fetchCategories();
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/categories', formData);
    setCategories([...categories, res.data]);
  };

  return (
    <div>
      <h1>{t('manageCategories')}</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>{t('categoryName')}</label>
          <input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div>
          <label>{t('description')}</label>
          <input type="text" name="description" value={description} onChange={onChange} />
        </div>
        <button type="submit">{t('addCategory')}</button>
      </form>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
