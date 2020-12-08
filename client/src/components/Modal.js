import React, { useState } from "react";

import axios from "axios";

function Modal() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [OTP, setOTP] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    axios
      .post(process.env.REACT_APP_URL + "signup", {
        firstName,
        lastName,
        email,
        password,
        userType: "STUDENT",
      })
      .then((res) => {
        if (res.data.code === 200) {
          const forms = document.getElementsByTagName("form");
          for (let index = 0; index < forms.length; index++) {
            forms[index].style.opacity = 0;
          }
          document.getElementById("otp-form").style.opacity = 1;
        }
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOTP = (e) => {
    e.preventDefault();

    axios
      .post(process.env.REACT_APP_URL + "verify", {
        enteredOTP: OTP,
      })
      .then((res) => {
        if (res.data.code === 200) {
          const forms = document.getElementsByTagName("form");
          for (let index = 0; index < forms.length; index++) {
            forms[index].style.opacity = 0;
          }
          document.getElementById("success-screen").style.opacity = 1;
        }
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReset = (e) => {
    e.preventDefault();

    axios
      .post(process.env.REACT_APP_URL + "reset", {
        email,
      })
      .then((res) => {
        if (res.data.code === 200) {
          const forms = document.getElementsByTagName("form");
          for (let index = 0; index < forms.length; index++) {
            forms[index].style.opacity = 0;
          }
          document.getElementById("reset-otp-form").style.opacity = 1;
        }
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleResetOTP = (e) => {
    e.preventDefault();

    axios
      .post(process.env.REACT_APP_URL + "reset/verify", {
        enteredOTP: OTP,
        newPassword: password,
      })
      .then((res) => {
        if (res.data.code === 200) {
          const forms = document.getElementsByTagName("form");
          for (let index = 0; index < forms.length; index++) {
            forms[index].style.opacity = 0;
          }
          document.getElementById("success-screen").style.opacity = 1;
        }
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeModal = (e) => {
    e.preventDefault();
    document.getElementById("App").classList.remove("blur");
    document.getElementById("modal").classList.remove("open");
  };

  return (
    <div id="modal" className="modal">
      <button className="modal-close-button" onClick={closeModal}>
        X
      </button>
      {/* SignUp Form */}
      <form
        onSubmit={handleSignup}
        id="signup-form"
        className="modal-form signup-form"
      >
        <input
          type="text"
          value={firstName}
          name="firstName"
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="first name"
        ></input>
        <input
          type="text"
          value={lastName}
          name="lastName"
          onChange={(e) => setLastName(e.target.value)}
          placeholder="last name"
        ></input>
        <input
          type="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        ></input>
        <input
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        ></input>
        {message !== "" && message}
        <button>Submit</button>
      </form>
      {/* OTP form */}
      <form onSubmit={handleOTP} id="otp-form" className="modal-form otp-form">
        <label>Enter OTP you received on your mail</label>
        <input
          type="text"
          value={OTP}
          name="OTP"
          onChange={(e) => setOTP(e.target.value)}
          placeholder="OTP"
        ></input>
        <button onClick={handleSignup}>RESEND OTP</button>
        {message !== "" && message}
        <button>Submit</button>
      </form>
      {/* Reset password form */}
      <form
        onSubmit={handleReset}
        id="reset-form"
        className="modal-form reset-form"
      >
        <label>Enter registered email address</label>
        <input
          type="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        ></input>
        {message !== "" && message}
        <button>Submit</button>
      </form>
      {/* Reset password OTP form */}
      <form
        onSubmit={handleResetOTP}
        id="reset-otp-form"
        className="modal-form reset-otp-form"
      >
        <label>Enter OTP you received on your mail</label>
        <input
          type="text"
          value={OTP}
          name="OTP"
          onChange={(e) => setOTP(e.target.value)}
          placeholder="OTP"
        ></input>
        <input
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        ></input>
        <button onClick={handleReset}>RESEND OTP</button>
        {message !== "" && message}
        <button>Submit</button>
      </form>
      <h1 id="success-screen" className="success-screen">
        SUCCESS
      </h1>
    </div>
  );
}

export default Modal;
