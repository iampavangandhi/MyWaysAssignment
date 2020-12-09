import React, { useState } from "react";
import axios from "axios";

import success from "../assets/success.png";

function Modal1({ form, setForm, modalOpen, setModalOpen }) {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [OTP, setOTP] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = input;

    axios
      .post(process.env.REACT_APP_BASE_URL + "/signup", {
        firstName,
        lastName,
        email,
        password,
        userType: "STUDENT",
      })
      .then((res) => {
        if (res.data.code === 200) {
          setOTP("");
          setForm(2);
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
      .post(process.env.REACT_APP_BASE_URL + "/verify", {
        enteredOTP: OTP,
      })
      .then((res) => {
        if (res.data.code === 200) {
          setForm(0);
          setInput({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          });
          setOTP("");
          setMessage("");
        }
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReset = (e) => {
    e.preventDefault();

    const { email } = input;

    axios
      .post(process.env.REACT_APP_BASE_URL + "/reset", {
        email,
      })
      .then((res) => {
        if (res.data.code === 200) {
          setForm(4);
        }
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleResetOTP = (e) => {
    e.preventDefault();

    const { password } = input;

    axios
      .post(process.env.REACT_APP_BASE_URL + "/reset/verify", {
        enteredOTP: OTP,
        newPassword: password,
      })
      .then((res) => {
        if (res.data.code === 200) {
          setForm(0);
          setInput({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          });
          setOTP("");
          setMessage("");
        }
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {modalOpen && (
        <div className="main-modal">
          <button
            className="modal-close-button"
            onClick={() => setModalOpen(false)}
          >
            X
          </button>
          {/* SignUp Form */}
          {form === 1 && (
            <>
              <h1 className="modal-form-title">Signup</h1>
              <h2 className="modal-form-subtitle">It's quick and easy</h2>
              <form
                onSubmit={handleSignup}
                id="signup-form"
                className="modal-form signup-form"
              >
                <input
                  type="text"
                  required
                  value={input.firstName}
                  name="firstName"
                  onChange={(e) =>
                    setInput((prevState) => {
                      return { ...prevState, firstName: e.target.value };
                    })
                  }
                  placeholder="First Name"
                ></input>
                <input
                  type="text"
                  required
                  value={input.lastName}
                  name="lastName"
                  onChange={(e) =>
                    setInput((prevState) => {
                      return { ...prevState, lastName: e.target.value };
                    })
                  }
                  placeholder="Last Name"
                ></input>
                <input
                  type="email"
                  required
                  value={input.email}
                  name="email"
                  onChange={(e) =>
                    setInput((prevState) => {
                      return { ...prevState, email: e.target.value };
                    })
                  }
                  placeholder="Email"
                ></input>
                <input
                  type="password"
                  required
                  value={input.password}
                  name="password"
                  onChange={(e) =>
                    setInput((prevState) => {
                      return { ...prevState, password: e.target.value };
                    })
                  }
                  placeholder="Password"
                ></input>
                {message !== "" && (
                  <h4 className="modal-form-message">{message}</h4>
                )}
                <button className="modal-form-button">SignUp</button>
              </form>
            </>
          )}
          {/* OTP form */}
          {form === 2 && (
            <>
              <button
                className="modal-back-button"
                onClick={() => {
                  setForm(1);
                  setMessage("");
                }}
              >
                {"<"}
              </button>
              <h1 className="modal-form-title">OTP Sent</h1>
              <form
                onSubmit={handleOTP}
                id="otp-form"
                className="modal-form otp-form"
              >
                <input
                  type="text"
                  required
                  value={OTP}
                  name="OTP"
                  onChange={(e) => setOTP(e.target.value)}
                  placeholder="Enter your OTP"
                ></input>
                <p className="otp-form-text">
                  One time Passcode sent to your <br /> email ID- abc@gmail.com
                </p>
                {message !== "" && (
                  <h4 className="modal-form-message">{message}</h4>
                )}
                <button onClick={handleOTP} className="otp-form-button">
                  Enter
                </button>
              </form>
            </>
          )}
          {/* Reset password form */}
          {form === 3 && (
            <>
              <h1 className="modal-form-title">Reset Password</h1>
              <h2 className="modal-form-subtitle">
                Enter registered email address
              </h2>
              <form
                onSubmit={handleReset}
                id="reset-form"
                className="modal-form reset-form"
              >
                <input
                  type="email"
                  required
                  value={input.email}
                  name="email"
                  onChange={(e) =>
                    setInput((prevState) => {
                      return { ...prevState, email: e.target.value };
                    })
                  }
                  placeholder="Email"
                ></input>
                {message !== "" && (
                  <h4 className="modal-form-message">{message}</h4>
                )}
                <button className="reset-form-button">Submit</button>
              </form>
            </>
          )}
          {/* Reset password OTP form */}
          {form === 4 && (
            <>
              <button
                className="modal-back-button"
                onClick={() => {
                  setForm(3);
                  setMessage("");
                }}
              >
                {"<"}
              </button>
              <h1 className="modal-form-title">OTP Sent</h1>
              <h2 className="modal-form-subtitle">
                Please enter your OTP and New Password
              </h2>
              <form
                onSubmit={handleResetOTP}
                id="reset-otp-form"
                className="modal-form reset-otp-form"
              >
                <input
                  type="text"
                  required
                  value={OTP}
                  name="OTP"
                  onChange={(e) => setOTP(e.target.value)}
                  placeholder="OTP"
                ></input>
                <input
                  type="password"
                  required
                  value={input.password}
                  name="password"
                  onChange={(e) =>
                    setInput((prevState) => {
                      return { ...prevState, password: e.target.value };
                    })
                  }
                  placeholder="New Password"
                ></input>
                {message !== "" && (
                  <h4 className="modal-form-message">{message}</h4>
                )}
                <button className="reset-form-button">Submit</button>
              </form>
            </>
          )}
          {form === 0 && (
            <div id="success-screen" className="success-screen">
              <img src={success} alt="success-logo" />
              <h1>SUCCESS</h1>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Modal1;
