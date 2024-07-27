import axios from 'axios';

export const updatePaymentInfo = (paymentInfo) => async (dispatch) => {
  try {
    const res = await axios.put('/api/users/payment-info', paymentInfo);
    dispatch({
      type: 'UPDATE_PAYMENT_INFO_SUCCESS',
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: 'UPDATE_PAYMENT_INFO_FAIL',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};