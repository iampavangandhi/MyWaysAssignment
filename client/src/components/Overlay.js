import React from "react";

function Overlay({ setModalOpen, setSidePanelOpen }) {
  return (
    <div
      onClick={() => {
        setModalOpen(false);
        setSidePanelOpen(false);
      }}
      className="overlay"
    ></div>
  );
}

export default Overlay;
