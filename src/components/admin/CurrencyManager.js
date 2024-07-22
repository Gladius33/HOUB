import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const CurrencyManager = () => {
  const { t } = useTranslation();
  const [currencies, setCurrencies] = useState([]);
  const [formData, setFormData] = useState({ code: '', name: '', apiKey: '' });

  const { code, name, apiKey } = formData;

  useEffect(() => {
    const fetchCurrencies = async () => {
      const res = await axios.get('/api/currencies');
      setCurrencies(res.data);
    };

    fetchCurrencies();
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/currencies', formData);
    setCurrencies([...currencies, res.data]);
  };

  const updateRates = async () => {
    await axios.put('/api/currencies/update-rates');
    alert(t('success'));
  };

  return (
    <div>
      <h1>{t('manageCurrencies')}</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>{t('currencyCode')}</label>
          <input type="text" name="code" value={code} onChange={onChange} required />
        </div>
        <div>
          <label>{t('currencyName')}</label>
          <input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div>
          <label>{t('apiKey')}</label>
          <input type="text" name="apiKey" value={apiKey} onChange={onChange} />
        </div>
        <button type="submit">{t('addCurrency')}</button>
      </form>
      <button onClick={updateRates}>{t('updateCurrencyRates')}</button>
      <ul>
        {currencies.map((currency) => (
          <li key={currency._id}>{currency.code}: {currency.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CurrencyManager;
