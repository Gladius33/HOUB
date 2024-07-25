import React, { useState } from 'react';

const PaymentInfoForm = () => {
  const [bankAccount, setBankAccount] = useState('');
  const [btcWallet, setBtcWallet] = useState('');
  const [xmrWallet, setXmrWallet] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoie les informations de paiement au backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Payment Information</h2>
      <label>Bank Account:</label>
      <input type="text" value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} />
      <label>BTC Wallet:</label>
      <input type="text" value={btcWallet} onChange={(e) => setBtcWallet(e.target.value)} />
      <label>XMR Wallet:</label>
      <input type="text" value={xmrWallet} onChange={(e) => setXmrWallet(e.target.value)} />
      <button type="submit">Save Payment Info</button>
    </form>
  );
};

export default PaymentInfoForm;
