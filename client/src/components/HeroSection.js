import React from "react";

function HeroSection() {
  const getStartedButtonClick = (e) => {
    e.preventDefault();

    document.getElementById("App").classList.add("blur");
    document.getElementById("modal").classList.add("open");

    const forms = document.getElementsByTagName("form");
    for (let index = 0; index < forms.length; index++) {
      forms[index].style.opacity = 0;
    }
    document.getElementById("signup-form").style.opacity = 1;
  };

  return (
    <div id="herosection" className="herosection">
      <h1 className="herosection__heading">Apply and hear back every time</h1>
      <h4 className="herosection__subheading">
        Exploring internships or jobs? Say good-bye to the typical job portals
        and use the power of Artificial Intelligence to become successful,
        faster.
      </h4>
      <button onClick={getStartedButtonClick} className="herosection__button">
        Get Started
      </button>
    </div>
  );
}

export default HeroSection;
