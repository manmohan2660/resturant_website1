import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { deliveryInfo, totalAmount } = state || {};

  const handlePayment = () => {
    navigate('/receipt', { state: { deliveryInfo, totalAmount, paymentStatus: 'Successful' } });
  };

  return (
    <div className="payment-page">
      <h2>Dummy Payment Gateway</h2>
      <p>Total Amount: ₹{totalAmount}</p>
      <button onClick={handlePayment}>Make Payment</button>
    </div>
  );
};

export default Payment;
