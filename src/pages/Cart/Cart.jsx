import React, { useContext, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({ name: '', address: '', phone: '' });

  const handleDeliveryFormSubmit = (e) => {
    e.preventDefault();
    setShowDeliveryForm(false);
    setShowReceipt(true);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleProceedToPayment = () => {
    navigate('/payment', { state: { totalAmount: getTotalCartAmount() + 2, deliveryInfo } });
  };

  return (
    <div className='cart'>
      {/* Cart Items */}
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {food_list.map((item) => (
          cartItems[item._id] > 0 && (
            <div key={item._id}>
              <div className="cart-items-title cart-items-item">
                <img src={item.image} alt="" />
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>₹{item.price * cartItems[item._id]}</p>
                <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
              </div>
              <hr />
            </div>
          )
        ))}
      </div>

      {/* Cart Totals and Proceed to Checkout */}
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
          </div>
          <button onClick={() => setShowDeliveryForm(true)}>PROCEED TO CHECKOUT</button>
        </div>
        
        {/* Promo Code Section */}
        <div className="cart-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className='cart-promocode-input'>
            <input type="text" placeholder='Promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>

      {/* Delivery Information Form */}
      {showDeliveryForm && (
        <div className="delivery-form">
          <h2>Enter Delivery Information</h2>
          <form onSubmit={handleDeliveryFormSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={deliveryInfo.name}
              onChange={(e) => setDeliveryInfo({ ...deliveryInfo, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={deliveryInfo.address}
              onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={deliveryInfo.phone}
              onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
              required
            />
            <button type="submit">Submit Delivery Info</button>
          </form>
        </div>
      )}

      {/* Receipt Display */}
      {showReceipt && (
        <div className="receipt">
          <h2>Receipt</h2>
          <p><strong>Name:</strong> {deliveryInfo.name}</p>
          <p><strong>Address:</strong> {deliveryInfo.address}</p>
          <p><strong>Phone:</strong> {deliveryInfo.phone}</p>
          <p><strong>Total Amount:</strong> ₹{getTotalCartAmount() + 2}</p>
          <button onClick={handlePrintReceipt}>Print Receipt</button>
          <button onClick={handleProceedToPayment}>Proceed to Payment</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
