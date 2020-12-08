import "./App.css";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SideBar from "./components/SideBar";
import Modal from "./components/Modal";

function App() {
  document.getElementById("App").addEventListener("click", () => {
    document.getElementById("App").classList.remove("blur");
    document.getElementById("sidebar").classList.remove("active");
    document.getElementById("modal").classList.remove("open");
  });

  return (
    <div id="App" className="App">
      <Navbar />
      <HeroSection />
      <div className="modal-wrapper">
        <Modal />
      </div>
      <SideBar />
    </div>
  );
}

export default App;
