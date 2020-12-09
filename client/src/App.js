import React, { useState } from "react";

import "./App.css";

import Wrapper from "./components/Wrapper";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SidePanel from "./components/SidePanel";
import Modal from "./components/Modal";
import Overlay from "./components/Overlay";

function App() {
  const [form, setForm] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  return (
    <Wrapper>
      <Navbar setModalOpen={setModalOpen} setSidePanelOpen={setSidePanelOpen} />

      {(modalOpen || sidePanelOpen) && (
        <Overlay
          setModalOpen={setModalOpen}
          setSidePanelOpen={setSidePanelOpen}
        />
      )}

      <HeroSection setModalOpen={setModalOpen} />

      <Modal
        form={form}
        setForm={setForm}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />

      <SidePanel
        setForm={setForm}
        setModalOpen={setModalOpen}
        sidePanelOpen={sidePanelOpen}
        setSidePanelOpen={setSidePanelOpen}
      />
    </Wrapper>
  );
}

export default App;
