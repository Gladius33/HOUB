import axios from 'axios';
import Currency from '../models/Currency.js';

export async function getCurrencies(req, res) {
  try {
    const currencies = await Currency.find();
    res.json(currencies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
}

export async function createCurrency(req, res) {
  const { code, name } = req.body;

  try {
    const response = await axios.get('https://cdn.taux.live/api/ecb.json'); // Utilisation de axios.get
    const rate = response.data[code.toUpperCase()];

    if (!rate) {
      return res.status(400).json({ msg: 'Code de devise invalide' });
    }

    const currency = new Currency({ code, name, rate });
    await currency.save();
    res.json(currency);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
}

export async function updateCurrencyRates(req, res) {
  try {
    const currencies = await Currency.find();
    for (let currency of currencies) {
      const response = await axios.get('https://cdn.taux.live/api/ecb.json'); // Utilisation de axios.get
      currency.rate = response.data[currency.code.toUpperCase()] || currency.rate;
      await currency.save();
    }
    res.json({ msg: 'Les taux de change ont été mis à jour' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
}

export default {
  getCurrencies,
  createCurrency,
  updateCurrencyRates
};