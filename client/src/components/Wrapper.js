import React from "react";

function Wrapper({ children }) {
  return (
    <div id="App" className="App">
      {children}
    </div>
  );
}

export default Wrapper;
