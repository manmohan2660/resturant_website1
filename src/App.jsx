import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Payment from './pages/payment/Payment';
import Receipt from './pages/receipt/Receipt';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null); // State for logged-in user

  // Function to handle logout
  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <>
      {showLogin && (
        <LoginPopup setShowLogin={setShowLogin} setLoggedInUser={setLoggedInUser} />
      )}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} loggedInUser={loggedInUser} handleLogout={handleLogout} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/payment' element={<Payment />} />
           <Route path='/receipt' element={<Receipt />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
