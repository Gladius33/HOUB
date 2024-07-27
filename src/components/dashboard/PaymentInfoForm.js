import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePaymentInfo } from '../../actions/freelanceActions';

const PaymentInfoForm = () => {
  const [paymentInfo, setPaymentInfo] = useState({
    bankAccount: '',
    btcWallet: '',
    xmrWallet: ''
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePaymentInfo(paymentInfo));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Informations de Paiement</h2>
      <div>
        <label>Compte Bancaire:</label>
        <input type="text" name="bankAccount" value={paymentInfo.bankAccount} onChange={handleChange} />
      </div>
      <div>
        <label>Portefeuille BTC:</label>
        <input type="text" name="btcWallet" value={paymentInfo.btcWallet} onChange={handleChange} />
      </div>
      <div>
        <label>Portefeuille XMR:</label>
        <input type="text" name="xmrWallet" value={paymentInfo.xmrWallet} onChange={handleChange} />
      </div>
      <button type="submit">Enregistrer les Informations de Paiement</button>
    </form>
  );
};

export default PaymentInfoForm;