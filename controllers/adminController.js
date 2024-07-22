const axios = require('axios');
const Currency = require('../models/Currency');

exports.updateCurrencyRates = async (req, res) => {
  const { apiKey, currencies } = req.body;

  try {
    const response = await axios.get(`https://api.exchangeratesapi.io/latest?access_key=${apiKey}`);
    const rates = response.data.rates;

    const currencyFields = {};
    currencies.forEach(currency => {
      if (rates[currency]) {
        currencyFields[currency] = rates[currency];
      }
    });

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

    res.json(currency);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
