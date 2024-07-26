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
      <h2>Payment Information</h2>
      <div>
        <label>Bank Account:</label>
        <input type="text" name="bankAccount" value={paymentInfo.bankAccount} onChange={handleChange} />
      </div>
      <div>
        <label>BTC Wallet:</label>
        <input type="text" name="btcWallet" value={paymentInfo.btcWallet} onChange={handleChange} />
      </div>
      <div>
        <label>XMR Wallet:</label>
        <input type="text" name="xmrWallet" value={paymentInfo.xmrWallet} onChange={handleChange} />
      </div>
      <button type="submit">Save Payment Info</button>
    </form>
  );
};

export default PaymentInfoForm;

