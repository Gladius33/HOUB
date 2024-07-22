const Currency = require('../models/Currency');
const axios = require('axios');

exports.getCurrencies = async (req, res) => {
  try {
    const currencies = await Currency.find();
    res.json(currencies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.createCurrency = async (req, res) => {
  const { code, name, apiKey } = req.body;

  try {
    const response = await axios.get(`https://openexchangerates.org/api/latest.json?app_id=${apiKey}`);
    const rate = response.data.rates[code.toUpperCase()];

    const currency = new Currency({ code, name, rate, apiKey });
    await currency.save();
    res.json(currency);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateCurrencyRates = async (req, res) => {
  try {
    const currencies = await Currency.find();
    for (let currency of currencies) {
      const response = await axios.get(`https://openexchangerates.org/api/latest.json?app_id=${currency.apiKey}`);
      currency.rate = response.data.rates[currency.code.toUpperCase()];
      await currency.save();
    }
    res.json({ msg: 'Currency rates updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
