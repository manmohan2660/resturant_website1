import React from 'react';
import { useLocation } from 'react-router-dom';
import './Receipt.css';

const Receipt = () => {
  const { state } = useLocation();
  const { deliveryInfo, totalAmount, paymentStatus } = state || {};

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="receipt">
      <h2>Order Receipt</h2>
      <p><b>Name:</b> {deliveryInfo.name}</p>
      <p><b>Address:</b> {deliveryInfo.address}</p>
      <p><b>Phone:</b> {deliveryInfo.phone}</p>
      <p><b>Total Amount Paid:</b> ₹{totalAmount}</p>
      <p><b>Payment Status:</b> {paymentStatus}</p>
      <button onClick={handlePrint}>Print Receipt</button>
    </div>
  );
};

export default Receipt;
