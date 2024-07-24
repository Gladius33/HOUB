const axios = require('axios');
console.log('Loading Currency model...');
const Currency = require('../models/Currency');
console.log('Currency model loaded:', Currency);

exports.updateCurrencyRates = async (req, res) => {
  try {
    console.log('Fetching currency rates...');
    const response = await axios.get('https://cdn.taux.live/api/ecb.json');
    console.log('Rates fetched:', response.data);
    const rates = response.data;

    const currencyFields = {};
    for (let currency in rates) {
      if (rates.hasOwnProperty(currency)) {
        currencyFields[currency] = rates[currency];
      }
    }

    console.log('Updating currency fields:', currencyFields);
    let currency = await Currency.findOne();
    if (currency) {
      currency = await Currency.findOneAndUpdate(
        {},
        { $set: currencyFields },
        { new: true }
      );
    } else {
      currency = new Currency(currencyFields);
      await currency.save();
    }

    console.log('Currency updated:', currency);
    res.json(currency);
  } catch (err) {
    console.error('Error fetching or updating currency rates:', err.message);
    res.status(500).send('Erreur du serveur');
  }
};
