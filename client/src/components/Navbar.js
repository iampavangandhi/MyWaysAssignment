import React from "react";

import logo from "../assets/myways.png";

function Navbar() {
  const openSidebar = (e) => {
    e.preventDefault();
    document.getElementById("App").classList.add("blur");
    document.getElementById("sidebar").classList.add("active");
    document.getElementById("login-form").style.opacity = 1;
    document.getElementById("reset-form").style.opacity = 1;
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" width="66px" height="66px" />
      </div>

      <div className="navbar__menu">
        <div className="navbar__menu-items">For You</div>
        <div className="navbar__menu-items">Instant Apply</div>
        <div className="navbar__menu-items">Pricing</div>
        <div className="navbar__menu-items">About Us</div>
        <div
          id="signup-button-navbar"
          className="navbar__menu-items highlight-text"
        >
          Sign Up
        </div>
      </div>
      <button onClick={openSidebar} className="navbar__menu-items login-button">
        Login
      </button>
    </div>
  );
}

export default Navbar;
