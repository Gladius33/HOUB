import Payment from '../models/Payment.js';
import User from '../models/User.js';

export const createPayment = async (req, res) => {
  try {
    const { amount, currency, paymentMethod } = req.body;
    const user = req.user.id;

    const newPayment = new Payment({
      user,
      amount,
      currency,
      paymentMethod,
    });

    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du paiement', error });
  }
};

export const getPaymentStatus = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ message: 'Paiement non trouvé' });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du statut de paiement', error });
  }
};

export const updatePaymentInfo = async (req, res) => {
  try {
    const user = req.user.id;
    const { bankAccount, btcWallet, xmrWallet } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      user,
      { bankAccount, btcWallet, xmrWallet },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour des informations de paiement', error });
  }
};