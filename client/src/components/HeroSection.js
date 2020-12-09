import React from "react";

function HeroSection({ setModalOpen }) {
  return (
    <div id="herosection" className="herosection">
      <div className="herosection__content">
        <h1 className="herosection__heading">Apply and hear back every time</h1>
        <h4 className="herosection__subheading">
          Exploring internships or jobs? Say good-bye to the typical job portals
          and use the power of Artificial Intelligence to become successful,
          faster.
        </h4>
        <button
          onClick={() => setModalOpen(true)}
          className="herosection__button"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
