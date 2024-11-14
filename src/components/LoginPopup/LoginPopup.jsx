import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin, setLoggedInUser }) => {
  const [currState, setCurrState] = useState("Login");
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [tempData, setTempData] = useState(null);
  const [message, setMessage] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    if (userDetails.name && userDetails.email && userDetails.password) {
      setTempData(userDetails); // Save data temporarily
      setMessage("Account created successfully! You can now log in.");
      setCurrState("Login");
      setUserDetails({ name: '', email: '', password: '' }); // Clear fields
    } else {
      setMessage("Please fill in all the fields.");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (tempData && userDetails.email === tempData.email && userDetails.password === tempData.password) {
      setLoggedInUser(tempData); // Pass user data to parent
      setMessage(`Welcome back, ${tempData.name}!`);
      setShowLogin(false); // Close popup
    } else {
      setMessage("Account doest not exist , please create a new account");
    }
  };

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={currState === "Login" ? handleLogin : handleSignUp}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={userDetails.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={userDetails.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userDetails.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account? <span onClick={() => { setCurrState("Sign Up"); setMessage(""); }}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => { setCurrState("Login"); setMessage(""); }}>Login here</span>
          </p>
        )}
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default LoginPopup;
