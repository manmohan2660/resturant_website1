import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin, loggedInUser, handleLogout }) => {
  const [menu, setMenu] = useState("menu");
  const [showSearch, setShowSearch] = useState(false);  // State to toggle search input
  const [searchQuery, setSearchQuery] = useState("");  // State to store search query
  const [searchResults, setSearchResults] = useState([]);  // State to store search results
  const { getTotalCartAmount } = useContext(StoreContext);

  // Sample data for available food items (this can be replaced with dynamic data from your API or backend)
  const availableFoodItems = [
    "Pizza", "Burger", "Pasta", "Sushi", "Salad", "Ice Cream", "Beverages","salad","Sandwich","Sandwich","Deserts","desert"
  ];

  // Handle the search on Enter key press
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      const results = searchQuery
        .split(",") // Split the search query by commas for multiple items
        .map(term => term.trim()) // Trim any extra spaces around terms
        .map(term => {
          return availableFoodItems.includes(term) ? `${term} is available` : `${term} is not available for today`;
        });
      setSearchResults(results);
    }
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
      </ul>
      <div className="navbar-right">
        {/* Toggle the search input visibility when search icon is clicked */}
        <img
          src={assets.search_icon}
          alt=""
          onClick={() => setShowSearch(!showSearch)}  // Toggle search input
          className="search-icon"
        />
        {showSearch && (
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}  // Update search query
            onKeyDown={handleSearch}  // Trigger search on Enter key press
            placeholder="Search food items..."
            className="search-input"
          />
        )}
        {/* Display search results if there are any */}
        {searchResults.length > 0 && showSearch && (
          <div className="search-results">
            <ul>
              {searchResults.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {loggedInUser ? (
          <div className="user-info">
            <p>Welcome, {loggedInUser.name}!</p>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
