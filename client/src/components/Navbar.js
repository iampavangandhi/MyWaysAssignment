import React from "react";

import logo from "../assets/myways.png";

function Navbar({ SetModalOpen, setSidePanelOpen }) {
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
          onClick={() => SetModalOpen(true)}
          id="signup-button-navbar"
          className="navbar__menu-items highlight-text"
        >
          Sign Up
        </div>
      </div>
      <button
        onClick={() => setSidePanelOpen(true)}
        className="navbar__menu-items login-button"
      >
        Login
      </button>
    </div>
  );
}

export default Navbar;
