import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [currencies, setCurrencies] = useState([]);
  const [newCurrency, setNewCurrency] = useState({ code: '', name: '', apiKey: '' });
  const [translations, setTranslations] = useState([]);
  const [newTranslation, setNewTranslation] = useState({ language: '', file: null });

  useEffect(() => {
    fetchCategories();
    fetchCurrencies();
    fetchTranslations();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchCurrencies = async () => {
    try {
      const res = await axios.get('/api/currencies');
      setCurrencies(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchTranslations = async () => {
    try {
      const res = await axios.get('/api/translations');
      setTranslations(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleCategoryChange = (e) => setNewCategory({ ...newCategory, [e.target.name]: e.target.value });

  const handleCurrencyChange = (e) => setNewCurrency({ ...newCurrency, [e.target.name]: e.target.value });

  const handleTranslationChange = (e) => setNewTranslation({ ...newTranslation, [e.target.name]: e.target.files[0] });

  const addCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/categories', newCategory);
      fetchCategories();
      setNewCategory({ name: '', description: '' });
    } catch (err) {
      console.error(err.message);
    }
  };

  const addCurrency = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/currencies', newCurrency);
      fetchCurrencies();
      setNewCurrency({ code: '', name: '', apiKey: '' });
    } catch (err) {
      console.error(err.message);
    }
  };

  const uploadTranslation = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('language', newTranslation.language);
    formData.append('file', newTranslation.file);

    try {
      await axios.post('/api/translations', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchTranslations();
      setNewTranslation({ language: '', file: null });
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateCurrencyRates = async () => {
    try {
      await axios.put('/api/currencies/update-rates');
      fetchCurrencies();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <section>
        <h2>Manage Categories</h2>
        <form onSubmit={addCategory}>
          <input type="text" name="name" value={newCategory.name} onChange={handleCategoryChange} placeholder="Category Name" required />
          <input type="text" name="description" value={newCategory.description} onChange={handleCategoryChange} placeholder="Description" />
          <button type="submit">Add Category</button>
        </form>
        <ul>
          {categories.map(category => (
            <li key={category._id}>{category.name} - {category.description}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Manage Currencies</h2>
        <form onSubmit={addCurrency}>
          <input type="text" name="code" value={newCurrency.code} onChange={handleCurrencyChange} placeholder="Currency Code" required />
          <input type="text" name="name" value={newCurrency.name} onChange={handleCurrencyChange} placeholder="Currency Name" required />
          <input type="text" name="apiKey" value={newCurrency.apiKey} onChange={handleCurrencyChange} placeholder="API Key" required />
          <button type="submit">Add Currency</button>
        </form>
        <button onClick={updateCurrencyRates}>Update Currency Rates</button>
        <ul>
          {currencies.map(currency => (
            <li key={currency._id}>{currency.code} - {currency.name} (Rate: {currency.rate})</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Manage Translations</h2>
        <form onSubmit={uploadTranslation}>
          <input type="text" name="language" value={newTranslation.language} onChange={e => setNewTranslation({ ...newTranslation, language: e.target.value })} placeholder="Language" required />
          <input type="file" name="file" onChange={handleTranslationChange} required />
          <button type="submit">Upload Translation</button>
        </form>
        <ul>
          {translations.map(translation => (
            <li key={translation._id}>{translation.language} - {translation.filePath}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
